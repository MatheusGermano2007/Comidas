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
   
    flexGrow: 1,
    backgroundColor: "#FF9800",
    alignItems: "center",
   
    paddingVertical: 40, 
    paddingHorizontal: 20,
  },
  imageContainer: {
    
    marginBottom: 20, 
  },
  footerContainer: {
    
    alignItems: 'center',
    marginBottom: 30, 
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