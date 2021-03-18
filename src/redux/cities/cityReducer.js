import { FETCH_CITIES, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, REMOVE_CITY, SHORTLIST_CITY, REMOVE_SHORTLISTED_CITY } from "./cityTypes"

const initialState = {
    loading: false,
    cities: [],
    error: ''
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_DATA_SUCCESS:
            return {
                loading: false,
                cities: action.payload,
                error: ''
            }

        case FETCH_DATA_FAILURE:
            return {
                loading: false,
                cities: [],
                error: action.payload
            }

        case FETCH_CITIES:
            return {
                ...state,
                error: ''
            };

        case SHORTLIST_CITY:
            let cityIndex = [...state.cities].findIndex(
                (city) => city.Id === action.payload
            );
            let clonedCity = [...state.cities];
            clonedCity[cityIndex].isShortlisted = true;

            return {
                ...state,
                cities: clonedCity
            };

        case REMOVE_SHORTLISTED_CITY:
            let cityIndex1 = [...state.cities].findIndex(
                (city) => city.Id === action.payload
            );
            let clonedCity1 = [...state.cities];
            clonedCity1[cityIndex1].isShortlisted = false;

            return {
                ...state,
                cities: clonedCity1
            }

        case REMOVE_CITY:
            return {
                ...state,
                cities: state.cities.filter(
                    city => city.Id !== action.payload
                )
            };

        default:
            return state;
    }
}

export default reducer;