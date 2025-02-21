import React from 'react';  
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';  
import { useLocalSearchParams, useRouter } from 'expo-router';  
import { useSelector, useDispatch } from 'react-redux';  
import { RootState } from '../../store';  
import { deleteTask } from '../../store/taskSlice';  
import { format } from 'date-fns';  
import Header from '../../components/Header';  

export default function TaskDetail() {  
  const { id } = useLocalSearchParams();  
  const router = useRouter();  
  const dispatch = useDispatch();  

  const task = useSelector((state: RootState) =>  
    state.tasks.tasks.find(t => t.id === id)  
  );  

  if (!task) {  
    return (  
      <View style={styles.container}>  
        <Text style={styles.notFoundText}>Task not found</Text>  
      </View>  
    );  
  }  

  const handleDelete = () => {  
    dispatch(deleteTask(task.id));  
    router.back();  
  };  

  return (  
    <View style={styles.container}>  
      <Header title={"Task Details"} />  
      <View style={styles.card}>  
        <Text style={styles.title}>{task.title}</Text>  
        <Text style={styles.date}>  
          Due: {format(new Date(task.dueDate), 'MMMM dd, yyyy')}  
        </Text>  
        <Text style={styles.description}>{task.description}</Text>  

        {/* Conditional rendering of the image preview */}  
        {task.image && (  
          <Image  
            source={{ uri: task.image }}  
            style={styles.imagePreview}  
            resizeMode="cover"  
          />  
        )}  
      </View>  
      
      <View style={styles.buttonContainer}>  
        <TouchableOpacity  
          style={[styles.button, styles.editButton]}  
          onPress={() => router.push(`/task/edit/${task.id}`)}  
        >  
          <Text style={styles.buttonText}>Edit</Text>  
        </TouchableOpacity>  
        
        <TouchableOpacity  
          style={[styles.button, styles.deleteButton]}  
          onPress={handleDelete}  
        >  
          <Text style={styles.buttonText}>Delete</Text>  
        </TouchableOpacity>  
      </View>  
    </View>  
  );  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    padding: 16,  
    backgroundColor: '#f5f5f5',  
    marginTop: 50,  
  },  
  card: {  
    backgroundColor: '#fff',  
    borderRadius: 12,  
    padding: 20,  
    marginBottom: 20,  
    shadowColor: '#000',  
    shadowOffset: {  
      width: 0,  
      height: 2,  
    },  
    shadowOpacity: 0.1,  
    shadowRadius: 4,  
    elevation: 3,  
  },  
  title: {  
    fontSize: 24,  
    fontWeight: 'bold',  
    marginBottom: 12,  
    color: '#333',  
  },  
  date: {  
    fontSize: 16,  
    color: '#666',  
    marginBottom: 16,  
  },  
  description: {  
    fontSize: 16,  
    marginBottom: 24,  
    color: '#444',  
    lineHeight: 24,  
  },  
  imagePreview: {  
    width: '100%',  
    height: 200,
    borderRadius: 8,  
    marginTop: 12,  
  },  
  buttonContainer: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    paddingHorizontal: 20,  
  },  
  button: {  
    flex: 0.45,  
    padding: 15,  
    borderRadius: 8,  
    alignItems: 'center',  
    justifyContent: 'center',  
    shadowColor: '#000',  
    shadowOffset: {  
      width: 0,  
      height: 2,  
    },  
    shadowOpacity: 0.25,  
    shadowRadius: 3.84,  
    elevation: 5,  
  },  
  editButton: {  
    backgroundColor: '#4a90e2',  
  },  
  deleteButton: {  
    backgroundColor: '#ff4757',  
  },  
  buttonText: {  
    color: '#fff',  
    fontSize: 16,  
    fontWeight: '600',  
  },  
  notFoundText: {  
    fontSize: 18,  
    color: '#666',  
    textAlign: 'center',  
    marginTop: 20,  
  },  
});