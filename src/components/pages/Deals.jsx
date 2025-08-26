import React from "react";
import Header from "@/components/organisms/Header";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Deals = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Deals"
        subtitle="Manage your sales pipeline"
      />

      {/* Coming Soon Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
            <ApperIcon name="Target" size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Deal Pipeline Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            The deals pipeline will feature kanban-style boards to track opportunities through your sales stages, 
            from lead to close. You'll be able to manage deal values, stages, and probabilities.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Planned Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Drag-and-drop pipeline management</li>
              <li>• Deal value and probability tracking</li>
              <li>• Stage-based workflow automation</li>
              <li>• Revenue forecasting</li>
              <li>• Activity tracking per deal</li>
              <li>• Integration with contact records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;