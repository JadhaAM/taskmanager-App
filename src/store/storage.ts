import AsyncStorage from '@react-native-async-storage/async-storage';  
import { Task } from '../types/task';  

const TASKS_KEY = '@tasks';  

export const saveTasksToStorage = async (tasks: Task[]) => {  
  try {  
    const jsonValue = JSON.stringify(tasks);  
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);  
  } catch (e) {  
    console.error("Failed to save tasks to storage", e);  
  }  
};  

export const getTasksFromStorage = async (): Promise<Task[]> => {  
  try {  
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);  
    return jsonValue != null ? JSON.parse(jsonValue) : [];  
  } catch (e) {  
    console.error("Failed to load tasks from storage", e);  
    return [];  
  }  
};