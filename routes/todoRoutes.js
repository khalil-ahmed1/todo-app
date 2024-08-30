// routes/todoRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Add To-Do
  router.post('/', (req, res) => {
    const { text, date_time } = req.body;
    const user_id = req.session.userId;
    db.query('INSERT INTO todos (user_id, text, date_time) VALUES (?, ?, ?)', [user_id, text, date_time], (err) => {
      if (err) return res.status(500).json({ message: 'Error adding to-do' });
      res.status(200).json({ message: 'To-Do added successfully' });
    });
  });

  // Get All To-Dos
  router.get('/', (req, res) => {
    const user_id = req.session.userId;
    db.query('SELECT * FROM todos WHERE user_id = ?', [user_id], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching to-dos' });
      res.json(results);
    });
  });

  // Delete To-Do
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ message: 'Error deleting to-do' });
      res.status(200).json({ message: 'To-Do deleted successfully' });
    });
  });

 // Edit To-Do
 router.put('/:id', (req, res) => {
  const { text, date_time, is_complete } = req.body;
  const { id } = req.params;
  // Only update fields that are provided in the request
  const updates = [];
  const values = [];

  if (text !== undefined) {
    updates.push('text = ?');
    values.push(text);
  }
  if (date_time !== undefined) {
    updates.push('date_time = ?');
    values.push(date_time);
  }
  if (is_complete !== undefined) {
    updates.push('is_complete = ?');
    values.push(is_complete);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  values.push(id); // Add id to end of values array
  const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;

  db.query(query, values, (err) => {
    if (err) return res.status(500).json({ message: 'Error updating to-do' });
    res.status(200).json({ message: 'To-Do updated successfully' });
  });
});

  return router;
};
