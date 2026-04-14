import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Receitas() {
  const router = useRouter();
  const [busca, setBusca] = useState("");

  
  const todasReceitas = [
    { nome: "Strogonoff", tempo: "40 min", origem: "Rússia 🇷🇺" },
    { nome: "Escondidinho", tempo: "50 min", origem: "Brasil (Nordeste) 🇧🇷" },
    { nome: "Bife a rolê", tempo: "1 hora", origem: "Itália / Brasil 🇮🇹🇧🇷" },
    { nome: "Lasanha", tempo: "1h 30m", origem: "Itália 🇮🇹" },
    { nome: "Feijoada", tempo: "2h+", origem: "Brasil 🇧🇷" },
    { nome: "Fricassê de Frango", tempo: "45 min", origem: "França / Brasil 🇫🇷🇧🇷" },
    { nome: "Macarronada", tempo: "30 min", origem: "Itália 🇮🇹" },
    { nome: "Panqueca", tempo: "40 min", origem: "França (Crepe) 🇫🇷" },
    { nome: "Moqueca de Peixe", tempo: "1 hora", origem: "Brasil (Bahia/ES) 🇧🇷" },
    { nome: "Pão de Queijo", tempo: "40 min", origem: "Brasil (Minas Gerais) 🇧🇷" },
    { nome: "Tacos de Carne", tempo: "45 min", origem: "México 🇲🇽" },
    { nome: "Sushi Básico", tempo: "1h 30m", origem: "Japão 🇯🇵" },
    { nome: "Risoto de Cogumelos", tempo: "40 min", origem: "Itália 🇮🇹" },
    { nome: "Ceviche", tempo: "30 min", origem: "Peru 🇵🇪" },
    { nome: "Bacalhau à Brás", tempo: "50 min", origem: "Portugal 🇵🇹" },
    { nome: "Pad Thai", tempo: "35 min", origem: "Tailândia 🇹🇭" },
    { nome: "Ratatouille", tempo: "1 hora", origem: "França 🇫🇷" },
    { nome: "Guacamole", tempo: "15 min", origem: "México 🇲🇽" },
    { nome: "Hambúrguer Artesanal", tempo: "45 min", origem: "EUA / Alemanha 🇺🇸🇩🇪" },
    { nome: "Churrasco", tempo: "3h+", origem: "Brasil / Pampas 🇧🇷" }
  ];

 
  const receitasFiltradas = todasReceitas.filter((receita) =>
    receita.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const selecionarReceita = (nome: string) => {
    router.push({
      pathname: "/toDoList",
      params: { receita: nome }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>O que deseja fazer hoje?</Text>
        <Text style={styles.subtitle}>Escolha um prato para sua lista</Text>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar no cardápio..."
        value={busca}
        onChangeText={setBusca}
        placeholderTextColor="#888"
      />

      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {receitasFiltradas.map((receita, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem} 
           
            onPress={() => selecionarReceita(receita.nome)}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.itemText}>🍲 {receita.nome}</Text>
             
              <Text style={styles.itemDetails}>
                ⏱ {receita.tempo}   •   🌍 {receita.origem}
              </Text>
            </View>
            <Text style={styles.arrow}>➔</Text>
          </TouchableOpacity>
        ))}
        
       
        {receitasFiltradas.length === 0 && (
          <Text style={styles.emptyText}>Nenhum prato encontrado 😕</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9800",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffe0b2',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  infoContainer: {
    flex: 1, 
  },
  itemText: {
    fontSize: 18,
    color: '#E65100',
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  itemDetails: {
    fontSize: 13,
    color: '#777', 
    fontWeight: '500',
    marginLeft: 28, 
  },
  arrow: {
    fontSize: 18,
    color: '#FF9800',
    paddingLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  }
});