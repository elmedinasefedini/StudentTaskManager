import React, { useState, useEffect, createContext } from 'react';  // Importi i useEffect
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Për përdorimin e ikonave

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
      progress: 30,
    },
  ]);
  const [loading, setLoading] = useState(false);  // Shtimi i loading për të simuluar një ngarkim

  // Efekti për kontrollimin e lejeve dhe dërgimin e njoftimeve
  useEffect(() => {
    console.log('App is mounted!');
    // Mund të simulojmë një ngarkim për të treguar ActivityIndicator
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulimi i ngarkimit për 2 sekonda
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
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
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Task Manager',
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
              headerStyle: {
                backgroundColor: '#F48FB1', // Rozë e lehtë për headerin
              },
            }}
          />
          <Stack.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{
              title: 'Task Analytics',
              headerStyle: {
                backgroundColor: '#F48FB1', // Rozë e lehtë për Analytics headerin
              },
            }}
          />
        </Stack.Navigator>

        {/* Loading Spinner */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F48FB1" />
          </View>
        )}
      </NavigationContainer>
    </TaskContext.Provider>
  );
}

// Stilet për Loading Spinner
const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};
