import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
//get goals
const goals = JSON.parse(localStorage.getItem("goals"));

const initialState = {
  goals: goals ? goals : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getGoals = createAsyncThunk(
  "goals/getGoals",
  async (user, thunkAPI) => {
    try {
        return await goalService.getGoals(user);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
  }
);
export const setGoal = createAsyncThunk(
  "goals/setGoal",
  async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.setGoal(goalData,token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
  }
);
export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (user, thunkAPI) => {
    try {
        return await goalService.updateGoal(user);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
  }
);
export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalData,token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
  }
);



export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers:(builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      })
      .addCase(setGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(setGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter((goal)=>goal._id !== action.payload._id);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.goals = null;
      })
    },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
