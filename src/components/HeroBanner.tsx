import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { BANNERS } from '../constants/banners';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40; 


export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex === BANNERS.length - 1 ? 0 : activeIndex + 1;
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      
      setActiveIndex(nextIndex);
    }, 3000); 

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderItem = ({ item }: any) => (
    <View style={[styles.bannerContent, { backgroundColor: item.bgColor }]}>
      <View style={styles.circlesContainer}>
        <View style={[styles.circle, styles.circleTop]}>
          <Text style={styles.emoji}>{item.emoji1}</Text>
        </View>
        <View style={[styles.circle, styles.circleBottom]}>
          <Text style={styles.emoji}>{item.emoji2}</Text>
        </View>
      </View>

      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
        <Text style={styles.bannerDesc}>{item.desc}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
          setActiveIndex(index);
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  bannerContent: {
    width: BANNER_WIDTH,
    marginHorizontal: 20,
    borderRadius: 24,
    height: 170,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  circlesContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  circleTop: { top: 20, left: 5 },
  circleBottom: { bottom: 20, right: 0 },
  emoji: { fontSize: 24 },
  bannerTextContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF9C1A',
    fontStyle: 'italic',
  },
  bannerSubtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  bannerDesc: {
    color: '#E0E0E0',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    backgroundColor: '#FF9C1A',
    width: 24,
  },
});