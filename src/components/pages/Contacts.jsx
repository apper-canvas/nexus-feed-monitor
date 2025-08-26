import React, { useState, useCallback } from "react";
import { useContacts } from "@/hooks/useContacts";
import Header from "@/components/organisms/Header";
import SearchBar from "@/components/molecules/SearchBar";
import ContactTable from "@/components/organisms/ContactTable";
import ContactForm from "@/components/organisms/ContactForm";
import ContactDetails from "@/components/organisms/ContactDetails";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const Contacts = () => {
  const { 
    contacts, 
    loading, 
    error, 
    searchContacts, 
    createContact, 
    updateContact,
    loadContacts 
  } = useContacts();

  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [sortField, setSortField] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");

  // Handle search with debounce
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    await searchContacts(query);
  }, [searchContacts]);

  // Handle sorting
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  // Sort contacts
  const sortedContacts = [...contacts].sort((a, b) => {
    let aValue = a[sortField] || "";
    let bValue = b[sortField] || "";
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Handle contact selection
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  // Handle contact creation
  const handleCreateContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  // Handle contact editing
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
    setShowDetails(false);
  };

  // Handle form save
  const handleSaveContact = async (contactData) => {
    if (editingContact) {
      await updateContact(editingContact.Id, contactData);
    } else {
      await createContact(contactData);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  // Handle form cancel
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  // Handle details close
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedContact(null);
  };

  if (loading && contacts.length === 0) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadContacts} />;

  return (
    <div className="space-y-6">
      <Header
        title="Contacts"
        subtitle={`${contacts.length} total contacts`}
        action={handleCreateContact}
        actionLabel="Add Contact"
      />

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <SearchBar
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search contacts by name, email, company, or phone..."
          className="max-w-md"
        />
      </div>

      {/* Contact Table */}
      <div className="relative">
        {contacts.length === 0 && !loading ? (
          <Empty
            title="No contacts found"
            description={searchQuery ? "Try adjusting your search terms" : "Get started by adding your first contact"}
            action={searchQuery ? undefined : handleCreateContact}
            actionLabel="Add First Contact"
            icon="Users"
          />
        ) : (
          <ContactTable
            contacts={sortedContacts}
            onContactClick={handleContactClick}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        )}
      </div>

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50 backdrop-blur-sm" />
            <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl transform transition-all">
              <div className="px-6 py-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingContact ? "Edit Contact" : "Create New Contact"}
                </h2>
              </div>
              <div className="px-6 py-6">
                <ContactForm
                  contact={editingContact}
                  onSave={handleSaveContact}
                  onCancel={handleCancelForm}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Panel */}
      {showDetails && selectedContact && (
        <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300">
          <ContactDetails
            contact={selectedContact}
            onEdit={() => handleEditContact(selectedContact)}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default Contacts;