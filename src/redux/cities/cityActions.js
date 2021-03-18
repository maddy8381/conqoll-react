import { FETCH_CITIES, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, REMOVE_CITY, REMOVE_SHORTLISTED_CITY, SHORTLIST_CITY } from "./cityTypes"
import axios from 'axios';

export const fetchCitiesRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

const fetchCitiesSuccess = cities => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: cities
    }
}

const fetchCitiesFailure = error => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}


const addProperties = (cities) => {
    let counter = 0;
    for (const obj of cities) {
        obj.isShortlisted = false;
        obj.Id = counter++;
    }
}

export const fetchData = () => {
    return (dispatch) => {
        dispatch(fetchCitiesRequest);

        axios.get('https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json')
            .then(response => {
                const cities = response.data
                addProperties(cities);
                console.log(cities);
                dispatch(fetchCitiesSuccess(cities));
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchCitiesFailure(errorMsg));
            })
    }
}

export const fetchCities = () => {
    return {
        type: FETCH_CITIES
    }
}

export const shortlistCity = (id) => {
    return {
        type: SHORTLIST_CITY,
        payload: id
    }
}
export const removeShortlistedCity = (id) => {
    return {
        type: REMOVE_SHORTLISTED_CITY,
        payload: id
    }
}
export const removeCity = (id) => {
    return {
        type: REMOVE_CITY,
        payload: id
    };
};
