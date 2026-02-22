import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthInitializer } from "./components/AuthInitializer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ExplorePage } from "./pages/ExplorePage";
import { ListPropertyPage } from "./pages/ListPropertyPage";
import { AboutPage } from "./pages/AboutPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { SafetyPage } from "./pages/SafetyPage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { CommunityPage } from "./pages/CommunityPage";
import { SuccessStoriesPage } from "./pages/SuccessStoriesPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { CookiesPage } from "./pages/CookiesPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { BookingPage } from "./pages/BookingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthInitializer>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/list-property" 
                element={
                  <ProtectedRoute allowedRoles={['owner', 'admin']}>
                    <ListPropertyPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/booking/:propertyId" 
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthInitializer>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
