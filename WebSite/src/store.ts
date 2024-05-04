import { combineReducers, Store } from "redux";
import { createSlice, PayloadAction, configureStore as createStore } from "@reduxjs/toolkit";
import { Plan } from "./common/types";


export type CommonState = {
    showAppLoader: boolean,
    activePlan: Plan | null
}

const initialCommonState: CommonState = {
    showAppLoader: false,
    activePlan: null
};

const commonSlice = createSlice({
    name: 'Window',
    initialState: initialCommonState,
    reducers: {
        showAppLoader: (state, action: PayloadAction<boolean>) => {
            state.showAppLoader = action.payload;
            return state;
        },
        setActivePlan: (state, action: PayloadAction<Plan | null>) => {
            state.activePlan = action.payload;
            return state;
        },
    }
});

export const {
    showAppLoader,
    setActivePlan
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
