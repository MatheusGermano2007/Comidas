import { Text, View, StyleSheet, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Ionicons name="fast-food-outline" size={70} color="#ffffff" style={styles.icon} />
      
      <Text style={styles.title}>Sobre o App</Text>

      <View style={styles.card}>
        <Text style={styles.paragraph}>
          Sabe aquela frustração de começar a cozinhar e perceber que esqueceu um ingrediente no mercado? Esse app nasceu exatamente para acabar com isso! 
        </Text>

        <Text style={styles.paragraph}>
          Ele foi criado para ser o seu assistente na hora de preparar <Text style={styles.highlight}>receitas tradicionais</Text>. A ideia é simples: você escolhe o prato do dia e adiciona todos os ingredientes na sua lista antes de colocar a mão na massa.
        </Text>

        <Text style={styles.paragraph}>
          Conforme for separando os itens na bancada (ou pegando na prateleira do mercado), é só ir apagando cada ingrediente da lista. 
        </Text>

        <Text style={styles.footerText}>
          Um processo simples e prático para garantir que nada fique para trás.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: "#FF9800", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    color: '#444444', 
    lineHeight: 26, 
    marginBottom: 15,
    textAlign: 'justify',
  },
  highlight: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 18,
    color: '#FF9800',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 26,
  }
});