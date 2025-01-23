import React, {useMemo, useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import Icons from '@expo/vector-icons/MaterialIcons';
import AntIcons from '@expo/vector-icons/AntDesign';
//
import {SearchBar} from '../components/SearchBar';
import {FilterDropdown} from '../components/FilterDropdown';
import {useTheme} from '../context/ThemeContext';
import {Theme} from '@/constants/themes';
import {s, fs, ms} from '@/utils/sizes';
//
import Logo from '@/assets/images/react-logo.png';

const filterOptions = {1: 'All', 2: 'Tracked by AI', 3: 'Not Tracked by AI'};

const DATA = [
	{id: '1', name: 'Dumbbell Bench Press', rm: 100, trackedByAI: true},
	{id: '2', name: 'Barbell Squats', rm: 150, trackedByAI: false},
	{id: '3', name: 'Deadlift', rm: 180, trackedByAI: true},
	{id: '4', name: 'Pull Ups', rm: 50, trackedByAI: false},
	{id: '5', name: 'Leg Press', rm: 200, trackedByAI: true},
	{id: '6', name: 'Push Ups', rm: 20, trackedByAI: false},
	{id: '7', name: 'Incline Bench Press', rm: 90, trackedByAI: true},
	{id: '8', name: 'Overhead Press', rm: 60, trackedByAI: false},
];

export default function MainPage() {
	const [searchText, setSearchText] = useState('');
	const [selectedFilter, setSelectedFilter] = useState(1);
	const {theme} = useTheme();
	const styles = useMemo(() => myStyles(theme), [theme]);
	const router = useRouter();

	const filteredData = DATA.filter(item => {
		const matchesSearch = item.name
			.toLowerCase()
			.includes(searchText.toLowerCase());

		if (selectedFilter == 1) return matchesSearch;
		if (selectedFilter == 2) return matchesSearch && item.trackedByAI;
		if (selectedFilter == 3) return matchesSearch && !item.trackedByAI;

		return matchesSearch;
	});

	const renderItem = ({item}: any) => (
		<View style={styles.card}>
			<Image
				source={Logo}
				style={styles.cardImage}
			/>
			<View style={styles.cardContent}>
				<Text style={styles.cardTitle}>{item.name}</Text>
				<View style={styles.cardDesc}>
					<Text style={styles.cardSubtitle}>1RM: {item.rm} kg</Text>
					{item.trackedByAI && (
						<Text style={styles.trackedByAIText}>Tracked by AI</Text>
					)}
				</View>
			</View>
			<TouchableOpacity style={styles.addButton}>
				<AntIcons
					name='plus'
					size={ms(20)}
					color={theme.primary}
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Exercises</Text>
				<TouchableOpacity
					hitSlop={10}
					onPress={() => router.push('/settings')}
				>
					<Icons
						name='settings'
						size={ms(30)}
						color={theme.primary}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.searchSection}>
				<SearchBar
					value={searchText}
					onDebounceChange={setSearchText}
					placeholder='Search by exercise name'
					containerStyle={{marginRight: 20}}
				/>
				<FilterDropdown
					options={filterOptions}
					selectedOption={selectedFilter}
					onSelectOption={setSelectedFilter}
				/>
			</View>

			<FlatList
				data={filteredData}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				style={{marginVertical: s(10)}}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<Text style={styles.headerTitle}>No results</Text>}
			/>
		</SafeAreaView>
	);
}

const myStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: s(16),
			paddingVertical: s(10),
			backgroundColor: theme.background,
		},
		headerTitle: {
			fontSize: fs(30),
			fontWeight: 'bold',
			color: theme.text,
		},
		userText: {
			fontSize: fs(14),
			color: theme.text,
		},
		searchSection: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: s(16),
			paddingBottom: s(10),
			backgroundColor: theme.background,
		},
		listContent: {
			paddingHorizontal: s(16),
		},
		card: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: theme.secondary,
			borderRadius: s(12),
			marginBottom: ms(20),
			padding: ms(12),
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: {width: 0, height: 3},
			shadowOpacity: 0.15,
			shadowRadius: 5,
		},
		cardImage: {
			width: ms(60),
			height: ms(60),
			borderRadius: s(8),
		},
		cardContent: {
			flex: 1,
			marginHorizontal: s(12),
		},
		cardTitle: {
			fontSize: fs(16),
			fontWeight: 'bold',
			color: theme.text,
			marginTop: ms(10),
		},
		cardSubtitle: {
			fontSize: fs(14),
			color: theme.text,
		},
		cardDesc: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		trackedByAIText: {
			fontSize: fs(10),
			color: theme.brand,
			fontWeight: '500',
			fontStyle: 'italic',
		},
		addButton: {
			width: ms(35),
			height: ms(35),
			borderRadius: s(20),
			backgroundColor: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
