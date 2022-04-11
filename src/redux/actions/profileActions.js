import { SET_PROFILE_INFO } from "../constants";

// Part2: Define Actions
export const setProfileInfo = (info) => (dispatch) => {
    dispatch({
        type: SET_PROFILE_INFO,
        payload: info,
    });
};