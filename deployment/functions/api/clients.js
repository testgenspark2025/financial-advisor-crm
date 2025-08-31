// Cloudflare Pages Function for /api/clients endpoint
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

  // Generate sample clients (simplified version)
  const wealthSegments = [
    { name: 'UHNW', min: 10000000, label: 'Ultra High Net Worth ($10M+ AUM)' },
    { name: 'HNW', min: 1000000, max: 10000000, label: 'High Net Worth ($1-10M AUM)' },
    { name: 'Affluent', min: 500000, max: 1000000, label: 'Affluent ($500K-1M AUM)' },
    { name: 'Mass Affluent', min: 100000, max: 500000, label: 'Mass Affluent ($100K-500K AUM)' },
    { name: 'Emerging Wealth', min: 25000, max: 100000, label: 'Emerging Wealth ($25K-100K AUM)' }
  ];

  const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Ashley', 'James', 'Amanda'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const clients = [];
  
  for (let i = 0; i < 250; i++) {
    const segment = wealthSegments[Math.floor(Math.random() * wealthSegments.length)];
    const aum = segment.max 
      ? Math.floor(Math.random() * (segment.max - segment.min)) + segment.min
      : Math.floor(Math.random() * 40000000) + segment.min;
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    clients.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      aum: aum,
      segment: segment.name,
      segmentLabel: segment.label,
      lastContact: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      riskTolerance: ['Conservative', 'Moderate', 'Aggressive'][Math.floor(Math.random() * 3)],
      age: Math.floor(Math.random() * 50) + 30
    });
  }

  return new Response(JSON.stringify({ clients }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}