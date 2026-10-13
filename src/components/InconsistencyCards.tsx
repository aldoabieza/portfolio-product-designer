import React, { useState } from 'react';
import { CaseVideoPlayer } from './CaseVideoPlayer';

interface InconsistencyCardsProps {
  onExpand?: (imageUrl: string, caption?: string) => void;
}

type TabType = 'foundation' | 'behaviour';

interface VariantImage {
  id: string;
  name: string;
  badge: string;
  imageSrc: string;
  caption: string;
}

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  variants: VariantImage[];
  videoSrc?: string;
  foundationSpecs: {
    typography: { style: string; size: string; weight: string; color: string };
    icon?: { size: string; variant: string; color: string };
    margins: { label: string; value: string }[];
    padding: string;
    description: string;
  };
  behaviourNotes: {
    summary: string;
    steps: string[];
    frictionPoint: string;
  };
}

const CARDS_DATA: CardData[] = [
  {
    id: 'card-1',
    title: 'Detail Page: Without Return Nav',
    subtitle: 'Checkout Page Configuration',
    variants: [
      {
        id: 'v1',
        name: 'Checkout Page Configuration',
        badge: 'Without Return Nav',
        imageSrc: '/assets/projects/doku/Screenshot 2026-09-22 at 10.35.13.png',
        caption: 'Detail Page: Without Return Navigation (Checkout Page Configuration)'
      }
    ],
    videoSrc: '/assets/projects/doku/doku-component-1-without-return.mp4',
    foundationSpecs: {
      typography: {
        style: 'H4',
        size: '24px',
        weight: '900 (Black)',
        color: 'Neutral-80 (#1F2937)'
      },
      icon: {
        size: '-',
        variant: 'None (Missing Return Navigation)',
        color: '-'
      },
      margins: [
        { label: 'Breadcrumb to Title', value: '16px' },
        { label: 'Title to Subtitle & Tabs', value: '16px' },
        { label: 'Tabs to Content Card', value: '16px' }
      ],
      padding: '16px Container Padding',
      description:
        'Halaman tidak memiliki tombol atau aksi navigasi kembali (return nav) di area header. Pengguna hanya dapat kembali ke menu utama dengan mengklik breadcrumb teks kecil "Settings" atau tombol browser back.'
    },
    behaviourNotes: {
      summary:
        'Alur navigasi masuk dari menu Settings ke Checkout Appearance. Pada halaman Checkout Page Configuration, pengguna menyelesaikan konfigurasi pembayaran, lalu kebingungan mencari tombol kembali di header (tidak ada tombol return), sehingga terpaksa mengklik breadcrumb teks kecil.',
      steps: [
        'Pengguna membuka menu Settings pada sidebar',
        'Memilih "Checkout Appearance" pada section Accept Payments',
        'Masuk ke halaman Checkout Page Configuration',
        'Mencari tombol aksi kembali pada area header (tidak ditemukan)',
        'Terpaksa mengklik breadcrumb teks kecil "Settings" untuk kembali'
      ],
      frictionPoint:
        'Ketiadaan tombol kembali eksplisit meningkatkan beban kognitif dan memperlambat alur kerja merchant saat berpindah antar menu pengaturan.'
    }
  },
  {
    id: 'card-2',
    title: 'Detail Page: With Return Nav',
    subtitle: 'Payment Link Settings & Promo Form',
    variants: [
      {
        id: 'v1',
        name: 'Detail Page: With Return Navigation',
        badge: 'With Return Nav',
        imageSrc: '/assets/projects/doku/Screenshot 2026-09-22 at 10.43.25.png',
        caption: 'Detail Page: With Return Navigation (Screenshot 2026-09-22 at 10.43.25)'
      }
    ],
    videoSrc: '/assets/projects/doku/doku-component-2-with-return.mp4',
    foundationSpecs: {
      typography: {
        style: 'H5',
        size: '20px',
        weight: '700 (Bold)',
        color: 'Neutral-80 (#1F2937)'
      },
      icon: {
        size: '18px (Close) / 16px (Arrow)',
        variant: 'Times (✕ Close) vs Arrow Left (←)',
        color: 'Neutral-80'
      },
      margins: [
        { label: 'Top Margin', value: '4px' },
        { label: 'Title to Tabs / Stepper', value: '16px' },
        { label: 'Tab to Banner / Content', value: '16px' }
      ],
      padding: '16px Container Padding',
      description:
        'Halaman memiliki tombol kembali eksplisit di area header, namun variannya tidak konsisten antar produk: satu halaman menggunakan ikon silang "✕ Settings" (modal-style close), sementara halaman lain menggunakan ikon panah "← Back to Promo List".'
    },
    behaviourNotes: {
      summary:
        'Dari halaman Payment Link, pengguna membuka tombol Settings (ikon gerigi) di pojok kanan atas tabel. Di halaman konfigurasi Bot, pengguna meninjau aktivasi WhatsApp Bot dan daftar nomor telepon, lalu menutup halaman dengan mengklik tombol "✕ Settings" untuk kembali ke tabel utama.',
      steps: [
        'Pengguna berada di halaman Payment Link tabel',
        'Mengklik tombol Settings (ikon gerigi) di atas tabel',
        'Masuk ke halaman konfigurasi Payment Link Settings (tab Bot)',
        'Meninjau integrasi WhatsApp Bot dan daftar nomor telepon',
        'Mengklik tombol "✕ Settings" di pojok kiri atas untuk kembali ke tabel'
      ],
      frictionPoint:
        'Pola return navigation terfragmentasi: beberapa halaman menggunakan ikon Close silang, sementara halaman lain menggunakan panah Arrow Back.'
    }
  }
];

