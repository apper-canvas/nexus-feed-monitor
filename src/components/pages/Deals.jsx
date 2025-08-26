import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDeals } from "@/hooks/useDeals";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import MetricCard from "@/components/molecules/MetricCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Header from "@/components/organisms/Header";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

// Deal Form Component
const DealForm = ({ deal, isOpen, onClose, onSubmit, onDelete }) => {
  const [formData, setFormData] = useState(deal || {
    Name: "",
    company_c: "",
    contact_name_c: "",
    contact_id_c: 1,
    value_c: "",
    stage_c: "Lead",
    probability_c: 20,
    expected_close_date_c: "",
    description_c: "",
    source_c: "",
    Tags: "",
    notes_c: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      try {
        await onDelete(deal.Id);
        onClose();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {deal ? "Edit Deal" : "New Deal"}
            </h2>
            <Button variant="ghost" size="small" onClick={onClose}>
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deal Name *
              </label>
              <input
                type="text"
                required
                value={formData.Name}
                onChange={(e) => setFormData(prev => ({ ...prev, Name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter deal name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                required
                value={formData.company_c}
                onChange={(e) => setFormData(prev => ({ ...prev, company_c: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.contact_name_c}
                onChange={(e) => setFormData(prev => ({ ...prev, contact_name_c: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter contact name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deal Value *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.value_c}
                onChange={(e) => setFormData(prev => ({ ...prev, value_c: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter deal value"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stage
              </label>
              <select
                value={formData.stage_c}
                onChange={(e) => setFormData(prev => ({ ...prev, stage_c: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Lead">Lead</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Close Date *
              </label>
              <input
                type="date"
                required
                value={formData.expected_close_date_c}
                onChange={(e) => setFormData(prev => ({ ...prev, expected_close_date_c: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description_c}
              onChange={(e) => setFormData(prev => ({ ...prev, description_c: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter deal description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <input
                type="text"
                value={formData.source_c}
                onChange={(e) => setFormData(prev => ({ ...prev, source_c: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Website, Referral, Cold Call"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={formData.Tags}
                onChange={(e) => setFormData(prev => ({ ...prev, Tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., urgent, enterprise, renewal"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes_c}
              onChange={(e) => setFormData(prev => ({ ...prev, notes_c: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter any additional notes"
            />
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div>
              {deal && (
                <Button
                  type="button"
                  variant="danger"
                  size="medium"
                  onClick={handleDelete}
                >
                  <ApperIcon name="Trash2" size={16} className="mr-2" />
                  Delete Deal
                </Button>
              )}
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                size="medium"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {deal ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  deal ? "Update Deal" : "Create Deal"
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Deal Card Component
const DealCard = ({ deal, onDragStart, onDragEnd, onClick }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (stage) => {
    const colors = {
      "Lead": "bg-gray-100 text-gray-700 border-gray-200",
      "Qualified": "bg-blue-100 text-blue-700 border-blue-200",
      "Proposal": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Negotiation": "bg-orange-100 text-orange-700 border-orange-200",
      "Closed Won": "bg-green-100 text-green-700 border-green-200"
    };
    return colors[stage] || colors["Lead"];
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">
            {deal.Name}
          </h4>
          <div className="flex items-center ml-2">
            <ApperIcon name="GripVertical" size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Building" size={14} className="mr-1.5" />
            <span className="truncate">{deal.company_c}</span>
          </div>
          
          <div className="flex items-center text-sm font-medium text-green-600">
            <ApperIcon name="DollarSign" size={14} className="mr-1.5" />
            <span>{formatCurrency(deal.value_c || 0)}</span>
          </div>

          {deal.contact_name_c && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="User" size={14} className="mr-1.5" />
              <span className="truncate">{deal.contact_name_c}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Calendar" size={14} className="mr-1.5" />
            <span>{format(new Date(deal.expected_close_date_c), "MMM dd, yyyy")}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(deal.stage_c)}`}>
            {deal.probability_c}% chance
          </span>
          {deal.Tags && (
            <div className="flex items-center">
              <ApperIcon name="Tag" size={12} className="text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Kanban Column Component
const KanbanColumn = ({ title, deals, onDealDrop, onDealClick, color = "gray" }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dealId = e.dataTransfer.getData("dealId");
    if (dealId) {
      onDealDrop(parseInt(dealId), title);
    }
  };

  const getTotalValue = () => {
    return deals.reduce((sum, deal) => sum + (deal.value_c || 0), 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 flex-shrink-0">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}>
            {deals.length}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-600">
          {formatCurrency(getTotalValue())}
        </p>
      </div>
      
      <div
        className={`space-y-3 transition-all duration-200 ${
          isDragOver ? 'bg-primary-50 border-2 border-dashed border-primary-300 rounded-lg p-2' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {deals.map((deal) => (
            <DealCard
              key={deal.Id}
              deal={deal}
              onDragStart={(e) => {
                e.dataTransfer.setData("dealId", deal.Id.toString());
              }}
              onClick={() => onDealClick(deal)}
            />
          ))}
        </AnimatePresence>
        
        {deals.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <ApperIcon name="Inbox" size={32} className="mx-auto mb-2" />
              <p className="text-sm">No deals</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Deals = () => {
  const { deals, loading, error, createDeal, updateDeal, updateDealStage, deleteDeal } = useDeals();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won"];
  
  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage_c === stage);
  };

  const getTotalPipelineValue = () => {
    return deals.filter(deal => deal.stage_c !== "Closed Won")
      .reduce((sum, deal) => sum + (deal.value_c || 0), 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleAddDeal = () => {
    setSelectedDeal(null);
    setIsFormOpen(true);
  };

  const handleEditDeal = (deal) => {
    setSelectedDeal(deal);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedDeal) {
      await updateDeal(selectedDeal.Id, formData);
    } else {
      await createDeal(formData);
    }
  };

  const handleDealStageChange = async (dealId, newStage) => {
    await updateDealStage(dealId, newStage);
  };

  const handleDeleteDeal = async (dealId) => {
    await deleteDeal(dealId);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Header title="Deals" subtitle="Manage your sales pipeline" />
        <Loading type="cards" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header title="Deals" subtitle="Manage your sales pipeline" />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Deals"
        subtitle="Manage your sales pipeline"
        action={handleAddDeal}
        actionLabel="Add Deal"
      />

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Pipeline"
          value={formatCurrency(getTotalPipelineValue())}
          icon="TrendingUp"
          gradient={true}
        />
        {stages.map(stage => (
          <MetricCard
            key={stage}
            title={stage}
            value={getDealsByStage(stage).length}
            change={formatCurrency(getDealsByStage(stage).reduce((sum, deal) => sum + (deal.value_c || 0), 0))}
            icon="Target"
            trend="up"
          />
        ))}
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Overview</h2>
          
          {deals.length === 0 ? (
            <Empty
              title="No deals yet"
              description="Start building your sales pipeline by adding your first deal"
              action={handleAddDeal}
              actionLabel="Add First Deal"
              icon="Target"
            />
          ) : (
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {stages.map((stage, index) => (
                <KanbanColumn
                  key={stage}
                  title={stage}
                  deals={getDealsByStage(stage)}
                  onDealDrop={handleDealStageChange}
                  onDealClick={handleEditDeal}
                  color={['gray', 'blue', 'yellow', 'orange', 'green'][index]}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Deal Form Modal */}
      <AnimatePresence>
        <DealForm
          deal={selectedDeal}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          onDelete={handleDeleteDeal}
        />
      </AnimatePresence>
    </div>
  );
};

export default Deals;
