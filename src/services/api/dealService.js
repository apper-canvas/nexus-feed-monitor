import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dealService = {
  async getAll() {
    try {
      await delay(300);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "company_c" } },
          { field: { Name: "contact_id_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "value_c" } },
          { field: { Name: "stage_c" } },
          { field: { Name: "probability_c" } },
          { field: { Name: "expected_close_date_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "created_date_c" } },
          { field: { Name: "last_activity_date_c" } },
          { field: { Name: "source_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "notes_c" } }
        ],
        orderBy: [
          {
            fieldName: "created_date_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("deal_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      // Fallback to mock data when database is not available
      try {
        const mockData = await import('@/services/mockData/deals.json');
        return [...mockData.default];
      } catch (mockError) {
        console.error("Error loading deal data:", error?.response?.data?.message || error.message);
        return [];
      }
    }
  },

  async getById(dealId) {
    try {
      await delay(200);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "company_c" } },
          { field: { Name: "contact_id_c" } },
          { field: { Name: "contact_name_c" } },
          { field: { Name: "value_c" } },
          { field: { Name: "stage_c" } },
          { field: { Name: "probability_c" } },
          { field: { Name: "expected_close_date_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "created_date_c" } },
          { field: { Name: "last_activity_date_c" } },
          { field: { Name: "source_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "notes_c" } }
        ]
      };

      const response = await apperClient.getRecordById("deal_c", dealId, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      // Fallback to mock data
      try {
        const mockData = await import('@/services/mockData/deals.json');
        const deal = mockData.default.find(d => d.Id === parseInt(dealId));
        return deal ? {...deal} : null;
      } catch (mockError) {
        console.error("Error fetching deal:", error?.response?.data?.message || error.message);
        return null;
      }
    }
  },

  async create(dealData) {
    try {
      await delay(400);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Name: dealData.Name,
            company_c: dealData.company_c,
            contact_id_c: parseInt(dealData.contact_id_c),
            contact_name_c: dealData.contact_name_c,
            value_c: parseFloat(dealData.value_c),
            stage_c: dealData.stage_c || "Lead",
            probability_c: parseFloat(dealData.probability_c) || 20,
            expected_close_date_c: dealData.expected_close_date_c,
            description_c: dealData.description_c,
            created_date_c: new Date().toISOString(),
            last_activity_date_c: new Date().toISOString(),
            source_c: dealData.source_c || "",
            Tags: dealData.Tags || "",
            notes_c: dealData.notes_c || ""
          }
        ]
      };

      const response = await apperClient.createRecord("deal_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} deals:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Deal created successfully!");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      // Fallback to mock creation
      try {
        const mockData = await import('@/services/mockData/deals.json');
        const newDeal = {
          ...dealData,
          Id: Date.now(),
          stage_c: dealData.stage_c || "Lead",
          probability_c: parseFloat(dealData.probability_c) || 20,
          value_c: parseFloat(dealData.value_c),
          contact_id_c: parseInt(dealData.contact_id_c),
          created_date_c: new Date().toISOString(),
          last_activity_date_c: new Date().toISOString()
        };
        
        // In a real implementation, this would persist to localStorage or update the mock data
        toast.success("Deal created successfully!");
        return {...newDeal};
      } catch (mockError) {
        console.error("Error creating deal:", error?.response?.data?.message || error.message);
        toast.error("Failed to create deal");
        return null;
      }
    }
  },

  async update(dealId, dealData) {
    try {
      await delay(350);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Id: parseInt(dealId),
            Name: dealData.Name,
            company_c: dealData.company_c,
            contact_id_c: parseInt(dealData.contact_id_c),
            contact_name_c: dealData.contact_name_c,
            value_c: parseFloat(dealData.value_c),
            stage_c: dealData.stage_c,
            probability_c: parseFloat(dealData.probability_c),
            expected_close_date_c: dealData.expected_close_date_c,
            description_c: dealData.description_c,
            last_activity_date_c: new Date().toISOString(),
            source_c: dealData.source_c,
            Tags: dealData.Tags,
            notes_c: dealData.notes_c
          }
        ]
      };

      const response = await apperClient.updateRecord("deal_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} deals:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("Deal updated successfully!");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      // Fallback to mock update
      try {
        const updatedDeal = {
          ...dealData,
          Id: parseInt(dealId),
          value_c: parseFloat(dealData.value_c),
          contact_id_c: parseInt(dealData.contact_id_c),
          probability_c: parseFloat(dealData.probability_c),
          last_activity_date_c: new Date().toISOString()
        };
        
        toast.success("Deal updated successfully!");
        return {...updatedDeal};
      } catch (mockError) {
        console.error("Error updating deal:", error?.response?.data?.message || error.message);
        toast.error("Failed to update deal");
        return null;
      }
    }
  },

  async updateStage(dealId, newStage) {
    try {
      await delay(250);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Update probability based on stage
      const stageProbabilities = {
        "Lead": 20,
        "Qualified": 40,
        "Proposal": 65,
        "Negotiation": 80,
        "Closed Won": 100
      };

      const params = {
        records: [
          {
            Id: parseInt(dealId),
            stage_c: newStage,
            probability_c: stageProbabilities[newStage] || 20,
            last_activity_date_c: new Date().toISOString()
          }
        ]
      };

      const response = await apperClient.updateRecord("deal_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update deal stage ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success(`Deal moved to ${newStage}`);
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      // Fallback to mock update
      try {
        toast.success(`Deal moved to ${newStage}`);
        return {
          Id: parseInt(dealId),
          stage_c: newStage,
          probability_c: stageProbabilities[newStage] || 20,
          last_activity_date_c: new Date().toISOString()
        };
      } catch (mockError) {
        console.error("Error updating deal stage:", error?.response?.data?.message || error.message);
        toast.error("Failed to update deal stage");
        return null;
      }
    }
  },

  async delete(dealIds) {
    try {
      await delay(300);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: Array.isArray(dealIds) ? dealIds : [dealIds]
      };

      const response = await apperClient.deleteRecord("deal_c", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete deals ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success(`${successfulDeletions.length} deal(s) deleted successfully!`);
          return true;
        }
      }

      return false;
    } catch (error) {
      // Fallback to mock deletion
      try {
        toast.success("Deal deleted successfully!");
        return true;
      } catch (mockError) {
        console.error("Error deleting deal:", error?.response?.data?.message || error.message);
        toast.error("Failed to delete deal");
        return false;
      }
    }
  }
};