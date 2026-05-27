import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, StatusBar, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const MENU_ITEMS = [
  { icon: 'bookmark-outline', label: 'Saved Recipes', color: '#E8572A' },
  { icon: 'notifications-outline', label: 'Notifications', color: '#8b5cf6' },
  { icon: 'help-circle-outline', label: 'Help & Support', color: '#2ECC71' },
  { icon: 'information-circle-outline', label: 'About Budget Bites', color: '#3498DB' },
  { icon: 'log-out-outline', label: 'Log Out', color: '#E74C3C' },
];

export default function ProfileScreen({ navigation }) {
  const { favoriteRecipes } = useFavorites();

  const savedCount = favoriteRecipes.length;
  const avgCost = favoriteRecipes.length > 0
    ? Math.round(favoriteRecipes.reduce((sum, r) => sum + r.cost, 0) / favoriteRecipes.length)
    : 0;

  const handleMenuPress = (label) => {
    if (label === 'Log Out') {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => navigation.replace('Login') },
      ]);
    } else if (label === 'Saved Recipes') {
      navigation.navigate('Favorites');
    } else if (label === 'Help & Support') {
      Alert.alert('Help & Support', 'Need help? Contact us at support@budgetbites.ph\n\nOr visit our FAQ at budgetbites.ph/help');
    } else if (label === 'About Budget Bites') {
      Alert.alert(
        'About Budget Bites 🍚',
        'Budget Bites is a recipe app made for students and boarders who want to eat delicious Filipino meals without breaking the bank.\n\n✅ Browse affordable recipes under ₱50\n✅ Filter by Egg-Based, Veggie, Canned Goods & Quick Prep\n✅ Save your favorite recipes\n✅ Step-by-step cooking instructions\n✅ See nutrition info & cost per serving\n\n📍 Made with ❤️ in Sorsogon, PH\n🔖 Version 1.0.0'
      );
    } else if (label === 'Notifications') {
      navigation.navigate('Settings');
    }  
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Eralyn Forte</Text>
            <Text style={styles.profileEmail}>eralynforte@budgetbites.ph</Text>
            <Text style={styles.profileBio}>Student boarder 🍳 Sorsogon, PH</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={16} color="#E8572A" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{savedCount}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₱50</Text>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{savedCount > 0 ? `₱${avgCost}` : '₱0'}</Text>
            <Text style={styles.statLabel}>Avg Cost</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.label)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={[styles.menuLabel, item.label === 'Log Out' && { color: '#E74C3C' }]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>Budget Bites v1.0.0</Text>
      </ScrollView>
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
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 18,
    borderRadius: 18, padding: 16, gap: 14,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8,
    elevation: 3, marginBottom: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '800', color: '#222' },
  profileEmail: { fontSize: 13, color: '#888', marginTop: 2 },
  profileBio: { fontSize: 12, color: '#E8572A', marginTop: 3, fontStyle: 'italic' },
  editBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#FFF0EB', alignItems: 'center', justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    marginHorizontal: 18, borderRadius: 18,
    padding: 16, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900', color: '#E8572A' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: '#eee' },
  menuSection: {
    backgroundColor: '#fff', marginHorizontal: 18,
    borderRadius: 18, shadowColor: '#000',
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3, marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#f5f5f5',
  },
  menuIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333' },
  version: { textAlign: 'center', color: '#ccc', fontSize: 12, marginBottom: 20 },
});