import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  X,
  Bell,
  ChevronsUpDown,
  Store,
  Megaphone,
  LayoutDashboard,
  CreditCard,
  Layers,
  Video,
  AlertTriangle
} from 'lucide-react';

interface InconsistencyCardsProps {
  onExpand?: (imageUrl: string, caption?: string) => void;
}

type TabType = 'behaviour' | 'foundation';

interface CardData {
  id: string;
  title: string;
  imageSrc: string;
  caption: string;
  foundationSpecs: {
    typography: { style: string; size: string; weight: string; color: string };
    icon?: { size: string; variant: string; color: string };
    margins: { label: string; value: string }[];
    padding: string;
    description: string;
  };
  behaviourScenario: {
    duration: number; // in seconds
    title: string;
    steps: {
      time: number;
      cursor: { x: number; y: number }; // percentage 0-100
      actionText: string;
      isClick?: boolean;
      hesitation?: boolean;
    }[];
  };
}

const CARDS_DATA: CardData[] = [
  {
    id: 'card-1',
    title: 'Detail Page: Without Return Navigation',
    imageSrc: '/assets/projects/doku/part-top.png',
    caption: 'Detail Page: Without Return Navigation (Checkout Configuration)',
    foundationSpecs: {
      typography: {
        style: 'H4',
        size: '24px',
        weight: '900 (Black)',
        color: 'Neutral-80 (#1F2937)'
      },
      margins: [
        { label: 'Breadcrumb to Title', value: '16px' },
        { label: 'Title to Tabs', value: '8px' },
        { label: 'Card Top Margin', value: '16px' }
      ],
      padding: '16px Container Padding',
      description:
        'Page relies on static unlinked breadcrumbs without back affordance. Header uses heavy 24px/900 typography that lacks interactive return signals.'
    },
    behaviourScenario: {
      duration: 8,
      title: 'Merchant Checkout Page Configuration Flow',
      steps: [
        {
          time: 0,
          cursor: { x: 45, y: 35 },
          actionText: '1. User lands on Checkout Page Configuration'
        },
        {
          time: 2,
          cursor: { x: 50, y: 75 },
          isClick: true,
          actionText: '2. User reviews & toggles payment method settings'
        },
        {
          time: 4,
          cursor: { x: 28, y: 25 },
          hesitation: true,
          actionText: '3. Wants to return: Scans top-left header for Back button (None exists)'
        },
        {
          time: 6,
          cursor: { x: 26, y: 18 },
          isClick: true,
          hesitation: true,
          actionText: '4. Tries clicking static breadcrumbs — no action occurs'
        },
        {
          time: 7.5,
          cursor: { x: 10, y: 5 },
          actionText: '5. Trapped: Forces user to use Browser Back button or reset flow'
        }
      ]
    }
  },
  {
    id: 'card-2',
    title: 'Detail Page: With Return Navigation (Back Button)',
    imageSrc: '/assets/projects/doku/part-bottom-left.png',
    caption: 'Detail Page: With Return Navigation (Variant A: Back Button)',
    foundationSpecs: {
      typography: {
        style: 'H5',
        size: '20px',
        weight: '700 (Bold)',
        color: 'Neutral-80 (#1F2937)'
      },
      icon: {
        size: '16px',
        variant: 'Arrow Left',
        color: 'Neutral-80'
      },
      margins: [
        { label: 'Top Margin', value: '4px' },
        { label: 'Return Action to Steps', value: '16px' },
        { label: 'Step to Card Margin', value: '24px' }
      ],
      padding: '16px Card Padding',
      description:
        'Uses an explicit "← Back to Promo List" action bar. Provides strong return affordance but occupies significant vertical space and diverges from standard page title headers.'
    },
    behaviourScenario: {
      duration: 8,
      title: 'Merchant Promo Creation & Back Flow',
      steps: [
        {
          time: 0,
          cursor: { x: 48, y: 40 },
          actionText: '1. User opens Create Promotion screen'
        },
        {
          time: 2,
          cursor: { x: 55, y: 80 },
          isClick: true,
          actionText: '2. Inputs promotion name & discount rules'
        },
        {
          time: 4,
          cursor: { x: 30, y: 22 },
          actionText: '3. User wants to check list: spots top "← Back to Promo List" bar'
        },
        {
          time: 5.5,
          cursor: { x: 26, y: 20 },
          isClick: true,
          actionText: '4. Clicks "← Back to Promo List"'
        },
        {
          time: 7,
          cursor: { x: 50, y: 50 },
          actionText: '5. Successfully returns to Promo List table'
        }
      ]
    }
  },
  {
    id: 'card-3',
    title: 'Detail Page: With Return Navigation (Close Action)',
    imageSrc: '/assets/projects/doku/part-bottom-right.png',
    caption: 'Detail Page: With Return Navigation (Variant B: Close Action)',
    foundationSpecs: {
      typography: {
        style: 'H5',
        size: '20px',
        weight: '700 (Bold)',
        color: 'Neutral-80 (#1F2937)'
      },
      icon: {
        size: '14px',
        variant: 'Times (Close ✕)',
        color: 'Neutral-80'
      },
      margins: [
        { label: 'Breadcrumbs to Title', value: '24px' },
        { label: 'Title to Tab Pills', value: '16px' },
        { label: 'Tab Pills to Content', value: '16px' }
      ],
      padding: '16px Inner Padding',
      description:
        'Uses an "✕ Settings" header that dismisses the view. Blurs the distinction between a full-page destination and a dismissable drawer modal.'
    },
    behaviourScenario: {
      duration: 8,
      title: 'Payment Link WhatsApp Bot Settings Flow',
      steps: [
        {
          time: 0,
          cursor: { x: 42, y: 35 },
          actionText: '1. User navigates into Payment Link Settings'
        },
        {
          time: 2,
          cursor: { x: 32, y: 55 },
          isClick: true,
          actionText: '2. Selects "Bot" tab to configure phone number'
        },
        {
          time: 4,
          cursor: { x: 26, y: 28 },
          actionText: '3. Finished config: looks for dismissal trigger'
        },
        {
          time: 5.5,
          cursor: { x: 24, y: 26 },
          isClick: true,
          actionText: '4. Clicks "✕ Settings" to dismiss the view'
        },
        {
          time: 7,
          cursor: { x: 48, y: 50 },
          actionText: '5. Returns to Payment Link list'
        }
      ]
    }
  }
];

