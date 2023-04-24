import { View, Text, Switch, TouchableOpacity, Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useGetTimers from '../hooks/useTimer'

const formatTime = (date) => {
    date = new Date(date)
    return `${date.getHours() < 10?"0":""}${date.getHours()}:${date.getMinutes() < 10?"0":""}${date.getMinutes()}`
}

const TimePick = (props) => {
    const [from, setFrom] = useState(new Date())
    const [to, setTo] = useState(new Date())
    const [fromPick, setFromPick] = useState(false)
    const [toPick, setToPick] = useState(false)
    const [mode, setMode] = useState("Bật")
    const [value, setValue] = useState(1)

    const axiosPrivate = useAxiosPrivate()

    const addTimer = async () => {
        try {
            if (props.device.type === "light") await axiosPrivate.post(`timers/${props.device._id}`, JSON.stringify({from, to, mode, value}))
            else if (props.device.type === "fan") await axiosPrivate.post(`timers/${props.device._id}`, JSON.stringify({from, to, mode}))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.setModal(false)}
            onBackdropPress={() => props.setModal(false)}
        >
            <View className="flex-1 p-[5%] bg-black/[.5] justify-center">
                <View className="p-[5%] bg-white">
                    <Text style={{fontFamily: "LexendMedium"}} className="text-[17px] mb-[10px]">Chọn giờ</Text>
                    <View className="flex-row items-center w-[100%]">
                        <Text style={{fontFamily: "LexendRegular"}} className="text-[19px] text-blue w-[50%]">Từ:</Text>
                        <Text style={{fontFamily: "LexendRegular"}} className="text-[19px] text-blue w-[50%]">Đến:</Text>
                    </View>
                    <View className="flex-row w-[100%]">
                        <View className="w-[50%]">
                            <TouchableOpacity
                                onPress={() => setFromPick(true)}
                                className=" h-[30px] justify-center"
                            >
                                <Text style={{fontFamily: "LexendRegular"}} className="text-[19px]">{(from.getHours() < 10?"0":"") + from.getHours() + ":" + (from.getMinutes() < 10?"0":"") + from.getMinutes()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="w-[50%]">
                            <TouchableOpacity
                                onPress={() => setToPick(true)}
                                className=" h-[30px] justify-center"
                            >
                                <Text style={{fontFamily: "LexendRegular"}} className="text-[19px]">{(to.getHours() < 10?"0":"") + to.getHours() + ":" + (to.getMinutes() < 10?"0":"") + to.getMinutes()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    { (props.device.type === "light" || props.device.type === "fan") &&
                    <>
                        <View className="flex-row items-center w-[100%]">
                            <Text style={{fontFamily: "LexendRegular"}} className="text-[19px] text-blue w-[50%]">Chế độ:</Text>
                            <View className="text-[19px] text-blue w-[50%]">
                                <Picker
                                    selectedValue={mode}
                                    onValueChange={(itemValue) => setMode(itemValue)}
                                    className="text-[19px] text-blue"
                                    style={{fontFamily: "LexendRegular", marginLeft: -16, color: 'black'}}
                                >
                                    <Picker.Item label="Bật" value={"Bật"} color={mode === "Bật"?"#5AC2DA":"black"}/>
                                    <Picker.Item label="Tự động" value={"Tự động"} /> 
                                </Picker> 
                            </View>
                        </View>
                        {props.device.type === "light" && <View className="flex-row items-center w-[100%]">
                            <Text style={{fontFamily: "LexendRegular"}} className="text-[19px] text-blue w-[50%]">Màu sắc</Text>
                            <View className="flex-1">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => setValue(itemValue)}
                                    className="text-[19px] text-blue"
                                    style={{fontFamily: "LexendRegular", marginLeft: -16, color: 'black'}}
                                >
                                    <Picker.Item label="Đỏ" value={1} color="red"/>
                                    <Picker.Item label="Xanh lá" value={2} color="green"/>
                                    <Picker.Item label="Xanh biển" value={3} color="blue"/>
                                    <Picker.Item label="Cam" value={4} color="orange"/>
                                </Picker> 
                            </View>
                        </View>}
                    </>
                    }
                    <TouchableOpacity className="items-center mt-[20px] ml-[auto]">
                        <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] text-blue"
                            onPress={() => {
                                const fromTime = from
                                const toTime = to
                                addTimer()
                                props.setTimers([...props.timers, {'from': fromTime, 'to': toTime, 'status': true}]);
                                props.setOpen(false)
                            }}
                        >Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {fromPick &&
                <DateTimePicker
                    testID="from"
                    value={from}
                    mode='time'
                    is24Hour={true}
                    display='default'
                    onChange={(e, selectedDate) => {
                        setFrom(selectedDate)
                        setFromPick(false)
                    }}
                />
            }
            {toPick &&
                <DateTimePicker
                    testID="to"
                    value={to}
                    mode='time'
                    is24Hour={true}
                    onChange={(e, selectedDate) => {
                        setTo(selectedDate)
                        setToPick(false)
                    }}
                />
            }
        </Modal>
    )
}

const TimeArrange = (props) => {
    const [timers, setTimers] = useGetTimers(props.device._id)
    const [timePick, setTimePick] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const changeTimerStatus = async (timerId) => {
        try {
            const res = await axiosPrivate.patch(`timers/${timerId}`)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View className="flex w-[100%] bg-semiblue rounded-[20px] items-center px-[5%] mb-[25px]">
            {timers.map((time, index) => 
                <View key={index} className={"flex-row w-[100%] justify-between h-[65px] items-center border-b-[1px]"}>
                    <Text numberOfLines={1} style={{fontFamily: `${time.status?"LexendRegular":"LexendExtraLight"}`}} className="text-[17px]">{formatTime(time.from)} - {formatTime(time.to)}</Text>
                    <Switch
                        trackColor={{false: 'white', true: '#5AC2DA'}}
                        thumbColor={'#F4FAFF'}
                        onValueChange={() => {
                            if (index == 0) setTimers([{...time, 'status': !time.status}, ...timers.slice(1)])
                            else if (index == timers.length - 1) setTimers([...timers.slice(0,-1), {...time, 'status': !time.status}])
                            else setTimers([...timers.slice(0,index), {...time, 'status': !time.status}, ...timers.slice(index+1)])
                            changeTimerStatus(time._id)
                        }}
                        value={time.status}
                    />
                </View>
                    )}
            <View className={"flex-row w-[100%] justify-between h-[65px] items-center"}>
                <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="text-[17px]">Hẹn giờ</Text>
                <TouchableOpacity
                    onPress={() => setTimePick(true)}
                >
                    <AntDesign name="pluscircle" size={24} color="#5AC2DA" />
                </TouchableOpacity>
            </View>
            {timePick && <TimePick setOpen={setTimePick} setTimers={setTimers} timers={timers} device={props.device}/>}
        </View>
    )
}

export default TimeArrange