export function InconsistencyCards({ onExpand }: InconsistencyCardsProps) {
  const [cardTabs, setCardTabs] = useState<Record<string, TabType>>({
    'card-1': 'foundation',
    'card-2': 'foundation'
  });

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'card-1': 'v1',
    'card-2': 'v1'
  });

  const handleTabChange = (cardId: string, tab: TabType) => {
    setCardTabs((prev) => ({ ...prev, [cardId]: tab }));
  };

  const handleVariantChange = (cardId: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [cardId]: variantId }));
  };

  return (
    <div className="inconsistency-section">
      {CARDS_DATA.map((card) => {
        const activeVariantId = selectedVariants[card.id] || card.variants[0].id;
        const currentVariant =
          card.variants.find((v) => v.id === activeVariantId) || card.variants[0];

        return (
          <InconsistencyCardItem
            key={card.id}
            card={card}
            currentVariant={currentVariant}
            activeTab={cardTabs[card.id] || 'foundation'}
            onTabChange={(tab) => handleTabChange(card.id, tab)}
            onVariantChange={(variantId) => handleVariantChange(card.id, variantId)}
            onExpand={onExpand}
          />
        );
      })}
    </div>
  );
}

// ----------------------------------------------------------------------------------
// INDIVIDUAL CARD ITEM
// ----------------------------------------------------------------------------------
interface InconsistencyCardItemProps {
  card: CardData;
  currentVariant: VariantImage;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onVariantChange: (variantId: string) => void;
  onExpand?: (imageUrl: string, caption?: string) => void;
}

const InconsistencyCardItem: React.FC<InconsistencyCardItemProps> = ({
  card,
  currentVariant,
  activeTab,
  onTabChange,
  onVariantChange,
  onExpand
}) => {
  return (
    <div className="inconsistency-group">
      {/* 1. Title */}
      <h5 className="inconsistency-group__title">{card.title}</h5>

      {/* 2. Tab */}
      <div className="inconsistency-card__tabs" role="tablist" aria-label={`${card.title} Views`}>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'foundation'}
          className={`inconsistency-card__tab ${activeTab === 'foundation' ? 'inconsistency-card__tab--active' : ''}`}
          onClick={() => onTabChange('foundation')}
        >
          <span>Foundation</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'behaviour'}
          className={`inconsistency-card__tab ${activeTab === 'behaviour' ? 'inconsistency-card__tab--active' : ''}`}
          onClick={() => onTabChange('behaviour')}
        >
          <span>Behaviour</span>
        </button>
      </div>

      {/* 3. Content */}
      <div className="inconsistency-card__content">
        {activeTab === 'foundation' ? (
          <FoundationSpecView
            variant={currentVariant}
            cardId={card.id}
            onExpand={onExpand}
          />
        ) : (
          <BehaviourVideoSection card={card} />
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------------
// FOUNDATION SPEC VIEW (Original Uploaded Image Display)
// ----------------------------------------------------------------------------------
function FoundationSpecView({
  variant,
  onExpand
}: {
  variant: VariantImage;
  cardId?: string;
  onExpand?: (imageUrl: string, caption?: string) => void;
}) {
  const [customSrc] = useState<string>(() => {
    return localStorage.getItem(`custom_asset_${variant.imageSrc}`) || '';
  });

  const displaySrc = customSrc || variant.imageSrc;

  return (
    <figure
      className="case__image-figure"
      role="button"
      tabIndex={0}
      aria-label={`Expand visual: ${variant.caption}`}
      onClick={() => onExpand?.(displaySrc, variant.caption)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand?.(displaySrc, variant.caption);
        }
      }}
    >
      <div className="case__image-container">
        <img
          src={displaySrc}
          alt={variant.caption}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </figure>
  );
}

// ----------------------------------------------------------------------------------
// BEHAVIOUR VIDEO SECTION (Consistent with Portfolio Settings CaseVideoPlayer)
// ----------------------------------------------------------------------------------
function BehaviourVideoSection({
  card
}: {
  card: CardData;
}) {
  const videoData = {
    title: card.id === 'card-1' 
      ? 'Checkout Page Configuration (Detail Page)' 
      : 'Payment Link Settings Modal (Detail Page)',
    label: card.id === 'card-1' ? 'Without Return Nav' : 'With Return Nav',
    url: card.videoSrc || '',
    poster: card.id === 'card-1' 
      ? '/assets/projects/doku/doku-component-1-poster.webp' 
      : '/assets/projects/doku/doku-component-2-poster.webp',
    caption: card.id === 'card-1'
      ? 'Walkthrough perilaku interaksi: Halaman konfigurasi checkout tidak menyediakan kontrol navigasi kembali di header sehingga pengguna terpaksa mencari dan mengklik breadcrumb "Settings".'
      : 'Walkthrough perilaku interaksi: Modal konfigurasi Payment Link menyediakan kontrol navigasi kembali eksplisit berupa tombol silang (X) di pojok header untuk menutup dan kembali ke daftar.'
  };

  return (
    <div className="flex flex-col w-full pt-1">
      {/* Consistent CaseVideoPlayer Component (same as Portfolio Settings) */}
      <div className="case__section-video-wrapper !mt-0">
        <CaseVideoPlayer video={videoData} hideHeader />
      </div>
    </div>
  );
}
