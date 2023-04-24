import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export const getAll = async (type) => {
    const axiosPrivate = useAxiosPrivate()
    try {
        const res = await axiosPrivate.get(`devices/${type}/all`)
        return res
    } catch (err) {
        console.log(err)
        return []
    }
}