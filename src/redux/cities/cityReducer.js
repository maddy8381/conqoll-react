import { FETCH_CITIES, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, REMOVE_CITY, SHORTLIST_TOGGLE } from "./cityTypes"

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

        case SHORTLIST_TOGGLE:
            const cityIndex = [...state.cities].findIndex(
                (city) => city.Id === action.payload
            );
            const clonedCity = [...state.cities];
            clonedCity[cityIndex].isShortlisted = !clonedCity[cityIndex].isShortlisted;

            return {
                ...state,
                cities: clonedCity
            };

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