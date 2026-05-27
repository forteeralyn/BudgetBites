import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FOOD_IMAGES = {
  'Tortang Talong': 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop',
  'Itlog na Kamatis': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
  'Ginisang Upo': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
  'Corned Beef with Potato': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
  'Scrambled Eggs': 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
  'Pancit Canton': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
  'Adobong Sitaw': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
  'Sardines with Rice': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';

export default function RecipeCard({ recipe, onPress, isFav, onToggleFav }) {
  const imageUri = FOOD_IMAGES[recipe.name] || DEFAULT_IMAGE;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity style={styles.favBtn} onPress={onToggleFav}>
        <Ionicons
          name={isFav ? 'heart' : 'heart-outline'}
          size={14}
          color={isFav ? '#ef4444' : '#ccc'}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <Text style={styles.category} numberOfLines={1}>{recipe.category}</Text>
        <View style={styles.meta}>
          <View style={styles.row}>
            <Ionicons name="star" size={11} color="#f59e0b" />
            <Text style={styles.rating}>{recipe.rating}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="time-outline" size={11} color="#999" />
            <Text style={styles.time}>{recipe.time}</Text>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.price}>₱{recipe.cost}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 4,
  },
  image: { width: '100%', height: 120 },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  info: { padding: 10 },
  name: { fontSize: 13, fontWeight: '800', color: '#1a1a1a', marginBottom: 2 },
  category: { fontSize: 11, color: '#ff6b35', fontWeight: '600', marginBottom: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 11, fontWeight: '700', color: '#555' },
  time: { fontSize: 11, color: '#999' },
  priceBadge: {
    marginLeft: 'auto',
    backgroundColor: '#fff7ed',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  price: { fontSize: 11, fontWeight: '700', color: '#ff6b35' },
});