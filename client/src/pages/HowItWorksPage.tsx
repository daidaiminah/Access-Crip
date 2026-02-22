import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Home, Users, Shield, CheckCircle, Star } from "lucide-react";

export const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              How Access Crip Works
            </h1>
            <p className="text-xl text-muted-foreground">
              Simple steps to find your perfect accommodation in Liberia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Search & Discover</h3>
              <p className="text-muted-foreground">
                Browse through verified properties across Liberia. Use filters to find exactly what you're looking for.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Book Securely</h3>
              <p className="text-muted-foreground">
                Connect with verified hosts and book your stay with confidence through our secure platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Enjoy Your Stay</h3>
              <p className="text-muted-foreground">
                Experience authentic Liberian hospitality and create unforgettable memories.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/explore">Start Exploring</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};