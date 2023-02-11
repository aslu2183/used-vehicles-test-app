import React from 'react'
import {View, Text,ScrollView, ActivityIndicator} from 'react-native'
import { Card } from '@rneui/themed'
import VehicleListing from '../components/VehicleListing'
import Axios from '../helpers/api'

export default function Home(){
    const [loading, setloading ] = React.useState(true)
    const [vehicles, setvehicles]= React.useState([])

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

    React.useEffect(() => {
        if(!loading){
            setloading(true)
        }
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
    },[])
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