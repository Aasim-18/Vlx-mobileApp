import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, List } from 'lucide-react-native';


const COLORS = {
  primary: '#FF9C1A', 
  border: '#E0E0E0',
  textLight: '#A9A9A9',
  text: '#333',
};

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      
      <View style={styles.searchBar}>
        <Search color="#000" size={24} />
        <TextInput 
          placeholder="Search any item.."
          style={styles.searchInput}
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      
      <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
        <List color="#302b2bff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
    gap: 12, 
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 30, 
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0, 
  },
  filterBtn: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
    
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
});