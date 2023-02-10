import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import data from "../cats.json"
import TreeView from '../components/TreeView'
import {useDispatch, useSelector} from 'react-redux'
import { reset_filter } from '../redux/reducer/filterReducer'

export default function Filter(){
    const formatted_data = data.map((item) => {
        return {
            label : item.name,
            value : item.id,
            count : item.count,
            items : item?.brand?.map((brand) => {
                return {
                    label : brand.name,
                    value : brand.id,
                    count : brand.count,
                    items : brand?.model?.map((model) => {
                        return {
                            label : model.name,
                            value : model.id,
                            count : model.count,
                            items : model?.trim?.map((trim) => {
                                return {
                                    label : trim.name,
                                    value : trim.id,
                                    count : trim.count,
                                    items : []
                                }
                            })||[]
                        }
                    })||[]
                }
            })||[] 
        }
    })
    const dispatch = useDispatch()
    const filter   = useSelector((state) => state.filter)
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <TreeView data={formatted_data}></TreeView>
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
                    <TouchableOpacity style={{padding:15,borderWidth:1}}>
                        <Text>Apply Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:15,borderWidth:1}} onPress={() => dispatch(reset_filter())}>
                        <Text>Reset Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}