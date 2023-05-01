import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NavBar(props) {
    const navigation = useNavigation();
    return (
        <View className="flex-row h-[10%] w-[100%] justify-between items-center px-[7%]">
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                className="justify-center, items-center"
            >
                <Ionicons
                    name="home-outline"
                    size={26}
                    color={`${props.home ? '#5AC2DA' : 'grey'}`}
                />
                {props.home && (
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[11px] text-center text-blue"
                    >
                        Home
                    </Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Setting')}
                className="justify-center, items-center"
            >
                <Ionicons
                    name="settings-outline"
                    size={26}
                    color={`${props.setting ? '#5AC2DA' : 'grey'}`}
                />
                {props.setting && (
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[11px] text-center text-blue"
                    >
                        Setting
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
