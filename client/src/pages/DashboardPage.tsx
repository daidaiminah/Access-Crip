import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Users, 
  Eye, 
  Edit,
  Trash2,
  Star,
  MapPin 
} from "lucide-react";

import { useAppSelector } from "@/store/hooks";
import { useGetOwnerPropertiesQuery } from "@/store/property/propertyApi";
import { useGetCustomerBookingsQuery, useGetOwnerBookingsQuery } from "@/store/booking/bookingApi";

export const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isOwner = user?.role === "owner" || user?.role === "admin";

  const {
    data: ownerPropertiesData,
    isLoading: isOwnerPropertiesLoading,
  } = useGetOwnerPropertiesQuery(undefined, { skip: !isOwner });

  const {
    data: customerBookingsData,
    isLoading: isCustomerBookingsLoading,
  } = useGetCustomerBookingsQuery(undefined, { skip: isOwner });

  const {
    data: ownerBookingsData,
    isLoading: isOwnerBookingsLoading,
  } = useGetOwnerBookingsQuery(undefined, { skip: !isOwner });

  const properties = ownerPropertiesData?.properties ?? [];
  const bookings = (isOwner ? ownerBookingsData?.bookings : customerBookingsData?.bookings) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your properties and bookings</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Home className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">{isOwner ? properties.length : 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">This Month Bookings</p>
                    <p className="text-2xl font-bold">{bookings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold">$0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Guests</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={isOwner ? "properties" : "bookings"} className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">My Properties</h2>
                <Button>Add New Property</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {!isOwner ? (
                  <Card>
                    <CardContent className="p-6 text-muted-foreground">
                      Your account doesn’t have properties.
                    </CardContent>
                  </Card>
                ) : isOwnerPropertiesLoading ? (
                  <Card>
                    <CardContent className="p-6 text-muted-foreground">Loading properties...</CardContent>
                  </Card>
                ) : properties.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-muted-foreground">No properties yet.</CardContent>
                  </Card>
                ) : (
                  properties.map((property) => (
                    <Card key={property.id}>
                      <CardContent className="p-6">
                        <div className="flex space-x-4">
                          <img 
                            src={property.images?.[0] || "/placeholder.svg"} 
                            alt={property.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{property.title}</h3>
                              <Badge variant={property.isApproved ? "default" : "secondary"}>
                                {property.isApproved ? "approved" : "pending"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {property.location}
                            </p>
                            <p className="text-lg font-bold">${property.price}/night</p>
                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                              {typeof property.avgRating === "number" && property.avgRating > 0 ? (
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  {property.avgRating}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/property/${property.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" disabled>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" disabled>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <h2 className="text-2xl font-semibold">Recent Bookings</h2>
              
              <div className="space-y-4">
                {(isOwner ? isOwnerBookingsLoading : isCustomerBookingsLoading) ? (
                  <Card>
                    <CardContent className="p-6 text-muted-foreground">Loading bookings...</CardContent>
                  </Card>
                ) : bookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-muted-foreground">No bookings yet.</CardContent>
                  </Card>
                ) : (
                  bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold mb-1">
                              {booking.property?.title || booking.propertyId}
                            </h3>
                            {isOwner ? (
                              <p className="text-muted-foreground mb-2">
                                Guest: {booking.customer?.name || booking.customerId}
                              </p>
                            ) : null}
                            <p className="text-sm text-muted-foreground">
                              {booking.startDate} to {booking.endDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                            <p className="text-lg font-bold mt-2">${booking.totalAmount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="space-y-6">
              <h2 className="text-2xl font-semibold">Earnings Overview</h2>
              
              {/* Add earnings content here */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">$620</p>
                    <p className="text-sm text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Last Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$540</p>
                    <p className="text-sm text-muted-foreground">8 bookings</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$1,240</p>
                    <p className="text-sm text-muted-foreground">Since joining</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};