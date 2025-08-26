import React from "react";
import Header from "@/components/organisms/Header";
import ApperIcon from "@/components/ApperIcon";

const Companies = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Companies"
        subtitle="Manage company profiles and relationships"
      />

      {/* Coming Soon Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
            <ApperIcon name="Building2" size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Management Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            The companies section will provide comprehensive company profiles with associated contacts, 
            deals, and interaction history. Perfect for managing enterprise accounts and relationships.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Planned Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Company profile management</li>
              <li>• Contact relationship mapping</li>
              <li>• Deal and opportunity tracking</li>
              <li>• Industry and size categorization</li>
              <li>• Company interaction timeline</li>
              <li>• Account health scoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;