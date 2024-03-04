import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

const ReadNewsScreen = ({ route }) => {
  const { title, author, image, description, url } = route.params;

  const openUrl = () => {
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'lightgray',padding:20,borderRadius:35 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 10, color:'red'}}>{author}</Text>
      <Image source={{ uri: image }} style={{ width: 300, height: 200, marginBottom: 10 }} />
      <Text style={{ fontSize: 17,padding:10}}>{description}</Text>
      <TouchableOpacity onPress={openUrl} style={{ marginTop: 30, padding: 15, backgroundColor: 'blue', borderRadius: 10, elevation:5 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Read Full News</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadNewsScreen;
