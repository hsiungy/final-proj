import axios from 'axios';

const baseURL = 'https://api.foursquare.com/v2/venues/';
const keys = {
    client_id: '{YOUR_CLIENT_ID}',
    client_secret: '{YOUR_CLIENT_SECRET}',
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