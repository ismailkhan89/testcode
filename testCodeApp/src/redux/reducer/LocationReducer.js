import {
    PREVIOUS_LOCATION_LIST,
    PREVIOUS_LOCATION_LOADING,
    CURRENT_LOCATION_LOADING,
    CURRENT_LOCATION,
    CHECK_IN,
    CHECK_IN_LOADING
} from "../action/type";


const INITIAL_STATE = {
    prevLocationLoading: false,
    prevLocation: [],
    currentLocation: null,
    currentLoading: false,
    checkInLoading: false,
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PREVIOUS_LOCATION_LOADING:
            return {
                ...state,
                prevLocationLoading: action.payload,
            };
        case PREVIOUS_LOCATION_LIST:
            return {
                ...state,
                prevLocation: action.payload,
            };
        case CURRENT_LOCATION_LOADING:
            return {
                ...state,
                currentLoading: action.payload,
            };
        case CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload,
            };
        case CHECK_IN_LOADING:
            return {
                ...state,
                checkInLoading: action.payload,
            };
        case CHECK_IN:
            return {
                ...state,
                currentLocation: action.payload,
            };
        default:
            return state;
    }
};