import axios from 'axios';

// 设置基本地址
axios.defaults.baseURL = 'http://localhost:3030';
// 设置响应拦截器，脱落外层包装
axios.interceptors.response.use(res => res.data);

export default axios;