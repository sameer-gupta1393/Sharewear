import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:'userdata',
    initialState:{
        users:{
            username:null,
            cards:[],
            location:[],
            email:null
        }
    },
    reducers:{
        addUser:(state,action)=>{            
                state.users={ ...state.users,...action.payload};
              }
        
    ,
        addUserCard:(state,action)=>{
            state.users.cards=action.payload;
            console.log(action.payload)
        },
        clearCart:(state)=>{ //if u dont need action u can remove that like in above
            state.items.length=0;//or u can return [items:[]] // it will be passed to state
            console.log(state)//this dont work it gives proxyArray
            console.log(current(state))
            $( "div.cleared" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
        }
    }
})
export const {addUser,addUserCard,clearCart}=userSlice.actions;
export default userSlice.reducer;