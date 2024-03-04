import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, RefreshControl, Share } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// Sample News API Endpoint
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '8bf522652b46403abd8c42d4f2f1f590';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false); // State for refreshing indicator
  const navigation = useNavigation();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setRefreshing(true); // Start refreshing indicator
    try {
      const response = await axios.get(NEWS_API_URL, {
        params: {
          country: 'in',
          apiKey: API_KEY,
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setRefreshing(false); // Stop refreshing indicator
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(NEWS_API_URL, {
        params: {
          country: 'in',
          q: searchQuery,
          apiKey: API_KEY,
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };


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



  const renderItem = ({ item }) => (
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
  );
  

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5,marginTop:60,borderRadius:10 }}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        value={searchQuery}
        placeholder="Search news..."
      />
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={ // Pull to refresh control
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchNews} // Call fetchNews function on pull-to-refresh
          />
        }
      />
    </View>
  );
};

export default NewsScreen;
