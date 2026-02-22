import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    checkin: "",
    checkout: "",
    guests: ""
  });

  const handleSearch = () => {
    // Navigate to explore page with search params
    const params = new URLSearchParams();
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.checkin) params.set('checkin', searchData.checkin);
    if (searchData.checkout) params.set('checkout', searchData.checkout);
    if (searchData.guests) params.set('guests', searchData.guests);
    
    window.location.href = `/explore?${params.toString()}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Text */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200">
              Stay in Liberia
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto">
            Discover amazing properties across Liberia. From luxury homes to cozy apartments, 
            find your next home away from home.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Where</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Monrovia, Gbarnga..."
                  value={searchData.location}
                  onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchData.checkin}
                  onChange={(e) => setSearchData(prev => ({ ...prev, checkin: e.target.value }))}
                  className="pl-10 bg-white/20 border-white/30 text-white backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchData.checkout}
                  onChange={(e) => setSearchData(prev => ({ ...prev, checkout: e.target.value }))}
                  className="pl-10 bg-white/20 border-white/30 text-white backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder="2"
                  min="1"
                  value={searchData.guests}
                  onChange={(e) => setSearchData(prev => ({ ...prev, guests: e.target.value }))}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            variant="hero"
            size="lg"
            className="w-full sm:w-auto px-12"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Properties
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold">500+</div>
            <div className="text-white/80">Properties</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold">15+</div>
            <div className="text-white/80">Counties</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold">2,000+</div>
            <div className="text-white/80">Happy Guests</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
};