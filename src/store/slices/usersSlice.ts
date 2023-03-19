import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { addUser, fetchUsers, removeUser } from '../thunks/usersThunk';

export type UsersState = {
  isLoading: boolean;
  data: User[];
  error: null | SerializedError;
};

export type User = {
  id: number;
  name: string;
};

const initialState: UsersState = {
  isLoading: false,
  data: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetch users
    builder.addCase(fetchUsers.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // add user
    builder.addCase(addUser.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // delete user
    builder.addCase(removeUser.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
