const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// In-memory data storage (in production, this would be a database)
let insights = [];
let clients = [];
let categories = [];
let crmLogs = [];

// Initialize categories
const initializeCategories = () => {
    categories = [
        { id: 'cash-movements', name: 'Cash Movements', icon: 'fas fa-money-bill-wave', color: '#059669' },
        { id: 'wire-transfers', name: 'Wire Transfers', icon: 'fas fa-exchange-alt', color: '#0ea5e9' },
        { id: 'financial-planning', name: 'Financial Planning', icon: 'fas fa-chart-pie', color: '#8b5cf6' },
        { id: 'account-performance', name: 'Account Performance', icon: 'fas fa-chart-line', color: '#f59e0b' },
        { id: 'wealth-profiles', name: 'Wealth Profiles', icon: 'fas fa-user-tie', color: '#ef4444' },
        { id: 'business-owners', name: 'Business Owners', icon: 'fas fa-building', color: '#06b6d4' },
        { id: 'estate-planning', name: 'Estate Planning', icon: 'fas fa-home', color: '#84cc16' },
        { id: 'tax-planning', name: 'Tax Planning', icon: 'fas fa-file-invoice-dollar', color: '#f97316' },
        { id: 'trust-planning', name: 'Trust Planning', icon: 'fas fa-shield-alt', color: '#6366f1' },
        { id: 'retirement-planning', name: 'Retirement Planning', icon: 'fas fa-piggy-bank', color: '#ec4899' },
        { id: 'advisory-service', name: 'Advisory Service', icon: 'fas fa-handshake', color: '#10b981' },
        { id: 'life-events', name: 'Life Events', icon: 'fas fa-heart', color: '#f472b6' },
        { id: 'security-lending', name: 'Security Backed Lending', icon: 'fas fa-lock', color: '#374151' },
        { id: 'external-accounts', name: 'External Accounts', icon: 'fas fa-external-link-alt', color: '#6b7280' },
        { id: 'client-engagement', name: 'Client-Portal Engagement', icon: 'fas fa-comments', color: '#14b8a6' },
        { id: 'advisor-engagement', name: 'Client-Advisor Engagement', icon: 'fas fa-user-friends', color: '#8b5cf6' },
        { id: 'client-surveys', name: 'Client Surveys', icon: 'fas fa-poll', color: '#f59e0b' },
        { id: 'prospecting', name: 'Prospecting', icon: 'fas fa-search-plus', color: '#ef4444' },
        { id: 'mortgages', name: 'Mortgages', icon: 'fas fa-home', color: '#06b6d4' },

        { id: 'education-planning', name: 'Education Planning', icon: 'fas fa-graduation-cap', color: '#f97316' },
        { id: 'compliance-risk', name: 'Compliance & Risk', icon: 'fas fa-exclamation-triangle', color: '#dc2626' },
        { id: 'portfolio-management', name: 'Portfolio Management', icon: 'fas fa-briefcase', color: '#7c3aed' },
        { id: 'client-onboarding', name: 'Client Onboarding', icon: 'fas fa-user-plus', color: '#059669' },
        { id: 'market-opportunities', name: 'Market Opportunities', icon: 'fas fa-trending-up', color: '#0ea5e9' },
        { id: 'insurance-products', name: 'Insurance Products', icon: 'fas fa-shield-virus', color: '#be123c' },
        { id: 'annuities', name: 'Annuities', icon: 'fas fa-calendar-check', color: '#a21caf' },
        { id: 'performance-drivers', name: 'Performance Drivers', icon: 'fas fa-chart-area', color: '#1d4ed8' },
        { id: 'product-opportunity', name: 'Investment Products', icon: 'fas fa-box-open', color: '#ea580c' },
        { id: 'savings-checking', name: 'Savings & Checking', icon: 'fas fa-university', color: '#16a34a' },
        { id: 'research-articles', name: 'Research Articles', icon: 'fas fa-newspaper', color: '#7c2d12' },
        { id: 'trade-execution', name: 'Trade Execution', icon: 'fas fa-exchange', color: '#4338ca' },
        { id: 'marketing', name: 'Marketing', icon: 'fas fa-bullhorn', color: '#c2410c' },
        { id: 'client-attrition', name: 'Client Attrition', icon: 'fas fa-user-times', color: '#dc2626' },
        { id: 'corporate-actions', name: 'Corporate Actions', icon: 'fas fa-gavel', color: '#374151' }
    ];
};

