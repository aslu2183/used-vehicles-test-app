import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Filter from '../screens/Filter';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import { reset_filter } from '../redux/reducer/filterReducer';

export default function Navigation() {
    const Stack        = createNativeStackNavigator()
    const dispatch     = useDispatch()
    const filterParams = useSelector((state) => state.filter)

    const goToFilterScreen = (navigation) => {
        if(filterParams.filterValues.length == 0){
            dispatch(reset_filter())
        }
        navigation.navigate('Filter')
    }
   
    return (
       
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={({ navigation }) => ({
                        title: "Vehicle List",
                        headerRight:() => {
                            return <Ionicons name="md-filter" color="black" size={24} onPress={() => goToFilterScreen(navigation)}></Ionicons>
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