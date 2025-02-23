import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressCircle } from 'react-native-svg-charts';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

export default function AddTaskScreen({ navigation }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    deadline: new Date(),
    time: new Date(),
    priority: 'Medium',
    progress: 0,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSave = () => {
    if (!newTask.title || !newTask.course) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      course: newTask.course,
      deadline: newTask.deadline.toISOString(),
      time: newTask.time.toISOString(),
      priority: newTask.priority,
      progress: newTask.progress,
    };

    console.log('Saving Task:', task);
    setTasks((prevTasks) => [...prevTasks, task]);
    navigation.goBack();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>➕ Add New Task</Text>

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

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Icon name="calendar" size={20} color="#D64E84" />
        <Text style={styles.dateText}>{newTask.deadline.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={newTask.deadline}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setNewTask({ ...newTask, deadline: selectedDate });
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.datePicker}>
        <Icon name="clock-o" size={20} color="#D64E84" />
        <Text style={styles.dateText}>{newTask.time.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={newTask.time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setNewTask({ ...newTask, time: selectedTime });
          }}
        />
      )}

      <View style={styles.pickerContainer}>
        <Icon name="flag" size={25} color="#D64E84" style={{ marginRight: 10 }} />
        <Picker
          selectedValue={newTask.priority}
          style={styles.picker}
          onValueChange={(itemValue) => setNewTask({ ...newTask, priority: itemValue })}
        >
          <Picker.Item label="🔴 High Priority" value="High" />
          <Picker.Item label="🟡 Medium Priority" value="Medium" />
          <Picker.Item label="🟢 Low Priority" value="Low" />
        </Picker>
      </View>

      <Text style={styles.progressLabel}>Progress: {newTask.progress}%</Text>
      <Slider
        style={{ width: '90%', height: 40 }}
        minimumValue={0}
        maximumValue={100}
        step={5}
        value={newTask.progress}
        onValueChange={(value) => setNewTask({ ...newTask, progress: value })}
        minimumTrackTintColor="#D64E84"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#D64E84"
      />

      <ProgressCircle
        style={{ height: 100, marginBottom: 20 }}
        progress={newTask.progress / 100}
        progressColor={'#FF69B4'}
        backgroundColor="#F8BBD0"
      />

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.7}>
          <Text style={styles.buttonText}>✅ Save Task</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D64E84',
    marginBottom: 20,
  },
  input: {
    height: 45,
    width: '90%',
    borderColor: '#D64E84',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#D64E84',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '90%',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderColor: '#D64E84',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#D64E84',
    paddingVertical: 14,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
