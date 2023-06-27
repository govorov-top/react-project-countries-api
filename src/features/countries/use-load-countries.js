import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {selectControls} from "../controls/controls-slice";
import {loadCountries, selectCountriesInfo, selectVisibleCountries} from "./countries-slice";

export const useLoadCountries = () => {
    const dispatch = useDispatch();
    const {search, region} = useSelector(selectControls);
    const countries = useSelector(state => selectVisibleCountries(state, {search,region}), shallowEqual);
    const {status, error, qty} = useSelector(selectCountriesInfo,shallowEqual);
    useEffect(() => {
        if (!qty)
            dispatch(loadCountries());
    },[qty, dispatch]);

    return [countries,status,error]
}