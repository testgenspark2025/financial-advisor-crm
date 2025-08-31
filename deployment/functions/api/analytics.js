// Cloudflare Pages Function for /api/analytics endpoint
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

  // Generate analytics data
  const analytics = {
    totalInsights: 1347,
    activeInsights: 892,
    completedInsights: 455,
    highPriorityInsights: 234,
    clientSegmentBreakdown: {
      'UHNW': 45,
      'HNW': 78,
      'Affluent': 62,
      'Mass Affluent': 89,
      'Emerging Wealth': 76
    },
    categoryBreakdown: {
      'Tax Optimization': 89,
      'Investment Strategy': 78,
      'Retirement Planning': 67,
      'Risk Management': 56,
      'Estate Planning': 45,
      'Portfolio Rebalancing': 34,
      'Market Opportunity': 23,
      'Other': 255
    },
    monthlyTrends: [
      { month: 'Jan', insights: 145, completed: 89 },
      { month: 'Feb', insights: 167, completed: 103 },
      { month: 'Mar', insights: 189, completed: 124 },
      { month: 'Apr', insights: 156, completed: 98 },
      { month: 'May', insights: 178, completed: 112 },
      { month: 'Jun', insights: 203, completed: 134 }
    ],
    averageResolutionTime: 4.2,
    clientSatisfactionScore: 4.6,
    totalAumImpacted: 2450000000,
    estimatedValueGenerated: 12750000
  };

  return new Response(JSON.stringify(analytics), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}