import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//
import { useTheme } from '@/context/ThemeContext';
import { themes, ThemeName, Theme } from '@/constants/themes';
import { calcSize, calcFontSize } from '@/utils/sizes';
//

export default function SettingsPage() {
  const { setTheme, currentTheme, theme } = useTheme();
  const [localTheme, setLocalTheme] = useState(currentTheme);
  const styles = useMemo(() => myStyles(theme), [theme]);

  useEffect(() => {
    setLocalTheme(currentTheme);
  }, []);

  const saveThemeChange = () => {
    setTheme(localTheme);
  };

  const handleLocalTheme = (theme: ThemeName) => {
    setLocalTheme(theme);
  }

  const renderThemePreview = (item: ThemeName) => {
    const theme = themes[item];
    const isSelected = localTheme == item;    

    return (
      <TouchableOpacity
        style={[
          styles.themePreview,
          { backgroundColor: theme.background },
          isSelected && styles.selectedTheme,
        ]}
        onPress={() => handleLocalTheme(item)}
        key={item.toString()}
      >
        <View style={[styles.colorBlock, { backgroundColor: theme.primary }]} />
        <View style={[styles.colorBlock, { backgroundColor: theme.secondary }]} />
        <Text style={[styles.themeText, { color: theme.text }]}>{theme.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Theme</Text>
      <View style={styles.themeList}>
        {Object.keys(themes).map((item) => renderThemePreview(item))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveThemeChange}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const myStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: calcSize(16),
    alignItems: 'center',
    backgroundColor: theme.background
  },
  title: {
    fontSize: calcFontSize(20),
    fontWeight: 'bold',
    marginBottom: calcSize(16),
    color: theme.text
  },
  themeList: {
    flex: 1,
  },
  themePreview: {
    width: calcSize(200),
    height: calcSize(100),
    marginVertical: calcSize(10),
    borderRadius: calcSize(10),
    padding: calcSize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  colorBlock: {
    width: '90%',
    height: calcSize(20),
    marginVertical: 4,
    borderRadius: 5,
  },
  themeText: {
    fontSize: calcFontSize(14),
    fontWeight: 'bold',
    marginTop: 5,
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: theme.brand,
  },
  saveButton: {
    backgroundColor: theme.primary,
    borderRadius: calcSize(20),
    height: calcSize(50),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontSize: calcFontSize(24),
    color: theme.text,
    fontWeight: '600',
  }
});