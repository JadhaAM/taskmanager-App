import React, { useState, useEffect } from 'react';  
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';  
import { useLocalSearchParams, useRouter } from 'expo-router';  
import { useDispatch, useSelector } from 'react-redux';  
import { updateTask } from '../../../store/taskSlice';  
import { RootState } from '../../../store';  
import DateTimePicker from '@react-native-community/datetimepicker';  
import * as ImagePicker from 'expo-image-picker';  
import * as Notifications from 'expo-notifications';  

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export default function EditTask() {  
  const { id } = useLocalSearchParams();  
  const router = useRouter();  
  const dispatch = useDispatch();  

  const task = useSelector((state: RootState) =>  
    state.tasks.tasks.find(t => t.id === id)  
  );  

  const [title, setTitle] = useState('');  
  const [description, setDescription] = useState('');  
  const [dueDate, setDueDate] = useState(new Date());  
  const [showDatePicker, setShowDatePicker] = useState(false);  
  const [image, setImage] = useState<string | null>(null);  

  useEffect(() => {  
    if (task) {  
      setTitle(task.title);  
      setDescription(task.description);  
      setDueDate(new Date(task.dueDate));  
      setImage(task.image || null);  
    } else {  
      Alert.alert('Error', 'Task not found');  
      router.back();  
    }  
  }, [task]);  

  const handleUpdate = async () => {  
    if (!title.trim()) {  
      Alert.alert('Error', 'Title is required');  
      return;  
    }  

    if (task) {  
     
      const notificationId = await Notifications.scheduleNotificationAsync({  
        content: {  
          title: 'Task Reminder',  
          body: `Don't forget to complete: ${title}`,  
        },  
        trigger: {  
          type: 'date',  
          date: dueDate,  
        },  
      });  

      dispatch(  
        updateTask({  
          ...task,  
          title: title.trim(),  
          description: description.trim(),  
          dueDate: dueDate.toISOString(),  
          image, 
          notificationId,
        })  
      );  
      router.back();  
    }  
  };  

  const pickImage = async () => {  
    const result = await ImagePicker.launchImageLibraryAsync({  
      mediaTypes: ImagePicker.MediaTypeOptions.All,  
      allowsEditing: true,  
      aspect: [4, 3],  
      quality: 1,  
    });  

    if (!result.canceled) {  
      setImage(result.assets[0].uri);  
    }  
  };  

  if (!task) return null;  

  return (  
    <View style={styles.container}>  
      <Text style={styles.header}>Edit Task</Text>  
      
      <TextInput  
        style={styles.input}  
        placeholder="Title"  
        value={title}  
        onChangeText={setTitle}  
      />  
      
      <TextInput  
        style={[styles.input, styles.description]}  
        placeholder="Description"  
        value={description}  
        onChangeText={setDescription}  
        multiline  
      />  
      
      <TouchableOpacity   
        style={styles.dateButton}  
        onPress={() => setShowDatePicker(true)}  
      >  
        <Text style={styles.dateButtonText}>  
          Due Date: {dueDate.toLocaleDateString()}  
        </Text>  
      </TouchableOpacity>  

      {showDatePicker && (  
        <DateTimePicker  
          value={dueDate}  
          mode="date"  
          onChange={(event, selectedDate) => {  
            setShowDatePicker(false);  
            if (selectedDate) {  
              setDueDate(selectedDate);  
            }  
          }}  
        />  
      )}  

      <TouchableOpacity   
        style={styles.imageButton}  
        onPress={pickImage}  
      >  
        <Text style={styles.imageButtonText}>Upload Image</Text>  
      </TouchableOpacity>  

      {image && (  
        <Image  
          source={{ uri: image }}  
          style={styles.imagePreview}  
          resizeMode="cover"  
        />  
      )}  

      <TouchableOpacity   
        style={styles.updateButton}  
        onPress={handleUpdate}  
      >  
        <Text style={styles.updateButtonText}>Update Task</Text>  
      </TouchableOpacity>  

      <TouchableOpacity   
        style={styles.cancelButton}  
        onPress={() => router.back()}  
      >  
        <Text style={styles.cancelButtonText}>Cancel</Text>  
      </TouchableOpacity>  
    </View>  
  );  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    padding: 16,  
    backgroundColor: '#fff',  
    marginTop: 50,  
  },  
  header: {  
    fontSize: 24,  
    fontWeight: 'bold',  
    marginBottom: 20,  
    textAlign: 'center',  
    color: '#333',  
  },  
  input: {  
    height: 40,  
    borderWidth: 1,  
    borderColor: '#ddd',  
    borderRadius: 8,  
    padding: 10,  
    marginBottom: 16,  
    backgroundColor: '#f8f8f8',  
  },  
  description: {  
    height: 100,  
    textAlignVertical: 'top',  
  },  
  dateButton: {  
    backgroundColor: '#4a90e2',  
    padding: 15,  
    borderRadius: 8,  
    marginBottom: 16,  
    marginTop: 10,  
  },  
  dateButtonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 16,  
    fontWeight: '500',  
  },  
  imageButton: {  
    backgroundColor: '#4a90e2',  
    padding: 15,  
    borderRadius: 8,  
    marginBottom: 16,  
    marginTop: 10,  
  },  
  imageButtonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 16,  
    fontWeight: '500',  
  },  
  imagePreview: {  
    width: '100%',  
    height: 200,  
    borderRadius: 8,  
    marginTop: 12,  
  },  
  updateButton: {  
    backgroundColor: '#2ecc71',  
    padding: 15,  
    borderRadius: 8,  
    marginTop: 20,  
    marginBottom: 16,  
    shadowColor: '#000',  
    shadowOffset: {  
      width: 0,  
      height: 2,  
    },  
    shadowOpacity: 0.25,  
    shadowRadius: 3.84,  
    elevation: 5,  
  },  
  updateButtonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 18,  
    fontWeight: 'bold',  
  },  
  cancelButton: {  
    backgroundColor: '#95a5a6',  
    padding: 15,  
    borderRadius: 8,  
    marginBottom: 16,  
  },  
  cancelButtonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 16,  
    fontWeight: '500',  
  },  
});