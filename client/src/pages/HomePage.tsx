import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  Search
} from "lucide-react";

const mockProperties = [
  {
    id: 1,
    title: "Luxury Villa in Sinkor",
    location: "Sinkor, Monrovia",
    price: 150,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop"],
    type: "Villa"
  },
  {
    id: 2, 
    title: "Cozy Apartment Downtown",
    location: "Central Monrovia",
    price: 85,
    rating: 4.6,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop"],
    type: "Apartment"
  },
  {
    id: 3,
    title: "Beachfront House",
    location: "West Point, Monrovia", 
    price: 200,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&h=300&fit=crop"],
    type: "House"
  }
];

export const HomePage = () => {
  const featuredProperties = mockProperties.slice(0, 3);

  const handleViewProperty = (id: number) => {
    console.log("View property:", id);
    // Navigate to property detail page
  };

  const handleFavoriteProperty = (id: number) => {
    console.log("Favorite property:", id);
    // Add to favorites
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation transparent />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Access Crip?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the best of Liberian hospitality with our trusted platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-card hover:bg-gradient-hover transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-hover">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure & Trusted</h3>
              <p className="text-muted-foreground">
                All properties are verified and owners are authenticated for your safety and peace of mind.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-card hover:bg-gradient-hover transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-hover">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Best Prices</h3>
              <p className="text-muted-foreground">
                Find competitive rates across Liberia with transparent pricing and no hidden fees.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-card hover:bg-gradient-hover transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-hover">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-muted-foreground">
                Connect with local hosts who know Liberia best and can enhance your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover handpicked accommodations across Liberia
              </p>
            </div>
            <Button variant="outline" size="lg" className="hidden sm:flex" asChild>
              <Link to="/explore">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onView={handleViewProperty}
                onFavorite={handleFavoriteProperty}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/explore">
                <Search className="w-5 h-5 mr-2" />
                Explore All Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore the most sought-after locations in Liberia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Monrovia",
                properties: 156,
                image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop"
              },
              {
                name: "Robertsport",
                properties: 42,
                image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop"
              },
              {
                name: "Gbarnga",
                properties: 28,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              },
              {
                name: "Buchanan",
                properties: 35,
                image: "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=400&h=300&fit=crop"
              }
            ].map((destination) => (
              <div 
                key={destination.name}
                className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                  <p className="text-white/80">{destination.properties} properties</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Host Your Property?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of property owners earning extra income by sharing their spaces 
            with travelers exploring beautiful Liberia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="xl" asChild>
              <Link to="/list-property">List Your Property</Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Access Crip</span>
              </div>
              <p className="text-gray-400">
                Connecting travelers with authentic Liberian hospitality.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                <Link to="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link to="/how-it-works" className="block hover:text-white transition-colors">How It Works</Link>
                <Link to="/safety" className="block hover:text-white transition-colors">Safety</Link>
                <Link to="/help-center" className="block hover:text-white transition-colors">Help Center</Link>
              </div>
            </div>

            {/* For Hosts */}
            <div>
              <h3 className="font-semibold mb-4">For Hosts</h3>
              <div className="space-y-2 text-gray-400">
                <Link to="/list-property" className="block hover:text-white transition-colors">List Your Property</Link>
                <Link to="/dashboard" className="block hover:text-white transition-colors">Host Resources</Link>
                <Link to="/community" className="block hover:text-white transition-colors">Community</Link>
                <Link to="/success-stories" className="block hover:text-white transition-colors">Success Stories</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>Monrovia, Liberia</p>
                <p>+231 XXX XXXX</p>
                <p>hello@accesscrip.com</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 my-8" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 Access Crip. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};