import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import OnBoard from './screens/OnBoard';
import Register from './screens/Register';
import Setting from './screens/Setting';
import Light from './screens/Light';
import Fan from './screens/Fan';
import LightItemDetail from './screens/LightItemDetail';
import FanItemDetail from './screens/FanItemDetail';
import { useFonts } from 'expo-font'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    LexendExtraLight: require("./assets/font/static/Lexend-ExtraLight.ttf"),
    LexendRegular: require("./assets/font/static/Lexend-Regular.ttf"),
    LexendSemiBold: require("./assets/font/static/Lexend-SemiBold.ttf"),
    LexendBold: require("./assets/font/static/Lexend-Bold.ttf"),
    LexendMedium: require("./assets/font/static/Lexend-Medium.ttf"),
  })
  if (!fontLoaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OnBoard" component={OnBoard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Setting' component={Setting} />
        <Stack.Screen name='Light' component={Light} />
        <Stack.Screen name='Fan' component={Fan} />
        <Stack.Screen name='LightItemDetail' component={LightItemDetail} />
        <Stack.Screen name='FanItemDetail' component={FanItemDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
