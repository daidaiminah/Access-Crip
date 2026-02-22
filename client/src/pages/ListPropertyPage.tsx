import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, MapPin, DollarSign, Camera } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreatePropertyMutation } from "@/store/property/propertyApi";
import { toast } from "sonner";

const amenitiesList = [
  "WiFi", "Parking", "Air Conditioning", "Kitchen", "Washer", "TV",
  "Pool", "Gym", "Security", "Generator", "Garden", "Balcony"
];

export const ListPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    address: "",
    price: "",
    bedrooms: "1",
    bathrooms: "1",
    maxGuests: "2",
    amenities: [] as string[],
    images: [] as string[]
  });
  
  const [createProperty, { isLoading }] = useCreatePropertyMutation();
  const navigate = useNavigate();

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (urls: string[]) => {
    setFormData(prev => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.type || !formData.location || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const result = await createProperty({
        title: formData.title,
        description: formData.description,
        type: formData.type as any,
        location: formData.location,
        address: formData.address,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        maxGuests: parseInt(formData.maxGuests),
        amenities: formData.amenities,
      }).unwrap();

      if (result.success) {
        toast.success("Property listed successfully! Awaiting admin approval.");
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to list property";
      toast.error(errorMessage);
      console.error("Property creation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">List Your Property</h1>
            <p className="text-xl text-muted-foreground">
              Share your space with travelers and earn extra income
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="Beautiful villa in Sinkor"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property, its features, and what makes it special..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-2 min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="room">Room</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="motel">Motel</SelectItem>
                        <SelectItem value="event_center">Event Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Sinkor, Monrovia"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Full Address (Optional)</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street, Sinkor"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price per night (USD)</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="100"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="1"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="1"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxGuests">Maximum Guests</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    min="1"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxGuests: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <label
                        htmlFor={amenity}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload at least 1 photo. The first photo will be used as the cover image.
                </p>
                <ImageUpload
                  multiple={true}
                  maxFiles={10}
                  onUploadComplete={handleImageUpload}
                  existingImages={formData.images}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" className="px-12" disabled={isLoading}>
                {isLoading ? "Listing Property..." : "List My Property"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};