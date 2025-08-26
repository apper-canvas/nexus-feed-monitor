import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CompanyDetails = ({ company, onEdit, onDelete, onClose }) => {
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
      "Startup": "1-10 employees",
      "Small": "11-50 employees",
      "Medium": "51-200 employees", 
      "Large": "201-1000 employees",
      "Enterprise": "1000+ employees"
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

  const handleCall = () => {
    if (company.phone) {
      window.location.href = `tel:${company.phone}`;
    }
  };

  const handleEmail = () => {
    // In a real app, this would get the primary contact's email
    const subject = encodeURIComponent(`Regarding ${company.name}`);
    window.location.href = `mailto:?subject=${subject}`;
  };

  const handleWebsite = () => {
    if (company.website) {
      window.open(company.website, '_blank');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Company Details</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ApperIcon name="X" size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Company Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl">
            {getCompanyInitials(company.name)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {company.name}
            </h3>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {company.industry}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSizeColor(company.size)}`}>
                {company.size}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            size="medium"
            onClick={handleCall}
            disabled={!company.phone}
            className="justify-center"
          >
            <ApperIcon name="Phone" size={16} className="mr-2" />
            Call Company
          </Button>
          <Button
            variant="outline"
            size="medium"
            onClick={handleEmail}
            className="justify-center"
          >
            <ApperIcon name="Mail" size={16} className="mr-2" />
            Email Contact
          </Button>
          <Button
            variant="outline"
            size="medium"
            onClick={() => {/* Navigate to add contact */}}
            className="justify-center"
          >
            <ApperIcon name="UserPlus" size={16} className="mr-2" />
            Add Contact
          </Button>
          <Button
            variant="outline"
            size="medium"
            onClick={() => {/* Navigate to create deal */}}
            className="justify-center"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Create Deal
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Total Deal Value</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(company.totalDealValue || 0)}</p>
              </div>
              <ApperIcon name="DollarSign" size={24} className="text-green-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Contacts</p>
                <p className="text-2xl font-bold text-blue-900">{company.contactCount || 0}</p>
              </div>
              <ApperIcon name="Users" size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h4>
            <div className="space-y-4">
              {company.website && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <button
                      onClick={handleWebsite}
                      className="text-sm font-medium text-primary-600 hover:text-primary-800"
                    >
                      {company.website}
                    </button>
                  </div>
                  <ApperIcon name="ExternalLink" size={16} className="text-gray-400" />
                </div>
              )}

              {company.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{company.phone}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="text-sm font-medium text-gray-900">{company.industry}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Company Size</p>
                <p className="text-sm font-medium text-gray-900">{formatEmployeeCount(company.size)}</p>
              </div>

              {company.location && (
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">{company.location}</p>
                </div>
              )}

              {(company.address || company.city || company.state) && (
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {[company.address, company.city, company.state, company.zipCode].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {company.notes && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-600">{company.notes}</p>
            </div>
          )}

          {company.tags && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {company.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between p-6 border-t border-gray-200">
        <Button
          variant="danger"
          size="medium"
          onClick={onDelete}
        >
          <ApperIcon name="Trash2" size={16} className="mr-2" />
          Delete Company
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={onEdit}
        >
          <ApperIcon name="Edit3" size={16} className="mr-2" />
          Edit Company
        </Button>
      </div>
    </div>
  );
};

export default CompanyDetails;