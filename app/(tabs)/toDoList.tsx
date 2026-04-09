import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTarefas } from '../../hooks/useTarefas';
import { useLocalSearchParams } from 'expo-router'; 

export default function App() {
  const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();
  const { receita } = useLocalSearchParams();

  const [receitaVisivel, setReceitaVisivel] = useState(receita);

  useEffect(() => {
    if (receita) {
      setReceitaVisivel(receita);
    }
  }, [receita]);

  return (
    <View style={styles.container}>
      {receitaVisivel ? (
        <View style={styles.receitaTopoContainer}>
          <Text style={styles.receitaTopo}>
            Receita de hoje - {receitaVisivel}, adicione os ingredientes
          </Text>
          <TouchableOpacity 
            style={styles.botaoFecharReceita} 
            onPress={() => setReceitaVisivel("")}
          >
            <Text style={styles.textoBotaoFechar}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Text style={styles.titulo}>Lista de Compras</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite um ingrediente..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <Button title="Adicionar" onPress={adicionarTarefa} color="#ff8800" />
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarefaContainer}>
            <Text style={styles.tarefaTexto}>{item.texto}</Text>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.remover}>✅</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#FF9800' 
  },
  receitaTopoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff8800',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  receitaTopo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff8800',
    flex: 1,
    marginRight: 10,
  },
  botaoFecharReceita: {
    backgroundColor: '#ff8800',
    borderRadius: 15,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoFechar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: '#fff' 
  },
  inputContainer: { 
    flexDirection: 'row', 
    marginBottom: 10 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 5, 
    marginRight: 10,
    backgroundColor: '#fff'
  },
  tarefaContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    padding: 15, 
    marginBottom: 5, 
    borderRadius: 5,
    elevation: 2 
  },
  tarefaTexto: { 
    fontSize: 16 
  },
  remover: { 
    fontSize: 18, 
    color: 'green' 
  },
});