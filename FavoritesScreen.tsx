import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }: any) {
  const { favoriteRecipes, toggleFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.9}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <View style={styles.cardMeta}>
          <Ionicons name="time-outline" size={13} color="#888" />
          <Text style={styles.metaText}>{item.time}</Text>
          <Ionicons name="cash-outline" size={13} color="#888" style={{ marginLeft: 10 }} />
          <Text style={styles.metaText}>₱{item.cost}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons name="heart" size={20} color="#E8572A" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Ionicons name="heart" size={22} color="#E8572A" />
      </View>

      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>Tap the heart on any recipe to save it here</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('Recipes')}
          >
            <Text style={styles.browseBtnText}>Browse Recipes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F0' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20,
    paddingTop: 16, paddingBottom: 12,
  },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#222' },
  list: { paddingHorizontal: 18, paddingBottom: 20, gap: 14 },
  card: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cardImage: { width: 90, height: 90 },
  cardInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  cardName: { fontSize: 15, fontWeight: '700', color: '#222', marginBottom: 2 },
  cardCategory: { fontSize: 12, color: '#E8572A', fontWeight: '600', marginBottom: 6 },
  cardMeta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#888', marginLeft: 3 },
  heartBtn: { padding: 14, justifyContent: 'center' },
  emptyState: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', paddingHorizontal: 40,
  },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#333', marginTop: 16 },
  emptySubtitle: {
    fontSize: 14, color: '#888', textAlign: 'center',
    marginTop: 8, lineHeight: 20,
  },
  browseBtn: {
    marginTop: 24, backgroundColor: '#E8572A',
    paddingHorizontal: 28, paddingVertical: 12, borderRadius: 30,
  },
  browseBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});