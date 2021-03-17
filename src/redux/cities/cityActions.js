import { FETCH_CITIES_FAILURE, FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS } from "./cityTypes"
import axios from 'axios';

export const fetchCitiesRequest = () => {
    return {
        type: FETCH_CITIES_REQUEST
    }
}

const fetchCitiesSuccess = cities => {
    return {
        type: FETCH_CITIES_SUCCESS,
        payload: cities
    }
}

const fetchCitiesFailure = error => {
    return {
        type: FETCH_CITIES_FAILURE,
        payload: error
    }
}

export const fetchCities = () => {
    return (dispatch) => {
        dispatch(fetchCitiesRequest);

        axios.get('https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json')
            .then(response => {
                const cities = response.data
                dispatch(fetchCitiesSuccess(cities));
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchCitiesFailure(errorMsg));
            })
    }
}