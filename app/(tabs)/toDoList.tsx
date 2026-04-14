import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTarefas } from '../../hooks/useTarefas';

export default function App() {
  const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa, limparLista } = useTarefas();
  const { receita } = useLocalSearchParams();

  const [receitaVisivel, setReceitaVisivel] = useState(receita);

  useEffect(() => {
    if (receita) {
      limparLista(); 
      setReceitaVisivel(receita);
    }
  }, [receita]);

  return (
    <View style={styles.container}>
      {receitaVisivel ? (
        <View style={styles.headerReceita}>
          <Text style={styles.label}>Ingredientes para:</Text>
          <View style={styles.row}>
            <Text style={styles.nomeReceita}>{receitaVisivel}</Text>
            
          </View>
        </View>
      ) : (
        <Text style={styles.titulo}>Lista de Compras</Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar ingrediente..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <Button title="Ok" onPress={adicionarTarefa} color="#ff8800" />
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarefaContainer}>
            <Text style={styles.tarefaTexto}>{item.texto}</Text>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.check}>✅</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FF9800' },
  headerReceita: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  label: { fontSize: 14, color: '#666' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nomeReceita: { fontSize: 22, fontWeight: 'bold', color: '#E65100' },
  fechar: { fontSize: 20, color: '#999', fontWeight: 'bold', padding: 5 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 8, 
    marginRight: 10 
  },
  tarefaContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    padding: 15, 
    marginBottom: 8, 
    borderRadius: 8 
  },
  tarefaTexto: { fontSize: 16, color: '#333' },
  check: { fontSize: 18 },
});