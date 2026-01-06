import { GAME_CONFIG, ANIMATION_CONFIG, RENDER_CONFIG, GRADIENT_STOPS } from '../utils/constants.js';
import { COLORS, getTropicalColorsArray } from '../utils/colors.js';

/**
 * Handles all canvas rendering operations
 */
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  /**
   * Main render function - orchestrates all drawing operations
   */
  render(gameState) {
    this.drawBackground();
    this.drawSun(gameState.animationFrame, gameState.sun);
    this.drawWaves(gameState.waves, gameState.animationFrame);
    this.drawSnake(gameState.snake, gameState.animationFrame);
    this.drawFood(gameState.food, gameState.animationFrame);
  }

  /**
   * Draw ocean gradient background
   */
  drawBackground() {
    const bgGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    bgGradient.addColorStop(GRADIENT_STOPS.BACKGROUND_SKY, COLORS.ocean.skyBlue);
    bgGradient.addColorStop(GRADIENT_STOPS.BACKGROUND_WATER, COLORS.ocean.lightBlue);
    bgGradient.addColorStop(GRADIENT_STOPS.BACKGROUND_SAND_START, COLORS.ocean.khaki);
    bgGradient.addColorStop(GRADIENT_STOPS.BACKGROUND_SAND_END, COLORS.ocean.burlywood);

    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw animated sun
   */
  drawSun(animationFrame, sun) {
    const sunX = this.canvas.width - ANIMATION_CONFIG.SUN_POSITION_X;
    const sunY = ANIMATION_CONFIG.SUN_POSITION_Y;

    const sunGradient = this.ctx.createRadialGradient(
      sunX, sunY, ANIMATION_CONFIG.SUN_INNER_RADIUS,
      sunX, sunY, ANIMATION_CONFIG.SUN_RADIUS + sun.pulse
    );
    sunGradient.addColorStop(GRADIENT_STOPS.SUN_INNER, COLORS.sun.yellow);
    sunGradient.addColorStop(GRADIENT_STOPS.SUN_MID, COLORS.sun.orange);
    sunGradient.addColorStop(GRADIENT_STOPS.SUN_OUTER, COLORS.sun.orangeTransparent);

    this.ctx.fillStyle = sunGradient;
    this.ctx.shadowBlur = RENDER_CONFIG.SHADOW_BLUR_SUN;
    this.ctx.shadowColor = COLORS.sun.orange;
    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, ANIMATION_CONFIG.SUN_RADIUS + sun.pulse, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  /**
   * Draw animated waves
   */
  drawWaves(waves, animationFrame) {
    waves.forEach((wave, index) => {
      const opacity = RENDER_CONFIG.WAVE_OPACITY_BASE - index * RENDER_CONFIG.WAVE_OPACITY_DECREASE;
      this.ctx.strokeStyle = COLORS.wave.white(opacity);
      this.ctx.lineWidth = RENDER_CONFIG.WAVE_LINE_WIDTH;
      this.ctx.beginPath();

      for (let x = 0; x <= this.canvas.width; x += 5) {
        const y = wave.y + Math.sin((x * ANIMATION_CONFIG.WAVE_FREQUENCY) + (animationFrame * wave.speed) + wave.offset) * ANIMATION_CONFIG.WAVE_AMPLITUDE;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    });
  }

  /**
   * Draw the snake with tropical colors and effects
   */
  drawSnake(snake, animationFrame) {
    const tropicalColors = getTropicalColorsArray();

    snake.forEach((segment, index) => {
      const color = tropicalColors[index % tropicalColors.length];
      const pulse = Math.sin(animationFrame * ANIMATION_CONFIG.SNAKE_PULSE_SPEED + index * ANIMATION_CONFIG.SNAKE_PULSE_OFFSET) * ANIMATION_CONFIG.SNAKE_PULSE_AMOUNT;

      // Glow effect
      this.ctx.shadowBlur = RENDER_CONFIG.SNAKE_SHADOW_BLUR_BASE + pulse;
      this.ctx.shadowColor = color;

      // Create summer gradient for segment
      const segmentX = segment.x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2;
      const segmentY = segment.y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2;
      const gradient = this.ctx.createRadialGradient(
        segmentX, segmentY, 2,
        segmentX, segmentY, GAME_CONFIG.GRID_SIZE / 2 + 2
      );
      gradient.addColorStop(GRADIENT_STOPS.SNAKE_INNER, COLORS.ui.white);
      gradient.addColorStop(GRADIENT_STOPS.SNAKE_MID, color);
      gradient.addColorStop(GRADIENT_STOPS.SNAKE_OUTER, color);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(
        segmentX,
        segmentY,
        GAME_CONFIG.GRID_SIZE / 2 - RENDER_CONFIG.SNAKE_SEGMENT_RADIUS_OFFSET,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      // Add sparkle on head
      if (index === 0) {
        this.drawHeadSparkle(segmentX, segmentY);
      }
    });

    this.ctx.shadowBlur = 0;
  }

  /**
   * Draw sparkle on snake's head
   */
  drawHeadSparkle(headX, headY) {
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = COLORS.ui.white;
    this.ctx.beginPath();
    this.ctx.arc(
      headX - RENDER_CONFIG.HEAD_SPARKLE_OFFSET_X,
      headY - RENDER_CONFIG.HEAD_SPARKLE_OFFSET_Y,
      RENDER_CONFIG.HEAD_SPARKLE_RADIUS,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  /**
   * Draw animated watermelon (food)
   */
  drawFood(food, animationFrame) {
    const foodX = food.x * GAME_CONFIG.GRID_SIZE;
    const foodY = food.y * GAME_CONFIG.GRID_SIZE;
    const bounce = Math.sin(animationFrame * ANIMATION_CONFIG.FOOD_BOUNCE_SPEED) * ANIMATION_CONFIG.FOOD_BOUNCE_AMOUNT;

    this.drawFoodShadow(foodX, foodY);
    this.drawWatermelon(foodX, foodY, bounce);
    this.drawWatermelonSeeds(foodX, foodY, bounce, animationFrame);
    this.drawFoodSparkles(foodX, foodY, bounce, animationFrame);

    this.ctx.shadowBlur = 0;
  }

  /**
   * Draw shadow under food
   */
  drawFoodShadow(foodX, foodY) {
    this.ctx.fillStyle = COLORS.ui.shadow;
    this.ctx.beginPath();
    this.ctx.ellipse(
      foodX + GAME_CONFIG.GRID_SIZE / 2,
      foodY + GAME_CONFIG.GRID_SIZE + RENDER_CONFIG.FOOD_SHADOW_Y_OFFSET,
      GAME_CONFIG.GRID_SIZE * RENDER_CONFIG.FOOD_SHADOW_ELLIPSE_WIDTH_RATIO,
      GAME_CONFIG.GRID_SIZE * RENDER_CONFIG.FOOD_SHADOW_ELLIPSE_HEIGHT_RATIO,
      0, 0, Math.PI * 2
    );
    this.ctx.fill();
  }

  /**
   * Draw watermelon with gradient
   */
  drawWatermelon(foodX, foodY, bounce) {
    this.ctx.shadowBlur = RENDER_CONFIG.SHADOW_BLUR_FOOD;
    this.ctx.shadowColor = COLORS.watermelon.shadowPink;

    const centerX = foodX + GAME_CONFIG.GRID_SIZE / 2;
    const centerY = foodY + GAME_CONFIG.GRID_SIZE / 2 + bounce;
    const radius = GAME_CONFIG.GRID_SIZE / 2 - RENDER_CONFIG.FOOD_RIND_OFFSET;

    // Red part
    const watermelonGradient = this.ctx.createRadialGradient(
      centerX, centerY, 2,
      centerX, centerY, radius
    );
    watermelonGradient.addColorStop(GRADIENT_STOPS.WATERMELON_INNER, COLORS.watermelon.innerPink);
    watermelonGradient.addColorStop(GRADIENT_STOPS.WATERMELON_OUTER, COLORS.watermelon.outerPink);

    this.ctx.fillStyle = watermelonGradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Green rind
    this.ctx.fillStyle = COLORS.watermelon.rind;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  /**
   * Draw rotating seeds on watermelon
   */
  drawWatermelonSeeds(foodX, foodY, bounce, animationFrame) {
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = COLORS.watermelon.seed;

    const centerX = foodX + GAME_CONFIG.GRID_SIZE / 2;
    const centerY = foodY + GAME_CONFIG.GRID_SIZE / 2 + bounce;

    for (let i = 0; i < ANIMATION_CONFIG.SEED_COUNT; i++) {
      const angle = (i * Math.PI * 2 / ANIMATION_CONFIG.SEED_COUNT) + animationFrame * ANIMATION_CONFIG.SEED_ROTATION_SPEED;
      const seedX = centerX + Math.cos(angle) * ANIMATION_CONFIG.SEED_DISTANCE;
      const seedY = centerY + Math.sin(angle) * ANIMATION_CONFIG.SEED_DISTANCE;
      this.ctx.fillRect(
        seedX - RENDER_CONFIG.SEED_WIDTH / 2,
        seedY - RENDER_CONFIG.SEED_HEIGHT / 2,
        RENDER_CONFIG.SEED_WIDTH,
        RENDER_CONFIG.SEED_HEIGHT
      );
    }
  }

  /**
   * Draw sparkles around food
   */
  drawFoodSparkles(foodX, foodY, bounce, animationFrame) {
    const centerX = foodX + GAME_CONFIG.GRID_SIZE / 2;
    const centerY = foodY + GAME_CONFIG.GRID_SIZE / 2;

    for (let i = 0; i < ANIMATION_CONFIG.SPARKLE_AROUND_FOOD_COUNT; i++) {
      const angle = (animationFrame * ANIMATION_CONFIG.SPARKLE_ROTATION_SPEED + i * Math.PI / 2);
      const distance = GAME_CONFIG.GRID_SIZE / 2 + ANIMATION_CONFIG.SPARKLE_DISTANCE;
      const sparkleX = centerX + Math.cos(angle) * distance;
      const sparkleY = centerY + Math.sin(angle) * distance + bounce;

      this.ctx.fillStyle = COLORS.ui.goldSparkle;
      this.ctx.beginPath();
      this.ctx.arc(sparkleX, sparkleY, RENDER_CONFIG.SPARKLE_RADIUS, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}
