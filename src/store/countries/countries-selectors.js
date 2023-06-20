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