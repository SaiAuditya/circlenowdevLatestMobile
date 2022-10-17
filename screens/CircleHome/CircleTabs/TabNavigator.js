import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Wiki from './Wiki'
import Calander from './Calander'
import AllPosts from './Posts_1'
import Spaces from './Spaces'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'
import Tasks from './Tasks'
import { COLORS, FONTS, SHADOWS } from '../../../assets/constants'
import CHomePage from '../HomePage/HomePage'
import TopNavigations from '../TopNavigations/TopNavigations'
import TopBanner from '../TopBanner/TopBanner';

const Tab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

function TabNavigator() {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name='Home'
                options={{ headerShown: false }}
                component=
                {TabsBottom}
            >
            </StackNavigator.Screen>
        </StackNavigator.Navigator>
    );
}

const TabsBottom = () => {
    return (<Tab.Navigator initialRouteName="AllPosts" screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name="AllPosts"
            component={AllPosts}
            options={{ tabBarIcon: ({ focused }) => <Icon name='home' size={20} style={{ color: focused ? COLORS.primary : 'black' }}></Icon> }}
        />
        <Tab.Screen
            name="Spaces"
            component={Spaces}
            options={{ tabBarIcon: ({ focused }) => <Icon name='globe' size={20} style={{ color: focused ? COLORS.primary : 'black' }}></Icon> }}
        />
        <Tab.Screen
            name="Calander"
            component={Calander}
            options={{ tabBarIcon: ({ focused }) => <Icon name='calendar' size={20} style={{ color: focused ? COLORS.primary : 'black' }}></Icon> }}
        />
        <Tab.Screen
            name="Tasks"
            component={Tasks}
            options={{ tabBarIcon: ({ focused }) => <Icon name='tasks' size={20} style={{ color: focused ? COLORS.primary : 'black' }}></Icon> }}
        />
    </Tab.Navigator>)
}

export default TabNavigator