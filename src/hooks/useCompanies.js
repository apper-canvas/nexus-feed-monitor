import { useState, useEffect } from "react";
import { companyService } from "@/services/api/companyService";

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const loadCompanyById = async (companyId) => {
    try {
      setLoading(true);
      setError("");
      const company = await companyService.getById(companyId);
      return company;
    } catch (err) {
      setError(err.message || "Failed to load company");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchCompanies = async (query) => {
    try {
      setLoading(true);
      setError("");
      const data = await companyService.search(query);
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Failed to search companies");
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (companyData) => {
    try {
      const newCompany = await companyService.create(companyData);
      setCompanies(prev => [newCompany, ...prev]);
      return newCompany;
    } catch (err) {
      throw new Error(err.message || "Failed to create company");
    }
  };

  const updateCompany = async (id, companyData) => {
    try {
      const updatedCompany = await companyService.update(id, companyData);
      setCompanies(prev => prev.map(c => c.Id === id ? updatedCompany : c));
      return updatedCompany;
    } catch (err) {
      throw new Error(err.message || "Failed to update company");
    }
  };

  const deleteCompany = async (id) => {
    try {
      await companyService.delete(id);
      setCompanies(prev => prev.filter(c => c.Id !== id));
      return true;
    } catch (err) {
      throw new Error(err.message || "Failed to delete company");
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return {
    companies,
    loading,
    error,
    loadCompanies,
    loadCompanyById,
    searchCompanies,
    createCompany,
    updateCompany,
    deleteCompany
  };
};