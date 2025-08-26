import React, { useState, useCallback } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import Header from "@/components/organisms/Header";
import SearchBar from "@/components/molecules/SearchBar";
import CompanyTable from "@/components/organisms/CompanyTable";
import CompanyForm from "@/components/organisms/CompanyForm";
import CompanyDetails from "@/components/organisms/CompanyDetails";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const Companies = () => {
  const { 
    companies, 
    loading, 
    error, 
    searchCompanies, 
    createCompany, 
    updateCompany,
    deleteCompany,
    loadCompanies 
  } = useCompanies();

  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    industry: "",
    size: "",
    location: ""
  });

  // Handle search with debounce
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    await searchCompanies(query);
  }, [searchCompanies]);

  // Handle sorting
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  // Apply filters and sorting
  const getFilteredAndSortedCompanies = () => {
    let filtered = [...companies];
    
    // Apply filters
    if (filters.industry) {
      filtered = filtered.filter(company => 
        company.industry?.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }
    if (filters.size) {
      filtered = filtered.filter(company => company.size === filters.size);
    }
    if (filters.location) {
      filtered = filtered.filter(company => 
        company.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
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

    return filtered;
  };

  // Handle company selection
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowDetails(true);
  };

  // Handle company creation
  const handleCreateCompany = () => {
    setEditingCompany(null);
    setShowForm(true);
  };

  // Handle company editing
  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowForm(true);
    setShowDetails(false);
  };

  // Handle company deletion
  const handleDeleteCompany = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
      try {
        await deleteCompany(companyId);
        setShowDetails(false);
      } catch (error) {
        console.error("Failed to delete company:", error);
      }
    }
  };

  // Handle form save
  const handleSaveCompany = async (companyData) => {
    if (editingCompany) {
      await updateCompany(editingCompany.Id, companyData);
    } else {
      await createCompany(companyData);
    }
    setShowForm(false);
    setEditingCompany(null);
  };

  // Handle form cancel
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  // Handle details close
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedCompany(null);
  };

  // Calculate metrics
  const totalCompanies = companies.length;
  const totalDealValue = companies.reduce((sum, company) => sum + (company.totalDealValue || 0), 0);
  const totalContacts = companies.reduce((sum, company) => sum + (company.contactCount || 0), 0);
  const enterpriseCount = companies.filter(company => 
    company.size === "Enterprise" || company.size === "Large"
  ).length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const sortedCompanies = getFilteredAndSortedCompanies();

  if (loading && companies.length === 0) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadCompanies} />;

  return (
    <div className="space-y-6">
      <Header
        title="Companies"
        subtitle={`${totalCompanies} total companies`}
        action={handleCreateCompany}
        actionLabel="Add Company"
      />

      {/* Company Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Companies"
          value={totalCompanies}
          icon="Building2"
          gradient={true}
        />
        <MetricCard
          title="Total Deal Value"
          value={formatCurrency(totalDealValue)}
          icon="DollarSign"
          trend="up"
        />
        <MetricCard
          title="Total Contacts"
          value={totalContacts}
          icon="Users"
          trend="up"
        />
        <MetricCard
          title="Enterprise Accounts"
          value={enterpriseCount}
          icon="Star"
          trend="up"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search companies by name, industry, or location..."
            className="md:col-span-2"
          />
          
          <select
            value={filters.industry}
            onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Education">Education</option>
            <option value="Real Estate">Real Estate</option>
          </select>

          <select
            value={filters.size}
            onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Sizes</option>
            <option value="Startup">Startup (1-10)</option>
            <option value="Small">Small (11-50)</option>
            <option value="Medium">Medium (51-200)</option>
            <option value="Large">Large (201-1000)</option>
            <option value="Enterprise">Enterprise (1000+)</option>
          </select>
        </div>
      </div>

      {/* Company Table */}
      <div className="relative">
        {sortedCompanies.length === 0 && !loading ? (
          <Empty
            title={searchQuery || filters.industry || filters.size ? "No companies found" : "No companies yet"}
            description={searchQuery || filters.industry || filters.size ? "Try adjusting your search terms or filters" : "Get started by adding your first company"}
            action={searchQuery || filters.industry || filters.size ? undefined : handleCreateCompany}
            actionLabel="Add First Company"
            icon="Building2"
          />
        ) : (
          <CompanyTable
            companies={sortedCompanies}
            onCompanyClick={handleCompanyClick}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        )}
      </div>

      {/* Company Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50 backdrop-blur-sm" />
            <div className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl transform transition-all">
              <div className="px-6 py-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCompany ? "Edit Company" : "Create New Company"}
                </h2>
              </div>
              <div className="px-6 py-6">
                <CompanyForm
                  company={editingCompany}
                  onSave={handleSaveCompany}
                  onCancel={handleCancelForm}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Details Panel */}
      {showDetails && selectedCompany && (
        <div className="fixed inset-y-0 right-0 z-40 w-full max-w-2xl bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300">
          <CompanyDetails
            company={selectedCompany}
            onEdit={() => handleEditCompany(selectedCompany)}
            onDelete={() => handleDeleteCompany(selectedCompany.Id)}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default Companies;