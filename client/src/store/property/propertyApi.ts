import { api } from '../api';

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
  createdAt?: string;
  updatedAt?: string;
}

interface PropertyFilters {
  page?: number;
  limit?: number;
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
}

interface PropertiesResponse {
  success: boolean;
  properties: Property[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface PropertyResponse {
  success: boolean;
  property: Property;
}

interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  location: string;
  address?: string;
  type: 'house' | 'apartment' | 'room' | 'hotel' | 'motel' | 'event_center';
  amenities?: string[];
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  latitude?: number;
  longitude?: number;
}

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<PropertiesResponse, PropertyFilters>({
      query: (filters) => ({
        url: '/properties',
        params: filters,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.properties.map(({ id }) => ({ type: 'Property' as const, id })),
              { type: 'Property', id: 'LIST' },
            ]
          : [{ type: 'Property', id: 'LIST' }],
    }),
    getProperty: builder.query<PropertyResponse, string>({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Property', id }],
    }),
    createProperty: builder.mutation<PropertyResponse, CreatePropertyRequest>({
      query: (propertyData) => ({
        url: '/properties',
        method: 'POST',
        body: propertyData,
      }),
      invalidatesTags: [{ type: 'Property', id: 'LIST' }],
    }),
    updateProperty: builder.mutation<PropertyResponse, { id: string; data: Partial<CreatePropertyRequest> }>({
      query: ({ id, data }) => ({
        url: `/properties/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Property', id },
        { type: 'Property', id: 'LIST' },
      ],
    }),
    deleteProperty: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Property', id: 'LIST' }],
    }),
    getOwnerProperties: builder.query<{ success: boolean; properties: Property[] }, void>({
      query: () => '/properties/owner/my-properties',
      providesTags: (result) =>
        result
          ? [
              ...result.properties.map(({ id }) => ({ type: 'Property' as const, id })),
              { type: 'Property', id: 'OWNER_LIST' },
            ]
          : [{ type: 'Property', id: 'OWNER_LIST' }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetOwnerPropertiesQuery,
} = propertyApi;
