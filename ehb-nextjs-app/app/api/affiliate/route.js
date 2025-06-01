import { connectToDB } from '@/lib/db';
import Affiliate from '@/models/Affiliate';
import Wallet from '@/models/Wallet';

const MOCK_USER_ID = '6657e1f1f1f1f1f1f1f1f1f1f'; // Replace with real user id in production

// Commission rates for different actions
const COMMISSION_RATES = {
  service_purchase: 0.10, // 10% commission on service purchases
  level_upgrade: 0.05,   // 5% commission on level upgrades
};

export async function GET() {
  try {
    await connectToDB();
    let affiliate = await Affiliate.findOne({ user: MOCK_USER_ID });
    if (!affiliate) {
      // Generate a unique referral code
      const referralCode = `EHB${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      affiliate = await Affiliate.create({
        user: MOCK_USER_ID,
        referralCode,
        referrals: [],
        totalEarnings: 0,
        pendingEarnings: 0,
        commissionHistory: []
      });
    }
    return Response.json({
      referralCode: affiliate.referralCode,
      referrals: affiliate.referrals,
      totalEarnings: affiliate.totalEarnings,
      pendingEarnings: affiliate.pendingEarnings,
      commissionHistory: affiliate.commissionHistory
    });
  } catch (e) {
    // fallback mock data
    return Response.json({
      referralCode: 'EHB123456',
      referrals: [
        { referredUser: 'user1', date: '2024-06-01', status: 'active' },
        { referredUser: 'user2', date: '2024-06-02', status: 'pending' }
      ],
      totalEarnings: 500,
      pendingEarnings: 100,
      commissionHistory: [
        { amount: 200, source: 'service_purchase', date: '2024-06-01', status: 'paid' },
        { amount: 300, source: 'level_upgrade', date: '2024-06-02', status: 'pending' }
      ]
    });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { action, data } = await req.json();
    
    if (action === 'add_referral') {
      const { referredUserId } = data;
      const affiliate = await Affiliate.findOne({ user: MOCK_USER_ID });
      
      if (!affiliate) {
        throw new Error('Affiliate data not found');
      }

      // Add new referral
      affiliate.referrals.unshift({
        referredUser: referredUserId,
        status: 'pending'
      });

      await affiliate.save();
      return Response.json({ success: true, referrals: affiliate.referrals });
    }
    
    if (action === 'calculate_commission') {
      const { source, amount, referredUserId } = data;
      const affiliate = await Affiliate.findOne({ user: MOCK_USER_ID });
      const wallet = await Wallet.findOne({ user: MOCK_USER_ID });
      
      if (!affiliate || !wallet) {
        throw new Error('User data not found');
      }

      const commissionRate = COMMISSION_RATES[source] || 0;
      const commissionAmount = amount * commissionRate;

      // Create commission record
      const commission = {
        amount: commissionAmount,
        source,
        status: 'pending'
      };

      // Update affiliate earnings
      affiliate.pendingEarnings += commissionAmount;
      affiliate.commissionHistory.unshift(commission);

      // Update wallet balance
      wallet.balance += commissionAmount;
      wallet.history.unshift({
        type: 'deposit',
        amount: commissionAmount,
        date: new Date()
      });

      // Save changes
      await Promise.all([
        affiliate.save(),
        wallet.save()
      ]);

      return Response.json({
        success: true,
        commission,
        pendingEarnings: affiliate.pendingEarnings
      });
    }

    return Response.json({ success: false, message: 'Invalid action' });
  } catch (e) {
    return Response.json({ 
      success: false, 
      message: 'Failed to process affiliate request' 
    });
  }
} 