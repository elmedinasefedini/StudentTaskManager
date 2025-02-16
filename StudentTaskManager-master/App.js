import React, { useState, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Për përdorimin e ikonave
import LinearGradient from 'react-native-linear-gradient'; // Importoni LinearGradient

// Context API për menaxhimin e gjendjes së detyrave
export const TaskContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Math Homework',
      course: 'Mathematics',
      deadline: '2023-12-15',
      priority: 'High',
      progress: 30
    }
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home" // Ekrani fillestar kur hapet aplikacioni
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Task Manager',
              headerStyle: {
                backgroundColor: '#F8BBD0', // Rozë e hapur për header
                shadowColor: 'transparent',
                borderBottomWidth: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 26,
              },
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => alert('Search button clicked!')}
                >
                  <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{
              title: 'Add New Task',
              headerBackground: () => (
                <LinearGradient
                  colors={['#F48FB1', '#D81B60']} // Gradients ngjyrash
                  style={{ flex: 1 }}
                />
              ),
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />
          <Stack.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{
              title: 'Task Analytics',
              headerBackground: () => (
                <LinearGradient
                  colors={['#F48FB1', '#D81B60']} // Gradients ngjyrash
                  style={{ flex: 1 }}
                />
              ),
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskContext.Provider>
  );
}
