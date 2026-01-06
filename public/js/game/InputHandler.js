import { DIRECTION_MAP } from '../utils/constants.js';

/**
 * Handles keyboard input for snake control
 */
export class InputHandler {
  constructor(gameState) {
    this.gameState = gameState;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleKeyDown(e) {
    if (!this.gameState.gameRunning) return;

    const direction = DIRECTION_MAP[e.key];
    if (!direction) return;

    // Check if can change direction (prevent 180-degree turns)
    if (this.gameState.canChangeDirection(direction.blockAxis)) {
      this.gameState.setVelocity(direction.x, direction.y);
    }

    e.preventDefault();
  }
}
