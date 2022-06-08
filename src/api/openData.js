import axios from 'axios';

export const getSightsAPI = async () => {
    try {
        const res = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json');
        return res;
    } catch (err) {
        console.log(err);
    }
};
