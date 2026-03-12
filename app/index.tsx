import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router"


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ir para a about</Text>
      <Link href="/about" style = {styles.button}>
          about
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#000000ff',
  }
});