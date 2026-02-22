import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useGetPropertyQuery } from "@/store/property/propertyApi";
import { useCreateBookingMutation } from "@/store/booking/bookingApi";
import { toast } from "sonner";

const msPerDay = 1000 * 60 * 60 * 24;

const toDateOnly = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const diffDays = (start: string, end: string) => {
  const s = toDateOnly(new Date(start));
  const e = toDateOnly(new Date(end));
  return Math.round((e.getTime() - s.getTime()) / msPerDay);
};

export const BookingPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
    notes: "",
  });

  const { data, isLoading } = useGetPropertyQuery(propertyId ?? "", {
    skip: !propertyId,
  });

  const property = data?.property;

  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();

  const nights = useMemo(() => {
    if (!form.startDate || !form.endDate) return 0;
    const n = diffDays(form.startDate, form.endDate);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [form.startDate, form.endDate]);

  const total = useMemo(() => {
    if (!property) return 0;
    return nights * property.price;
  }, [nights, property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyId) {
      toast.error("Invalid property");
      return;
    }

    if (!form.startDate || !form.endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    if (nights <= 0) {
      toast.error("End date must be after start date");
      return;
    }

    if (!property) {
      toast.error("Property not found");
      return;
    }

    if (form.guests < 1) {
      toast.error("Guests must be at least 1");
      return;
    }

    if (form.guests > property.maxGuests) {
      toast.error(`Maximum guests for this property is ${property.maxGuests}`);
      return;
    }

    try {
      const result = await createBooking({
        propertyId,
        startDate: form.startDate,
        endDate: form.endDate,
        guests: form.guests,
        notes: form.notes || undefined,
      }).unwrap();

      if (result.success) {
        toast.success(result.message || "Booking created successfully");
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create booking");
      console.error("Create booking error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Confirm your booking</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
                    </div>
                  ) : !property ? (
                    <div className="text-center py-10">
                      <h2 className="text-xl font-semibold mb-2">Property not found</h2>
                      <Button onClick={() => navigate("/explore")}>Go to Explore</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={form.startDate}
                            onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                            className="mt-2"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                            className="mt-2"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="guests">Guests</Label>
                        <Input
                          id="guests"
                          type="number"
                          min={1}
                          max={property.maxGuests}
                          value={form.guests}
                          onChange={(e) => setForm((p) => ({ ...p, guests: Number(e.target.value) }))}
                          className="mt-2"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Max guests: {property.maxGuests}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Textarea
                          id="notes"
                          value={form.notes}
                          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                          className="mt-2"
                          placeholder="Any special requests or notes for the host"
                        />
                      </div>

                      <Separator />

                      <div className="flex gap-4 justify-end">
                        <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={isCreating}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isCreating || !property.isApproved}>
                          {isCreating ? "Booking..." : "Confirm booking"}
                        </Button>
                      </div>

                      {!property.isApproved ? (
                        <p className="text-sm text-muted-foreground">
                          This property is pending approval and cannot be booked yet.
                        </p>
                      ) : null}
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Price details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!property ? (
                    <div className="text-sm text-muted-foreground">Select a property to see pricing.</div>
                  ) : (
                    <>
                      <div className="flex gap-3">
                        {property.images?.[0] ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-20 h-20 rounded-md object-cover border"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-md bg-muted border" />
                        )}
                        <div className="min-w-0">
                          <div className="font-medium truncate">{property.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{property.location}</div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between text-sm">
                        <span>${property.price} x {nights || 0} night(s)</span>
                        <span>${total}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
