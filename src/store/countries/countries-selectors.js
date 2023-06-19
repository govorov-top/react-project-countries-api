import { createSelector } from 'reselect';

const selectCountries = state => state.countries;

export const selectCountriesInfo = createSelector(
    selectCountries,
    countries => ({
        status: countries.status,
        error: countries.error,
        qty: countries.qty,
        list: countries.list
    })
);