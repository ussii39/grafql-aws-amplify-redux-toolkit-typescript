import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./counterAPI";
import PubSub from "@aws-amplify/pubsub";
import awsconfig from "../../aws-exports";
import API, { graphqlOperation } from "@aws-amplify/api";
import { createTodo, deleteTodo } from "../../graphql/mutations";
import { listTodos } from "../../graphql/queries";
import { onCreateTodo, onDeleteTodo } from "../../graphql/subscriptions";

API.configure(awsconfig);
PubSub.configure(awsconfig);
export interface CounterState {
  todos: any[];
  status: string;
}

const initialState: CounterState = {
  todos: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (todo: string) => {
    const result = await fetchCount(todo);
    return result;
    // The value we return becomes the `fulfilled` action payload
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    decrement: (state) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<string>) => {},
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = [...state.todos, action.payload];
        console.log(action.payload);
      });
  },
});

export const { decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.todos;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const PostTodo = (todo: string): AppThunk => (dispatch, getState) => {};

export default counterSlice.reducer;
