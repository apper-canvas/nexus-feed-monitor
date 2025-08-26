import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ title, value, change, icon, trend = "up", gradient = false }) => {
  const trendColor = trend === "up" ? "text-accent-500" : trend === "down" ? "text-red-500" : "text-gray-500";
  
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className={`text-2xl font-bold ${gradient ? 'bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent' : 'text-gray-900'}`}>
              {value}
            </h3>
            {change && (
              <div className={`flex items-center space-x-1 ${trendColor}`}>
                <ApperIcon 
                  name={trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"} 
                  size={16} 
                />
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-3 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100">
            <ApperIcon name={icon} size={24} className="text-primary-600" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;