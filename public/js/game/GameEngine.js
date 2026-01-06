import { GameState } from './GameState.js';
import { Renderer } from './Renderer.js';
import { InputHandler } from './InputHandler.js';

/**
 * Main game engine - orchestrates game loop and logic
 */
export class GameEngine {
  constructor(canvas, uiElements) {
    this.canvas = canvas;
    this.ui = uiElements;
    this.gameState = new GameState();
    this.renderer = new Renderer(canvas);
    this.inputHandler = new InputHandler(this.gameState);

    this.setupEventListeners();
    this.updateUI();
    this.renderer.render(this.gameState);
  }

  setupEventListeners() {
    this.ui.startBtn.addEventListener('click', () => this.start());
    this.ui.restartBtn.addEventListener('click', () => this.restart());
  }

  updateUI() {
    this.ui.scoreElement.textContent = this.gameState.score;
    this.ui.highScoreElement.textContent = this.gameState.highScore;
  }

  start() {
    this.gameState.startGame();
    this.ui.startBtn.innerHTML = '🔄 Restart Game!';
    this.updateUI();
    this.startGameLoop();
  }

  restart() {
    this.closeGameOver();
    this.start();
  }

  startGameLoop() {
    if (this.gameState.gameLoop) {
      clearInterval(this.gameState.gameLoop);
    }
    this.gameState.gameLoop = setInterval(() => this.gameLoop(), this.gameState.gameSpeed);
  }

  gameLoop() {
    this.gameState.incrementAnimationFrame();
    this.gameState.updateSunPulse();

    // Update snake position
    const newHead = this.gameState.moveSnake();
    if (newHead) {
      // Check collisions
      if (this.gameState.checkWallCollision(newHead) || this.gameState.checkSelfCollision(newHead)) {
        this.endGame();
        return;
      }

      this.gameState.addSnakeSegment(newHead);

      // Check food collision
      if (this.gameState.checkFoodCollision(newHead)) {
        this.gameState.incrementScore();
        this.updateUI();
        this.gameState.placeFood();

        // Increase speed at intervals
        if (this.gameState.shouldIncreaseSpeed()) {
          this.gameState.increaseSpeed();
          this.startGameLoop(); // Restart loop with new speed
        }
      } else {
        this.gameState.removeSnakeTail();
      }
    }

    // Render
    this.renderer.render(this.gameState);
  }

  endGame() {
    this.gameState.stopGame();
    this.ui.finalScoreElement.textContent = this.gameState.score;
    this.ui.finalHighScoreElement.textContent = this.gameState.highScore;
    this.ui.overlay.classList.add('show');
    this.ui.gameOverDiv.classList.add('show');
  }

  closeGameOver() {
    this.ui.overlay.classList.remove('show');
    this.ui.gameOverDiv.classList.remove('show');
  }
}
