import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { recipes } from '../data/recipes';

const CATEGORY_DATA = [
  { id: 'Egg-Based', label: 'Egg-Based\nMeals', image: require('../assets/images/Scrambled_Egg.jpg'), color: '#FFF8E1' },
  { id: 'Veggie Meals', label: 'Vegetable\nMeals', image: require('../assets/images/Ginisang-Upo.jpg'), color: '#F1F8E9' },
  { id: 'Canned Goods', label: 'Canned\nGoods', image: require('../assets/images/Corned-Beef-Guisado-with-Potato.webp'), color: '#E8F5E9' },
  { id: 'Quick Prep', label: 'Quick\nPrep', image: require('../assets/images/Tortang-Talong-1.jpg'), color: '#FFF3E0' },
];

export default function HomeScreen({ navigation }) {
  const quickPrep = recipes.filter(r =>
    r.time.includes('5') || r.time.includes('10') ||
    r.time.includes('15') || r.time.includes('20')
  );
  const todaysSulit = recipes.filter(r => r.cost <= 40).slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={26} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Ionicons name="restaurant" size={14} color="#E8572A" />
            <Text style={styles.headerGreet}>Hi there! Ready to Eat?</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroText}>Smart Choices{'\n'}for Hungry Boarders</Text>
        </View>

        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Recipes')}
            activeOpacity={0.8}
          >
            <Ionicons name="search-outline" size={18} color="#aaa" />
            <Text style={styles.searchPlaceholder}>Search recipes...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipes')}>
            <Text style={styles.seeAll}>See All &gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORY_DATA.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: cat.color }]}
              onPress={() => navigation.navigate('Recipes', { category: cat.id })}
              activeOpacity={0.8}
            >
              <Image source={cat.image} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Prep Favorites</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipes')}>
            <Text style={styles.seeAll}>View more &gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickScroll}>
          {quickPrep.slice(0, 4).map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.quickCard}
              onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              activeOpacity={0.9}
            >
              <Image source={recipe.image} style={styles.quickImage} />
              <View style={styles.quickInfo}>
                <Text style={styles.quickName}>{recipe.name}</Text>
                <View style={styles.quickMeta}>
                  <Ionicons name="thumbs-up" size={12} color="#E8572A" />
                  <Text style={styles.quickMetaText}> {recipe.rating}</Text>
                  <Ionicons name="time-outline" size={12} color="#888" style={{ marginLeft: 8 }} />
                  <Text style={styles.quickMetaText}> {recipe.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Sulit Choice</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recipes')}>
            <Text style={styles.seeAll}>View more &gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.quickScroll, { marginBottom: 24 }]}>
          {todaysSulit.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.sulitCard}
              onPress={() => navigation.navigate('RecipeDetail', { recipe })}
              activeOpacity={0.9}
            >
              <Image source={recipe.image} style={styles.sulitImage} />
              <View style={styles.sulitInfo}>
                <Text style={styles.sulitName}>{recipe.name}</Text>
                <View style={styles.quickMeta}>
                  <Ionicons name="thumbs-up" size={12} color="#E8572A" />
                  <Text style={styles.quickMetaText}> {recipe.rating}</Text>
                  <Ionicons name="time-outline" size={12} color="#888" style={{ marginLeft: 8 }} />
                  <Text style={styles.quickMetaText}> {recipe.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  headerGreet: { fontSize: 13, color: '#555', fontWeight: '500' },
  heroSection: { paddingHorizontal: 20, paddingVertical: 12 },
  heroText: { fontSize: 28, fontWeight: '900', color: '#1A1A1A', lineHeight: 34 },
  searchRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, gap: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  searchPlaceholder: { flex: 1, fontSize: 14, color: '#bbb' },
  filterBtn: { backgroundColor: '#2ECC71', borderRadius: 12, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#E8572A' },
  seeAll: { fontSize: 13, color: '#888' },
  categoryScroll: { paddingLeft: 20, marginBottom: 24 },
  categoryCard: { width: 90, borderRadius: 14, padding: 10, marginRight: 12, alignItems: 'center' },
  categoryImage: { width: 56, height: 56, borderRadius: 28, marginBottom: 6 },
  categoryLabel: { fontSize: 11, fontWeight: '600', color: '#444', textAlign: 'center', lineHeight: 14 },
  quickScroll: { paddingLeft: 20, marginBottom: 24 },
  quickCard: { width: 170, backgroundColor: '#fff', borderRadius: 16, marginRight: 14, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  quickImage: { width: '100%', height: 110 },
  quickInfo: { padding: 10 },
  quickName: { fontSize: 14, fontWeight: '700', color: '#222', marginBottom: 4 },
  quickMeta: { flexDirection: 'row', alignItems: 'center' },
  quickMetaText: { fontSize: 11, color: '#888' },
  sulitCard: { width: 130, backgroundColor: '#fff', borderRadius: 16, marginRight: 14, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  sulitImage: { width: '100%', height: 80 },
  sulitInfo: { padding: 8 },
  sulitName: { fontSize: 12, fontWeight: '700', color: '#222', marginBottom: 4 },
});