// Generate comprehensive mock data
const generateMockData = () => {
    initializeCategories();
    
    // Generate clients
    const firstNames = ['Alexander', 'Sophia', 'William', 'Emma', 'James', 'Olivia', 'Benjamin', 'Ava', 'Lucas', 'Isabella', 'Henry', 'Charlotte', 'Theodore', 'Amelia', 'Sebastian', 'Harper', 'Oliver', 'Evelyn', 'Elijah', 'Abigail', 'Samuel', 'Emily', 'David', 'Elizabeth', 'Joseph', 'Mia', 'John', 'Sofia', 'Daniel', 'Avery', 'Matthew', 'Ella', 'Christopher', 'Scarlett', 'Andrew', 'Grace', 'Joshua', 'Chloe', 'Nathan', 'Victoria', 'Ryan', 'Riley', 'Aaron', 'Aria', 'Isaiah', 'Zoe', 'Thomas', 'Nora', 'Charles', 'Lily', 'Caleb', 'Eleanor', 'Josiah', 'Hannah', 'Christian', 'Lillian', 'Hunter', 'Addison', 'Eli', 'Aubrey', 'Jonathan', 'Ellie', 'Connor', 'Stella', 'Landon', 'Natalie', 'Adrian', 'Zara', 'Asher', 'Leah', 'Cameron', 'Hazel', 'Leo', 'Violet', 'Theodore', 'Aurora', 'Luke', 'Savannah', 'Jack', 'Audrey', 'Oliver', 'Brooklyn', 'Wyatt', 'Bella', 'Arthur', 'Claire', 'Felix', 'Skylar', 'Miles', 'Lucy', 'Ivan', 'Paisley', 'Marcus', 'Everly', 'Caleb', 'Anna', 'Finn', 'Caroline', 'Leon', 'Nova', 'Dean', 'Genesis', 'Ezra', 'Emilia', 'Guy', 'Kennedy', 'Jose', 'Samantha', 'Adam', 'Maya'];
    
    const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'];

    const companies = ['TechCorp Industries', 'Global Financial Services', 'Innovation Dynamics', 'Healthcare Solutions Inc', 'Advanced Manufacturing', 'Digital Ventures LLC', 'Precision Engineering', 'Strategic Consulting Group', 'BioTech Innovations', 'Energy Solutions Corp', 'Retail Excellence Inc', 'Real Estate Holdings', 'Investment Partners', 'Medical Associates', 'Legal Advisory Group', 'Construction Enterprises', 'Transportation Systems', 'Entertainment Group', 'Food & Beverage Co', 'Pharmaceutical Research', 'Aerospace Technologies', 'Environmental Services', 'Educational Institutions', 'Hospitality Management', 'Agricultural Holdings', 'Mining Operations LLC', 'Textile Manufacturing', 'Chemical Industries', 'Software Development', 'Hardware Solutions'];

    const occupations = ['Chief Executive Officer', 'Chief Technology Officer', 'Chief Financial Officer', 'Managing Director', 'Senior Vice President', 'Vice President', 'General Manager', 'Director of Operations', 'Investment Manager', 'Portfolio Manager', 'Venture Capitalist', 'Private Equity Partner', 'Investment Banker', 'Hedge Fund Manager', 'Real Estate Developer', 'Business Owner', 'Entrepreneur', 'Medical Doctor', 'Surgeon', 'Attorney', 'Partner', 'Consultant', 'Engineer', 'Architect', 'Professor', 'Researcher', 'Executive Producer', 'Professional Athlete', 'Entertainment Executive', 'Media Producer'];

    // Generate 250 clients
    clients = [];
    for (let i = 0; i < 250; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const company = companies[Math.floor(Math.random() * companies.length)];
        const occupation = occupations[Math.floor(Math.random() * occupations.length)];
        
        const aum = generateAUM();
        const wealthSegment = determineWealthSegment(aum);
        
        clients.push({
            id: `client_${i + 1}`,
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            company,
            occupation,
            aum,
            wealthSegment,
            joinDate: generateRandomDate(new Date(2015, 0, 1), new Date()),
            lastContact: generateRandomDate(new Date(2024, 0, 1), new Date()),
            riskProfile: ['Conservative', 'Moderate Conservative', 'Moderate', 'Moderate Aggressive', 'Aggressive'][Math.floor(Math.random() * 5)],
            age: Math.floor(Math.random() * 40) + 30,
            location: generateLocation(),
            phone: generatePhone(),
            preferences: generatePreferences()
        });
    }

    // Generate insights for each client
    insights = [];
    clients.forEach((client, clientIndex) => {
        const numInsights = Math.floor(Math.random() * 8) + 2; // 2-10 insights per client
        
        for (let i = 0; i < numInsights; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const insight = generateInsightForCategory(category, client, clientIndex * 10 + i);
            if (insight) {
                insights.push(insight);
            }
        }
    });

    console.log(`Generated ${clients.length} clients and ${insights.length} insights across ${categories.length} categories`);
};

