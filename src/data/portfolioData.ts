import { CaseStudy, ExperienceItem } from '../types';

export interface ExperimentItem {
  id: string;
  title: string;
  category: string;
  source: string;
  imageUrl: string;
  dribbbleUrl: string;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: string;
  year: string;
  aspect: string;
  description: string;
  figmaLink: string;
  previewType: string;
  tags: string[];
}

export const EXPERIMENTS: ExperimentItem[] = [
  {
    id: '1',
    title: 'Gojo Satoru (五条悟) — Character Illustration',
    category: 'Vector Illustration',
    source: 'Dribbble',
    imageUrl: '/assets/aistudio/illustration_aldo_ceba0920.webp',
    dribbbleUrl: 'https://dribbble.com/aldoabieza'
  },
  {
    id: '2',
    title: 'NFT Marketplace Mobile App Concept',
    category: 'Mobile UI & 3D',
    source: 'Dribbble',
    imageUrl: '/assets/aistudio/original-d091b048d60984e8e988dcd3af652d90_ac246c11.webp',
    dribbbleUrl: 'https://dribbble.com/aldoabieza'
  },
  {
    id: '3',
    title: 'Custom Iconography System Exploration',
    category: 'Icon Design',
    source: 'Dribbble',
    imageUrl: '/assets/aistudio/eksplorasicon2_d2a06aae.png',
    dribbbleUrl: 'https://dribbble.com/aldoabieza'
  },
  {
    id: '4',
    title: 'Health & Task Management Ecosystem',
    category: 'Product Design',
    source: 'Dribbble',
    imageUrl: '/assets/aistudio/original-c440fccf8a1b0f9ddad2dbb3986573bf_65cf09ca.webp',
    dribbbleUrl: 'https://dribbble.com/aldoabieza'
  }
];

export const CASE_STUDY_ORDER: string[] = [
  'doku',
  'orderonline',
  'orderonline-settings',
  'trawlbens'
];

