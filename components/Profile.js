import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <View className="flex-row px-[5%] py-[2%]">
        <Image 
            source={require('../assets/image/Profile.png')}
            className="w-[50px] h-[50px] self-center"
        ></Image>
        <View className="flex-col pl-[7%]">
            <Text style={{fontFamily: "LexendBold"}} className="text-[20px] leading-[21px]" >Hi Fic Human</Text>
            <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">{new Date().toDateString()}</Text>
            <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">Căn hộ fiction</Text>
        </View>
        <View className="self-center ml-[auto]">
          <Ionicons name="settings" size={24} color="#5AC2DA"/>
        </View>
    </View>
  );
}
