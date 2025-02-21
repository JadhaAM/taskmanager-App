import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const router = useRouter();

  return (
    
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/task/${task.id}`)}
    >
         
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.date}>
          {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </Text>
      </View>
    </Pressable>
   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  
    marginTop:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 18,
    padding:20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
 
  
   
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
 
});