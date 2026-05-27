import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, StatusBar, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { recipes } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';

const FILTERS = ['All', 'Egg-Based', 'Veggie Meals', 'Canned Goods', 'Quick Prep'];

export default function RecipeListScreen({ navigation, route }) {
  const initialCat = route?.params?.category || 'All';
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialCat);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
// NEW
const matchFilter =
  activeFilter === 'All' ||
  r.category === activeFilter ||
  (activeFilter === 'Quick Prep' && r.tags.includes('Quick Prep'));
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.9}
    >
      <Image source={item.image} style={styles.cardImage} />
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={18}
          color={isFavorite(item.id) ? '#E8572A' : '#999'}
        />
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.cardMeta}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          {[1, 2, 3, 4, 5].map(i => (
            <Ionicons
              key={i}
              name={i <= Math.round(item.rating) ? 'star' : 'star-outline'}
              size={10}
              color="#F5A623"
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipes</Text>
        <View style={{ width: 26 }} />
      </View>

      <Image
        source={require('../assets/images/Recipe.png')}
        style={styles.heroImage}
      />

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food that you like..."
            placeholderTextColor="#bbb"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search" size={18} color="#E8572A" />
        </View>
      </View>

      <View style={styles.filterRow}>
{FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, activeFilter === f && styles.chipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.chip}>
          <Text style={styles.chipText}>3+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F0' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 18,
    paddingTop: 12, paddingBottom: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#222' },
  heroImage: { width: '100%', height: 180, resizeMode: 'cover' },
  searchRow: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 10 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 11,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 18, marginBottom: 14, flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#ddd',
  },
  chipActive: { backgroundColor: '#2ECC71', borderColor: '#2ECC71' },
  chipText: { fontSize: 13, color: '#555', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  columnWrapper: { paddingHorizontal: 18, gap: 14, marginBottom: 14 },
  listContent: { paddingBottom: 20 },
  card: {
    flex: 1, backgroundColor: '#fff', borderRadius: 16,
    overflow: 'hidden', shadowColor: '#000',
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cardImage: { width: '100%', height: 110 },
  heartBtn: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: '#fff', borderRadius: 14,
    width: 28, height: 28, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  cardInfo: { padding: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: '#222', marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 11, color: '#888', marginRight: 2 },
});