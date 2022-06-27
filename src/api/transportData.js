import axios from 'axios';
import qs from 'qs';
import { TDX_CLIENT_ID, TDX_CLIENT_SECRET } from '@env';

const baseUrl = 'https://tdx.transportdata.tw/api/basic';

// Auth
export const getAccessToken = async () => {
    const data = {
        grant_type: 'client_credentials',
        client_id: TDX_CLIENT_ID,
        client_secret: TDX_CLIENT_SECRET,
    };

    try {
        const res = await axios.post(
            `https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token`,
            qs.stringify(data),
            { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        );
        return res;
    } catch (err) {
        console.log(err.response.data);
    }
};

// Tourism
export const getRecommendScenicSpots = async ({ accessToken }) => {
    const orderby = encodeURIComponent(`Picture/PictureUrl1 desc`);
    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const randomNum = getRandom(0, 1200);

    try {
        const res = await axios.get(
            `${baseUrl}/v2/Tourism/ScenicSpot?%24orderby=${orderby}&%24top=10&%24skip=${randomNum}&%24format=JSON`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return res;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const getCityScenicSpots = async ({ accessToken, city }) => {
    const orderby = encodeURIComponent(`Picture/PictureUrl1 desc`);
    const filter = encodeURIComponent(`contains(City,'${city}')`);

    try {
        const res = await axios.get(
            `${baseUrl}/v2/Tourism/ScenicSpot?%24filter=${filter}&%24orderby=${orderby}&%24top=10&%24format=JSON`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return res;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const searchScenicSpots = async ({ accessToken, keyword }) => {
    const orderby = encodeURIComponent(`Picture/PictureUrl1 desc`);
    const filter = encodeURIComponent(`contains(ScenicSpotName,'${keyword}')`);

    try {
        const res = await axios.get(
            `${baseUrl}/v2/Tourism/ScenicSpot?%24filter=${filter}&%24orderby=${orderby}&%24top=6&%24format=JSON`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return res.data;
    } catch (err) {
        console.log(err.response.data);
    }
};
