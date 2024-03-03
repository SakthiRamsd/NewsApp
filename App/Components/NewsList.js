import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewsList = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d7d172cd05ad4469bb29df1e75243e7f`);
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
      alert('Article saved successfully!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article.');
    }
  };
  

  const removeArticle = async (title) => {
    try {
      const existingArticles = await AsyncStorage.getItem('savedArticles');
      let savedArticles = existingArticles ? JSON.parse(existingArticles) : [];
      savedArticles = savedArticles.filter(article => article.title !== title);
      await AsyncStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    } catch (error) {
      console.error('Error removing article:', error);
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
            <TouchableOpacity onPress={() => handleSaveArticle(item)}>
              <Text>Save Article</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeArticle(item.title)}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};


export default NewsList;