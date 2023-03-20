import { useEffect, useState } from "react";
import axios from '../api/axios'
import useAuth from './useAuth'
const useTemp = () => {
    const [temp, setTemp] = useState()
    const {auth, setAuth} = useAuth()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTemp = async () => {
            try {
                const res = await axios.get('/temp', 
                {
                    headers: { authorization: `JWT ${auth.accessToken}`},
                    signal: controller.signal,
                })
                isMounted && setTemp(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getTemp()
    }, [])
    return temp
}

export default useTemp