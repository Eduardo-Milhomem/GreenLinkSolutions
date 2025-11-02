import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Home from "@/pages/Home";
import ProductsByCategory from "@/pages/ProductsByCategory";
import Cart from "@/pages/Cart";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminPanel from "@/pages/AdminPanel";
import AdminProducts from "@/pages/AdminProducts";
import NotFound from "@/pages/not-found";
import WhatsAppButton from "@/components/WhatsAppButton";
import { seedDatabase } from "./lib/seed";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collection/:slug" component={ProductsByCategory} />
      <Route path="/cart" component={Cart} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Seed database on first load
    seedDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <WhatsAppButton />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
