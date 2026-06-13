/* ============================================================
   PORTFOLIO DATA — edit this file to update site content.
   Each item powers one card in the horizontal showcase rails
   and one slide-over detail panel.
   shape: which 3D skeleton prototype is rendered for the card
   ============================================================ */
window.PORTFOLIO_DATA = {

  profile: {
    name: 'Amjad Al Shukairi',
    fullName: 'Amjad Salim Sloum Al Shukairi',
    role: 'Data Strategy & Solutions Lead',
    roles: ['Data Strategist', 'Solution Architect', 'Product Leader', 'Analytics Engineering Lead', 'Full-Stack Builder'],
    location: 'Muscat, Oman',
    email: 'amjad.alshukiri@gmail.com',
    phone: '+968 9978 4498',
    whatsapp: 'https://wa.me/96899784498',
    github: 'https://github.com/amjadshuk',
    linkedin: 'https://www.linkedin.com/in/amjad-al-shukairi-59b53072/',
    cv: 'CV-8.pdf'
  },

  categories: [
    { id: 'experience', label: 'EXPERIENCE', color: '#00e5ff', glyph: '◆' },
    { id: 'projects',   label: 'PROJECTS',   color: '#ff2bd6', glyph: '▲' },
    { id: 'services',   label: 'SERVICES',   color: '#ffb300', glyph: '●' }
  ],

  items: [

    /* ================= EXPERIENCE ================= */
    {
      id: 'exp-friendi',
      cat: 'experience',
      shape: 'signal',
      period: 'AUG 2025 — PRESENT',
      org: 'FRiENDi Mobile Oman · Beyond ONE',
      title: 'Senior Core Segment Manager',
      sub: 'Telecom · Muscat (Hybrid)',
      blurb: 'Managing core segment assets and product strategy for a leading telco MVNO — turning data insights into market-winning offerings.',
      tags: ['Product Strategy', 'Telecom', 'Data-Driven Growth'],
      headline: 'CORE SEGMENT COMMAND // FRiENDi MOBILE OMAN // PRODUCT STRATEGY × DATA',
      briefing: [
        'FRiENDi Mobile is one of Oman’s leading MVNO service providers, part of the Beyond ONE group. As Senior Core Segment Manager I own the core customer segment — the heart of the business — and the product roadmap built around it.',
        'The mission: connect high-level business strategy with operational execution. I manage core segment assets, shape product roadmaps to drive market growth, and use advanced data insights to spot market gaps before competitors do.',
        'Every product decision is data-backed. From pricing and bundling to lifecycle campaigns, the playbook is: measure, model, launch, iterate — fast.'
      ],
      log: [
        'Managing core segment assets for a leading telco MVNO service provider',
        'Shaping product roadmaps that drive measurable market growth',
        'Leveraging advanced data insights to identify market gaps',
        'Launching new competitive product offerings end-to-end',
        'Bridging business strategy with operational execution'
      ],
      stack: ['Product Development', 'Technical Product Management', 'Segment Analytics', 'Market Intelligence', 'Telecom / MVNO']
    },
    {
      id: 'exp-rihal-lead',
      cat: 'experience',
      shape: 'network',
      period: 'APR 2024 — AUG 2025',
      org: 'Rihal · rihal.om',
      title: 'Senior Analytics Engineer & Acting Lead',
      sub: 'Technology & Consultancy · Muscat',
      blurb: 'Led and mentored the analytics team while architecting national-scale government data platforms.',
      tags: ['Team Leadership', 'Solution Architecture', 'Gov Projects'],
      media: { type: 'video', src: 'Whatwebelievein.mp4', caption: 'Rihal — What We Believe In' },
      headline: 'ANALYTICS LEAD // RIHAL // NATIONAL-SCALE GOVERNMENT PLATFORMS',
      briefing: [
        'Rihal is one of Oman’s top technology consultancies. As Senior Analytics Engineer and Acting Lead I grew, mentored and led a high-performing analytics team while fostering a culture of technical excellence.',
        'I led the architecture and delivery of critical government portals — the NCSI Open Data Portal, the national eCensus, the SME Open Data Portal and the Ministry of Agriculture Portal — platforms used at national scale.',
        'A key achievement was designing a Unified Open Data Infrastructure: a scalable blueprint that turned every new portal from a from-scratch build into a streamlined assembly — drastically reducing delivery time for future projects.'
      ],
      log: [
        'Grew, mentored and led a high-performing analytics team',
        'Led architecture & delivery of 4 national government portals',
        'Designed the Unified Open Data Infrastructure blueprint',
        'Provided solution architecture & data governance consultancy',
        'Delivered Data Warehouse (DWH) solutions for enterprise & government'
      ],
      stack: ['Solution Architecture', 'Data Governance', 'Power BI', 'Databricks', 'Dagster', 'Airbyte', 'Kubernetes', 'Docker']
    },
    {
      id: 'exp-rihal-de',
      cat: 'experience',
      shape: 'pipeline',
      period: 'MAY 2022 — APR 2024',
      org: 'Rihal · rihal.om',
      title: 'Data Engineer',
      sub: 'Technology & Consultancy · Muscat',
      blurb: 'Engineered analytics solutions and ETL/ELT pipelines powering government and enterprise data products.',
      tags: ['Data Engineering', 'ETL/ELT', 'BI'],
      headline: 'DATA ENGINEERING // RIHAL // PIPELINES THAT POWER NATIONS',
      briefing: [
        'Joined Rihal as Data Engineer Trainee in May 2022 and was promoted to Data Engineer within four months — then spent two years building the data backbone behind Rihal’s flagship analytics products.',
        'The work spanned the full data lifecycle: ingestion with modern ELT tooling, transformation and modelling for OLAP workloads, warehouse design, and the BI layers that decision-makers actually touch.',
        'This is where engineering discipline met national impact — the pipelines built here fed the census, open data and ministry portals used across Oman.'
      ],
      log: [
        'Promoted from Trainee to Data Engineer in 4 months',
        'Built and maintained ETL/ELT pipelines for national data products',
        'Modelled OLAP/OLTP data warehouses',
        'Developed BI dashboards and semantic layers (DAX / MDX)',
        'Earned 18+ endorsed skills across the modern data stack'
      ],
      stack: ['SQL', 'Python', 'ETL/ELT', 'Data Warehousing', 'Power BI', 'Tableau', 'Apache Kafka', 'Airflow']
    },
    {
      id: 'exp-khazzan-ops',
      cat: 'experience',
      shape: 'shield',
      period: 'JUN 2021 — MAY 2022',
      org: 'Khazzan Logistics · BP Khazzan Block 61',
      title: 'Operations Supervisor — Road Safety',
      sub: 'Oil & Gas · Oman',
      blurb: 'Supervised road safety operations at BP Khazzan Block 61 — people, vehicles, HSE procedures and supply chains.',
      tags: ['Operations', 'HSE', 'Road Safety'],
      headline: 'OPERATIONS COMMAND // BP KHAZZAN BLOCK 61 // SAFETY FIRST',
      briefing: [
        'At BP’s Khazzan Block 61 — one of the Middle East’s largest tight-gas developments — I supervised road safety operations: managing people, vehicles and rated assets in a high-stakes environment where compliance saves lives.',
        'I led an operations team of 20+ personnel covering fleet monitoring, road safety and HSE supervision, while managing supply chains for internal stocks.',
        'The data instinct never switched off: I analysed vehicle-related data correlations with fatality rates and used the findings to implement data-backed safety improvements across the operation.'
      ],
      log: [
        'Led an operations team of 20+ personnel',
        'Managed fleet monitoring, road safety & HSE supervision',
        'Enforced HSE procedures across people, vehicles & rated assets',
        'Managed supply chains for internal stocks',
        'Implemented data-backed safety improvements'
      ],
      stack: ['Operations Management', 'HSE', 'Fleet Monitoring', 'Risk Management', 'Supply Chain']
    },
    {
      id: 'exp-khazzan-log',
      cat: 'experience',
      shape: 'truck',
      period: 'JUL 2018 — JUL 2021',
      org: 'Khazzan Logistics · BP Khazzan Block 61',
      title: 'Logistics Coordinator',
      sub: 'Oil & Gas · Sultanate of Oman',
      blurb: 'Reporting & analytics for BP contractors — illustrating road safety and risk procedures with data.',
      tags: ['Logistics', 'Reporting', 'Analytics'],
      headline: 'LOGISTICS GRID // BP CONTRACTORS // REPORTING & ANALYTICS',
      briefing: [
        'Where the journey began: three years coordinating logistics at BP Khazzan Block 61, with a focus on reporting and analytics for BP’s contractors.',
        'I worked directly with contractors to illustrate BP’s Road Safety and Risk Procedures — translating policy into operational practice for the fleets moving through the block every day.',
        'This role planted the seed for everything after: it’s where raw operational data first became my tool for changing real-world behaviour.'
      ],
      log: [
        'Coordinated Muscat logistics for BP Khazzan Block 61',
        'Built reporting & analytics for BP contractor operations',
        'Communicated BP Road Safety & Risk Procedures to contractors',
        'Developed Adobe Creative Suite & Excel-based reporting toolkits',
        'Earned 10+ endorsed operational skills'
      ],
      stack: ['Reporting', 'Microsoft Excel', 'Adobe Creative Suite', 'Risk Procedures', 'Coordination']
    },

    /* ================= PROJECTS ================= */
    {
      id: 'prj-ecensus',
      cat: 'projects',
      shape: 'globe',
      period: 'NATIONAL SCALE',
      org: 'NCSI — National Centre for Statistics & Information',
      title: 'Oman eCensus Portal',
      sub: 'Census of Population, Housing & Establishments',
      blurb: 'Architected the data flow and visualization layers for Oman’s national census — 5M+ population records, live to the public.',
      tags: ['Gov Platform', 'Data Architecture', 'Visualization'],
      link: { href: 'https://www.ecensus.gov.om/', label: 'VISIT LIVE PORTAL' },
      headline: 'NATIONAL CENSUS // 5,268,072 POPULATION // LIVE PUBLIC PLATFORM',
      briefing: [
        'The eCensus is Oman’s official Census of Population, Housing and Establishments — one of the country’s most important national data platforms, serving government, researchers and the public.',
        'I architected the data flow and visualization layers: how raw census data moves, transforms, aggregates and finally renders as interactive maps, indicators and dashboards covering Oman’s 5M+ population.',
        'The portal exposes population, buildings, enterprises and datasets through an interactive map and a census library — democratizing access to the nation’s statistical backbone.'
      ],
      log: [
        'Architected end-to-end census data flow',
        'Designed interactive visualization layers (maps, indicators, dashboards)',
        'Handled national-scale population, housing & establishment data',
        'Delivered as part of the Rihal analytics team for NCSI'
      ],
      stack: ['Data Architecture', 'ETL/ELT', 'GIS / Interactive Maps', 'BI Dashboards', 'Open Data']
    },
    {
      id: 'prj-ncsi-open',
      cat: 'projects',
      shape: 'grid',
      period: 'NATIONAL SCALE',
      org: 'NCSI — National Centre for Statistics & Information',
      title: 'NCSI Open Data Portal',
      sub: 'Oman’s national open data platform',
      blurb: 'Open statistical data for the Sultanate — built on a scalable architecture designed for reuse.',
      tags: ['Open Data', 'Gov Platform', 'Data Governance'],
      headline: 'OPEN DATA // NATIONAL STATISTICS // PUBLIC ACCESS UNLOCKED',
      briefing: [
        'The NCSI Open Data Portal publishes Oman’s official statistics as open, machine-readable data — a cornerstone of the country’s digital transformation agenda.',
        'I led the analytics architecture: dataset pipelines, governance rules and the publishing layers that let ministries push data and let citizens, researchers and businesses pull insight.',
        'Built on the same Unified Open Data Infrastructure blueprint, the portal proves the model: standardize the skeleton once, and every future portal assembles in a fraction of the time.'
      ],
      log: [
        'Led analytics & data architecture for the national open data platform',
        'Implemented dataset pipelines and governance rules',
        'Standardized publishing layers for ministry data producers',
        'Part of Oman’s national digital transformation programme'
      ],
      stack: ['Open Data', 'Data Governance', 'Pipelines', 'APIs', 'Visualization']
    },
    {
      id: 'prj-sme',
      cat: 'projects',
      shape: 'bars',
      period: 'NATIONAL SCALE',
      org: 'SME Development Authority',
      title: 'SME Open Data Portal',
      sub: 'Analytics for Oman’s SME ecosystem',
      blurb: 'A public analytics portal that democratizes data on Oman’s small & medium enterprise economy.',
      tags: ['Analytics Portal', 'Open Data', 'Economy'],
      link: { href: 'https://info.sme.gov.om/', label: 'VISIT LIVE PORTAL' },
      headline: 'SME INTELLIGENCE // OPEN ECONOMY DATA // INSIGHT FOR EVERY BUSINESS',
      briefing: [
        'Small and medium enterprises are the engine of Oman’s diversifying economy. The SME Open Data Portal gives policymakers, entrepreneurs and researchers direct access to the numbers behind that engine.',
        'I helped deliver the public-facing analytics portal: indicator design, data pipelines and dashboard layers that turn registry data into stories anyone can read.',
        'The portal is live today at info.sme.gov.om — explore SME counts, sectors, governorates and growth trends in a few clicks.'
      ],
      log: [
        'Delivered public-facing analytics portal for the SME Authority',
        'Designed indicators & dashboards for SME ecosystem data',
        'Built pipelines from registry sources to public visuals',
        'Live national platform — info.sme.gov.om'
      ],
      stack: ['BI Dashboards', 'Data Pipelines', 'Indicator Design', 'Open Data']
    },
    {
      id: 'prj-agri',
      cat: 'projects',
      shape: 'terrain',
      period: 'NATIONAL SCALE',
      org: 'Ministry of Agriculture, Fisheries & Water Resources',
      title: 'Agriculture, Fishery & Water Census e-Portal',
      sub: 'Unified data for a sustainable future',
      blurb: 'Intelligent portal with precise indicators and interactive dashboards supporting farmers, researchers and policymakers.',
      tags: ['Gov Platform', 'Sustainability', 'Dashboards'],
      media: { type: 'image', src: 'assets/agri-portal.jpg', caption: 'Agriculture, Fishery & Water Census e-Portal — live indicators' },
      headline: 'AGRI CENSUS // WATER × FISHERY × FARMLAND // SUSTAINABLE DATA',
      briefing: [
        'An intelligent portal offering precise indicators and interactive dashboards to support farmers, researchers and policymakers in driving sustainable development across agriculture, water and fisheries.',
        'I worked on the data and visualization layers: GDP share indicators, water resources, bee hives, agricultural lands, fishing licenses, agricultural vehicles, tenure data and more — each a curated, explorable dataset.',
        'The portal unifies census data that previously lived in silos, giving Oman a single source of truth for its food and water security planning.'
      ],
      log: [
        'Built indicator & dashboard layers for the national agri census',
        'Unified agriculture, fishery & water datasets into one portal',
        'Visualized GDP share and resource indicators (current & constant prices)',
        'Supports farmers, researchers & policymakers'
      ],
      stack: ['Dashboards', 'Census Data', 'Indicator Design', 'Data Unification']
    },
    {
      id: 'prj-uodi',
      cat: 'projects',
      shape: 'lattice',
      period: 'ARCHITECTURE BLUEPRINT',
      org: 'Rihal — designed for national reuse',
      title: 'Unified Open Data Infrastructure',
      sub: 'One skeleton, every portal',
      blurb: 'A scalable architecture blueprint that turned every new government data portal into a rapid, standardized assembly.',
      tags: ['Solution Architecture', 'Blueprint', 'Scalability'],
      headline: 'UNIFIED INFRASTRUCTURE // BUILD ONCE, DEPLOY EVERYWHERE',
      briefing: [
        'Every government portal used to be a from-scratch project: new pipelines, new governance, new visualization stack. I designed the Unified Open Data Infrastructure to end that cycle.',
        'The blueprint standardizes the full skeleton — ingestion, storage, transformation, governance, APIs and visualization — so that launching a new portal becomes configuration, not construction.',
        'It’s the quiet hero behind the eCensus, Open Data, SME and Agriculture portals: the same restructurable skeleton, re-dressed per topic. (Sound familiar? This website works the same way.)'
      ],
      log: [
        'Designed end-to-end reference architecture for open data platforms',
        'Standardized ingestion → governance → API → visualization layers',
        'Cut delivery time for new portals dramatically',
        'Adopted across multiple national projects'
      ],
      stack: ['Solution Architecture', 'Kubernetes', 'Docker', 'Data Governance', 'API Design']
    },
    {
      id: 'prj-road',
      cat: 'projects',
      shape: 'road',
      period: 'PROPRIETARY BUILD',
      org: 'Oil & Gas Operations — self-architected',
      title: 'Road Analysis System',
      sub: 'Mobile app + dashboard for road health',
      blurb: 'Custom system mining second-by-second telemetry to assess road engineering, compliance and driver safety.',
      tags: ['Mobile App', 'Telemetry', 'Innovation'],
      media: { type: 'video', src: 'Screen_Recording_20230611-132959_Speedometer.mp4', caption: 'Road Analysis mobile app — real-time monitoring demo' },
      headline: 'ROAD ANALYSIS // SECOND-BY-SECOND TELEMETRY // SAFETY BY DATA',
      briefing: [
        'Built from scratch in the field: the Road Analysis System is a proprietary mobile app and dashboard for Road Health Assessment, used to audit road engineering compliance in oil & gas operations.',
        'The app mines second-by-second historical vehicle telemetry — rolling, shaking, cornering forces — and converts it into road condition scores and engineering audit evidence.',
        'It closed the loop between data and lives: correlating vehicle data with incident risk to drive concrete, data-backed road safety improvements.'
      ],
      log: [
        'Architected & built the full system solo — app + dashboard',
        'Mined second-by-second telemetry for road health scoring',
        'Audited road engineering compliance with hard data',
        'Deployed in live oil & gas fleet operations'
      ],
      stack: ['Android / Kotlin', 'Telemetry', 'Signal Processing', 'Dashboards', 'HSE Analytics']
    },
    {
      id: 'prj-bi',
      cat: 'projects',
      shape: 'stack',
      period: 'PORTFOLIO OF WORK',
      org: 'Multiple clients & platforms',
      title: 'BI Dashboard Suite',
      sub: 'Population analytics, road analysis & more',
      blurb: 'A body of BI work — from Oman population analysis boards to operational telemetry dashboards.',
      tags: ['Power BI', 'Tableau', 'Storytelling'],
      media: { type: 'image', src: 'assets/dashboards.jpg', caption: 'Selected dashboards — Oman Population Analysis & Road Analysis' },
      headline: 'BI SUITE // DASHBOARDS THAT DECIDE // DATA → STORY → ACTION',
      briefing: [
        'Dashboards are where data finally meets decision-makers. This suite collects flagship BI work across national statistics and industrial operations.',
        'Highlights include the Oman Population Analysis dashboard — demographic deep-dives over the national map — and the Road Analysis operational boards scoring rolling, shaking and cornering behaviour fleet-wide.',
        'Built with Power BI, Tableau and custom visualization layers, with DAX/MDX semantic models underneath so the numbers stay trustworthy at any drill depth.'
      ],
      log: [
        'Oman Population Analysis dashboard — national demographics',
        'Road Analysis operational scoring dashboards',
        'Semantic models in DAX / MDX over OLAP warehouses',
        'Design language: dark, dense, decision-first'
      ],
      stack: ['Power BI', 'Tableau', 'DAX', 'MDX', 'Oracle BI', 'Data Modelling']
    },
    {
      id: 'prj-apps',
      cat: 'projects',
      shape: 'app',
      period: 'SIDE QUESTS',
      org: 'Personal app lab',
      title: 'Mobile App Lab',
      sub: 'Speedometer · Text Image Reader · Random Ball',
      blurb: 'A personal lab of shipped mobile apps — utilities born from real problems and pure curiosity.',
      tags: ['Android', 'Flutter', 'Indie Builds'],
      headline: 'APP LAB // SHIPPED SIDE QUESTS // BUILT FOR FUN, USED FOR REAL',
      briefing: [
        'Not everything needs a client. The App Lab is where ideas become shipped mobile apps: a precision Speedometer with live telemetry, a Text Image Reader (OCR utility), and Random Ball — because not every build needs a business case.',
        'These side quests are the training ground for the bigger systems: the Speedometer’s telemetry engine grew into the Road Analysis System used in live oil & gas operations.',
        'Stack of choice: Android Studio, Kotlin and Flutter — small apps, production discipline.'
      ],
      log: [
        'Speedometer — real-time motion telemetry app',
        'Text Image Reader — OCR text extraction utility',
        'Random Ball — pure fun, fully shipped',
        'Lab graduates feed production systems'
      ],
      stack: ['Android Studio', 'Kotlin', 'Flutter', 'Java', 'Mobile UX']
    },

    /* ================= SERVICES ================= */
    {
      id: 'srv-data',
      cat: 'services',
      shape: 'db',
      period: 'FREELANCE SERVICE',
      org: 'Engagement: project or retainer',
      title: 'Data Intelligence',
      sub: 'Strategy · Warehousing · Governance · BI',
      blurb: 'Transform raw data into strategic insight — architecture, governance frameworks and analytics that drive decisions.',
      tags: ['Data Strategy', 'DWH', 'Governance', 'BI'],
      headline: 'SERVICE // DATA INTELLIGENCE // RAW DATA → STRATEGIC WEAPON',
      briefing: [
        'Most organizations are data-rich and insight-poor. This service closes that gap: I design the strategy, architecture and governance that turn scattered data into a decision engine.',
        'Engagements range from data strategy sprints and warehouse design to full governance framework implementation and executive BI dashboards — the same playbook used on national-scale government platforms.',
        'You get a partner who has built this at every scale: from a single Excel-driven operation to portals serving an entire country.'
      ],
      log: [
        'Data Strategy & Architecture design',
        'Business Intelligence dashboards executives actually use',
        'Data Governance framework implementation',
        'Advanced analytics & data warehousing (OLAP/OLTP)'
      ],
      stack: ['Power BI', 'Tableau', 'SQL', 'Databricks', 'ETL/ELT', 'Governance Frameworks']
    },
    {
      id: 'srv-software',
      cat: 'services',
      shape: 'code',
      period: 'FREELANCE SERVICE',
      org: 'Engagement: project or advisory',
      title: 'Software Solutions Consultancy',
      sub: 'Architecture · Integration · Delivery',
      blurb: 'End-to-end technology consulting — from solution architecture to implementation, proven on government-grade systems.',
      tags: ['Solution Architecture', 'Integration', 'Tech Strategy'],
      headline: 'SERVICE // SOLUTIONS CONSULTANCY // ARCHITECTURE THAT SHIPS',
      briefing: [
        'Technology decisions compound. The right architecture saves years; the wrong stack costs them. I bring architecture experience proven on government and enterprise-grade systems to your build.',
        'Scope covers solution architecture, technical strategy, system integration and technology stack selection — with hands-on depth across Python, JavaScript/TypeScript, Java, Rust and Kotlin, and infrastructure from Docker and Kubernetes to Kafka and Nginx.',
        'I work as your technical conscience: challenging assumptions, de-risking decisions, and staying until the system is live.'
      ],
      log: [
        'Solution architecture & design reviews',
        'Technical strategy & stack selection',
        'System integration across legacy and modern platforms',
        'Scalable deployment: Docker, Kubernetes, CI/CD'
      ],
      stack: ['Python', 'TypeScript', 'Rust', 'Kotlin', 'Kubernetes', 'Docker', 'Kafka', 'Nginx']
    },
    {
      id: 'srv-leadership',
      cat: 'services',
      shape: 'pyramid',
      period: 'FREELANCE SERVICE',
      org: 'Engagement: advisory or interim',
      title: 'Corporate Leadership & Strategy',
      sub: 'Teams · Transformation · Operations',
      blurb: 'Strategic leadership and operational excellence — team building, process optimization and change that sticks.',
      tags: ['Strategy', 'Team Building', 'Change Management'],
      headline: 'SERVICE // LEADERSHIP // TEAMS THAT OUTPERFORM THEIR SIZE',
      briefing: [
        'I’ve led 20+ person field operations in oil & gas and grown analytics teams in tech consultancies. The pattern is the same everywhere: clarity, ownership and momentum beat headcount.',
        'This service brings that pattern to your organization: strategic planning that survives contact with reality, team development with real mentorship, and change management that doesn’t die in a slide deck.',
        'Available as advisory, interim leadership or structured transformation programmes.'
      ],
      log: [
        'Strategic planning & execution frameworks',
        'Team development & mentorship programmes',
        'Change management for digital transformation',
        'Operational excellence & process optimization'
      ],
      stack: ['Strategic Planning', 'Mentorship', 'OKRs', 'Process Design', 'Operations']
    },
    {
      id: 'srv-product',
      cat: 'services',
      shape: 'beacon',
      period: 'FREELANCE SERVICE',
      org: 'Engagement: launch or growth',
      title: 'Product, Marketing & Social Media',
      sub: 'Concept → Market → Growth',
      blurb: 'Product strategy from concept to market, plus digital campaigns and social presence that convert.',
      tags: ['Product Strategy', 'Go-to-Market', 'Digital Marketing'],
      headline: 'SERVICE // PRODUCT × MARKETING // CONCEPT TO MARKET, MEASURED',
      briefing: [
        'Product and marketing are one loop, not two departments. I run that loop end-to-end: product strategy and development, go-to-market planning, digital campaigns and the social media presence that keeps the engine fed.',
        'The edge is data: as a telecom segment manager I price, position and launch products against live market data daily — your campaigns get the same measurement discipline.',
        'Ideal for launches, repositioning, or building a content engine that compounds.'
      ],
      log: [
        'Product strategy & development roadmaps',
        'Go-to-market planning & launch execution',
        'Digital marketing campaigns with measurable ROI',
        'Social media strategy & management'
      ],
      stack: ['Product Management', 'GTM Strategy', 'Campaign Analytics', 'Content Strategy', 'Social Media']
    },
    {
      id: 'srv-hse',
      cat: 'services',
      shape: 'shield',
      period: 'FREELANCE SERVICE',
      org: 'Engagement: audit or programme',
      title: 'Health, Safety & Environment',
      sub: 'Programmes · Risk · Compliance · Culture',
      blurb: 'HSE programmes and compliance frameworks forged in oil & gas — risk management and safety culture that lasts.',
      tags: ['HSE', 'Risk Assessment', 'Compliance'],
      headline: 'SERVICE // HSE // SAFETY CULTURE, ENGINEERED WITH DATA',
      briefing: [
        'Four years supervising safety-critical operations at BP Khazzan Block 61 taught me that HSE lives or dies on culture and data — not posters.',
        'I build comprehensive HSE programmes: risk assessment and management, compliance auditing, and the training and culture development that make procedures instinctive.',
        'Unique angle: data-driven safety. I’ve correlated vehicle telemetry with incident risk to target interventions where they save lives — and I bring that analytical lens to every programme.'
      ],
      log: [
        'HSE programme development & implementation',
        'Risk assessment & management frameworks',
        'Compliance auditing against industry standards',
        'Safety training & culture development'
      ],
      stack: ['HSE Frameworks', 'Risk Management', 'Auditing', 'Telemetry Analytics', 'Training']
    }
  ]
};
