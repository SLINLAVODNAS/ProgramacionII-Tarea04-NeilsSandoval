import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Task } from '../types/task';

interface HomeScreenProps {
  tasks: Task[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ tasks }) => {
  const [total, setTotal] = useState<number>(0);
  const [completadas, setCompletadas] = useState<number>(0);
  const [pendientes, setPendientes] = useState<number>(0);

  useEffect(() => {
    setTotal(tasks.length);
    const done = tasks.filter(t => t.completada).length;
    setCompletadas(done);
    setPendientes(tasks.length - done);
  }, [tasks]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Resumen General</Text>
      
      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: '#4C6EF5' }]}>
          <Text style={styles.cardTitle}>Total de Tareas</Text>

          <Text style={styles.cardValue}>{total}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#40C057' }]}>
          <Text style={styles.cardTitle}>Completadas</Text>

          <Text style={styles.cardValue}>{completadas}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#FA5252' }]}>
          <Text style={styles.cardTitle}>Pendientes</Text>

          <Text style={styles.cardValue}>{pendientes}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>📌 Información del Sistema</Text>

        <Text style={styles.infoText}>
          Estado actualizado reactivamente mediante hooks (`useState` y `useEffect`).
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#212529' },
  cardContainer: { gap: 15 },
  card: { padding: 20, borderRadius: 12, elevation: 3 },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  cardValue: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
  infoBox: { marginTop: 30, padding: 15, backgroundColor: '#E9ECEF', borderRadius: 8 },
  infoTitle: { fontWeight: 'bold', marginBottom: 5, color: '#495057' },
  infoText: { color: '#6C757D', fontSize: 14 }
});