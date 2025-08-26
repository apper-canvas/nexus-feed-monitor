import React from "react";
import { useContacts } from "@/hooks/useContacts";
import { useActivities } from "@/hooks/useActivities";
import MetricCard from "@/components/molecules/MetricCard";
import ActivityFeed from "@/components/organisms/ActivityFeed";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Dashboard = () => {
  const { contacts, loading: contactsLoading, error: contactsError } = useContacts();
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  const isLoading = contactsLoading || activitiesLoading;
  const error = contactsError || activitiesError;

  if (isLoading) return <Loading type="cards" />;
  if (error) return <Error message={error} />;

  // Calculate metrics
  const totalContacts = contacts.length;
  const recentContacts = contacts.filter(c => {
    if (!c.lastContactDate) return false;
    const lastContact = new Date(c.lastContactDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastContact >= thirtyDaysAgo;
  }).length;

  const companiesCount = new Set(contacts.map(c => c.company)).size;
  const completedActivities = activities.filter(a => a.completed).length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Nexus CRM</h1>
        <p className="text-primary-100 text-lg">
          Manage your customer relationships and drive revenue growth
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contacts"
          value={totalContacts.toLocaleString()}
          change="+12%"
          trend="up"
          icon="Users"
          gradient={true}
        />
        <MetricCard
          title="Active Deals"
          value="24"
          change="+8%"
          trend="up"
          icon="Target"
          gradient={true}
        />
        <MetricCard
          title="Revenue (MTD)"
          value="$45,280"
          change="+15%"
          trend="up"
          icon="DollarSign"
          gradient={true}
        />
        <MetricCard
          title="Activities"
          value={completedActivities.toString()}
          change="+5%"
          trend="up"
          icon="Activity"
          gradient={true}
        />
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities.slice(0, 8)} />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Recent Contacts Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Companies</span>
                <span className="font-semibold text-gray-900">{companiesCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recent Contacts</span>
                <span className="font-semibold text-gray-900">{recentContacts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-accent-500">+{Math.floor(totalContacts * 0.08)}</span>
              </div>
            </div>
          </div>

          {/* Pipeline Overview Placeholder */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Qualified Leads</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Closing Soon</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;