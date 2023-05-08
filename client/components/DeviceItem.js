import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useFocusEffect } from '@react-navigation/native';

const DeviceItem = (props) => {
    const { item } = props;
    const [detail, setDetail] = useState(item)
    const [isEnabled, setIsEnabled] = useState(item.status);
    const [mode, setMode] = useState(item?.mode);
    const navigation = useNavigation();

    const axiosPrivate = useAxiosPrivate();
    const updateStatus = async () => {
        try {
            const res = await axiosPrivate.put(`devices/status/${item._id}`);
            console.log(res.data);
            console.log(detail.status)
            setDetail({...detail, status: !detail.status})
            //item.status = !isEnabled
            //setIsEnabled(!isEnabled)
            
            if (detail.mode == "Tự động") setDetail({...detail, mode: "Thủ công"})
        } catch (err) {
            console.log(err.status);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setDetail({...item})
            //setIsEnabled(item.status);
            //setMode(item.mode);
        }, [item])
    );

    return (
        <TouchableOpacity
            className={`flex mx-[22px] py-[15px] ${
                props.border ? 'border-b-[1px]' : ''
            } h-[90px]`}
            onPress={() =>
                navigation.navigate('DeviceDetail', { detail: detail })
            }
        >
            <View className="flex-row justify-between items-center">
                <Text
                    style={{ fontFamily: 'LexendMedium' }}
                    className="text-[20px] leading-[21px]"
                >
                    {detail.name}
                </Text>
                <Switch
                    trackColor={{ false: 'white', true: '#5AC2DA' }}
                    thumbColor={'#F4FAFF'}
                    onValueChange={() => {updateStatus();}}
                    value={detail.status}
                />
            </View>
            <View className="flex-row justify-between">
                <Text
                    style={{ fontFamily: 'LexendRegular' }}
                    className="text-[13px] leading-[21px] text-grey"
                >
                    {detail.position}
                </Text>
                <Text
                    style={{ fontFamily: 'LexendRegular' }}
                    className="text-[13px] leading-[21px] text-grey"
                >
                    {detail.mode}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default DeviceItem;
