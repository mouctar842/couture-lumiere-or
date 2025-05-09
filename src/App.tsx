
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClientsPage from "./pages/ClientsPage";
import ArchivesPage from "./pages/ArchivesPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import AddClientPage from "./pages/AddClientPage";
import EditClientPage from "./pages/EditClientPage";
import NotFound from "./pages/NotFound";
import MarqueeText from "./components/MarqueeText";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MarqueeText text="☆彡 DIS MERCI A MOUCTAR ☆彡 " />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/new" element={<AddClientPage />} />
          <Route path="/clients/:id" element={<ClientDetailPage />} />
          <Route path="/clients/edit/:id" element={<EditClientPage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
