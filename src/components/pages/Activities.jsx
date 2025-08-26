import React from "react";
import Header from "@/components/organisms/Header";
import ApperIcon from "@/components/ApperIcon";

const Activities = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Activities"
        subtitle="Track tasks, calls, meetings, and communications"
      />

      {/* Coming Soon Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
            <ApperIcon name="Calendar" size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Activity Management Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            The activities section will provide comprehensive task and event management with calendar 
            integration, automated follow-ups, and productivity tracking.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Planned Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Task and appointment scheduling</li>
              <li>• Call and meeting logging</li>
              <li>• Email integration tracking</li>
              <li>• Automated follow-up reminders</li>
              <li>• Activity reporting and analytics</li>
              <li>• Calendar synchronization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;