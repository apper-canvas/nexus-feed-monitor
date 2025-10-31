import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/organisms/Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet context={{ sidebarOpen, handleMenuClick }} />
          </div>
        </main>
      </div>
    </div>
  );
}