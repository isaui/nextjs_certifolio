import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import User from '../../next_models/user';


const initialState: User = {
    authClient: null,
    identity: null,
    contract:null
}


export const auth = createSlice({
    name:'auth',
    initialState: initialState,
    reducers: {
        logout: () =>{
            return initialState;
        },
        login: (state, action:PayloadAction<User>) => {
            state = action.payload;
        },
    }
});

export const {login, logout} = auth.actions;
const authReducer = auth.reducer;
export default authReducer;

