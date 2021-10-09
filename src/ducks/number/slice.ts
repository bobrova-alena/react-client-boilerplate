/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NumberRequest, INumberResponse } from './transport';

export type NumberState = {
  number: number;
};

const numberAdapter = createEntityAdapter<NumberState>();

const initialState = numberAdapter.getInitialState({
  number: 0,
});

const numberSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setNumber(state: NumberState, action: PayloadAction<INumberResponse>) {
      state.number = action.payload?.number;
    },

    //sagas
    GET_NUMBER(_state: NumberState): void {},
    POST_NUMBER(_state: NumberState, _action: PayloadAction<NumberRequest>): void {},
  },
});

export const numberReducer = numberSlice.reducer;

export const { GET_NUMBER, setNumber, POST_NUMBER } = numberSlice.actions;
