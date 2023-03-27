import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Filter from '../screens/Filter';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import { reset_filter,add_variants,add_items } from '../redux/reducer/filterReducer';

export default function Navigation() {
    const Stack        = createNativeStackNavigator()
    const dispatch     = useDispatch()
    const filterParams = useSelector((state) => state.filter)

    const goToFilterScreen = (navigation) => {
        //need update redux state before going to filter screen.
        if(filterParams.filterValues.length == 0){
            dispatch(reset_filter())
        }
        else{
            const filteredVariants  = filterParams.filterValues
            const variantsToAdd     = filteredVariants.reduce((accumulator,item) => {
                accumulator.push({
                    label : item.join("-"),
                    level : item.length
                })
                return accumulator
            },[])
            dispatch(add_variants(variantsToAdd))

            const itemsToAdd    = filteredVariants.reduce((accumulator,item) => [...accumulator,...item],[])
            const itemsToDelete = filterParams.checked_items.filter((item) => itemsToAdd.indexOf(item) < 0)
            
            itemsToAdd.forEach((val) => {
                dispatch(add_items({label:val,isSelected:true}))
            })

            itemsToDelete.forEach((val) => {
                dispatch(add_items({label:val,isSelected:false}))
            })
               
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