import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <View style={styles.container}>
        <View>
            <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}} style={styles.img}></Image>
        </View>
        <View>
            <Text styles={{fontWeight: 'bold'}}>Hi Fic Human</Text>
            <Text>{new Date().toDateString()}</Text>
            <Text>Căn hộ fiction</Text>
        </View>
        <View>
            <Ionicons name="settings" size={24} color="black" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  img: {
    height: 40,
    width: 50
  }
});