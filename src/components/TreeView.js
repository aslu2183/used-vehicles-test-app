import {View, Text, ScrollView} from 'react-native'
import TreeItem from './TreeItem'

export default function TreeView({data,level=1,parent=[]}){
    return (
        <View>
            {
                data?.map((item,i) => {
                    const set_parent = [...parent,{
                        
                        label : item.label,
                        child : item?.items?.map((res) => res.label)||[]
                    }]
                    return (
                        <View key={i}>
                            <TreeItem data={item} level={level} parent={set_parent}></TreeItem>
                        </View>    
                    )
                })
            }
        </View>
    )
}