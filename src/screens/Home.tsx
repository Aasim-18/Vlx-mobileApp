import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';


import { COLORS, MOCK_CATEGORIES, MOCK_PHONES } from '../constants/theme';

// Import Components
import HomeHeader from '../components/HomeHeader';
import SearchBar from '../components/SearchBar';
import HeroBanner from '../components/HeroBanner';
import CategoryItem from '../components/CategoryItem';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import BottomNavBar from '../components/BottomNavBar';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Main Content Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <HomeHeader />
        
        <SearchBar />
        
        <HeroBanner />

        
        <View style={styles.categoriesRow}>
          {MOCK_CATEGORIES.map((cat) => (
            <CategoryItem key={cat.id} name={cat.name} icon={cat.icon} />
          ))}
        </View>

        
        <View style={styles.sectionContainer}>
          <SectionHeader title="Popular in Smart Phones" />
          <FlatList 
            data={MOCK_PHONES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <View style={{width: 12}} />}
          />
        </View>

        {/* Section 2: Placeholder for Cars */}
        <View style={[styles.sectionContainer, { marginBottom: 100 }]}>
          <SectionHeader title="Cars & Vehicles" />
          {/* You could re-use ProductCard here with different data */}
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 24,
  },
});