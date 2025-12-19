const API = (path) => `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/${path}`;
export default API;
