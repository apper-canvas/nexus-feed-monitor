const handleShowForm = () => {
  setShowForm(true);
  setShowDetails(false);
};

const handleSaveContact = async (contactData) => {
  if (editingContact) {
    await updateContact(editingContact.Id, contactData);
  } else {
    await createContact(contactData);
  }
};