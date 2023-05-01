import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useAxiosPrivate from './useAxiosPrivate';

export const useGetDevices = () => {
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
            const getAmount = async (type) => {
                try {
                    const res = await axiosPrivate.get(
                        `devices/${type}/amount`,
                        {
                            signal: controller.signal,
                        }
                    );

                    return res.data;
                } catch (err) {
                    console.log(err);
                }
            };

            let temp = devices;
            temp.forEach(async (device, index) => {
                const res = await getAmount(device.type);
                temp[index].amount = res?.amount;
                temp[index].enabled = res?.status;
            });
            isMounted && setDevices(temp);
            return () => {
                controller.abort();
                isMounted = false;
            };
        }, [])
    );
    return devices;
};

export const useGetAll = (type) => {
    const [list, setList] = useState({});
    const axiosPrivate = useAxiosPrivate();
    useFocusEffect(
        useCallback(() => {
            console.log('vao ko');
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
        }, [])
    );
    return list;
};
