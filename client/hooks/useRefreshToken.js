import React from 'react'
import useAuth from './useAuth'
import axios from '../api/axios'

const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
        const res = await axios.get('/refresh', {
            widthCredentials: true
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