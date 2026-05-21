import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from '@/components/imageViewer';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker'; // <-- Importamos o componente novo aqui

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // <-- Novo estado para controlar a janela

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true); // <-- Agora o botão de mais abre o modal!
  };

  const onModalClose = () => {
    setIsModalVisible(false); // <-- Função para fechar o modal
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.welcomeContainer}>
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Escolha uma foto" onPress={pickImageAsync} />
            <Button label="Use essa foto" onPress={() => setShowAppOptions(true)} />
          </View>

          <Text style={styles.emoji}>🍔🥗🍕</Text>
          <Text style={styles.title}>Bem-vindo ao Comidas App!</Text>
          <Text style={styles.subtitle}>O que vamos cozinhar hoje?</Text>

          <Link href="/receitas" style={styles.button}>
              Ver opções de refeição
          </Link>
        </View>
      )}

      {/* Aqui fica o Modal flutuante que vai aparecer quando clicar no botão de mais */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* Futuramente a lista de emojis vai entrar aqui */}
      </EmojiPicker>
      
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
  welcomeContainer: {
    alignItems: 'center',
    width: '100%',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 30, 
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
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