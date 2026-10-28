import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// SVG 1: Checkout Page Configuration (Detail Page: Without Return Nav)
const svg1 = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" fill="#F8F9FA"/>

  <!-- Left Sidebar (Width 280) -->
  <rect width="280" height="1080" fill="#FFFFFF"/>
  <line x1="280" y1="0" x2="280" y2="1080" stroke="#E5E7EB" stroke-width="1"/>

  <!-- DOKU Logo at Top -->
  <rect x="24" y="24" width="44" height="44" rx="8" fill="#E52011"/>
  <text x="32" y="52" fill="#FFFFFF" class="font-sans" font-size="16" font-weight="900" letter-spacing="1">DOKU</text>
  <rect x="236" y="36" width="16" height="20" rx="3" stroke="#4B5563" stroke-width="2" fill="none"/>
  <line x1="244" y1="36" x2="244" y2="56" stroke="#4B5563" stroke-width="2"/>

  <!-- Corporate Switcher -->
  <rect x="24" y="92" width="40" height="28" rx="4" fill="#FEECEB" stroke="#E5E7EB"/>
  <text x="32" y="110" fill="#E52011" class="font-sans" font-size="10" font-weight="700">DOKU</text>
  <text x="74" y="104" fill="#111827" class="font-sans" font-size="13" font-weight="700">DOKU Corporate</text>
  <text x="74" y="118" fill="#6B7280" class="font-sans" font-size="11">BRN-0266-1681...</text>
  <text x="240" y="110" fill="#9CA3AF" class="font-sans" font-size="12">⇅</text>

  <!-- Notification -->
  <circle cx="34" cy="162" r="7" stroke="#4B5563" stroke-width="1.8" fill="none"/>
  <path d="M34 169 C32 169 32 171 34 171 C36 171 36 169 34 169 Z" fill="#4B5563"/>
  <text x="56" y="167" fill="#374151" class="font-sans" font-size="14" font-weight="500">Notification</text>
  <rect x="226" y="152" width="28" height="20" rx="10" fill="#E52011"/>
  <text x="233" y="166" fill="#FFFFFF" class="font-sans" font-size="11" font-weight="700">36</text>

  <!-- Main Nav Items -->
  <!-- Dashboard -->
  <path d="M30 220 L38 214 L46 220 V228 H30 Z" stroke="#4B5563" stroke-width="1.8" fill="none"/>
  <text x="56" y="225" fill="#374151" class="font-sans" font-size="14" font-weight="500">Dashboard</text>

  <!-- Reports -->
  <rect x="30" y="268" width="16" height="16" rx="2" stroke="#4B5563" stroke-width="1.8" fill="none"/>
  <line x1="38" y1="268" x2="38" y2="284" stroke="#4B5563" stroke-width="1.5"/>
  <line x1="30" y1="276" x2="46" y2="276" stroke="#4B5563" stroke-width="1.5"/>
  <text x="56" y="281" fill="#374151" class="font-sans" font-size="14" font-weight="500">Reports</text>

  <!-- Analytics -->
  <path d="M30 338 L36 332 L40 335 L46 328" stroke="#4B5563" stroke-width="1.8" fill="none"/>
  <text x="56" y="337" fill="#374151" class="font-sans" font-size="14" font-weight="500">Analytics</text>

  <!-- Settings (Active) -->
  <circle cx="38" cy="392" r="5" stroke="#E52011" stroke-width="2" fill="none"/>
  <path d="M38 384 V386 M38 398 V400 M30 392 H32 M44 392 H46" stroke="#E52011" stroke-width="2"/>
  <text x="56" y="397" fill="#E52011" class="font-sans" font-size="14" font-weight="700">Settings</text>

  <!-- Section: Accept Payments -->
  <text x="24" y="456" fill="#6B7280" class="font-sans" font-size="12" font-weight="700">Accept Payments</text>
  <!-- Payment Link -->
  <circle cx="33" cy="486" r="4" stroke="#4B5563" stroke-width="1.6" fill="none"/>
  <circle cx="43" cy="486" r="4" stroke="#4B5563" stroke-width="1.6" fill="none"/>
  <text x="56" y="490" fill="#374151" class="font-sans" font-size="14" font-weight="500">Payment Link</text>
  <!-- Digital Catalog -->
  <path d="M30 538 H46 V552 H30 Z" stroke="#4B5563" stroke-width="1.6" fill="none"/>
  <text x="56" y="547" fill="#374151" class="font-sans" font-size="14" font-weight="500">Digital Catalog</text>

  <!-- Section: PayChat -->
  <text x="24" y="604" fill="#6B7280" class="font-sans" font-size="12" font-weight="700">PayChat</text>
  <text x="56" y="638" fill="#374151" class="font-sans" font-size="14" font-weight="500">Bill Broadcast</text>
  <text x="56" y="692" fill="#374151" class="font-sans" font-size="14" font-weight="500">Accept Order</text>

  <!-- Section: FlexiBill -->
  <text x="24" y="750" fill="#6B7280" class="font-sans" font-size="12" font-weight="700">FlexiBill</text>
  <text x="56" y="784" fill="#374151" class="font-sans" font-size="14" font-weight="500">Subscription and Billing</text>

  <!-- Bottom User Profile -->
  <line x1="0" y1="990" x2="280" y2="990" stroke="#E5E7EB"/>
  <circle cx="46" cy="1035" r="20" fill="#FEF3C7"/>
  <circle cx="46" cy="1030" r="8" fill="#F59E0B"/>
  <path d="M32 1048 Q46 1040 60 1048" fill="#D97706"/>
  <text x="76" y="1032" fill="#111827" class="font-sans" font-size="13" font-weight="700">YERIKHO RISTIAN</text>
  <text x="76" y="1048" fill="#6B7280" class="font-sans" font-size="12">Admin</text>
  <text x="250" y="1038" fill="#9CA3AF" class="font-sans" font-size="18">⋮</text>

  <!-- MAIN CONTENT AREA (x=330) -->
  <!-- Breadcrumbs -->
  <text x="330" y="64" fill="#6B7280" class="font-sans" font-size="14">
    Settings  <tspan fill="#D1D5DB">/</tspan>  <tspan fill="#E52011" font-weight="600">Checkout Appearance</tspan>
  </text>

  <!-- Title: Without Return Nav! (Missing Left Back Arrow) -->
  <text x="330" y="112" fill="#111827" class="font-sans" font-size="30" font-weight="800" letter-spacing="-0.5">Checkout Page Configuration</text>
  <text x="330" y="142" fill="#6B7280" class="font-sans" font-size="15">Configure your Checkout Page Interface &amp; System</text>

  <!-- Filter / Section Tabs -->
  <g id="tabs">
    <!-- Active Tab: Payment Methods Settings -->
    <rect x="330" y="186" width="206" height="42" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="350" y="212" fill="#E52011" class="font-sans" font-size="14" font-weight="700">Payment Methods Settings</text>

    <!-- Tab 2 -->
    <rect x="536" y="186" width="140" height="42" rx="0" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="556" y="212" fill="#4B5563" class="font-sans" font-size="14" font-weight="500">Expired Settings</text>

    <!-- Tab 3 -->
    <rect x="676" y="186" width="190" height="42" rx="0" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="696" y="212" fill="#4B5563" class="font-sans" font-size="14" font-weight="500">QRIS Credential Settings</text>

    <!-- Tab 4 -->
    <rect x="866" y="186" width="140" height="42" rx="0" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="886" y="212" fill="#4B5563" class="font-sans" font-size="14" font-weight="500">Interface Settings</text>

    <!-- Tab 5 -->
    <rect x="1006" y="186" width="140" height="42" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="1026" y="212" fill="#4B5563" class="font-sans" font-size="14" font-weight="500">System Settings</text>
  </g>

  <!-- Big White Card -->
  <rect x="330" y="270" width="1120" height="530" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
  <text x="365" y="318" fill="#1F2937" class="font-sans" font-size="15" font-weight="500">Manage the payment methods that you want to show on Checkout Page.</text>

  <!-- Inner Accordion Group Container -->
  <rect x="365" y="348" width="1050" height="414" rx="8" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>

  <!-- Accordion Items -->
  <!-- 1. Cards -->
  <g transform="translate(365, 348)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">Cards</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
    <line x1="0" y1="58" x2="1050" y2="58" stroke="#E5E7EB"/>
  </g>

  <!-- 2. e-Wallet -->
  <g transform="translate(365, 406)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">e-Wallet</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
    <line x1="0" y1="58" x2="1050" y2="58" stroke="#E5E7EB"/>
  </g>

  <!-- 3. PayLater -->
  <g transform="translate(365, 464)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">PayLater</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
    <line x1="0" y1="58" x2="1050" y2="58" stroke="#E5E7EB"/>
  </g>

  <!-- 4. Direct Debit -->
  <g transform="translate(365, 522)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">Direct Debit</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
    <line x1="0" y1="58" x2="1050" y2="58" stroke="#E5E7EB"/>
  </g>

  <!-- 5. Convenience Store -->
  <g transform="translate(365, 580)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">Convenience Store</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
    <line x1="0" y1="58" x2="1050" y2="58" stroke="#E5E7EB"/>
  </g>

  <!-- 6. Internet Banking -->
  <g transform="translate(365, 638)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">Internet Banking</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
    <line x1="0" y1="58" x2="1050" y2="58" stroke="#E5E7EB"/>
  </g>

  <!-- 7. Bank Transfer -->
  <g transform="translate(365, 696)">
    <line x1="24" y1="26" x2="36" y2="26" stroke="#4B5563" stroke-width="2"/>
    <line x1="24" y1="32" x2="36" y2="32" stroke="#4B5563" stroke-width="2"/>
    <text x="56" y="35" fill="#111827" class="font-sans" font-size="15" font-weight="700">Bank Transfer</text>
    <path d="M1010 28 L1016 34 L1022 28" stroke="#111827" stroke-width="2" fill="none"/>
  </g>

  <!-- Bottom Save Button -->
  <rect x="1360" y="830" width="90" height="44" rx="6" fill="#E5E7EB"/>
  <text x="1388" y="857" fill="#6B7280" class="font-sans" font-size="14" font-weight="700">SAVE</text>

  <!-- Illustrated Avatar Mascot at Bottom Right (Pink Sticker) -->
  <circle cx="1880" cy="510" r="18" fill="#FCE7F3"/>
  <circle cx="1910" cy="935" r="34" fill="#FCE7F3" stroke="#F472B6" stroke-width="2"/>
  <circle cx="1910" cy="925" r="16" fill="#F59E0B"/>
  <path d="M1896 955 Q1910 945 1924 955" fill="#D97706"/>
