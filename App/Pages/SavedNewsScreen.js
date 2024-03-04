import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SavedNewsScreen = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const handleNewsPress = (item) => {
    navigation.navigate('ReadNews', {
      title: item.title,
      author: item.author,
      image: item.urlToImage,
      description: item.description,
      url: item.url,
    });
  };


  const fetchSavedArticles = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedArticles');
      if (saved !== null) {
        setSavedArticles(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error fetching saved articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeArticle = async (title) => {
    try {
      const existingArticles = await AsyncStorage.getItem('savedArticles');
      let savedArticles = existingArticles ? JSON.parse(existingArticles) : [];
      savedArticles = savedArticles.filter(article => article.title !== title);
      await AsyncStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      alert('Article Removed successfully!');
    } catch (error) {
      console.error('Error removing article:', error);
      alert('Article Removed Failed!');
    }
  };
  

  const onRefresh = () => {
    setRefreshing(true);
    fetchSavedArticles();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      ) : (
        <FlatList
          data={savedArticles}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity  onPress={() => handleNewsPress(item)} style={{ backgroundColor: 'lightgray', width: 330, height: 'auto', padding: 30, margin: 15, gap: 5, elevation: 5 ,alignItems:'center', borderRadius:10}}>
          <Image source={{ uri: item.urlToImage }}  style={{ width: 290, height: 190, borderRadius: 10 }} />
          <View style={{gap:5}}>
            <Text  style={{ Color: 'black', fontSize: 22, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ color: 'red', fontSize: 15, fontStyle: 'italic' }}>{item.author}</Text>
            <View style={{justifyContent:'center',marginTop:5}}>
            <TouchableOpacity onPress={() => removeArticle(item.title)}>
              <MaterialCommunityIcons name="bookmark-remove" size={28} color="black" />
              <Text style={{fontSize:10}}>Remove</Text>
            </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

export default SavedNewsScreen;
