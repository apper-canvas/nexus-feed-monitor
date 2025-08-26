import { useState, useEffect } from "react";
import { activityService } from "@/services/api/activityService";

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecentActivities = async (limit = 10) => {
    try {
      setLoading(true);
      setError("");
      const data = await activityService.getRecent(limit);
      setActivities(data);
    } catch (err) {
      setError(err.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const loadActivitiesByContact = async (contactId) => {
    try {
      setLoading(true);
      setError("");
      const data = await activityService.getByContactId(contactId);
      setActivities(data);
    } catch (err) {
      setError(err.message || "Failed to load contact activities");
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (activityData) => {
    try {
      const newActivity = await activityService.create(activityData);
      setActivities(prev => [newActivity, ...prev]);
      return newActivity;
    } catch (err) {
      throw new Error(err.message || "Failed to create activity");
    }
  };

  useEffect(() => {
    loadRecentActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    loadRecentActivities,
    loadActivitiesByContact,
    createActivity
  };
};