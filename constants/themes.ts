export const themes = {
  1: {
    key: 1,
    name: 'Ocean Breeze',
    background: '#EAF7FC',  // Very Light Blue
    primary: '#A2D2FF',     // Soft Sky Blue
    secondary: '#B6E2D3',   // Muted Mint Green
    text: '#355070',        // Gentle Dark Blue
    brand: '#db424f',       // Red
  },
  2: {
    key: 2,
    name: 'Warm Sunset',
    background: '#FFF7ED',  // Light Beige
    primary: '#FFD8B1',     // Soft Peach
    secondary: '#FFC4A3',   // Muted Coral
    text: '#5B423A',        // Soft Warm Brown
    brand: '#db424f',       // Red
  },
  3: {
    key: 3,
    name: 'Calm Lavender',
    background: '#F5F0FA',  // Light Lavender
    primary: '#CAB8E6',     // Gentle Purple
    secondary: '#FBE4A6',   // Muted Pale Yellow
    text: '#4A3C78',        // Subdued Deep Purple
    brand: '#db424f',       // Red
  },
};

export type Theme = typeof themes["1"];
export type ThemeName = keyof typeof themes;