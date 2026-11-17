// Utilitário de Métricas e Análise de Tráfego do Site
// Gabriel Costa Advogado — Acesso Restrito
//
// ATENÇÃO: os eventos guardados aqui ficam no localStorage do NAVEGADOR de cada
// visitante. O painel só enxerga o que aconteceu no navegador em que está aberto.
// Os números de todos os visitantes vêm do Google Analytics 4 (eventos enviados
// via gtag) e do Google Search Console.

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
  /** Legado (texto puro). Migrado para passwordHash no primeiro login e apagado. */
  customPassword?: string;
}

const STORAGE_KEY = 'gca_analytics_data_v1';
const AUTH_KEY = 'gca_metrics_auth_v1';
// Senha que antes ficava escrita no código público. Nunca mais é aceita.
const LEGACY_DEFAULT_PASSWORD = 'gabriel88548';
const MIN_PASSWORD_LENGTH = 8;

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

// SHA-256 em hexadecimal (a senha nunca fica guardada em texto puro)
async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(`gca-metricas:${text}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Carregar dados salvos (estritamente reais, removendo qualquer resquício de teste/demonstração)
export function getStoredAnalytics(): AnalyticsStorage {
  if (typeof window === 'undefined') return { events: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { events: [] };
    }
    const data = JSON.parse(raw);
    if (!data.events || !Array.isArray(data.events)) {
      return { events: [] };
    }

    let changed = false;

    // Filtro de integridade: descarta permanentemente qualquer evento de demonstração ('seed_')
    const realEventsOnly = data.events.filter((e: AnalyticsEvent) => e && e.id && !e.id.startsWith('seed_'));
    if (realEventsOnly.length !== data.events.length) {
      data.events = realEventsOnly;
      changed = true;
    }

    // A senha padrão antiga era gravada no navegador de todo mundo: apaga.
    if (data.customPassword === LEGACY_DEFAULT_PASSWORD) {
      delete data.customPassword;
      changed = true;
    }

    if (changed) saveStoredAnalytics(data);
    return data;
  } catch {
    return { events: [] };
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

  // Também envia evento de conversão pro GA4.
  // WhatsApp = lead (generate_lead). Demais canais = contact_click, para não
  // inflar a contagem de leads com cliques em Instagram/menu.
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', category === 'whatsapp' ? 'generate_lead' : 'contact_click', {
        event_category: category,
        event_label: actionName,
        page_path: window.location.pathname + window.location.hash,
        transport_type: 'beacon',
      });
    } catch {}
  }
}

// ---------------------------------------------------------------------
// Autenticação do painel
// ---------------------------------------------------------------------
// Aviso honesto: como o site é estático, esta senha só impede que alguém
// abra o painel por curiosidade. Os dados exibidos são do próprio navegador.

export function isMetricsAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

/** true quando já existe uma senha definida neste navegador. */
export function hasMetricsPassword(): boolean {
  const store = getStoredAnalytics();
  return Boolean(store.passwordHash || store.customPassword);
}

export function getMinPasswordLength(): number {
  return MIN_PASSWORD_LENGTH;
}

/** Primeiro acesso: cria a senha (guardada só como hash). */
export async function setupMetricsPassword(newPassword: string): Promise<boolean> {
  const pw = (newPassword || '').trim();
  if (pw.length < MIN_PASSWORD_LENGTH || pw === LEGACY_DEFAULT_PASSWORD) return false;
  const store = getStoredAnalytics();
  if (store.passwordHash || store.customPassword) return false; // já existe: use "trocar senha"
  store.passwordHash = await sha256(pw);
  delete store.customPassword;
  saveStoredAnalytics(store);
  if (typeof window !== 'undefined') sessionStorage.setItem(AUTH_KEY, 'true');
  return true;
}

export async function loginMetrics(passwordInput: string): Promise<boolean> {
  const pw = (passwordInput || '').trim();
  if (!pw || pw === LEGACY_DEFAULT_PASSWORD) return false;
  const store = getStoredAnalytics();

  let ok = false;
  if (store.passwordHash) {
    ok = (await sha256(pw)) === store.passwordHash;
  } else if (store.customPassword) {
    // Migração: senha personalizada antiga (texto puro) -> hash
    ok = pw === store.customPassword.trim();
    if (ok) {
      store.passwordHash = await sha256(pw);
      delete store.customPassword;
      saveStoredAnalytics(store);
    }
  }

  if (ok && typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, 'true');
  }
  return ok;
}

export function logoutMetrics() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export async function changeMetricsPassword(newPassword: string): Promise<boolean> {
  const pw = (newPassword || '').trim();
  if (pw.length < MIN_PASSWORD_LENGTH || pw === LEGACY_DEFAULT_PASSWORD) return false;
  const store = getStoredAnalytics();
  store.passwordHash = await sha256(pw);
  delete store.customPassword;
  saveStoredAnalytics(store);
  return true;
}

export function resetMetricsData() {
  const store = getStoredAnalytics();
  store.events = [];
  saveStoredAnalytics(store);
}
