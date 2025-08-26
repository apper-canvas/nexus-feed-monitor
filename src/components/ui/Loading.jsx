import React from "react";

const Loading = ({ type = "table" }) => {
  if (type === "table") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded shimmer w-32"></div>
            <div className="h-10 bg-gray-200 rounded shimmer w-24"></div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="p-4 flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded shimmer w-24"></div>
              <div className="h-4 bg-gray-200 rounded shimmer w-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded shimmer w-20"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full shimmer"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded shimmer w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded shimmer w-12"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;