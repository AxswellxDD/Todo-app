import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button
} from '@mui/material';
import TodoList from './TodoList';
import { Item } from './TodoList';

const loadItems = () => {
  try {
    if (localStorage.getItem('items')) {
      return JSON.parse(localStorage.getItem('items')) || [];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

function Todo() {
  const [items, setItems] = useState(loadItems());
  const [newItemTitle, setNewItemTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  const addItem = () => {
    if (newItemTitle) {
      setItems([...items, new Item(items.length + 1, newItemTitle)]);
      setNewItemTitle('');
    }
  };

  const onToggle = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setItems(newItems);
  };

  const onDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <Box sx={{ p: '8px', width: '100%' }}>
      <Typography variant="h6" sx={{ pl: '10px', pt: '10px' }}>What's the Plan
        for Today?</Typography>
      <Box sx={{ width: '500px' }}>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" fullWidth>
          <OutlinedInput
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addItem();
              }
            }}
            onChange={(e) => setNewItemTitle(e.target.value)}
            value={newItemTitle}
            fullWidth
            placeholder="Add a task"
            id="standard-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" size="small" onClick={addItem}>
                  Add
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
        <TodoList items={items} onToggle={onToggle} onDelete={onDelete} />
      </Box>
    </Box>
  );
}

export default Todo;
