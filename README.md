# Summer Beach Snake Game

A vibrant summer-themed single-player Snake game built with HTML, CSS, and JavaScript. Surf the beach and collect tropical snacks!

## Features

- Summer beach theme with tropical visuals
- Animated rising bubbles and ocean waves
- Snake with vibrant tropical colors (tomato, gold, teal, pink, orange, turquoise)
- Collect watermelon slices and summer snacks
- Score tracking with persistent high score (saved in browser)
- Progressive difficulty - game speeds up as you collect more snacks
- Beautiful summer color scheme (coral, turquoise, gold, sandy yellow)
- Ocean gradient background with animated waves
- Pulsing sun animation in the corner
- Glowing effects with gradient colors
- Cute playful UI with beach emojis

## How to Play

1. Open `index.html` in any modern web browser
2. Click "Start Game" to begin
3. Use the arrow keys to control your beach snake:
   - ↑ Up Arrow - Move up
   - ↓ Down Arrow - Move down
   - ← Left Arrow - Move left
   - → Right Arrow - Move right
4. Collect watermelon slices to grow your snake
5. Avoid hitting the walls or yourself
6. Enjoy the sunny beach vibes!

## Game Rules

- Each watermelon slice gives you 1 point
- Your snake grows longer with each snack collected
- Game speed increases every 5 snacks
- Game ends if you hit a wall or your own body
- High score is saved locally in your browser
- The snake alternates between tropical colors: tomato, gold, teal, pink, orange, and turquoise

## Technical Details

- Pure vanilla JavaScript (no frameworks required)
- Canvas-based rendering for smooth graphics
- LocalStorage for high score persistence
- Fully self-contained single HTML file
- Fredoka font from Google Fonts for playful typography

## Visual Features

The game features:
- A 20x20 grid game board with ocean-to-beach gradient
- Colorful tropical snake (alternating tomato, gold, teal, pink, orange, turquoise)
- Glowing snake segments with pulsing effects
- Animated watermelon slices with rotating seeds
- 30 rising bubbles with varying speeds
- Animated ocean waves across the canvas
- Pulsing sun in the top right corner
- Coral and turquoise gradient UI theme with gold accents
- Beach emojis throughout (🌊, 🏖️, ☀️, 🌴, 🍉, 🏄, 🌺, 🐚, ⛱️, 🦀)
- Score display showing "Snacks" collected
- Floating beach decorations (waves, beaches, flowers, shells, umbrellas, crabs)
- Corner decorations: palm tree, sun, surfer, watermelon

Catch some waves and enjoy the summer! ☀️🏖️

## Payment API Backend

This repository now includes a lightweight Express backend to support payment flows for the game (or any other client).

### Running the server

1. Install dependencies (already included in `package-lock.json`):
   ```bash
   npm install
   ```
2. Start the API (defaults to port `3001`):
   ```bash
   npm run start
   ```

### Available endpoints

- `POST /api/payments` — Create a new payment intent. Requires `amount` (number), `currency` (3-letter code), and `method` (string). Returns a `paymentId`, `clientSecret`, status, and timestamp.
- `GET /api/payments/:id` — Retrieve the current state of a payment.
- `POST /api/payments/:id/confirm` — Confirm a pending payment. Simulates processing and marks it as `succeeded`.
- `POST /api/payments/webhook` — Simple webhook receiver to update status from an external provider. Accepts `paymentId`, `status` (`succeeded`, `failed`, `requires_action`, `canceled`), and optional `providerReference`.

These endpoints use in-memory storage for simplicity; replace with your persistence and real payment gateway integration as needed.
