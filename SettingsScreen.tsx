import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saveData, setSaveData] = useState(false);

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );

  const LinkRow = ({ icon, color, label, sub, onPress, last }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.row, !last && styles.rowBorder]}
    >
      <View style={[styles.rowIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your Budget Bites experience</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        {/* Preferences */}
        <Section title="Preferences">
          <View style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: '#8b5cf620' }]}>
              <Ionicons name="notifications-outline" size={18} color="#8b5cf6" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Notifications</Text>
              <Text style={styles.rowSub}>Daily meal suggestions</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e5e7eb', true: '#ff6b35' }}
              thumbColor="#fff"
            />
          </View>

          <View style={[styles.row, styles.rowBorder]}>
            <View style={[styles.rowIcon, { backgroundColor: '#11182720' }]}>
              <Ionicons name="moon-outline" size={18} color="#111827" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Dark Mode</Text>
              <Text style={styles.rowSub}>Coming soon</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(val) => {
                setDarkMode(val);
                Alert.alert('Coming Soon', 'Dark mode will be available in the next update!');
              }}
              trackColor={{ false: '#e5e7eb', true: '#ff6b35' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#10b98120' }]}>
              <Ionicons name="cloud-offline-outline" size={18} color="#10b981" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Save Data Mode</Text>
              <Text style={styles.rowSub}>Load lower quality images</Text>
            </View>
            <Switch
              value={saveData}
              onValueChange={setSaveData}
              trackColor={{ false: '#e5e7eb', true: '#ff6b35' }}
              thumbColor="#fff"
            />
          </View>
        </Section>

        {/* App Info */}
        <Section title="App Info">
          <LinkRow
            icon="information-circle-outline"
            color="#3b82f6"
            label="About Budget Bites"
            sub="Version 1.0.0"
            onPress={() =>
              Alert.alert(
                'About Budget Bites 🍚',
                'Budget Bites is a recipe app made for students and boarders who want to eat delicious Filipino meals without breaking the bank.\n\n✅ Browse affordable recipes under ₱50\n✅ Filter by Egg-Based, Veggie, Canned Goods & Quick Prep\n✅ Save your favorite recipes\n✅ Step-by-step cooking instructions\n✅ See nutrition info & cost per serving\n\n📍 Made with ❤️ in Sorsogon, PH\n🔖 Version 1.0.0'
              )
            }
          />
          <LinkRow
            icon="people-outline"
            color="#E8572A"
            label="Meet the Developers"
            sub="BSIT 3-5"
            onPress={() =>
              Alert.alert(
                'Meet the Developers 👨‍💻',
                'Budget Bites Team:\n\n Dustine Consina\n Eralyn Forte\n Meryl Atanoso\n\n📚 Course: BSIT 3-5\n🏫 Sorsogon State University-Bulan Campus\n📅 S.Y. 2025–2026'
              )
            }
          />
          <LinkRow
            icon="document-text-outline"
            color="#6b7280"
            label="Privacy Policy"
            onPress={() =>
              Alert.alert('Privacy Policy', 'We do not collect or share your personal data. All your favorites are stored only on your device.')
            }
          />
          <LinkRow
            icon="shield-checkmark-outline"
            color="#10b981"
            label="Terms of Service"
            onPress={() =>
              Alert.alert('Terms of Service', 'Budget Bites is free to use. Recipe content is for educational and personal use only.')
            }
          />
          <LinkRow
            icon="star-outline"
            color="#f59e0b"
            label="Rate the App"
            sub="Tell us what you think!"
            onPress={() =>
              Alert.alert('Thank You! ⭐', 'Thank you for supporting Budget Bites! Your feedback means a lot to us.')
            }
            last
          />
        </Section>

        {/* Account */}
        <Section title="Account">
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.row}
            onPress={() =>
              Alert.alert(
                'Clear All Data',
                'Are you sure? This will remove all your saved recipes and preferences.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: () => Alert.alert('Done', 'All data has been cleared.'),
                  },
                ]
              )
            }
          >
            <View style={[styles.rowIcon, { backgroundColor: '#ef444420' }]}>
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
            </View>
            <View style={styles.rowText}>
              <Text style={[styles.rowLabel, { color: '#ef4444' }]}>Clear All Data</Text>
              <Text style={styles.rowSub}>Remove saved recipes & preferences</Text>
            </View>
          </TouchableOpacity>
        </Section>

        <Text style={styles.footer}>
          Budget Bites v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: { fontSize: 28, fontWeight: '900', color: '#1a1a1a' },
  subtitle: { fontSize: 13, color: '#888', marginTop: 4 },
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  rowSub: { fontSize: 12, color: '#999', marginTop: 2 },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#bbb',
    marginTop: 28,
    marginBottom: 20,
  },
});