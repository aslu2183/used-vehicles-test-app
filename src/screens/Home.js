import React from 'react'
import {View, Text,ScrollView, ActivityIndicator} from 'react-native'
import { Card } from '@rneui/themed'
import VehicleListing from '../components/VehicleListing'
import Axios from '../helpers/api'
import { useSelector } from 'react-redux'

export default function Home(){
    const [loading, setloading ] = React.useState(true)
    const [vehicles, setvehicles]= React.useState([])

    const filter = useSelector((state) => state.filter)
    
    React.useEffect(() => {
        if(!loading){
            setloading(true)
        }
        getVehicels()
    },[filter.filterValues])

    const getVehicels = () => {
        const data = {
            filter : filter.filterValues,
        }
        Axios().post('/list-vehicles',data)
        .then((res) => {
            setloading(false)
            const response = res.data
            if(response.status){
                setvehicles(response.data.vehicles)
            }
            else{
                console.log("Response ",response)
            }    
        })
        .catch((error) => {
            setloading(false)
        })
    }
    let display_content = <Text>No Vehicles Found</Text>
    if(loading){
        display_content = <ActivityIndicator></ActivityIndicator>
    }
    else{
        if(vehicles.length > 0){
            display_content = <VehicleListing vehicle={vehicles}></VehicleListing>
        }
    }    
    return(
        <ScrollView 
            contentContainerStyle={{flexGrow:1,justifyContent:'center',alignItems:'center'}}
            >
            { display_content }  
        </ScrollView>
    )
}