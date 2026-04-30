import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import ImageViewer from '@/components/imageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    // 1. Trocamos a View principal por um ScrollView
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>

      <View style={styles.footerContainer}>
        <Button theme="primary" label="Escolha uma foto" onPress={pickImageAsync} />
        <Button label="Use essa foto" />
      </View>

      <Text style={styles.emoji}>🍔🥗🍕</Text>
      <Text style={styles.title}>Bem-vindo ao Comidas App!</Text>
      <Text style={styles.subtitle}>O que vamos cozinhar hoje?</Text>

      <Link href="/receitas" style={styles.button}>
          Ver opções de refeição
      </Link>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // 2. Usamos flexGrow em vez de flex para permitir a rolagem
    flexGrow: 1,
    backgroundColor: "#FF9800",
    alignItems: "center",
    // 3. Ajustamos o padding para dar espaço para rolar
    paddingVertical: 40, 
    paddingHorizontal: 20,
  },
  imageContainer: {
    // 4. Removemos o flex: 1 para não forçar o esmagamento
    marginBottom: 20, // Dá um respiro entre a imagem e os botões
  },
  footerContainer: {
    // 5. Removemos o flex: 1/3 para os botões ocuparem seu espaço natural
    alignItems: 'center',
    marginBottom: 30, // Dá um respiro antes de começar os emojis
  },
  emoji: { 
    fontSize: 50, 
    marginBottom: 10 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 18, 
    color: '#ffffff', 
    marginBottom: 30 
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