import React from 'react';
import {Stack} from 'expo-router';
import {ThemeProvider} from '../context/ThemeContext';

export default function Layout() {
	return (
		<ThemeProvider>
			<Stack>
				<Stack.Screen
					name='index'
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name='settings'
					options={{headerBackTitle: 'Back', headerTitle: 'Settings'}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
