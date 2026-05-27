import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function RecipeDetailScreen({ navigation, route }) {
  const { recipe } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(recipe.id);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{recipe.name}</Text>
          <TouchableOpacity style={styles.avatarBtn}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Image */}
        <Image source={recipe.image} style={styles.heroImage} />

        {/* Tags */}
        <View style={styles.tagsRow}>
          {recipe.tags.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagIcon}>
                {tag.includes('50') ? '💰' : tag.includes('Veggie') ? '🥦' : '⚡'}
              </Text>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsGrid}>
            {recipe.ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{ing.name}</Text>
                <Text style={styles.ingredientAmount}>{ing.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How to Cook */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Cook</Text>
          {recipe.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Nutrition Info */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>Nutrition Info</Text>
          <View style={styles.nutritionRow}>
            <View style={styles.nutritionItem}>
              <Ionicons name="flame-outline" size={20} color="#E8572A" />
              <Text style={styles.nutritionValue}>{recipe.calories}</Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Ionicons name="people-outline" size={20} color="#2ECC71" />
              <Text style={styles.nutritionValue}>{recipe.servings}</Text>
              <Text style={styles.nutritionLabel}>Servings</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Ionicons name="cash-outline" size={20} color="#F5A623" />
              <Text style={styles.nutritionValue}>₱{recipe.cost}</Text>
              <Text style={styles.nutritionLabel}>Cost</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Ionicons name="time-outline" size={20} color="#9B59B6" />
              <Text style={styles.nutritionValue}>{recipe.time}</Text>
              <Text style={styles.nutritionLabel}>Time</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating FAV button */}
      <TouchableOpacity
        style={[styles.favBtn, isFav && styles.favBtnActive]}
        onPress={() => toggleFavorite(recipe.id)}
      >
        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={22} color="#fff" />
        <Text style={styles.favBtnText}>{isFav ? 'Saved' : 'Save Recipe'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF5F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  avatarBtn: {
    width: 36,
    height: 36,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  heroImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    paddingTop: 14,
    gap: 8,
    marginBottom: 4,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tagIcon: {
    fontSize: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    marginBottom: 14,
  },
  ingredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  ingredientItem: {
    width: '50%',
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ingredientAmount: {
    fontSize: 12,
    color: '#888',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E8572A',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  nutritionItem: {
    alignItems: 'center',
    gap: 4,
  },
  nutritionValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },
  nutritionLabel: {
    fontSize: 11,
    color: '#999',
  },
  favBtn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#E8572A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#E8572A',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  favBtnActive: {
    backgroundColor: '#C0392B',
  },
  favBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});