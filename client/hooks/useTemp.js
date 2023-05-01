import { useState, useCallback } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useFocusEffect } from '@react-navigation/native';

const useTemp = () => {
    const [temp, setTemp] = useState();
    const axiosPrivate = useAxiosPrivate();
    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getTemp = async () => {
                try {
                    const res = await axiosPrivate.get('/temp', {
                        signal: controller.signal,
                    });
                    isMounted && setTemp(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getTemp();
            return () => {
                controller.abort();
                isMounted = false;
            };
        }, [])
    );
    return temp;
};

export default useTemp;
