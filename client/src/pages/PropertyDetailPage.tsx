import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Bed, Bath, ArrowLeft } from "lucide-react";
import { useGetPropertyQuery } from "@/store/property/propertyApi";

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPropertyQuery(id ?? "", {
    skip: !id,
  });

  const property = data?.property;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          ) : !property ? (
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold mb-3">Property not found</h1>
              <Button onClick={() => navigate("/explore")}>Go to Explore</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl font-bold">{property.title}</h1>
                    {!property.isApproved && <Badge variant="secondary">Pending Approval</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {property.images?.length ? (
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="col-span-2 h-80 w-full object-cover rounded-lg border"
                    />
                    {property.images.slice(1, 5).map((src: string, idx: number) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`${property.title} ${idx + 2}`}
                        className="h-40 w-full object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-80 rounded-lg border bg-muted flex items-center justify-center text-muted-foreground">
                    No images
                  </div>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>About this place</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{property.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-muted-foreground" />
                        <span>{property.bedrooms} bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-muted-foreground" />
                        <span>{property.bathrooms} bathrooms</span>
                      </div>
                    </div>

                    <Separator />

                    <p className="text-muted-foreground whitespace-pre-line">
                      {property.description}
                    </p>

                    {property.amenities?.length ? (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-3">Amenities</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {property.amenities.map((a: string) => (
                              <div key={a} className="text-muted-foreground">
                                {a}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Reserve</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold">${property.price}</div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => navigate(`/booking/${property.id}`)}
                      disabled={!property.isApproved}
                    >
                      {property.isApproved ? "Book now" : "Not available"}
                    </Button>

                    {!property.isApproved ? (
                      <p className="text-xs text-muted-foreground text-center">
                        This property can be booked after approval.
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
