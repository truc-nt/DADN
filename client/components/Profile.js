import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'

export default function Profile() {
    const navigation = useNavigation();
    const {auth} = useAuth()

    return (
        <TouchableOpacity className="flex-row pt-[15px] h-[15%] w-[100%] items-center" onPress={() => navigation.navigate("Setting")}>
            <Image 
                source={require('../assets/image/Profile.png')}
                className="w-[70px] h-[70px]"
            ></Image>
            <View className="flex-col pl-[7%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[20px] leading-[21px]" >Hi {auth.username}</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">{new Date().toDateString()}</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">Căn hộ fiction</Text>
            </View>
        </TouchableOpacity>
    );
}
