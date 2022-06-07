import axios from 'axios';

const baseUrl = 'https://tripcan.herokuapp.com/';

export const login = async ({ email, password }) => {
    try {
        const res = await axios.post(`${baseUrl}api/v1/users/login`, { email, password });
        return res;
    } catch (err) {
        console.log(err.response.data);
        alert('登入失敗 (|||ﾟдﾟ)：請檢查帳號密碼是否正確！');
    }
};

export const signup = async ({ name, email, password, passwordConfirm }) => {
    try {
        const res = await axios.post(`${baseUrl}api/v1/users/signup`, { name, email, password, passwordConfirm });
        return res;
    } catch (err) {
        console.log(err.response.data);
        const { message } = err.response.data;
        alert('註冊失敗 Σ(°Д°;（錯誤訊息： ' + message + '）');
    }
};
