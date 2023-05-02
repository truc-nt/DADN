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
                    isMounted &&
                        setTimers(
                            res.data.sort((a, b) => {
                                const aDate = new Date(a.from);
                                const bDate = new Date(b.from);
                                const aTime =
                                    aDate.getHours() * 60 + aDate.getMinutes();
                                const bTime =
                                    bDate.getHours() * 60 + bDate.getMinutes();
                                if (aTime < bTime) {
                                    return -1;
                                } else if (aTime > bTime) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })
                        );
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
