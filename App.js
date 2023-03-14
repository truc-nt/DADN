import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Button} from 'react-native';
import Home from './screens/Home.js'
import Navigate from './components/Navigate.js'

export default function App() {
  return (
    <View style={styles.container}>
        <Home></Home>
        <Navigate></Navigate>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingTop: '8%',
  },
});