export function InconsistencyCards({ onExpand }: InconsistencyCardsProps) {
  const [cardTabs, setCardTabs] = useState<Record<string, TabType>>({
    'card-1': 'behaviour',
    'card-2': 'behaviour',
    'card-3': 'behaviour'
  });

  const handleTabChange = (cardId: string, tab: TabType) => {
    setCardTabs((prev) => ({ ...prev, [cardId]: tab }));
  };

  return (
    <div className="inconsistency-section">
      {CARDS_DATA.map((card) => (
        <InconsistencyCardItem
          key={card.id}
          card={card}
          activeTab={cardTabs[card.id] || 'behaviour'}
          onTabChange={(tab) => handleTabChange(card.id, tab)}
          onExpand={onExpand}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------------------
// INDIVIDUAL CARD ITEM
// ----------------------------------------------------------------------------------
interface InconsistencyCardItemProps {
  key?: React.Key;
  card: CardData;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onExpand?: (imageUrl: string, caption?: string) => void;
}

const InconsistencyCardItem: React.FC<InconsistencyCardItemProps> = ({
  card,
  activeTab,
  onTabChange,
  onExpand
}) => {
  return (
    <div className="inconsistency-group">
      <div className="inconsistency-group__header">
        <h5 className="inconsistency-group__title">{card.title}</h5>
      </div>

      <div className="inconsistency-card">
        {/* Card Header with Interactive Tab Pills */}
        <div className="inconsistency-card__header">
          <div className="inconsistency-card__tabs" role="tablist" aria-label={`${card.title} Views`}>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'behaviour'}
              className={`inconsistency-card__tab ${
                activeTab === 'behaviour' ? 'inconsistency-card__tab--active' : ''
              }`}
              onClick={() => onTabChange('behaviour')}
            >
              <Video size={13} />
              <span>Behaviour</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'foundation'}
              className={`inconsistency-card__tab ${
                activeTab === 'foundation' ? 'inconsistency-card__tab--active' : ''
              }`}
              onClick={() => onTabChange('foundation')}
            >
              <Layers size={13} />
              <span>Foundation</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: BEHAVIOUR (Short Video / Interactive Navigation Simulation) */}
        {activeTab === 'behaviour' && (
          <BehaviourVideoSimulation scenario={card.behaviourScenario} cardId={card.id} />
        )}

        {/* Tab Content 2: FOUNDATION (Design Tokens, Typography, Margins, Spec Blueprint) */}
        {activeTab === 'foundation' && (
          <FoundationSpecView
            specs={card.foundationSpecs}
            cardId={card.id}
          />
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------------
// BEHAVIOUR SIMULATION COMPONENT (Short Video of User Existing Navigation)
// ----------------------------------------------------------------------------------
function BehaviourVideoSimulation({
  scenario,
  cardId
}: {
  scenario: CardData['behaviourScenario'];
  cardId: string;
}) {
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Smooth continuous animation playback loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= scenario.duration) {
          return 0; // Loop back
        }
        return Number((prev + 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [scenario.duration]);

  // Find active step based on current time
  const currentStep =
    [...scenario.steps].reverse().find((s) => currentTime >= s.time) || scenario.steps[0];

  return (
    <div className="inconsistency-behaviour-player">
      <div className="inconsistency-sim-screen">
        {/* Simulated Browser Bar */}
        <div className="inconsistency-sim-browser-bar">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="inconsistency-sim-url">https://dashboard.doku.com/checkout-settings</div>
          <div className="text-[10px] text-gray-400 font-mono">Live Navigation Simulation</div>
        </div>

        {/* Simulated Screen Body */}
        <div className="inconsistency-sim-body">
          {/* Render Mockup UI based on cardId */}
          {cardId === 'card-1' && <MockupScreenCard1 />}
          {cardId === 'card-2' && <MockupScreenCard2 />}
          {cardId === 'card-3' && <MockupScreenCard3 />}

          {/* Simulated Animated Cursor */}
          <div
            className="inconsistency-sim-cursor"
            style={{
              left: `${currentStep.cursor.x}%`,
              top: `${currentStep.cursor.y}%`,
              transition: 'left 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            {/* Cursor SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
              <path
                d="M4.5 3L11.5 21L14.5 13.5L22 10.5L4.5 3Z"
                fill="#111827"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>

            {/* Click Ripple Effect */}
            {currentStep.isClick && <span className="inconsistency-sim-click-ripple"></span>}

            {/* Hesitation Marker */}
            {currentStep.hesitation && (
              <span className="inconsistency-sim-hesitation-ring" title="User hesitation observed">
                <AlertTriangle size={11} className="text-amber-600" />
              </span>
            )}

            {/* Context Action Tooltip */}
            <div className="inconsistency-sim-tooltip">{currentStep.actionText}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------------
// FOUNDATION SPEC COMPONENT (Pondasi dari design yang telah terimplementasi)
// ----------------------------------------------------------------------------------
function FoundationSpecView({
  specs,
  cardId
}: {
  specs: CardData['foundationSpecs'];
  cardId: string;
}) {
  return (
    <div className="inconsistency-foundation-view">
      {/* Design Foundation Summary Grid */}
      <div className="inconsistency-spec-grid">
        {/* Typography Foundation */}
        <div className="inconsistency-spec-card">
          <div className="inconsistency-spec-card__label">Typography Token</div>
          <div className="inconsistency-spec-card__val text-[16px] font-black text-gray-900">
            {specs.typography.style} · {specs.typography.size}
          </div>
          <div className="text-[11.5px] text-gray-500 mt-1">
            Weight: <span className="font-semibold text-gray-800">{specs.typography.weight}</span>
          </div>
          <div className="text-[11.5px] text-gray-500">
            Color: <span className="font-semibold text-gray-800">{specs.typography.color}</span>
          </div>
        </div>

        {/* Spacing & Layout Foundation */}
        <div className="inconsistency-spec-card">
          <div className="inconsistency-spec-card__label">Spacing & Margins</div>
          <div className="flex flex-col gap-1 mt-1">
            {specs.margins.map((m, i) => (
              <div key={i} className="flex items-center justify-between text-[11.5px]">
                <span className="text-gray-600">{m.label}:</span>
                <span className="font-mono font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Icon & Foundation Trigger */}
        <div className="inconsistency-spec-card">
          <div className="inconsistency-spec-card__label">Component Structure</div>
          {specs.icon ? (
            <div className="text-[12px] text-gray-700 flex flex-col gap-1">
              <div>
                Icon Variant: <span className="font-semibold text-gray-900">{specs.icon.variant}</span>
              </div>
              <div>
                Icon Dimensions: <span className="font-mono font-semibold text-red-600">{specs.icon.size}</span>
              </div>
              <div className="text-gray-500 text-[11px]">Container: {specs.padding}</div>
            </div>
          ) : (
            <div className="text-[12px] text-gray-700 flex flex-col gap-1">
              <div>
                Navigation Affordance: <span className="font-semibold text-red-600">None (Missing Trigger)</span>
              </div>
              <div>
                Content Container: <span className="font-mono font-semibold text-gray-800">{specs.padding}</span>
              </div>
              <div className="text-gray-500 text-[11px]">Header Style: Static Page Title</div>
            </div>
          )}
        </div>
      </div>

      {/* Screen Redline Blueprint */}
      <div className="inconsistency-canvas mt-2">
        <div className="inconsistency-screen">
          {cardId === 'card-1' && <MockupScreenCard1 isFoundation />}
          {cardId === 'card-2' && <MockupScreenCard2 isFoundation />}
          {cardId === 'card-3' && <MockupScreenCard3 isFoundation />}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------------
// SCREEN MOCKUPS (Used in both Simulation & Foundation View)
// ----------------------------------------------------------------------------------
function MockupScreenCard1({ isFoundation = false }: { isFoundation?: boolean }) {
  return (
    <>
      <div className="inconsistency-sidebar">
        <div className="inconsistency-sidebar__brand">
          <div className="inconsistency-logo">DOKU</div>
          <div className="inconsistency-sidebar__collapse">
            <span className="inconsistency-sidebar__collapse-bar"></span>
          </div>
        </div>

        <div className="inconsistency-switcher">
          <div className="inconsistency-switcher__icon">
            <Store size={13} className="text-gray-500" />
          </div>
          <div className="inconsistency-switcher__info">
            <span className="inconsistency-switcher__name">DOKU Corporate</span>
            <span className="inconsistency-switcher__id">BRN-0266-1681...</span>
          </div>
          <ChevronsUpDown size={12} className="text-gray-400 shrink-0" />
        </div>

        <div className="inconsistency-nav">
          <div className="inconsistency-nav__item">
            <Bell size={13} className="text-gray-600" />
            <span className="text-[11.5px] font-medium text-gray-700">Notification</span>
            <span className="inconsistency-nav__badge">33</span>
          </div>
          <div className="inconsistency-nav__item">
            <LayoutDashboard size={13} className="text-gray-600" />
            <span className="text-[11.5px] font-medium text-gray-700">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="inconsistency-main">
        <div className="inconsistency-breadcrumbs">
          <span>Settings</span>
          <span className="text-gray-300">/</span>
          <span className="text-red-500 font-medium">Checkout Appearance</span>
        </div>

        {isFoundation && (
          <div className="inconsistency-annotation-v">
            <span className="inconsistency-annotation__bracket"></span>
            <span className="inconsistency-annotation__label">Margin: 16px</span>
            <span className="inconsistency-annotation__bracket"></span>
          </div>
        )}

        <div className="inconsistency-title-row relative">
          <h6 className="inconsistency-page-title font-black text-gray-900 text-[19px] md:text-[22px] tracking-tight">
            Checkout Page Configuration
          </h6>

          {isFoundation && (
            <div className="inconsistency-spec-balloon hidden lg:block">
              <div className="inconsistency-spec-line">Text Style: <span className="font-semibold text-gray-900">H4</span></div>
              <div className="inconsistency-spec-line">Font Size: <span className="font-semibold text-gray-900">24px</span></div>
              <div className="inconsistency-spec-line">Font Weight: <span className="font-semibold text-gray-900">900</span></div>
              <div className="inconsistency-spec-line">Text Color: <span className="font-semibold text-gray-900">Neutral-80</span></div>
            </div>
          )}
        </div>

        <p className="inconsistency-page-desc text-gray-500 text-[12.5px] mt-1">
          Configure your Checkout Page Interface & System
        </p>

        {isFoundation && (
          <div className="inconsistency-annotation-v my-2">
            <span className="inconsistency-annotation__bracket"></span>
            <span className="inconsistency-annotation__label">Margin: 8px</span>
            <span className="inconsistency-annotation__bracket"></span>
          </div>
        )}

        <div className="inconsistency-tabs">
          <div className="inconsistency-tab inconsistency-tab--active">
            Payment Methods Settings
          </div>
          <div className="inconsistency-tab">Expired Settings</div>
          <div className="inconsistency-tab">QRIS Credential Settings</div>
        </div>

        <div className="inconsistency-inner-box relative mt-3">
          {isFoundation && (
            <div className="inconsistency-annotation-h">
              <span className="inconsistency-annotation__bracket-h"></span>
              <span className="inconsistency-annotation__label">Padding: 16px</span>
              <span className="inconsistency-annotation__bracket-h"></span>
            </div>
          )}
          <p className="text-[12px] text-gray-600 pl-4 py-1">
            Manage the payment methods that you want to show on Checkout Page
          </p>
        </div>
      </div>
    </>
  );
}

function MockupScreenCard2({ isFoundation = false }: { isFoundation?: boolean }) {
  return (
    <>
      <div className="inconsistency-sidebar">
        <div className="inconsistency-sidebar__brand">
          <div className="inconsistency-logo">DOKU</div>
          <div className="inconsistency-sidebar__collapse">
            <span className="inconsistency-sidebar__collapse-bar"></span>
          </div>
        </div>

        <div className="inconsistency-switcher">
          <div className="inconsistency-switcher__icon">
            <Store size={13} className="text-gray-500" />
          </div>
          <div className="inconsistency-switcher__info">
            <span className="inconsistency-switcher__name">DOKU Corporate</span>
            <span className="inconsistency-switcher__id">BRN-0266-1681...</span>
          </div>
        </div>

        <div className="inconsistency-nav">
          <div className="inconsistency-nav__item">
            <Bell size={13} className="text-gray-600" />
            <span className="text-[11px] font-medium text-gray-700">Notification</span>
            <span className="inconsistency-nav__badge">33</span>
          </div>
          <div className="inconsistency-nav__item">
            <span className="text-[11px] text-gray-600 pl-1 font-medium">Flexible</span>
          </div>
          <div className="inconsistency-nav__item">
            <CreditCard size={12} className="text-gray-600" />
            <span className="text-[10px] text-gray-600 font-medium truncate">Subscription & Billing</span>
          </div>
        </div>
      </div>

      <div className="inconsistency-main">
        {isFoundation && (
          <div className="inconsistency-annotation-v mb-1">
            <span className="inconsistency-annotation__bracket"></span>
            <span className="inconsistency-annotation__label">Margin: 4px</span>
            <span className="inconsistency-annotation__bracket"></span>
          </div>
        )}

        <div className="inconsistency-title-row relative inline-flex items-center">
          <div className="inconsistency-back-btn">
            <ArrowLeft size={17} className="text-gray-900 shrink-0" />
            <span className="font-bold text-gray-900 text-[18px] md:text-[20px]">Back to Promo List</span>
          </div>

          {isFoundation && (
            <div className="inconsistency-spec-balloon hidden lg:block">
              <div className="inconsistency-spec-line">Icon Size: <span className="font-semibold text-gray-900">16px</span></div>
              <div className="inconsistency-spec-line">Color: <span className="font-semibold text-gray-900">Neutral-80</span></div>
              <div className="inconsistency-spec-line">Icon Variant: <span className="font-semibold text-gray-900">Arrow Left</span></div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="inconsistency-spec-line">Text Style: <span className="font-semibold text-gray-900">H5</span></div>
              <div className="inconsistency-spec-line">Font Size: <span className="font-semibold text-gray-900">20px</span></div>
              <div className="inconsistency-spec-line">Font Weight: <span className="font-semibold text-gray-900">700</span></div>
            </div>
          )}
        </div>

        {isFoundation && (
          <div className="inconsistency-annotation-v my-2">
            <span className="inconsistency-annotation__bracket"></span>
            <span className="inconsistency-annotation__label">Margin: 16px</span>
            <span className="inconsistency-annotation__bracket"></span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-5 rounded bg-red-600 text-white font-bold text-[11px] flex items-center justify-center">1</span>
          <span className="text-[12.5px] font-semibold text-gray-800">General Information</span>
        </div>

        <div className="inconsistency-inner-box">
          <div className="flex items-center gap-1.5 mb-2">
            <Megaphone size={13} className="text-red-500" />
            <span className="text-[12px] font-bold text-gray-900">General Information</span>
          </div>
          <div className="text-[11px] text-gray-500 mb-1">Promo Name</div>
          <div className="h-7 w-full max-w-md rounded border border-gray-200 bg-white"></div>
        </div>
      </div>
    </>
  );
}

function MockupScreenCard3({ isFoundation = false }: { isFoundation?: boolean }) {
  return (
    <>
      <div className="inconsistency-sidebar">
        <div className="inconsistency-sidebar__brand">
          <div className="inconsistency-logo">DOKU</div>
          <div className="inconsistency-sidebar__collapse">
            <span className="inconsistency-sidebar__collapse-bar"></span>
          </div>
        </div>

        <div className="inconsistency-switcher">
          <div className="inconsistency-switcher__icon">
            <Store size={13} className="text-gray-500" />
          </div>
          <div className="inconsistency-switcher__info">
            <span className="inconsistency-switcher__name">DOKU Corporate</span>
            <span className="inconsistency-switcher__id">BRN-0266-1681...</span>
          </div>
        </div>

        <div className="inconsistency-nav">
          <div className="inconsistency-nav__item">
            <Bell size={13} className="text-gray-600" />
            <span className="text-[11px] font-medium text-gray-700">Notification</span>
            <span className="inconsistency-nav__badge">33</span>
          </div>
          <div className="inconsistency-nav__item">
            <LayoutDashboard size={12} className="text-gray-600" />
            <span className="text-[11px] text-gray-700 font-medium">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="inconsistency-main">
        <div className="inconsistency-breadcrumbs text-[11.5px]">
          <span>Payment Link</span>
          <span className="text-gray-300">/</span>
          <span className="text-red-500 font-medium">Settings</span>
        </div>

        {isFoundation && (
          <div className="inconsistency-annotation-v my-1">
            <span className="inconsistency-annotation__bracket"></span>
            <span className="inconsistency-annotation__label">Margin: 24px</span>
            <span className="inconsistency-annotation__bracket"></span>
          </div>
        )}

        <div className="inconsistency-title-row relative inline-flex items-center">
          <div className="inconsistency-close-header">
            <X size={17} className="text-gray-900 font-bold shrink-0" />
            <span className="font-bold text-gray-900 text-[18px] md:text-[20px]">Settings</span>
          </div>

          {isFoundation && (
            <div className="inconsistency-spec-balloon hidden lg:block">
              <div className="inconsistency-spec-line">Icon Size: <span className="font-semibold text-gray-900">14px</span></div>
              <div className="inconsistency-spec-line">Color: <span className="font-semibold text-gray-900">Neutral-80</span></div>
              <div className="inconsistency-spec-line">Icon Variant: <span className="font-semibold text-gray-900">Times</span></div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="inconsistency-spec-line">Text Style: <span className="font-semibold text-gray-900">H5</span></div>
              <div className="inconsistency-spec-line">Font Size: <span className="font-semibold text-gray-900">20px</span></div>
              <div className="inconsistency-spec-line">Font Weight: <span className="font-semibold text-gray-900">700</span></div>
            </div>
          )}
        </div>

        {isFoundation && (
          <div className="inconsistency-annotation-v my-2">
            <span className="inconsistency-annotation__bracket"></span>
            <span className="inconsistency-annotation__label">Margin: 16px</span>
            <span className="inconsistency-annotation__bracket"></span>
          </div>
        )}

        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-gray-100 text-gray-800">Bot</span>
          <span className="px-2.5 py-1 rounded text-[11px] text-gray-600">Notification</span>
          <span className="px-2.5 py-1 rounded text-[11px] text-gray-600">Email Design</span>
        </div>

        <div className="inconsistency-inner-box mt-2">
          <p className="text-[12px] text-gray-600 pl-4 py-1 leading-relaxed">
            Link your phone number to your business to access our Chat Platform Features...
          </p>
        </div>
      </div>
    </>
  );
}
