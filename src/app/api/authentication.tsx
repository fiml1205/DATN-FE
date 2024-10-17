import { callApi } from '@/utilities/functions'
import Cookies from 'js-cookie';

export const loginApi = async (data: any) => {
    try {
        const response = await callApi('POST', 'users/login', data);
        Cookies.set('SSToken', response.data.SSToken, { expires: 30 });
        window.location.reload()
    } catch (error) {
        throw error;
    }
}

export const registerApi = async (data: any) => {
    try {
        const response = await callApi('POST', 'users/register', data);
        Cookies.set('SSToken', response.data.SSToken, { expires: 30 });
        window.location.reload()
    } catch (error) {
        throw error;
    }
}