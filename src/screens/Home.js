import {View, Text,ScrollView} from 'react-native'
import { Card } from '@rneui/themed'
import VehicleListing from '../components/VehicleListing'

export default function Home(){
    const data = [{
        name : "Aslam"
    },{
        name : "Muthu"
    },{
        name : "Ponnus"
    },{
        name : "Azza" 
    },{
        name : "Parwee" 
    },{
        name : "Immutty"
    }]
    return(
        <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center',alignItems:'center'}}>
           
            <VehicleListing vehicle={data}></VehicleListing>
            
            
            
        </ScrollView>
    )
}