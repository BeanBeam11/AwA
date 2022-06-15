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
