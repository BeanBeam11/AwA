import axios from 'axios';

const baseUrl = 'https://tripcan.herokuapp.com/';

// Auth
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

// Users
export const getCurrentUser = async ({ token }) => {
    try {
        const res = await axios.get(`${baseUrl}api/v1/users/me`, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const updateCurrentUser = async ({ token, photo, name }) => {
    try {
        const res = await axios.patch(
            `${baseUrl}api/v1/users/updateMe`,
            { photo, name },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

// Spots
export const getAllSpots = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/v1/spots`);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const getRecommendSpots = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/v1/spots?page=1&limit=10&sort=-image`);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const getCitySpots = async (city) => {
    switch (city) {
        case '臺北':
            city = '臺北市';
            break;
        case '新北':
            city = '新北市';
            break;
        case '基隆':
            city = '基隆市';
            break;
        case '宜蘭':
            city = '宜蘭縣';
            break;
        case '桃園':
            city = '桃園市';
            break;
        case '新竹':
            city = '新竹市';
            break;
        case '苗栗':
            city = '苗栗縣';
            break;
        case '臺中':
            city = '臺中市';
            break;
        case '彰化':
            city = '彰化縣';
            break;
        case '南投':
            city = '南投縣';
            break;
        case '雲林':
            city = '雲林縣';
            break;
        case '嘉義':
            city = '嘉義縣';
            break;
        case '臺南':
            city = '臺南市';
            break;
        case '高雄':
            city = '高雄市';
            break;
        case '屏東':
            city = '屏東縣';
            break;
        case '澎湖':
            city = '澎湖縣';
            break;
        case '花蓮':
            city = '花蓮縣';
            break;
        case '臺東':
            city = '臺東縣';
            break;
    }
    try {
        const res = await axios.get(`${baseUrl}api/v1/spots?city=${city}`);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

// Trips
export const getAllTrips = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/v1/trips?is_private=false`);
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const getUserTrips = async ({ token, userId }) => {
    try {
        const res = await axios.get(`${baseUrl}api/v1/trips?owner_id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const createUserTrip = async ({
    token,
    name,
    cover_image,
    start_date,
    end_date,
    duration,
    owner_id,
    owner_image,
}) => {
    try {
        const res = await axios.post(
            `${baseUrl}api/v1/trips`,
            { name, cover_image, start_date, end_date, duration, owner_id, owner_image },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};
