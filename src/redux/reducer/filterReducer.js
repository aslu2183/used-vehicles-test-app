import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name : "filter",
    initialState : {
        checked_items : [],
        variants : [],
        filterValues : []
    },
    reducers : {
        add_items : (state,action) => {
            if(action.payload.isSelected){
                if(!state.checked_items.includes(action.payload.label)){
                    state.checked_items.push(action.payload.label)
                }    
            }
            else{
                state.checked_items = state.checked_items.filter((item) => {
                    return !action.payload.label.includes(item)
                })
            }    
        },
        add_variants : (state,action) => {
            state.variants = action.payload;
        },
        add_filter_items : (state,action) => {
            state.filterValues = action.payload
        },
        reset_filter : (state, action) => {
            return {
                checked_items : [],
                variants      : [],
                filterValues  : []
            }
        }
    } 
})
export const {add_items,add_variants,reset_filter,add_filter_items} = filterSlice.actions
export default filterSlice.reducer