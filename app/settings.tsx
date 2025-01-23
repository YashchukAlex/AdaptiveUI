import React, {useEffect, useMemo, useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
//
import {useTheme} from '@/context/ThemeContext';
import {themes, ThemeName, Theme} from '@/constants/themes';
import {s, fs, ms, mvs} from '@/utils/sizes';
//

export default function SettingsPage() {
	const {setTheme, currentTheme, theme} = useTheme();
	const [localTheme, setLocalTheme] = useState(currentTheme);
	const styles = useMemo(() => myStyles(theme), [theme]);
	const {bottom} = useSafeAreaInsets();

	useEffect(() => {
		setLocalTheme(currentTheme);
	}, []);

	const saveThemeChange = () => {
		setTheme(localTheme);
	};

	const handleLocalTheme = (theme: ThemeName) => {
		setLocalTheme(theme);
	};

	const renderThemePreview = (item: ThemeName) => {
		const theme = themes[item];
		const isSelected = localTheme == item;

		return (
			<TouchableOpacity
				style={[
					styles.themePreview,
					{backgroundColor: theme.background},
					isSelected && styles.selectedTheme,
				]}
				onPress={() => handleLocalTheme(item)}
				key={item.toString()}
			>
				<View style={[styles.colorBlock, {backgroundColor: theme.primary}]} />
				<View style={[styles.colorBlock, {backgroundColor: theme.secondary}]} />
				<Text style={[styles.themeText, {color: theme.text}]}>{theme.key}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={[styles.container, {paddingBottom: bottom + ms(16)}]}>
			<Text style={styles.title}>Choose Your Theme</Text>
			<ScrollView
				contentContainerStyle={styles.themeList}
				showsVerticalScrollIndicator={false}
			>
				{Object.keys(themes).map(el => renderThemePreview(el))}
			</ScrollView>
			<TouchableOpacity
				style={styles.saveButton}
				onPress={saveThemeChange}
			>
				<Text style={styles.saveText}>Save</Text>
			</TouchableOpacity>
		</View>
	);
}

const myStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: ms(16),
			alignItems: 'center',
			backgroundColor: theme.background,
			justifyContent: 'space-between',
		},
		title: {
			fontSize: fs(20),
			fontWeight: 'bold',
			marginBottom: s(16),
			color: theme.text,
		},
		themeList: {
			flexGrow: 1,
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center',
		},
		themePreview: {
			width: ms(220),
			height: ms(130),
			marginVertical: ms(10),
			marginHorizontal: ms(10),
			borderRadius: s(10),
			padding: ms(10),
			justifyContent: 'space-between',
			alignItems: 'center',
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: {width: 0, height: 3},
			shadowOpacity: 0.3,
			shadowRadius: 5,
		},
		colorBlock: {
			width: '90%',
			height: ms(20),
			marginVertical: 4,
			borderRadius: 5,
		},
		themeText: {
			fontSize: fs(14),
			fontWeight: 'bold',
			marginTop: 5,
		},
		selectedTheme: {
			borderWidth: 2,
			borderColor: '#db424f',
		},
		saveButton: {
			backgroundColor: theme.primary,
			borderRadius: s(20),
			height: ms(50),
			width: '100%',
			maxWidth: ms(400),
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: mvs(20),
		},
		saveText: {
			fontSize: fs(24),
			color: theme.text,
			fontWeight: '600',
		},
	});
