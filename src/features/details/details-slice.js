import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const loadCountryByName = createAsyncThunk(
    '@@details/load-country-by-name',
    (name, {
        extra: {axios, api}
    }) => {
        return axios.get(api.searchByCountry(name))
    }
)

export const loadNeighborsByBorder = createAsyncThunk(
    '@@details/load-neighbors-by-border',
    (borders, {
        extra: {axios, api}
    }) => {
        return axios.get(api.filterByCode(borders))
    }
)
const initialState = {
    status: 'idle',  // loading || received || rejected
    currentCountry: null,
    error: null,
    neighbors: [],
};

const detailsSlice = createSlice({
    name: '@@details',
    initialState,
    reducers: {
        clearDetails: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCountryByName.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountryByName.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
            })
            .addCase(loadCountryByName.fulfilled, (state, action) => {
                state.status = 'received';
                state.currentCountry = action.payload.data[0];
            })
            .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
                state.neighbors = action.payload.data.map(country => country.name);
            })
    }
});

export const {clearDetails} = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectDetails = state => state.details;
export const selectCurrentCountry = state => state.details.currentCountry;
export const selectNeighbors = state => state.details.neighbors;