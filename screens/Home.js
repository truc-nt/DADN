import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView , StyleSheet, Text, View,} from 'react-native';
import Profile from '../components/Profile'
import Device from '../components/Device'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = () => (
    <View style={styles.weather}>
        <Text style={{fontWeight: 'bold'}}>Trời nhiều mây</Text>
        <Text style={{fontWeight: 'bold'}}>31'C</Text>
        <Text style={{fontWeight: 'bold'}}>Độ ẩm</Text>
    </View>
)

export default function Home() {
    const devices = [
        {
            'icon': <Entypo name="light-bulb" size={24} color="black" />, 
            'name': 'Đèn',
            'amount': 8,
            'enabled': true
        },
        {
            'icon': <MaterialCommunityIcons name="fan" size={24} color="black" />,
            'name': 'Quạt',
            'amount': 7,
            'enabled': true
        },
        {
            'icon': <MaterialCommunityIcons name="bell-alert-outline" size={24} color="black" />,
            'name': 'Chống trộm',
            'amount': 1,
            'enabled': true
        },
    ]
  return (
    <View style={styles.container} >
        <ScrollView contentContainerStyle={{gap: 20}}>
            <Profile></Profile>
            <Weather></Weather>
            <View>
                <Text style={{fontWeight: 'bold'}}>Các thiết bị kết nối</Text>
            </View>
            <View style={styles.list}>
                {
                    devices.map((device, index) =>
                        <Device key={index} props={device} style={styles.device}></Device>
                    )
                }
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        flex: 1,
    },
    weather: {
        height: '20%',
        backgroundColor: '#C3EAF5',
        padding: '5%',
        justifyContent: 'space-evenly'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'space-between'
    },
    device: {
        width: '50%',
        flexGrow: 'auto',
        bakgroundColor: 'red !important'
    }
});
