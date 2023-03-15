import { StyleSheet, Text, View, Button} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Navigate() {
  return (
    <View style={styles.container}>
      <FontAwesome name="home" size={24} color="black" />
      <Ionicons name="settings" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
  },
});