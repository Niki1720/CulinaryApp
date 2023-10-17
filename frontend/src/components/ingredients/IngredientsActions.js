import axios from 'axios';

export const loadIngredients = (callback) => {
    const config = {
        url: '/ingredients',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const getIngredient = (id, callback) => {
    const config = {
        url: `/ingredients/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const saveIngredient = (data, callback) =>  {
    const config = {
        url: data.id ? `/ingredients/${data.id}` : '/ingredients',
        method: data.id ? 'PUT' : 'POST',
        data: {
            ingredient: data
        },
    };
    axios.request(config).then(
      response => callback(response.data)
    );
};

export const deleteIngredient = (id, callback) => {
    const config = {
        method: 'delete',
        url: `/ingredients/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};
