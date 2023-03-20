import { useEffect, useState } from "react";
import axios from '../api/axios'
import useAuth from './useAuth'

const useGetAmount = (device) => {
    const [amount, setAmount] = useState()
    const {auth, setAuth} = useAuth({})
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAmount = async () => {
            try {
                const res = await axios.get(`device/amount/${device}`, 
                {
                    headers: { authorization: `JWT ${auth.accessToken}`},
                    signal: controller.signal,
                })
                isMounted && setAmount(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAmount()
    }, [])
    return amount
}

export const updateStatusAll = async (device, status) => {
    try {
        const res = await axios.post(`device/status/${device}`, 
            {
                status: status,
            }, 
            {
                'Content-Type': 'application/json',
                withCredentials: true
            },
        )
        console.log("hi")
    } catch (err) {
        console.log(err.status)
    }
}

export default useGetAmount