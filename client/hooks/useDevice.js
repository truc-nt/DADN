import { useEffect, useState } from "react";

import useAxiosPrivate from './useAxiosPrivate'

export const useGetAmount = (type) => {
    const [amount, setAmount] = useState({})
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAmount = async () => {
            try {
                const res = await axiosPrivate.get(`devices/amount/${type}`, 
                {
                    signal: controller.signal,
                })
                isMounted && setAmount(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAmount()
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    return amount
}

export const useGetAll = (type) => {
    const [list, setList] = useState({})
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getList = async () => {
            try {
                const res = await axiosPrivate.get(`devices/all/${type}`, 
                {
                    signal: controller.signal,
                })

                isMounted && setList(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getList()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    return list
}    

//export default useGetAmount