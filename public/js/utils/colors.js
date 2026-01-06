// Color Palette for Summer Beach Snake Game
export const COLORS = {
  // Snake tropical colors
  tropical: {
    tomato: '#FF6347',
    gold: '#FFD700',
    lightSeaGreen: '#20B2AA',
    hotPink: '#FF69B4',
    orange: '#FFA500',
    darkTurquoise: '#00CED1'
  },

  // Ocean background
  ocean: {
    skyBlue: '#87CEEB',
    lightBlue: '#B0E0E6',
    khaki: '#F0E68C',
    burlywood: '#DEB887'
  },

  // Sun colors
  sun: {
    yellow: '#FFFF00',
    orange: '#FFA500',
    orangeTransparent: 'rgba(255, 165, 0, 0)'
  },

  // Wave colors (with opacity)
  wave: {
    white: (opacity) => `rgba(255, 255, 255, ${opacity})`
  },

  // Food (watermelon) colors
  watermelon: {
    innerPink: '#FF6B9D',
    outerPink: '#C71585',
    rind: '#228B22',
    seed: '#000000',
    shadowPink: '#FF1493'
  },

  // UI colors
  ui: {
    white: '#FFFFFF',
    gold: '#FFD700',
    shadow: 'rgba(0, 0, 0, 0.1)',
    goldSparkle: 'rgba(255, 215, 0, 0.8)'
  }
};

// Get tropical colors array for snake segments
export function getTropicalColorsArray() {
  const { tropical } = COLORS;
  return [
    tropical.tomato,
    tropical.gold,
    tropical.lightSeaGreen,
    tropical.hotPink,
    tropical.orange,
    tropical.darkTurquoise
  ];
}
