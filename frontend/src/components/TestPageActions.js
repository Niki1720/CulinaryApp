import axios from 'axios';

export const loadRecords = (callback) => {
    const config = {
        url: '/estates'
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};