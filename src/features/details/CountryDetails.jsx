import {Info} from "../../components/Info";
import {useDetails} from "./use-details";

export const CountryDetails = ({name = '',navigate}) => {
    const {currentCountry,error,status} = useDetails(name);

    return (
        <>
            {!currentCountry && status === 'received' && <h2>Not found...</h2>}
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>Can't fetch data</h2>}

            {status === 'received' && currentCountry && (
                <Info push={navigate} {...currentCountry} />
            )}
        </>
    )
}