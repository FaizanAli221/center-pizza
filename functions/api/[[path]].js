import menuData from '../data/menu.json';

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);
  const path = params.path ? params.path.join('/') : '';
  const method = request.method;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET /api/health
  if (path === 'health' || path === 'health/') {
    return new Response(
      JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
      { headers: corsHeaders }
    );
  }

  // GET /api/cities
  if (path === 'cities' || path === 'cities/') {
    return new Response(
      JSON.stringify({ cities: menuData.cities || [] }),
      { headers: corsHeaders }
    );
  }

  // GET /api/menu
  if (path === 'menu' || path === 'menu/') {
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    let items = menuData.items || [];

    if (category && category.toLowerCase() !== 'all') {
      items = items.filter(
        (i) => i.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }

    return new Response(
      JSON.stringify({ items, categories: menuData.categories }),
      { headers: corsHeaders }
    );
  }

  // POST /api/orders
  if (path === 'orders' || path === 'orders/') {
    if (method === 'POST') {
      try {
        const body = await request.json();
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
        const orderId = `CP-${Date.now().toString(36).toUpperCase()}-${rand}`;

        const order = {
          orderId,
          status: 'confirmed',
          orderType: body.orderType || 'delivery',
          city: body.city || 'Karachi',
          customer: body.customer || {},
          items: body.items || [],
          totalAmount: body.totalAmount || 0,
          notes: body.notes || null,
          estimated: { deliveryEtaMinutes: 35 },
          createdAt: new Date().toISOString(),
        };

        return new Response(
          JSON.stringify({ message: 'Order placed successfully.', order }),
          { status: 201, headers: corsHeaders }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: 'Bad Request', message: err.message }),
          { status: 400, headers: corsHeaders }
        );
      }
    }
  }

  // GET /api/orders/:id
  if (path.startsWith('orders/')) {
    const id = path.split('/')[1]?.toUpperCase() || 'UNKNOWN';
    return new Response(
      JSON.stringify({
        order: {
          orderId: id,
          status: 'preparing',
          orderType: 'delivery',
          city: 'Karachi',
          customer: { name: 'Guest Customer', phone: '0331-2130709', address: 'Delivery Address' },
          items: [{ id: 'pd-001', name: 'Double The Fun', price: 2099, quantity: 1 }],
          totalAmount: 2199,
          estimated: { deliveryEtaMinutes: 25 },
          createdAt: new Date().toISOString(),
        },
      }),
      { headers: corsHeaders }
    );
  }

  // Default API status
  return new Response(
    JSON.stringify({
      service: 'center-pizza-cf-functions',
      message: 'Center Pizza Cloudflare Pages Functions running.',
      endpoints: [
        'GET /api/health',
        'GET /api/menu',
        'GET /api/cities',
        'POST /api/orders',
        'GET /api/orders/:id',
      ],
    }),
    { headers: corsHeaders }
  );
}
