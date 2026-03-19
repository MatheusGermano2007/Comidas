import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ir para home</Text>
      <Link href="/" style = {styles.button}>
          home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})