const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Mock data for API endpoints
const mockEmails = [
    {
        id: 1,
        from: 'sarah.johnson@techcorp.com',
        fromName: 'Sarah Johnson',
        subject: 'Portfolio Review Meeting Request',
        snippet: 'Hi David, I would like to schedule our quarterly portfolio review...',
        body: 'Hi David,\n\nI hope this email finds you well. I would like to schedule our quarterly portfolio review meeting to discuss the recent performance and make any necessary adjustments to our investment strategy.\n\nI have some questions about the tech sector allocation and would like to explore some ESG investment options we discussed earlier.\n\nPlease let me know your availability for the coming weeks.\n\nBest regards,\nSarah Johnson',
        date: new Date('2024-08-30T10:30:00'),
        segment: 'high',
        priority: 'high',
        sentiment: 'neutral',
        unread: true,
        hasAttachment: false,
        folder: 'inbox'
    },
    {
        id: 2,
        from: 'michael.chen@startup.io',
        fromName: 'Michael Chen',
        subject: 'Investment Opportunity Discussion',
        snippet: 'Following up on our conversation about the tech startup investment...',
        body: 'Dear David,\n\nFollowing up on our conversation about the tech startup investment opportunities, I wanted to share some additional details about the Series B round we discussed.\n\nThe company has shown impressive growth metrics and aligns well with our ESG criteria. I believe this could be a great addition to our alternative investment portfolio.\n\nAttached is the executive summary and term sheet. Let\'s schedule a call to discuss the due diligence process.\n\nBest,\nMichael Chen',
        date: new Date('2024-08-30T09:15:00'),
        segment: 'ultra-high',
        priority: 'medium',
        sentiment: 'positive',
        unread: true,
        hasAttachment: true,
        folder: 'inbox'
    },
    {
        id: 3,
        from: 'lisa.martinez@healthcare.com',
        fromName: 'Lisa Martinez',
        subject: 'Retirement Planning Update',
        snippet: 'Thank you for the comprehensive retirement analysis. I have a few questions...',
        body: 'Hi David,\n\nThank you for the comprehensive retirement analysis you provided last week. The projections look very encouraging and I appreciate the detailed breakdown of different scenarios.\n\nI have a few questions about the Roth conversion strategy and would like to understand the tax implications better. Also, should we consider increasing our healthcare savings account contributions?\n\nLooking forward to our next meeting.\n\nWarm regards,\nLisa Martinez',
        date: new Date('2024-08-29T16:45:00'),
        segment: 'affluent',
        priority: 'low',
        sentiment: 'positive',
        unread: false,
        hasAttachment: false,
        folder: 'inbox'
    }
];

const mockClients = {
    'sarah.johnson@techcorp.com': {
        name: 'Sarah Johnson',
        age: 42,
        occupation: 'Chief Technology Officer',
        company: 'TechCorp Industries',
        clientSince: '2019-03-15',
        riskProfile: 'Moderate Aggressive',
        segment: 'High Net Worth',
        household: {
            spouse: 'David Johnson (Age 45, Software Engineer)',
            children: ['Emma (16)', 'Alex (14)']
        },
        accounts: [
            { type: 'Investment Account', balance: 1250000 },
            { type: '401(k) Rollover', balance: 850000 },
            { type: 'Roth IRA', balance: 125000 }
        ],
        goals: [
            { name: 'Retirement by 60', target: 5000000, current: 2225000, timeline: '2042-01-01' },
            { name: 'Children\'s College Fund', target: 400000, current: 180000, timeline: '2026-09-01' },
            { name: 'Vacation Home', target: 800000, current: 320000, timeline: '2025-06-01' }
        ],
        portfolio: {
            totalValue: 2225000,
            allocation: {
                stocks: 65,
                bonds: 25,
                alternatives: 10
            },
            performance: {
                ytd: 8.2,
                oneYear: 12.5,
                threeYear: 9.8,
                fiveYear: 11.2
            }
        },
        recentMeetings: [
            {
                date: '2024-07-15',
                type: 'Quarterly Review',
                sentiment: 'positive',
                summary: 'Discussed portfolio performance and tax-loss harvesting opportunities.',
                actionItems: ['Review international allocation', 'Consider Roth conversion']
            }
        ],
        recentEmails: [
            {
                date: '2024-08-25',
                subject: 'Market Volatility Update',
                summary: 'Provided reassurance about recent market fluctuations and strategy.'
            }
        ]
    },
    'michael.chen@startup.io': {
        name: 'Michael Chen',
        age: 38,
        occupation: 'Venture Capitalist',
        company: 'Innovation Capital',
        clientSince: '2020-11-08',
        riskProfile: 'Aggressive',
        segment: 'Ultra High Net Worth',
        household: {
            spouse: 'Amy Chen (Age 36, Investment Banker)',
            children: ['Sophie (8)', 'Lucas (5)']
        },
        accounts: [
            { type: 'Taxable Investment', balance: 5200000 },
            { type: 'Alternative Investments', balance: 3800000 },
            { type: 'Private Equity Fund', balance: 2100000 }
        ],
        goals: [
            { name: 'Financial Independence', target: 20000000, current: 11100000, timeline: '2035-01-01' },
            { name: 'Philanthropic Foundation', target: 5000000, current: 850000, timeline: '2030-01-01' },
            { name: 'Secondary Residence', target: 2000000, current: 1200000, timeline: '2025-12-01' }
        ],
        portfolio: {
            totalValue: 11100000,
            allocation: {
                stocks: 45,
                alternatives: 35,
                bonds: 20
            },
            performance: {
                ytd: 15.8,
                oneYear: 22.3,
                threeYear: 18.7,
                fiveYear: 16.9
            }
        },
        recentMeetings: [
            {
                date: '2024-08-10',
                type: 'Investment Strategy',
                sentiment: 'positive',
                summary: 'Explored new alternative investment opportunities in tech startups.',
                actionItems: ['Due diligence on Series B opportunity', 'Review ESG criteria']
            }
        ],
        recentEmails: [
            {
                date: '2024-08-22',
                subject: 'Startup Investment Pipeline',
                summary: 'Shared insights on emerging tech investment opportunities.'
            }
        ]
    },
    'lisa.martinez@healthcare.com': {
        name: 'Lisa Martinez',
        age: 48,
        occupation: 'Medical Director',
        company: 'Regional Healthcare Network',
        clientSince: '2021-06-10',
        riskProfile: 'Moderate',
        segment: 'Affluent',
        household: {
            spouse: 'Carlos Martinez (Age 50, Attorney)',
            children: ['Maria (20)', 'Jose (18)']
        },
        accounts: [
            { type: 'Investment Account', balance: 485000 },
            { type: '403(b) Plan', balance: 320000 },
            { type: 'HSA', balance: 45000 }
        ],
        goals: [
            { name: 'Retirement at 65', target: 2500000, current: 850000, timeline: '2041-01-01' },
            { name: 'Healthcare Reserve', target: 200000, current: 45000, timeline: '2030-01-01' }
        ],
        portfolio: {
            totalValue: 850000,
            allocation: {
                stocks: 55,
                bonds: 40,
                alternatives: 5
            },
            performance: {
                ytd: 6.8,
                oneYear: 9.2,
                threeYear: 7.5,
                fiveYear: 8.9
            }
        },
        recentMeetings: [
            {
                date: '2024-08-05',
                type: 'Retirement Planning',
                sentiment: 'positive',
                summary: 'Reviewed retirement projections and discussed Roth conversion strategies.',
                actionItems: ['Analyze Roth conversion timing', 'Increase HSA contributions']
            }
        ],
        recentEmails: [
            {
                date: '2024-08-20',
                subject: 'Healthcare Savings Strategy',
                summary: 'Discussed maximizing HSA benefits for retirement healthcare costs.'
            }
        ]
    }
};

