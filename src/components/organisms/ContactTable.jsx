import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const ContactTable = ({ contacts, onContactClick, onSort, sortField, sortDirection }) => {
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

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <SortButton field="firstName">Name</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="company">Company</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="email">Email</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="phone">Phone</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="lastContactDate">Last Contact</SortButton>
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr 
                key={contact.Id}
                onClick={() => onContactClick(contact)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
                      {getInitials(contact.firstName, contact.lastName)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{contact.position}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.company}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {contact.lastContactDate ? format(new Date(contact.lastContactDate), "MMM dd, yyyy") : "Never"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContactClick(contact);
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

export default ContactTable;