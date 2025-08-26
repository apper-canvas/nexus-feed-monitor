import { useState, useEffect } from "react";
import { dealService } from "@/services/api/dealService";

export const useDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await dealService.getAll();
      setDeals(data);
    } catch (err) {
      setError(err.message || "Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  const loadDealById = async (dealId) => {
    try {
      setLoading(true);
      setError("");
      const deal = await dealService.getById(dealId);
      return deal;
    } catch (err) {
      setError(err.message || "Failed to load deal");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (dealData) => {
    try {
      const newDeal = await dealService.create(dealData);
      if (newDeal) {
        setDeals(prev => [newDeal, ...prev]);
      }
      return newDeal;
    } catch (err) {
      throw new Error(err.message || "Failed to create deal");
    }
  };

  const updateDeal = async (dealId, dealData) => {
    try {
      const updatedDeal = await dealService.update(dealId, dealData);
      if (updatedDeal) {
        setDeals(prev => prev.map(deal => 
          deal.Id === parseInt(dealId) ? updatedDeal : deal
        ));
      }
      return updatedDeal;
    } catch (err) {
      throw new Error(err.message || "Failed to update deal");
    }
  };

  const updateDealStage = async (dealId, newStage) => {
    try {
      const updatedDeal = await dealService.updateStage(dealId, newStage);
      if (updatedDeal) {
        setDeals(prev => prev.map(deal => 
          deal.Id === parseInt(dealId) ? { ...deal, ...updatedDeal } : deal
        ));
      }
      return updatedDeal;
    } catch (err) {
      throw new Error(err.message || "Failed to update deal stage");
    }
  };

  const deleteDeal = async (dealId) => {
    try {
      const success = await dealService.delete(dealId);
      if (success) {
        setDeals(prev => prev.filter(deal => deal.Id !== parseInt(dealId)));
      }
      return success;
    } catch (err) {
      throw new Error(err.message || "Failed to delete deal");
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  return {
    deals,
    loading,
    error,
    loadDeals,
    loadDealById,
    createDeal,
    updateDeal,
    updateDealStage,
    deleteDeal
  };
};