// Utilitário de Métricas e Análise de Tráfego do Site
// Gabriel Costa Advogado — Acesso Restrito

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  type: 'pageview' | 'click';
  target: string;
  path: string;
  referrer: string;
  device: 'mobile' | 'desktop' | 'tablet';
}

export interface AnalyticsStorage {
  events: AnalyticsEvent[];
  passwordHash?: string;
  customPassword?: string;
}

const STORAGE_KEY = 'gca_analytics_data_v1';
const AUTH_KEY = 'gca_metrics_auth_v1';
const DEFAULT_PASSWORD = 'gabriel88548'; // OAB 88.548 como padrão seguro e memorável

// Detectar dispositivo
function getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

// Detectar origem
function getReferrerSource(): string {
  if (typeof document === 'undefined') return 'Direto';
  const ref = document.referrer.toLowerCase();
  if (!ref) return 'Direto';
  if (ref.includes('google')) return 'Google';
  if (ref.includes('instagram')) return 'Instagram';
  if (ref.includes('whatsapp') || ref.includes('wa.me')) return 'WhatsApp';
  if (ref.includes('facebook')) return 'Facebook';
  if (ref.includes('linkedin')) return 'LinkedIn';
  return 'Outro';
}

// Carregar dados salvos (estritamente reais, removendo qualquer resquício de teste/demonstração)
export function getStoredAnalytics(): AnalyticsStorage {
  if (typeof window === 'undefined') return { events: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: AnalyticsStorage = {
        events: [],
        customPassword: DEFAULT_PASSWORD,
      };
      saveStoredAnalytics(initial);
      return initial;
    }
    const data = JSON.parse(raw);
    if (!data.events || !Array.isArray(data.events)) {
      const initial: AnalyticsStorage = {
        events: [],
        customPassword: DEFAULT_PASSWORD,
      };
      saveStoredAnalytics(initial);
      return initial;
    }
    
    // Filtro de integridade: descarta permanentemente qualquer evento de demonstração ('seed_')
    const realEventsOnly = data.events.filter((e: AnalyticsEvent) => e && e.id && !e.id.startsWith('seed_'));
    if (realEventsOnly.length !== data.events.length) {
      data.events = realEventsOnly;
      saveStoredAnalytics(data);
    }
    
    return data;
  } catch {
    return { events: [], customPassword: DEFAULT_PASSWORD };
  }
}

// Salvar dados
function saveStoredAnalytics(data: AnalyticsStorage) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Erro ao salvar métricas locais:', e);
  }
}


// Registrar visualização de página
export function trackPageView(targetName: string, path: string = window.location.pathname) {
  if (typeof window === 'undefined') return;
  const store = getStoredAnalytics();
  
  // Evitar flood na mesma sessão em menos de 2 segundos para o mesmo alvo
  const lastEvent = store.events[store.events.length - 1];
  if (lastEvent && lastEvent.target === targetName && Date.now() - lastEvent.timestamp < 2000) {
    return;
  }

  const newEvent: AnalyticsEvent = {
    id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    type: 'pageview',
    target: targetName,
    path,
    referrer: getReferrerSource(),
    device: getDeviceType(),
  };

  store.events.push(newEvent);
  // Manter no máximo 1000 eventos para não estourar localStorage
  if (store.events.length > 1000) {
    store.events = store.events.slice(-1000);
  }
  saveStoredAnalytics(store);

  // Também dispara pro gtag do GA4 se disponível
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', 'page_view', {
        page_title: targetName,
        page_location: window.location.href,
        page_path: path,
      });
    } catch {}
  }
}

// Registrar conversão/clique (WhatsApp, Instagram, etc)
export function trackConversion(actionName: string, category: 'whatsapp' | 'instagram' | 'phone' | 'email' | 'cna' | 'menu') {
  if (typeof window === 'undefined') return;
  const store = getStoredAnalytics();

  const newEvent: AnalyticsEvent = {
    id: `cl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    type: 'click',
    target: `Conversão: ${actionName}`,
    path: window.location.pathname + window.location.hash,
    referrer: getReferrerSource(),
    device: getDeviceType(),
  };

  store.events.push(newEvent);
  if (store.events.length > 1000) {
    store.events = store.events.slice(-1000);
  }
  saveStoredAnalytics(store);

  // Também envia evento de conversão pro GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', category === 'whatsapp' ? 'generate_lead' : 'conversion', {
        event_category: category,
        event_label: actionName,
        value: category === 'whatsapp' ? 1 : 0,
      });
    } catch {}
  }
}

// Autenticação do Painel
export function isMetricsAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function loginMetrics(passwordInput: string): boolean {
  const store = getStoredAnalytics();
  const currentPassword = store.customPassword || DEFAULT_PASSWORD;
  if (passwordInput.trim() === currentPassword.trim()) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function logoutMetrics() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export function changeMetricsPassword(newPassword: string): boolean {
  if (!newPassword || newPassword.trim().length < 4) return false;
  const store = getStoredAnalytics();
  store.customPassword = newPassword.trim();
  saveStoredAnalytics(store);
  return true;
}

export function resetMetricsData() {
  const store = getStoredAnalytics();
  store.events = [];
  saveStoredAnalytics(store);
}
