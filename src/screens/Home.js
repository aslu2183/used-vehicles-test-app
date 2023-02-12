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
        Axios().get('/list-vehicles')
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
            console.warn(error)
        })
    }
    return(
        <ScrollView 
            contentContainerStyle={{flexGrow:1,justifyContent:'center',alignItems:'center'}}
            >
            {
                loading ? <ActivityIndicator></ActivityIndicator> : <VehicleListing vehicle={vehicles}></VehicleListing>
            }    
        </ScrollView>
    )
}