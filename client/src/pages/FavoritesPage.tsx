import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";

const mockFavorites = [
  {
    id: 1,
    title: "Luxury Villa in Sinkor",
    location: "Sinkor, Monrovia",
    price: 150,
    rating: 4.8,
    images: ["/placeholder.svg"]
  },
  {
    id: 3,
    title: "Beachfront House",
    location: "West Point, Monrovia",
    price: 200,
    rating: 4.9,
    images: ["/placeholder.svg"]
  },
  {
    id: 5,
    title: "Event Center Space",
    location: "Paynesville, Monrovia",
    price: 300,
    rating: 4.5,
    images: ["/placeholder.svg"]
  }
];

export const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              Properties you've saved for later
            </p>
          </div>

          {/* Favorites Grid */}
          {mockFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockFavorites.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start exploring properties and save your favorites by clicking the heart icon
              </p>
              <Button size="lg" asChild>
                <Link to="/explore">
                  <Search className="w-4 h-4 mr-2" />
                  Explore Properties
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};