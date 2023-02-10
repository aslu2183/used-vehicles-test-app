import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name : "filter",
    initialState : {
        checked_items : [],
        variants : []
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
        reset_filter : (state, action) => {
            return {
                checked_items : [],
                variants : []
            }
        }
    } 
})
export const {add_items,add_variants,reset_filter} = filterSlice.actions
export default filterSlice.reducer