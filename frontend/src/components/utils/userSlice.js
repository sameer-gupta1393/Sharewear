import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:'userdata',
    initialState:{
            name:null,   
            location:null,
            email:null,
            id:null,
        }
    ,
    reducers:{
        addUser:(state,action)=>{         
              
            return {
                ...state,
                ...action.payload,
              };
              }
         
    }
})
export const {addUser}=userSlice.actions;
export default userSlice.reducer;