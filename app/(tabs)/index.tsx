import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍔🥗🍕</Text>
      <Text style={styles.title}>Bem-vindo ao Comidas App!</Text>
      <Text style={styles.subtitle}>O que vamos cozinhar hoje?</Text>

      <Link href="/receitas" style={styles.button}>
          Ver opções de refeição
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emoji: { fontSize: 50, marginBottom: 10 },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: { fontSize: 18, color: '#ffffff', marginBottom: 30 },
  button: {
    backgroundColor: '#ffffff',
    color: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 18,
    overflow: 'hidden',
    textAlign: 'center',
  }
});