import React from 'react'
import useAuth from './useAuth'
import axiosPrivate from '../api/axios'

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth()
    console.log(auth) 

    const refresh = async () => {
        const res = await axiosPrivate.post('/refresh', {
            refreshToken: auth.refreshToken
        })

        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(res.data.accessToken)
            return {...prev, accessToken: res.data.accessToken}
        })
        return res.data.accessToken
    }
    return refresh
}

export default useRefreshToken