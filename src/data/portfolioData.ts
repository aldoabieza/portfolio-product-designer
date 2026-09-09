import { CaseStudy, ExperimentItem, ExperienceItem } from '../types';

export const CASE_STUDIES: Record<string, CaseStudy> = {
  doku: {
    id: 'doku',
    title: 'Leading the Evolution of DOKU’s Design System',
    tag: 'Design System',
    category: 'Design System',
    client: 'DOKU',
    role: 'Lead UI/UX Designer',
    year: '2024 - Present',
    timeline: 'Ongoing',
    summary: "Leading and scaling the unified multi-brand design system across DOKU's digital payment products, checkout experiences, and merchant suites.",
    coverImage: '/assets/projects/doku-design-system-cover.jpg',
    stats: [
      { value: '40+', label: 'Design system components built & tokenized' },
      { value: '100%', label: 'Design-to-code token parity across products' },
      { value: '25+', label: 'Payment products unified across the platform' }
    ],
    overview: "At DOKU, we are designers have a single source of truth for product development: DOKU Fragment. It comprises foundations, component variants, and source code already implemented in our products. As our products evolve, an increasing number of component design variations are being implemented across our dashboards.",
    problem: 'Our existing workflow lacked a proper process for distributing and updating components across teams, leading to inconsistencies in the design system, duplicate components, and divergent user behaviors across merchant products.',
    solution: 'Facilitated a collaborative design system strategy workshop, architected a federated closed-loop contribution model, standardized harmonic 8pt spatial foundations, and unified cross-product navigation and header anatomy.',
    galleryImages: [
      '/assets/projects/doku/doku-workshop-strategy-board.svg',
      '/assets/projects/doku/doku-current-flowchart.svg',
      '/assets/projects/doku/doku-product-inconsistency-breakdown.svg'
    ],
    metaDetails: {
      platform: 'Multi-Brand Web & Mobile Payment Platforms (Figma, React, Token Engine)',
      responsibilities: [
        'Design System Architecture & Governance',
        'Cross-Functional Strategy Workshop Facilitation',
        'Component Tokenization & Mathematical Foundations',
        'Cross-Squad Alignment (Designers, Writers, Engineers)',
        'Figma Master Libraries & Storybook Code Parity'
      ],
      tools: ['Figma', 'FigJam', 'Storybook', 'Tokens Studio', 'GitHub', 'Zeroheight'],
      team: 'Lead UI/UX Designer (Facilitator), Design Lead (Sponsor), Squad UI Designers, UX Writers, Core Frontend Engineers'
    },
    sections: [
      {
        number: '01',
        badge: '01 · Overview',
        title: 'Overview',
        paragraphs: [
          'At DOKU, we are designers have a single source of truth for product development: DOKU Fragment. It comprises foundations, component variants, and source code already implemented in our products. As our products evolve, an increasing number of component design variations are being implemented across our dashboards.'
        ]
      },
      {
        number: '02',
        badge: '02 · The Workshop',
        title: 'The Workshop',
        paragraphs: [
          'As designers and writer, we held a design system strategy workshop—facilitated by me and sponsored by my lead—to brainstorm and plan the design system. The workshop aims to identify the vision and mission, pain points, goals, and more.'
        ],
        images: [
          {
            url: '/assets/projects/doku/The Workshop Image.png',
            aspect: 'wide'
          }
        ],
        afterImageParagraphs: [
          'Selama workshop berlangsung saya mendapatkan insight banyak dari participant terkait design system, berikut poin inti yang kita dapatkan.'
        ]
      },
      {
        number: '03',
        badge: '03 · Diagnostic Workflow',
        title: '1. Missing Component Update Flow',
        paragraphs: [
          'Our existing workflow lacked a proper process for distributing and updating components across teams, leading to inconsistencies in the design system.'
        ],
        imagesBeforePoints: true,
        images: [
          {
            url: '/assets/projects/doku/Missing Component Update.png',
            aspect: 'wide'
          }
        ],
        keyPoints: [
          {
            title: 'Lack of Component Visibility Across Designers',
            description: 'Limited visibility across designers led to duplicate components with inconsistent variations, making the design system harder to maintain, update, and scale consistently.'
          },
          {
            title: 'Missing Design System Synchronization Flow',
            description: 'Updated components implemented during development were often not synchronized back to the design system repository, resulting in outdated libraries and misalignment across teams.'
          }
        ]
      },
      {
        number: '04',
        badge: '04 · Foundation & Behavior Gaps',
        title: '2. Inconsistency Design Across Products',
        paragraphs: [
          'Each designer had their own approach when designing product interfaces. Without clearly defined design foundations and standards, inconsistencies appeared across products, including foundations, behaviors, and component usage.',
          'For example in details page, we have different behaviour to return the parent page, inconsistency spacing and header page components in body dashboard.'
        ],
        images: [
          {
            url: '/assets/projects/doku/doku-product-inconsistency-breakdown.svg',
            aspect: 'wide'
          }
        ]
      }
    ]
  },
  orderonline: {
    id: 'orderonline',
    title: 'Building New Seller Experience for Create The Website',
    tag: 'Web Application',
    category: 'Website',
    client: 'OrderOnline.id',
    role: 'Product Designer',
    year: '2023 - 2024',
    timeline: '2 Months',
    summary: 'Storefront is a website builder platform that makes it effortless for online business owners and merchants to create an online store to market their products without needing coding skills.',
    coverImage: '/assets/projects/storefront/Cover_Portfolio_Storefront_Fix.webp',
    stats: [
      { value: '100%', label: 'No-code storefront setup for sellers' },
      { value: '1x.xx%+', label: 'User growth over 6 months post-rollout' },
      { value: 'WYSIWYG', label: 'Real-time responsive live editor experience' }
    ],
    overview: 'Storefront on OrderOnline.id empowers merchants to build dedicated digital stores seamlessly. To modernize the legacy builder, we conducted proactive usability tests and competitive feature audits, decoupling fragmented dashboard menus into a true live editor.',
    problem: 'Sellers suffered from cognitive overload due to cluttered menus mixed into a single dashboard. Lack of live preview forced sellers to toggle back-and-forth to a live website, while template discovery lacked device responsiveness validation.',
    solution: 'Separated administrative dashboard features from visual styling, eliminated unused legacy options, designed a single-page responsive template selector, and engineered an intuitive WYSIWYG Live Editor with real-time viewport toggles and contextual tooltips.',
    galleryImages: [
      '/assets/projects/storefront/6c9bbd74-3c31-4390-9dcd-3929219a832a.webp',
      '/assets/projects/storefront/be125896-c7ed-44f1-8a88-f8ecb26042cf.webp',
      '/assets/projects/storefront/Result_Exploration.webp',
      '/assets/projects/storefront/Explain_the_new_config_dashboard_(1).webp'
    ],
    metaDetails: {
      platform: 'Web Application (Desktop & Mobile Responsive)',
      responsibilities: [
        'User Research & Usability Testing (UT)',
        'Competitive & SWOT Benchmarking',
        'Information Architecture & Menu Relayouting',
        'Live WYSIWYG Storefront Editor Prototyping',
        'Design Systems & Developer Handover'
      ],
      tools: ['Figma', 'Maze', 'Google Analytics', 'Whimsical'],
      team: 'Product Designer, Product Manager, Frontend & Backend Engineers, QA Squad'
    },
    sections: [
      {
        number: '01',
        badge: '01 · Discovery & Research',
        title: 'Validating Assumptions Through Usability Testing',
        summary: 'Transitioning from stakeholder guesswork to empirical user behavior evidence.',
        callouts: [
          {
            icon: '⚠️',
            label: 'Research Initiative Disclaimer',
            text: 'Previously, we did not conduct much research before developing features, relying solely on assumptions from stakeholders. For this initiative, I conducted proactive research sessions with both existing and newly onboarded sellers to map divergent mental models.'
          }
        ],
        keyPoints: [
          {
            title: 'Usability Testing (UT) Across Cohorts',
            description: 'Interviewed and observed both active power sellers and newly registered sellers to uncover distinct friction points in store setup workflows.'
          },
          {
            title: 'Competitive Feature Audit (TokoTalk & Others)',
            description: 'Analyzed direct competitors, benchmarked TokoTalk’s dashboard architecture, and evaluated catalog structures, homepage customization blocks, and pricing models.'
          },
          {
            title: 'SWOT Analysis & Competitive Advantages',
            description: 'Identified key differentiators to leverage: affordable subscription pricing, native reseller distribution channels, and deep Google Analytics tracking integration.'
          }
        ],
        images: [
          {
            url: '/assets/projects/storefront/AffDiagram_Problem.webp',
            caption: 'Pain points and seller needs synthesized into an Affinity Diagram to identify root problems',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/storefront/TokoTalk_Dashboard.webp',
            caption: 'Competitive benchmarking analysis on TokoTalk dashboard and navigation hierarchy',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/storefront/Image_Audit_Features.webp',
            caption: 'Detailed feature configuration audit across homepage sections, product catalogs, and editor controls',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Strength_and_Weakness.webp',
            caption: 'SWOT matrix identifying opportunities in pricing, reseller logistics, and analytics tracking',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '02',
        badge: '02 · Problem Synthesis',
        title: 'Four Core Bottlenecks in the Existing Experience',
        summary: 'Clear pain points that prevented sellers from launching their stores effectively.',
        keyPoints: [
          {
            title: '01. Rigid Template Installation Flow',
            description: 'Templates had to be installed blind before sellers could see how they looked or confirm whether the layout supported different mobile and tablet screens.'
          },
          {
            title: '02. Disconnected Preview Feedback Loop',
            description: 'Unable to see design updates in real time while configuring. To inspect changes, users had to open the live website in another window, creating cognitive friction and uncertainty.'
          },
          {
            title: '03. Cluttered & Unused Configurations',
            description: 'The single dashboard was overloaded with legacy and neglected settings that distracted merchants from focusing on what truly mattered for their storefront.'
          },
          {
            title: '04. Ambiguous Labels & Zero Contextual Guidance',
            description: 'Configuration toggles lacked helpful descriptions or microcopy, leaving non-technical merchants confused about the purpose and impact of specific settings.'
          }
        ]
      },
      {
        number: '03',
        badge: '03 · Ideation & Architecture',
        title: 'Information Architecture Overhaul & Feature Relayouting',
        summary: 'Decoupling administrative management from visual customization.',
        paragraphs: [
          'Based on usability testing insights, I led the architectural redesign by clustering related features, removing dead weight, and redesigning the template discovery workflow.'
        ],
        keyPoints: [
          {
            title: 'Idea 1: Relayouting & Pruning Unused Features',
            description: 'Mapped existing features into functional clusters, purged unutilized options that cluttered the dashboard, and established a clean separation between administrative settings and visual design.'
          },
          {
            title: 'Idea 2: Frictionless Single-Page Template Flow',
            description: 'Framed "How Might We" challenges: (1) HMW enable users to browse and apply templates on a single page without prior installation? (2) HMW help users understand responsive template behavior per device? Introduced device silhouetted previews.'
          }
        ],
        images: [
          {
            url: '/assets/projects/storefront/Grouping_Existing_Features.webp',
            caption: 'Grouping legacy features into cohesive functional clusters before re-architecting',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Remove_Features_(2).webp',
            caption: 'Auditing and removing obsolete features that hindered seller productivity',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Result_Menus_Structure.webp',
            caption: 'New structural blueprint clearly dividing Dashboard configuration and Live Editor controls',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Existing_Flow_Template.webp',
            caption: 'Legacy multi-step template installation flow requiring blind commitment',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/New_Flow_Template.webp',
            caption: 'Streamlined new template workflow enabling instant selection and preview',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Result_Exploration.webp',
            caption: 'Internal testing exploration showing device silhouette previews in "Desain Toko Kamu"',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '04',
        badge: '04 · Visual Design & Experience',
        title: 'Engineering the Live WYSIWYG Storefront Editor',
        summary: 'Real-time design canvas, modular sidebars, and contextual micro-guidance.',
        keyPoints: [
          {
            title: 'Idea 3: Unified Live Store Editor',
            description: 'Created a focused editor navbar with device toggle previews (Desktop, Tablet, Mobile), undo/redo controls, and instant publish triggers. The collapsible sidebar provides structured access to banners, testimonials, colors, and product catalog displays with instantaneous visual feedback.'
          },
          {
            title: 'Idea 4: Contextual Guidance & Tooltip Architecture',
            description: 'Implemented informative tooltips and concise microcopy next to technical settings, eliminating guesswork and guiding merchants gently through complex configurations.'
          }
        ],
        images: [
          {
            url: '/assets/projects/storefront/Explain_about_navbar_editor.webp',
            caption: 'Editor top navbar layout: responsive viewport switches, action history, and live preview links',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Sidebar_Only.webp',
            caption: 'Consolidated sidebar navigation allowing quick navigation between design sections',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/storefront/6c9bbd74-3c31-4390-9dcd-3929219a832a.webp',
            caption: 'The final Live Editor interface empowering sellers with real-time visual editing',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/be125896-c7ed-44f1-8a88-f8ecb26042cf.webp',
            caption: 'Homepage block configuration for banners, collections, and promotional sections',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Explain_the_new_config_dashboard_(1).webp',
            caption: 'New dashboard settings layout with clear section headers and guidance',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/storefront/Tooltip_Solution.webp',
            caption: 'Contextual tooltips providing clear explanations for previously ambiguous settings',
            aspect: 'standard'
          }
        ]
      },
      {
        number: '05',
        badge: '05 · Impact & Learnings',
        title: 'Measurable Growth & Lessons in Simplicity',
        summary: 'Demonstrating user growth and putting design philosophy into practice.',
        keyPoints: [
          {
            title: 'Sustained User Growth (1x.xx% - xx.xx%)',
            description: 'Data Science analytics recorded an average increase of 1x.xx% to xx.xx% in active product users within 6 months post-rollout.'
          },
          {
            title: 'Championing Research in Product Culture',
            description: 'Successfully demonstrated to leadership that proactive user research and usability testing derisk complex overhauls and directly elevate business adoption.'
          },
          {
            title: 'John Maeda’s Laws of Simplicity in Practice',
            description: 'Applied Maeda’s core principle of simplicity: subtract the obvious and add the meaningful. Pruning unnecessary controls while elevating live feedback created an empowering user experience.'
          }
        ]
      }
    ],
    lessonLearned: {
      title: 'Design Reflection',
      text: "This revamp was a milestone project in my product design journey. I learned to navigate cross-divisional collaboration, initiate research to uncover genuine seller insights, and demonstrate the business value of data to stakeholders. Most rewardingly, putting John Maeda's simplicity principles into practice proved that subtracting clutter empowers users far more than adding complexity.",
      bullets: [
        'Validated that live visual feedback dramatically reduces cognitive hesitation during authoring flows.',
        'Demonstrated that proactive research initiatives convert skeptical stakeholders into user advocates.',
        'Proved that simplicity is not the absence of clutter, but the mastery of clear hierarchy and context.'
      ]
    }
  },
  'orderonline-settings': {
    id: 'orderonline-settings',
    title: 'Increase Conversion Rate Store Settings',
    tag: 'UX Optimization',
    category: 'Website',
    client: 'OrderOnline.id',
    role: 'Product Designer',
    year: '2023',
    timeline: '1 Month',
    summary: 'Optimizing the store settings information architecture, hierarchy, and interaction copywriting to maximize feature adoption and boost online seller conversion.',
    coverImage: '/assets/projects/settings/Cover_Portfolio_Settings.webp',
    stats: [
      { value: '+5.72%', label: 'Increase in main Online Store setting usage' },
      { value: 'Top Tier', label: 'Online Store repositioned to primary top spot' },
      { value: '1 Floating Bar', label: 'Unified bottom save action with instant cancel' }
    ],
    overview: 'Settings on OrderOnline.id is a mission-critical support tool where merchants manage transactions, courier logistics, and third-party integrations. Hotjar scroll and click heatmaps revealed significant drop-offs that prevented sellers from discovering and utilizing core Online Store capabilities.',
    problem: 'Hotjar heatmaps revealed that seller scrolling intensity plummeted before reaching main Online Store settings card buried down the page. Sellers felt frustrated navigating sub-menus, were confused by multiple scattered "Save" buttons, and struggled with ambiguous toggles lacking guidance.',
    solution: 'Repositioned Online Store settings to the top of the hierarchy, crafted concise contextual UX microcopy explaining each toggle, and introduced a unified floating bottom Save bar with an instant cancel action to eliminate error anxiety.',
    galleryImages: [
      '/assets/projects/settings/result_eploration_menu_settings.webp',
      '/assets/projects/settings/Interaction_Solution_(1).webp',
      '/assets/projects/settings/Analysis_Data_Menu_Settings.webp',
      '/assets/projects/settings/Analysis_Data_Sub_Menu_Settings.webp'
    ],
    metaDetails: {
      platform: 'Web Application (Merchant Dashboard)',
      responsibilities: [
        'Hotjar Heatmap & Click Stream Analysis',
        'Seller In-Depth Interviews',
        'UI Component & IA Audit',
        'UX Copywriting & Microcopy',
        'Rapid Prototyping & Developer Handover'
      ],
      tools: ['Figma', 'Hotjar Heatmaps & Recordings', 'Google Analytics'],
      team: 'Product Designer, Product Manager, Data Science Team, Frontend Engineers'
    },
    sections: [
      {
        number: '01',
        badge: '01 · Overview & Objective',
        title: 'Optimizing the Merchant Settings Engine',
        summary: 'Enabling sellers to configure sales channels and integrations with zero friction.',
        paragraphs: [
          'Settings on OrderOnline.id serves as the foundational support center where sellers configure online payment gateways, shipping couriers, third-party marketing tools, and online storefront behaviors to drive their e-commerce revenue.',
          'The core objective of this optimization sprint was to facilitate merchants in effortlessly discovering desired configurations, removing navigational friction, and boosting the conversion rate of primary Online Store settings usage.'
        ]
      },
      {
        number: '02',
        badge: '02 · Quantitative & Qualitative Discovery',
        title: 'Uncovering Friction via Hotjar Heatmaps & Seller Interviews',
        summary: 'Combining behavioral telemetry with firsthand qualitative merchant insights.',
        callouts: [
          {
            icon: '📊',
            label: 'Research Methodology Note',
            text: 'Telemetry heatmaps pinpointed WHERE drop-offs occurred, while in-depth merchant interviews unraveled WHY. Combining both within a focused 1-month sprint enabled fast, data-backed validation without speculative assumptions.'
          }
        ],
        keyPoints: [
          {
            title: 'Scroll Heatmap on Main Settings Menu',
            description: 'Hotjar scroll telemetry revealed that scrolling intensity dropped drastically as merchants moved down the page, meaning the main Online Store setting card was severely under-exposed.'
          },
          {
            title: 'Sub-Menu Scroll Drop-off & Feature Blindspots',
            description: 'Analyzing sub-menu heatmaps confirmed that scroll depth cratered as pages grew longer. High-value configuration capabilities located lower down were virtually unvisited.'
          },
          {
            title: 'In-Depth Seller Interviews',
            description: 'Interviews with seasoned merchants revealed three consistent pain points: (1) Frustration navigating between sub-menus requiring repetitive deep scrolling; (2) Failure to understand setting utilities without explanations; (3) Confusion over multiple save buttons per card with no option to cancel unintended edits.'
          }
        ],
        images: [
          {
            url: '/assets/projects/settings/Analysis_Data_Menu_Settings.webp',
            caption: 'Hotjar click and scroll heatmap revealing steep drop-off before reaching core settings',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/settings/Analysis_Data_Sub_Menu_Settings.webp',
            caption: 'Sub-menu scroll analysis indicating underutilization of features located lower on the page',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '03',
        badge: '03 · UX & Component Audit',
        title: 'Diagnosing Three Structural Design Flaws',
        summary: 'A forensic audit of existing UI components and interaction patterns.',
        keyPoints: [
          {
            title: 'Audit 1: Deep Stacks of Menus & Wasted Whitespace',
            description: 'Menus were stacked in long vertical arrangements with excessive dead margins, making browsing between sub-menus tedious and requiring high physical scrolling effort.'
          },
          {
            title: 'Audit 2: Absence of Interaction Copywriting',
            description: 'Toggles and inputs stood in isolation without explanatory microcopy, forcing sellers to guess what changes would happen to their customer checkout experience.'
          },
          {
            title: 'Audit 3: Fragmented Multiple Save Triggers',
            description: 'Individual cards each featured separate "Save" buttons. Merchants were anxious about whether all edits were saved, and the absence of a Cancel button created fear of human error.'
          }
        ],
        images: [
          {
            url: '/assets/projects/settings/Audit_Component_1.webp',
            caption: 'Audit 1: Stack of menus and excessive whitespace creating high scroll friction',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/settings/Audit_Component_2_(1).webp',
            caption: 'Audit 2: Features lacking contextual interaction copy to explain technical utilities',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/settings/Audit_Component_3.webp',
            caption: 'Audit 3: Multiple redundant save buttons scattered across each sub-menu',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '04',
        badge: '04 · Design Solutions',
        title: 'Concise Navigation, Contextual Microcopy & Floating Save Bar',
        summary: 'Targeted design solutions formulated through "How Might We" inquiries.',
        keyPoints: [
          {
            title: 'Solution 1: Elevated Hierarchy & Compact Menu Cards',
            description: 'Redesigned settings into clean, modular cards with balanced padding. Repositioned the primary Online Store card directly at the top of the page, ensuring 100% immediate visibility without scrolling.'
          },
          {
            title: 'Solution 2: Human-Centric Interaction Microcopy',
            description: 'Drafted clear, concise UX copy beneath every setting toggle, explaining in plain language how activating each option optimizes sales and protects store checkout.'
          },
          {
            title: 'Solution 3: Unified Floating Bottom Save Bar',
            description: 'Eliminated scattered individual buttons in favor of a sticky floating bottom bar that triggers when edits occur, complete with an instant "Cancel" action to revert changes safely.'
          }
        ],
        images: [
          {
            url: '/assets/projects/settings/result_eploration_menu_settings.webp',
            caption: 'New settings menu layout with Online Store elevated to the top for instantaneous access',
            aspect: 'wide'
          },
          {
            url: '/assets/projects/settings/Interaction_Solution_(1).webp',
            caption: 'Clear contextual microcopy accompanying each setting toggle and configuration input',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '05',
        badge: '05 · Impact & Learnings',
        title: '+5.72% Adoption Boost in a 1-Month Sprint',
        summary: 'Tangible data-backed growth and strategic takeaways.',
        keyPoints: [
          {
            title: '+5.72% Increase in Main Setting Usage',
            description: 'Following deployment, analytics validated by the Data Science team recorded a +5.72% increase in the usage of the main Online Store configuration.'
          },
          {
            title: 'Precision Through Telemetry',
            description: 'Learned that quantitative analytics like Hotjar heatmaps, when corroborated by qualitative seller interviews, provide laser-focused clarity on what to fix first.'
          },
          {
            title: 'Speed & Impact Alignment',
            description: 'Executed the entire audit, design exploration, internal testing, and developer handover within a rapid 1-month window, delivering immediate commercial value.'
          }
        ]
      }
    ],
    lessonLearned: {
      title: 'Design Reflection',
      text: 'This fast-paced 1-month optimization challenged me to leverage quantitative data telemetry and qualitative merchant interviews to dissect subtle UX friction. Applying strict hierarchy principles and concise microcopy made the settings interface remarkably intuitive, driving measurable adoption while safeguarding user confidence with human-error recovery mechanisms.',
      bullets: [
        'Data heatmaps expose where attention drops; user interviews explain why it happened.',
        'Repositioning high-value features above the fold delivers immediate adoption dividends.',
        'A single floating save bar with an instant cancel button turns an anxious form into a safe playground.'
      ]
    }
  },
  trawlbens: {
    id: 'trawlbens',
    title: 'Increase Coordinator Productivity for Promote Apps',
    tag: 'Mobile Application',
    category: 'Mobile',
    client: 'TrawlBens',
    role: 'UI/UX Designer',
    year: '2021 - 2022',
    timeline: '7 Months',
    summary: 'Designing an end-to-end promotional mobile app suite for logistics Account Executives and Coordinators to track referrals, monitor commission targets, and distribute instant promo vouchers.',
    coverImage: '/assets/projects/promote-apps/Cover_Portfolio_Coordinator_Fix.webp',
    stats: [
      { value: '+5.37%', label: 'Increase in cargo delivery transactions across all fleets' },
      { value: 'Real-time', label: 'Transparent team & personal income monitoring' },
      { value: 'Self-Service', label: 'Instant promo voucher generation without admin delays' }
    ],
    overview: 'Trawlbens is a digital cargo logistics company providing affordable freight across the Indonesian archipelago. To scale freight volume, leadership introduced performance incentives for the field sales force. We built Promote Apps to replace manual paper brochures with digital referral sharing, transparent commission tracking, and self-service promo generators.',
    problem: 'Account Executives relied on distributing printed paper brochures with zero tracking of user conversions. Coordinators could not monitor team quota progress, and creating promotional vouchers required slow, manual paper approvals from back-office admins.',
    solution: 'Designed an integrated mobile suite featuring unique referral link sharing with live conversion history, a transparent monthly Achievement and Income Monitoring dashboard for both agents and coordinators, and an on-demand self-service voucher generator with automated validation rules.',
    galleryImages: [
      '/assets/projects/promote-apps/Solution_1.1.webp',
      '/assets/projects/promote-apps/Solution_2.1_Result.webp',
      '/assets/projects/promote-apps/Solution_2.2.webp',
      '/assets/projects/promote-apps/Solution_3.webp'
    ],
    metaDetails: {
      platform: 'Android Mobile Application',
      responsibilities: [
        'Stakeholder & Account Executive In-Depth Interviews',
        'Concept Modeling & Workflow Mapping',
        'Semantic Color Rebalancing (Red Brand Cognitive Load)',
        'Referral Tracking & Commission Dashboard Architecture',
        'Self-Service Promo Voucher Generator UX'
      ],
      tools: ['Figma', 'Miro', 'Zeplin'],
      team: 'UI/UX Designer, Product Manager, Business Development Leads, Mobile Dev Team'
    },
    sections: [
      {
        number: '01',
        badge: '01 · Overview & Business Context',
        title: 'Scaling Cargo Logistics Across Indonesia',
        summary: 'Incentivizing the field sales force with real-time digital transparency.',
        paragraphs: [
          'Trawlbens is an innovative freight and cargo logistics company in Indonesia offering affordable shipping services that reach all corners of the archipelago via an integrated mobile platform.',
          'Despite aggressive pricing, cargo delivery volume had not achieved its target scale. The executive leadership introduced an incentive model where Account Executives (AEs) and Area Coordinators earn commissions on every delivery transaction completed by users they onboard.'
        ]
      },
      {
        number: '02',
        badge: '02 · Problem Discovery & Research',
        title: 'In-Depth Interviews with Ground Sales & Coordinators',
        summary: 'Identifying operational bottlenecks holding back business development.',
        paragraphs: [
          'In collaboration with the Product Manager, I conducted in-depth interviews with Account Executives and Coordinators to map their daily routines, friction points, and field requirements.'
        ],
        keyPoints: [
          {
            title: '01. Promoting Services via Paper Brochures',
            description: 'Account Executives marketed cargo services solely by handing out printed paper brochures. They had no way of knowing whether prospective clients downloaded the app or booked shipments.'
          },
          {
            title: '02. Blind Target Monitoring & Delayed Commission Visibility',
            description: 'Coordinators had no digital mechanism to monitor team and personal targets, verify referral shipments, or calculate expected commission payouts, dampening field motivation.'
          },
          {
            title: '03. Cumbersome Manual Promo Voucher Approvals',
            description: 'Offering promotional discounts during logistics expos or client meetings required formal paper requests to head-office admins, a slow process that caused lost sales opportunities.'
          }
        ],
        images: [
          {
            url: '/assets/projects/promote-apps/Concept_Model.webp',
            caption: 'Concept model detailing coordinator workflows, AE interactions, and commission milestones',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '03',
        badge: '03 · Visual Design Challenge',
        title: 'The Brand Red Cognitive Load Dilemma',
        summary: 'Resolving the tension between an intense red brand identity and UI error states.',
        paragraphs: [
          'Trawlbens’ primary brand color is a saturated, fiery red. In UI design conventions, red universally signifies critical errors, destructive actions, and warnings. Blanket application of red across interactive elements created visual anxiety and elevated user cognitive load.'
        ],
        callouts: [
          {
            icon: '⚠️',
            label: 'Brand & Semantic UI Alert',
            text: 'Color psychology in product design: When a corporate brand relies on intense red, interactive buttons and alert states must be semantically decoupled to prevent cognitive confusion with system errors and critical warnings.'
          }
        ],
        keyPoints: [
          {
            title: '01. Purposeful Secondary CTA Palette',
            description: 'Introduced cool-toned secondary colors for primary buttons and interactive touchpoints, reserving red strictly for key brand anchors and minimizing saturation fatigue.'
          },
          {
            title: '02. Semantic Information State System',
            description: 'Created dedicated status colors (info blues, success greens, milestone ambers) for charts, progress bars, and transaction badges.'
          },
          {
            title: '03. Translucent Header & Clean Topbar Hierarchy',
            description: 'Engineered a transparent topbar with a clean secondary logo variant for default states, ensuring brand elegance without visual clutter.'
          }
        ],
        images: [
          {
            url: '/assets/projects/promote-apps/The_Existing_Brand.webp',
            caption: 'The existing primary brand color and cognitive load challenge with error states',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/promote-apps/The_Color_Solution.webp',
            caption: 'Color system solution: secondary action hues, semantic state palettes, and balanced neutrals',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '04',
        badge: '04 · Core Design Solutions',
        title: 'Three Integrated Modules for Field Sales Productivity',
        summary: 'Frictionless referral sharing, live income monitoring, and self-service promo vouchers.',
        keyPoints: [
          {
            title: 'Solution 1: Referral Link Sharing & User Onboarding Log',
            description: 'Coordinators and AEs can share their personalized referral code in 1 tap via WhatsApp, Telegram, or social media. A live chronological feed displays recently onboarded customers with custom date range filtering.'
          },
          {
            title: 'Solution 2: Achievement & Income Monitoring Dashboard',
            description: 'A dual-view dashboard showing personal quota progress for AEs, and a dedicated team management view for Coordinators detailing active agents, cargo volume statistics, and commission accruals.'
          },
          {
            title: 'Solution 3: Self-Service Promo Voucher Generator',
            description: 'An instant voucher creator empowering AEs to generate tailored shipping promos with customizable discount terms and weight limits on the fly without waiting for admin sign-offs.'
          }
        ],
        images: [
          {
            url: '/assets/projects/promote-apps/Solution_1.1.webp',
            caption: 'Solution 1: Unique referral link generator and quick sharing modal',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/promote-apps/Solution_1.2.webp',
            caption: 'Solution 1: Real-time referral history log with custom date range filtering',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/promote-apps/Solution_2.1_Result.webp',
            caption: 'Solution 2: Monthly target achievement progress and commission quota tracking',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/promote-apps/Solution_2.2.webp',
            caption: 'Solution 2: Team income monitoring overview with interactive commission charts',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/promote-apps/Solution_2.3.webp',
            caption: 'Solution 2: Personal breakdown of commissions earned from active cargo shipments',
            aspect: 'standard'
          },
          {
            url: '/assets/projects/promote-apps/Solution_3.webp',
            caption: 'Solution 3: Self-service promo voucher generator with automated rule validation',
            aspect: 'standard'
          }
        ]
      },
      {
        number: '05',
        badge: '05 · Impact & Learnings',
        title: '+5.37% Delivery Transactions & Design Reflections',
        summary: 'Measurable freight volume growth and invaluable professional learnings.',
        keyPoints: [
          {
            title: '+5.37% Cargo Delivery Volume Growth',
            description: 'Within 6 months of rollout, analytics from the Data Engineering team confirmed an average 5.37% increase in cargo delivery transactions across all fleet vehicle categories.'
          },
          {
            title: 'Sales Force Empowerment',
            description: 'Replaced paper brochures with digital transparency, giving field reps instant clarity over their target milestones and financial compensation.'
          },
          {
            title: 'Semantic Color Mastery',
            description: 'Tackling an intense red brand identity taught me how to separate brand expression from functional UI feedback, a critical design skill for complex systems.'
          }
        ]
      }
    ],
    lessonLearned: {
      title: 'Design Reflection',
      text: 'Designing Promote Apps as a junior designer was a deeply transformative experience. It gave me the opportunity to conduct field research with sales agents, map complex commission logic into simple mobile views, and directly influence the company’s bottom line. Overcoming the cognitive tension of a red brand identity taught me that color in product design is first and foremost a communication tool.',
      bullets: [
        'Field sales tools require extreme simplicity and instant offline/online status feedback.',
        'Never let brand colors hijack interface semantics; maintain strict color rules for interactive states.',
        'Automating manual approval bottlenecks (like promo vouchers) unlocks massive field velocity.'
      ]
    }
  }
};

export const CASE_STUDY_ORDER: string[] = [
  'doku',
  'orderonline',
  'orderonline-settings',
  'trawlbens'
];

export const EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'exp-1',
    title: 'Dashboard concept',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80',
    dribbbleUrl: 'https://dribbble.com/aldoabieza',
    source: 'Dribbble ↗'
  },
  {
    id: 'exp-2',
    title: 'Wallet app UI',
    imageUrl: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600&q=80',
    dribbbleUrl: 'https://dribbble.com/aldoabieza',
    source: 'Dribbble ↗'
  },
  {
    id: 'exp-3',
    title: 'Landing page study',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80',
    dribbbleUrl: 'https://dribbble.com/aldoabieza',
    source: 'Dribbble ↗'
  },
  {
    id: 'exp-4',
    title: 'Card components',
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-7c9944af0d0e?w=600&q=80',
    dribbbleUrl: 'https://dribbble.com/aldoabieza',
    source: 'Dribbble ↗'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'doku',
    company: 'DOKU',
    role: 'UI/UX Designer',
    period: 'September 2024 - Current',
    roleWithPeriod: 'September 2024 - Current | UI/UX Designer',
    logo: '/assets/logos/doku.svg',
    fallbackColor: '#E11931',
    fallbackLetter: 'D'
  },
  {
    id: 'orderonline',
    company: 'OrderOnline.id',
    role: 'Product Designer',
    period: 'July 2022 - May 2024',
    roleWithPeriod: 'July 2022 - May 2024 | Product Designer',
    logo: '/assets/logos/orderonline.webp',
    fallbackColor: '#0066F5',
    fallbackLetter: 'O'
  },
  {
    id: 'trawlbens',
    company: 'TrawlBens',
    role: 'UI/UX Designer',
    period: 'November 2021 - June 2022',
    roleWithPeriod: 'November 2021 - June 2022 | UI/UX Designer',
    logo: '/assets/logos/trawlbens.webp',
    fallbackColor: '#E11931',
    fallbackLetter: 'T'
  }
];
