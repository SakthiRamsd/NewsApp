import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const NewsListVertical = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=d7d172cd05ad4469bb29df1e75243e7f`);
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


  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleNewsPress(item)} style={{ backgroundColor: 'lightgray', padding: 20, width: 340, margin: 10, gap: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', elevation: 6, borderRadius:10 }}>
          <Image source={{ uri: item.urlToImage }}  style={{ width: 170, height: 100, borderRadius: 5 }} />
          <View style={{ justifyContent: 'center', flexShrink: 2, gap: 4 }}>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold',maxHeight:120 }}>{item.title}</Text>
            <Text  style={{ color: 'black', fontSize: 13, fontStyle: 'italic',color:'red' }}>{item.author}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NewsListVertical;
