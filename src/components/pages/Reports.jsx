import React from "react";
import Header from "@/components/organisms/Header";
import ApperIcon from "@/components/ApperIcon";

const Reports = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Reports"
        subtitle="Sales analytics and performance insights"
      />

      {/* Coming Soon Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
            <ApperIcon name="BarChart3" size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics Dashboard Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            The reports section will provide comprehensive sales analytics, performance metrics, 
            and business intelligence to help optimize your sales processes and drive growth.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Planned Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sales performance dashboards</li>
              <li>• Revenue and pipeline analytics</li>
              <li>• Contact engagement metrics</li>
              <li>• Activity and productivity reports</li>
              <li>• Custom report builder</li>
              <li>• Export and sharing capabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;