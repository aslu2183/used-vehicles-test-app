import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
// import data from "../cats.json"
import TreeView from '../components/TreeView'
import {useDispatch, useSelector} from 'react-redux'
import { reset_filter } from '../redux/reducer/filterReducer'
import { formatted_data } from '../helpers/utils'
import React from 'react'
import Axios from '../helpers/api'

export default function Filter(){
    const [loading, setloading] = React.useState(true)
    const [items, setitems]     = React.useState([])
    // const formatted_data = data.map((item) => {
    //     return {
    //         label : item.name,
    //         value : item.id,
    //         count : item.count,
    //         items : item?.brand?.map((brand) => {
    //             return {
    //                 label : brand.name,
    //                 value : brand.id,
    //                 count : brand.count,
    //                 items : brand?.model?.map((model) => {
    //                     return {
    //                         label : model.name,
    //                         value : model.id,
    //                         count : model.count,
    //                         items : model?.trim?.map((trim) => {
    //                             return {
    //                                 label : trim.name,
    //                                 value : trim.id,
    //                                 count : trim.count,
    //                                 items : []
    //                             }
    //                         })||[]
    //                     }
    //                 })||[]
    //             }
    //         })||[] 
    //     }
    // })
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
                    if(tmp_arr[i].indexOf(ch[j][i]) < 0){
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
        console.log("New Arr is ",tmp_arr)
    }
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            {
                loading ? <ActivityIndicator></ActivityIndicator>
                :<><ScrollView contentContainerStyle={{flexGrow:1}}>
                <TreeView data={items}></TreeView>
            </ScrollView>
            <View style={{padding:10}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Selected Variant:</Text>
                <View style={{marginBottom:10}}>
                    {
                        filter.variants.map((item,i) => {
                            const slno = i + 1
                            const label = item?.label?.replace(/-/g,",")
                            return (
                                <Text key={slno}>{slno+". "+label}</Text>
                            )    
                        })
                    }
                </View>
                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <TouchableOpacity style={{padding:15,borderWidth:1}} onPress={applyFilter}>
                        <Text>Apply Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:15,borderWidth:1}} onPress={() => dispatch(reset_filter())}>
                        <Text>Reset Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </>
        }    
        </View>
    )
}