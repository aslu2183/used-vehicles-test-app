import React from 'react';
import {View, Text} from 'react-native'
import TreeView from './TreeView'
import { ListItem,Icon } from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux'
import { add_items,add_variants } from '../redux/reducer/filterReducer'

export default function TreeItem({data,level,parent}){
    const { count, items, label} = data
    const dispatch = useDispatch()
    const redux_items = useSelector((state) => state.filter);
    const selectItem = (level) => {
        setChecked(!checked)
        let a = []
        let redux_variants = [...redux_items.variants]
        const pr = parent.map((item) => item.label)
        const ch = parent.find((item) => item.label == data.label)?.child
        
        if(!checked === false){
            b = pr.slice(0,pr.indexOf(data.label))
            
            const filter_arr = redux_variants.filter((a) => {
                return a.label.includes(pr.join("-"))
            }).map((item) => item.label)
            
            const d = filter_arr.filter((item) => {
                return ch.map((res) => res.includes(item))
            }).map((a)=> a.split("-").pop())
            ch.push(...d)
            ch.push(data.label)
            
                       
            dispatch(add_items({label:ch,isSelected:false}))
            
            redux_variants = redux_variants.filter((item) => {
                return !filter_arr.includes(item.label)
            })
            const tmp_arr = redux_variants.filter((item) => {
                return item.label.includes(b.join("-"))
            })
            
            if(tmp_arr.length == 0){
                redux_variants.push({
                    label : b.join("-"),
                    level : b.length
                })
            }
        }
        else{
            pr.forEach((val) => {
                dispatch(add_items({label:val,isSelected:true}))
            })
            a = pr.slice(0,pr.indexOf(data.label))
            const tmp_arr = [...a];
            const b = a.map((item) => {
                tmp_arr.pop()
                return [...tmp_arr];
            })
            b.push(a)
            const filter_arr = b.filter((item) => {
                return item.length > 0
            }).map((res) => res.join("-"))

            redux_variants = [...redux_items.variants]
            redux_variants = redux_variants.filter((item) => {
                return !filter_arr.includes(item.label)
            })
            redux_variants.push({
                label : pr.join("-"),
                level : level
            });
        }
        redux_variants = redux_variants.filter((item) => item.level > 0)
        dispatch(add_variants(redux_variants))
                
    }
    const [checked, setChecked] = React.useState(false)
    const [showChild, setshowChild] = React.useState(false)
    
    React.useEffect(() => {
        setChecked(redux_items.checked_items.includes(label) ? true : false)
        setshowChild(redux_items.checked_items.includes(label) ? true : false)
    },[redux_items.checked_items])
    
    
    return (
        <View>
            <ListItem onPress={() => selectItem(level)}>
                <ListItem.CheckBox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checked={checked}
                    onPress={() => selectItem(level)}
                    size={30}
                    checkedColor={"#0F0"}
                    uncheckedColor={"#000"}
                />
                <ListItem.Content>
                    <ListItem.Title style={{color:'#000',fontWeight:'bold'}}>{label+" ("+count+")"}</ListItem.Title>
                </ListItem.Content>
                {items.length > 0 ? 
                    <ListItem.Chevron 
                        onPress={() => setshowChild(!showChild)} 
                        size={30} 
                        color="black"
                        type="material-community"
                        name={showChild ? "chevron-down" : "chevron-up"}
                    ></ListItem.Chevron>
                : null }    
            </ListItem>
            {items?.length > 0 && showChild ?
                <View style={{marginLeft:level * 15}}>
                    <TreeView data={items} level={level + 1} parent={parent}></TreeView>
                </View>    
             :null    
            }
        </View>
    )
}