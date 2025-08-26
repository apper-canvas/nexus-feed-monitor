import mockContacts from "@/services/mockData/contacts.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let contacts = [...mockContacts];

export const contactService = {
  // Get all contacts
  async getAll() {
    await delay(300);
    return [...contacts];
  },

  // Get contact by ID
  async getById(id) {
    await delay(200);
    const contact = contacts.find(c => c.Id === parseInt(id));
    if (!contact) {
      throw new Error("Contact not found");
    }
    return { ...contact };
  },

  // Create new contact
  async create(contactData) {
    await delay(400);
    const newId = Math.max(...contacts.map(c => c.Id)) + 1;
    const newContact = {
      Id: newId,
      ...contactData,
      createdAt: new Date().toISOString(),
      lastContactDate: null
    };
    contacts.push(newContact);
    return { ...newContact };
  },

  // Update contact
  async update(id, contactData) {
    await delay(350);
    const index = contacts.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    contacts[index] = { ...contacts[index], ...contactData };
    return { ...contacts[index] };
  },

  // Delete contact
  async delete(id) {
    await delay(250);
    const index = contacts.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    contacts.splice(index, 1);
    return true;
  },

  // Search contacts
  async search(query) {
    await delay(200);
    if (!query) return [...contacts];
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(lowercaseQuery) ||
      contact.lastName.toLowerCase().includes(lowercaseQuery) ||
      contact.email.toLowerCase().includes(lowercaseQuery) ||
      contact.company.toLowerCase().includes(lowercaseQuery) ||
      contact.phone.includes(query) ||
      (contact.position && contact.position.toLowerCase().includes(lowercaseQuery))
    );
    return [...filtered];
  }
};