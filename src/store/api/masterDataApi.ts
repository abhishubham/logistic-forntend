import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Country,
  City,
  PortAirport,
  Carrier,
  Commodity,
  Party,
  CreateCountryDto,
  CreateCityDto,
  CreatePortAirportDto,
  CreateCarrierDto,
  CreateCommodityDto,
  CreatePartyDto,
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
  CountrySearchParams,
  CitySearchParams,
  PortAirportSearchParams,
  CarrierSearchParams,
  CommoditySearchParams,
  PartySearchParams,
} from '@/types';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const masterDataApi = createApi({
  reducerPath: 'masterDataApi',
  baseQuery,
  tagTypes: ['Country', 'City', 'PortAirport', 'Carrier', 'Commodity', 'Party'],
  endpoints: (builder) => ({
    // Countries
    getCountries: builder.query<ApiResponse<PaginatedResponse<Country>>, PaginationParams>({
      query: (params) => ({
        url: '/master/countries',
        params,
      }),
      providesTags: ['Country'],
    }),
    searchCountries: builder.query<ApiResponse<PaginatedResponse<Country>>, CountrySearchParams>({
      query: (params) => ({
        url: '/master/countries/search',
        params,
      }),
      providesTags: ['Country'],
    }),
    getCountryById: builder.query<ApiResponse<Country>, number>({
      query: (id) => `/master/countries/${id}`,
      providesTags: ['Country'],
    }),
    createCountry: builder.mutation<ApiResponse<Country>, CreateCountryDto>({
      query: (data) => ({
        url: '/master/countries',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Country'],
    }),

    // Cities
    getCities: builder.query<ApiResponse<PaginatedResponse<City>>, PaginationParams>({
      query: (params) => ({
        url: '/master/cities',
        params,
      }),
      providesTags: ['City'],
    }),
    searchCities: builder.query<ApiResponse<PaginatedResponse<City>>, CitySearchParams>({
      query: (params) => ({
        url: '/master/cities/search',
        params,
      }),
      providesTags: ['City'],
    }),
    getCityById: builder.query<ApiResponse<City>, number>({
      query: (id) => `/master/cities/${id}`,
      providesTags: ['City'],
    }),
    createCity: builder.mutation<ApiResponse<City>, CreateCityDto>({
      query: (data) => ({
        url: '/master/cities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['City'],
    }),

    // Ports/Airports
    getPortsAirports: builder.query<ApiResponse<PaginatedResponse<PortAirport>>, PaginationParams>({
      query: (params) => ({
        url: '/master/ports-airports',
        params,
      }),
      providesTags: ['PortAirport'],
    }),
    searchPortsAirports: builder.query<ApiResponse<PaginatedResponse<PortAirport>>, PortAirportSearchParams>({
      query: (params) => ({
        url: '/master/ports-airports/search',
        params,
      }),
      providesTags: ['PortAirport'],
    }),
    getPortAirportById: builder.query<ApiResponse<PortAirport>, number>({
      query: (id) => `/master/ports-airports/${id}`,
      providesTags: ['PortAirport'],
    }),
    createPortAirport: builder.mutation<ApiResponse<PortAirport>, CreatePortAirportDto>({
      query: (data) => ({
        url: '/master/ports-airports',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PortAirport'],
    }),

    // Carriers
    getCarriers: builder.query<ApiResponse<PaginatedResponse<Carrier>>, PaginationParams>({
      query: (params) => ({
        url: '/master/carriers',
        params,
      }),
      providesTags: ['Carrier'],
    }),
    searchCarriers: builder.query<ApiResponse<PaginatedResponse<Carrier>>, CarrierSearchParams>({
      query: (params) => ({
        url: '/master/carriers/search',
        params,
      }),
      providesTags: ['Carrier'],
    }),
    getCarrierById: builder.query<ApiResponse<Carrier>, number>({
      query: (id) => `/master/carriers/${id}`,
      providesTags: ['Carrier'],
    }),
    createCarrier: builder.mutation<ApiResponse<Carrier>, CreateCarrierDto>({
      query: (data) => ({
        url: '/master/carriers',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Carrier'],
    }),

    // Commodities
    getCommodities: builder.query<ApiResponse<PaginatedResponse<Commodity>>, PaginationParams>({
      query: (params) => ({
        url: '/master/commodities',
        params,
      }),
      providesTags: ['Commodity'],
    }),
    searchCommodities: builder.query<ApiResponse<PaginatedResponse<Commodity>>, CommoditySearchParams>({
      query: (params) => ({
        url: '/master/commodities/search',
        params,
      }),
      providesTags: ['Commodity'],
    }),
    getCommodityById: builder.query<ApiResponse<Commodity>, number>({
      query: (id) => `/master/commodities/${id}`,
      providesTags: ['Commodity'],
    }),
    createCommodity: builder.mutation<ApiResponse<Commodity>, CreateCommodityDto>({
      query: (data) => ({
        url: '/master/commodities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Commodity'],
    }),

    // Parties
    getParties: builder.query<ApiResponse<PaginatedResponse<Party>>, PaginationParams>({
      query: (params) => ({
        url: '/master/parties',
        params,
      }),
      providesTags: ['Party'],
    }),
    searchParties: builder.query<ApiResponse<PaginatedResponse<Party>>, PartySearchParams>({
      query: (params) => ({
        url: '/master/parties/search',
        params,
      }),
      providesTags: ['Party'],
    }),
    getPartyById: builder.query<ApiResponse<Party>, number>({
      query: (id) => `/master/parties/${id}`,
      providesTags: ['Party'],
    }),
    createParty: builder.mutation<ApiResponse<Party>, CreatePartyDto>({
      query: (data) => ({
        url: '/master/parties',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Party'],
    }),
  }),
});

export const {
  // Countries
  useGetCountriesQuery,
  useSearchCountriesQuery,
  useGetCountryByIdQuery,
  useCreateCountryMutation,
  
  // Cities
  useGetCitiesQuery,
  useSearchCitiesQuery,
  useGetCityByIdQuery,
  useCreateCityMutation,
  
  // Ports/Airports
  useGetPortsAirportsQuery,
  useSearchPortsAirportsQuery,
  useGetPortAirportByIdQuery,
  useCreatePortAirportMutation,
  
  // Carriers
  useGetCarriersQuery,
  useSearchCarriersQuery,
  useGetCarrierByIdQuery,
  useCreateCarrierMutation,
  
  // Commodities
  useGetCommoditiesQuery,
  useSearchCommoditiesQuery,
  useGetCommodityByIdQuery,
  useCreateCommodityMutation,
  
  // Parties
  useGetPartiesQuery,
  useSearchPartiesQuery,
  useGetPartyByIdQuery,
  useCreatePartyMutation,
} = masterDataApi;
