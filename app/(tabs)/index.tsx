import domtoimage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Image, ImageSourcePropType, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/imageViewer';

const PlaceholderImage = require('@/assets/images/emoji1.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [randomRecipe, setRandomRecipe] = useState<any>(null);
  
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<any>(null);
  
  const router = useRouter(); 

  if (status === null) {
    requestPermission();
  }

  const fetchRandomRecipe = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRandomRecipe(data.meals[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
    setSelectedImage(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true); 
  };

  const onModalClose = () => {
    setIsModalVisible(false); 
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          setSelectedImage(localUri);
          setPickedEmoji(undefined);
          setShowAppOptions(false);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
        
        setSelectedImage(dataUrl);
        setPickedEmoji(undefined);
        setShowAppOptions(false);
      } catch (e) {
        console.log(e);
      }
    }
  };


  const handleMakeRecipe = () => {
    if (randomRecipe) {
      router.push({
        pathname: "/toDoList", 
        params: { nomeDaReceita: randomRecipe.strMeal }
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>
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
            </View>

            <Text style={styles.emoji}>🍔🥗🍕</Text>
            <Text style={styles.title}>Bem-vindo ao Comidas App!</Text>
            <Text style={styles.subtitle}>O que vamos cozinhar hoje?</Text>

            <Link href="/receitas" style={styles.button}>
                Ver opções de refeição
            </Link>

            {randomRecipe && (
              <View style={styles.recipeCard}>
                {}
                <TouchableOpacity onPress={fetchRandomRecipe} activeOpacity={0.8} style={styles.recipeTouchArea}>
                  <Text style={styles.recipeCardTitle}>Sugestão do Chef 👨‍🍳</Text>
                  <Image source={{ uri: randomRecipe.strMealThumb }} style={styles.recipeImage} />
                  <Text style={styles.recipeName}>{randomRecipe.strMeal}</Text>
                  <Text style={styles.recipeCategory}>Categoria: {randomRecipe.strCategory}</Text>
                  <Text style={styles.hintText}>(Toque para mudar)</Text>
                </TouchableOpacity>

                {}
                <TouchableOpacity style={styles.makeRecipeButton} onPress={handleMakeRecipe}>
                  <Text style={styles.makeRecipeButtonText}>Fazer essa receita sugerida</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        
      </ScrollView>
    </GestureHandlerRootView>
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
    flex: 1, 
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
    marginBottom: 35,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 320,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  recipeTouchArea: {
    padding: 15,
    alignItems: 'center',
  },
  recipeCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  recipeImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 2,
  },
  recipeCategory: {
    fontSize: 14,
    color: '#666666',
  },
  hintText: {
    fontSize: 12,
    color: '#aaaaaa',
    marginTop: 5,
  },
  makeRecipeButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  makeRecipeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});