const generateAUM = () => {
    const rand = Math.random();
    if (rand < 0.05) return Math.random() * 40000000 + 10000000; // UHNW: $10M-50M
    else if (rand < 0.20) return Math.random() * 9000000 + 1000000; // HNW: $1M-10M
    else if (rand < 0.40) return Math.random() * 500000 + 500000; // Affluent: $500K-1M
    else if (rand < 0.70) return Math.random() * 400000 + 100000; // Mass Affluent: $100K-500K
    else return Math.random() * 75000 + 25000; // Emerging: $25K-100K
};

const determineWealthSegment = (aum) => {
    if (aum >= 10000000) return 'uhnw';
    if (aum >= 1000000) return 'hnw';
    if (aum >= 500000) return 'affluent';
    if (aum >= 100000) return 'mass-affluent';
    return 'emerging';
};

const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateLocation = () => {
    const cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA'];
    return cities[Math.floor(Math.random() * cities.length)];
};

const generatePhone = () => {
    const areaCode = Math.floor(Math.random() * 800) + 200;
    const exchange = Math.floor(Math.random() * 800) + 200;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${exchange}-${number}`;
};

const generatePreferences = () => {
    const preferences = ['Email', 'Phone', 'Text', 'Video Call', 'In-Person'];
    return preferences[Math.floor(Math.random() * preferences.length)];
};

const generateInsightForCategory = (category, client, insightId) => {
    const priorities = ['high', 'medium', 'low'];
    const statuses = ['active', 'logged', 'dismissed'];
    
    const baseInsight = {
        id: `insight_${insightId + 1}`,
        clientId: client.id,
        clientName: client.fullName,
        categoryId: category.id,
        categoryName: category.name,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdDate: generateRandomDate(new Date(2024, 6, 1), new Date()),
        expiryDate: generateRandomDate(new Date(), new Date(2024, 11, 31)),
        wealthSegment: client.wealthSegment,
        aum: client.aum
    };

    // Generate specific insights based on category with comprehensive examples
    switch (category.id) {
        case 'cash-movements':
            const cashTitles = [
                `Large Cash Distribution - $${Math.floor(Math.random() * 500000 + 100000).toLocaleString()}`,
                'Unusual Cash Withdrawal Pattern Detected',
                'Dividend Payment Optimization Opportunity',
                'Cash Balance Exceeds Optimal Investment Threshold',
                'Upcoming Distribution Impact on Tax Strategy',
                'Money Market Account Inefficiency',
                'Cash Drag on Portfolio Performance'
            ];
            const cashDescriptions = [
                `${client.fullName} has received significant cash distributions that could be strategically deployed for tax-efficient investment growth.`,
                `Analysis shows ${client.firstName} maintains elevated cash positions that may benefit from strategic asset allocation review.`,
                `Recent dividend payments present opportunities for reinvestment or tax-loss harvesting strategies.`,
                `Cash flow patterns suggest ${client.firstName} may be preparing for major financial decisions requiring consultation.`
            ];
            return {
                ...baseInsight,
                title: cashTitles[Math.floor(Math.random() * cashTitles.length)],
                description: cashDescriptions[Math.floor(Math.random() * cashDescriptions.length)],
                actionRequired: 'Schedule cash management strategy consultation',
                potentialValue: Math.floor(Math.random() * 75000) + 10000
            };

        case 'wire-transfers':
            const wireTitles = [
                'Multiple External Wire Transfers Detected',
                'New Financial Institution Relationship',
                'Unusual Transfer Pattern Analysis',
                'Potential Asset Consolidation Opportunity',
                'Cross-Border Transfer Activity',
                'Large Wire Transfer to Investment Account',
                'Recurring Transfer Pattern Identified'
            ];
            return {
                ...baseInsight,
                title: wireTitles[Math.floor(Math.random() * wireTitles.length)],
                description: `${client.fullName} has initiated wire transfers indicating potential asset movement or new financial relationships requiring strategic review.`,
                actionRequired: 'Discuss comprehensive banking and investment consolidation',
                potentialValue: Math.floor(Math.random() * 125000) + 15000
            };

        case 'financial-planning':
            const planTitles = [
                'Financial Plan Performance Deviation',
                'Retirement Goal Achievement Ahead of Schedule',
                'Investment Strategy Underperformance Alert',
                'New Life Goal Integration Required',
                'Estate Planning Component Missing',
                'Tax Strategy Optimization Needed',
                'Risk Tolerance Realignment Opportunity'
            ];
            return {
                ...baseInsight,
                title: planTitles[Math.floor(Math.random() * planTitles.length)],
                description: `${client.fullName}'s financial plan requires strategic updates due to performance variations or changing life circumstances.`,
                actionRequired: 'Schedule comprehensive financial plan review and optimization',
                potentialValue: Math.floor(Math.random() * 250000) + 35000
            };

        case 'account-performance':
            const perfTitles = [
                'Portfolio Concentration Risk Alert',
                'Underperforming Fund Position Review',
                'Asset Allocation Drift Correction',
                'Benchmark Underperformance Analysis',
                'Sector Overweight Risk Management',
                'Small Position Consolidation Opportunity',
                'Alternative Investment Integration'
            ];
            return {
                ...baseInsight,
                title: perfTitles[Math.floor(Math.random() * perfTitles.length)],
                description: `Performance analysis reveals optimization opportunities in ${client.firstName}'s portfolio allocation and investment selection.`,
                actionRequired: 'Propose portfolio rebalancing and optimization strategy',
                potentialValue: Math.floor(Math.random() * 180000) + 25000
            };

        case 'wealth-profiles':
            const wealthTitles = [
                'Wealth Segment Upgrade Opportunity',
                'New Investment Interest Profile',
                'Lifestyle Enhancement Planning',
                'Philanthropic Interest Development',
                'Family Office Service Eligibility',
                'Private Banking Qualification',
                'Concierge Service Integration'
            ];
            return {
                ...baseInsight,
                title: wealthTitles[Math.floor(Math.random() * wealthTitles.length)],
                description: `${client.fullName}'s wealth profile evolution suggests enhanced service opportunities and advanced planning strategies.`,
                actionRequired: 'Review service level enhancement and premium offerings',
                potentialValue: Math.floor(Math.random() * 500000) + 75000
            };

        case 'business-owners':
            if (!client.occupation.includes('CEO') && !client.occupation.includes('Owner') && !client.occupation.includes('Founder') && !client.occupation.includes('Partner')) {
                return null;
            }
            const bizTitles = [
                'Business Succession Planning Initiative',
                'Key Employee Retention Strategy',
                'Commercial Real Estate Opportunity',
                'Business Acquisition Financing',
                'Executive Compensation Optimization',
                'Company Valuation Growth Strategy',
                'Merger & Acquisition Preparation'
            ];
            return {
                ...baseInsight,
                title: bizTitles[Math.floor(Math.random() * bizTitles.length)],
                description: `${client.fullName}'s business presents strategic opportunities for growth planning and succession strategies.`,
                actionRequired: 'Schedule business strategy and succession planning consultation',
                potentialValue: Math.floor(Math.random() * 1500000) + 250000
            };

        case 'estate-planning':
            const estateTitles = [
                'Estate Plan Update Critical',
                'Tax-Efficient Transfer Strategy',
                'Trust Structure Optimization',
                'Charitable Giving Integration',
                'Generation-Skipping Planning',
                'Asset Protection Enhancement',
                'Beneficiary Designation Review'
            ];
            return {
                ...baseInsight,
                title: estateTitles[Math.floor(Math.random() * estateTitles.length)],
                description: `${client.fullName}'s estate planning requires updates for tax efficiency and family wealth transfer optimization.`,
                actionRequired: 'Coordinate estate planning review with legal counsel',
                potentialValue: Math.floor(Math.random() * 400000) + 50000
            };

        case 'tax-planning':
            const taxTitles = [
                'Year-End Tax Optimization Strategy',
                'Wash Sale Rule Violation Prevention',
                'Tax-Loss Harvesting Opportunity',
                'Roth Conversion Analysis',
                'Alternative Minimum Tax Planning',
                'State Tax Residency Optimization',
                'Charitable Tax Strategy Integration'
            ];
            return {
                ...baseInsight,
                title: taxTitles[Math.floor(Math.random() * taxTitles.length)],
                description: `Tax analysis reveals strategic opportunities for ${client.firstName} to optimize tax efficiency and minimize liability.`,
                actionRequired: 'Implement comprehensive tax strategy review',
                potentialValue: Math.floor(Math.random() * 150000) + 20000
            };

        case 'retirement-planning':
            const retireTitles = [
                'Retirement Readiness Assessment',
                'Social Security Optimization Strategy',
                'Healthcare Cost Planning Update',
                'Required Minimum Distribution Planning',
                '401(k) Contribution Maximization',
                'Retirement Income Strategy Design',
                'Long-Term Care Insurance Evaluation'
            ];
            return {
                ...baseInsight,
                title: retireTitles[Math.floor(Math.random() * retireTitles.length)],
                description: `${client.fullName}'s retirement planning requires strategic updates for optimal income and tax efficiency.`,
                actionRequired: 'Schedule retirement strategy optimization consultation',
                potentialValue: Math.floor(Math.random() * 300000) + 40000
            };

        case 'life-events':
            const lifeTitles = [
                'Marriage Planning Consultation',
                'New Child Financial Planning',
                'Career Transition Strategy',
                'Education Funding Optimization',
                'Milestone Achievement Recognition',
                'Family Addition Planning',
                'Empty Nest Strategy Adjustment'
            ];
            return {
                ...baseInsight,
                title: lifeTitles[Math.floor(Math.random() * lifeTitles.length)],
                description: `Recent life events create opportunities to enhance ${client.firstName}'s financial planning for new objectives.`,
                actionRequired: 'Update financial plan for life change integration',
                potentialValue: Math.floor(Math.random() * 100000) + 15000
            };

        case 'security-lending':
            const sblTitles = [
                'Securities-Based Lending Opportunity',
                'Existing SBL Maturity Approaching',
                'Debt Consolidation via SBL',
                'Liquidity Access Without Asset Sale',
                'Interest Rate Optimization Review',
                'Credit Line Expansion Eligibility',
                'Variable Rate Conversion Option'
            ];
            return {
                ...baseInsight,
                title: sblTitles[Math.floor(Math.random() * sblTitles.length)],
                description: `${client.fullName}'s portfolio presents securities-based lending opportunities for enhanced liquidity management.`,
                actionRequired: 'Evaluate securities-based lending strategy and terms',
                potentialValue: Math.floor(Math.random() * 200000) + 30000
            };

        case 'insurance-products':
            const insuranceTitles = [
                'Term Life Insurance Gap Analysis Required',
                'Whole Life Policy Optimization Opportunity',
                'Universal Life Insurance Conversion Review',
                'Disability Insurance Coverage Assessment',
                'Long-Term Care Insurance Evaluation',
                'Key Person Insurance for Business',
                'Umbrella Policy Coverage Review'
            ];
            return {
                ...baseInsight,
                title: insuranceTitles[Math.floor(Math.random() * insuranceTitles.length)],
                description: `${client.fullName}'s insurance coverage requires comprehensive review for optimal protection and tax efficiency strategies.`,
                actionRequired: 'Schedule comprehensive insurance review',
                potentialValue: Math.floor(Math.random() * 200000) + 25000
            };

        case 'annuities':
            const annuityTitles = [
                'Fixed Annuity Income Strategy Review',
                'Variable Annuity Performance Analysis',
                'Immediate Annuity Payout Optimization',
                'Deferred Annuity Tax Strategy Enhancement',
                'Index Annuity Growth Opportunity',
                'Qualified Longevity Annuity Contract (QLAC) Evaluation',
                'Annuity Surrender Charge Analysis'
            ];
            return {
                ...baseInsight,
                title: annuityTitles[Math.floor(Math.random() * annuityTitles.length)],
                description: `${client.fullName}'s retirement income strategy could benefit from annuity products designed for guaranteed income and tax-deferred growth.`,
                actionRequired: 'Review annuity product options and features',
                potentialValue: Math.floor(Math.random() * 300000) + 50000
            };

        case 'performance-drivers':
            const performanceTitles = [
                'Macro Economic Factors Impact Analysis',
                'Sector Rotation Strategy Optimization',
                'Interest Rate Environment Portfolio Adjustment',
                'Currency Hedging Strategy Review',
                'Inflation Protection Asset Allocation',
                'Geopolitical Risk Assessment Required',
                'Market Volatility Hedging Opportunity'
            ];
            return {
                ...baseInsight,
                title: performanceTitles[Math.floor(Math.random() * performanceTitles.length)],
                description: `Current macroeconomic conditions present strategic opportunities for ${client.fullName} to optimize portfolio positioning and risk management.`,
                actionRequired: 'Implement tactical asset allocation adjustments',
                potentialValue: Math.floor(Math.random() * 175000) + 25000
            };

        case 'product-opportunity':
            const productTitles = [
                'Low-Cost ETF Replacement Opportunity',
                'High-Yield Bond Fund Optimization',
                'Real Estate Investment Trust (REIT) Addition',
                'Infrastructure Fund Allocation Strategy',
                'International Diversification Enhancement',
                'ESG Investment Integration Opportunity',
                'Alternative Investment Platform Access'
            ];
            return {
                ...baseInsight,
                title: productTitles[Math.floor(Math.random() * productTitles.length)],
                description: `Product analysis reveals opportunities for ${client.fullName} to enhance portfolio performance through strategic fund selection and cost optimization.`,
                actionRequired: 'Review recommended investment products and strategies',
                potentialValue: Math.floor(Math.random() * 250000) + 40000
            };

        case 'savings-checking':
            const savingsTitles = [
                'High-Yield Savings Account Opportunity',
                'Premium Checking Account Benefits Review',
                'Cash Management Optimization Strategy',
                'Banking Relationship Consolidation',
                'Interest Rate Arbitrage Opportunity',
                'FDIC Insurance Optimization Analysis',
                'Liquidity Management Enhancement'
            ];
            return {
                ...baseInsight,
                title: savingsTitles[Math.floor(Math.random() * savingsTitles.length)],
                description: `Banking analysis shows ${client.fullName} could optimize cash management through enhanced savings and checking account strategies.`,
                actionRequired: 'Review high-yield savings account options',
                potentialValue: Math.floor(Math.random() * 50000) + 5000
            };

        case 'research-articles':
            const researchTitles = [
                'Credit Rating Upgrade Impact Analysis',
                'Analyst Recommendation Change Alert',
                'Sector Outlook Revision Notification',
                'Fund Manager Commentary Review',
                'Market Research Update Required',
                'Investment Thesis Validation Analysis',
                'Third-Party Research Integration'
            ];
            return {
                ...baseInsight,
                title: researchTitles[Math.floor(Math.random() * researchTitles.length)],
                description: `Recent research publications indicate significant implications for ${client.fullName}'s portfolio positions and strategic allocations.`,
                actionRequired: 'Review research implications for current holdings',
                potentialValue: Math.floor(Math.random() * 100000) + 15000
            };

        case 'trade-execution':
            const tradeTitles = [
                'Trade Execution Quality Analysis',
                'Best Execution Policy Review Required',
                'Order Routing Optimization Opportunity',
                'Trade Settlement Issue Resolution',
                'Execution Cost Reduction Strategy',
                'Market Impact Analysis for Large Orders',
                'Trading Platform Enhancement Available'
            ];
            return {
                ...baseInsight,
                title: tradeTitles[Math.floor(Math.random() * tradeTitles.length)],
                description: `Trade execution analysis for ${client.fullName} reveals opportunities to enhance execution quality and reduce transaction costs.`,
                actionRequired: 'Review trade execution quality and costs',
                potentialValue: Math.floor(Math.random() * 75000) + 10000
            };

        case 'marketing':
            const marketingTitles = [
                'Personalized Market Update Campaign',
                'Educational Content Delivery Opportunity',
                'Investment Webinar Invitation',
                'Quarterly Newsletter Customization',
                'Market Commentary Distribution',
                'Financial Planning Seminar Invitation',
                'Tax Strategy Workshop Notification'
            ];
            return {
                ...baseInsight,
                title: marketingTitles[Math.floor(Math.random() * marketingTitles.length)],
                description: `Marketing analysis indicates ${client.fullName} would benefit from customized educational content and market insights delivery.`,
                actionRequired: 'Send personalized market update and insights',
                potentialValue: Math.floor(Math.random() * 25000) + 2500
            };

        case 'client-attrition':
            const attritionTitles = [
                'Client Retention Risk Alert - High Priority',
                'Engagement Pattern Analysis - Action Required',
                'Satisfaction Score Decline Detected',
                'Communication Frequency Drop Alert',
                'Service Level Enhancement Opportunity',
                'Relationship Strengthening Initiative Required',
                'Proactive Retention Strategy Activation'
            ];
            return {
                ...baseInsight,
                title: attritionTitles[Math.floor(Math.random() * attritionTitles.length)],
                description: `AI/ML analysis indicates ${client.fullName} shows patterns consistent with potential attrition risk, requiring immediate attention and intervention.`,
                actionRequired: 'Implement immediate client retention strategy',
                potentialValue: Math.floor(Math.random() * 500000) + 100000
            };

        case 'corporate-actions':
            const corporateTitles = [
                'Dividend Reinvestment Election Required',
                'Stock Split Adjustment Impact Analysis',
                'Merger & Acquisition Decision Point',
                'Rights Offering Participation Evaluation',
                'Spin-off Distribution Strategy Review',
                'Corporate Restructuring Impact Assessment',
                'Special Dividend Tax Implication Review'
            ];
            return {
                ...baseInsight,
                title: corporateTitles[Math.floor(Math.random() * corporateTitles.length)],
                description: `Corporate actions affecting ${client.fullName}'s holdings require strategic decisions to optimize outcomes and maintain portfolio objectives.`,
                actionRequired: 'Review corporate action implications and options',
                potentialValue: Math.floor(Math.random() * 150000) + 20000
            };

        default:
            return {
                ...baseInsight,
                title: `${category.name} Strategic Opportunity`,
                description: `Important ${category.name.toLowerCase()} insight identified for ${client.fullName} requiring professional attention.`,
                actionRequired: `Schedule ${category.name.toLowerCase()} consultation and strategy review`,
                potentialValue: Math.floor(Math.random() * 125000) + 20000
            };
    }
};

