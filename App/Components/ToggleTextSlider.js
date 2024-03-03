import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


const ToggleTextSlider = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[styles.categoryButton, category === activeCategory && styles.activeCategory]}
          onPress={() => setActiveCategory(category)}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  activeCategory: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
});

export default ToggleTextSlider;
