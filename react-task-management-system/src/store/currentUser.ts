import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentUserState {
    id: string;
    email: string;
    token: string;
    // Add more properties as needed
}

const initialState: CurrentUserState = {
    id: '',
    email: '',
    token: '',
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUserState>) => {
            return action.payload;
        },
        setCurrentUserOld: (state, action: PayloadAction<CurrentUserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        clearCurrentUser: () => initialState,
    },
});

export const { setCurrentUser,setCurrentUserOld, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;