import { View, Text, Switch, TouchableOpacity, Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePick = (props) => {
    const [from, setFrom] = useState(new Date())
    const [to, setTo] = useState(new Date())
    const [fromPick, setFromPick] = useState(false)
    const [toPick, setToPick] = useState(false)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.setModal(false)}
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
                    <TouchableOpacity className="items-center mt-[20px] ml-[auto]">
                        <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] text-blue"
                            onPress={() => {
                                const fromTime = (from.getHours() < 10?"0":"") + from.getHours() + ":" + (from.getMinutes() < 10?"0":"") + from.getMinutes();
                                const toTime = (to.getHours() < 10?"0":"") + to.getHours() + ":" + (to.getMinutes() < 10?"0":"") + to.getMinutes();
                                props.setList([...props.list, {'from': fromTime, 'to': toTime, 'on': true}]);
                                props.setOpen(false);
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

    const timeList = [
        {
            'from': '9:00',
            'to': '10:00',
            'on': true
        },
        {
            'from': '15:00',
            'to': '16:30',
            'on': false
        },
        {
            'from': '18:00',
            'to': '20:00',
            'on': false
        },
    ]

    const [list, setList] = useState(timeList);
    const [timePick, setTimePick] = useState(false);

    return (
        <View className="flex w-[100%] bg-semiblue rounded-[20px] items-center px-[5%] mb-[25px]">
            {list.map((time, index) => 
                <View key={index} className={"flex-row w-[100%] justify-between h-[65px] items-center border-b-[1px]"}>
                    <Text numberOfLines={1} style={{fontFamily: `${time.on?"LexendRegular":"LexendExtraLight"}`}} className="text-[17px]">{time.from} - {time.to}</Text>
                    <Switch
                        trackColor={{false: 'white', true: '#5AC2DA'}}
                        thumbColor={'#F4FAFF'}
                        onValueChange={() => {
                            if (index == 0) setList([{...time, 'on': !time.on}, ...list.slice(1)])
                            else if (index == list.length - 1) setList([...list.slice(0,-1), {...time, 'on': !time.on}])
                            else setList([...list.slice(0,index), {...time, 'on': !time.on}, ...list.slice(index+1)])
                            //change on/off of device in server
                            //change control
                        }}
                        value={time.on}
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
            {timePick && <TimePick setOpen={setTimePick} setList={setList} list={list}/>}
        </View>
    )
}

export default TimeArrange