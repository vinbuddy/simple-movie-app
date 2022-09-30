import axios from 'axios';

// Create new axios
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Custom get method
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export default httpRequest;
