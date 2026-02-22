import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface BookingState {
  currentBooking: {
    propertyId?: string;
    startDate?: string;
    endDate?: string;
    guests?: number;
    totalAmount?: number;
  } | null;
}

const initialState: BookingState = {
  currentBooking: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<BookingState['currentBooking']>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { setCurrentBooking, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
