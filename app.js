// Financial Advisor Outlook Application
class FinancialAdvisorApp {
    constructor() {
        this.selectedEmail = null;
        this.currentFolder = 'inbox';
        this.currentSegment = 'all';
        this.mockEmails = [];
        this.mockClients = {};
        this.init();
    }

    init() {
        this.initMockData();
        this.bindEvents();
        this.loadEmails();
    }

    initMockData() {
        // Mock email data
        this.mockEmails = [
            {
                id: 1,
                from: 'sarah.johnson@techcorp.com',
                fromName: 'Sarah Johnson',
                subject: 'Portfolio Review Meeting Request',
                snippet: 'Hi David, I would like to schedule our quarterly portfolio review...',
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
                date: new Date('2024-08-29T16:45:00'),
                segment: 'affluent',
                priority: 'low',
                sentiment: 'positive',
                unread: false,
                hasAttachment: false,
                folder: 'inbox'
            },
            {
                id: 4,
                from: 'robert.williams@consulting.biz',
                fromName: 'Robert Williams',
                subject: 'Tax Optimization Strategy',
                snippet: 'Could we discuss the tax implications of the proposed investment strategy...',
                date: new Date('2024-08-29T14:20:00'),
                segment: 'mass-affluent',
                priority: 'medium',
                sentiment: 'neutral',
                unread: false,
                hasAttachment: true,
                folder: 'inbox'
            },
            {
                id: 5,
                from: 'jennifer.davis@realestate.net',
                fromName: 'Jennifer Davis',
                subject: 'Real Estate Investment Analysis',
                snippet: 'I received the market analysis report. The numbers look promising...',
                date: new Date('2024-08-28T11:30:00'),
                segment: 'emerging',
                priority: 'low',
                sentiment: 'positive',
                unread: false,
                hasAttachment: false,
                folder: 'inbox'
            }
        ];

        // Mock client data
        this.mockClients = {
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
            }
        };
    }

    bindEvents() {
        // Folder navigation
        document.querySelectorAll('.folder-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.folder-item').forEach(f => f.classList.remove('active'));
                item.classList.add('active');
                this.currentFolder = item.dataset.folder;
                this.loadEmails();
            });
        });

        // Segment filtering
        document.querySelectorAll('.segment-filter').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.segment-filter').forEach(f => f.classList.remove('active'));
                item.classList.add('active');
                this.currentSegment = item.dataset.segment;
                this.loadEmails();
            });
        });

        // Header buttons
        document.getElementById('newEmailBtn').addEventListener('click', () => this.openCompose());
        document.getElementById('replyBtn').addEventListener('click', () => this.replyToEmail());
        document.getElementById('meetingBtn').addEventListener('click', () => this.scheduleMeeting());
        document.getElementById('callBtn').addEventListener('click', () => this.initiateCall());

        // Modal events
        document.getElementById('closeCompose').addEventListener('click', () => this.closeCompose());
        document.getElementById('closeInsights').addEventListener('click', () => this.closeInsights());
        document.getElementById('sendBtn').addEventListener('click', () => this.sendEmail());
        document.getElementById('saveDraftBtn').addEventListener('click', () => this.saveDraft());

        // Compose modal input events
        document.getElementById('composeTo').addEventListener('input', (e) => {
            this.debounce(() => this.loadClientInsightsForCompose(e.target.value), 500)();
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    loadEmails() {
        const emailList = document.getElementById('emailList');
        let filteredEmails = this.mockEmails.filter(email => {
            if (this.currentFolder !== 'inbox' && email.folder !== this.currentFolder) return false;
            if (this.currentSegment !== 'all' && email.segment !== this.currentSegment) return false;
            return true;
        });

        emailList.innerHTML = filteredEmails.map(email => this.createEmailHTML(email)).join('');

        // Bind email click events
        emailList.querySelectorAll('.email-item').forEach(item => {
            item.addEventListener('click', () => {
                const emailId = parseInt(item.dataset.emailId);
                this.selectEmail(emailId);
            });
        });
    }

    createEmailHTML(email) {
        const sentimentIcon = {
            positive: '😊',
            neutral: '😐',
            negative: '😟'
        };

        const priorityColor = {
            high: 'text-red-600',
            medium: 'text-orange-600',
            low: 'text-green-600'
        };

        return `
            <div class="email-item border-b border-gray-100 p-4 cursor-pointer ${email.unread ? 'unread' : ''}" data-email-id="${email.id}">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <span class="font-medium ${email.unread ? 'text-gray-900' : 'text-gray-700'}">${email.fromName}</span>
                            <span class="text-xs ${priorityColor[email.priority]}">
                                <i class="fas fa-flag"></i>
                            </span>
                            <span class="text-xs">${sentimentIcon[email.sentiment]}</span>
                            ${email.hasAttachment ? '<i class="fas fa-paperclip text-xs text-gray-500"></i>' : ''}
                        </div>
                        <div class="text-sm ${email.unread ? 'font-medium text-gray-900' : 'text-gray-800'} mb-1">${email.subject}</div>
                        <div class="text-xs text-gray-600">${email.snippet}</div>
                    </div>
                    <div class="text-xs text-gray-500 ml-4">
                        ${this.formatDate(email.date)}
                    </div>
                </div>
            </div>
        `;
    }

    selectEmail(emailId) {
        // Remove previous selection
        document.querySelectorAll('.email-item').forEach(item => item.classList.remove('selected'));
        
        // Add selection to current email
        const emailElement = document.querySelector(`[data-email-id="${emailId}"]`);
        if (emailElement) {
            emailElement.classList.add('selected');
            emailElement.classList.remove('unread');
        }

        // Find and store selected email
        this.selectedEmail = this.mockEmails.find(email => email.id === emailId);
        if (this.selectedEmail) {
            this.selectedEmail.unread = false;
            this.loadClientInsights(this.selectedEmail.from);
        }
    }

    loadClientInsights(email) {
        const client = this.mockClients[email];
        const insightsPanel = document.getElementById('clientInsights');
        const insightsContent = document.getElementById('insightsContent');

        if (client) {
            insightsContent.innerHTML = this.createClientInsightsHTML(client);
            this.showInsights();
            this.initPortfolioChart(client.portfolio);
        } else {
            insightsContent.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-user-slash text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Client Not Found</h3>
                    <p class="text-gray-600">No client profile found for ${email}</p>
                    <p class="text-xs text-gray-500 mt-2">Try: sarah.johnson@techcorp.com or michael.chen@startup.io</p>
                </div>
            `;
            this.showInsights();
        }
    }

    createClientInsightsHTML(client) {
        return `
            <div class="space-y-6">
                <!-- Client Profile -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="flex justify-between items-start mb-3">
                        <h4 class="font-semibold text-blue-900">Client Profile</h4>
                        <button class="text-xs bg-blue-600 text-white px-2 py-1 rounded">View Full Client 360</button>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div><span class="font-medium">Name:</span> ${client.name}</div>
                        <div><span class="font-medium">Age:</span> ${client.age}</div>
                        <div><span class="font-medium">Occupation:</span> ${client.occupation}</div>
                        <div><span class="font-medium">Company:</span> ${client.company}</div>
                        <div><span class="font-medium">Client Since:</span> ${this.formatDate(new Date(client.clientSince))}</div>
                        <div><span class="font-medium">Risk Profile:</span> ${client.riskProfile}</div>
                        <div><span class="font-medium">Segment:</span> ${client.segment}</div>
                    </div>
                </div>

                <!-- Household Profile -->
                <div>
                    <h4 class="font-semibold mb-3">Household Profile</h4>
                    <div class="text-sm space-y-1">
                        <div><span class="font-medium">Spouse:</span> ${client.household.spouse}</div>
                        <div><span class="font-medium">Children:</span> ${client.household.children.join(', ')}</div>
                    </div>
                </div>

                <!-- Account Profile -->
                <div>
                    <h4 class="font-semibold mb-3">Account Profile</h4>
                    <div class="space-y-2">
                        ${client.accounts.map(account => `
                            <div class="flex justify-between text-sm">
                                <span>${account.type}</span>
                                <span class="font-medium">$${account.balance.toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Financial Goals -->
                <div>
                    <h4 class="font-semibold mb-3">Financial Goals</h4>
                    <div class="space-y-3">
                        ${client.goals.map(goal => {
                            const progress = (goal.current / goal.target * 100);
                            return `
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="font-medium">${goal.name}</span>
                                        <span>$${goal.current.toLocaleString()} / $${goal.target.toLocaleString()}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${progress}%"></div>
                                    </div>
                                    <div class="text-xs text-gray-600 mt-1">Target: ${this.formatDate(new Date(goal.timeline))}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Portfolio Summary -->
                <div>
                    <h4 class="font-semibold mb-3">Portfolio Summary</h4>
                    <div class="text-sm mb-3">
                        <div class="text-lg font-bold text-green-600">$${client.portfolio.totalValue.toLocaleString()}</div>
                        <div class="text-gray-600">Total Portfolio Value</div>
                    </div>
                    <canvas id="portfolioChart" width="300" height="200"></canvas>
                </div>

                <!-- Portfolio Performance -->
                <div>
                    <h4 class="font-semibold mb-3">Portfolio Performance</h4>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="text-center p-2 bg-gray-50 rounded">
                            <div class="font-bold text-green-600">${client.portfolio.performance.ytd}%</div>
                            <div class="text-gray-600">YTD</div>
                        </div>
                        <div class="text-center p-2 bg-gray-50 rounded">
                            <div class="font-bold text-green-600">${client.portfolio.performance.oneYear}%</div>
                            <div class="text-gray-600">1 Year</div>
                        </div>
                        <div class="text-center p-2 bg-gray-50 rounded">
                            <div class="font-bold text-green-600">${client.portfolio.performance.threeYear}%</div>
                            <div class="text-gray-600">3 Year</div>
                        </div>
                        <div class="text-center p-2 bg-gray-50 rounded">
                            <div class="font-bold text-green-600">${client.portfolio.performance.fiveYear}%</div>
                            <div class="text-gray-600">5 Year</div>
                        </div>
                    </div>
                </div>

                <!-- Recent Meetings -->
                <div>
                    <h4 class="font-semibold mb-3">Recent Meeting Summary</h4>
                    ${client.recentMeetings.map(meeting => `
                        <div class="border border-gray-200 p-3 rounded-lg">
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-medium text-sm">${meeting.type}</span>
                                <span class="text-xs text-gray-600">${this.formatDate(new Date(meeting.date))}</span>
                            </div>
                            <div class="text-sm text-gray-700 mb-2">${meeting.summary}</div>
                            <div class="text-xs">
                                <span class="font-medium">Action Items:</span>
                                <ul class="list-disc list-inside mt-1">
                                    ${meeting.actionItems.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Recent Email Summary -->
                <div>
                    <h4 class="font-semibold mb-3">Recent Email Summary</h4>
                    ${client.recentEmails.map(email => `
                        <div class="border border-gray-200 p-3 rounded-lg">
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-medium text-sm">${email.subject}</span>
                                <span class="text-xs text-gray-600">${this.formatDate(new Date(email.date))}</span>
                            </div>
                            <div class="text-sm text-gray-700">${email.summary}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Integration Buttons -->
                <div class="space-y-2">
                    <button class="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded text-sm">
                        <i class="fas fa-external-link-alt mr-2"></i>Open in Redtail CRM
                    </button>
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                        <i class="fas fa-calendar-plus mr-2"></i>Schedule Meeting (Jump)
                    </button>
                    <button class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-sm">
                        <i class="fas fa-cloud mr-2"></i>Open in Salesforce FSC
                    </button>
                </div>

                <div class="text-center pt-4">
                    <button class="text-blue-600 hover:text-blue-800 text-sm">
                        <i class="fas fa-expand-arrows-alt mr-1"></i>View All Insights
                    </button>
                </div>
            </div>
        `;
    }

    initPortfolioChart(portfolio) {
        setTimeout(() => {
            const ctx = document.getElementById('portfolioChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Stocks', 'Bonds', 'Alternatives'],
                        datasets: [{
                            data: [portfolio.allocation.stocks, portfolio.allocation.bonds, portfolio.allocation.alternatives],
                            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    fontSize: 10
                                }
                            }
                        }
                    }
                });
            }
        }, 100);
    }

    showInsights() {
        const panel = document.getElementById('clientInsights');
        panel.style.transform = 'translateX(0)';
    }

    closeInsights() {
        const panel = document.getElementById('clientInsights');
        panel.style.transform = 'translateX(100%)';
    }

    openCompose() {
        document.getElementById('composeModal').classList.remove('hidden');
        document.getElementById('composeTo').focus();
    }

    closeCompose() {
        document.getElementById('composeModal').classList.add('hidden');
        this.clearComposeForm();
    }

    clearComposeForm() {
        document.getElementById('composeTo').value = '';
        document.getElementById('composeSubject').value = '';
        document.getElementById('composeBody').value = '';
    }

    loadClientInsightsForCompose(email) {
        // This would typically load client insights in the compose modal
        console.log('Loading client insights for compose:', email);
    }

    replyToEmail() {
        if (this.selectedEmail) {
            this.openCompose();
            document.getElementById('composeTo').value = this.selectedEmail.from;
            document.getElementById('composeSubject').value = 'Re: ' + this.selectedEmail.subject;
        } else {
            alert('Please select an email to reply to.');
        }
    }

    scheduleMeeting() {
        if (this.selectedEmail) {
            alert(`Opening meeting scheduler for ${this.selectedEmail.fromName}`);
        } else {
            alert('Please select an email first.');
        }
    }

    initiateCall() {
        if (this.selectedEmail) {
            alert(`Initiating call with ${this.selectedEmail.fromName}`);
        } else {
            alert('Please select an email first.');
        }
    }

    sendEmail() {
        const to = document.getElementById('composeTo').value;
        const subject = document.getElementById('composeSubject').value;
        const body = document.getElementById('composeBody').value;

        if (!to || !subject || !body) {
            alert('Please fill in all fields.');
            return;
        }

        alert(`Email sent to ${to}!`);
        this.closeCompose();
    }

    saveDraft() {
        alert('Draft saved!');
    }

    formatDate(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new FinancialAdvisorApp();
});