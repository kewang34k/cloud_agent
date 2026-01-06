import { GameEngine } from './game/GameEngine.js';
import { ANIMATION_CONFIG, DECORATIONS } from './utils/constants.js';

/**
 * Initialize decorative elements
 */
function initializeDecorations() {
  // Generate bubbles
  for (let i = 0; i < ANIMATION_CONFIG.BUBBLE_COUNT; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = '○';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = (Math.random() * ANIMATION_CONFIG.BUBBLE_DURATION_RANGE + ANIMATION_CONFIG.BUBBLE_DURATION_MIN) + 's';
    bubble.style.animationDelay = Math.random() * ANIMATION_CONFIG.BUBBLE_DELAY_RANGE + 's';
    bubble.style.fontSize = (Math.random() * ANIMATION_CONFIG.BUBBLE_SIZE_RANGE + ANIMATION_CONFIG.BUBBLE_SIZE_MIN) + 'px';
    document.body.appendChild(bubble);
  }

  // Generate sparkles
  for (let i = 0; i < ANIMATION_CONFIG.SPARKLE_COUNT; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * ANIMATION_CONFIG.SPARKLE_DELAY_RANGE + 's';
    document.body.appendChild(sparkle);
  }

  // Generate floating decorations
  for (let i = 0; i < ANIMATION_CONFIG.DECORATION_COUNT; i++) {
    const decor = document.createElement('div');
    decor.className = 'decoration';
    decor.innerHTML = DECORATIONS[Math.floor(Math.random() * DECORATIONS.length)];
    decor.style.left = Math.random() * 100 + '%';
    decor.style.top = Math.random() * 100 + '%';
    decor.style.animationDelay = Math.random() * ANIMATION_CONFIG.DECORATION_DELAY_RANGE + 's';
    decor.style.animationDuration = (Math.random() * ANIMATION_CONFIG.DECORATION_DURATION_RANGE + ANIMATION_CONFIG.DECORATION_DURATION_MIN) + 's';
    document.body.appendChild(decor);
  }
}

/**
 * Main entry point
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize decorations
  initializeDecorations();

  // Get UI elements
  const canvas = document.getElementById('gameCanvas');
  const uiElements = {
    scoreElement: document.getElementById('score'),
    highScoreElement: document.getElementById('highScore'),
    startBtn: document.getElementById('startBtn'),
    gameOverDiv: document.getElementById('gameOver'),
    overlay: document.getElementById('overlay'),
    restartBtn: document.getElementById('restartBtn'),
    finalScoreElement: document.getElementById('finalScore'),
    finalHighScoreElement: document.getElementById('finalHighScore')
  };

  // Initialize game
  new GameEngine(canvas, uiElements);
});
