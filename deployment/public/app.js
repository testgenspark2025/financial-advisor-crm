// Insights Management Application
class InsightsManagementApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentWealthFilter = 'all';
        this.currentCategoryFilter = 'all';
        this.currentPriorityFilter = 'all';
        this.currentStatusFilter = 'all';
        this.searchQuery = '';
        this.clients = [];
        this.insights = [];
        this.categories = [];
        this.selectedInsight = null;

        this.init();
    }

    async init() {
        this.showLoading(true);
        await this.initializeData();
        this.bindEvents();
        this.updateCurrentDate();
        this.renderCurrentView();
        this.showLoading(false);
    }

    async initializeData() {
        // Initialize categories
        this.categories = [
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

        // Load data from API
        try {
            const [clientsResponse, insightsResponse] = await Promise.all([
                axios.get('/api/insights/clients'),
                axios.get('/api/insights/all')
            ]);
            
            this.clients = clientsResponse.data;
            this.insights = insightsResponse.data;
        } catch (error) {
            console.error('Failed to load data:', error);
            // Use mock data if API fails
            this.generateMockData();
        }
    }

    generateMockData() {
        // This will be populated with the comprehensive client and insight data
        this.generateClients();
        this.generateInsights();
    }

    generateClients() {
        const firstNames = ['Alexander', 'Sophia', 'William', 'Emma', 'James', 'Olivia', 'Benjamin', 'Ava', 'Lucas', 'Isabella', 'Henry', 'Charlotte', 'Theodore', 'Amelia', 'Sebastian', 'Harper', 'Oliver', 'Evelyn', 'Elijah', 'Abigail', 'Samuel', 'Emily', 'David', 'Elizabeth', 'Joseph', 'Mia', 'John', 'Sofia', 'Daniel', 'Avery', 'Matthew', 'Ella', 'Christopher', 'Scarlett', 'Andrew', 'Grace', 'Joshua', 'Chloe', 'Nathan', 'Victoria', 'Ryan', 'Riley', 'Aaron', 'Aria', 'Isaiah', 'Zoe', 'Thomas', 'Nora', 'Charles', 'Lily', 'Caleb', 'Eleanor', 'Josiah', 'Hannah', 'Christian', 'Lillian', 'Hunter', 'Addison', 'Eli', 'Aubrey', 'Jonathan', 'Ellie', 'Connor', 'Stella', 'Landon', 'Natalie', 'Adrian', 'Zara', 'Asher', 'Leah', 'Cameron', 'Hazel', 'Leo', 'Violet', 'Theodore', 'Aurora', 'Luke', 'Savannah', 'Jack', 'Audrey', 'Oliver', 'Brooklyn', 'Wyatt', 'Bella', 'Arthur', 'Claire', 'Felix', 'Skylar', 'Miles', 'Lucy', 'Ivan', 'Paisley', 'Marcus', 'Everly', 'Caleb', 'Anna', 'Finn', 'Caroline', 'Leon', 'Nova', 'Dean', 'Genesis', 'Ezra', 'Emilia', 'Guy', 'Kennedy', 'Jose', 'Samantha', 'Adam', 'Maya'];
        
        const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'];

        const companies = ['TechCorp Industries', 'Global Financial Services', 'Innovation Dynamics', 'Healthcare Solutions Inc', 'Advanced Manufacturing', 'Digital Ventures LLC', 'Precision Engineering', 'Strategic Consulting Group', 'BioTech Innovations', 'Energy Solutions Corp', 'Retail Excellence Inc', 'Real Estate Holdings', 'Investment Partners', 'Medical Associates', 'Legal Advisory Group', 'Construction Enterprises', 'Transportation Systems', 'Entertainment Group', 'Food & Beverage Co', 'Pharmaceutical Research', 'Aerospace Technologies', 'Environmental Services', 'Educational Institutions', 'Hospitality Management', 'Agricultural Holdings', 'Mining Operations LLC', 'Textile Manufacturing', 'Chemical Industries', 'Software Development', 'Hardware Solutions'];

        const occupations = ['Chief Executive Officer', 'Chief Technology Officer', 'Chief Financial Officer', 'Managing Director', 'Senior Vice President', 'Vice President', 'General Manager', 'Director of Operations', 'Investment Manager', 'Portfolio Manager', 'Venture Capitalist', 'Private Equity Partner', 'Investment Banker', 'Hedge Fund Manager', 'Real Estate Developer', 'Business Owner', 'Entrepreneur', 'Medical Doctor', 'Surgeon', 'Attorney', 'Partner', 'Consultant', 'Engineer', 'Architect', 'Professor', 'Researcher', 'Executive Producer', 'Professional Athlete', 'Entertainment Executive', 'Media Producer'];

        this.clients = [];
        
        for (let i = 0; i < 250; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const company = companies[Math.floor(Math.random() * companies.length)];
            const occupation = occupations[Math.floor(Math.random() * occupations.length)];
            
            const aum = this.generateAUM();
            const wealthSegment = this.determineWealthSegment(aum);
            
            this.clients.push({
                id: `client_${i + 1}`,
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                company,
                occupation,
                aum,
                wealthSegment,
                joinDate: this.generateRandomDate(new Date(2015, 0, 1), new Date()),
                lastContact: this.generateRandomDate(new Date(2024, 0, 1), new Date()),
                riskProfile: ['Conservative', 'Moderate Conservative', 'Moderate', 'Moderate Aggressive', 'Aggressive'][Math.floor(Math.random() * 5)],
                age: Math.floor(Math.random() * 40) + 30,
                location: this.generateLocation(),
                phone: this.generatePhone(),
                preferences: this.generatePreferences()
            });
        }
    }

    generateAUM() {
        const rand = Math.random();
        if (rand < 0.05) return Math.random() * 40000000 + 10000000; // UHNW: $10M-50M
        else if (rand < 0.20) return Math.random() * 9000000 + 1000000; // HNW: $1M-10M
        else if (rand < 0.40) return Math.random() * 500000 + 500000; // Affluent: $500K-1M
        else if (rand < 0.70) return Math.random() * 400000 + 100000; // Mass Affluent: $100K-500K
        else return Math.random() * 75000 + 25000; // Emerging: $25K-100K
    }

    determineWealthSegment(aum) {
        if (aum >= 10000000) return 'uhnw';
        if (aum >= 1000000) return 'hnw';
        if (aum >= 500000) return 'affluent';
        if (aum >= 100000) return 'mass-affluent';
        return 'emerging';
    }

    generateRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    generateLocation() {
        const cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA', 'El Paso, TX', 'Detroit, MI', 'Nashville, TN', 'Portland, OR', 'Memphis, TN', 'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD', 'Milwaukee, WI'];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    generatePhone() {
        const areaCode = Math.floor(Math.random() * 800) + 200;
        const exchange = Math.floor(Math.random() * 800) + 200;
        const number = Math.floor(Math.random() * 9000) + 1000;
        return `(${areaCode}) ${exchange}-${number}`;
    }

    generatePreferences() {
        const preferences = ['Email', 'Phone', 'Text', 'Video Call', 'In-Person'];
        return preferences[Math.floor(Math.random() * preferences.length)];
    }

    generateInsights() {
        this.insights = [];
        
        // Generate insights for each client
        this.clients.forEach((client, clientIndex) => {
            const numInsights = Math.floor(Math.random() * 8) + 2; // 2-10 insights per client
            
            for (let i = 0; i < numInsights; i++) {
                const category = this.categories[Math.floor(Math.random() * this.categories.length)];
                const insight = this.generateInsightForCategory(category, client, clientIndex * 10 + i);
                if (insight) {
                    this.insights.push(insight);
                }
            }
        });
    }

    generateInsightForCategory(category, client, insightId) {
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
            createdDate: this.generateRandomDate(new Date(2024, 6, 1), new Date()),
            expiryDate: this.generateRandomDate(new Date(), new Date(2024, 11, 31)),
            wealthSegment: client.wealthSegment,
            aum: client.aum
        };

        // Generate specific insights based on category
        switch (category.id) {
            case 'cash-movements':
                return {
                    ...baseInsight,
                    title: this.getCashMovementTitle(client),
                    description: this.getCashMovementDescription(client),
                    actionRequired: this.getCashMovementAction(),
                    potentialValue: Math.floor(Math.random() * 50000) + 5000
                };

            case 'wire-transfers':
                return {
                    ...baseInsight,
                    title: this.getWireTransferTitle(client),
                    description: this.getWireTransferDescription(client),
                    actionRequired: this.getWireTransferAction(),
                    potentialValue: Math.floor(Math.random() * 100000) + 10000
                };

            case 'financial-planning':
                return {
                    ...baseInsight,
                    title: this.getFinancialPlanningTitle(client),
                    description: this.getFinancialPlanningDescription(client),
                    actionRequired: this.getFinancialPlanningAction(),
                    potentialValue: Math.floor(Math.random() * 200000) + 25000
                };

            case 'account-performance':
                return {
                    ...baseInsight,
                    title: this.getAccountPerformanceTitle(client),
                    description: this.getAccountPerformanceDescription(client),
                    actionRequired: this.getAccountPerformanceAction(),
                    potentialValue: Math.floor(Math.random() * 150000) + 15000
                };

            case 'wealth-profiles':
                return {
                    ...baseInsight,
                    title: this.getWealthProfileTitle(client),
                    description: this.getWealthProfileDescription(client),
                    actionRequired: this.getWealthProfileAction(),
                    potentialValue: Math.floor(Math.random() * 500000) + 50000
                };

            case 'business-owners':
                if (client.occupation.includes('CEO') || client.occupation.includes('Owner') || client.occupation.includes('Founder')) {
                    return {
                        ...baseInsight,
                        title: this.getBusinessOwnerTitle(client),
                        description: this.getBusinessOwnerDescription(client),
                        actionRequired: this.getBusinessOwnerAction(),
                        potentialValue: Math.floor(Math.random() * 1000000) + 100000
                    };
                }
                return null;

            case 'estate-planning':
                return {
                    ...baseInsight,
                    title: this.getEstatePlanningTitle(client),
                    description: this.getEstatePlanningDescription(client),
                    actionRequired: this.getEstatePlanningAction(),
                    potentialValue: Math.floor(Math.random() * 300000) + 30000
                };

            case 'tax-planning':
                return {
                    ...baseInsight,
                    title: this.getTaxPlanningTitle(client),
                    description: this.getTaxPlanningDescription(client),
                    actionRequired: this.getTaxPlanningAction(),
                    potentialValue: Math.floor(Math.random() * 100000) + 10000
                };

            case 'retirement-planning':
                return {
                    ...baseInsight,
                    title: this.getRetirementPlanningTitle(client),
                    description: this.getRetirementPlanningDescription(client),
                    actionRequired: this.getRetirementPlanningAction(),
                    potentialValue: Math.floor(Math.random() * 250000) + 25000
                };

            case 'life-events':
                return {
                    ...baseInsight,
                    title: this.getLifeEventTitle(client),
                    description: this.getLifeEventDescription(client),
                    actionRequired: this.getLifeEventAction(),
                    potentialValue: Math.floor(Math.random() * 75000) + 5000
                };

            case 'insurance-products':
                return {
                    ...baseInsight,
                    title: this.getInsuranceProductTitle(client),
                    description: this.getInsuranceProductDescription(client),
                    actionRequired: this.getInsuranceProductAction(),
                    potentialValue: Math.floor(Math.random() * 200000) + 25000
                };

            case 'annuities':
                return {
                    ...baseInsight,
                    title: this.getAnnuityTitle(client),
                    description: this.getAnnuityDescription(client),
                    actionRequired: this.getAnnuityAction(),
                    potentialValue: Math.floor(Math.random() * 300000) + 50000
                };

            case 'performance-drivers':
                return {
                    ...baseInsight,
                    title: this.getPerformanceDriverTitle(client),
                    description: this.getPerformanceDriverDescription(client),
                    actionRequired: this.getPerformanceDriverAction(),
                    potentialValue: Math.floor(Math.random() * 175000) + 25000
                };

            case 'product-opportunity':
                return {
                    ...baseInsight,
                    title: this.getProductOpportunityTitle(client),
                    description: this.getProductOpportunityDescription(client),
                    actionRequired: this.getProductOpportunityAction(),
                    potentialValue: Math.floor(Math.random() * 250000) + 40000
                };

            case 'savings-checking':
                return {
                    ...baseInsight,
                    title: this.getSavingsCheckingTitle(client),
                    description: this.getSavingsCheckingDescription(client),
                    actionRequired: this.getSavingsCheckingAction(),
                    potentialValue: Math.floor(Math.random() * 50000) + 5000
                };

            case 'research-articles':
                return {
                    ...baseInsight,
                    title: this.getResearchArticleTitle(client),
                    description: this.getResearchArticleDescription(client),
                    actionRequired: this.getResearchArticleAction(),
                    potentialValue: Math.floor(Math.random() * 100000) + 15000
                };

            case 'trade-execution':
                return {
                    ...baseInsight,
                    title: this.getTradeExecutionTitle(client),
                    description: this.getTradeExecutionDescription(client),
                    actionRequired: this.getTradeExecutionAction(),
                    potentialValue: Math.floor(Math.random() * 75000) + 10000
                };

            case 'marketing':
                return {
                    ...baseInsight,
                    title: this.getMarketingTitle(client),
                    description: this.getMarketingDescription(client),
                    actionRequired: this.getMarketingAction(),
                    potentialValue: Math.floor(Math.random() * 25000) + 2500
                };

            case 'client-attrition':
                return {
                    ...baseInsight,
                    title: this.getClientAttritionTitle(client),
                    description: this.getClientAttritionDescription(client),
                    actionRequired: this.getClientAttritionAction(),
                    potentialValue: Math.floor(Math.random() * 500000) + 100000
                };

            case 'corporate-actions':
                return {
                    ...baseInsight,
                    title: this.getCorporateActionTitle(client),
                    description: this.getCorporateActionDescription(client),
                    actionRequired: this.getCorporateActionAction(),
                    potentialValue: Math.floor(Math.random() * 150000) + 20000
                };

            default:
                return {
                    ...baseInsight,
                    title: `${category.name} Opportunity for ${client.firstName}`,
                    description: `Important ${category.name.toLowerCase()} insight detected for ${client.fullName}.`,
                    actionRequired: `Review ${category.name.toLowerCase()} strategy`,
                    potentialValue: Math.floor(Math.random() * 100000) + 10000
                };
        }
    }

    // Insight generation methods for different categories
    getCashMovementTitle(client) {
        const titles = [
            `Large Cash Distribution Detected - $${(Math.random() * 100000 + 50000).toLocaleString()}`,
            `Unusual Cash Withdrawal Pattern Observed`,
            `Dividend Payment Optimization Opportunity`,
            `Cash Balance Exceeds Optimal Threshold`,
            `Upcoming Distribution May Impact Tax Strategy`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getCashMovementDescription(client) {
        const descriptions = [
            `${client.fullName} has received a significant cash distribution that may benefit from immediate investment allocation to optimize returns and tax efficiency.`,
            `Analysis shows ${client.firstName} has been maintaining higher than optimal cash balances, presenting an opportunity for strategic deployment.`,
            `Upcoming dividend payments could be strategically reinvested or used for tax-loss harvesting opportunities.`,
            `Recent cash movements suggest ${client.firstName} may be preparing for a major purchase or investment opportunity.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getCashMovementAction() {
        const actions = [
            'Schedule meeting to discuss investment allocation',
            'Review cash management strategy',
            'Propose dividend reinvestment options',
            'Analyze tax implications of cash position',
            'Recommend optimal cash allocation strategy'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getWireTransferTitle(client) {
        const titles = [
            `Multiple Wire Transfers to External Institution Detected`,
            `New Banking Relationship Established`,
            `Unusual Transfer Pattern Requires Review`,
            `Potential Asset Movement Opportunity`,
            `External Transfer Trend Analysis Available`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getWireTransferDescription(client) {
        const descriptions = [
            `${client.fullName} has initiated multiple wire transfers to external financial institutions, which may indicate asset diversification or potential account consolidation opportunities.`,
            `Pattern analysis shows ${client.firstName} is establishing new banking relationships, presenting an opportunity to discuss comprehensive wealth management services.`,
            `Recent wire transfer activity suggests ${client.firstName} may be exploring alternative investment opportunities or financial services.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getWireTransferAction() {
        const actions = [
            'Discuss asset consolidation opportunities',
            'Review external relationship strategy',
            'Propose comprehensive banking solutions',
            'Schedule transfer efficiency consultation',
            'Analyze competitive positioning'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getFinancialPlanningTitle(client) {
        const titles = [
            `Financial Plan Performance Review Needed`,
            `Goal Achievement Timeline Updated`,
            `Plan Optimization Opportunity Identified`,
            `Retirement Projection Requires Adjustment`,
            `Investment Strategy Underperforming Target`,
            `New Financial Goal Detection`,
            `Estate Planning Integration Required`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getFinancialPlanningDescription(client) {
        const descriptions = [
            `${client.fullName}'s current financial plan shows deviation from target trajectory, requiring strategic adjustments to maintain goal achievement timeline.`,
            `Analysis indicates ${client.firstName} is ahead of retirement savings goals, creating opportunities for tax-advantaged strategies or additional goal setting.`,
            `Recent market conditions and portfolio performance suggest plan recalibration would optimize ${client.firstName}'s financial outcomes.`,
            `New life events or changed circumstances may warrant comprehensive plan review and strategy adjustment for ${client.firstName}.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getFinancialPlanningAction() {
        const actions = [
            'Schedule comprehensive plan review',
            'Update goal achievement projections',
            'Propose strategy optimization',
            'Review risk tolerance alignment',
            'Integrate new objectives into plan'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getAccountPerformanceTitle(client) {
        const titles = [
            `Portfolio Concentration Risk Detected`,
            `Investment Performance Below Benchmark`,
            `Asset Allocation Rebalancing Needed`,
            `Fund Performance Review Required`,
            `Diversification Opportunity Available`,
            `Strategic Asset Migration Recommended`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getAccountPerformanceDescription(client) {
        const descriptions = [
            `${client.fullName}'s portfolio shows concentration in specific sectors or assets, creating risk exposure that could be mitigated through diversification.`,
            `Performance analysis indicates ${client.firstName}'s current investment strategy is underperforming relevant benchmarks, suggesting optimization opportunities.`,
            `Asset allocation drift has created imbalances in ${client.firstName}'s portfolio, requiring strategic rebalancing to maintain risk-return objectives.`,
            `Recent fund performance changes present opportunities to enhance ${client.firstName}'s portfolio efficiency and returns.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getAccountPerformanceAction() {
        const actions = [
            'Propose portfolio rebalancing strategy',
            'Review fund selection and performance',
            'Analyze diversification opportunities',
            'Schedule performance review meeting',
            'Recommend strategic asset allocation'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getWealthProfileTitle(client) {
        const titles = [
            `Wealth Segment Classification Updated`,
            `New Investment Interest Profile Detected`,
            `Lifestyle Change Analysis Available`,
            `Family Office Establishment Opportunity`,
            `Philanthropic Interest Development`,
            `Business Acquisition Financing Need`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getWealthProfileDescription(client) {
        const descriptions = [
            `${client.fullName} has demonstrated increased wealth accumulation, potentially warranting upgrade to enhanced service offerings and investment strategies.`,
            `Analysis shows ${client.firstName} has developed new interests in sustainable investing, alternative assets, or specific sector opportunities.`,
            `Lifestyle and spending pattern changes suggest ${client.firstName} may benefit from updated wealth management strategies and service levels.`,
            `Recent business success or inheritance may create opportunities for advanced estate planning and tax optimization strategies.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getWealthProfileAction() {
        const actions = [
            'Review service level appropriateness',
            'Discuss enhanced investment options',
            'Propose wealth transfer strategies',
            'Schedule lifestyle planning consultation',
            'Analyze philanthropic opportunities'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getBusinessOwnerTitle(client) {
        const titles = [
            `Business Valuation Growth Opportunity`,
            `Succession Planning Strategy Required`,
            `Key Employee Retention Program`,
            `Commercial Real Estate Financing`,
            `Business Acquisition Opportunity`,
            `Cash Flow Optimization Strategy`,
            `Executive Compensation Planning`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getBusinessOwnerDescription(client) {
        const descriptions = [
            `${client.fullName}'s business shows strong growth potential, creating opportunities for strategic financing, expansion planning, or succession strategies.`,
            `Analysis indicates ${client.firstName}'s company would benefit from formal succession planning and key employee retention strategies.`,
            `Business performance metrics suggest ${client.firstName} may be ready for acquisition opportunities or strategic partnerships.`,
            `Cash flow patterns in ${client.firstName}'s business present optimization opportunities through strategic financial planning.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getBusinessOwnerAction() {
        const actions = [
            'Schedule business strategy consultation',
            'Propose succession planning review',
            'Analyze financing opportunities',
            'Review executive compensation structure',
            'Discuss acquisition financing options'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getEstatePlanningTitle(client) {
        const titles = [
            `Estate Plan Update Required`,
            `Tax-Efficient Transfer Strategy Available`,
            `Trust Structure Optimization Opportunity`,
            `Charitable Giving Strategy Development`,
            `Generation-Skipping Planning Required`,
            `Asset Protection Strategy Recommended`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getEstatePlanningDescription(client) {
        const descriptions = [
            `${client.fullName}'s estate plan requires updating due to tax law changes, family circumstances, or asset growth beyond current strategy parameters.`,
            `Wealth accumulation has reached levels where ${client.firstName} would benefit from advanced estate planning techniques and tax optimization strategies.`,
            `Family structure changes or new beneficiaries create opportunities to enhance ${client.firstName}'s estate planning effectiveness.`,
            `Current estate structure may not optimize tax efficiency or asset protection for ${client.firstName}'s situation.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getEstatePlanningAction() {
        const actions = [
            'Schedule estate planning review',
            'Propose advanced planning strategies',
            'Review beneficiary designations',
            'Analyze trust structure options',
            'Discuss charitable planning opportunities'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getTaxPlanningTitle(client) {
        const titles = [
            `Tax Optimization Strategy Available`,
            `Wash Sale Opportunity Detected`,
            `Tax-Loss Harvesting Potential`,
            `Quarterly Tax Planning Review`,
            `Alternative Minimum Tax Consideration`,
            `State Tax Strategy Optimization`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getTaxPlanningDescription(client) {
        const descriptions = [
            `${client.fullName}'s current tax situation presents opportunities for strategic planning to minimize tax liability and optimize after-tax returns.`,
            `Portfolio analysis shows ${client.firstName} could benefit from tax-loss harvesting strategies to offset gains and improve tax efficiency.`,
            `Recent income changes or investment performance create tax planning opportunities for ${client.firstName}.`,
            `Quarterly review indicates ${client.firstName} may benefit from proactive tax strategy adjustments before year-end.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getTaxPlanningAction() {
        const actions = [
            'Schedule tax planning consultation',
            'Implement tax-loss harvesting',
            'Review withholding strategies',
            'Analyze Roth conversion opportunity',
            'Propose tax-efficient rebalancing'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getRetirementPlanningTitle(client) {
        const titles = [
            `Retirement Readiness Assessment Required`,
            `401(k) Contribution Optimization`,
            `Social Security Strategy Planning`,
            `Healthcare Cost Planning Update`,
            `Retirement Income Strategy Review`,
            `Required Minimum Distribution Planning`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getRetirementPlanningDescription(client) {
        const descriptions = [
            `${client.fullName}'s retirement projections require updating based on current savings rate, market performance, and lifestyle expectations.`,
            `Analysis shows ${client.firstName} could optimize retirement contributions and investment selections for enhanced outcomes.`,
            `Approaching retirement age creates opportunities for ${client.firstName} to implement advanced distribution and tax strategies.`,
            `Healthcare cost projections and long-term care planning need integration into ${client.firstName}'s retirement strategy.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getRetirementPlanningAction() {
        const actions = [
            'Schedule retirement planning review',
            'Update contribution strategies',
            'Analyze Social Security timing',
            'Review healthcare cost planning',
            'Propose income distribution strategy'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getLifeEventTitle(client) {
        const titles = [
            `Life Event Planning Opportunity`,
            `Family Addition Detected`,
            `Educational Funding Strategy Required`,
            `Marriage Planning Consultation`,
            `Career Change Impact Analysis`,
            `Milestone Celebration Recognition`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getLifeEventDescription(client) {
        const descriptions = [
            `${client.fullName} has experienced significant life changes that may require adjustments to financial planning and investment strategies.`,
            `Recent family additions or changes create opportunities to enhance ${client.firstName}'s financial planning for new objectives and beneficiaries.`,
            `Career progression or changes in ${client.firstName}'s situation may warrant comprehensive strategy review and optimization.`,
            `Milestone achievements present opportunities to celebrate success and plan for next-phase objectives with ${client.firstName}.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getLifeEventAction() {
        const actions = [
            'Schedule life event planning consultation',
            'Update beneficiary designations',
            'Review insurance coverage needs',
            'Propose goal strategy adjustments',
            'Celebrate milestone achievements'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    // New insight generation methods
    getInsuranceProductTitle(client) {
        const titles = [
            'Term Life Insurance Gap Analysis Required',
            'Whole Life Policy Optimization Opportunity',
            'Universal Life Insurance Conversion Review',
            'Disability Insurance Coverage Assessment',
            'Long-Term Care Insurance Evaluation',
            'Key Person Insurance for Business',
            'Umbrella Policy Coverage Review'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getInsuranceProductDescription(client) {
        const descriptions = [
            `${client.fullName}'s insurance coverage requires comprehensive review for optimal protection and tax efficiency strategies.`,
            `Analysis shows ${client.firstName} may benefit from updated life insurance products with better terms and coverage options.`,
            `Current insurance portfolio presents opportunities for ${client.firstName} to enhance protection while reducing premium costs.`,
            `Insurance needs assessment indicates ${client.firstName} should consider additional coverage for comprehensive risk management.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getInsuranceProductAction() {
        const actions = [
            'Schedule comprehensive insurance review',
            'Obtain updated insurance quotes and analysis',
            'Review beneficiary designations and coverage levels',
            'Analyze premium optimization opportunities',
            'Coordinate with insurance specialists'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getAnnuityTitle(client) {
        const titles = [
            'Fixed Annuity Income Strategy Review',
            'Variable Annuity Performance Analysis',
            'Immediate Annuity Payout Optimization',
            'Deferred Annuity Tax Strategy Enhancement',
            'Index Annuity Growth Opportunity',
            'Qualified Longevity Annuity Contract (QLAC) Evaluation',
            'Annuity Surrender Charge Analysis'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getAnnuityDescription(client) {
        const descriptions = [
            `${client.fullName}'s retirement income strategy could benefit from annuity products designed for guaranteed income and tax-deferred growth.`,
            `Current market conditions present favorable opportunities for ${client.firstName} to enhance retirement security through strategic annuity allocation.`,
            `Analysis indicates ${client.firstName} may optimize retirement income through diversified annuity products with varying payout structures.`,
            `Annuity portfolio review shows opportunities for ${client.firstName} to improve income certainty and tax efficiency.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getAnnuityAction() {
        const actions = [
            'Review annuity product options and features',
            'Analyze income guarantees and payout structures',
            'Compare fixed vs variable annuity benefits',
            'Evaluate tax implications of annuity strategies',
            'Schedule retirement income planning consultation'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getPerformanceDriverTitle(client) {
        const titles = [
            'Macro Economic Factors Impact Analysis',
            'Sector Rotation Strategy Optimization',
            'Interest Rate Environment Portfolio Adjustment',
            'Currency Hedging Strategy Review',
            'Inflation Protection Asset Allocation',
            'Geopolitical Risk Assessment Required',
            'Market Volatility Hedging Opportunity'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getPerformanceDriverDescription(client) {
        const descriptions = [
            `Current macroeconomic conditions present strategic opportunities for ${client.fullName} to optimize portfolio positioning and risk management.`,
            `Market analysis indicates ${client.firstName} should consider portfolio adjustments based on key performance drivers and economic indicators.`,
            `Performance attribution analysis shows ${client.firstName}'s portfolio could benefit from strategic allocation changes based on market factors.`,
            `Economic research suggests ${client.firstName} may enhance returns through tactical positioning aligned with performance drivers.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getPerformanceDriverAction() {
        const actions = [
            'Implement tactical asset allocation adjustments',
            'Review economic indicator impact on portfolio',
            'Analyze sector and geographic exposure optimization',
            'Evaluate hedging strategies for risk management',
            'Schedule macro-economic portfolio review'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getProductOpportunityTitle(client) {
        const titles = [
            'Low-Cost ETF Replacement Opportunity',
            'High-Yield Bond Fund Optimization',
            'Real Estate Investment Trust (REIT) Addition',
            'Infrastructure Fund Allocation Strategy',
            'International Diversification Enhancement',
            'ESG Investment Integration Opportunity',
            'Alternative Investment Platform Access'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getProductOpportunityDescription(client) {
        const descriptions = [
            `Product analysis reveals opportunities for ${client.fullName} to enhance portfolio performance through strategic fund selection and cost optimization.`,
            `Current investment landscape presents favorable conditions for ${client.firstName} to access new investment products with enhanced features.`,
            `Portfolio review indicates ${client.firstName} could benefit from diversification through specialized investment products and strategies.`,
            `Investment research suggests ${client.firstName} may optimize returns through strategic product allocation and expense management.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getProductOpportunityAction() {
        const actions = [
            'Review recommended investment products and strategies',
            'Analyze expense ratios and performance metrics',
            'Evaluate diversification benefits of new products',
            'Schedule investment strategy optimization meeting',
            'Implement strategic product allocation changes'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getSavingsCheckingTitle(client) {
        const titles = [
            'High-Yield Savings Account Opportunity',
            'Premium Checking Account Benefits Review',
            'Cash Management Optimization Strategy',
            'Banking Relationship Consolidation',
            'Interest Rate Arbitrage Opportunity',
            'FDIC Insurance Optimization Analysis',
            'Liquidity Management Enhancement'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getSavingsCheckingDescription(client) {
        const descriptions = [
            `Banking analysis shows ${client.fullName} could optimize cash management through enhanced savings and checking account strategies.`,
            `Current interest rate environment presents opportunities for ${client.firstName} to improve cash returns through strategic account selection.`,
            `Cash flow analysis indicates ${client.firstName} may benefit from premium banking products with enhanced features and higher yields.`,
            `Banking relationship review suggests ${client.firstName} could streamline finances while maximizing cash account benefits.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getSavingsCheckingAction() {
        const actions = [
            'Review high-yield savings account options',
            'Analyze premium checking account benefits',
            'Optimize cash management and liquidity strategy',
            'Evaluate banking relationship consolidation',
            'Schedule cash management consultation'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getResearchArticleTitle(client) {
        const titles = [
            'Credit Rating Upgrade Impact Analysis',
            'Analyst Recommendation Change Alert',
            'Sector Outlook Revision Notification',
            'Fund Manager Commentary Review',
            'Market Research Update Required',
            'Investment Thesis Validation Analysis',
            'Third-Party Research Integration'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getResearchArticleDescription(client) {
        const descriptions = [
            `Recent research publications indicate significant implications for ${client.fullName}'s portfolio positions and strategic allocations.`,
            `Investment research updates suggest ${client.firstName} should review current holdings based on revised analyst recommendations and ratings.`,
            `New research findings present opportunities for ${client.firstName} to optimize investment selections based on updated analysis.`,
            `Research article analysis shows ${client.firstName} may benefit from strategic adjustments based on latest market intelligence.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getResearchArticleAction() {
        const actions = [
            'Review research implications for current holdings',
            'Analyze rating changes and recommendation updates',
            'Implement research-based portfolio adjustments',
            'Schedule research review and strategy discussion',
            'Evaluate investment thesis based on new research'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getTradeExecutionTitle(client) {
        const titles = [
            'Trade Execution Quality Analysis',
            'Best Execution Policy Review Required',
            'Order Routing Optimization Opportunity',
            'Trade Settlement Issue Resolution',
            'Execution Cost Reduction Strategy',
            'Market Impact Analysis for Large Orders',
            'Trading Platform Enhancement Available'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getTradeExecutionDescription(client) {
        const descriptions = [
            `Trade execution analysis for ${client.fullName} reveals opportunities to enhance execution quality and reduce transaction costs.`,
            `Order flow analysis indicates ${client.firstName} may benefit from optimized trade routing and execution strategies.`,
            `Execution quality review shows ${client.firstName} could improve portfolio performance through enhanced trading protocols.`,
            `Trading analysis suggests ${client.firstName} may reduce costs and improve outcomes through strategic execution enhancements.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getTradeExecutionAction() {
        const actions = [
            'Review trade execution quality and costs',
            'Optimize order routing and execution strategies',
            'Analyze best execution policy compliance',
            'Implement trade cost reduction measures',
            'Schedule execution quality consultation'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getMarketingTitle(client) {
        const titles = [
            'Personalized Market Update Campaign',
            'Educational Content Delivery Opportunity',
            'Investment Webinar Invitation',
            'Quarterly Newsletter Customization',
            'Market Commentary Distribution',
            'Financial Planning Seminar Invitation',
            'Tax Strategy Workshop Notification'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getMarketingDescription(client) {
        const descriptions = [
            `Marketing analysis indicates ${client.fullName} would benefit from customized educational content and market insights delivery.`,
            `Engagement patterns show ${client.firstName} is receptive to targeted financial education and market commentary communications.`,
            `Communication preferences suggest ${client.firstName} would value personalized marketing materials and educational opportunities.`,
            `Client profiling indicates ${client.firstName} should receive specialized marketing content aligned with their interests and needs.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getMarketingAction() {
        const actions = [
            'Send personalized market update and insights',
            'Deliver targeted educational content',
            'Invite to relevant webinars and seminars',
            'Customize newsletter and communications',
            'Schedule educational consultation meeting'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getClientAttritionTitle(client) {
        const titles = [
            'Client Retention Risk Alert - High Priority',
            'Engagement Pattern Analysis - Action Required',
            'Satisfaction Score Decline Detected',
            'Communication Frequency Drop Alert',
            'Service Level Enhancement Opportunity',
            'Relationship Strengthening Initiative Required',
            'Proactive Retention Strategy Activation'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getClientAttritionDescription(client) {
        const descriptions = [
            `AI/ML analysis indicates ${client.fullName} shows patterns consistent with potential attrition risk, requiring immediate attention and intervention.`,
            `Predictive modeling suggests ${client.firstName} may be at risk for account closure based on engagement patterns and satisfaction indicators.`,
            `Client behavior analytics show ${client.firstName} exhibits warning signs that correlate with potential relationship termination.`,
            `Attrition prediction model flags ${client.firstName} as requiring proactive retention efforts to maintain the advisory relationship.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getClientAttritionAction() {
        const actions = [
            'Implement immediate client retention strategy',
            'Schedule urgent relationship review meeting',
            'Enhance service level and communication frequency',
            'Address satisfaction concerns proactively',
            'Deploy personalized retention intervention plan'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    getCorporateActionTitle(client) {
        const titles = [
            'Dividend Reinvestment Election Required',
            'Stock Split Adjustment Impact Analysis',
            'Merger & Acquisition Decision Point',
            'Rights Offering Participation Evaluation',
            'Spin-off Distribution Strategy Review',
            'Corporate Restructuring Impact Assessment',
            'Special Dividend Tax Implication Review'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    getCorporateActionDescription(client) {
        const descriptions = [
            `Corporate actions affecting ${client.fullName}'s holdings require strategic decisions to optimize outcomes and maintain portfolio objectives.`,
            `Recent corporate announcements impact ${client.firstName}'s positions, creating opportunities for strategic decision-making and optimization.`,
            `Corporate action notifications indicate ${client.firstName} must make elections that could significantly impact portfolio performance.`,
            `Upcoming corporate events require ${client.firstName} to evaluate options and make strategic decisions for optimal portfolio outcomes.`
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    getCorporateActionAction() {
        const actions = [
            'Review corporate action implications and options',
            'Make strategic elections for optimal outcomes',
            'Analyze tax implications of corporate actions',
            'Coordinate with tax advisor on election decisions',
            'Schedule corporate action strategy consultation'
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    bindEvents() {
        // Navigation events
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchView(item.dataset.view);
            });
        });

        // Wealth segment filters
        document.querySelectorAll('.wealth-filter').forEach(item => {
            item.addEventListener('click', () => {
                this.currentWealthFilter = item.dataset.segment;
                this.updateFilters();
                this.renderCurrentView();
            });
        });

        // Search and filters
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderCurrentView();
        });

        document.getElementById('priorityFilter').addEventListener('change', (e) => {
            this.currentPriorityFilter = e.target.value;
            this.renderCurrentView();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentStatusFilter = e.target.value;
            this.renderCurrentView();
        });

        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('pushToSalesforce').addEventListener('click', () => {
            this.pushToSalesforce();
        });

        document.getElementById('pushToRedtail').addEventListener('click', () => {
            this.pushToRedtail();
        });

        document.getElementById('pushToJump').addEventListener('click', () => {
            this.pushToJump();
        });

        document.getElementById('scheduleMeeting').addEventListener('click', () => {
            this.scheduleMeeting();
        });

        document.getElementById('callClient').addEventListener('click', () => {
            this.callClient();
        });

        document.getElementById('emailClient').addEventListener('click', () => {
            this.emailClient();
        });

        document.getElementById('chatClient').addEventListener('click', () => {
            this.chatClient();
        });
    }

    switchView(viewName) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
        
        // Hide all views
        document.querySelectorAll('[id$="View"]').forEach(view => view.classList.add('hidden'));
        
        // Show selected view
        document.getElementById(`${viewName}View`).classList.remove('hidden');
        
        this.currentView = viewName;
        document.getElementById('pageTitle').textContent = this.getPageTitle(viewName);
        
        this.renderCurrentView();
    }

    getPageTitle(viewName) {
        const titles = {
            dashboard: 'Dashboard',
            insights: 'All Insights',
            clients: 'Client List',
            categories: 'Insight Categories',
            reports: 'Analytics & Reports'
        };
        return titles[viewName] || 'Insights Management';
    }

    renderCurrentView() {
        switch (this.currentView) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'insights':
                this.renderInsights();
                break;
            case 'clients':
                this.renderClients();
                break;
            case 'categories':
                this.renderCategories();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    renderDashboard() {
        this.renderRecentInsights();
    }

    renderRecentInsights() {
        const filteredInsights = this.getFilteredInsights()
            .filter(insight => insight.priority === 'high')
            .slice(0, 5);

        const container = document.getElementById('recentInsights');
        container.innerHTML = filteredInsights.map(insight => this.createInsightCard(insight, true)).join('');
        
        // Bind click events
        container.querySelectorAll('.insight-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openInsightModal(card.dataset.insightId);
            });
        });
    }

    renderInsights() {
        this.renderCategoryFilters();
        
        const filteredInsights = this.getFilteredInsights();
        const container = document.getElementById('insightsGrid');
        
        container.innerHTML = filteredInsights.map(insight => this.createInsightCard(insight)).join('');
        
        // Bind click events
        container.querySelectorAll('.insight-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openInsightModal(card.dataset.insightId);
            });
        });
    }

    renderCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        const allFilter = `
            <button class="category-filter px-4 py-2 rounded-full text-sm font-medium transition-all ${this.currentCategoryFilter === 'all' ? 'active' : 'bg-white text-slate-600 hover:bg-slate-100'}" data-category="all">
                All Categories
            </button>
        `;
        
        const categoryFilters = this.categories.map(category => `
            <button class="category-filter px-4 py-2 rounded-full text-sm font-medium transition-all ${this.currentCategoryFilter === category.id ? 'active' : 'bg-white text-slate-600 hover:bg-slate-100'}" data-category="${category.id}">
                <i class="${category.icon} mr-2"></i>${category.name}
            </button>
        `).join('');
        
        container.innerHTML = allFilter + categoryFilters;
        
        // Bind category filter events
        container.querySelectorAll('.category-filter').forEach(filter => {
            filter.addEventListener('click', () => {
                this.currentCategoryFilter = filter.dataset.category;
                this.renderCategoryFilters();
                this.renderInsights();
            });
        });
    }

    renderClients() {
        const filteredClients = this.getFilteredClients();
        const container = document.getElementById('clientsTable');
        
        container.innerHTML = `
            <table class="min-w-full">
                <thead class="bg-slate-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Segment</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">AUM</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Insights</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Contact</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-200">
                    ${filteredClients.map(client => this.createClientRow(client)).join('')}
                </tbody>
            </table>
        `;
    }

    renderCategories() {
        const container = document.getElementById('categoriesGrid');
        container.innerHTML = this.categories.map(category => this.createCategoryCard(category)).join('');
    }

    renderReports() {
        setTimeout(() => {
            this.initializeCharts();
            this.renderAdditionalAnalytics();
        }, 200);
    }

    getFilteredInsights() {
        return this.insights.filter(insight => {
            // Wealth segment filter
            if (this.currentWealthFilter !== 'all' && insight.wealthSegment !== this.currentWealthFilter) {
                return false;
            }
            
            // Category filter
            if (this.currentCategoryFilter !== 'all' && insight.categoryId !== this.currentCategoryFilter) {
                return false;
            }
            
            // Priority filter
            if (this.currentPriorityFilter !== 'all' && insight.priority !== this.currentPriorityFilter) {
                return false;
            }
            
            // Status filter
            if (this.currentStatusFilter !== 'all' && insight.status !== this.currentStatusFilter) {
                return false;
            }
            
            // Search filter
            if (this.searchQuery && 
                !insight.clientName.toLowerCase().includes(this.searchQuery) &&
                !insight.title.toLowerCase().includes(this.searchQuery) &&
                !insight.categoryName.toLowerCase().includes(this.searchQuery)) {
                return false;
            }
            
            return true;
        });
    }

    getFilteredClients() {
        return this.clients.filter(client => {
            // Wealth segment filter
            if (this.currentWealthFilter !== 'all' && client.wealthSegment !== this.currentWealthFilter) {
                return false;
            }
            
            // Search filter
            if (this.searchQuery && 
                !client.fullName.toLowerCase().includes(this.searchQuery) &&
                !client.company.toLowerCase().includes(this.searchQuery) &&
                !client.email.toLowerCase().includes(this.searchQuery)) {
                return false;
            }
            
            return true;
        });
    }

    createInsightCard(insight, compact = false) {
        const client = this.clients.find(c => c.id === insight.clientId);
        const category = this.categories.find(c => c.id === insight.categoryId);
        
        const priorityColors = {
            high: 'bg-red-100 text-red-800',
            medium: 'bg-yellow-100 text-yellow-800',
            low: 'bg-green-100 text-green-800'
        };
        
        const statusColors = {
            active: 'bg-blue-100 text-blue-800',
            logged: 'bg-green-100 text-green-800',
            dismissed: 'bg-gray-100 text-gray-800'
        };

        const wealthBadgeClass = `wealth-badge ${insight.wealthSegment}`;
        
        return `
            <div class="insight-card priority-${insight.priority} bg-white rounded-xl shadow-lg p-6 cursor-pointer fade-in" data-insight-id="${insight.id}">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: ${category?.color}20;">
                            <i class="${category?.icon} text-lg" style="color: ${category?.color};"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-slate-800 ${compact ? 'text-sm' : 'text-base'}">${insight.title}</h4>
                            <p class="text-slate-600 text-sm">${insight.clientName}</p>
                        </div>
                    </div>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${priorityColors[insight.priority]}">
                        ${insight.priority.toUpperCase()}
                    </span>
                </div>
                
                ${!compact ? `
                <p class="text-slate-600 text-sm mb-4 line-clamp-2">${insight.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="insight-tag px-2 py-1 rounded text-xs font-medium">${category?.name}</span>
                    <span class="${wealthBadgeClass} text-white px-2 py-1 rounded text-xs font-medium">${this.getWealthSegmentLabel(insight.wealthSegment)}</span>
                    <span class="px-2 py-1 rounded text-xs font-medium ${statusColors[insight.status]}">${insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}</span>
                </div>
                ` : ''}
                
                <div class="flex justify-between items-center text-sm text-slate-500">
                    <div class="flex items-center space-x-4">
                        <span><i class="fas fa-calendar-alt mr-1"></i>${this.formatDate(insight.createdDate)}</span>
                        <span><i class="fas fa-dollar-sign mr-1"></i>${insight.potentialValue?.toLocaleString()}</span>
                    </div>
                    <span class="text-xs">Expires: ${this.formatDate(insight.expiryDate)}</span>
                </div>
            </div>
        `;
    }

    createClientRow(client) {
        const clientInsights = this.insights.filter(i => i.clientId === client.id);
        const highPriorityCount = clientInsights.filter(i => i.priority === 'high').length;
        
        return `
            <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img class="h-10 w-10 rounded-full" src="https://ui-avatars.com/api/?name=${encodeURIComponent(client.fullName)}&background=667eea&color=fff&size=40&rounded=true" alt="">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-slate-900">${client.fullName}</div>
                            <div class="text-sm text-slate-500">${client.email}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="wealth-badge ${client.wealthSegment} text-white px-2 py-1 rounded-full text-xs font-medium">
                        ${this.getWealthSegmentLabel(client.wealthSegment)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    $${client.aum.toLocaleString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-slate-900">${clientInsights.length}</span>
                        ${highPriorityCount > 0 ? `<span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">${highPriorityCount} High</span>` : ''}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    ${this.formatDate(client.lastContact)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-primary hover:text-blue-700 mr-3" onclick="app.viewClientInsights('${client.id}')">
                        View Insights
                    </button>
                    <button class="text-slate-600 hover:text-slate-800" onclick="app.contactClient('${client.id}')">
                        Contact
                    </button>
                </td>
            </tr>
        `;
    }

    createCategoryCard(category) {
        const categoryInsights = this.insights.filter(i => i.categoryId === category.id);
        const highPriorityCount = categoryInsights.filter(i => i.priority === 'high').length;
        
        return `
            <div class="glass-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onclick="app.filterByCategory('${category.id}')">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background-color: ${category.color}20;">
                        <i class="${category.icon} text-xl" style="color: ${category.color};"></i>
                    </div>
                    <span class="text-2xl font-bold text-slate-800">${categoryInsights.length}</span>
                </div>
                <h3 class="text-lg font-semibold text-slate-800 mb-2">${category.name}</h3>
                <div class="flex justify-between items-center text-sm text-slate-600">
                    <span>Total Insights</span>
                    ${highPriorityCount > 0 ? `<span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">${highPriorityCount} High Priority</span>` : ''}
                </div>
            </div>
        `;
    }

    getWealthSegmentLabel(segment) {
        const labels = {
            uhnw: 'UHNW',
            hnw: 'HNW',
            affluent: 'Affluent',
            'mass-affluent': 'Mass Affluent',
            emerging: 'Emerging'
        };
        return labels[segment] || segment;
    }

    formatDate(date) {
        if (typeof date === 'string') date = new Date(date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    updateCurrentDate() {
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateFilters() {
        document.querySelectorAll('.wealth-filter').forEach(filter => {
            filter.classList.toggle('bg-slate-600', filter.dataset.segment === this.currentWealthFilter);
        });
    }

    openInsightModal(insightId) {
        this.selectedInsight = this.insights.find(i => i.id === insightId);
        if (!this.selectedInsight) return;

        const client = this.clients.find(c => c.id === this.selectedInsight.clientId);
        const category = this.categories.find(c => c.id === this.selectedInsight.categoryId);

        document.getElementById('modalContent').innerHTML = `
            <div class="space-y-6">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="text-lg font-semibold text-slate-800 flex-1">${this.selectedInsight.title}</h4>
                        <div class="flex items-center space-x-2 ml-4">
                            <button id="thumbsUpBtn" class="p-2 rounded-full hover:bg-green-100 transition-colors" title="Mark as useful">
                                <i class="fas fa-thumbs-up text-lg text-gray-400 hover:text-green-600"></i>
                            </button>
                            <button id="thumbsDownBtn" class="p-2 rounded-full hover:bg-red-100 transition-colors" title="Mark as not useful">
                                <i class="fas fa-thumbs-down text-lg text-gray-400 hover:text-red-600"></i>
                            </button>
                            <button id="dismissInsight" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-2">
                                <i class="fas fa-trash mr-2"></i>Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="insight-tag px-3 py-1 rounded-full text-sm">${category?.name}</span>
                        <span class="wealth-badge ${this.selectedInsight.wealthSegment} text-white px-3 py-1 rounded-full text-sm">
                            ${this.getWealthSegmentLabel(this.selectedInsight.wealthSegment)}
                        </span>
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${this.selectedInsight.priority === 'high' ? 'bg-red-100 text-red-800' : this.selectedInsight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                            ${this.selectedInsight.priority.toUpperCase()} Priority
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <h5 class="font-semibold text-slate-700 mb-2">Client Information</h5>
                        <div class="space-y-2 text-sm">
                            <div><span class="font-medium">Name:</span> ${client?.fullName}</div>
                            <div><span class="font-medium">Email:</span> ${client?.email}</div>
                            <div><span class="font-medium">AUM:</span> $${client?.aum.toLocaleString()}</div>
                            <div><span class="font-medium">Risk Profile:</span> ${client?.riskProfile}</div>
                        </div>
                    </div>
                    <div>
                        <h5 class="font-semibold text-slate-700 mb-2">Insight Details</h5>
                        <div class="space-y-2 text-sm">
                            <div><span class="font-medium">Created:</span> ${this.formatDate(this.selectedInsight.createdDate)}</div>
                            <div><span class="font-medium">Expires:</span> ${this.formatDate(this.selectedInsight.expiryDate)}</div>
                            <div><span class="font-medium">Potential Value:</span> $${this.selectedInsight.potentialValue?.toLocaleString()}</div>
                            <div><span class="font-medium">Status:</span> ${this.selectedInsight.status.charAt(0).toUpperCase() + this.selectedInsight.status.slice(1)}</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h5 class="font-semibold text-slate-700 mb-2">Description</h5>
                    <p class="text-slate-600">${this.selectedInsight.description}</p>
                </div>

                <div>
                    <h5 class="font-semibold text-slate-700 mb-2">Recommended Action</h5>
                    <p class="text-slate-600">${this.selectedInsight.actionRequired}</p>
                </div>
            </div>
        `;

        document.getElementById('insightModal').classList.remove('hidden');

        // Bind thumbs up/down and delete events
        document.getElementById('thumbsUpBtn').addEventListener('click', () => {
            this.rateInsight('positive');
        });

        document.getElementById('thumbsDownBtn').addEventListener('click', () => {
            this.rateInsight('negative');
        });

        document.getElementById('dismissInsight').addEventListener('click', () => {
            this.dismissInsight();
        });
    }

    closeModal() {
        document.getElementById('insightModal').classList.add('hidden');
        this.selectedInsight = null;
    }

    async pushToSalesforce() {
        if (!this.selectedInsight) return;

        this.showLoading(true);
        
        try {
            await axios.post('/api/insights/log-to-crm', {
                insightId: this.selectedInsight.id,
                action: 'logged',
                platform: 'salesforce'
            });

            // Update insight status
            this.selectedInsight.status = 'logged';
            
            // Show success message
            this.showNotification('Insight successfully pushed to Salesforce', 'success');
            
            this.closeModal();
            this.renderCurrentView();
        } catch (error) {
            console.error('Failed to push to Salesforce:', error);
            this.showNotification('Failed to push insight to Salesforce', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async pushToRedtail() {
        if (!this.selectedInsight) return;

        this.showLoading(true);
        
        try {
            await axios.post('/api/insights/log-to-crm', {
                insightId: this.selectedInsight.id,
                action: 'logged',
                platform: 'redtail'
            });

            // Update insight status
            this.selectedInsight.status = 'logged';
            
            // Show success message
            this.showNotification('Insight successfully pushed to Redtail CRM', 'success');
            
            this.closeModal();
            this.renderCurrentView();
        } catch (error) {
            console.error('Failed to push to Redtail:', error);
            this.showNotification('Failed to push insight to Redtail CRM', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async pushToJump() {
        if (!this.selectedInsight) return;

        this.showLoading(true);
        
        try {
            await axios.post('/api/insights/log-to-crm', {
                insightId: this.selectedInsight.id,
                action: 'logged',
                platform: 'jump'
            });

            // Update insight status
            this.selectedInsight.status = 'logged';
            
            // Show success message
            this.showNotification('Insight successfully pushed to JUMP', 'success');
            
            this.closeModal();
            this.renderCurrentView();
        } catch (error) {
            console.error('Failed to push to JUMP:', error);
            this.showNotification('Failed to push insight to JUMP', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    scheduleMeeting() {
        if (!this.selectedInsight) return;
        
        const client = this.clients.find(c => c.id === this.selectedInsight.clientId);
        this.showNotification(`Opening Microsoft Meeting Scheduler for ${client?.fullName}`, 'info');
        this.closeModal();
    }

    callClient() {
        if (!this.selectedInsight) return;
        
        const client = this.clients.find(c => c.id === this.selectedInsight.clientId);
        this.showNotification(`Initiating Microsoft Teams call with ${client?.fullName}`, 'info');
        this.closeModal();
    }

    emailClient() {
        if (!this.selectedInsight) return;
        
        const client = this.clients.find(c => c.id === this.selectedInsight.clientId);
        this.showNotification(`Opening Microsoft Outlook to email ${client?.fullName}`, 'info');
        this.closeModal();
    }

    chatClient() {
        if (!this.selectedInsight) return;
        
        const client = this.clients.find(c => c.id === this.selectedInsight.clientId);
        this.showNotification(`Starting Microsoft Teams chat with ${client?.fullName}`, 'info');
        this.closeModal();
    }

    async rateInsight(rating) {
        if (!this.selectedInsight) return;

        try {
            await axios.post('/api/insights/rate', {
                insightId: this.selectedInsight.id,
                rating: rating,
                timestamp: new Date().toISOString()
            });

            // Update the UI to show the rating
            const thumbsUpBtn = document.getElementById('thumbsUpBtn');
            const thumbsDownBtn = document.getElementById('thumbsDownBtn');
            
            if (rating === 'positive') {
                thumbsUpBtn.innerHTML = '<i class="fas fa-thumbs-up text-lg text-green-600"></i>';
                thumbsDownBtn.innerHTML = '<i class="fas fa-thumbs-down text-lg text-gray-400"></i>';
                this.showNotification('Insight marked as useful - thank you for your feedback!', 'success');
            } else {
                thumbsUpBtn.innerHTML = '<i class="fas fa-thumbs-up text-lg text-gray-400"></i>';
                thumbsDownBtn.innerHTML = '<i class="fas fa-thumbs-down text-lg text-red-600"></i>';
                this.showNotification('Insight marked as not useful - we will improve future recommendations', 'info');
            }

            // Store rating locally
            this.selectedInsight.userRating = rating;
            this.selectedInsight.ratedAt = new Date();

        } catch (error) {
            console.error('Failed to rate insight:', error);
            this.showNotification('Failed to save rating', 'error');
        }
    }

    async dismissInsight() {
        if (!this.selectedInsight) return;

        this.showLoading(true);
        
        try {
            await axios.post('/api/insights/dismiss', {
                insightId: this.selectedInsight.id,
                action: 'dismissed'
            });

            // Update insight status
            this.selectedInsight.status = 'dismissed';
            
            // Show success message
            this.showNotification('Insight dismissed and marked as not useful', 'success');
            
            this.closeModal();
            this.renderCurrentView();
        } catch (error) {
            console.error('Failed to dismiss insight:', error);
            this.showNotification('Failed to dismiss insight', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    filterByCategory(categoryId) {
        this.currentCategoryFilter = categoryId;
        this.switchView('insights');
    }

    viewClientInsights(clientId) {
        this.searchQuery = '';
        this.currentCategoryFilter = 'all';
        
        // Set search to client name
        const client = this.clients.find(c => c.id === clientId);
        if (client) {
            document.getElementById('searchInput').value = client.fullName;
            this.searchQuery = client.fullName.toLowerCase();
        }
        
        this.switchView('insights');
    }

    contactClient(clientId) {
        const client = this.clients.find(c => c.id === clientId);
        if (client) {
            this.showNotification(`Initiating contact with ${client.fullName}`, 'info');
        }
    }

    async refreshData() {
        this.showLoading(true);
        await this.initializeData();
        this.renderCurrentView();
        this.showLoading(false);
        this.showNotification('Data refreshed successfully', 'success');
    }

    initializeCharts() {
        // Category distribution chart
        const categoryCtx = document.getElementById('categoryChart')?.getContext('2d');
        if (categoryCtx) {
            const categoryData = this.categories.map(category => ({
                label: category.name,
                count: this.insights.filter(i => i.categoryId === category.id).length,
                color: category.color
            })).sort((a, b) => b.count - a.count).slice(0, 10);

            new Chart(categoryCtx, {
                type: 'bar',
                data: {
                    labels: categoryData.map(d => d.label),
                    datasets: [{
                        label: 'Number of Insights',
                        data: categoryData.map(d => d.count),
                        backgroundColor: categoryData.map(d => d.color + '40'),
                        borderColor: categoryData.map(d => d.color),
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }

        // Wealth segment distribution chart
        const segmentCtx = document.getElementById('segmentChart')?.getContext('2d');
        if (segmentCtx) {
            const segmentData = ['uhnw', 'hnw', 'affluent', 'mass-affluent', 'emerging'].map(segment => ({
                label: this.getWealthSegmentLabel(segment),
                count: this.clients.filter(c => c.wealthSegment === segment).length
            }));

            new Chart(segmentCtx, {
                type: 'doughnut',
                data: {
                    labels: segmentData.map(d => d.label),
                    datasets: [{
                        data: segmentData.map(d => d.count),
                        backgroundColor: [
                            '#ffd89b',
                            '#667eea',
                            '#f093fb',
                            '#4facfe',
                            '#43e97b'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
    }

    renderAdditionalAnalytics() {
        // Priority Distribution
        const priorityContainer = document.getElementById('priorityStats');
        const priorityStats = {
            high: this.insights.filter(i => i.priority === 'high').length,
            medium: this.insights.filter(i => i.priority === 'medium').length,
            low: this.insights.filter(i => i.priority === 'low').length
        };

        priorityContainer.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600">High Priority</span>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span class="font-bold text-slate-800">${priorityStats.high}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600">Medium Priority</span>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span class="font-bold text-slate-800">${priorityStats.medium}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600">Low Priority</span>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="font-bold text-slate-800">${priorityStats.low}</span>
                </div>
            </div>
        `;

        // Status Overview
        const statusContainer = document.getElementById('statusStats');
        const statusStats = {
            active: this.insights.filter(i => i.status === 'active').length,
            logged: this.insights.filter(i => i.status === 'logged').length,
            dismissed: this.insights.filter(i => i.status === 'dismissed').length
        };

        statusContainer.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600">Active</span>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span class="font-bold text-slate-800">${statusStats.active}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600">Logged to CRM</span>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="font-bold text-slate-800">${statusStats.logged}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600">Dismissed</span>
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span class="font-bold text-slate-800">${statusStats.dismissed}</span>
                </div>
            </div>
        `;

        // Recent Activity
        const activityContainer = document.getElementById('activityStats');
        const totalValue = this.insights.reduce((sum, insight) => sum + (insight.potentialValue || 0), 0);
        const avgValue = totalValue / this.insights.length;
        const topCategories = this.categories
            .map(cat => ({
                name: cat.name,
                count: this.insights.filter(i => i.categoryId === cat.id).length
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        activityContainer.innerHTML = `
            <div class="text-center">
                <div class="text-2xl font-bold text-green-600">$${totalValue.toLocaleString()}</div>
                <div class="text-xs text-slate-600">Total Potential Value</div>
            </div>
            <div class="text-center">
                <div class="text-lg font-bold text-blue-600">$${Math.round(avgValue).toLocaleString()}</div>
                <div class="text-xs text-slate-600">Average Insight Value</div>
            </div>
            <div class="space-y-1">
                <div class="text-xs font-semibold text-slate-700">Top Categories:</div>
                ${topCategories.map(cat => `
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-600">${cat.name}</span>
                        <span class="font-medium">${cat.count}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new InsightsManagementApp();
});