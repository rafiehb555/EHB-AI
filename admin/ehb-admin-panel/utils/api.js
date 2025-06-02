// Next.js API fetch helpers for admin dashboard

export async function fetchAdminDashboardData() {
  const res = await fetch('/api/admin/dashboard');
  if (!res.ok) throw new Error('Failed to fetch dashboard data');
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch('/api/admin/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
} 