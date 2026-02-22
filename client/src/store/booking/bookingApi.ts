import { api } from '../api';

interface Booking {
  id: string;
  propertyId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  property?: {
    id: string;
    title: string;
    location: string;
    images: string[];
  };
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

interface CreateBookingRequest {
  propertyId: string;
  startDate: string;
  endDate: string;
  guests: number;
  notes?: string;
}

interface BookingResponse {
  success: boolean;
  message?: string;
  booking: Booking;
}

interface BookingsResponse {
  success: boolean;
  bookings: Booking[];
}

interface UpdateBookingStatusRequest {
  id: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, CreateBookingRequest>({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    getCustomerBookings: builder.query<BookingsResponse, void>({
      query: () => '/bookings/customer',
      providesTags: (result) =>
        result
          ? [
              ...result.bookings.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),
    getOwnerBookings: builder.query<BookingsResponse, void>({
      query: () => '/bookings/owner',
      providesTags: (result) =>
        result
          ? [
              ...result.bookings.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking', id: 'OWNER_LIST' },
            ]
          : [{ type: 'Booking', id: 'OWNER_LIST' }],
    }),
    updateBookingStatus: builder.mutation<BookingResponse, UpdateBookingStatusRequest>({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
        { type: 'Booking', id: 'OWNER_LIST' },
      ],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetCustomerBookingsQuery,
  useGetOwnerBookingsQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
