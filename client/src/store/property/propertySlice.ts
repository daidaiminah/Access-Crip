import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address?: string;
  type: 'house' | 'apartment' | 'room' | 'hotel' | 'motel' | 'event_center';
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  isApproved: boolean;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
  ownerId: string;
  avgRating?: number;
  reviewCount?: number;
}

interface PropertyState {
  selectedProperty: Property | null;
  filters: {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    search?: string;
  };
}

const initialState: PropertyState = {
  selectedProperty: null,
  filters: {},
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    setFilters: (state, action: PayloadAction<PropertyState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { setSelectedProperty, setFilters, clearFilters } = propertySlice.actions;
export default propertySlice.reducer;
