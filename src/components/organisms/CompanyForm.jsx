import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";

const CompanyForm = ({ company, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    size: "",
    website: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    notes: "",
    tags: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        industry: company.industry || "",
        size: company.size || "",
        website: company.website || "",
        phone: company.phone || "",
        address: company.address || "",
        city: company.city || "",
        state: company.state || "",
        zipCode: company.zipCode || "",
        country: company.country || "United States",
        notes: company.notes || "",
        tags: company.tags || ""
      });
    }
  }, [company]);

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Real Estate",
    "Construction",
    "Transportation",
    "Energy",
    "Agriculture",
    "Other"
  ];

  const sizeOptions = [
    { value: "Startup", label: "Startup (1-10 employees)" },
    { value: "Small", label: "Small (11-50 employees)" },
    { value: "Medium", label: "Medium (51-200 employees)" },
    { value: "Large", label: "Large (201-1000 employees)" },
    { value: "Enterprise", label: "Enterprise (1000+ employees)" }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.size) {
      newErrors.size = "Company size is required";
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL (including http:// or https://)";
    }

    if (formData.phone && !/^[\+]?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onSave(formData);
      if (company) {
        toast.success("Company updated successfully!");
      } else {
        toast.success("Company created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormField
              label="Company Name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={errors.name}
              placeholder="Acme Corporation"
            />
          </div>

          <FormField
            label="Industry"
            required
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            error={errors.industry}
          >
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-primary-500 focus:ring-primary-500 bg-white"
            >
              <option value="">Select Industry</option>
              {industryOptions.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Company Size"
            required
            value={formData.size}
            onChange={(e) => handleInputChange("size", e.target.value)}
            error={errors.size}
          >
            <select
              value={formData.size}
              onChange={(e) => handleInputChange("size", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-primary-500 focus:ring-primary-500 bg-white"
            >
              <option value="">Select Company Size</option>
              {sizeOptions.map(size => (
                <option key={size.value} value={size.value}>{size.label}</option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            error={errors.website}
            placeholder="https://company.com"
          />

          <FormField
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            error={errors.phone}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
        <div className="space-y-4">
          <FormField
            label="Street Address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            error={errors.address}
            placeholder="123 Business Street"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              error={errors.city}
              placeholder="New York"
            />

            <FormField
              label="State/Province"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              error={errors.state}
              placeholder="NY"
            />

            <FormField
              label="ZIP/Postal Code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              error={errors.zipCode}
              placeholder="10001"
            />
          </div>

          <FormField
            label="Country"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            error={errors.country}
            placeholder="United States"
          />
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        <div className="space-y-4">
          <FormField
            label="Tags"
            value={formData.tags}
            onChange={(e) => handleInputChange("tags", e.target.value)}
            placeholder="enterprise, software, key-account (comma separated)"
          />

          <FormField
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Additional notes about this company..."
          >
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes about this company..."
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-primary-500 focus:ring-primary-500 bg-white hover:border-gray-400 resize-none"
            />
          </FormField>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              {company ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <ApperIcon name={company ? "Save" : "Plus"} size={16} className="mr-2" />
              {company ? "Update Company" : "Create Company"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;