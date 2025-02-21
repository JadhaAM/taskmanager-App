import React from 'react';  
import { FlatList, StyleSheet, View, Text } from 'react-native';  
import { useSelector } from 'react-redux';  
import { RootState } from '../store';  
import TaskItem from './TaskItem';  

export default function TaskList() {  
  const tasks = useSelector((state: RootState) => state.tasks.tasks);  
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);  
  const filteredTasks = tasks.filter(task =>  
    task.title.toLowerCase().includes(searchQuery.toLowerCase())  
  );  

  return (  
    <View style={styles.container}>  
      {filteredTasks.length > 0 ? ( 
        <FlatList  
          data={filteredTasks}  
          renderItem={({ item }) => <TaskItem task={item} />}  
          keyExtractor={item => item.id}  
          contentContainerStyle={styles.list}  
        />  
      ) : (  
        <Text style={styles.noTasks}>No tasks found.</Text> 
      )}  
    </View>  
  );  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    paddingHorizontal: 16,  
    paddingTop: 8,  
  },  
  list: {  
    flexGrow: 1, 
  },  
  noTasks: {  
    textAlign: 'center', 
    fontSize: 16,  
    color: '#888',  
    marginTop: 20,  
  },  
});