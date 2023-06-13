import CryptoJS from 'crypto-js'
import axios from './index';

export async function toLogin(username: string, password: string) {
    // 前端也对密码进行加密
    const hash = CryptoJS.SHA256(password);
    axios.post('/users/login', {
        password: hash.toString(CryptoJS.enc.Hex),  // 将结果转为16进制
        username
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
}