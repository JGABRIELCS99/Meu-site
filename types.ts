import React from 'react';

export interface Article {
  id: string;
  title: string;
  summary: string;
}

export interface ServiceArea {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  articles: Article[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  whatsappUrl: string;
  googleMapsEmbedUrl: string;
}