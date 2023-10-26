import axios from 'axios';

export const loadIngredients = (callback) => {
    const config = {
        url: '/ingredients',
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};

export const getIngredient = (id, callback) => {
    const config = {
        url: `/ingredients/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};

export const saveIngredient = (data, callback) => {
    const url = data.id ? `/ingredients/${data.id}` : '/ingredients';
    const method = data.id ? 'PUT' : 'POST';

    const config = {
        url,
        method,
        data: {
            ingredient: data
        },
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });
};

export const deleteIngredient = (id, callback) => {
    const config = {
        method: 'delete',
        url: `/ingredients/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data, null)
    ).catch(error => {
        callback(null, error);
    });;
};
