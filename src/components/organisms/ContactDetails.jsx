import React from "react";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContactDetails = ({ contact, onEdit, onClose }) => {
const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

const formatTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    return [];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
<div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-xl">
            {getInitials(contact.first_name_c, contact.last_name_c)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {contact.first_name_c} {contact.last_name_c}
            </h2>
            <p className="text-gray-600">{contact.position_c} at {contact.company_c}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ApperIcon name="X" size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <ApperIcon name="Mail" size={16} className="text-gray-600" />
              </div>
<div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{contact.email_c}</p>
              </div>
            </div>
            
{contact.phone_c && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ApperIcon name="Phone" size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{contact.phone_c}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <ApperIcon name="Building2" size={16} className="text-gray-600" />
              </div>
<div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="text-sm font-medium text-gray-900">{contact.company_c}</p>
              </div>
            </div>
            
{contact.last_contact_date_c && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ApperIcon name="Calendar" size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Contact</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(contact.last_contact_date_c), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
{contact.Tags && formatTags(contact.Tags).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {formatTags(contact.Tags).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
{contact.notes_c && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{contact.notes_c}</p>
            </div>
          </div>
        )}

        {/* Activity Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <ApperIcon name="Clock" size={24} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500 mt-1">Activity tracking coming soon</p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex space-x-3">
          <Button onClick={onEdit} variant="primary" className="flex-1">
            <ApperIcon name="Edit" size={16} className="mr-2" />
            Edit Contact
          </Button>
          <Button variant="outline" className="flex-1">
            <ApperIcon name="Phone" size={16} className="mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1">
            <ApperIcon name="Mail" size={16} className="mr-2" />
            Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;