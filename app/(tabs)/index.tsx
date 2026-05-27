import { useState, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, ImageSourcePropType, Platform } from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

import ImageViewer from '@/components/imageViewer';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList'; 
import EmojiSticker from '@/components/EmojiSticker'; 

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<any>(null);

  if (status === null) {
    requestPermission();
  }

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
  }
});