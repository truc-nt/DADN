import { View, Modal, TouchableOpacity, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { MultiArcCircle } from 'react-native-circles';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const PercentageBar = (props) => {
    const [value, setValue] = useState(props.value);
    const axiosPrivate = useAxiosPrivate();

    const changeValue = async () => {
        console.log(value);
        try {
            const res = await axiosPrivate.put(`devices/value/${props.id}`, {
                value: value,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={() => props.setModal(false)}
        >
            <View className="flex-1 bg-lightblue justify-center p-[10%]">
                <TouchableOpacity className="items-center right-[5%] top-[1%] absolute">
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[25px] text-blue"
                        onPress={() => {
                            changeValue();
                            props.setModal(false);
                            props.setValue(Math.round(value));
                        }}
                    >
                        Lưu
                    </Text>
                </TouchableOpacity>
                <View className="h-[40%] justify-center items-center">
                    <MultiArcCircle
                        radius={120}
                        intervals={[{ start: 0, end: value * 3.6 }]}
                        color="#5AC2DA"
                        width={25}
                        backgroundColor="white"
                    />
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[27px] text-blue"
                    >
                        {Math.round(value)} %
                    </Text>
                </View>
                <View className="flex-row h-[10%] items-center w-[100%]">
                    <Slider
                        value={value}
                        onValueChange={(v) => setValue(v)}
                        minimumValue={1}
                        maximumValue={100}
                        thumbTintColor="white"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View className="flex-row h-[5%] justify-between self-center w-[100%] ">
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[17px]"
                    >
                        1
                    </Text>
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[17px]"
                    >
                        100
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default PercentageBar;
