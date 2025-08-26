import { useState, useEffect } from "react";
import { contactService } from "@/services/api/contactService";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const searchContacts = async (query) => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.search(query);
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to search contacts");
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData);
      setContacts(prev => [newContact, ...prev]);
      return newContact;
    } catch (err) {
      throw new Error(err.message || "Failed to create contact");
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactService.update(id, contactData);
      setContacts(prev => prev.map(c => c.Id === id ? updatedContact : c));
      return updatedContact;
    } catch (err) {
      throw new Error(err.message || "Failed to update contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactService.delete(id);
      setContacts(prev => prev.filter(c => c.Id !== id));
    } catch (err) {
      throw new Error(err.message || "Failed to delete contact");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    loadContacts,
    searchContacts,
    createContact,
    updateContact,
    deleteContact
  };
};