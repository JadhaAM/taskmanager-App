import React, { useState, useEffect } from 'react';  
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';  
import { useRouter } from 'expo-router';  
import { useDispatch } from 'react-redux';  
import { addTask } from '../../store/taskSlice';  
import DateTimePicker from '@react-native-community/datetimepicker';  
import Header from '../../components/Header';  
import * as ImagePicker from 'expo-image-picker';  
import * as Notifications from 'expo-notifications';  

export default function AddTask() {  
  const [title, setTitle] = useState('');  
  const [description, setDescription] = useState('');  
  const [dueDate, setDueDate] = useState(new Date());  
  const [showDatePicker, setShowDatePicker] = useState(false);  
  const [image, setImage] = useState(null);  

  const router = useRouter();  
  const dispatch = useDispatch();  

  useEffect(() => {  

    const requestPermissions = async () => {  
      const { status } = await Notifications.requestPermissionsAsync();  
      if (status !== 'granted') {  
        Alert.alert('Permission not granted', 'You need to enable notifications for reminders to work.');  
      }  
    };  

    requestPermissions();  
  }, []);  

  const handleSave = async () => {  
    if (!title.trim()) {  
      Alert.alert('Error', 'Title is required');  
      return;  
    }  
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    
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
      addTask({  
        id: Date.now().toString(),  
        title: title.trim(),  
        description: description.trim(),  
        dueDate: dueDate.toISOString(),  
         image,  
        completed: false,  
        notificationId, 
      })  
    );  

    router.back();  
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

  return (  
    <View style={styles.container}>  
      <Header title={"Add Task"} />  
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
          Select Due Date: {dueDate.toLocaleDateString()}  
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

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}  

      <TouchableOpacity   
        style={styles.saveButton}  
        onPress={handleSave}  
      >  
        <Text style={styles.saveButtonText}>Save Task</Text>  
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
    backgroundColor: '#f39c12',  
    padding: 15,  
    borderRadius: 8,  
    marginBottom: 16,  
  },  
  imageButtonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 16,  
  },  
  imagePreview: {  
    width: '100%',  
    height: 200,  
    marginVertical: 10,  
    borderRadius: 8,  
  },  
  saveButton: {  
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
  saveButtonText: {  
    color: '#fff',  
    textAlign: 'center',  
    fontSize: 18,  
    fontWeight: 'bold',  
  },  
});