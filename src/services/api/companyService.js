import { toast } from "react-toastify";
import companyData from "@/services/mockData/companies.json";

// Utility function to simulate API delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CompanyService {
  constructor() {
    this.companies = [...companyData];
    this.nextId = Math.max(...this.companies.map(c => c.Id)) + 1;
  }

  async getAll() {
    await delay(300);
    return [...this.companies].sort((a, b) => b.Id - a.Id);
  }

  async getById(id) {
    await delay(200);
    const company = this.companies.find(c => c.Id === parseInt(id));
    if (!company) {
      throw new Error("Company not found");
    }
    return { ...company };
  }

  async create(companyData) {
    await delay(400);
    
    const newCompany = {
      Id: this.nextId++,
      name: companyData.name,
      industry: companyData.industry || "",
      size: companyData.size || "",
      website: companyData.website || "",
      phone: companyData.phone || "",
      address: companyData.address || "",
      city: companyData.city || "",
      state: companyData.state || "",
      zipCode: companyData.zipCode || "",
      country: companyData.country || "United States",
      location: `${companyData.city || ""}, ${companyData.state || ""}`.replace(/^,\s*|,\s*$/g, '') || "",
      notes: companyData.notes || "",
      createdDate: new Date().toISOString(),
      totalDealValue: 0,
      contactCount: 0,
      tags: companyData.tags || ""
    };

    this.companies.unshift(newCompany);
    return { ...newCompany };
  }

  async update(id, companyData) {
    await delay(400);
    
    const index = this.companies.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }

    const existingCompany = this.companies[index];
    const updatedCompany = {
      ...existingCompany,
      name: companyData.name,
      industry: companyData.industry || "",
      size: companyData.size || "",
      website: companyData.website || "",
      phone: companyData.phone || "",
      address: companyData.address || "",
      city: companyData.city || "",
      state: companyData.state || "",
      zipCode: companyData.zipCode || "",
      country: companyData.country || "United States",
      location: `${companyData.city || ""}, ${companyData.state || ""}`.replace(/^,\s*|,\s*$/g, '') || "",
      notes: companyData.notes || "",
      tags: companyData.tags || ""
    };

    this.companies[index] = updatedCompany;
    return { ...updatedCompany };
  }

  async delete(id) {
    await delay(300);
    
    const index = this.companies.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }

    this.companies.splice(index, 1);
    return true;
  }

  async search(query) {
    await delay(250);
    
    if (!query || query.trim() === "") {
      return [...this.companies].sort((a, b) => b.Id - a.Id);
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.companies.filter(company => 
      company.name?.toLowerCase().includes(searchTerm) ||
      company.industry?.toLowerCase().includes(searchTerm) ||
      company.location?.toLowerCase().includes(searchTerm) ||
      company.size?.toLowerCase().includes(searchTerm)
    );

    return filtered.sort((a, b) => b.Id - a.Id);
  }

  async getByIndustry(industry) {
    await delay(200);
    return this.companies.filter(company => 
      company.industry?.toLowerCase() === industry.toLowerCase()
    );
  }

  async getBySize(size) {
    await delay(200);
    return this.companies.filter(company => company.size === size);
  }
}

export const companyService = new CompanyService();
export default companyService;