const mockUser = {
  id: 1,
  name: 'EHB User',
  email: 'user@ehb.com',
  role: 'admin',
};

let isLoggedIn = false;

export async function POST(req) {
  const { email, password } = await req.json();
  if (email === 'user@ehb.com' && password === 'password') {
    isLoggedIn = true;
    return Response.json({ success: true, user: mockUser });
  }
  return Response.json({ success: false, error: 'Invalid credentials' });
}

export async function GET() {
  if (isLoggedIn) {
    return Response.json({ user: mockUser });
  }
  return Response.json({ user: null });
} 