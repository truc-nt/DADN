import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useAxiosPrivate from './useAxiosPrivate';

export const useGetDevices = (refreshing) => {
    const axiosPrivate = useAxiosPrivate();
    const [devices, setDevices] = useState([
        {
            icon: 'lightbulb-outline',
            name: 'Đèn',
            type: 'light',
        },
        {
            icon: 'fan',
            name: 'Quạt',
            type: 'fan',
        },
        {
            icon: 'bell-alert-outline',
            name: 'Chống trộm',
            type: 'siren',
        },
    ]);

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getAmount = async () => {
                try {
                    const res = await axiosPrivate.get(`devices/amount`, {
                        signal: controller.signal,
                    });
                    let newDevices = [...devices];
                    newDevices.forEach((device) => {
                        device['amount'] = res.data[device.type]['amount'];
                        device['enabled'] = res.data[device.type]['enabled'];
                    });
                    isMounted && setDevices(newDevices);
                    //return res.data;
                } catch (err) {
                    console.log(err);
                }
            };
            getAmount();
            return () => {
                controller.abort();
                isMounted = false;
            };
        }, [refreshing])
    );
    return [devices, setDevices];
};

export const useGetList = (type, refreshing) => {
    const [list, setList] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getList = async () => {
                try {
                    const res = await axiosPrivate.get(`devices/${type}/all`, {
                        signal: controller.signal,
                    });

                    isMounted && setList(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getList();

            return () => {
                isMounted = false;
                controller.abort();
            };
        }, [refreshing])
    );
    return list;
};

export const useGetDevice = (id, refreshing) => {
    const axiosPrivate = useAxiosPrivate();
    const [detail, setDetail] = useState({});

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getDevice = async () => {
                try {
                    const res = await axiosPrivate.get(`devices/${id}`, {
                        signal: controller.signal,
                    });
                    isMounted && setDetail(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getDevice();
            return () => {
                controller.abort();
                isMounted = false;
            };
        }, [refreshing])
    );
    return [detail, setDetail];
};
