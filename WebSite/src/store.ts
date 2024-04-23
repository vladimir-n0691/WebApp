import { combineReducers, Store } from "redux";
import { createSlice, PayloadAction, configureStore as createStore } from "@reduxjs/toolkit";
import { Plan } from "./common/types";


export type CommonState = {
    showAppLoader: boolean,
    plan: Plan | null
}

const initialCommonState: CommonState = {
    showAppLoader: false,
    plan: null
};

const commonSlice = createSlice({
    name: 'Window',
    initialState: initialCommonState,
    reducers: {
        showAppLoader: (state, action: PayloadAction<boolean>) => {
            state.showAppLoader = action.payload;
            return state;
        },
        setPlan: (state, action: PayloadAction<Plan | null>) => {
            state.plan = action.payload;
            return state;
        },
    }
});

export const {
    showAppLoader,
    setPlan
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
