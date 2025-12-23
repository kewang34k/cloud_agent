const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { run, get, all } = require('../database/db');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await get(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get subscription info
    const subscription = await get(
      `SELECT plan_type, status, current_period_end
       FROM subscriptions
       WHERE user_id = ? AND status = 'active'
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    // Get high score
    const highScore = await get(
      'SELECT MAX(score) as high_score FROM scores WHERE user_id = ?',
      [userId]
    );

    res.json({
      user: {
        ...user,
        subscription: subscription || null,
        highScore: highScore?.high_score || 0
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Save game score
router.post('/score', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { score, gameMode = 'classic' } = req.body;

    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Invalid score' });
    }

    await run(
      'INSERT INTO scores (user_id, score, game_mode) VALUES (?, ?, ?)',
      [userId, score, gameMode]
    );

    // Get updated high score
    const highScore = await get(
      'SELECT MAX(score) as high_score FROM scores WHERE user_id = ?',
      [userId]
    );

    res.json({
      message: 'Score saved successfully',
      highScore: highScore?.high_score || 0
    });
  } catch (error) {
    console.error('Score save error:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { gameMode = 'classic', limit = 10 } = req.query;

    const leaderboard = await all(
      `SELECT u.username, s.score, s.created_at
       FROM scores s
       JOIN users u ON s.user_id = u.id
       WHERE s.game_mode = ?
       ORDER BY s.score DESC
       LIMIT ?`,
      [gameMode, parseInt(limit)]
    );

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user's score history
router.get('/scores', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 20 } = req.query;

    const scores = await all(
      `SELECT score, game_mode, created_at
       FROM scores
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
      [userId, parseInt(limit)]
    );

    res.json({ scores });
  } catch (error) {
    console.error('Score history fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch score history' });
  }
});

module.exports = router;
