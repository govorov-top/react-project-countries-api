import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const loadCountries = createAsyncThunk(
    '@@countries/load-countries',
    (_, {
        extra: {axios, api}
    }) => {
        return axios.get(api.ALL_COUNTRIES)
    }
)
const initialState = {
    status: 'idle',  // loading || received || rejected
    error: null,
    list: [],
    qty: 0
};

const countriesSlice = createSlice({
    name: '@@countries',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
            })
            .addCase(loadCountries.fulfilled, (state, action) => {
                state.status = 'received';
                state.list = action.payload.data;
            })
    }
});

//export const {setSearch,setRegion,clearCountries} = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
export const selectCountriesInfo = state => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.qty,
});

export const selectVisibleCountries = (state, {search = '', region = ''}) =>
    state.countries.list.filter(
        country => country.name.toLowerCase().includes(search.toLowerCase())
            && country.region.includes(region)
    );