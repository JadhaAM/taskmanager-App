import { Link, Stack } from 'expo-router';  
import { StyleSheet, View } from 'react-native';  
import TaskList from '../components/TaskList';  
import SearchBar from '../components/SearchBar';  
import FAB from '../components/FAB';  
import Header from '../components/Header';  
import { useEffect } from 'react';  
import { useDispatch } from 'react-redux';  
import { loadTasks } from '../store/taskSlice';  

export default function Home() {  
  const dispatch = useDispatch();  

 
  useEffect( () => {  
    const fetchTasks = async () => {  
      await dispatch(loadTasks());  
    };  

    fetchTasks();  
  }, [dispatch]);  

  return (  
    <View style={styles.container}>  
      <Stack.Screen  
        options={{  
          title: 'Tasks',  
          headerSearchBarOptions: {  
            placeholder: 'Search tasks...',  
          },  
        }}  
      />  
      <Header title={"Task Manager"} />  
      <SearchBar />  
      <TaskList />  
      <FAB />  
    </View>  
  );  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#fff',  
    marginTop: 30,  
  },  
});