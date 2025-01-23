import React, {useEffect, useState} from 'react';
import {TextInput, StyleSheet, View, ViewStyle} from 'react-native';
//
import {useTheme} from '../context/ThemeContext';
import {Theme} from '@/constants/themes';
import {calcSize, calcFontSize} from '@/utils/sizes';

type SearchBarProps = {
	value: string;
	onDebounceChange: (text: string) => void; // Updated prop for debounce
	placeholder?: string;
	containerStyle?: ViewStyle;
};

export const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onDebounceChange,
	placeholder = 'Search...',
	containerStyle,
}) => {
	const [localValue, setLocalValue] = useState(value);
	const {theme} = useTheme();

	useEffect(() => {
		const handler = setTimeout(() => {
			onDebounceChange(localValue);
		}, 300);

		return () => clearTimeout(handler);
	}, [localValue]);

	return (
		<View style={[styles(theme).container, containerStyle]}>
			<TextInput
				style={styles(theme).input}
				placeholder={placeholder}
				placeholderTextColor={theme.text}
				value={localValue}
				onChangeText={setLocalValue}
			/>
		</View>
	);
};

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		input: {
			height: calcSize(40),
			backgroundColor: theme.background,
			borderRadius: calcSize(8),
			borderColor: theme.primary,
			paddingHorizontal: calcSize(12),
			color: theme.text,
			borderWidth: 2,
			fontSize: calcFontSize(16),
		},
	});
