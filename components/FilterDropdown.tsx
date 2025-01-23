import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {Theme} from '@/constants/themes';
import {s, fs, ms, deviceWidth} from '@/utils/sizes';
//

type TProps = {
	options: Object;
	selectedOption: number;
	onSelectOption: (option: number) => void;
};

export const FilterDropdown: React.FC<TProps> = ({
	options,
	selectedOption,
	onSelectOption,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const {theme} = useTheme();
	const styles = useMemo(() => myStyles(theme), [theme]);

	const handleSelect = (option: number) => {
		onSelectOption(option);
		setIsOpen(false);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.dropdownButton}
				onPress={() => setIsOpen(prev => !prev)}
			>
				<Text style={styles.buttonText}>{options[selectedOption]}</Text>
			</TouchableOpacity>

			{isOpen && (
				<View style={styles.dropdown}>
					<FlatList
						data={Object.entries(options)}
						keyExtractor={([key, value]) => key.toString()}
						renderItem={({item}) => {
							const [key, value] = item;
							return (
								<TouchableOpacity
									style={styles.dropdownItem}
									onPress={() => handleSelect(key)}
								>
									<Text
										style={styles.itemText}
										numberOfLines={2}
									>
										{value}
									</Text>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			)}
		</View>
	);
};

const myStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			position: 'relative',
		},
		dropdownButton: {
			backgroundColor: theme.primary,
			paddingVertical: ms(8),
			paddingHorizontal: ms(14),
			borderRadius: ms(8),
			minWidth: ms(100),
			maxWidth: deviceWidth / 2.5,
		},
		buttonText: {
			color: theme.text,
			fontSize: fs(18),
			textAlign: 'center',
			fontWeight: '500',
		},
		dropdown: {
			position: 'absolute',
			top: ms(40),
			left: 0,
			right: 0,
			backgroundColor: theme.background,
			borderRadius: ms(8),
			paddingVertical: ms(10),
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: {width: 0, height: 2},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			zIndex: 999,
		},
		dropdownItem: {
			paddingVertical: ms(10),
			paddingHorizontal: ms(12),
		},
		itemText: {
			color: theme.text,
			fontSize: fs(14),
			fontWeight: '500',
		},
	});