// API Routes

// Get all insights
app.get('/api/insights/all', (req, res) => {
    try {
        res.json(insights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve insights' });
    }
});

// Get insights by client ID
app.get('/api/insights/client/:clientId', (req, res) => {
    try {
        const clientInsights = insights.filter(insight => insight.clientId === req.params.clientId);
        res.json(clientInsights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve client insights' });
    }
});

// Get insights by category
app.get('/api/insights/category/:categoryId', (req, res) => {
    try {
        const categoryInsights = insights.filter(insight => insight.categoryId === req.params.categoryId);
        res.json(categoryInsights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve category insights' });
    }
});

// Get all clients
app.get('/api/insights/clients', (req, res) => {
    try {
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve clients' });
    }
});

// Get client by ID
app.get('/api/insights/clients/:clientId', (req, res) => {
    try {
        const client = clients.find(c => c.id === req.params.clientId);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve client' });
    }
});

// Get all categories
app.get('/api/insights/categories', (req, res) => {
    try {
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve categories' });
    }
});

// Log insight to CRM
app.post('/api/insights/log-to-crm', (req, res) => {
    try {
        const { insightId, action } = req.body;
        const insightIndex = insights.findIndex(i => i.id === insightId);
        
        if (insightIndex === -1) {
            return res.status(404).json({ error: 'Insight not found' });
        }

        insights[insightIndex].status = 'logged';
        insights[insightIndex].loggedDate = new Date();

        // Log the CRM action
        crmLogs.push({
            id: `log_${Date.now()}`,
            insightId,
            action: 'logged_to_crm',
            timestamp: new Date(),
            clientId: insights[insightIndex].clientId,
            categoryId: insights[insightIndex].categoryId
        });

        res.json({ 
            message: 'Insight logged to CRM successfully',
            insight: insights[insightIndex]
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log insight to CRM' });
    }
});

// Dismiss insight
app.post('/api/insights/dismiss', (req, res) => {
    try {
        const { insightId, feedback } = req.body;
        const insightIndex = insights.findIndex(i => i.id === insightId);
        
        if (insightIndex === -1) {
            return res.status(404).json({ error: 'Insight not found' });
        }

        insights[insightIndex].status = 'dismissed';
        insights[insightIndex].dismissedDate = new Date();
        insights[insightIndex].feedback = feedback;

        // Log the dismissal
        crmLogs.push({
            id: `log_${Date.now()}`,
            insightId,
            action: 'dismissed',
            feedback,
            timestamp: new Date(),
            clientId: insights[insightIndex].clientId,
            categoryId: insights[insightIndex].categoryId
        });

        res.json({ 
            message: 'Insight dismissed successfully',
            insight: insights[insightIndex]
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to dismiss insight' });
    }
});

// Get CRM logs
app.get('/api/insights/logs', (req, res) => {
    try {
        res.json(crmLogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve logs' });
    }
});

// Search insights
app.get('/api/insights/search', (req, res) => {
    try {
        const { query, category, priority, status, wealthSegment } = req.query;
        
        let filteredInsights = insights;

        if (query) {
            const searchLower = query.toLowerCase();
            filteredInsights = filteredInsights.filter(insight =>
                insight.clientName.toLowerCase().includes(searchLower) ||
                insight.title.toLowerCase().includes(searchLower) ||
                insight.description.toLowerCase().includes(searchLower) ||
                insight.categoryName.toLowerCase().includes(searchLower)
            );
        }

        if (category && category !== 'all') {
            filteredInsights = filteredInsights.filter(insight => insight.categoryId === category);
        }

        if (priority && priority !== 'all') {
            filteredInsights = filteredInsights.filter(insight => insight.priority === priority);
        }

        if (status && status !== 'all') {
            filteredInsights = filteredInsights.filter(insight => insight.status === status);
        }

        if (wealthSegment && wealthSegment !== 'all') {
            filteredInsights = filteredInsights.filter(insight => insight.wealthSegment === wealthSegment);
        }

        res.json(filteredInsights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search insights' });
    }
});

// Dashboard statistics
app.get('/api/insights/dashboard/stats', (req, res) => {
    try {
        const totalInsights = insights.length;
        const activeClients = new Set(insights.map(i => i.clientId)).size;
        const highPriorityInsights = insights.filter(i => i.priority === 'high' && i.status === 'active').length;
        const crmActionsThisWeek = crmLogs.filter(log => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(log.timestamp) > weekAgo;
        }).length;

        const categoryStats = categories.map(category => ({
            id: category.id,
            name: category.name,
            count: insights.filter(i => i.categoryId === category.id).length,
            highPriority: insights.filter(i => i.categoryId === category.id && i.priority === 'high').length
        }));

        const segmentStats = ['uhnw', 'hnw', 'affluent', 'mass-affluent', 'emerging'].map(segment => ({
            segment,
            clients: clients.filter(c => c.wealthSegment === segment).length,
            insights: insights.filter(i => i.wealthSegment === segment).length
        }));

        res.json({
            totalInsights,
            activeClients,
            highPriorityInsights,
            crmActionsThisWeek,
            categoryStats,
            segmentStats
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve dashboard statistics' });
    }
});

// Serve the insights application
app.get('/insights', (req, res) => {
    res.sendFile(path.join(__dirname, 'insights-index.html'));
});

// Serve the original Financial Advisor application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize data and start server
generateMockData();

app.listen(port, '0.0.0.0', () => {
    console.log(`Insights Management server running at http://0.0.0.0:${port}`);
    console.log('Available endpoints:');
    console.log('  GET  / - Financial Advisor Outlook application');
    console.log('  GET  /insights - Insights Management application');
    console.log('  GET  /api/insights/all - Get all insights');
    console.log('  GET  /api/insights/clients - Get all clients');
    console.log('  GET  /api/insights/categories - Get all categories');
    console.log('  POST /api/insights/log-to-crm - Log insight to CRM');
    console.log('  POST /api/insights/dismiss - Dismiss insight');
    console.log('  GET  /api/insights/dashboard/stats - Dashboard statistics');
});

module.exports = app;