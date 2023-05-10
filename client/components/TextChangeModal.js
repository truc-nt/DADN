import { View, Modal, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const TextChangeModal = (props) => {
    const [text, setText] = useState(props.text);
    const axiosPrivate = useAxiosPrivate();
    const changeData = async () => {
        const url =
            props.resource !== 'username'
                ? `devices/${props.resource}/${props.deviceId}`
                : `user/username`;
        try {
            const res = await axiosPrivate.put(url, { data: text });
            if (props.resource !== 'username')
                props.setText({ ...props.detail, [props.resource]: text });
            else props.setText(text);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.setModal(false)}
        >
            <View className="flex-1 p-[5%] bg-black/[.5] justify-center">
                <View className="p-[5%] bg-white">
                    <Text
                        style={{ fontFamily: 'LexendExtraLight' }}
                        className="text-[17px]"
                    >
                        {props.label}
                    </Text>
                    <TextInput
                        value={text}
                        onChangeText={(value) => setText(value)}
                        style={{ fontFamily: 'LexendRegular' }}
                        className="text-[22px] mt-[10px] border-b-[1px] h-[50px]"
                        autoFocus={true}
                    />
                    <TouchableOpacity className="items-center mt-[20px] ml-[auto]">
                        <Text
                            style={{ fontFamily: 'LexendSemiBold' }}
                            className="text-[20px] text-blue"
                            onPress={() => {
                                props.setModal(false);
                                changeData();
                            }}
                        >
                            Lưu
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default TextChangeModal;
