/* ============================================================
   PORTFOLIO DATA — edit this file to update site content.
   Each item powers one slide in the auto-player and one
   slide-over detail panel.
   short : one-line summary shown on the main stage (keep it short)
   shape : which 3D skeleton prototype the central stage morphs to
   ============================================================ */
window.PORTFOLIO_DATA = {

  profile: {
    name: 'Amjad Al Shukairi',
    fullName: 'Amjad Salim Sloum Al Shukairi',
    role: 'Data Strategy & Solutions Lead',
    location: 'Muscat, Oman',
    email: 'amjad.alshukiri@gmail.com',
    github: 'https://github.com/amjadshuk',
    linkedin: 'https://www.linkedin.com/in/amjad-al-shukairi-59b53072/',
    cv: 'CV-8.pdf',
    tagline: 'I build solutions from scratch, lead teams, and turn data into products that make an impact.'
  },

  categories: [
    { id: 'experience', label: 'EXPERIENCE', color: '#00e5ff', glyph: '◆' },
    { id: 'projects',   label: 'PROJECT',    color: '#ff2bd6', glyph: '▲' },
    { id: 'services',   label: 'SERVICE',    color: '#ffb300', glyph: '●' }
  ],

  items: [

    /* ================= EXPERIENCE ================= */
    {
      id: 'exp-friendi',
      cat: 'experience',
      shape: 'signal',
      period: '2025 — PRESENT',
      org: 'FRiENDi Mobile Oman',
      title: 'Core Segment & Product Lead',
      sub: 'Telecom · Muscat',
      short: 'Core segment & product strategy for a leading telco MVNO.',
      blurb: 'Managing core segment assets, shaping product strategy and using data insights to bring new ideas to market.',
      tags: ['Product Strategy', 'Telecom', 'Data'],
      headline: 'CORE SEGMENT COMMAND // FRiENDi MOBILE OMAN // PRODUCT × DATA',
      briefing: [
        'At FRiENDi Mobile Oman I manage core segment assets, shape product strategies and use data insights to bring new ideas to market.',
        'The job is connecting strategy with execution: read the market through data, find the gaps, and launch competitive offerings that actually ship.'
      ],
      log: [
        'Manage core segment assets for a leading telco MVNO',
        'Shape product roadmaps that drive market growth',
        'Use data insights to identify gaps and launch offerings',
        'Connect business strategy with operational execution'
      ],
      stack: ['Product Development', 'Segment Analytics', 'Market Intelligence', 'Telecom / MVNO']
    },
    {
      id: 'exp-rihal-lead',
      cat: 'experience',
      shape: 'network',
      period: '2022 — 2025',
      org: 'Rihal · Technology & Consultancy',
      title: 'Analytics Engineering Lead & Solution Architect',
      sub: 'Technology · Muscat',
      short: "Led the analytics team behind Oman's national data portals.",
      blurb: "Grew and mentored the analytics team and led Oman's national data portals — from architecture to delivery.",
      tags: ['Team Lead', 'Architecture', 'Gov Portals'],
      media: { type: 'image', src: 'assets/rihal-portals.png', caption: 'National portals — eCensus, Open Data & Agriculture dashboards' },
      headline: 'ANALYTICS LEAD // RIHAL // NATIONAL-SCALE GOVERNMENT PORTALS',
      briefing: [
        'At Rihal I grew and mentored the analytics team, and led the projects behind Oman’s national data portals: the NCSI Open Data Portal, eCensus, the SME Open Data Portal and the Ministry of Agriculture Portal.',
        'I designed a Unified Open Data Infrastructure — a scalable blueprint that makes building future portals faster and easier.',
        'Alongside delivery I provided data governance, Data Warehouse (DWH) solutions and solution architecture for government and enterprise clients.'
      ],
      log: [
        'Grew and mentored a high-performing analytics team',
        'Led NCSI Open Data, eCensus, SME & Agriculture portals',
        'Designed a Unified Open Data Infrastructure blueprint',
        'Delivered data governance, DWH & solution architecture'
      ],
      stack: ['Solution Architecture', 'Data Governance', 'Power BI', 'Databricks', 'Kubernetes', 'Docker']
    },
    {
      id: 'exp-rihal-de',
      cat: 'experience',
      shape: 'pipeline',
      period: '2022 — 2024',
      org: 'Rihal · Technology & Consultancy',
      title: 'Data Engineer',
      sub: 'Technology · Muscat',
      short: 'Built the pipelines powering national-scale data products.',
      blurb: 'Engineered the ETL/ELT pipelines and warehouses behind Rihal’s government and enterprise analytics products.',
      tags: ['Data Engineering', 'ETL/ELT', 'BI'],
      headline: 'DATA ENGINEERING // RIHAL // PIPELINES THAT POWER NATIONS',
      briefing: [
        'Promoted from trainee to Data Engineer within months, I spent two years building the data backbone behind Rihal’s flagship analytics products.',
        'Full lifecycle: ingestion, transformation, warehouse modelling and the BI layers decision-makers actually use — the pipelines that fed the national portals.'
      ],
      log: [
        'Promoted from trainee to Data Engineer fast',
        'Built ETL/ELT pipelines for national data products',
        'Modelled OLAP / OLTP data warehouses',
        'Developed BI dashboards & semantic layers (DAX / MDX)'
      ],
      stack: ['SQL', 'Python', 'ETL/ELT', 'Data Warehousing', 'Power BI', 'Airflow']
    },
    {
      id: 'exp-khazzan-ops',
      cat: 'experience',
      shape: 'shield',
      period: '2021 — 2022',
      org: 'BP Khazzan · Operations',
      title: 'Operations Supervisor — Road Safety',
      sub: 'Oil & Gas · Oman',
      short: 'Ran 20+ road-safety & HSE ops at BP Khazzan Block 61.',
      blurb: 'Supervised road safety and HSE operations at BP Khazzan Block 61 — people, vehicles, procedures and supply chains.',
      tags: ['Operations', 'HSE', 'Road Safety'],
      media: { type: 'video', src: 'Whatwebelievein.mp4', caption: 'What We Believe In — operations & safety culture' },
      headline: 'OPERATIONS COMMAND // BP KHAZZAN BLOCK 61 // SAFETY FIRST',
      briefing: [
        'At BP’s Khazzan Block 61 I led an operations team of 20+ across fleet monitoring, road safety and HSE supervision.',
        'The data instinct stayed on: I analysed vehicle data against fatality rates and used it to implement concrete, data-backed safety improvements.'
      ],
      log: [
        'Led an operations team of 20+ personnel',
        'Ran fleet monitoring, road safety & HSE supervision',
        'Enforced HSE procedures across people & vehicles',
        'Implemented data-backed safety improvements'
      ],
      stack: ['Operations', 'HSE', 'Fleet Monitoring', 'Risk Management']
    },
    {
      id: 'exp-khazzan-log',
      cat: 'experience',
      shape: 'truck',
      period: '2018 — 2021',
      org: 'BP Khazzan · Logistics',
      title: 'Logistics Coordinator',
      sub: 'Oil & Gas · Oman',
      short: 'Logistics, reporting & analytics for BP contractors.',
      blurb: 'Coordinated logistics and built the reporting & analytics that illustrated BP’s road safety and risk procedures.',
      tags: ['Logistics', 'Reporting', 'Analytics'],
      headline: 'LOGISTICS GRID // BP CONTRACTORS // REPORTING & ANALYTICS',
      briefing: [
        'Where it began: coordinating logistics at BP Khazzan Block 61 with a focus on reporting and analytics for BP’s contractors.',
        'This is where raw operational data first became my tool for changing real-world behaviour — the seed for everything after.'
      ],
      log: [
        'Coordinated logistics for BP Khazzan Block 61',
        'Built reporting & analytics for contractor operations',
        'Communicated BP road safety & risk procedures'
      ],
      stack: ['Reporting', 'Excel', 'Adobe Creative Suite', 'Coordination']
    },

    /* ================= PROJECTS ================= */
    {
      id: 'prj-ecensus',
      cat: 'projects',
      shape: 'globe',
      period: 'NATIONAL SCALE',
      org: 'NCSI · National Statistics',
      title: 'Oman eCensus Portal',
      sub: 'Census of Population, Housing & Establishments',
      short: "Architected Oman's national census data & visualization.",
      blurb: 'Architected the data flow and visualization layers for Oman’s national census — 5M+ population, live to the public.',
      tags: ['Gov Platform', 'Architecture', 'Maps'],
      link: { href: 'https://www.ecensus.gov.om/', label: 'VISIT LIVE PORTAL' },
      headline: 'NATIONAL CENSUS // 5,268,072 POPULATION // LIVE PUBLIC PLATFORM',
      briefing: [
        'The eCensus is Oman’s official Census of Population, Housing and Establishments — one of the country’s most important national data platforms.',
        'I architected the data flow and visualization layers: how raw census data moves, transforms and renders as interactive maps, indicators and dashboards covering 5M+ people.'
      ],
      log: [
        'Architected end-to-end census data flow',
        'Designed interactive maps, indicators & dashboards',
        'Handled national-scale population & housing data',
        'Delivered with the Rihal analytics team for NCSI'
      ],
      stack: ['Data Architecture', 'ETL/ELT', 'GIS / Maps', 'BI Dashboards']
    },
    {
      id: 'prj-ncsi-open',
      cat: 'projects',
      shape: 'grid',
      period: 'NATIONAL SCALE',
      org: 'NCSI · National Statistics',
      title: 'NCSI Open Data Portal',
      sub: "Oman's national open data platform",
      short: "Oman's national open-data platform, built to scale.",
      blurb: 'Oman’s official statistics published as open, machine-readable data — on a reusable, scalable architecture.',
      tags: ['Open Data', 'Gov Platform', 'Governance'],
      headline: 'OPEN DATA // NATIONAL STATISTICS // PUBLIC ACCESS UNLOCKED',
      briefing: [
        'The NCSI Open Data Portal publishes Oman’s official statistics as open, machine-readable data — a cornerstone of the national digital agenda.',
        'I led the analytics architecture: dataset pipelines, governance rules and publishing layers, built on the same Unified Open Data Infrastructure so future portals assemble fast.'
      ],
      log: [
        'Led analytics & data architecture for the platform',
        'Built dataset pipelines and governance rules',
        'Standardized publishing layers for ministry data',
        'Part of Oman’s national digital transformation'
      ],
      stack: ['Open Data', 'Data Governance', 'Pipelines', 'APIs']
    },
    {
      id: 'prj-sme',
      cat: 'projects',
      shape: 'bars',
      period: 'NATIONAL SCALE',
      org: 'SME Development Authority',
      title: 'SME Open Data Portal',
      sub: "Analytics for Oman's SME ecosystem",
      short: "Public analytics for Oman's SME economy.",
      blurb: 'A public analytics portal that democratizes data on Oman’s small & medium enterprise economy.',
      tags: ['Analytics', 'Open Data', 'Economy'],
      link: { href: 'https://info.sme.gov.om/', label: 'VISIT LIVE PORTAL' },
      headline: 'SME INTELLIGENCE // OPEN ECONOMY DATA // INSIGHT FOR EVERY BUSINESS',
      briefing: [
        'SMEs are the engine of Oman’s diversifying economy. This portal gives policymakers, entrepreneurs and researchers direct access to the numbers behind it.',
        'I helped deliver the public analytics portal — indicators, pipelines and dashboards that turn registry data into stories anyone can read. Live now at info.sme.gov.om.'
      ],
      log: [
        'Delivered public analytics portal for the SME Authority',
        'Designed indicators & dashboards for SME data',
        'Built pipelines from registry sources to visuals',
        'Live national platform — info.sme.gov.om'
      ],
      stack: ['BI Dashboards', 'Data Pipelines', 'Open Data']
    },
    {
      id: 'prj-agri',
      cat: 'projects',
      shape: 'terrain',
      period: 'NATIONAL SCALE',
      org: 'Ministry of Agriculture, Fisheries & Water',
      title: 'Agriculture, Fishery & Water Census Portal',
      sub: 'Unified data for a sustainable future',
      short: 'Unified census portal for agriculture, water & fisheries.',
      blurb: 'An intelligent portal with precise indicators and interactive dashboards for farmers, researchers and policymakers.',
      tags: ['Gov Platform', 'Sustainability', 'Dashboards'],
      media: { type: 'image', src: 'assets/agri-portal.jpg', caption: 'Agriculture, Fishery & Water Census e-Portal — live indicators' },
      headline: 'AGRI CENSUS // WATER × FISHERY × FARMLAND // SUSTAINABLE DATA',
      briefing: [
        'An intelligent portal offering precise indicators and interactive dashboards to support farmers, researchers and policymakers across agriculture, water and fisheries.',
        'I worked on the data and visualization layers — GDP share, water resources, farmland, fishing licenses and more — unifying census data that used to live in silos.'
      ],
      log: [
        'Built indicator & dashboard layers for the agri census',
        'Unified agriculture, fishery & water datasets',
        'Visualized GDP share and resource indicators',
        'Supports farmers, researchers & policymakers'
      ],
      stack: ['Dashboards', 'Census Data', 'Data Unification']
    },
    {
      id: 'prj-uodi',
      cat: 'projects',
      shape: 'lattice',
      period: 'ARCHITECTURE',
      org: 'Rihal · designed for reuse',
      title: 'Unified Open Data Infrastructure',
      sub: 'One skeleton, every portal',
      short: 'One reusable skeleton behind every government portal.',
      blurb: 'A scalable blueprint that turns every new government data portal into a fast, standardized assembly.',
      tags: ['Architecture', 'Blueprint', 'Scale'],
      headline: 'UNIFIED INFRASTRUCTURE // BUILD ONCE, DEPLOY EVERYWHERE',
      briefing: [
        'Every portal used to be built from scratch. I designed the Unified Open Data Infrastructure to end that — a standard skeleton for ingestion, governance, APIs and visualization.',
        'Launching a new portal becomes configuration, not construction. It’s the quiet engine behind the eCensus, Open Data, SME and Agriculture portals.'
      ],
      log: [
        'Designed a reusable reference architecture',
        'Standardized ingestion → governance → API → visuals',
        'Cut delivery time for new portals dramatically',
        'Adopted across multiple national projects'
      ],
      stack: ['Architecture', 'Kubernetes', 'Docker', 'Data Governance']
    },
    {
      id: 'prj-road',
      cat: 'projects',
      shape: 'road',
      period: 'PROPRIETARY BUILD',
      org: 'Oil & Gas · self-built',
      title: 'Road Analysis App',
      sub: 'Mobile app + dashboard for road health',
      short: 'Mobile app scoring road health from live telemetry.',
      blurb: 'A custom app + dashboard mining second-by-second telemetry to assess road engineering and safety.',
      tags: ['Mobile App', 'Telemetry', 'Safety'],
      media: { type: 'video', src: 'Screen_Recording_20230611-132959_Speedometer.mp4', caption: 'Road Analysis mobile app — real-time monitoring demo' },
      headline: 'ROAD ANALYSIS // SECOND-BY-SECOND TELEMETRY // SAFETY BY DATA',
      briefing: [
        'Built from scratch in the field: a mobile app and dashboard for road health assessment, used to audit road engineering compliance in oil & gas operations.',
        'It mines second-by-second telemetry — rolling, shaking, cornering — into road condition scores, closing the loop between data and real-world safety.'
      ],
      log: [
        'Architected & built the full system solo',
        'Mined second-by-second telemetry for road scoring',
        'Audited road engineering compliance with data',
        'Deployed in live oil & gas fleet operations'
      ],
      stack: ['Android / Kotlin', 'Telemetry', 'Dashboards']
    },
    {
      id: 'prj-bi',
      cat: 'projects',
      shape: 'stack',
      period: 'PORTFOLIO',
      org: 'Multiple clients & platforms',
      title: 'BI Dashboard Suite',
      sub: 'Population analytics, road analysis & more',
      short: 'Dashboards that turn national data into decisions.',
      blurb: 'A body of BI work — from Oman population analysis boards to operational telemetry dashboards.',
      tags: ['Power BI', 'Tableau', 'Story'],
      media: { type: 'image', src: 'assets/dashboards.jpg', caption: 'Selected dashboards — Oman Population Analysis & Road Analysis' },
      headline: 'BI SUITE // DASHBOARDS THAT DECIDE // DATA → STORY → ACTION',
      briefing: [
        'Dashboards are where data meets decision-makers. This suite collects flagship BI work across national statistics and industrial operations.',
        'Highlights: the Oman Population Analysis dashboard and the Road Analysis operational boards — built in Power BI & Tableau over trustworthy DAX/MDX models.'
      ],
      log: [
        'Oman Population Analysis dashboard',
        'Road Analysis operational scoring boards',
        'Semantic models in DAX / MDX over OLAP',
        'Design language: dark, dense, decision-first'
      ],
      stack: ['Power BI', 'Tableau', 'DAX', 'Oracle BI']
    },
    {
      id: 'prj-apps',
      cat: 'projects',
      shape: 'app',
      period: 'APP LAB',
      org: 'Personal app lab',
      title: 'Mobile App Lab',
      sub: 'Speedometer · Text Image Reader · Random Ball',
      short: 'Shipped mobile apps — telemetry, OCR & more.',
      blurb: 'A personal lab of shipped mobile apps — utilities born from real problems and pure curiosity.',
      tags: ['Android', 'Flutter', 'Indie'],
      headline: 'APP LAB // SHIPPED SIDE QUESTS // BUILT FOR FUN, USED FOR REAL',
      briefing: [
        'Not everything needs a client. The App Lab ships ideas: a precision Speedometer, a Text Image Reader (OCR) and Random Ball — just for fun.',
        'These side quests train the bigger systems: the Speedometer’s telemetry engine grew into the Road Analysis app used in live operations.'
      ],
      log: [
        'Speedometer — real-time motion telemetry',
        'Text Image Reader — OCR utility',
        'Random Ball — pure fun, fully shipped',
        'Lab graduates feed production systems'
      ],
      stack: ['Android Studio', 'Kotlin', 'Flutter', 'Java']
    },

    /* ================= SERVICES ================= */
    {
      id: 'srv-data',
      cat: 'services',
      shape: 'db',
      period: 'FREELANCE',
      org: 'Project or retainer',
      title: 'Data Intelligence',
      sub: 'Strategy · Warehousing · Governance · BI',
      short: 'Strategy, warehousing & BI that drive decisions.',
      blurb: 'Transform raw data into strategy — architecture, governance and analytics that drive decisions.',
      tags: ['Data Strategy', 'DWH', 'BI'],
      headline: 'SERVICE // DATA INTELLIGENCE // RAW DATA → STRATEGIC WEAPON',
      briefing: [
        'Most organizations are data-rich and insight-poor. I design the strategy, architecture and governance that turn scattered data into a decision engine.',
        'From data strategy sprints to warehouse design, governance frameworks and executive BI — the same playbook used on national-scale platforms.'
      ],
      log: [
        'Data strategy & architecture design',
        'BI dashboards executives actually use',
        'Data governance framework implementation',
        'Advanced analytics & data warehousing'
      ],
      stack: ['Power BI', 'Tableau', 'SQL', 'Databricks', 'ETL/ELT']
    },
    {
      id: 'srv-software',
      cat: 'services',
      shape: 'code',
      period: 'FREELANCE',
      org: 'Project or advisory',
      title: 'Software Solutions Consultancy',
      sub: 'Architecture · Integration · Delivery',
      short: 'Architecture-to-delivery tech consulting.',
      blurb: 'End-to-end tech consulting — from solution architecture to implementation, proven on government-grade systems.',
      tags: ['Architecture', 'Integration', 'Strategy'],
      headline: 'SERVICE // SOLUTIONS CONSULTANCY // ARCHITECTURE THAT SHIPS',
      briefing: [
        'The right architecture saves years; the wrong stack costs them. I bring experience proven on government and enterprise systems to your build.',
        'Solution architecture, technical strategy, system integration and stack selection — with depth across Python, TypeScript, Rust, Kotlin, Docker and Kubernetes.'
      ],
      log: [
        'Solution architecture & design reviews',
        'Technical strategy & stack selection',
        'System integration, legacy to modern',
        'Scalable deployment: Docker, Kubernetes, CI/CD'
      ],
      stack: ['Python', 'TypeScript', 'Rust', 'Kubernetes', 'Docker']
    },
    {
      id: 'srv-leadership',
      cat: 'services',
      shape: 'pyramid',
      period: 'FREELANCE',
      org: 'Advisory or interim',
      title: 'Corporate Leadership & Strategy',
      sub: 'Teams · Transformation · Operations',
      short: 'Teams, transformation & operational excellence.',
      blurb: 'Strategic leadership and operational excellence — team building, process optimization and change that sticks.',
      tags: ['Strategy', 'Teams', 'Change'],
      headline: 'SERVICE // LEADERSHIP // TEAMS THAT OUTPERFORM THEIR SIZE',
      briefing: [
        'I’ve led 20+ person field operations and grown analytics teams. The pattern is the same: clarity, ownership and momentum beat headcount.',
        'Strategic planning that survives reality, team development with real mentorship, and change management that doesn’t die in a slide deck.'
      ],
      log: [
        'Strategic planning & execution frameworks',
        'Team development & mentorship',
        'Change management for transformation',
        'Operational excellence & process design'
      ],
      stack: ['Strategy', 'Mentorship', 'OKRs', 'Process Design']
    },
    {
      id: 'srv-product',
      cat: 'services',
      shape: 'beacon',
      period: 'FREELANCE',
      org: 'Launch or growth',
      title: 'Product, Marketing & Social',
      sub: 'Concept → Market → Growth',
      short: 'Concept → market → growth, measured.',
      blurb: 'Product strategy from concept to market, plus digital campaigns and social presence that convert.',
      tags: ['Product', 'Go-to-Market', 'Marketing'],
      headline: 'SERVICE // PRODUCT × MARKETING // CONCEPT TO MARKET, MEASURED',
      briefing: [
        'Product and marketing are one loop. I run it end-to-end: strategy and development, go-to-market, digital campaigns and the social presence that feeds the engine.',
        'The edge is data: as a telecom segment manager I price, position and launch against live market data — your campaigns get the same discipline.'
      ],
      log: [
        'Product strategy & development roadmaps',
        'Go-to-market planning & launch',
        'Digital campaigns with measurable ROI',
        'Social media strategy & management'
      ],
      stack: ['Product', 'GTM', 'Campaign Analytics', 'Social']
    },
    {
      id: 'srv-hse',
      cat: 'services',
      shape: 'shield',
      period: 'FREELANCE',
      org: 'Audit or programme',
      title: 'Health, Safety & Environment',
      sub: 'Programmes · Risk · Compliance · Culture',
      short: 'Data-driven safety programmes & compliance.',
      blurb: 'HSE programmes and compliance frameworks forged in oil & gas — risk management and a safety culture that lasts.',
      tags: ['HSE', 'Risk', 'Compliance'],
      headline: 'SERVICE // HSE // SAFETY CULTURE, ENGINEERED WITH DATA',
      briefing: [
        'Four years supervising safety-critical operations at BP Khazzan taught me HSE lives or dies on culture and data — not posters.',
        'I build HSE programmes: risk assessment, compliance auditing, and the training and culture that make procedures instinctive — with a data-driven safety lens.'
      ],
      log: [
        'HSE programme development & rollout',
        'Risk assessment & management frameworks',
        'Compliance auditing to standards',
        'Safety training & culture development'
      ],
      stack: ['HSE', 'Risk Management', 'Auditing', 'Telemetry Analytics']
    }
  ]
};
