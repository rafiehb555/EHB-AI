import WalletCard from '../components/WalletCard';
import SQLLevelCard from '../components/SQLLevelCard';
import AffiliateCard from '../components/AffiliateCard';
import ServicesCard from '../components/ServicesCard';
import NotificationsCard from '../components/NotificationsCard';
import AgentCard from '../components/AgentCard';
import AuthCard from '../components/AuthCard';
import UserProfileCard from '../components/UserProfileCard';
import SettingsCard from '../components/SettingsCard';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">EHB Dashboard</h1>
      <ErrorBoundary>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <section id="wallet"><WalletCard /></section>
          <section id="sql-level"><SQLLevelCard /></section>
          <section id="affiliate"><AffiliateCard /></section>
          <section id="services"><ServicesCard /></section>
          <section id="notifications"><NotificationsCard /></section>
          <section id="agent"><AgentCard /></section>
          <section id="auth"><AuthCard /></section>
          <section id="profile"><UserProfileCard /></section>
          <section id="settings"><SettingsCard /></section>
        </div>
      </ErrorBoundary>
    </main>
  );
} 