import { SET_PROFILE_INFO } from "../constants";

// Part3: Define Reducers
const initialProfile = {
  info: {
    avatar: "https://github.com/BeanBeam11/AwA/blob/main/assets/icon.png?raw=true",
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
