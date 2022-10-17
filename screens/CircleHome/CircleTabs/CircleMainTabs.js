import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from './Posts'
import Calander from './Calander'
import Files from './Files'
import Tasks from './Tasks'
import Wiki from './Wiki'

const MaterialTopTabParams = {
    Posts: undefined,
    Wiki: undefined,
    Calander: undefined,
};

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function CircleMainTabs() {
    return (
        <MaterialTopTabs.Navigator>
            <MaterialTopTabs.Screen
                name="Wall"
                component={Posts}
                options={{ title: 'Wall' }}
            />
            <MaterialTopTabs.Screen
                name="Wiki"
                component={Wiki}
                options={{ title: 'Wiki' }}
            />
            <MaterialTopTabs.Screen
                name="Calander"
                component={Calander}
                options={{ title: 'Calander' }}
            />
        </MaterialTopTabs.Navigator>
    );
}

//export default CircleMainTabs;