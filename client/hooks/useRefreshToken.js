import React from 'react';
import useAuth from './useAuth';
import axiosPrivate from '../api/axios';
import axios from '../api/axios';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const res = await axiosPrivate.post('/refresh', {
                refreshToken: auth.refreshToken,
            });

            setAuth((prev) => {
                return { ...prev, accessToken: res.data.accessToken };
            });
            return res.data.accessToken;
        } catch (err) {
            console.log(err);
            /*await axiosPrivate.post(`/logout`, {
                refreshToken: auth.refreshToken,
            });*/
            await setAuth({});
            await AsyncStorage.removeItem('user');
        }
    };
    return refresh;
};

export default useRefreshToken;
