import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, MapPin, Users, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id: string | number;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  type?: string;
  layout?: "grid" | "list";
  onView?: (id: string | number) => void;
  onFavorite?: (id: string | number) => void;
  isFavorited?: boolean;
}

export const PropertyCard = ({ 
  id,
  title, 
  location, 
  price, 
  rating, 
  images,
  type = "Property",
  layout = "grid",
  onView,
  onFavorite,
  isFavorited = false
}: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(id);
  };

  const handleView = () => {
    if (onView) {
      onView(id);
    } else {
      window.location.href = `/property/${id}`;
    }
  };

  if (layout === "list") {
    return (
      <div 
        className="property-card group cursor-pointer bg-white rounded-lg border border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
        onClick={handleView}
      >
        <div className="flex">
          {/* Image */}
          <div className="relative w-48 h-32 overflow-hidden flex-shrink-0">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onLoad={() => setIsImageLoading(false)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            
            {/* Favorite Button */}
            <Button
              variant="glass"
              size="icon"
              onClick={handleFavorite}
              className={cn(
                "absolute top-2 right-2 w-6 h-6",
                isFavorited && "text-red-500"
              )}
            >
              <Heart className={cn("w-3 h-3", isFavorited && "fill-current")} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {location}
                </div>
              </div>
              {rating > 0 && (
                <div className="flex items-center text-sm">
                  <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{rating}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-xl font-bold text-foreground">
                  ${price}
                </span>
                <span className="text-muted-foreground ml-1">/ night</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/property/${id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="property-card group cursor-pointer bg-white rounded-lg border border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
      onClick={handleView}
    >
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
                isImageLoading && "opacity-0"
              )}
              onLoad={() => setIsImageLoading(false)}
            />
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="glass"
                  size="icon"
                  onClick={handlePrevImage}
                  className="w-8 h-8"
                >
                  <span className="sr-only">Previous image</span>
                  ←
                </Button>
                <Button
                  variant="glass"
                  size="icon"
                  onClick={handleNextImage}
                  className="w-8 h-8"
                >
                  <span className="sr-only">Next image</span>
                  →
                </Button>
              </div>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Favorite Button */}
        <Button
          variant="glass"
          size="icon"
          onClick={handleFavorite}
          className={cn(
            "absolute top-4 right-4 w-8 h-8",
            isFavorited && "text-red-500"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
        </Button>

        {/* Property Type Badge */}
        {type && (
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 bg-white/90 text-gray-900"
          >
            {type}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Location & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          {rating > 0 && (
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-foreground">
              ${price}
            </span>
            <span className="text-muted-foreground ml-1">/ night</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/property/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};