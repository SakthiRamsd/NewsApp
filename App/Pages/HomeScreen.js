// screens/HomeScreen.js
import React, {useState} from 'react';
import { View, ScrollView , Text, FlatList} from 'react-native';
import NewsList from '../Components/NewsList';
import NewsListVertical from '../Components/NewsListVerical';
import ToggleTextSlider from '../Components/ToggleTextSlider';


const categories = ['business', 'technology', 'science', 'politics']; 

const HomeScreen = () => {
  
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <ScrollView>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 55, marginLeft: 12, padding: 5 }}>NEWS HUB</Text>

      <NewsList/>
      <ToggleTextSlider
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <View>
        {categories.map(category => (
          <View key={category} style={{ marginBottom: 20 }}>
            <NewsListVertical category={activeCategory} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
