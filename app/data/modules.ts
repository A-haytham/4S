export type ModuleIcon =
  | "administration"
  | "agriculture"
  | "assets"
  | "attendance"
  | "bank"
  | "chart"
  | "construction"
  | "cooling"
  | "digital"
  | "dollar"
  | "extracts"
  | "facility"
  | "invoice"
  | "maintenance"
  | "manufacturing"
  | "mobile"
  | "package"
  | "realEstate"
  | "settings"
  | "shoppingCart"
  | "trending"
  | "users"
  | "zap";

export type ModuleDetail = {
  slug: string;
  title: string;
  category?: string;
  shortDescription: string;
  overview: string[];
  features: string[];
  technicalFeatures?: string[];
  reports?: string[];
  sections?: {
    title: string;
    items: string[];
  }[];
  cta?: string;
  icon?: ModuleIcon;
  videoUrls?: string[];
  relatedSlugs?: string[];
};

export const modules: ModuleDetail[] = [
  {
    slug: "finance-accounting",
    title: "Finance & Accounting / General Ledger System",
    category: "Financial System",
    shortDescription: "Record GL data, journals, budgets, fiscal closures, and financial reports with strong control.",
    overview: [
      "The General Ledger System allows teams to record main GL data, journal entries, estimated budgets, and fiscal period closing while producing General Ledger, Cost Center, Final Account, and Estimated Budget reports.",
      "Transactions from sub-ledgers such as Sales, Purchasing, Accounts Receivable, Accounts Payable, Letters of Credit, Stock Control, and Fixed Assets are integrated and reviewed through dedicated general ledger reporting tools.",
    ],
    features: [
      "Unlimited branches and subsidiaries setup",
      "Multiple account structure configurations",
      "Multi-currency support with automatic conversion and revaluation",
      "Advanced financial reporting with customizable formats",
      "Flexible account hierarchy from simple to complex structures",
      "Budgeting for accounts and cost centers",
      "Import of previous trial balances for monthly or yearly comparison",
      "Online and offline posting options",
      "Integration with subsidiary ledgers for journal posting and review",
      "Reporting without fiscal year closure",
      "Multi-period and multi-year comparative analysis",
    ],
    technicalFeatures: [
      "Chart of Accounts up to 11 levels and 24 digits",
      "Cost Centers up to 9 levels and 18 digits",
      "Analytical codes for third-dimension financial analysis",
      "Flexible fiscal year setup and multiple journal numbering methods",
      "Matrix relationship between accounts and cost centers",
      "Flexible account structure definition with customizable digit lengths",
      "Recurring journal entries, drill-down reporting, and data protection for closed periods",
      "Custom journal type definitions",
      "Consolidated account generation through mapping or grouping",
      "Summary account reporting capabilities",
      "Flexible currency rate adjustments",
      "Multiple closing cycles within a fiscal year with revision tracking",
      "Opening balance entry via journal or direct value input",
      "Accumulative journals for consolidating small expenses",
      "Account code modification and drag-and-drop account hierarchy management",
      "Sub-account assignment for departments",
      "Currency matrix with transaction-level flexibility",
      "Multi-currency journal entry support",
    ],
    reports: [
      "Current account balances",
      "Journal entries and journal ledger",
      "Monthly trial balance and trial balance review",
      "Monthly trial balance comparison",
      "Cost center monthly trial balance",
      "Cost center journal ledger and allocation distribution",
      "Operating statement, trading statement, profit and loss, and balance sheet",
    ],
    sections: [
      {
        title: "General Ledger Concepts",
        items: [
          "Stores financial information through debit and credit account entries approved by a trial balance",
          "Categorizes transactions into assets, liabilities, owners' equity, revenues, and expenses",
          "Supports control accounts such as Accounts Receivable, Inventory, Equipment, and Accounts Payable",
          "Summarizes sub-ledger entries into the general ledger for financial statement preparation",
          "Uses double-entry accounting where every debit has a corresponding credit",
        ],
      },
    ],
    icon: "dollar",
    videoUrls: ["/modules-videos/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%AD%D8%B3%D8%A7%D8%A8%D8%A7%D8%AA%204S.mp4"],
    relatedSlugs: ["banks", "assets", "electronic-invoice-automated-tax-system"],
  },
  {
    slug: "inventory-management",
    title: "Inventory Management",
    category: "Operations",
    shortDescription: "Track stock, warehouses, valuation, and replenishment in real time.",
    overview: [
      "Inventory Management helps organizations monitor stock movement, warehouse balances, item valuation, and replenishment activity across locations.",
      "It improves stock accuracy, supports operational control, and gives teams the visibility needed to reduce shortages, overstocks, and manual reconciliation.",
    ],
    features: [
      "Real-time stock visibility across warehouses",
      "Batch, serial, and valuation tracking",
      "Reorder points and demand planning",
      "Warehouse transfers and pick/pack workflows",
      "Inventory opening balances and item identification",
      "Integration with purchasing, sales, and finance",
    ],
    icon: "package",
    videoUrls: ["/modules-videos/%D9%85%D8%AE%D8%A7%D8%B2%D9%86%204S.mp4"],
    relatedSlugs: ["procurement", "sales-crm", "manufacturing"],
  },
  {
    slug: "sales-crm",
    title: "Sales & CRM / Sales Management System",
    category: "Sales",
    shortDescription: "Manage customers, proposals, orders, invoices, collections, and sales analytics.",
    overview: [
      "The Sales Management System covers common company transaction types including proposals, sales orders, purchase orders, and invoices.",
      "It provides an effective tool to control and follow up accounts payable and receivable transactions while giving sales teams customer history, credit visibility, and performance reporting.",
    ],
    features: [
      "Unlimited customers and customer classifications",
      "Complete customer database including personal, financial, administrative, and tax data",
      "Sales orders, quotations, invoice issuance, and sales returns",
      "Ability to add customer logos in invoice headers and customize invoice layouts with signature sections",
      "Customer statements, credit limits, payment terms, and discount policies",
      "Sales analysis by customer, store, representative, region, item, and group",
      "Linking customers with zones, sales representatives, classifications, and related supplier codes",
      "Multiple discount types including fixed percentage, variable percentage, fixed amount, and variable amount",
      "POS interface support and non-stock service item sales",
      "Reconciliation between quotations, sales orders, and issued invoices",
      "Special pricing for customers or customer groups",
      "Multiple price lists for different sales models",
      "Sales budget and sales tax monitoring",
      "Integration with cash box, bank modules, and General Ledger",
    ],
    technicalFeatures: [
      "Configurable price matrix based on quantity or amount",
      "Customer-based discount rules and tax-exempt customer types",
      "Consolidated invoicing for main and branch operations",
      "Partial customer code sorting and blacklisted customer management",
      "Commission rules based on sales targets per item",
      "Return handling with or without commission",
      "Year-end bonus programs based on sales volume",
      "Quotation generation and invoice generation from quotations",
      "Sales quota management by value, quantity, or both",
      "Commission calculations by invoice or payment",
      "Dual-segment coding for supervisors and salespersons",
      "Promotional campaign management for defined periods",
      "Customer/vendor linking for reconciliation and consolidation",
    ],
    reports: [
      "Sales Journal",
      "Customer gross profit",
      "Total sold items by customer",
      "Monthly sales analysis",
      "Credit aging and customer statements",
      "Advanced analytical reporting by item, customer, location, and time period",
      "Sales representative performance reports including sales, collections, and commissions",
    ],
    icon: "trending",
    videoUrls: ["/modules-videos/%D9%85%D8%A8%D9%8A%D8%B9%D8%A7%D8%AA%204S.mp4"],
    relatedSlugs: ["crm-systems", "inventory-management", "finance-accounting"],
  },
  {
    slug: "procurement",
    title: "Procurement",
    category: "Supply Chain",
    shortDescription: "Streamline purchase requests, approvals, suppliers, POs, receipts, and spend control.",
    overview: [
      "Procurement centralizes supplier management, purchase requests, approvals, purchase orders, receipts, and matching processes.",
      "It gives finance and operations teams better control over spend, supplier performance, and compliance from request to payment.",
    ],
    features: [
      "Purchase requests and approval workflows",
      "Supplier management and RFQs",
      "Purchase orders, receipts, and matching",
      "Spend analytics and compliance controls",
      "Supplier price comparison",
      "Integration with inventory and financial accounting",
    ],
    icon: "shoppingCart",
    videoUrls: ["/modules-videos/%D9%85%D8%B4%D8%AA%D8%B1%D9%8A%D8%A7%D8%AA%204S.mp4"],
    relatedSlugs: ["inventory-management", "finance-accounting", "construction-management-system"],
  },
  {
    slug: "human-resources",
    title: "Human Resources",
    category: "HR System",
    shortDescription: "Manage employee records, payroll, attendance, benefits, time off, and performance from one hub.",
    overview: [
      "Human Resources brings employee records, onboarding, payroll, benefits, attendance, scheduling, and performance activities into a controlled HR environment.",
      "The module supports day-to-day HR administration while improving data accuracy and integration with payroll and attendance processes.",
    ],
    features: [
      "Employee records and onboarding",
      "Payroll and benefits management",
      "Time off, attendance, and scheduling",
      "Performance goals and reviews",
      "Department and position management",
      "Integration with attendance and payroll workflows",
    ],
    icon: "users",
    relatedSlugs: ["attendance-system", "administration", "mobile-application"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    category: "Production",
    shortDescription: "Plan production, manage BOMs, track costs, and improve operational efficiency.",
    overview: [
      "Manufacturing supports production planning, work orders, bills of material, routing, quality checks, and traceability.",
      "It helps teams connect production activity with inventory and costing so managers can monitor efficiency, variance, and output quality.",
    ],
    features: [
      "BOMs, routings, and work orders",
      "Production scheduling and capacity planning",
      "Costing and variance analysis",
      "Quality checks and traceability",
      "Material requirement visibility",
      "Integration with inventory and finance",
    ],
    icon: "manufacturing",
    videoUrls: ["/modules-videos/%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%A7%D8%AC%204S.mp4"],
    relatedSlugs: ["inventory-management", "industrial-costs-accounts", "maintenance-management-system"],
  },
  {
    slug: "business-intelligence",
    title: "Business Intelligence",
    category: "Analytics",
    shortDescription: "Dashboards, KPIs, custom reporting, and drilldowns for smarter management decisions.",
    overview: [
      "Business Intelligence turns operational and financial data into dashboards, KPIs, custom reports, and role-based analytics.",
      "It helps leaders monitor performance, investigate trends, and export the information needed for planning and decision-making.",
    ],
    features: [
      "Real-time dashboards and KPIs",
      "Custom reports and drilldowns",
      "Role-based analytics",
      "Export and BI integrations",
      "Operational and financial performance tracking",
      "Management-ready reporting views",
    ],
    icon: "chart",
    relatedSlugs: ["finance-accounting", "sales-crm", "digital-transformation"],
  },
  {
    slug: "integrations",
    title: "Integrations",
    category: "Platform",
    shortDescription: "Connect ERP workflows with existing tools, services, APIs, webhooks, and external platforms.",
    overview: [
      "Integrations connect 4S Systems with the tools, platforms, and services already used across finance, commerce, operations, and collaboration.",
      "The module supports API-based connectivity, data sync, automation, and monitoring so enterprise processes stay unified across systems.",
    ],
    features: [
      "REST APIs and webhooks",
      "Prebuilt connectors",
      "Data sync and automation",
      "Secure authentication and monitoring",
      "External tax and e-invoice integrations",
      "Operational system connectivity",
    ],
    icon: "zap",
    relatedSlugs: ["electronic-invoice-automated-tax-system", "mobile-application", "digital-transformation"],
  },
  {
    slug: "banks",
    title: "Banks",
    category: "Treasury",
    shortDescription: "Manage bank accounts, cash positions, statements, approvals, and reconciliations.",
    overview: [
      "The Banks module manages bank accounts, treasury controls, signatories, cash positioning, payments, and reconciliation activity.",
      "It strengthens financial visibility by keeping banking operations aligned with accounting, liquidity forecasting, and approval controls.",
    ],
    features: [
      "Bank account management and signatories",
      "Automated bank reconciliation and statements",
      "Cash positioning and liquidity forecasts",
      "Payment approvals and treasury controls",
      "Bank and treasury reporting",
      "Integration with General Ledger",
    ],
    icon: "bank",
    videoUrls: ["/modules-videos/%D8%A7%D9%84%D9%86%D9%82%D8%AF%D9%8A%D8%A9%20%D9%88%D8%A7%D9%84%D8%A8%D9%86%D9%88%D9%83%204S%20.mp4"],
    relatedSlugs: ["finance-accounting", "electronic-invoice-automated-tax-system", "assets"],
  },
  {
    slug: "real-estate-management-system",
    title: "Real Estate Management System",
    category: "Real Estate",
    shortDescription: "Track properties, units, customers, contracts, collections, service, and project progress.",
    overview: [
      "The Real Estate Management System helps development companies track operations, collections, customer service, and project progress through an integrated software environment.",
      "It is designed to deliver high operational control across property portfolios, unit sales, lease contracts, maintenance, and revenue tracking.",
    ],
    features: [
      "Ability to manage multiple companies within the same system",
      "Unlimited project setup",
      "Detailed unit data including type, number, area, and value",
      "Unit layouts and designs entry and printing",
      "Complete customer database management",
      "Price offer registration and printing with detailed payment methods",
      "Reservation installments, contract payments, and annual, quarterly, or monthly installments",
      "Sales transaction recording with full payment method details",
      "Reservation cancellation with refund values and payment methods",
      "Cash receipt registration linked directly to units and installments",
      "Cash refunds and cancellation recording",
      "Customized unit delivery and final clearance reports",
    ],
    reports: [
      "Financial status of each unit including installment count, remaining installments, paid amounts, and arrears",
      "Customer account reports with date, receipt number, value, and balance",
      "Sold units report with unit number, client name, total value, paid amount, and remaining balance",
      "Available units report with unit number, floor, area, unit value, reservation value, contract value, installment value, and receipt value",
      "Overdue payment reports with customer and installment due date details",
      "Expected project revenue reports for specific periods with unit, customer, and monthly distributed revenue details",
    ],
    icon: "realEstate",
    videoUrls: [
    
      "/modules-videos/real-estate.mp4",
    ],
    relatedSlugs: ["facility-management-system", "construction-management-system", "finance-accounting"],
  },
  {
    slug: "assets",
    title: "Assets",
    category: "Asset Management",
    shortDescription: "Control fixed assets, depreciation, transfers, disposals, audits, and lifecycle costs.",
    overview: [
      "Assets gives organizations a controlled registry for fixed assets, categories, locations, values, and lifecycle events.",
      "It supports depreciation, book-value tracking, transfers, disposals, audit readiness, and maintenance cost visibility.",
    ],
    features: [
      "Asset registry with categories and locations",
      "Depreciation schedules and book-value tracking",
      "Transfers, disposals, and audits",
      "Maintenance history and total cost of ownership",
      "Asset lifecycle controls",
      "Financial integration for asset accounting",
    ],
    icon: "assets",
    videoUrls: ["/modules-videos/%D8%A7%D9%84%D8%A7%D8%B5%D9%88%D9%84%204S.mp4"],
    relatedSlugs: ["finance-accounting", "maintenance-management-system", "facility-management-system"],
  },
  {
    slug: "administration",
    title: "Administration",
    category: "Administration",
    shortDescription: "Centralize approvals, policy control, internal requests, documents, and service workflows.",
    overview: [
      "Administration centralizes internal policies, documents, approvals, requests, service tickets, and task routing.",
      "It gives management a cleaner way to govern administrative workflows while maintaining audit-ready logs and compliance evidence.",
    ],
    features: [
      "Document control and policy management",
      "Requests, approvals, and task routing",
      "Facilities and service ticket tracking",
      "Audit-ready logs and compliance workflows",
      "Internal service management",
      "Management visibility over administrative activity",
    ],
    icon: "administration",
    relatedSlugs: ["human-resources", "facility-management-system", "digital-transformation"],
  },
  {
    slug: "agriculture-management-system",
    title: "Agriculture Management System",
    category: "Agriculture",
    shortDescription: "Manage farm operations, crop planning, plantation data, costs, productivity, and reporting.",
    overview: [
      "4S Technology's Agriculture Management System covers the technical requirements of financial and accounting procedures for agricultural applications in accordance with established work procedures.",
      "The system accommodates business growth, transaction volume, larger databases, and expanding user counts while supporting farm operations, seasons, costs, and day-to-day execution.",
    ],
    features: [
      "Crop inventory management with cost and profit visibility",
      "Agricultural activity management including acreage, planting types, and harvesting",
      "Detailed plant information including quality and pricing",
      "Season planning and crop activity tracking",
      "Operational cost and field task logging",
      "Productivity and yield monitoring",
    ],
    sections: [
      {
        title: "Core Components",
        items: ["Basic Data", "Transactions", "Reports"],
      },
      {
        title: "Movements",
        items: ["Acre Farming Plan", "Crop Cultivation Plan"],
      },
    ],
    reports: [
      "Actual vs. Standard Plant Cost Comparison",
      "Standard Cost Report for the Plantation",
      "Estimated Cost per Acre",
      "Detailed plantation and crop reports",
    ],
    icon: "agriculture",
    relatedSlugs: ["inventory-management", "finance-accounting", "mobile-application"],
  },
  {
    slug: "extracts",
    title: "Extracts",
    category: "Construction Finance",
    shortDescription: "Manage work extracts, claims, completion ratios, financial approvals, and billing reports.",
    overview: [
      "Extracts helps teams prepare, review, and approve periodic work extracts and financial claims against completed work.",
      "The module supports completion tracking, billing control, and detailed reporting for execution and financial follow-up.",
    ],
    features: [
      "Periodic extract preparation and review",
      "Completion tracking against work items",
      "Approval workflows for financial claims",
      "Detailed execution and billing reports",
      "Certified work value tracking",
      "Financial claim control",
    ],
    icon: "extracts",
    videoUrls: ["/modules-videos/%D9%85%D8%B3%D8%AA%D8%AE%D9%84%D8%B5%D8%A7%D8%AA%204S.mp4"],
    relatedSlugs: ["construction-management-system", "finance-accounting", "procurement"],
  },
  {
    slug: "mobile-application",
    title: "Mobile Application",
    category: "Mobile Solutions",
    shortDescription: "Build native Android and iOS applications with UI/UX, backend APIs, testing, and deployment support.",
    overview: [
      "4S has a specialized team of native mobile application developers for Android, iOS, UI/UX, and mobile application development.",
      "The delivery process moves from strategy and analysis through UI/UX design, app development, testing, deployment, and ongoing support.",
    ],
    features: [
      "Android native app development",
      "iOS native app development",
      "UI and UX design",
      "Backend and API integration",
      "Application testing and validation",
      "Apple App Store and Google Play deployment support",
    ],
    sections: [
      {
        title: "Delivery Process",
        items: ["Strategy", "Analysis and Planning", "UI/UX Design", "App Development", "Testing", "Deployment and Support"],
      },
    ],
    icon: "mobile",
    relatedSlugs: ["integrations", "digital-transformation", "crm-systems"],
  },
  {
    slug: "cooling-system",
    title: "Cooling System",
    category: "Cold Storage",
    shortDescription: "Manage refrigeration companies and cold storage warehouses operationally and financially.",
    overview: [
      "Cooling System is a specialized software solution for refrigeration companies and cold storage warehouses whose operations depend on preserving and cooling food products under controlled conditions.",
      "It helps organizations monitor operational and financial performance, storage conditions, operating environments, inventory movement, and stock control.",
    ],
    features: [
      "Cold storage facility management",
      "Operational and financial performance monitoring",
      "Storage condition and operating environment data",
      "Inventory movement and stock control",
      "Product quality and lifecycle visibility",
      "Reporting for cooling operations",
    ],
    icon: "cooling",
    relatedSlugs: ["inventory-management", "facility-management-system", "finance-accounting"],
  },
  {
    slug: "fleet-management-system",
    title: "Fleet Management System",
    category: "Fleet Operations",
    shortDescription: "Automate fleet maintenance, vehicle data, dispatch, fuel, repairs, costs, and utilization.",
    overview: [
      "4S Fleet Management System automates maintenance management and monitors the company's fleet of vehicles and equipment with technical and administrative information for all management levels.",
      "It controls preventive maintenance activities, protects company assets, optimizes resource utilization, and helps prevent unexpected breakdowns and misuse.",
    ],
    features: [
      "Fleet vehicle and equipment management",
      "Asset lifecycle management and asset tracking",
      "Driver payroll, dispatch, assignment, and utilization tracking",
      "Fuel and oil consumption monitoring",
      "Preventive maintenance scheduling and reporting",
      "Incident recording, repair follow-up, and spare parts cost tracking",
    ],
    reports: [
      "Complete vehicle and equipment history",
      "Preventive maintenance analysis",
      "Fuel and oil consumption analysis",
      "Supplier, driver, repair, and asset reports",
    ],
    icon: "settings",
    relatedSlugs: ["maintenance-management-system", "assets", "crm-systems"],
  },
  {
    slug: "maintenance-management-system",
    title: "Maintenance Management System",
    category: "Maintenance",
    shortDescription: "Plan, monitor, and control preventive, periodic, emergency, and outsourced maintenance.",
    overview: [
      "The Maintenance Management System helps managers plan, monitor, and control preventive and periodic maintenance operations through an easy-to-use platform.",
      "It can be used by industrial facilities, transportation companies, heavy equipment rental companies, and maintenance centers, and can integrate with Fleet Management for a complete maintenance solution.",
    ],
    features: [
      "Preventive and emergency maintenance management",
      "PM planning with automatic labor and spare parts requirements",
      "Advanced job order and equipment status tracking",
      "Spare parts inventory and stock control",
      "Outsourcing management for external maintenance costs",
      "Crew-based and individual labor management",
    ],
    technicalFeatures: [
      "Component-based architecture",
      "Integration with open ERP systems",
      "Browser-based multi-branch platform",
      "No client-side installation required",
      "Mobile phone integration",
      "Linux, UNIX, and Windows compatibility",
    ],
    reports: [
      "Job Order Components Report",
      "Job Order Lifecycle Report",
      "Maintenance Schedule Report",
      "Equipment Status Reports",
      "Maintenance Cost Analysis Reports",
      "Preventive Maintenance, performance, and productivity reports",
    ],
    icon: "maintenance",
    relatedSlugs: ["fleet-management-system", "facility-management-system", "assets"],
  },
  {
    slug: "facility-management-system",
    title: "Facility Management System",
    category: "Facilities",
    shortDescription: "Manage built environments, building assets, maintenance, compliance, safety, and operations planning.",
    overview: [
      "Facility Management focuses on the maintenance and operation of the built environment, including buildings, building assets, and surrounding facilities.",
      "The system combines essential facility management functions into one solution for operations, maintenance, compliance, safety, asset management, and long-term planning.",
    ],
    features: [
      "Preventive maintenance",
      "Reactive request management",
      "Computerized Maintenance Management System (CMMS)",
      "Code and regulatory compliance management",
      "Business continuity and disaster recovery planning",
      "Workplace safety and annual operating planning",
    ],
    sections: [
      {
        title: "Business Value",
        items: [
          "Safe and efficient facility operations",
          "Well-maintained buildings and assets",
          "Predictable operating expenses and capital planning",
          "Improved asset lifecycle management",
        ],
      },
    ],
    icon: "facility",
    relatedSlugs: ["maintenance-management-system", "assets", "administration"],
  },
  {
    slug: "construction-management-system",
    title: "Construction Management System",
    category: "Construction",
    shortDescription: "Improve project execution, subcontractor extracts, cost control, handover, and reporting.",
    overview: [
      "Construction Management helps organizations improve project management efficiency, enhance construction quality, and streamline project execution.",
      "The system supports subcontractor extracts, financial account control, project timelines, construction costs, document exchange, inspections, and handover checklists.",
    ],
    features: [
      "Project planning and management",
      "Contractor handover request management",
      "Automatic extract generation from delivery orders",
      "Automated deductions based on quality assessment reports",
      "Certified inspection and handover checklists",
      "Supplier, customer, subcontractor, contract, extract, payment, journal, and budget data management",
    ],
    technicalFeatures: [
      "Integrated cost center structure for projects and residential units",
      "Purchase monitoring across cost centers",
      "Supplier management and price comparison",
      "Contract management for clients and subcontractors",
      "Extract monitoring and printing for clients and subcontractors",
      "Contract cost tracking and financial statement generation",
    ],
    reports: [
      "Subcontractor and customer reports",
      "Expected and actual revenue reports",
      "Project progress and performance reports",
      "Cost analysis and budget monitoring reports",
      "Contractor performance evaluation reports",
    ],
    icon: "construction",
    relatedSlugs: ["extracts", "real-estate-management-system", "procurement"],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    category: "Customer Relationship Management",
    shortDescription: "Manage leads, opportunities, customer history, service activity, and follow-up workflows.",
    overview: [
      "This CRM system helps organizations move quickly toward customer satisfaction for their existing customer base while expanding market share.",
      "It enables customer service personnel to route customer requests and monitor processing across departments, while supporting campaign managers and telesales teams in planning campaigns and reaching customers more effectively.",
    ],
    features: [
      "Web-based system",
      "Integration with existing ERP components across desktop or other platforms",
      "Integration with call center software",
      "Mobile phone integration",
      "Linux, UNIX, and Windows operating system support",
      "Modern web technologies to reduce implementation and deployment time",
      "Multiple branch support",
      "Bilingual interfaces and multilingual content",
      "Samsung and Apple tablet compatibility",
      "Dashboards for decision support and process improvement",
    ],
    technicalFeatures: [
      "Flexible design allowing custom workflows and processes through plug-ins",
      "Object-level security for enhanced data protection",
      "Modern user interface with advanced graphics and visualization",
      "Archiving capabilities for storage and retrieval",
      "Automated business process execution",
      "Email and SMS sending manually or automatically",
      "Manual and automatic email tracking",
      "Multimedia support including unit photos, contracts, and engineering drawings",
      "Payment plan calculations",
      "Automatic reservation form generation",
      "Marketing planning and cost tracking",
    ],
    reports: [
      "Interactive reporting tools",
      "Automated report generation",
      "Decision-support dashboards",
      "Campaign and telesales performance reporting",
    ],
    icon: "trending",
    relatedSlugs: ["sales-crm", "mobile-application", "business-intelligence"],
  },
  {
    slug: "schools-management-system",
    title: "Schools Management System",
    category: "Education",
    shortDescription: "Support school administration, student records, finance, operations, and reporting.",
    overview: [
      "Schools Management System is an all-in-one solution for school operations and administrative processes including accounts, expenses, installments, purchases, stores, student data, academic evaluations, exam grades, internal stage divisions, and parent communication.",
      "It also supports school bus monitoring through a mobile application, student supervision, complaints, behavior tracking, admissions, student affairs, exams, library borrowing, and integration with ERP modules.",
    ],
    features: [
      "Student absence registration and tracking",
      "Absence alerts, notifications, and period-based attendance monitoring",
      "Zero-absence student tracking and absence trend monitoring across academic years",
      "ERP integration with General Ledger, Accounts Payable, Banks, Accounts Receivable, Payroll, Personnel, Stock Control, and Purchasing",
      "Behavioral rules by educational stage",
      "Student behavior recording across periods",
      "Parent complaint categorization by educational, administrative, and behavioral topics",
      "Complaint status tracking including under review, resolved, and recurring issues",
      "Academic subject database by year",
      "Assessment type setup for monthly, mid-year, and final exams",
      "Student grade recording, certificates, result statements, ranking, and performance monitoring",
      "Teacher performance tracking based on student results",
    ],
    sections: [
      {
        title: "School Admission System",
        items: [
          "Convert admission forms into electronic web-based forms",
          "Allow parents to submit admission forms online",
          "Reduce manual traffic and prevent student data entry errors",
          "Generate admission statistics per grade and school",
          "Automate admission workflow and processing",
          "Communicate with parents regarding exams and schedules",
          "Transfer accepted students automatically to Student Affairs",
          "Generate reports for accepted and rejected applicants",
        ],
      },
      {
        title: "Student Affairs System",
        items: [
          "Define required documents for student records",
          "Track missing or incomplete student documentation",
          "Maintain centralized student and parent database",
          "Manage fees, discounts, and bus package policies",
          "Post student invoices automatically to Accounts Receivable",
          "Manage attendance, absence reasons, and attendance statistics by campus, grade, and class",
          "Provide customizable dashboards for school status monitoring",
        ],
      },
      {
        title: "Bus Tracking System",
        items: [
          "Real-time monitoring and control of school bus fleet",
          "Live bus location tracking during operating hours",
          "Emergency and over-speed alerts",
          "Parent mobile application for bus tracking",
          "Parent notifications before bus arrival",
          "Student check-in and check-out logging on buses",
          "KPI tracking and parent inquiry support",
        ],
      },
      {
        title: "IB Schools Management",
        items: [
          "Teacher, subject, teacher-class, criteria, ATL category, cluster, and skill definitions",
          "Teacher task definition and task result recording",
          "Assessment matrix management",
          "ATL scoring",
          "Teacher and general comments",
        ],
      },
      {
        title: "Library and Borrowing System",
        items: [
          "Catalog and classify library books",
          "Record daily borrowing transactions",
          "Generate borrowing reports over specific periods",
          "Track overdue books",
          "Analyze student reading trends and preferences",
        ],
      },
    ],
    icon: "administration",
    relatedSlugs: ["finance-accounting", "human-resources", "attendance-system"],
  },
  {
    slug: "industrial-costs-accounts",
    title: "Industrial Costs Accounts",
    category: "Cost Accounting",
    shortDescription: "Analyze production costs, allocations, variances, and industrial profitability.",
    overview: [
      "Industrial Costs Accounts management systems provide detailed monitoring of all cost elements before and after the production process in manufacturing organizations.",
      "The system ensures effective control over production cost components, identifies inefficiencies, and enables immediate corrective decisions so organizations can maintain profitability and strengthen competitiveness.",
    ],
    features: [
      "Full integration with General Ledger, Inventory Management, and Production systems",
      "Identification of service and production cost centers",
      "Reallocation of service cost center expenses to production cost centers",
      "Use of standard prices for materials and products",
      "Automatic generation of deviation entries by quantity or value",
      "Calculation and comparison of standard versus actual product costs",
      "Indirect cost calculation by value or percentage and linking to operations and products",
      "Flexible coverage for industrial operations during production execution stages",
    ],
    technicalFeatures: [
      "Record final products with multiple product trees",
      "Input operating rates for all BOM components with automatic material quantity calculation from inventory",
      "Flexible BOM structures for different production models",
      "Classify operating centers as basic centers, sub-operating centers, or subcontractor employment centers",
      "Record load ratios for each operating center",
      "Track capacity-based operation when working below maximum power",
      "Calculate operational utilization rates accurately",
      "Record production stage tasks to simplify repeated production entry",
      "Support multiple production paths",
      "Control overlap percentage and timing by minutes or ratio",
      "Link product components to specific production processes or full production cycles",
      "Modify product trees and production processes at production order level without changing the base structure",
      "Automatically calculate production start and end times",
      "Track daily production details for each process",
      "Move products flexibly between production stages",
    ],
    reports: [
      "Product tree reports, single-level and multi-level",
      "BOM listing reports",
      "Where-used component reports",
      "Reports linking product trees with operations",
      "Production tracking reports comparing actual versus standard performance",
      "Material consumption and timing analysis reports",
      "Comprehensive industrial cost analysis reports",
    ],
    icon: "chart",
    relatedSlugs: ["manufacturing", "finance-accounting", "inventory-management"],
  },
  {
    slug: "attendance-system",
    title: "Attendance System",
    category: "HR Systems",
    shortDescription: "Control attendance, departures, working hours, absences, overtime, shifts, and payroll posting.",
    overview: [
      "Attendance System solves employee attendance and departure tracking challenges by monitoring working hours, absences, overtime, and attendance patterns.",
      "It integrates with fingerprint devices and attendance machines, and works as part of a complete HR ecosystem with Personnel and Payroll systems.",
    ],
    features: [
      "Official working hour and shift configuration",
      "Late arrival, early departure, overtime, and vacation rules",
      "Fingerprint, card, and magnetic strip attendance machine integration",
      "Manual and automatic attendance adjustments",
      "Payroll posting for overtime, absence, penalties, and deductions",
      "Leave balances, official holidays, and holiday replacement management",
    ],
    technicalFeatures: [
      "Define attendance machines and organizational hierarchy",
      "Create employee cards, shifts, work plans, and employee groups",
      "Collect data directly from attendance machines",
      "Register permissions, absences, special leaves, and shift exchanges",
      "Settle attendance delays, early departures, absences, and overtime",
    ],
    reports: [
      "Employee assignment reports by employee, department, or group",
      "Vacation balance reports",
      "Permissions, absence, and penalties reports",
      "Historical employee records",
      "Attendance, overtime, lateness, absence, and early departure reports",
    ],
    icon: "attendance",
    relatedSlugs: ["human-resources", "mobile-application", "administration"],
  },
  {
    slug: "electronic-invoice-automated-tax-system",
    title: "Electronic Invoice / Automated Tax System",
    category: "Tax Compliance",
    shortDescription: "Integrate ERP operations with electronic invoicing and automated tax authority requirements.",
    overview: [
      "Electronic invoicing has become a key requirement for companies, and 4S Technology helps organizations understand, implement, and integrate electronic invoicing into their ERP processes.",
      "The solution supports invoice creation, submission, payment collection, modification, digital archiving, item coding, customer coding, UUID generation, and electronic signature requirements.",
    ],
    features: [
      "Electronic invoice creation and archiving",
      "Send invoices to customers electronically",
      "Collect payments through digital invoice workflows",
      "Modify invoices when needed",
      "Tax authority integration support",
      "GS1 or GPC item coding alignment",
      "Customer code and commercial registry data management",
      "Unified UUID generation",
      "Electronic signature support through HSM requirements",
      "ERP upgrade or integration support for companies without complete systems",
      "Compliance support for regulatory electronic invoicing requirements",
    ],
    sections: [
      {
        title: "Advantages of Electronic Invoicing",
        items: [
          "Supports e-commerce and online transaction growth",
          "Reduces time and effort required for purchase and invoicing processes",
          "Reduces administrative and operational costs",
          "Speeds up collection processes and improves cash flow and liquidity",
        ],
      },
      {
        title: "Implementation Methods",
        items: [
          "Upload invoices through Excel files via the Tax Authority website for small and medium transaction volumes",
          "Direct system integration with the authority for ERP-based organizations and scalable operations",
        ],
      },
      {
        title: "System Readiness",
        items: [
          "Coordinate with software providers for compliance adjustments when ERP systems already exist",
          "Upgrade incomplete systems or provide full integration support when ERP readiness is limited",
          "Implement electronic invoicing with flexibility and compliance while preserving business process continuity",
        ],
      },
      {
        title: "Integration Scope",
        items: [
          "Human Resource Management Systems",
          "Financial Systems",
          "Inventory Management Systems",
          "Contracting Systems",
          "Fleet Management Systems",
        ],
      },
    ],
    icon: "invoice",
    relatedSlugs: ["finance-accounting", "integrations", "sales-crm"],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    category: "Transformation",
    shortDescription: "Modernize operations by integrating digital technology across business processes and customer value.",
    overview: [
      "Digital transformation integrates digital technology into all areas of a business, changing how organizations operate and deliver value to customers.",
      "It goes beyond adopting tools or moving to the cloud. It represents an organizational and cultural shift that challenges traditional processes and replaces long-established practices with technology-driven methods.",
    ],
    features: [
      "Improved customer experience",
      "Higher productivity and operational efficiency",
      "Reduced operational friction",
      "Enhanced profitability",
      "Greater agility in responding to market change",
      "Digital infrastructure and process modernization",
      "Continuous experimentation with modern operating models",
      "Cultural readiness for change and innovation",
    ],
    sections: [
      {
        title: "Digital Egypt Pillars",
        items: ["Digital transformation", "Digital skills and jobs", "Digital innovation"],
      },
      {
        title: "Digital Infrastructure Initiatives",
        items: [
          "Upgrading fixed broadband networks to improve internet speed and quality",
          "Expanding mobile network coverage across governorates and main roads",
          "Accelerating permits for mobile network towers",
          "Expanding fiber optic networks to connect government buildings nationwide",
          "Connecting schools and villages to high-speed internet through fiber networks",
          "Enhancing post office infrastructure for financial inclusion and digital services",
          "Introducing digital financial services such as mobile wallets, microloans, bill payments, and money transfers",
        ],
      },
      {
        title: "Strategic Value",
        items: [
          "Rethink how the business operates, not only which technology it uses",
          "Become more efficient, innovative, and customer-focused",
          "Prepare for the future of digital economies and evolving market expectations",
        ],
      },
    ],
    icon: "digital",
    relatedSlugs: ["integrations", "business-intelligence", "mobile-application"],
  },
];

export const modulesBySlug = Object.fromEntries(modules.map((module) => [module.slug, module])) as Record<
  string,
  ModuleDetail
>;

export const moduleSlugByLegacyKey: Record<string, string> = {
  finance: "finance-accounting",
  inventory: "inventory-management",
  sales: "sales-crm",
  procurement: "procurement",
  hr: "human-resources",
  manufacturing: "manufacturing",
  reporting: "business-intelligence",
  integrations: "integrations",
  banks: "banks",
  realEstate: "real-estate-management-system",
  assets: "assets",
  administration: "administration",
  agriculture: "agriculture-management-system",
  extracts: "extracts",
};

export function getModuleBySlug(slug: string) {
  return modulesBySlug[slug];
}

export function getRelatedModules(module: ModuleDetail, count = 3) {
  const related = (module.relatedSlugs ?? [])
    .map((slug) => modulesBySlug[slug])
    .filter(Boolean);

  if (related.length >= count) {
    return related.slice(0, count);
  }

  const fallback = modules.filter(
    (item) => item.slug !== module.slug && !related.some((relatedItem) => relatedItem.slug === item.slug),
  );

  return [...related, ...fallback].slice(0, count);
}
