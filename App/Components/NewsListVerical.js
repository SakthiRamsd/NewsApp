import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const NewsListVertical = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=8bf522652b46403abd8c42d4f2f1f590`);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category]);


  const handleNewsPress = (item) => {
    navigation.navigate('ReadNews', {
      title: item.title,
      author: item.author,
      image: item.urlToImage,
      description: item.description,
      url: item.url,
    });
  };

   
  const handleSaveArticle = async (item) => {
    try {
      // Fetch existing saved articles from AsyncStorage
      const savedArticlesString = await AsyncStorage.getItem('savedArticles');
      let savedArticles = [];
      if (savedArticlesString) {
        savedArticles = JSON.parse(savedArticlesString);
      }
      // Add the new article to the list of saved articles
      savedArticles.push(item);
      // Save the updated list of articles to AsyncStorage
      await AsyncStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      alert('Article saved successfully!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article.');
    }
  };
  

  const handleShareArticle = async (item) => {
    try {
      const result = await Share.share({
        message: `${item.title}\n\n${item.url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };


  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleNewsPress(item)} style={{ backgroundColor: 'lightgray', padding: 20, width: 340, margin: 10, gap: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', elevation: 6, borderRadius:10 }}>
          <Image source={{ uri: item.urlToImage }}  style={{ width: 170, height: 100, borderRadius: 5 }} />
          <View style={{ justifyContent: 'center', flexShrink: 2, gap: 4 }}>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold',maxHeight:120 }}>{item.title}</Text>
            <Text style={{ color: 'red', fontSize: 12, fontStyle: 'italic' }}>{item.author}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>
            <TouchableOpacity onPress={() => handleSaveArticle(item)} style={{alignItems:'center',justifyContent:"center"}}>
              <Ionicons name="bookmark" size={20} color="black" />
              <Text style={{fontSize:12}}>save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShareArticle(item)} style={{alignItems:'center',justifyContent:"center"}}>
              <Ionicons name="share-social" size={20} color="black" />
              <Text style={{fontSize:12}}>share</Text>
            </TouchableOpacity>
            </View>
            </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NewsListVertical;
