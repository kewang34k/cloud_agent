import { GAME_CONFIG, ANIMATION_CONFIG } from '../utils/constants.js';

/**
 * Manages all game state including snake position, food, score, and animations
 */
export class GameState {
  constructor() {
    this.reset();
    this.highScore = this.loadHighScore();
    this.initializeWaves();
  }

  reset() {
    this.snake = [{ x: GAME_CONFIG.INITIAL_SNAKE_X, y: GAME_CONFIG.INITIAL_SNAKE_Y }];
    this.velocity = { x: 0, y: 0 };
    this.food = { x: GAME_CONFIG.INITIAL_FOOD_X, y: GAME_CONFIG.INITIAL_FOOD_Y };
    this.score = 0;
    this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
    this.gameRunning = false;
    this.gameLoop = null;
    this.animationFrame = 0;
    this.sun = { pulse: 0 };
  }

  initializeWaves() {
    this.waves = [];
    for (let i = 0; i < ANIMATION_CONFIG.WAVE_COUNT; i++) {
      this.waves.push({
        y: GAME_CONFIG.CANVAS_HEIGHT * (ANIMATION_CONFIG.WAVE_BASE_Y + i * ANIMATION_CONFIG.WAVE_Y_SPACING),
        offset: Math.random() * Math.PI * 2,
        speed: ANIMATION_CONFIG.WAVE_BASE_SPEED + Math.random() * ANIMATION_CONFIG.WAVE_RANDOM_SPEED
      });
    }
  }

  getTileCount() {
    return GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE;
  }

  incrementAnimationFrame() {
    this.animationFrame++;
  }

  updateSunPulse() {
    this.sun.pulse = Math.sin(this.animationFrame * ANIMATION_CONFIG.SUN_PULSE_SPEED) * ANIMATION_CONFIG.SUN_PULSE_AMOUNT;
  }

  moveSnake() {
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      return null;
    }

    const head = {
      x: this.snake[0].x + this.velocity.x,
      y: this.snake[0].y + this.velocity.y
    };

    return head;
  }

  checkWallCollision(head) {
    const tileCount = this.getTileCount();
    return head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount;
  }

  checkSelfCollision(head) {
    for (let segment of this.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  }

  checkFoodCollision(head) {
    return head.x === this.food.x && head.y === this.food.y;
  }

  addSnakeSegment(head) {
    this.snake.unshift(head);
  }

  removeSnakeTail() {
    this.snake.pop();
  }

  incrementScore() {
    this.score++;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
  }

  shouldIncreaseSpeed() {
    return this.score % GAME_CONFIG.SPEED_INCREASE_INTERVAL === 0 &&
           this.gameSpeed > GAME_CONFIG.MIN_SPEED;
  }

  increaseSpeed() {
    this.gameSpeed -= GAME_CONFIG.SPEED_DECREASE_AMOUNT;
  }

  placeFood() {
    let newFood;
    let validPosition = false;

    while (!validPosition) {
      const tileCount = this.getTileCount();
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };

      validPosition = true;
      for (let segment of this.snake) {
        if (segment.x === newFood.x && segment.y === newFood.y) {
          validPosition = false;
          break;
        }
      }
    }

    this.food = newFood;
  }

  setVelocity(x, y) {
    this.velocity = { x, y };
  }

  canChangeDirection(axis) {
    if (axis === 'x') {
      return this.velocity.x === 0;
    } else {
      return this.velocity.y === 0;
    }
  }

  startGame() {
    this.snake = [{ x: GAME_CONFIG.INITIAL_SNAKE_X, y: GAME_CONFIG.INITIAL_SNAKE_Y }];
    this.velocity = { x: 1, y: 0 };
    this.score = 0;
    this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
    this.placeFood();
    this.gameRunning = true;
  }

  stopGame() {
    this.gameRunning = false;
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }

  loadHighScore() {
    return parseInt(localStorage.getItem(GAME_CONFIG.LOCAL_STORAGE_KEY) || '0', 10);
  }

  saveHighScore() {
    localStorage.setItem(GAME_CONFIG.LOCAL_STORAGE_KEY, this.highScore.toString());
  }
}
