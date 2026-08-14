import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import { Task } from '../types/task';

interface TasksScreenProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({ tasks, setTasks }) => {
  const [titulo, setTitulo] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');

  const agregarTarea = () => {
    if (!titulo.trim() || !categoria.trim()) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    const nuevaTarea: Task = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      completada: false,
      fechaCreacion: new Date().toLocaleDateString()
    };

    setTasks(prevTasks => [...prevTasks, nuevaTarea]);
    setTitulo('');
    setCategoria('');
  };

  const toggleCompletada = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completada: !task.completada } : task
      )
    );
  };

  const eliminarTarea = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Gestión de Tareas</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoría (ej. Universidad, Hogar)"
          value={categoria}
          onChangeText={setCategoria}
        />
        <TouchableOpacity style={styles.button} onPress={agregarTarea}>
          <Text style={styles.buttonText}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleCompletada(item.id)}
            >
              <Text
                style={[
                  styles.taskTitle,
                  item.completada && styles.taskCompleted
                ]}
              >
                {item.titulo}
              </Text>
              <Text style={styles.taskSubtitle}>
                {item.categoria} • {item.fechaCreacion}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarTarea(item.id)}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#212529' },
  form: { marginBottom: 20, gap: 10 },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CED4DA'
  },
  button: {
    backgroundColor: '#228BE6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#343A40' },
  taskCompleted: { textDecorationLine: 'line-through', color: '#ADB5BD' },
  taskSubtitle: { fontSize: 12, color: '#868E96', marginTop: 4 },
  deleteButton: { backgroundColor: '#FFE3E3', padding: 8, borderRadius: 6 },
  deleteText: { color: '#E03131', fontWeight: 'bold' }
});