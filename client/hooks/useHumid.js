import { useState, useCallback } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useFocusEffect } from '@react-navigation/native';

const useHumid = () => {
    const [humid, setHumid] = useState();
    const axiosPrivate = useAxiosPrivate();
    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getHumid = async () => {
                try {
                    const res = await axiosPrivate.get('/humid', {
                        signal: controller.signal,
                    });
                    isMounted && setHumid(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getHumid();
            return () => {
                controller.abort();
                isMounted = false;
            };
        }, [])
    );
    return humid;
};

export default useHumid;
