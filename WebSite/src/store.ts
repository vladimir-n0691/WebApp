import { combineReducers, Store } from "redux";
import { createSlice, PayloadAction, configureStore as createStore } from "@reduxjs/toolkit";


export type CommonState = {
    showAppLoader: boolean,
    data: String
}

const initialCommonState: CommonState = {
    showAppLoader: false,
    data: "Data-123"
};

const commonSlice = createSlice({
    name: 'Window',
    initialState: initialCommonState,
    reducers: {
        showAppLoader: (state, action: PayloadAction<boolean>) => {
            state.showAppLoader = action.payload;
            return state;
        },
        setData: (state, action: PayloadAction<String>)=> {
            state.data = action.payload;
            return state;
        },
    }
});

export const {
    showAppLoader,
    setData
} = commonSlice.actions;

const commonReducer = commonSlice.reducer;

export default commonReducer;

export type AppState = {
    common: CommonState
};

export const appReducer = combineReducers<AppState>({
    common: commonReducer
});

export function configureStore(): Store<AppState> {
    const store = createStore({ reducer: appReducer });
    return store;
}
