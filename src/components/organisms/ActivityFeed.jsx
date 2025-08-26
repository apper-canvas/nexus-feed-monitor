import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "call": return "Phone";
      case "email": return "Mail";
      case "meeting": return "Calendar";
      case "note": return "FileText";
      case "task": return "CheckSquare";
      default: return "Activity";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "call": return "text-blue-600 bg-blue-100";
      case "email": return "text-green-600 bg-green-100";
      case "meeting": return "text-purple-600 bg-purple-100";
      case "note": return "text-gray-600 bg-gray-100";
      case "task": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center">
        <ApperIcon name="Clock" size={32} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Activity</h3>
        <p className="text-gray-600">Recent activities and interactions will appear here</p>
      </Card>
    );
  }

  return (
    <Card className="divide-y divide-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                <ApperIcon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {activity.type}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(activity.timestamp), "MMM dd, HH:mm")}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                {activity.contactName && (
                  <p className="text-xs text-gray-500 mt-1">
                    Related to: {activity.contactName}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;