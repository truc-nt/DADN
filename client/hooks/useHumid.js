import { useEffect, useState } from "react";
import axios from '../api/axios'
import useAuth from './useAuth'
const useHumid = () => {
    const [humid, setHumid] = useState()
    const {auth, setAuth} = useAuth()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getHumid = async () => {
            try {
                const res = await axios.get('/humid', 
                {
                    headers: { authorization: `JWT ${auth.accessToken}`},
                    signal: controller.signal,
                })
                isMounted && setHumid(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getHumid()
    }, [])
    return humid
}

export default useHumid