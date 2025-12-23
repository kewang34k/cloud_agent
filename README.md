# Snake Game

A classic Snake game with premium payment integration, built with HTML, CSS, JavaScript, and Node.js backend.

## Features

### Game Features
- Classic snake gameplay with smooth controls
- Score tracking with persistent high score (saved in browser)
- Progressive difficulty - game speeds up as you score more points
- Beautiful gradient design with visual effects
- Responsive game over screen
- Snake with animated eyes that follow the direction of movement

### Premium Features (Backend Integration)
- User authentication and account management
- Stripe payment integration for one-time purchases and subscriptions
- Cloud-based score tracking and leaderboards
- Secure transaction processing
- Premium subscription tiers

## How to Play

1. Open `index.html` in any modern web browser
2. Click "Start Game" to begin
3. Use the arrow keys to control the snake:
   - ↑ Up Arrow - Move up
   - ↓ Down Arrow - Move down
   - ← Left Arrow - Move left
   - → Right Arrow - Move right
4. Eat the red food to grow and score points
5. Avoid hitting the walls or yourself

## Game Rules

- Each piece of food gives you 1 point
- The snake grows longer with each food eaten
- Game speed increases every 5 points
- Game ends if you hit a wall or your own body
- High score is saved locally in your browser

## Quick Start

### Play Without Backend (Original Version)
1. Open `index.html` in any modern web browser
2. Click "Start Game" to begin playing immediately

### Run With Payment Backend
1. Install dependencies: `npm install`
2. Set up environment variables (see PAYMENT_SETUP.md)
3. Start the server: `npm start`
4. Open `http://localhost:3000` in your browser

## Technical Details

### Frontend
- Pure vanilla JavaScript (no frameworks required)
- Canvas-based rendering for smooth graphics
- LocalStorage for high score persistence
- Stripe.js for payment processing

### Backend
- Node.js with Express server
- SQLite database for user and transaction data
- JWT-based authentication
- Stripe API integration for payments
- RESTful API architecture

## Project Structure

```
cloud_agent/
├── index.html              # Original standalone game
├── public/
│   └── game.html          # Game with payment integration
├── server/
│   ├── index.js           # Express server entry point
│   ├── database/
│   │   └── db.js          # SQLite database setup
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   └── routes/
│       ├── auth.js        # Authentication endpoints
│       ├── payment.js     # Payment/Stripe endpoints
│       └── user.js        # User management endpoints
├── package.json           # Node.js dependencies
├── .env.example           # Environment variables template
├── PAYMENT_SETUP.md       # Detailed setup guide
└── README.md             # This file
```

## Payment Integration

This game includes a complete payment backend using Stripe. Features include:

- **One-time purchases**: Unlock premium features with a single payment
- **Subscription billing**: Monthly recurring payments for ongoing access
- **Secure authentication**: JWT-based user authentication
- **Transaction history**: Track all payments and purchases
- **Webhook integration**: Real-time payment status updates

For detailed setup instructions, see [PAYMENT_SETUP.md](PAYMENT_SETUP.md)

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login

### Payment Endpoints
- `POST /api/payment/create-payment-intent` - Process one-time payment
- `POST /api/payment/create-subscription` - Start subscription
- `GET /api/payment/subscription-status` - Check subscription
- `POST /api/payment/cancel-subscription` - Cancel subscription

### User Endpoints
- `GET /api/user/profile` - Get user data
- `POST /api/user/score` - Save game score
- `GET /api/user/leaderboard` - View leaderboard

Full API documentation available in [PAYMENT_SETUP.md](PAYMENT_SETUP.md)

## Screenshots

The game features:
- A 20x20 grid game board
- Green gradient snake with directional eyes
- Red glowing food items
- Purple gradient UI theme
- Score and high score display
- User authentication interface
- Premium payment options

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

## Security

**Important**: Before deploying to production:
1. Change the `JWT_SECRET` in `.env`
2. Use Stripe live keys instead of test keys
3. Enable HTTPS/SSL
4. Configure proper CORS settings
5. Review security checklist in PAYMENT_SETUP.md

## License

MIT License - Feel free to modify and use for your projects.

## Support

For setup help or issues, please refer to:
- [PAYMENT_SETUP.md](PAYMENT_SETUP.md) - Complete setup guide
- [Stripe Documentation](https://stripe.com/docs) - Payment integration help

Enjoy playing!
