import mockActivities from "@/services/mockData/activities.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let activities = [...mockActivities];

export const activityService = {
  // Get all activities
  async getAll() {
    await delay(300);
    return [...activities];
  },

  // Get activities by contact ID
  async getByContactId(contactId) {
    await delay(200);
    const contactActivities = activities.filter(a => a.contactId === parseInt(contactId));
    return [...contactActivities];
  },

  // Get recent activities (last 10)
  async getRecent(limit = 10) {
    await delay(200);
    const sorted = activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
    return [...sorted];
  },

  // Create new activity
  async create(activityData) {
    await delay(300);
    const newId = Math.max(...activities.map(a => a.Id)) + 1;
    const newActivity = {
      Id: newId,
      ...activityData,
      timestamp: new Date().toISOString()
    };
    activities.push(newActivity);
    return { ...newActivity };
  },

  // Update activity
  async update(id, activityData) {
    await delay(250);
    const index = activities.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Activity not found");
    }
    activities[index] = { ...activities[index], ...activityData };
    return { ...activities[index] };
  },

  // Delete activity
  async delete(id) {
    await delay(200);
    const index = activities.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Activity not found");
    }
    activities.splice(index, 1);
    return true;
  }
};