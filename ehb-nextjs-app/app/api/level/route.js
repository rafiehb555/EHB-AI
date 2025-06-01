import { connectToDB } from '@/lib/db';
import SQLLevel from '@/models/SQLLevel';
import Wallet from '@/models/Wallet';

const MOCK_USER_ID = '6657e1f1f1f1f1f1f1f1f1f1f'; // Replace with real user id in production

// Calculate upgrade cost based on current level
const calculateUpgradeCost = (currentLevel) => {
  return Math.floor(1000 * Math.pow(1.5, currentLevel - 1));
};

export async function GET() {
  try {
    await connectToDB();
    let sqlLevel = await SQLLevel.findOne({ user: MOCK_USER_ID });
    if (!sqlLevel) {
      sqlLevel = await SQLLevel.create({ 
        user: MOCK_USER_ID,
        currentLevel: 1,
        progress: 0,
        upgradeHistory: []
      });
    }
    return Response.json({
      currentLevel: sqlLevel.currentLevel,
      progress: sqlLevel.progress,
      upgradeHistory: sqlLevel.upgradeHistory,
      nextLevelCost: calculateUpgradeCost(sqlLevel.currentLevel)
    });
  } catch (e) {
    // fallback mock data
    return Response.json({
      currentLevel: 1,
      progress: 45,
      upgradeHistory: [],
      nextLevelCost: 1000
    });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { action } = await req.json();
    
    if (action === 'upgrade') {
      const sqlLevel = await SQLLevel.findOne({ user: MOCK_USER_ID });
      const wallet = await Wallet.findOne({ user: MOCK_USER_ID });
      
      if (!sqlLevel || !wallet) {
        throw new Error('User data not found');
      }

      const upgradeCost = calculateUpgradeCost(sqlLevel.currentLevel);
      
      if (wallet.balance < upgradeCost) {
        return Response.json({ 
          success: false, 
          message: 'Insufficient balance for upgrade' 
        });
      }

      // Create upgrade record
      const upgradeRecord = {
        fromLevel: sqlLevel.currentLevel,
        toLevel: sqlLevel.currentLevel + 1,
        cost: upgradeCost,
        status: 'pending'
      };

      // Update wallet balance
      wallet.balance -= upgradeCost;
      wallet.history.unshift({
        type: 'withdraw',
        amount: upgradeCost,
        date: new Date()
      });

      // Update SQL level
      sqlLevel.currentLevel += 1;
      sqlLevel.progress = 0;
      sqlLevel.upgradeHistory.unshift(upgradeRecord);
      sqlLevel.lastUpdated = new Date();

      // Save changes
      await Promise.all([
        wallet.save(),
        sqlLevel.save()
      ]);

      return Response.json({
        success: true,
        currentLevel: sqlLevel.currentLevel,
        progress: sqlLevel.progress,
        upgradeHistory: sqlLevel.upgradeHistory,
        nextLevelCost: calculateUpgradeCost(sqlLevel.currentLevel)
      });
    }

    return Response.json({ success: false, message: 'Invalid action' });
  } catch (e) {
    return Response.json({ 
      success: false, 
      message: 'Failed to process upgrade request' 
    });
  }
} 