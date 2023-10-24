import axios from "axios";

export const loadUsers = (callback) => {
    const config = {
        url: '/users',
    };
    axios.request(config).then(
        response => callback(response.data)
    );
}

export const getUser = (id, callback) => {
    const config = {
        url: `/users/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};

export const saveUser = (data, callback) => {
    const url = data.id ? `/users/${data.id}` : '/users';
    const method = data.id ? 'PUT' : 'POST';

    const config = {
        url,
        method,
        data: {
            user: data
        },
    };

    axios.request(config).then(response => callback(response.data));
};

export const deleteUser = (id, callback) => {
    const config = {
        method: 'delete',
        url: `/users/${id}`,
    };
    axios.request(config).then(
        response => callback(response.data)
    );
};