export type ViewType =
  | 'intro'
  | 'work'
  | 'experiment'
  | 'experience'
  | 'contact'
  | 'doku'
  | 'orderonline'
  | 'orderonline-settings'
  | 'trawlbens';

export interface StatMetric {
  value: string;
  label: string;
}

export interface GalleryItem {
  url: string;
  caption?: string;
}

export interface CaseStudyKeyPoint {
  title: string;
  description: string;
}

export interface CaseStudyCallout {
  icon?: string;
  label?: string;
  text: string;
}

export interface CaseStudyImage {
  url: string;
  caption?: string;
  aspect?: 'wide' | 'video' | 'standard' | 'auto';
}

export interface CaseStudySection {
  number: string;
  badge: string;
  title?: string;
  summary?: string;
  paragraphs?: string[];
  afterImageParagraphs?: string[];
  keyPoints?: CaseStudyKeyPoint[];
  callouts?: CaseStudyCallout[];
  images?: CaseStudyImage[];
  imagesBeforePoints?: boolean;
  customVariant?: 'inconsistency-cards';
  comparison?: {
    beforeTitle?: string;
    beforeText?: string;
    beforeImage?: string;
    afterTitle?: string;
    afterText?: string;
    afterImage?: string;
  };
  metrics?: StatMetric[];
}

export interface CaseStudy {
  id: string;
  title: string;
  tag: string;
  category: string;
  client: string;
  role: string;
  year: string;
  timeline: string;
  summary: string;
  coverImage: string;
  stats: StatMetric[];
  overview: string;
  problem: string;
  solution: string;
  galleryImages: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  metaDetails?: {
    platform?: string;
    responsibilities?: string[];
    tools?: string[];
    team?: string;
  };
  sections?: CaseStudySection[];
  lessonLearned?: {
    title?: string;
    text: string;
    bullets?: string[];
  };
}

export interface ExperimentItem {
  id: string;
  title: string;
  imageUrl: string;
  dribbbleUrl: string;
  source: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  roleWithPeriod?: string;
  logo: string;
  fallbackColor: string;
  fallbackLetter: string;
}
