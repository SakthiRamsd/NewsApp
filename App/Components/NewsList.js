import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


const NewsList = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=8bf522652b46403abd8c42d4f2f1f590`);
        console.log(response.data.articles)
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
      alert('Article Saved successfully!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Article Saved Failed!');
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
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <TouchableOpacity  onPress={() => handleNewsPress(item)} style={{ backgroundColor: 'lightgray', width: 330, height: 'auto', padding: 30, margin: 15, gap: 5, elevation: 5 ,alignItems:'center', borderRadius:10}}>
          <Image source={{ uri: item.urlToImage }}  style={{ width: 290, height: 190, borderRadius: 10 }} />
          <View style={{gap:5}}>
            <Text  style={{ Color: 'black', fontSize: 22, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ color: 'red', fontSize: 15, fontStyle: 'italic' }}>{item.author}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>
            <TouchableOpacity onPress={() => handleSaveArticle(item)} style={{alignItems:'center',justifyContent:"center"}}>
              <Ionicons name="bookmark" size={25} color="black" />
              <Text style={{fontSize:12}}>save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShareArticle(item)} style={{alignItems:'center',justifyContent:"center"}}>
              <Ionicons name="share-social" size={25} color="black" />
              <Text style={{fontSize:12}}>share</Text>
            </TouchableOpacity>
            </View>
            </View>
        </TouchableOpacity>
      )}
    />
  );
};


export default NewsList;