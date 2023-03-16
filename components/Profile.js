import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
    return (
        <View className="flex-row py-[2%] h-[15%] w-[100%] items-center">
            <Image 
                source={require('../assets/image/Profile.png')}
                className="w-[60px] h-[60px]"
            ></Image>
            <View className="flex-col pl-[7%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[20px] leading-[21px]" >Hi Fic Human</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">{new Date().toDateString()}</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">Căn hộ fiction</Text>
            </View>
            <View className="ml-[auto]">
                <TouchableOpacity
                    onPress={() => navigation.navigate("Setting")}
                >
                    <Ionicons name="settings" size={26} color="#5AC2DA"/>
                </TouchableOpacity>               
            </View>
        </View>
    );
}