// API Routes
app.get('/api/emails', (req, res) => {
    res.json(mockEmails);
});

app.get('/api/client/:email', (req, res) => {
    const email = req.params.email;
    const client = mockClients[email];
    
    if (client) {
        res.json(client);
    } else {
        res.status(404).json({ error: 'Client not found' });
    }
});

app.get('/api/email/:id', (req, res) => {
    const emailId = parseInt(req.params.id);
    const email = mockEmails.find(e => e.id === emailId);
    
    if (email) {
        res.json(email);
    } else {
        res.status(404).json({ error: 'Email not found' });
    }
});

// Mock endpoints for integrations
app.get('/meeting/:email', (req, res) => {
    res.json({ 
        message: `Opening meeting scheduler for ${req.params.email}`,
        redirectUrl: `https://calendly.com/advisor/meeting?client=${req.params.email}`
    });
});

app.get('/call/:email', (req, res) => {
    res.json({ 
        message: `Initiating call with ${req.params.email}`,
        action: 'call_initiated'
    });
});

app.get('/redtail/:email', (req, res) => {
    res.json({ 
        message: `Opening Redtail CRM for ${req.params.email}`,
        redirectUrl: `https://redtail.com/client/${req.params.email}`
    });
});

app.get('/jump/:email', (req, res) => {
    res.json({ 
        message: `Opening Jump Meeting Planner for ${req.params.email}`,
        redirectUrl: `https://jump.com/planner?client=${req.params.email}`
    });
});

app.get('/salesforce/:email', (req, res) => {
    res.json({ 
        message: `Opening Salesforce FSC for ${req.params.email}`,
        redirectUrl: `https://salesforce.com/fsc/client/${req.params.email}`
    });
});

app.get('/client360/:email', (req, res) => {
    const client = mockClients[req.params.email];
    if (client) {
        res.json({
            message: 'Client 360 view',
            client: client,
            additionalData: {
                riskAssessment: 'Detailed risk analysis available',
                performanceAnalysis: 'Full performance metrics and attribution',
                goalTracking: 'Comprehensive goal progress tracking'
            }
        });
    } else {
        res.status(404).json({ error: 'Client not found' });
    }
});

// Compose endpoints
app.get('/compose', (req, res) => {
    res.json({
        message: 'Compose interface opened',
        emailId: req.query.emailId || null,
        responseType: req.query.responseType || 'new'
    });
});

app.post('/api/send-email', (req, res) => {
    const { to, subject, body } = req.body;
    
    // Simulate sending email
    console.log('Email sent:', { to, subject, body });
    
    res.json({
        message: 'Email sent successfully',
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
});

app.post('/api/save-draft', (req, res) => {
    const { to, subject, body } = req.body;
    
    // Simulate saving draft
    console.log('Draft saved:', { to, subject, body });
    
    res.json({
        message: 'Draft saved successfully',
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
});

// Serve the main application
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
    res.status(404).json({ error: 'Not found' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Financial Advisor Outlook server running at http://0.0.0.0:${port}`);
    console.log('Available endpoints:');
    console.log('  GET  / - Main application');
    console.log('  GET  /api/emails - Get email list');
    console.log('  GET  /api/client/:email - Get client data');
    console.log('  GET  /api/email/:id - Get specific email');
    console.log('  POST /api/send-email - Send email');
    console.log('  POST /api/save-draft - Save draft');
});

module.exports = app;