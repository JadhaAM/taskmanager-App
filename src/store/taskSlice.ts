import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';
import { getTasksFromStorage, saveTasksToStorage } from './storage';

interface TaskState {
  tasks: Task[];
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks); 
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
  },
});
export const loadTasks = () => async (dispatch: any) => {  
    const tasks = await getTasksFromStorage();  
    dispatch(setTasks(tasks));  
  };
export const { addTask, updateTask, deleteTask, setSearchQuery, setTasks } = taskSlice.actions;
export default taskSlice.reducer;