import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TaskContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ikona për prioritetet
import { CircularProgress } from 'react-native-circular-progress'; // Grafik për progresin

export default function AddTaskScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    deadline: '',
    priority: '',
    progress: 0,
  });

  const handleSave = () => {
    const task = { id: Date.now().toString(), ...newTask };
    setTasks([...tasks, task]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={newTask.title}
        onChangeText={(text) => setNewTask({ ...newTask, title: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Course"
        value={newTask.course}
        onChangeText={(text) => setNewTask({ ...newTask, course: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Deadline"
        value={newTask.deadline}
        onChangeText={(text) => setNewTask({ ...newTask, deadline: text })}
      />

      <View style={styles.priorityContainer}>
        <Icon
          name={newTask.priority === 'High' ? 'flag' : newTask.priority === 'Medium' ? 'star' : 'check'}
          size={30}
          color={newTask.priority === 'High' ? 'red' : newTask.priority === 'Medium' ? 'orange' : 'green'}
        />
        <TextInput
          style={[styles.input, { width: '70%' }]}
          placeholder="Priority (High, Medium, Low)"
          value={newTask.priority}
          onChangeText={(text) => setNewTask({ ...newTask, priority: text })}
        />
      </View>

      <Text style={styles.progressLabel}>Progress</Text>
      <CircularProgress
        value={newTask.progress}
        radius={60}
        valueSuffix="%"
        textColor="#4CAF50"
        progressValueColor="#4CAF50"
        activeStrokeColor="#4CAF50"
        activeStrokeWidth={12}
        inActiveStrokeColor="#E0E0E0"
        inActiveStrokeWidth={12}
        showPercentage
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F1F9', // Soft pink background
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D64E84', // Dark pink color for the header
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#D64E84', // Pink border
    borderWidth: 1.5,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 15,
    backgroundColor: '#fff', // White background for inputs
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D64E84',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#D64E84', // Soft pink background for the button
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
 