import React from 'react';
import {View, Text} from 'react-native'
import { ListItem,Icon } from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux'
import { add_items,add_variants } from '../redux/reducer/filterReducer'

export default function TreeItem({data,level,parent}){
    const { count, items, label} = data
    const dispatch = useDispatch()
    const redux_items = useSelector((state) => state.filter);
    const selectItem = (level) => {
        setChecked(!checked)
        let redux_variants = [...redux_items.variants]
        const selectedItemsArray = parent.map((item) => item.label)
        const childArrayOfSelectedItem = parent.find((item) => item.label == data.label)?.child
                
        if(!checked === false){
            const parentArrayOfUnSelectedItem = selectedItemsArray.slice(0,selectedItemsArray.indexOf(data.label))
            // labelArrayOfVariants is ["Car-BMW-X2"]
            const labelArrayOfVariants = redux_variants.filter((a) => {
                return a.label.includes(selectedItemsArray.join("-"))
            }).map((item) => item.label)

            // lastChildOfEachVariant equals ["X2","X7"] from the labelArrayOfVariants ["Car-BMW-X2","Car-BMW-X7"]
            // For unchecking  all children of selected parent if available.
            // for eg:- if user uncheck BMW this will uncheck its children also if checked.
            const lastChildOfEachVariant = labelArrayOfVariants.filter((item) => {
                return childArrayOfSelectedItem.map((res) => res.includes(item))
            }).map((a)=> a.split("-").pop())

            childArrayOfSelectedItem.push(...lastChildOfEachVariant)
            childArrayOfSelectedItem.push(data.label)
            
            dispatch(add_items({label:childArrayOfSelectedItem,isSelected:false}))
            
            redux_variants = redux_variants.filter((item) => {
                return !labelArrayOfVariants.includes(item.label)
            })
            const tmp_arr = redux_variants.filter((item) => {
                return item.label.includes(parentArrayOfUnSelectedItem.join("-"))
            })
            
            if(tmp_arr.length == 0){
                redux_variants.push({
                    label : parentArrayOfUnSelectedItem.join("-"),
                    level : parentArrayOfUnSelectedItem.length
                })
            }
        }
        else{
            selectedItemsArray.forEach((val) => {
                dispatch(add_items({label:val,isSelected:true}))
            })
            // parentArrayOfSelectedItem  X2 (model) is ["Car","BMW"]
            const parentArrayOfSelectedItem = selectedItemsArray.slice(0,selectedItemsArray.indexOf(data.label))
            const tmp_arr = [...parentArrayOfSelectedItem];//Copying parent array into new variable
            //parentArrayOfEachItem ["Car","BMW","X2"] is [[],["Car"],["Car","BMW"]]
            const parentArrayOfEachItem = parentArrayOfSelectedItem.map((item) => {
                tmp_arr.pop()
                return [...tmp_arr];
            })
            parentArrayOfEachItem.push(parentArrayOfSelectedItem)
            
            const filter_arr = parentArrayOfEachItem.filter((item) => {
                return item.length > 0
            }).map((res) => res.join("-"))

            redux_variants = [...redux_items.variants]
            redux_variants = redux_variants.filter((item) => {
                return !filter_arr.includes(item.label)
            })
            
            redux_variants.push({
                label : selectedItemsArray.join("-"),
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
                    {
                        items.map((child, index) => {
                            const set_parent = [...parent,{
                                label : child.label,
                                child : child?.items?.map((res) => res.label)||[]
                            }]
                            return (
                                <TreeItem data={child} level={level + 1} parent={set_parent} key={index}></TreeItem>
                            )
                        })
                    }
                </View>    
             :null    
            }
        </View>
    )
}