export const CASE_STUDIES: Record<string, CaseStudy> = {
  // -------------------------------------------------------------
  // 01. DOKU — Design System Evolution
  // -------------------------------------------------------------
  doku: {
    id: 'doku',
    title: 'Leading the Evolution of DOKU’s Design System',
    tag: 'Design System Lead',
    tags: ['Design System', 'Fintech', 'Infrastructure', 'Lead'],
    category: 'Design System',
    client: 'DOKU',
    role: 'Design System Lead',
    platform: 'Design System',
    year: '2024 - Present',
    timeline: 'Q1 - Q3',
    tools: ['Figma', 'Token Studio', 'Storybook', 'Zeroheight'],
    summary:
      'Standardizing DOKU’s multi-product ecosystem through an enterprise-grade token architecture, accessibility-first component standards, and cross-functional governance.',
    isOnProgress: true,
    coverImage: '/assets/projects/doku/Cover_DS.png',
    stats: [
      { value: '38+', label: 'Digital Products' },
      { value: '98%', label: 'WCAG AA Compliance' },
      { value: '4.2x', label: 'Faster Slicing Velocity' },
      { value: '250+', label: 'Synced UI Components' }
    ],
    overview:
      'At DOKU, we are designers have a single source of truth for product development: DOKU Fragment. It comprises foundations, component variants, and source code already implemented in our products. As our products evolve, an increasing number of component design variations are being implemented across our dashboards.',
    problem:
      'DOKU suffered from significant UX debt across 38+ digital touchpoints. Independent engineering teams re-implemented elementary controls, causing inconsistent padding, conflicting color semantics, accessibility violations, and lengthy handoff cycles.',
    solution:
      'Architected and deployed the next-generation DOKU Design System: a multi-tier token schema, 250+ accessible headless-backed components, interactive Storybook documentation, and automated Figma-to-code syncing.',
    galleryImages: [
      '/assets/projects/doku/Cover_DS.png',
      '/assets/projects/doku/The Workshop Image.webp',
      '/assets/projects/doku/Missing Component Update.webp',
      '/assets/projects/doku/doku-product-inconsistency-breakdown.webp'
    ],
    metaDetails: {
      platform: 'Web, iOS, Android, Merchant Portal',
      responsibilities: [
        'Design Tokens & Semantic Architecture',
        'Component Library & Accessibility (WCAG AA)',
        'Figma to Storybook Pipeline Automation',
        'Cross-Product Governance & Design QA'
      ],
      tools: ['Figma', 'Storybook', 'Token Studio', 'Zeroheight', 'Jira'],
      team: '1 Lead Designer (Me), 4 Core Engineers, 2 Product Managers'
    },
    sections: [
      {
        number: '01',
        badge: 'Context',
        title: 'Overview',
        paragraphs: [
          'At DOKU, we are designers have a single source of truth for product development: DOKU Fragment. It comprises foundations, component variants, and source code already implemented in our products. As our products evolve, an increasing number of component design variations are being implemented across our dashboards.'
        ]
      },
      {
        number: '02',
        badge: 'Alignment',
        title: 'The Workshop',
        paragraphs: [
          'As designers and writer, we held a design system strategy workshop—facilitated by me and sponsored by my lead—to brainstorm and plan the design system. The workshop aims to identify the vision and mission, pain points, goals, and more.'
        ],
        images: [
          {
            url: '/assets/projects/doku/The Workshop Image.webp',
            caption: 'Design System Vision & Strategy Workshop: Brainstorming vision, mission, pain points, and cross-team alignment',
            aspect: 'wide'
          }
        ],
        afterImageParagraphs: [
          'Through discussions with participants, I gained insights into the challenges of maintaining the Design System, particularly around internal collaboration and component management.'
        ],
        subSections: [
          {
            title: 'Key Insight',
            isPrimaryTitle: true,
            paragraphs: [
              'We agreed to prioritize improving the internal Design System workflow to strengthen communication and collaboration among designers, making the system easier to maintain and scale.'
            ]
          }
        ]
      },
      {
        number: '03',
        badge: 'Discovery',
        title: 'Pain Points',
        subSections: [
          {
            title: 'Missing Component Update Flow',
            isPrimaryTitle: true,
            paragraphs: [
              'Our existing workflow lacked a proper process for distributing and updating components across teams, leading to inconsistencies in the design system.'
            ],
            images: [
              {
                url: '/assets/projects/doku/Missing Component Update.webp',
                caption: 'Existing component update workflow lacking centralized distribution and sync back to the design system repository',
                aspect: 'wide'
              }
            ],
            afterImageQuotes: [
              'Lack of Component Visibility Across Designers: Limited visibility across designers led to duplicate components with inconsistent variations, making the design system harder to maintain, update, and scale consistently.',
              'Missing Design System Synchronization Flow: Updated components implemented during development were often not synchronized back to the design system repository, resulting in outdated libraries and misalignment across teams.'
            ]
          },
          {
            title: 'Inconsistency design across products',
            isPrimaryTitle: true,
            paragraphs: [
              'Each designer had their own approach when designing product interfaces. Without clearly defined design foundations and standards, inconsistencies appeared across products, including foundations, behaviors, and component usage.',
              'For example in details page, we have different behaviour to return the parent page, inconsistency spacing and header page components in body dashboard'
            ],
            customVariant: 'inconsistency-cards'
          }
        ]
      },
      {
        number: '04',
        badge: 'Strategy',
        title: 'Defining the Design System Strategy',
        subSections: [
          {
            title: 'Create dedicated teams and new flow',
            isPrimaryTitle: true,
            paragraphs: [
              'We defined dedicated responsibilities and introduced a structured workflow to keep the Design System up to date, simplify maintenance, and improve component reusability across design and engineering teams.'
            ]
          }
        ]
      }
    ],
    lessonLearned: {
      title: 'PORTFOLIO IN PROGRESS',
      text: "I'm continuously refining my portfolio to better showcase my design process, decisions, and impact."
    }
  },

  // -------------------------------------------------------------
  // 02. OrderOnline.id — Storefront Website Builder
  // -------------------------------------------------------------
  orderonline: {
    id: 'orderonline',
    title: 'Building New Seller Experience for Create The Website',
    tag: 'Web Apps',
    tags: ['UI/UX', 'Web Apps', '🔥Must Read'],
    category: 'Website',
    client: 'OrderOnline.id',
    role: 'UI/UX Designer',
    year: '2023 - 2024',
    timeline: '2 Month',
    tools: ['Google Sheets', 'Figma', 'Google Meet'],
    summary:
      'Storefront is a website platform that makes it easy for users (business owners/sellers) to create a website to market their products without needing technical abilities such as coding.',
    coverImage: '/assets/projects/storefront/Cover_Portfolio_Storefront_Fix.webp',
    coverObjectPosition: 'left center',
    stats: [
      { value: '2 Mos', label: 'Research to Ship' },
      { value: '4 Core', label: 'Critical Friction Points' },
      { value: '100%', label: 'Live Visual Preview' },
      { value: '1 Flow', label: 'Zero-Install Templates' }
    ],
    overview:
      'Storefront is a website platform that makes it easy for users (business owners/sellers) to create a website to market their products without needing technical abilities such as coding.',
    problem:
      'Our product had poor UX in arranging layout and configuration because menus were mixed up within one dashboard, and sellers were unable to see real-time changes to their web store appearance.',
    solution:
      'Re-architected the entire Storefront information architecture: split Dashboard from the live visual Editor, established multi-device template previews, and streamlined store customization.',
    galleryImages: [
      '/assets/projects/storefront/Cover_Portfolio_Storefront_Fix.webp',
      '/assets/projects/storefront/AffDiagram_Problem.webp',
      '/assets/projects/storefront/TokoTalk_Dashboard.webp',
      '/assets/projects/storefront/Image_Audit_Features.webp',
      '/assets/projects/storefront/Strength_and_Weakness.webp',
      '/assets/projects/storefront/Added_New_Products.webp',
      '/assets/projects/storefront/Grouping_Existing_Features.webp',
      '/assets/projects/storefront/Remove_Features_(2).webp',
      '/assets/projects/storefront/Organize_Features.webp',
      '/assets/projects/storefront/Result_Menus_Structure.webp',
      '/assets/projects/storefront/Existing_Flow_Template.webp',
      '/assets/projects/storefront/New_Flow_Template.webp',
      '/assets/projects/storefront/Exploration_Design.webp',
      '/assets/projects/storefront/Result_Exploration.webp',
      '/assets/projects/storefront/Store_Design_Silhouette_Result.webp',
      '/assets/projects/storefront/Explain_About_Navbar_Editor.webp',
      '/assets/projects/storefront/Sidebar_Only.webp',
      '/assets/projects/storefront/Editor_Display_Menus.webp',
      '/assets/projects/storefront/Editor_HomePage_Config.webp',
      '/assets/projects/storefront/Explain_New_Config_Dashboard.webp',
      '/assets/projects/storefront/Tooltip_Solution.webp',
      '/assets/projects/storefront/Config_Information_Result_1.webp',
      '/assets/projects/storefront/Config_Information_Result_2.webp'
    ],
    metaDetails: {
      platform: 'Web Platform (Desktop & Mobile)',
      responsibilities: [
        'User Research & Usability Testing',
        'Competitive & SWOT Analysis',
        'Information Architecture & Menu Re-layout',
        'UI/UX Design & Interactive Prototyping'
      ],
      tools: ['Google Sheets', 'Figma', 'Google Meet'],
      team: '1 Product Designer (Me), 1 Product Manager, Engineering Team'
    },
    sections: [
      {
        number: '01',
        badge: 'Context',
        title: 'Overview',
        paragraphs: [
          'Storefront is a website platform that makes it easy for users (business owners/sellers) to create a website to market their products without needing technical abilities such as coding.'
        ]
      },
      {
        number: '02',
        badge: 'Discovery',
        title: 'Problem Assumption',
        quotes: [
          'Our product has poor UX in arranging layout and configuration because its menus are mixed up within one dashboard.',
          "When changing the store website's appearance, it feels difficult to see changes to website components directly."
        ]
      },
      {
        number: '03',
        badge: 'Research',
        title: 'Validate Assumption',
        paragraphs: [
          'Usability Testing: I conduct this testing with both existing and new sellers, aiming to identify issues/pain points from two different user perspectives.',
          'Competitive Analysis: Analyzing features and conducting a SWOT analysis to identify the strengths and weaknesses of our competitors, as well as serving as a reference for me to make design decisions.'
        ],
        callouts: [
          {
            icon: 'ℹ️',
            label: 'Additional Notes',
            text: "Previously, we didn't conduct much research before developing the product, relying solely on assumptions from stakeholders. Now, I do research initiatives."
          }
        ]
      },
      {
        number: '04',
        badge: 'Synthesis',
        title: 'User Problem',
        paragraphs: [
          'Below are the pain points/needs of users obtained from Usability Testing. Then grouped into an Affinity Diagram to identify the core problem.'
        ],
        images: [
          {
            url: '/assets/projects/storefront/AffDiagram_Problem.webp',
            caption: 'Affinity Diagram grouping user friction points and core themes',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '05',
        badge: 'Insights',
        title: 'Core Problem',
        quotes: [
          'The flow when using a website template because it needs to be installed first, and not knowing if the template can be used on different devices.',
          'Unable to see changes in the store design directly while editing. To see the results, users must view them on the live website.',
          'The website configuration is not well managed and unused, thus hindering users when managing their stores.',
          'Difficulty in using a configuration due to the lack of specific information to explain its function.'
        ]
      },
      {
        number: '06',
        badge: 'Benchmarking',
        title: 'Competitive Analysis',
        paragraphs: [
          "Among the many competitors we have found, 'TokoTalk' is the one whose features closely resemble our products."
        ],
        images: [
          {
            url: '/assets/projects/storefront/TokoTalk_Dashboard.webp',
            caption: 'Competitive feature analysis of TokoTalk Dashboard and Editor',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '07',
        badge: 'Audit',
        title: 'List Features',
        images: [
          {
            url: '/assets/projects/storefront/Image_Audit_Features.webp',
            caption: 'Audit competitor features with our product existing features',
            aspect: 'wide'
          }
        ],
        afterImageParagraphs: [
          'After conducting a detailed feature analysis, here is the summary I have obtained.'
        ],
        afterImageQuotes: [
          'More comprehensive feature configuration, especially in the Editor section.',
          'The homepage sections are more comprehensive, such as Testimonials and Partnership Lists.',
          'We lack some store page configurations, such as Catalog Product and Cart Product pages.',
          'Have some Live Editor, where users can freely explore their imagination to design their stores.'
        ]
      },
      {
        number: '08',
        badge: 'Strategy',
        title: 'SWOT Analysis',
        images: [
          {
            url: '/assets/projects/storefront/Strength_and_Weakness.webp',
            caption: 'SWOT Analysis: identifying our product strengths, weaknesses, and market advantages',
            aspect: 'wide'
          }
        ],
        afterImageParagraphs: [
          'Based on the analysis I have conducted, here are the opportunities presented by our product, which can serve as advantages to attract users from competitors.'
        ],
        afterImageQuotes: [
          'Cheap Subscription: Although competitors offer free subscriptions, our product has an affordable subscription price.',
          'Reseller Products: We have feature advantages that can help sellers sell their products to resellers.',
          "Website Tracking: Our product can monitor customer interactions on every page of the seller's web store, through installed Google Analytics."
        ],
        hidePointIcons: true
      },
      {
        number: '09',
        badge: 'Alignment',
        title: 'Handover Data',
        paragraphs: [
          'Presenting the research results to the stakeholders. Here are some of their considerations before starting the ideation phase of this project.',
          'Redesign based on UT result: Due to time constraints in development, stakeholders agreed to overhaul the product based on research data we obtained from UT.',
          'Added some competitor features: The stakeholders have requested us to add a new feature similar to our Funnel Builder, features from competitors, and other features to be added later.'
        ],
        images: [
          {
            url: '/assets/projects/storefront/Added_New_Products.webp',
            caption: 'Feature roadmap decisions and stakeholder scope additions',
            aspect: 'wide'
          }
        ],
        callouts: [
          {
            icon: '💡',
            text: 'I suggest that if the feature is implemented, it should be validated again by conducting a survey. Whether our users need the feature or not. However, our stakeholders still want to add it.'
          }
        ]
      },
      {
        number: '10',
        badge: 'Execution',
        title: 'Building Ideas',
        subSections: [
          {
            title: 'Ideas 1 : Relayouting Features',
            paragraphs: [
              'Grouping Existing Features: This method makes it easier for me to reorganize features with similar functions to create a new menu, and also to remove features that are not used by our users.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Grouping_Existing_Features.webp',
                caption: 'Grouping existing feature configurations into logical menu domains',
                aspect: 'wide'
              }
            ]
          },
          {
            title: 'Remove Features',
            paragraphs: [
              "And this is the feature that has been removed; the reason being our users do not use this feature, and it hinders the user's goal in modifying their store website."
            ],
            images: [
              {
                url: '/assets/projects/storefront/Remove_Features_(2).webp',
                caption: 'Removed unused features: General (Domain & Favicon), Appearance (Templates & CSS), and Assignation to eliminate friction',
                aspect: 'wide'
              }
            ]
          },
          {
            title: 'Organize Features',
            paragraphs: [
              'Reorganizing existing features with similarities and giving the new menu label, so that the available settings are well managed between the Dashboard and Editor.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Organize_Features.webp',
                caption: 'Categorized settings structure between Dashboard and Editor',
                aspect: 'wide'
              }
            ]
          },
          {
            title: 'Result Menus Structure',
            paragraphs: [
              "Here is the structure of the new Dashboard and Editor menus, making it easier for users to find the settings they want to use and set their store's appearance."
            ],
            images: [
              {
                url: '/assets/projects/storefront/Result_Menus_Structure.webp',
                caption: 'Final restructured Information Architecture and menu taxonomy',
                aspect: 'wide'
              }
            ]
          },
          {
            title: 'Ideas 2 : Improving User Flow Using Template',
            paragraphs: [
              'Simplifying the user flow for template usage and ensuring users understand that they can use different design templates on each device.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Existing_Flow_Template.webp',
                caption: 'Existing user flow when using website templates',
                aspect: 'wide'
              }
            ]
          },
          {
            title: 'How Might We',
            howMightWe: [
              {
                number: '01',
                text: 'How might we users can use templates on a single page without installing them beforehand.'
              },
              {
                number: '02',
                text: 'How might we users can understand, that they can use different templates for each device.'
              }
            ],
            images: [
              {
                url: '/assets/projects/storefront/New_Flow_Template.webp',
                caption: 'New simplified flow: using templates on a single page without installation and supporting multiple devices',
                aspect: 'wide'
              }
            ]
          },
          {
            title: 'Exploration Design',
            paragraphs: [
              'Exploring and introducing new designs to users when using templates, as well as conducting internal testing as early as possible.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Exploration_Design.webp',
                caption: 'Exploring new designs for browsing and selecting templates',
                aspect: 'wide',
                borderless: true
              }
            ],
            afterImageParagraphs: [
              "Here are the results from our internal team's testing, because this design can accommodate users in using templates, and the information is very clear."
            ]
          },
          {
            images: [
              {
                url: '/assets/projects/storefront/Result_Exploration.webp',
                caption: "Internal team testing result: intuitive card format with device tags",
                aspect: 'wide',
                borderless: true
              }
            ],
            afterImageParagraphs: [
              'Then wrapped in a special section, to search for templates based on device/category. And guide information, so that users understand that the template can be used for each device.'
            ]
          },
          {
            paragraphs: [
              'Here are the results. Users can easily use design templates on a single page and see the silhouette of the template used in the "Desain Toko Kamu" section.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Store_Design_Silhouette_Result.webp',
                caption: 'The Result: Instant silhouette preview of active template in "Desain Toko Kamu"',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Ideas 3: Create Store Design Editor',
            isPrimaryTitle: true
          },
          {
            title: 'Navbar Editor',
            paragraphs: [
              'Streamlined top navigation with intuitive breadcrumbs, responsive viewport toggle, store page selector, and instant preview actions.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Explain_About_Navbar_Editor.webp',
                caption: 'Navbar structure and controls in the Store Design Editor',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Sidebar Menu',
            paragraphs: [
              'Combined sidebar menus, and added a header navigation. So that users can easily move to the menu they want to go for change the store design.'
            ],
            images: [
              {
                url: '/assets/projects/storefront/Sidebar_Only.webp',
                caption: 'Consolidated sidebar menu with intuitive header navigation tabs',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'The Result',
            paragraphs: [
              'Here are the results of the editor I created, where users can design their stores with a new experience using the live editor.'
            ],
            imageLayout: 'vertical',
            images: [
              {
                url: '/assets/projects/storefront/Editor_Display_Menus.webp',
                caption: 'Display Menus — Real-time component controls and styling',
                aspect: 'wide',
                borderless: true
              },
              {
                url: '/assets/projects/storefront/Editor_HomePage_Config.webp',
                caption: 'Home Page Config — Direct layout and section customization with live preview',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Ideas 4: Create information to understand using configuration',
            isPrimaryTitle: true,
            paragraphs: [
              "Creating information to help users understand the configuration functions available in their store's Dashboard and Editor, which also serves as user guidance."
            ],
            imageLayout: 'vertical',
            images: [
              {
                url: '/assets/projects/storefront/Explain_New_Config_Dashboard.webp',
                caption: 'Contextual configuration information and helper copy',
                aspect: 'wide',
                borderless: true
              },
              {
                url: '/assets/projects/storefront/Tooltip_Solution.webp',
                caption: 'Tooltip solution providing clarity for complex settings without visual clutter',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'The Result',
            paragraphs: [
              'Clear microcopy and contextual tooltips significantly reduced confusion when sellers configure advanced store settings.'
            ],
            imageLayout: 'vertical',
            images: [
              {
                url: '/assets/projects/storefront/Config_Information_Result_1.webp',
                caption: 'The Result: Informative configuration cards with inline helper hints',
                aspect: 'wide',
                borderless: true
              },
              {
                url: '/assets/projects/storefront/Config_Information_Result_2.webp',
                caption: 'The Result: Detailed setting tooltips and user guidance in action',
                aspect: 'wide',
                borderless: true
              }
            ]
          }
        ]
      },
      {
        number: '11',
        badge: 'Validation',
        title: 'Design Testing',
        paragraphs: [
          'Due to our tight task load, I was unable to conduct UT on our design revamp. To gather feedback from users, we deployed the website first.'
        ]
      },
      {
        number: '12',
        badge: 'Impact',
        title: 'Experiment Result',
        paragraphs: [
          'According to the data I got from Data Science. Users of our product increased by an average of 1x.xx - xx.xx% after our product was released within 6 months.'
        ]
      }
    ],
    lessonLearned: {
      title: 'Lesson Learned',
      paragraphs: [
        'This revamp project has been a significant challenge for me because I learned to collaborate with other divisions, conduct research with initiatives to gain user insights, and prove to stakeholders the importance of research and data.',
        "Moreover, the most intriguing aspect of this project is that I put into practice what I've read from John Maeda's simplicity theory in simplifying an application, in a unique and sensible manner."
      ]
    }
  },

  // -------------------------------------------------------------
  // 03. OrderOnline.id — Store Settings Conversion
  // -------------------------------------------------------------
  'orderonline-settings': {
    id: 'orderonline-settings',
    title: 'Increase Conversion Rate Store Settings',
    tag: 'Web Apps',
    tags: ['UI/UX', 'Web Apps', '🔥Must Read'],
    category: 'Website',
    client: 'OrderOnline.id',
    role: 'UI/UX Designer',
    year: '2023',
    timeline: '1 Month',
    tools: ['Hotjar', 'Figma', 'Google Meet'],
    summary:
      'Facilitates users in finding the desired configurations and enhances the conversion of main settings usage (Online Store), thereby helping users to increase their sales.',
    coverImage: '/assets/projects/settings/Cover_Portfolio_Settings.webp',
    coverObjectPosition: 'left center',
    stats: [
      { value: '+5.72%', label: 'Online Store Usage' },
      { value: '1 Mo', label: 'Sprint Duration' },
      { value: '3 Core', label: 'Friction Themes' },
      { value: '1', label: 'Floating Save Action' }
    ],
    overview:
      'Settings on OrderOnline.id is a support tool where sellers can manage their sales and integrate the accounts they want to achieve their goal to get the revenue from their product sales.',
    problem:
      'Seller scroll intensity dropped steeply down the page, leaving critical store settings unconfigured. Confusing multiple "Save" buttons and sparse UX copy caused errors and high drop-off.',
    solution:
      'Elevated key store settings to top-level hierarchy, eliminated repetitive manual saving via a unified floating action bar, and created contextual microcopy across configuration panels.',
    galleryImages: [
      '/assets/projects/settings/Cover_Portfolio_Settings.webp',
      '/assets/projects/settings/Analysis_Data_Menu_Settings.webp',
      '/assets/projects/settings/Analysis_Data_Sub_Menu_Settings.webp',
      '/assets/projects/settings/Audit_Component_1.webp',
      '/assets/projects/settings/Audit_Component_2_(1).webp',
      '/assets/projects/settings/Audit_Component_3.webp',
      '/assets/projects/settings/Untitled.webp',
      '/assets/projects/settings/layout_exploration_menu.webp',
      '/assets/projects/settings/layout_exploration_sub_menu_(3).webp',
      '/assets/projects/settings/result_eploration_menu_settings.webp',
      '/assets/aistudio/Interaction_Solution__1__b92a814a.png'
    ],
    metaDetails: {
      platform: 'Web Dashboard',
      responsibilities: [
        'Hotjar Heatmap & Click Behaviour Analysis',
        'Seller In-Depth Qualitative Interviews',
        'Component & Microcopy Audit',
        'End-to-End Redesign & Production Slicing'
      ],
      tools: ['Hotjar', 'Figma', 'Google Meet'],
      team: '1 Product Designer (Me), 1 Product Manager, Data Science'
    },
    sections: [
      {
        number: '01',
        badge: 'Context',
        title: 'Overview',
        paragraphs: [
          'Settings on OrderOnline.id is a support tool where sellers can manage their sales and integrate the accounts they want to achieve their goal to get the revenue from their product sales.'
        ]
      },
      {
        number: '02',
        badge: 'Target',
        title: 'Objective',
        paragraphs: [
          'Facilitates users in finding the desired configurations and enhances the conversion of main settings usage (Online Store), thereby helping users to increase their sales.'
        ]
      },
      {
        number: '03',
        badge: 'Telemetry',
        title: 'Problem Analysis',
        paragraphs: [
          'Based on the analysis of heatmap data from the settings page that we obtained from Hotjar, several issues were identified that we must resolve.'
        ],
        subSections: [
          {
            title: 'Scroll & Click Menu Settings',
            paragraphs: [
              'Seller scrolling intensity decreases approaching the main Store settings. Menu clicks indicate sellers frequently integrate their stores with third-party applications.'
            ],
            images: [
              {
                url: '/assets/projects/settings/Analysis_Data_Menu_Settings.webp',
                caption: 'Heatmap data on settings menu navigation scroll & click intensity',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Scroll & Click Sub Menu Settings',
            paragraphs: [
              'Based on sample data from one of the settings menus, potential issues were found that users may encounter when using features in the sub-settings menu.'
            ],
            quotes: [
              'Seller scroll intensity decreases when accessing sub-menu sections further down the page.',
              'Some features in the sub-menu settings section are still not being utilized to their full potential or are possibly used only for specific cases.'
            ],
            images: [
              {
                url: '/assets/projects/settings/Analysis_Data_Sub_Menu_Settings.webp',
                caption: 'Heatmap data on sub-menu settings scroll & click intensity',
                aspect: 'wide',
                borderless: true
              }
            ]
          }
        ],
        hideBorderBottom: true
      },
      {
        number: '04',
        badge: 'Research',
        title: 'Understanding The Problem',
        primaryPointTitles: true,
        paragraphs: [
          'To identify seller issues and pain points, I conducted interviews with old sellers who use the settings to support their online business productivity.'
        ],
        quotes: [
          'Access the Menu Settings: Sellers feel frustrated when using the Online Store settings menu and hard to navigate between sub-menu sections because it requires more scrolling to achieve their goals.',
          'Understanding the Function of Settings: Sellers struggle to comprehend what specific switches and configurations impact without descriptive helper copy.',
          'Saving Settings Changes: Sellers feel confused when saving settings changes because each sub-menu section has a "Save" button. And can’t cancel the settings that have been changed.'
        ],
        hidePointIcons: true
      },
      {
        number: '05',
        badge: 'Ideation',
        title: 'Ideas',
        paragraphs: [
          'From the three core seller problems, I thought of a solution to make it easier for them to use the settings and increase seller productivity in managing online sales.'
        ],
        hideBorderBottom: true
      },
      {
        number: '06',
        badge: 'Framing',
        title: 'How Might We',
        howMightWe: [
          {
            number: '01',
            text: 'How can users quickly access the desired menu settings.'
          },
          {
            number: '02',
            text: 'How can users understand and interact with a menu feature easily.'
          },
          {
            number: '03',
            text: 'How can users easily use the save button, and can cancel changes to their settings.'
          }
        ],
        hideBorderBottom: true
      },
      {
        number: '07',
        badge: 'Design Audit',
        title: 'Audit Component',
        paragraphs: [
          'Before jump into the solution, I further observed the problems in the existing component design, with the problems experienced by our sellers.'
        ],
        hideBorderBottom: true,
        subSections: [
          {
            title: 'Audit 1: Stack of Menu',
            paragraphs: [
              'Lots of menus are stacked down in each section, and white space around it. Because sellers have difficulty in:'
            ],
            quotes: [
              'Access the settings menu found in the main settings',
              'Navigation between 1 sub-menu to another sub-menu.'
            ],
            images: [
              {
                url: '/assets/projects/settings/Audit_Component_1.webp',
                caption: 'Audit: Vertically stacked menus causing excessive scroll debt',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Audit 2: Interaction Copy',
            paragraphs: [
              'Our feature does not have copywriting to make it easier for sellers to interact with our products, making it difficult for our sellers to maximize the use of existing features.'
            ],
            images: [
              {
                url: '/assets/projects/settings/Audit_Component_2_(1).webp',
                caption: 'Audit: Missing microcopy leaving sellers guessing functionality',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Audit 3: Several Save Buttons',
            paragraphs: [
              'The purpose of the "save" button in each section is to make it easier for sellers to save settings in various submenus. However, this makes sellers feel a little confused when saving changes.'
            ],
            images: [
              {
                url: '/assets/projects/settings/Audit_Component_3.webp',
                caption: 'Audit: Redundant save buttons on every sub-section',
                aspect: 'wide',
                borderless: true
              }
            ]
          }
        ]
      },
      {
        number: '08',
        badge: 'Solution',
        title: 'The Solutions',
        subSections: [
          {
            title: 'Better Navigation Menu',
            isPrimaryTitle: true,
            paragraphs: [
              'Changing the shape of our menu to be simpler, more concise, less white space, well organized. So users can easily access Online Shop settings and features in the sub menu.',
              'Design Exploration: Exploring the menu card design, settings page sidebar, and new layouts for the settings menu and sub menu. And carry out internal testing as early as possible.'
            ],
            imageLayout: 'vertical',
            images: [
              {
                url: '/assets/projects/settings/Untitled.webp',
                caption: 'Sidebar and category card layout explorations',
                aspect: 'wide',
                borderless: true
              },
              {
                url: '/assets/aistudio/layout_exploration_menu__1__2aad4274.png',
                caption: 'Settings menu grid and high-priority grouping',
                aspect: 'wide',
                borderless: true
              },
              {
                url: '/assets/aistudio/layout_exploration_sub_menu__3___1__1418ed1c.png',
                caption: 'Sub-menu navigation tabs minimizing vertical scroll',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'The Exploration Result',
            paragraphs: [
              "Our internal testing has yielded a new look for the settings menu page. Notably, we've moved the Online Store section to the top for easier access, resulting in a clearer and more consistent layout."
            ],
            images: [
              {
                url: '/assets/projects/settings/result_eploration_menu_settings.webp',
                caption: 'Final restructured Settings Menu with Online Store positioned prominently at top',
                aspect: 'wide',
                borderless: true
              }
            ],
            afterImageParagraphs: [
              'And below are the results of the settings sub-menu display, where users can access from 1 menu to another menu easily without scrolling much deeper.'
            ],
            videos: [
              {
                title: 'Before',
                label: 'Before',
                url: '/assets/projects/settings/settings-submenu-interaction.mp4',
                sourceUrl: 'https://jam.dev/c/b0895cf3-06ed-4c3f-9f8e-1bf57d3d8057',
                poster: '/assets/projects/settings/settings-submenu-poster.webp',
                caption: 'Previous sub-menu navigation interaction flow'
              },
              {
                title: 'After',
                label: 'After',
                url: '/assets/projects/settings/settings-submenu-after.mp4',
                sourceUrl: 'https://jam.dev/c/9c874841-7417-4e40-a124-8690f2b2af71',
                poster: '/assets/projects/settings/settings-submenu-after-poster.webp',
                caption: 'Revamped sub-menu navigation walkthrough: effortlessly jump between settings without deep scrolling'
              }
            ]
          },
          {
            title: 'Interaction Copy',
            isPrimaryTitle: true,
            paragraphs: [
              'Create clear and concise UX copy. So that our sellers can easily interact with our settings and understand, then sellers can increase and maximize their online sales.'
            ],
            images: [
              {
                url: '/assets/aistudio/Interaction_Solution__1__b92a814a.png',
                caption: 'Contextual guidance labels and helper tips implemented directly beside controls',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Floating Save Button',
            isPrimaryTitle: true,
            paragraphs: [
              'By making the save button float at the bottom, our users are no longer confused about saving their settings changed, and can cancel what they have changed in the event of a human error.'
            ],
            video: {
              url: '/assets/projects/settings/settings-floating-save-button.mp4',
              poster: '/assets/projects/settings/settings-floating-save-button-poster.webp',
              caption: 'Interactive demonstration of the floating save bar appearing upon changing settings'
            }
          }
        ]
      },
      {
        number: '09',
        badge: 'Impact',
        title: 'User Testing',
        paragraphs: [
          'Because my project load was full, this design was immediately sliced and deployed to get feedback at a later date. The impact of the design I made, the use of the main setting (Store Online) increased by 5.72% according to the data I got from Data Science.'
        ]
      },
      {
        number: '10',
        badge: 'Reflection',
        title: 'Lesson Learned',
        paragraphs: [
          'This project challenged for me, to carry out data analysis and existing designs to find out more about the problems that occur to sellers.',
          'Apart from that, I can implement what I learned from design principles to make the settings display more concise, simple, and easy to use for sellers. And provide impact for sellersand businesses.'
        ]
      }
    ],
    lessonLearned: {
      title: 'Lesson Learned',
      paragraphs: [
        'This project challenged for me, to carry out data analysis and existing designs to find out more about the problems that occur to sellers.',
        'Apart from that, I can implement what I learned from design principles to make the settings display more concise, simple, and easy to use for sellers. And provide impact for sellers and businesses.'
      ]
    }
  },

  // -------------------------------------------------------------
  // 04. Trawlbens — Promote Apps & Coordinator Productivity
  // -------------------------------------------------------------
  trawlbens: {
    id: 'trawlbens',
    title: 'Increase Coordinator Productivity for Promote Apps',
    tag: 'Mobile Apps',
    tags: ['UI/UX', 'Mobile Apps'],
    category: 'Mobile Apps',
    client: 'Trawlbens',
    role: 'UI/UX Designer',
    year: '2021 - 2022',
    timeline: '2 Months',
    tools: ['Google Sheets', 'Figma'],
    summary:
      'Trawlbens is a company operating in the cargo sector that provides an application platform for sending goods at low prices and can reach all regions of Indonesia.',
    coverImage: '/assets/projects/promote-apps/Cover_Portfolio_Coordinator_Fix.webp',
    stats: [
      { value: '+5.37%', label: 'Delivery Transactions' },
      { value: '6 Mos', label: 'Evaluation Period' },
      { value: '3 Solutions', label: 'Core Capabilities Built' },
      { value: '100%', label: 'Self-Serve Promos' }
    ],
    overview:
      'Trawlbens is a company operating in the cargo sector that provides an application platform for sending goods at low prices and can reach all regions of Indonesia.',
    problem:
      'Cargo delivery service had limited target market reach, relying purely on manual brochure distribution. Coordinators had no way to track referred users, commissions, or distribute marketing vouchers without manual admin approval.',
    solution:
      'Designed an all-in-one Coordinator and Agent referral management app: instant referral link sharing, real-time team commission and target tracking, and autonomous voucher creation.',
    galleryImages: [
      '/assets/projects/promote-apps/Cover_Portfolio_Coordinator_Fix.webp',
      '/assets/projects/promote-apps/Concept_Model.webp',
      '/assets/projects/promote-apps/The_Existing_Brand.webp',
      '/assets/projects/promote-apps/The_Color_Solution.webp',
      '/assets/projects/promote-apps/Solution_1.1.webp',
      '/assets/projects/promote-apps/Solution_1.2.webp',
      '/assets/projects/promote-apps/Solution_2.1.webp',
      '/assets/projects/promote-apps/Solution_2.1_Result.webp',
      '/assets/projects/promote-apps/Solution_2.2.webp',
      '/assets/projects/promote-apps/Solution_2.3.webp',
      '/assets/projects/promote-apps/Solution_3_Design_Exploration.webp',
      '/assets/projects/promote-apps/Solution_3.webp'
    ],
    metaDetails: {
      platform: 'Mobile Application (Android & iOS)',
      responsibilities: [
        'Stakeholder & Account Executive Qualitative Interviews',
        'Brand Color Harmonization & Accessibility Mapping',
        'End-to-End App Architecture & Concept Modeling',
        'Mobile UI Systems & Voucher Configuration'
      ],
      tools: ['Google Sheets', 'Figma'],
      team: '1 UI/UX Designer (Me), 1 Product Manager, Cargo Business Team'
    },
    sections: [
      {
        number: '01',
        badge: 'Context',
        title: 'Overview',
        paragraphs: [
          'Trawlbens is a company operating in the cargo sector that provides an application platform for sending goods at low prices and can reach all regions of Indonesia.'
        ]
      },
      {
        number: '02',
        badge: 'Business',
        title: 'Business Problem',
        paragraphs: [
          "So far, our cargo delivery service still has little reach to the target market, and the delivery is still far from the company's expectations. The business team had an idea so that Account Executives could achieve targets by giving a commission from every delivery transaction carried out by users."
        ]
      },
      {
        number: '03',
        badge: 'Field Research',
        title: 'Validate The Problem',
        primaryPointTitles: true,
        hideBorderBottom: true,
        paragraphs: [
          'In collaboration with Product Manager, I conducted an in-depth interview with the Account Executive team to find out the problems and needs of the Account Executive Team in promoting our application services.',
          'Referring Apps to new users: So far the account executive team has marketed our application by just distributing brochures. And they find it difficult to know whether they have succeeded or not in inviting potential users to use our application services.',
          'Monitoring team and personal target processes: With the new policy, coordinators find it difficult to monitor the process of team and personal targets to get a commission, because they cannot see whether the users they refer have made a transaction or not.',
          'Giving shipping promotions: So far the Account Executive team has felt hampered when providing promos during the event, because they have to request first from our admin to be approved, and the process is quite take time.'
        ]
      },
      {
        number: '04',
        badge: 'Synthesis',
        title: 'Building The Ideas',
        hideBorderBottom: true,
        paragraphs: [
          'Concept Model: To make it easier for me to visualize the features in this application, I created a concept model, the purpose of which was to explore the idea further, and also detail what the coordinator would do in carrying out his duties.'
        ],
        images: [
          {
            url: '/assets/projects/promote-apps/Concept_Model.webp',
            caption: 'Concept Model outlining coordinator workflows, permissions, and features',
            aspect: 'wide'
          }
        ]
      },
      {
        number: '05',
        badge: 'UI Design',
        title: 'Designing The Solution',
        hideBorderBottom: true,
        subSections: [
          {
            title: 'The Challenge',
            paragraphs: [
              'Here I am thinking of a solution, how to maximize the use of red in our application which is identical to the color of the error state, if implemented for each element this will increase Cognitive Load.'
            ],
            images: [
              {
                url: '/assets/projects/promote-apps/The_Existing_Brand.webp',
                caption: 'Existing brand color analysis and dominant red color risks',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'The Solution',
            images: [
              {
                url: '/assets/projects/promote-apps/The_Color_Solution.webp',
                caption: 'Harmonized color palette introducing secondary CTA and chart accents',
                aspect: 'wide',
                borderless: true
              }
            ],
            quotes: [
              '01 Added secondary colors to be implemented in some of our components such as the CTA Button, and minimized the use of primary colors.',
              '02 Added state info color to be used for several elements such as charts, etc.',
              '03 Added a secondary logo color to implement on the topbar when it is in default condition, and the topbar display will appear transparent.'
            ]
          }
        ]
      },
      {
        number: '06',
        badge: 'Implementation',
        title: 'Implementation The Solution',
        hideBorderBottom: true,
        subSections: [
          {
            title: 'Solution 1: Sharing Referral Link',
            isPrimaryTitle: true,
            paragraphs: [
              'Coordinators and Account Executive Agents can promote our application services, by sharing the referral code attached to each account.'
            ],
            images: [
              {
                url: '/assets/projects/promote-apps/Solution_1.1.webp',
                caption: 'Referral sharing screen with one-tap social and code generation',
                aspect: 'wide',
                borderless: true
              }
            ],
            afterImageParagraphs: [
              'Apart from that, they can see the history of users who recently joined using the referral link. And can also display data based on the selected date filter.'
            ],
            afterImages: [
              {
                url: '/assets/projects/promote-apps/Solution_1.2.webp',
                caption: 'Recent join history filtered by date range and referral status',
                aspect: 'wide',
                borderless: true
              }
            ]
          },
          {
            title: 'Solution 2: Achievement and Income Monitoring',
            isPrimaryTitle: true,
            paragraphs: [
              'For this solution, I designed the Achievement and Income Monitoring pages for both Coordinator Agents and Agent Teams.'
            ],
            blocks: [
              {
                title: 'Exploration Design Achievement Monitoring',
                images: [
                  {
                    url: '/assets/projects/promote-apps/Solution_2.1.webp',
                    caption: 'Exploration for team and personal achievement visualization',
                    aspect: 'wide',
                    borderless: true
                  }
                ]
              },
              {
                title: 'The Result Achievement Page',
                paragraphs: [
                  'On this page, the Coordinator / Agent Team can see their Personal Achievement process, and a special page for the Agent Coordinator to monitor the target agent team process that is handled every month.'
                ],
                images: [
                  {
                    url: '/assets/projects/promote-apps/Solution_2.1_Result.webp',
                    caption: 'The Result Achievement Page: Personal progress bar and Coordinator team overview',
                    aspect: 'wide',
                    borderless: true
                  }
                ]
              },
              {
                title: 'The Result Income Monitoring',
                paragraphs: [
                  'Coordinators can see details of their team\'s income on the "Agent Team Income" menu page. Where the coordinator can see data such as Summary, Statistics, and List of agent income. As well as statistics on referral agents who have succeeded in getting new users.'
                ],
                images: [
                  {
                    url: '/assets/projects/promote-apps/Solution_2.2.webp',
                    caption: 'The Result Income Monitoring: Agent Team income summary, statistics, and list',
                    aspect: 'wide',
                    borderless: true
                  }
                ],
                afterImageParagraphs: [
                  'Apart from that, Coordinators and Agents can also see details of their income personally, obtained from the transactions of their referral users who make deliveries.'
                ],
                afterImages: [
                  {
                    url: '/assets/projects/promote-apps/Solution_2.3.webp',
                    caption: 'Individual personal income breakdown accrued from completed cargo shipments',
                    aspect: 'wide',
                    borderless: true
                  }
                ]
              }
            ]
          },
          {
            title: 'Solution 3: Voucher Sharing',
            isPrimaryTitle: true,
            paragraphs: [
              'Here I am making a design exploration for a voucher list, where our discounts have terms and conditions that apply to their use. and creating a discount filter.'
            ],
            images: [
              {
                url: '/assets/projects/promote-apps/Solution_3_Design_Exploration.webp',
                caption: 'Voucher list design explorations and filter states',
                aspect: 'wide',
                borderless: true
              }
            ],
            afterImageParagraphs: [
              'The Result: The Account Executive team can create their own promos, without prior request to the admin to create promo vouchers with terms and conditions that apply to our potential users.'
            ],
            afterImages: [
              {
                url: '/assets/projects/promote-apps/Solution_3.webp',
                caption: 'Self-serve voucher creation with custom terms, conditions, and discounts',
                aspect: 'wide',
                borderless: true
              }
            ]
          }
        ]
      },
      {
        number: '07',
        badge: 'Outcome',
        title: 'Experiment Results',
        paragraphs: [
          "According to the data we got from our Data Engineer, within 6 months our delivery transactions increased by an average of 5.37% for all types of delivery vehicles. Apart from that, with this application, the Account Executive's job can now be easier in promoting our application to achieve predetermined targets."
        ]
      },
      {
        number: '08',
        badge: 'Reflection',
        title: 'Lesson Learned',
        paragraphs: [
          'As a Jr. Designer, I am very happy to be able to learn many things such as collaborating with various divisions and solving problems by doing research, and also happy to be able to have an impact on the company.',
          'Apart from that, the most valuable experience for me was designing a product that had a red brand color, because that color is identical to the error state color.'
        ]
      }
    ]
  }
};

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: 'design-tokens-studio',
    title: 'Design Tokens Studio',
    category: 'System Architecture',
    year: '2024',
    aspect: 'video',
    description:
      'Interactive token visualizer demonstrating multi-brand theme switching and WCAG AA contrast validation across DOKU payment products.',
    figmaLink: 'https://www.figma.com/@aldoabieza',
    previewType: 'interactive',
    tags: ['Figma', 'Tokens', 'TypeScript', 'A11y']
  },
  {
    id: 'fluid-type-calculator',
    title: 'Fluid Typography Scale Calculator',
    category: 'Design Systems Tool',
    year: '2024',
    aspect: 'standard',
    description:
      'Mathematical viewport-based typography generator used across OrderOnline storefronts for smooth responsive font scaling.',
    figmaLink: 'https://www.figma.com/@aldoabieza',
    previewType: 'embed',
    tags: ['Math Scale', 'CSS Clamp', 'Responsive']
  },
  {
    id: 'payment-stepper-micro-interaction',
    title: 'Checkout Flow State Machine',
    category: 'Micro-Interactions',
    year: '2023',
    aspect: 'video',
    description:
      'Finite state machine prototype for resilient checkout flows handling network lag, payment timeouts, and success celebrations.',
    figmaLink: 'https://www.figma.com/@aldoabieza',
    previewType: 'interactive',
    tags: ['Framer Motion', 'State Machine', 'Fintech']
  },
  {
    id: 'cargo-pricing-matrix',
    title: 'Volumetric Freight Estimator',
    category: 'Algorithmic UI',
    year: '2022',
    aspect: 'standard',
    description:
      'Dynamic 3D-assisted dimensional weight calculator built for Trawlbens truck drivers to calculate cargo quotes on the spot.',
    figmaLink: 'https://www.figma.com/@aldoabieza',
    previewType: 'embed',
    tags: ['Logistics', 'Volume Matrix', 'React']
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'doku',
    company: 'DOKU',
    role: 'UI/UX Designer',
    period: 'September 2024 - Now',
    roleWithPeriod: 'September 2024 - Now | UI/UX Designer',
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
    company: 'Trawlbens Teknologi Anak Indonesia',
    role: 'UI/UX Designer',
    period: 'November 2021 - June 2022',
    roleWithPeriod: 'November 2021 - June 2022 | UI/UX Designer',
    logo: '/assets/logos/trawlbens.webp',
    fallbackColor: '#E11931',
    fallbackLetter: 'T'
  }
];
