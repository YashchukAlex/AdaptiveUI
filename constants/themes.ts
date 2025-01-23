export const themes = {
	1: {
		key: 1,
		name: 'Ocean Breeze',
		background: '#EAF7FC', // Very Light Blue
		primary: '#A2D2FF', // Soft Sky Blue
		secondary: '#B6E2D3', // Muted Mint Green
		text: '#355070', // Gentle Dark Blue
		brand: '#db424f', // Red
	},
	2: {
		key: 2,
		name: 'Warm Sunset',
		background: '#FFF7ED', // Light Beige
		primary: '#FFD8B1', // Soft Peach
		secondary: '#FFC4A3', // Muted Coral
		text: '#5B423A', // Soft Warm Brown
		brand: '#db424f', // Red
	},
	3: {
		key: 3,
		name: 'Calm Lavender',
		background: '#F5F0FA', // Light Lavender
		primary: '#CAB8E6', // Gentle Purple
		secondary: '#FBE4A6', // Muted Pale Yellow
		text: '#4A3C78', // Subdued Deep Purple
		brand: '#db424f', // Red
	},
	4: {
		key: 4,
		name: 'Fresh Earth',
		background: '#F9FBE7', // Pale Lime (light, earthy tone)
		primary: '#C5E1A5', // Soft Green (fresh and natural)
		secondary: '#8BC34A', // Vibrant Green (contrasting accent)
		text: '#33691E', // Dark Olive
		brand: '#FFFFFF', // Red
	},
	5: {
		key: 5,
		name: 'Sunset Glow',
		background: '#FFF0E6', // Soft Peach (light and warm)
		primary: '#FF8A65', // Muted Coral (vibrant and warm)
		secondary: '#F4511E', // Deep Orange (bold accent)
		text: '#4E342E', // Warm Brown
		brand: '#FFF0E6', // Blue
	},
	6: {
		key: 6,
		name: 'Midnight Dream',
		background: '#212121', // Dark Grey (moody and elegant)
		primary: '#536DFE', // Indigo Blue (cool and vibrant)
		secondary: '#448AFF', // Light Blue (soft accent)
		text: '#FFFFFF', // White (high contrast and readable)
		brand: '#212121', // Dark Grey
	},
};

export type Theme = (typeof themes)['1'];
export type ThemeName = keyof typeof themes;
