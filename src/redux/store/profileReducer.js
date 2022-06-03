import { SET_PROFILE_INFO } from "../constants";

// Part3: Define Reducers
const initialProfile = {
  info: {
    avatar: "https://firebasestorage.googleapis.com/v0/b/awa---trip-planner.appspot.com/o/logo_tripcan.png?alt=media&token=eb5cdb11-31a5-4c95-93a9-37273fbb4c58",
    name: "未設定",
    interest: "未填寫",
    type: "未設定",
    transportation: "未設定",
    gender: "未設定",
    age: "未設定"
  }
};

export const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
  
    case SET_PROFILE_INFO:
      return { ...state, info: {...action.payload} };
    
    default:
      return state;
  }
}
