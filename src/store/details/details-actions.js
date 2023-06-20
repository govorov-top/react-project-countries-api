export const SET_COUNTRY = '@@details/SET_COUNTRY';
export const SET_LOADING =   '@@details/SET_LOADING';
export const SET_ERROR =     '@@details/SET_ERROR';
export const CLEAR_DETAILS =     '@@details/CLEAR_CONTROLS';
export const SET_NEIGHBORS =     '@@details/SET_NEIGHBORS';

export const setCountry = (country) => ({
    type: SET_COUNTRY,
    payload: country
});

const setNeighbors = (countries) => ({
    type: SET_NEIGHBORS,
    payload: countries
});

const setLoading = () => ({
    type: SET_LOADING
});

const setError = (error) => ({
    type: SET_ERROR,
    payload: error
});

export const clearDetails = () => ({
    type: CLEAR_DETAILS
});

export const loadCountryByName = (name) => (dispatch, _, {axios, api}) => {
    dispatch(setLoading());
    axios.get(api.searchByCountry(name))
        .then(({data}) => dispatch(setCountry(data[0])))
        .catch((error) => dispatch(setError(error)))
}

export const loadNeighborsByBorder = (borders) => (dispatch, _, {axios, api}) => {
    //dispatch(setLoading());
    axios.get(api.filterByCode(borders))
        .then(({data}) => dispatch(setNeighbors(data.map(c => c.name))))
        .catch((error) => console.log(error)) // dispatch(setError(error))
}