import axios from 'axios';

const baseURL = 'https://api.foursquare.com/v2/venues/';
const keys = {
    client_id: '1IKFMHXSR15H0FFC1XBLXX2OAVZQENSZOZCD54LGQNBKIYLI',
    client_secret: 'BEKO0XUZNGDZMETMECR4A1DCMBBD5GI3LPBVXTQ1GFRRCFH4',
    v: '20190109'
};

export default class FoursquareAPI {
    static search(params) {
        return axios.get(baseURL+'/search?' + new URLSearchParams({...keys, ...params}))
                .then(response => {
                    return response;
                })
                .catch(err => {
                    console.log(err);
                });
    }
}