import CryptoJS from 'crypto-js'
import axios from './index';
import { IResult } from './type';

export function toLogin(username: string, password: string) {
    // 前端也对密码进行加密
    const hash = CryptoJS.SHA256(password);
    return axios.post<IResult>('/users/login', {
        password: hash.toString(CryptoJS.enc.Hex),  // 将结果转为16进制
        username
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function toRegistry(username: string, password: string, confirmPassword: string) {
    const hash1 = CryptoJS.SHA256(password);
    const hash2 = CryptoJS.SHA256(confirmPassword);
    return axios.post<IResult>('/users/registry', {
        username,
        password: hash1.toString(CryptoJS.enc.Hex),
        confirmPassword: hash2.toString(CryptoJS.enc.Hex)
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}