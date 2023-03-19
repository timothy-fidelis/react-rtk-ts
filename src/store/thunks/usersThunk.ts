import { faker } from '@faker-js/faker';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User } from '../slices/usersSlice';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get<User[]>('http://localhost:3005/users');
  // DEV ONLY!!!
  await pause(1000);
  return response.data;
});

const addUser = createAsyncThunk('users/add', async () => {
  const response = await axios.post<User>('http://localhost:3005/users', {
    name: faker.name.fullName(),
  });

  return response.data;
});

const removeUser = createAsyncThunk('users/remove', async (user: User) => {
  await axios.delete<User>(`http://localhost:3005/users/${user.id}`);

  return user;
});

// DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { addUser, fetchUsers, removeUser };
