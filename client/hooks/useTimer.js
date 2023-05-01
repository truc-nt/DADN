import { useState, useCallback } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useFocusEffect } from '@react-navigation/native';

const useGetTimers = (deviceId) => {
    const [timers, setTimers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getTimers = async () => {
                try {
                    const res = await axiosPrivate.get(`/timers/${deviceId}`, {
                        signal: controller.signal,
                    });
                    isMounted && setTimers(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getTimers();
            return () => {
                controller.abort();
                isMounted = false;
            };
        }, [])
    );
    return [timers, setTimers];
};

export default useGetTimers;
