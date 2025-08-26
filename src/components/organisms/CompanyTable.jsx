import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const CompanyTable = ({ companies, onCompanyClick, onSort, sortField, sortDirection }) => {
  const handleSort = (field) => {
    onSort(field);
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900 transition-colors"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <ApperIcon 
          name="ChevronUp" 
          size={12} 
          className={`${sortField === field && sortDirection === 'asc' ? 'text-primary-500' : 'text-gray-400'}`}
        />
        <ApperIcon 
          name="ChevronDown" 
          size={12} 
          className={`-mt-1 ${sortField === field && sortDirection === 'desc' ? 'text-primary-500' : 'text-gray-400'}`}
        />
      </div>
    </button>
  );

  const getCompanyInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatEmployeeCount = (size) => {
    const sizeMap = {
      "Startup": "1-10",
      "Small": "11-50", 
      "Medium": "51-200",
      "Large": "201-1000",
      "Enterprise": "1000+"
    };
    return sizeMap[size] || size;
  };

  const getSizeColor = (size) => {
    const colors = {
      "Startup": "bg-purple-100 text-purple-700",
      "Small": "bg-blue-100 text-blue-700",
      "Medium": "bg-green-100 text-green-700", 
      "Large": "bg-orange-100 text-orange-700",
      "Enterprise": "bg-red-100 text-red-700"
    };
    return colors[size] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <SortButton field="name">Company</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="industry">Industry</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="size">Size</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="location">Location</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="totalDealValue">Deal Value</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="contactCount">Contacts</SortButton>
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr 
                key={company.Id}
                onClick={() => onCompanyClick(company)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
                      {getCompanyInitials(company.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {company.name}
                      </div>
                      {company.website && (
                        <div className="text-sm text-gray-500 hover:text-primary-600">
                          {company.website.replace(/^https?:\/\//, '')}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {company.industry}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSizeColor(company.size)}`}>
                    {formatEmployeeCount(company.size)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{company.location}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm font-medium text-green-600">
                    <ApperIcon name="DollarSign" size={14} className="mr-1" />
                    {formatCurrency(company.totalDealValue || 0)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <ApperIcon name="Users" size={14} className="mr-1.5 text-gray-400" />
                    {company.contactCount || 0}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompanyClick(company);
                    }}
                    className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CompanyTable;