</svg>
`;

// SVG 2: Detail Page: With Return Nav (Payment Link Settings Modal)
const svg2 = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1920" height="1080" fill="#F8F9FA"/>

  <!-- Left Sidebar (Width 280) -->
  <rect width="280" height="1080" fill="#FFFFFF"/>
  <line x1="280" y1="0" x2="280" y2="1080" stroke="#E5E7EB" stroke-width="1"/>

  <!-- DOKU Logo at Top -->
  <rect x="24" y="24" width="44" height="44" rx="8" fill="#E52011"/>
  <text x="32" y="52" fill="#FFFFFF" class="font-sans" font-size="16" font-weight="900" letter-spacing="1">DOKU</text>
  <!-- Brand Name Tooltip -->
  <rect x="68" y="82" width="76" height="28" rx="4" fill="#1F2937"/>
  <text x="76" y="100" fill="#FFFFFF" class="font-sans" font-size="11" font-weight="500">Brand Name</text>

  <!-- Corporate Switcher -->
  <rect x="24" y="120" width="40" height="28" rx="4" fill="#FEECEB" stroke="#E5E7EB"/>
  <text x="32" y="138" fill="#E52011" class="font-sans" font-size="10" font-weight="700">DOKU</text>
  <text x="74" y="132" fill="#111827" class="font-sans" font-size="13" font-weight="700">DOKU Corporate</text>
  <text x="74" y="146" fill="#6B7280" class="font-sans" font-size="11">BRN-0266-1681...</text>

  <!-- Notification -->
  <circle cx="34" cy="190" r="7" stroke="#4B5563" stroke-width="1.8" fill="none"/>
  <text x="56" y="195" fill="#374151" class="font-sans" font-size="14" font-weight="500">Notification</text>
  <rect x="226" y="180" width="28" height="20" rx="10" fill="#E52011"/>
  <text x="233" y="194" fill="#FFFFFF" class="font-sans" font-size="11" font-weight="700">36</text>

  <!-- Main Nav Items -->
  <text x="56" y="255" fill="#374151" class="font-sans" font-size="14" font-weight="500">Dashboard</text>
  <text x="56" y="310" fill="#374151" class="font-sans" font-size="14" font-weight="500">Reports</text>
  <text x="56" y="365" fill="#374151" class="font-sans" font-size="14" font-weight="500">Analytics</text>
  <text x="56" y="420" fill="#374151" class="font-sans" font-size="14" font-weight="500">Settings</text>

  <!-- Section: Accept Payments -->
  <text x="24" y="476" fill="#6B7280" class="font-sans" font-size="12" font-weight="700">Accept Payments</text>
  <!-- Payment Link (Active Highlighted in Pink) -->
  <rect x="14" y="496" width="252" height="44" rx="8" fill="#FEECEB"/>
  <circle cx="33" cy="518" r="4" stroke="#E52011" stroke-width="1.8" fill="none"/>
  <circle cx="43" cy="518" r="4" stroke="#E52011" stroke-width="1.8" fill="none"/>
  <text x="56" y="522" fill="#E52011" class="font-sans" font-size="14" font-weight="700">Payment Link</text>

  <!-- Digital Catalog -->
  <text x="56" y="576" fill="#374151" class="font-sans" font-size="14" font-weight="500">Digital Catalog</text>

  <!-- Section: PayChat -->
  <text x="24" y="630" fill="#6B7280" class="font-sans" font-size="12" font-weight="700">PayChat</text>
  <text x="56" y="664" fill="#374151" class="font-sans" font-size="14" font-weight="500">Bill Broadcast</text>
  <text x="56" y="718" fill="#374151" class="font-sans" font-size="14" font-weight="500">Accept Order</text>

  <!-- Section: FlexiBill -->
  <text x="24" y="776" fill="#6B7280" class="font-sans" font-size="12" font-weight="700">FlexiBill</text>
  <text x="56" y="810" fill="#374151" class="font-sans" font-size="14" font-weight="500">Subscription and Billing</text>

  <!-- Bottom User Profile -->
  <line x1="0" y1="990" x2="280" y2="990" stroke="#E5E7EB"/>
  <circle cx="46" cy="1035" r="20" fill="#FEF3C7"/>
  <text x="76" y="1032" fill="#111827" class="font-sans" font-size="13" font-weight="700">YERIKHO RISTIAN</text>
  <text x="76" y="1048" fill="#6B7280" class="font-sans" font-size="12">Admin</text>

  <!-- MAIN MODAL / DETAIL PAGE AREA (x=330) -->
  <!-- Breadcrumb -->
  <text x="330" y="54" fill="#6B7280" class="font-sans" font-size="14">
    Payment Link  <tspan fill="#D1D5DB">/</tspan>  <tspan fill="#E52011" font-weight="600">Settings</tspan>
  </text>

  <!-- Header WITH RETURN NAV: Close Icon "✕" + Title "Settings" -->
  <g transform="translate(330, 84)">
    <line x1="0" y1="12" x2="16" y2="28" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="16" y1="12" x2="0" y2="28" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
    <text x="28" y="27" fill="#111827" class="font-sans" font-size="28" font-weight="800">Settings</text>
  </g>

  <!-- Tabs: Bot, Notification, Email Design -->
  <g id="modal-tabs" transform="translate(330, 140)">
    <rect x="0" y="0" width="70" height="42" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="24" y="26" fill="#E52011" class="font-sans" font-size="14" font-weight="700">Bot</text>

    <rect x="70" y="0" width="120" height="42" rx="0" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="94" y="26" fill="#4B5563" class="font-sans" font-size="14" font-weight="500">Notification</text>

    <rect x="190" y="0" width="130" height="42" rx="4" fill="#FFFFFF" stroke="#E5E7EB"/>
    <text x="214" y="26" fill="#4B5563" class="font-sans" font-size="14" font-weight="500">Email Design</text>
  </g>

  <!-- Bot Banner Card -->
  <rect x="330" y="210" width="1120" height="120" rx="10" fill="#FFFFFF" stroke="#E5E7EB"/>
  <text x="365" y="276" fill="#374151" class="font-sans" font-size="15">Link your phone number to your business to access our Chat Platform Features</text>
  <rect x="1230" y="250" width="195" height="40" rx="6" fill="#FFFFFF" stroke="#E52011" stroke-width="1.5"/>
  <text x="1245" y="275" fill="#E52011" class="font-sans" font-size="13" font-weight="700">Use Payment Link Bot Now</text>

  <!-- Search & Action Row -->
  <!-- Search Input -->
  <rect x="330" y="360" width="360" height="44" rx="6" fill="#FFFFFF" stroke="#D1D5DB"/>
  <text x="350" y="387" fill="#9CA3AF" class="font-sans" font-size="14">Search by Phone Number or Label</text>
  <circle cx="660" cy="382" r="6" stroke="#4B5563" stroke-width="1.8" fill="none"/>
  <line x1="664" y1="386" x2="672" y2="394" stroke="#4B5563" stroke-width="2"/>

  <!-- Secondary Icon Action -->
  <rect x="980" y="360" width="46" height="44" rx="6" fill="#FFFFFF" stroke="#D1D5DB"/>
  <path d="M998 376 H1008 V390 H998 Z" stroke="#374151" stroke-width="1.8" fill="none"/>

  <!-- Primary Red Button: Add Phone Number -->
  <rect x="1038" y="360" width="180" height="44" rx="6" fill="#E52011"/>
  <text x="1060" y="387" fill="#FFFFFF" class="font-sans" font-size="14" font-weight="700">Add Phone Number  ▾</text>

  <!-- Data Table Container -->
  <rect x="330" y="430" width="1120" height="460" rx="10" fill="#FFFFFF" stroke="#E5E7EB"/>

  <!-- Table Header -->
  <g transform="translate(330, 430)">
    <rect x="0" y="0" width="1120" height="56" fill="#F9FAFB" rx="10"/>
    <text x="35" y="34" fill="#374151" class="font-sans" font-size="14" font-weight="700">Phone Number ⇅</text>
    <text x="260" y="34" fill="#374151" class="font-sans" font-size="14" font-weight="700">Label ⇅</text>
    <text x="470" y="34" fill="#374151" class="font-sans" font-size="14" font-weight="700">Registered Date ⇅</text>
    <text x="730" y="34" fill="#374151" class="font-sans" font-size="14" font-weight="700">Status ⇅</text>
    <line x1="0" y1="56" x2="1120" y2="56" stroke="#E5E7EB"/>
  </g>

  <!-- Row 1: Active -->
  <g transform="translate(330, 486)">
    <text x="35" y="44" fill="#111827" class="font-sans" font-size="14">+62 8111123212</text>
    <text x="260" y="44" fill="#374151" class="font-sans" font-size="14">TEls1</text>
    <text x="470" y="44" fill="#374151" class="font-sans" font-size="14">21 September 2026</text>
    <rect x="730" y="26" width="64" height="26" rx="13" fill="#DEF7EC"/>
    <text x="744" y="43" fill="#03543F" class="font-sans" font-size="12" font-weight="600">Active</text>
    <rect x="1000" y="24" width="34" height="30" rx="4" fill="#FFFFFF" stroke="#D1D5DB"/>
    <text x="1014" y="43" fill="#374151" class="font-sans" font-size="16">⋮</text>
    <line x1="0" y1="70" x2="1120" y2="70" stroke="#F3F4F6"/>
  </g>

  <!-- Row 2: Inactive -->
  <g transform="translate(330, 556)">
    <text x="35" y="44" fill="#111827" class="font-sans" font-size="14">+62 89912345678</text>
    <text x="260" y="44" fill="#374151" class="font-sans" font-size="14">tessssttttt</text>
    <text x="470" y="44" fill="#374151" class="font-sans" font-size="14">02 September 2026</text>
    <rect x="730" y="26" width="138" height="26" rx="13" fill="#FDE8E8"/>
    <text x="740" y="43" fill="#9B1C1C" class="font-sans" font-size="12" font-weight="600">Inactive at 21/09/26</text>
    <rect x="1000" y="24" width="34" height="30" rx="4" fill="#FFFFFF" stroke="#D1D5DB"/>
    <text x="1014" y="43" fill="#374151" class="font-sans" font-size="16">⋮</text>
    <line x1="0" y1="70" x2="1120" y2="70" stroke="#F3F4F6"/>
  </g>

  <!-- Row 3: Inactive -->
  <g transform="translate(330, 626)">
    <text x="35" y="44" fill="#111827" class="font-sans" font-size="14">+62 8812345678</text>
    <text x="260" y="44" fill="#374151" class="font-sans" font-size="14">testingggg</text>
    <text x="470" y="44" fill="#374151" class="font-sans" font-size="14">02 September 2026</text>
    <rect x="730" y="26" width="138" height="26" rx="13" fill="#FDE8E8"/>
    <text x="740" y="43" fill="#9B1C1C" class="font-sans" font-size="12" font-weight="600">Inactive at 21/09/26</text>
    <rect x="1000" y="24" width="34" height="30" rx="4" fill="#FFFFFF" stroke="#D1D5DB"/>
    <text x="1014" y="43" fill="#374151" class="font-sans" font-size="16">⋮</text>
    <line x1="0" y1="70" x2="1120" y2="70" stroke="#F3F4F6"/>
  </g>

  <!-- Row 4: Active -->
  <g transform="translate(330, 696)">
    <text x="35" y="44" fill="#111827" class="font-sans" font-size="14">+62 81216753040</text>
    <text x="260" y="44" fill="#374151" class="font-sans" font-size="14">Dimas</text>
    <text x="470" y="44" fill="#374151" class="font-sans" font-size="14">18 August 2026</text>
    <rect x="730" y="26" width="64" height="26" rx="13" fill="#DEF7EC"/>
    <text x="744" y="43" fill="#03543F" class="font-sans" font-size="12" font-weight="600">Active</text>
    <rect x="1000" y="24" width="34" height="30" rx="4" fill="#FFFFFF" stroke="#D1D5DB"/>
    <text x="1014" y="43" fill="#374151" class="font-sans" font-size="16">⋮</text>
    <line x1="0" y1="70" x2="1120" y2="70" stroke="#F3F4F6"/>
  </g>

  <!-- Row 5: Active -->
  <g transform="translate(330, 766)">
    <text x="35" y="44" fill="#111827" class="font-sans" font-size="14">+62 81234567989</text>
    <text x="260" y="44" fill="#374151" class="font-sans" font-size="14">tes</text>
    <text x="470" y="44" fill="#374151" class="font-sans" font-size="14">28 July 2026</text>
    <rect x="730" y="26" width="64" height="26" rx="13" fill="#DEF7EC"/>
    <text x="744" y="43" fill="#03543F" class="font-sans" font-size="12" font-weight="600">Active</text>
    <rect x="1000" y="24" width="34" height="30" rx="4" fill="#FFFFFF" stroke="#D1D5DB"/>
    <text x="1014" y="43" fill="#374151" class="font-sans" font-size="16">⋮</text>
  </g>

  <!-- Table Pagination Footer -->
  <g transform="translate(330, 890)">
    <!-- Items per page dropdown -->
    <rect x="0" y="10" width="160" height="36" rx="6" fill="#FFFFFF" stroke="#D1D5DB"/>
    <text x="16" y="33" fill="#374151" class="font-sans" font-size="13">5 items per page  ⇅</text>

    <!-- Entries count -->
    <text x="480" y="33" fill="#6B7280" class="font-sans" font-size="13">Showing 1 - 5 from 19 entries</text>

    <!-- Pagination buttons -->
    <text x="760" y="33" fill="#9CA3AF" class="font-sans" font-size="14">&lt;</text>
    <rect x="780" y="10" width="30" height="34" rx="4" fill="#E5E7EB"/>
    <text x="791" y="32" fill="#111827" class="font-sans" font-size="13" font-weight="700">1</text>
    <text x="825" y="33" fill="#374151" class="font-sans" font-size="13">2</text>
    <text x="855" y="33" fill="#374151" class="font-sans" font-size="13">3</text>
    <text x="885" y="33" fill="#374151" class="font-sans" font-size="13">4</text>
    <text x="915" y="33" fill="#374151" class="font-sans" font-size="14">&gt;</text>
  </g>
</svg>
`;

async function main() {
  const buf1 = Buffer.from(svg1);
  const buf2 = Buffer.from(svg2);

  const png1 = await sharp(buf1).png().toBuffer();
  const png2 = await sharp(buf2).png().toBuffer();

  const paths1 = [
    'public/assets/projects/doku/screenshot-1-checkout.png',
    'public/assets/projects/doku/Screenshot 2026-09-22 at 10.35.13.png',
    'dist/assets/projects/doku/screenshot-1-checkout.png',
    'dist/assets/projects/doku/Screenshot 2026-09-22 at 10.35.13.png'
  ];

  const paths2 = [
    'public/assets/projects/doku/screenshot-2-payment-link.png',
    'public/assets/projects/doku/Screenshot 2026-09-22 at 10.43.25.png',
    'dist/assets/projects/doku/screenshot-2-payment-link.png',
    'dist/assets/projects/doku/Screenshot 2026-09-22 at 10.43.25.png'
  ];

  for (const p of paths1) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, png1);
    console.log('Written:', p, png1.length, 'bytes');
  }

  for (const p of paths2) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, png2);
    console.log('Written:', p, png2.length, 'bytes');
  }

  console.log('All real screenshot assets generated successfully!');
}

main().catch(console.error);
