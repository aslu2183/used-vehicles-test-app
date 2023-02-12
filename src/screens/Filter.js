import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
// import data from "../cats.json"
import TreeView from '../components/TreeView'
import {useDispatch, useSelector} from 'react-redux'
import { reset_filter, add_filter_items } from '../redux/reducer/filterReducer'
import { formatted_data } from '../helpers/utils'
import React from 'react'
import Axios from '../helpers/api'
import { Button } from '@rneui/themed';

export default function Filter({ navigation }){
    const [loading, setloading] = React.useState(true)
    const [items, setitems]     = React.useState([])
    const dispatch = useDispatch()
    const filter   = useSelector((state) => state.filter)
    React.useEffect(() => {
        get_categories()
    },[])

    const get_categories = async() => {
        Axios().get("/list-categories")
        .then((res) => {
            const response = res.data
            setitems(formatted_data(response.data.categories))
            setloading(false);   
        })
        .catch((error)=>{
            setloading(false);
            console.warn("Error ",error);
        })
    }

    const applyFilter = () => {
        const ch = filter.variants.map((item) => {
            return item.label.split("-")
        })
        
        const levelArray = ch.map((item) => item.length)
        const levels     = Math.max(...levelArray)
        
        let tmp_arr = []
        for(i = 0;i < levels;i++){
            let j = 0
            tmp_arr[i] = []
            if(ch.length < levels){
                for(j = 0;j < ch.length;j ++ ){
                    if(tmp_arr[i].indexOf(ch[j][i]) < 0 && ch[j][i]){
                        tmp_arr[i].push(ch[j][i])
                    }    
                }    
            }
            else{
                while( j < ch.length ){
                    if(ch[j][i]){
                        if(tmp_arr[i].indexOf(ch[j][i]) < 0){
                            tmp_arr[i].push(ch[j][i]);
                        }    
                    }
                    j++    
                }
            }    
        }
        dispatch(add_filter_items(tmp_arr))
        console.log("New Arr is ",tmp_arr)
        navigation.navigate("Home");
    }
    return(
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
            {
                loading ? <ActivityIndicator></ActivityIndicator>
                :<><ScrollView contentContainerStyle={{flexGrow:1}}>
                <TreeView data={items}></TreeView>
            </ScrollView>
            <View style={{padding:10}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Selected Variant:</Text>
                <View style={{marginBottom:10}}>
                    {
                        filter.variants.map((item,i) => {
                            const slno = i + 1
                            const label = item?.label?.replace(/-/g,",  ")
                            return (
                                <Text key={slno} style={{color:'black',fontWeight:'bold'}}>{slno+". "+label}</Text>
                            )    
                        })
                    }
                </View>
                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                   
                        <Button
                            title="Apply"
                            buttonStyle={{
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                width : 150,
                                marginHorizontal: 50,
                                marginVertical: 10,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={applyFilter}
                        />

                        <Button
                            title="Reset"
                            buttonStyle={{
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                width : 150,
                                marginHorizontal: 50,
                                marginVertical: 10,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={() => dispatch(reset_filter())}
                        />
                          
                </View>
            </View>
            </>
        }    
        </View>
    )
}