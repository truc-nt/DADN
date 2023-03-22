import { Text, View, Image, TouchableOpacity } from 'react-native';

export default function Profile(props) {
    return (
        <TouchableOpacity className="flex-row pt-[15px] h-[15%] w-[100%] items-center" onPress={() => props.navigation.navigate("Setting")}>
            <Image 
                source={require('../assets/image/Profile.png')}
                className="w-[70px] h-[70px]"
            ></Image>
            <View className="flex-col pl-[7%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[20px] leading-[21px]" >Hi Fic Human</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">{new Date().toDateString()}</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[14px] leading-[21px]">Căn hộ fiction</Text>
            </View>
        </TouchableOpacity>
    );
}