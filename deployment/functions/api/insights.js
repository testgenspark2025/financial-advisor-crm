// Cloudflare Pages Function for /api/insights endpoint
export async function onRequest(context) {
  const { request, env } = context;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle POST requests for rating insights
  if (request.method === 'POST') {
    const url = new URL(request.url);
    if (url.pathname.includes('/rate')) {
      const body = await request.json();
      // In a real app, you'd save this to a database
      return new Response(JSON.stringify({ success: true, message: 'Rating saved' }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }

  // Generate sample insights
  const insightCategories = [
    'Tax Optimization', 'Estate Planning', 'Investment Strategy', 'Retirement Planning',
    'Risk Management', 'Cash Flow Analysis', 'Portfolio Rebalancing', 'Market Opportunity',
    'Compliance Alert', 'Client Life Event', 'Fee Structure Review', 'Asset Allocation',
    'Insurance Review', 'Education Funding', 'Charitable Giving', 'Business Succession',
    'Credit Management', 'Real Estate Strategy', 'Alternative Investments', 'Behavioral Finance',
    'Goal Tracking', 'Performance Review', 'Benchmarking', 'Due Diligence',
    'Regulatory Update', 'Market Commentary', 'Economic Outlook', 'Sector Analysis',
    'ESG Investing', 'Technology Integration', 'Client Communication', 'Referral Opportunity',
    'Cross-Selling Opportunity', 'Relationship Management', 'Service Enhancement'
  ];

  const insights = [];
  
  for (let i = 0; i < 1000; i++) {
    const category = insightCategories[Math.floor(Math.random() * insightCategories.length)];
    const clientId = Math.floor(Math.random() * 250) + 1;
    
    insights.push({
      id: i + 1,
      clientId: clientId,
      category: category,
      title: `${category} Opportunity for Client ${clientId}`,
      description: `Automated insight suggesting ${category.toLowerCase()} review and optimization.`,
      priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      status: 'Active',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      actionRequired: Math.random() > 0.5,
      estimatedValue: Math.floor(Math.random() * 50000) + 1000,
      rating: null
    });
  }

  return new Response(JSON.stringify({ insights }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}