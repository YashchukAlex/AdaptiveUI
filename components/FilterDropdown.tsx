import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {Theme} from '@/constants/themes';
import {calcSize, calcFontSize} from '@/utils/sizes';
//

type FilterDropdownProps = {
	options: string[];
	selectedOption: string;
	onSelectOption: (option: string) => void;
};

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
	options,
	selectedOption,
	onSelectOption,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const {theme} = useTheme();

	const handleSelect = (option: string) => {
		onSelectOption(option);
		setIsOpen(false);
	};

	return (
		<View style={styles(theme).container}>
			<TouchableOpacity
				style={styles(theme).dropdownButton}
				onPress={() => setIsOpen(prev => !prev)}
			>
				<Text style={styles(theme).buttonText}>{selectedOption}</Text>
			</TouchableOpacity>

			{isOpen && (
				<View style={styles(theme).dropdown}>
					<FlatList
						data={options}
						keyExtractor={item => item}
						renderItem={({item}) => (
							<TouchableOpacity
								style={styles(theme).dropdownItem}
								onPress={() => handleSelect(item)}
							>
								<Text style={styles(theme).itemText}>{item}</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
			)}
		</View>
	);
};

const styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			position: 'relative',
		},
		dropdownButton: {
			backgroundColor: theme.primary,
			paddingVertical: calcSize(8),
			paddingHorizontal: calcSize(14),
			borderRadius: 8,
			minWidth: calcSize(100),
		},
		buttonText: {
			color: theme.text,
			fontSize: calcFontSize(18),
			textAlign: 'center',
			fontWeight: '500',
		},
		dropdown: {
			position: 'absolute',
			top: calcSize(40),
			left: 0,
			right: 0,
			backgroundColor: theme.background,
			borderRadius: calcSize(8),
			paddingVertical: calcSize(10),
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: {width: 0, height: 2},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			zIndex: 999,
		},
		dropdownItem: {
			paddingVertical: calcSize(10),
			paddingHorizontal: calcSize(12),
		},
		itemText: {
			color: theme.text,
			fontSize: calcFontSize(14),
			fontWeight: '500',
		},
	});
