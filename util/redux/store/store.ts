import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth_slice';

export const store = configureStore({
    reducer:{
        auth: authReducer
    },
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = ReturnType<typeof store.dispatch>;