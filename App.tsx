import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from './src/screens/HomeScreen';
import { TasksScreen } from './src/screens/TasksScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { Task, RootTabParamList } from './src/types/task';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      titulo: 'Completar laboratorio de TypeScript',
      categoria: 'Universidad',
      completada: true,
      fechaCreacion: '12/8/2026'
    },
    {
      id: '2',
      titulo: 'Subir repositorio a GitHub',
      categoria: 'Universidad',
      completada: false,
      fechaCreacion: '13/8/2026'
    }
  ]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#228BE6' },
            headerTintColor: '#FFF',
            tabBarActiveTintColor: '#228BE6',
            tabBarInactiveTintColor: '#868E96'
          }}
        >
          <Tab.Screen name="Inicio">
            {() => <HomeScreen tasks={tasks} />}
          </Tab.Screen>

          <Tab.Screen name="Tareas">
            {() => <TasksScreen tasks={tasks} setTasks={setTasks} />}
          </Tab.Screen>

          <Tab.Screen name="Ajustes">
            {() => <SettingsScreen setTasks={setTasks} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}