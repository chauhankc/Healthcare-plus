import React, { useState } from "react";
import Weather from "./Weather";

import {
  Calendar,
  FileText,
  Settings,
  Activity,
  TrendingUp,
  Download,
  Clock,
  Shield,
  Award,
} from "lucide-react";

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const [stats] = useState({
    totalRecords: 156,
    appointments: 8,
    prescriptions: 23,
    healthScore: 85,
  });

  // Mock data (replace with API later)
  const recentActivities = [
    { id: 1, action: "Medicine reminder", time: "2 hours ago", type: "reminder" },
    { id: 2, action: "Doctor consultation scheduled", time: "1 day ago", type: "appointment" },
    { id: 3, action: "Health report updated", time: "2 days ago", type: "report" },
    { id: 4, action: "Prescription renewed", time: "3 days ago", type: "prescription" },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", time: "10:00 AM", date: "Tomorrow", type: "Cardiology" },
    { id: 2, doctor: "Dr. Michael Chen", time: "2:30 PM", date: "Dec 20", type: "General" },
  ];

  const statCards = [
    {
      title: "Total Health Records",
      value: stats.totalRecords,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Upcoming Appointments",
      value: stats.appointments,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-green-500",
      change: "+2",
    },
    {
      title: "Active Prescriptions",
      value: stats.prescriptions,
      icon: <Activity className="w-6 h-6" />,
      color: "bg-purple-500",
      change: "+3",
    },
    {
      title: "Health Score",
      value: `${stats.healthScore}/100`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-orange-500",
      change: "+5%",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <Activity className="w-5 h-5" /> },
    { id: "reports", label: "Reports", icon: <FileText className="w-5 h-5" /> },
    { id: "appointments", label: "Appointments", icon: <Calendar className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here is a summary of your health activity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color} text-white`}>
                  {card.icon}
                </div>
                <span className="text-sm font-medium text-green-600">
                  {card.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition ${activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center p-4 bg-gray-50 dark:bg-gray-750 rounded-lg"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <Clock className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                          <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            {activity.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "appointments" && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Upcoming Appointments
                    </h2>
                    <div className="space-y-4">
                      {upcomingAppointments.map((a) => (
                        <div
                          key={a.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500"
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold dark:text-white">{a.doctor}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{a.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium dark:text-gray-200">{a.time}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{a.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold dark:text-white">
                    {user?.name || "John Doe"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>

              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transaction-colors">
                Edit Profile
              </button>
            </div>

            {/* Weather Card just below stats section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Weather Forecast</h3>

                <button
                  onClick={() => window.location.href = "/weather"}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Weather Forecast
                </button>
              </div>

              <Weather compact />
            </div>


            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Health Achievements
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-200">30 Day Streak</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Daily health check-ins
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-200">All Reports Clear</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last checkup: 1 week ago
                    </p>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download Health Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;