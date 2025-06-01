import { connectToDB } from '@/lib/db';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectToDB();
    const services = await Service.find().sort({ createdAt: -1 });
    return Response.json({ services });
  } catch (e) {
    // fallback mock data
    const services = [
      { id: 1, name: 'KYC Verification', status: 'Active' },
      { id: 2, name: 'Document Upload', status: 'Pending' },
      { id: 3, name: 'Blockchain Sync', status: 'Active' },
    ];
    return Response.json({ services });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { name } = await req.json();
    const newService = await Service.create({ name });
    const services = await Service.find().sort({ createdAt: -1 });
    return Response.json({ services });
  } catch (e) {
    // fallback mock
    const { name } = await req.json();
    const services = [
      { id: 1, name: 'KYC Verification', status: 'Active' },
      { id: 2, name: 'Document Upload', status: 'Pending' },
      { id: 3, name: 'Blockchain Sync', status: 'Active' },
      { id: 4, name, status: 'Pending' },
    ];
    return Response.json({ services });
  }
} 