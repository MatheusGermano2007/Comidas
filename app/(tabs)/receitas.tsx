import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Receitas() {
  const router = useRouter();

  const selecionarReceita = (nome: string) => {
    router.push({
      pathname: "/toDoList",
      params: { receita: nome }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opções do Cardápio </Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => selecionarReceita("Strogonoff")}>
          <Text style={styles.item}> Strogonoff</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selecionarReceita("Escondidinho")}>
          <Text style={styles.item}> Escondidinho de carne seca</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selecionarReceita("Bife a role")}>
          <Text style={styles.item}> Bife a role</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selecionarReceita("Lasanha")}>
          <Text style={styles.item}> Lasanha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selecionarReceita("Feijoada")}>
          <Text style={styles.item}> Feijoada</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.aviso}>
        Clique em um prato para começar sua lista!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9800",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  item: {
    fontSize: 20,
    color: '#FF9800',
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  aviso: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
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