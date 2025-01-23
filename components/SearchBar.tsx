import React, {useEffect, useMemo, useState} from 'react';
import {TextInput, StyleSheet, View, ViewStyle, Platform} from 'react-native';
//
import {useTheme} from '../context/ThemeContext';
import {Theme} from '@/constants/themes';
import {s, fs, ms} from '@/utils/sizes';

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
	const styles = useMemo(() => myStyles(theme), [theme]);

	useEffect(() => {
		const handler = setTimeout(() => {
			onDebounceChange(localValue);
		}, 300);

		return () => clearTimeout(handler);
	}, [localValue]);

	return (
		<View style={[styles.container, containerStyle]}>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor={theme.text}
				value={localValue}
				onChangeText={setLocalValue}
			/>
		</View>
	);
};

const myStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		input: {
			backgroundColor: theme.background,
			borderRadius: ms(8),
			borderColor: theme.primary,
			paddingHorizontal: ms(12),
			paddingVertical: ms(10),
			color: theme.text,
			borderWidth: ms(2),
			fontSize: fs(16),
			textAlignVertical: 'center',
		},
	});
