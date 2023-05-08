import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useAxiosPrivate from './useAxiosPrivate';

export default useWeather = () => {
    const axiosPrivate = useAxiosPrivate();
    const [weather, setWeather] = useState()
    useFocusEffect(
        useCallback(() => {
            const getWeather = async () => {
                try {
                    const res = await axiosPrivate.get(
                        `/weather`,
                    );
                    setWeather(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getWeather()
        }, [])
    );
    return weather;
}