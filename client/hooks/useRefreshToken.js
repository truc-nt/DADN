import React from 'react'
import useAuth from './useAuth'
import axiosPrivate from '../api/axios'

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth()

    const refresh = async () => {
        const res = await axiosPrivate.post('/refresh', {
            refreshToken: auth.refreshToken
        })

        setAuth(prev => {
            return {...prev, accessToken: res.data.accessToken}
        })
        return res.data.accessToken
    }
    return refresh
}

export default useRefreshToken