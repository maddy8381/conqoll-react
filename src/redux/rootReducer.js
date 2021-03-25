
import { combineReducers } from 'redux'
import cityReducer from './cities/cityReducer'

const rootReducer = combineReducers({
    cities: cityReducer
})

export default rootReducer;
