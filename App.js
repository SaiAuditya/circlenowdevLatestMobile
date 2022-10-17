import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { store } from './redux/reducers/store'
import Login from './screens/login';
import Register_Screen_2 from './screens/register_screen2'
import CustomHeader from './components/Header'
import { COLORS } from './assets/constants';
import Wiki from './screens/CircleHome/CircleTabs/Wiki'
import Calander from './screens/CircleHome/CircleTabs/Calander'
import AllPosts from './screens/CircleHome/CircleTabs/Posts_1'
import Tasks from './screens/CircleHome/CircleTabs/Tasks'
import Spaces from './screens/CircleHome/CircleTabs/Spaces'
import TopBanner from './screens/CircleHome/TopBanner/TopBanner'
import CHomePage from './screens/CircleHome/HomePage/HomePage'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'
import TabNavigator from './screens/CircleHome/CircleTabs/TabNavigator'

import { useFonts, Roboto_700Bold, Roboto_400Regular, Roboto_300Light, Roboto_500Medium, Roboto_100Thin } from '@expo-google-fonts/roboto';



const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "transparent" } }
export default function App() {

  const [loaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_100Thin
  })

  if (!loaded) return null;

  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          //headerLeft: CustomHeader,
          headerRight: CustomHeader,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTitleStyle: { color: 'white' },
          headerBackTitleStyle: { color: 'white' },
          headerBackgroundContainerStyle: { borderColor: 'white' }

        }}
          initialRouteName="Login" >
          <Stack.Screen name="Login" component={Login} option={{ headerStyle: { height: 400 } }}></Stack.Screen>
          <Stack.Screen name="Register_2" component={Register_Screen_2}></Stack.Screen>
          <Stack.Screen name="TopBanner" component={TopBanner}></Stack.Screen>
          <Stack.Screen name="HomePage" component={TabNavigator} options={{ header: CHomePage }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
//<Image source={require("./assets/spotit.jpeg")}></Image>

// <Stack.Screen name="Home" component={Home}></Stack.Screen>
// <Stack.Screen name="Details" component={Details}></Stack.Screen>

/*
 InterBold: require("./assets/fonts/Roboto-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Roboto-Black.ttf"),
    InterRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    InterLight: require("./assets/fonts/Roboto-Light.ttf"),
    InterMedium: require("./assets/fonts/Roboto-Medium.ttf")
*/