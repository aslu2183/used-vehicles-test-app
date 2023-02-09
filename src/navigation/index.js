import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Filter from '../screens/Filter';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Navigation() {
    const Stack = createNativeStackNavigator(); 
    return (
       
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={({ navigation }) => ({
                        title: "Vehicle List",
                        headerRight:() => {
                            return <Ionicons name="md-filter" size={24} onPress={()=>navigation.navigate("Filter")}></Ionicons>
                        }
                    })} 
                    >
                </Stack.Screen>
                <Stack.Screen 
                    name="Filter" 
                    component={Filter}
                    options={{
                        title:""
                    }}>

                </Stack.Screen>
            </Stack.Navigator>
        
    );
}