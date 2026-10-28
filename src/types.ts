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

export interface CaseStudyList {
  type: 'bullet' | 'number';
  items: string[];
}

export interface CaseStudyVideo {
  id?: string;
  url: string;
  sourceUrl?: string;
  caption?: string;
  poster?: string;
  aspect?: string;
  title?: string;
  label?: string;
}

export interface SubSectionBlock {
  title?: string;
  isPrimaryTitle?: boolean;
  paragraphs?: string[];
  images?: CaseStudyImage[];
  afterImageParagraphs?: string[];
  afterImages?: CaseStudyImage[];
}

export interface CaseStudySubSection {
  title?: string;
  isPrimaryTitle?: boolean;
  paragraphs?: string[];
  afterImageParagraphs?: string[];
  quotes?: string[];
  howMightWe?: CaseStudyHmwCard[];
  hidePointIcons?: boolean;
  primaryPointTitles?: boolean;
  callouts?: CaseStudyCallout[];
  images?: CaseStudyImage[];
  afterImages?: CaseStudyImage[];
  blocks?: SubSectionBlock[];
  imageLayout?: 'grid' | 'vertical';
  lists?: CaseStudyList[];
  video?: CaseStudyVideo;
  videos?: CaseStudyVideo[];
  afterImageQuotes?: string[];
  customVariant?: 'inconsistency-cards';
}

export interface CaseStudyHmwCard {
  number: string;
  text: string;
}

export interface CaseStudyImage {
  url: string;
  caption?: string;
  aspect?: 'wide' | 'video' | 'standard' | 'auto';
  borderless?: boolean;
}

export interface CaseStudySection {
  number: string;
  badge: string;
  title?: string;
  summary?: string;
  paragraphs?: string[];
  afterImageParagraphs?: string[];
  afterImageLists?: CaseStudyList[];
  afterImageQuotes?: string[];
  afterImages?: CaseStudyImage[];
  keyPoints?: CaseStudyKeyPoint[];
  quotes?: string[];
  hidePointIcons?: boolean;
  hideBorderBottom?: boolean;
  primaryPointTitles?: boolean;
  isPrimaryTitle?: boolean;
  howMightWe?: CaseStudyHmwCard[];
  callouts?: CaseStudyCallout[];
  lists?: CaseStudyList[];
  subSections?: CaseStudySubSection[];
  images?: CaseStudyImage[];
  imageLayout?: 'grid' | 'vertical';
  imagesBeforePoints?: boolean;
  video?: CaseStudyVideo;
  videos?: CaseStudyVideo[];
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
  tags?: string[];
  category: string;
  client: string;
  role: string;
  year: string;
  timeline: string;
  platform?: string;
  tools?: string[];
  icon?: string;
  isComingSoon?: boolean;
  isOnProgress?: boolean;
  summary: string;
  coverImage: string;
  coverObjectPosition?: string;
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
    text?: string;
    paragraphs?: string[];
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
