import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";

const ContactForm = ({ contact, onSave, onCancel }) => {
const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    email_c: "",
    phone_c: "",
    company_c: "",
    position_c: "",
    notes_c: "",
    Tags: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

useEffect(() => {
    if (contact) {
      setFormData({
        first_name_c: contact.first_name_c || "",
        last_name_c: contact.last_name_c || "",
        email_c: contact.email_c || "",
        phone_c: contact.phone_c || "",
        company_c: contact.company_c || "",
        position_c: contact.position_c || "",
        notes_c: contact.notes_c || "",
        Tags: Array.isArray(contact.Tags) ? contact.Tags.join(",") : contact.Tags || ""
      });
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};

if (!formData.first_name_c.trim()) {
      newErrors.first_name_c = "First name is required";
    }

    if (!formData.last_name_c.trim()) {
      newErrors.last_name_c = "Last name is required";
    }

if (!formData.email_c.trim()) {
      newErrors.email_c = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email_c)) {
      newErrors.email_c = "Email is invalid";
    }

    if (!formData.company_c.trim()) {
      newErrors.company_c = "Company is required";
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
      const contactData = {
        ...formData,
        Tags: formData.Tags ? formData.Tags.split(",").map(tag => tag.trim()).filter(tag => tag).join(",") : ""
      };

      await onSave(contactData);
if (contact) {
        toast.success("Contact updated successfully!");
      } else {
        toast.success("Contact created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save contact. Please try again.");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<FormField
          label="First Name"
          required
          value={formData.first_name_c}
          onChange={(e) => handleInputChange("first_name_c", e.target.value)}
          error={errors.first_name_c}
          placeholder="John"
        />

<FormField
          label="Last Name"
          required
          value={formData.last_name_c}
          onChange={(e) => handleInputChange("last_name_c", e.target.value)}
          error={errors.last_name_c}
          placeholder="Doe"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<FormField
          label="Email"
          type="email"
          required
          value={formData.email_c}
          onChange={(e) => handleInputChange("email_c", e.target.value)}
          error={errors.email_c}
          placeholder="john.doe@company.com"
        />

<FormField
          label="Phone"
          type="tel"
          value={formData.phone_c}
          onChange={(e) => handleInputChange("phone_c", e.target.value)}
          error={errors.phone_c}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<FormField
          label="Company"
          required
          value={formData.company_c}
          onChange={(e) => handleInputChange("company_c", e.target.value)}
          error={errors.company_c}
          placeholder="Acme Inc."
        />
<FormField
          label="Position"
          value={formData.position_c}
          onChange={(e) => handleInputChange("position_c", e.target.value)}
          error={errors.position_c}
          placeholder="Sales Manager"
        />
      </div>

      <FormField
        label="Tags"
        value={formData.Tags}
        onChange={(e) => handleInputChange("Tags", e.target.value)}
        placeholder="VIP,Enterprise,Lead (comma separated)"
      />

      <FormField
        label="Notes"
        value={formData.notes_c}
        onChange={(e) => handleInputChange("notes_c", e.target.value)}
        placeholder="Additional notes about this contact..."
      >
        <textarea
          value={formData.notes_c}
          onChange={(e) => handleInputChange("notes_c", e.target.value)}
          placeholder="Additional notes about this contact..."
          rows={4}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-primary-500 focus:ring-primary-500 bg-white hover:border-gray-400 resize-none"
        />
      </FormField>
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
              {contact ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <ApperIcon name={contact ? "Save" : "Plus"} size={16} className="mr-2" />
              {contact ? "Update Contact" : "Create Contact"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;