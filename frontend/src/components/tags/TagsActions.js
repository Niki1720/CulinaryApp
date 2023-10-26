import axios from 'axios';

export const loadTags = (callback) => {
    const config = {
        url: '/tags',
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};

export const getTag = (id, callback) => {
    const config = {
        url: `/tags/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};

export const saveTag = (data, callback) => {
    const url = data.id ? `/tags/${data.id}` : '/tags';
    const method = data.id ? 'PUT' : 'POST';

    const config = {
        url,
        method,
        data: {
            tag: data
        },
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};

export const deleteTag = (id, callback) => {
    const config = {
        method: 'delete',
        url: `/tags/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};
