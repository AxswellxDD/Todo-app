import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

class Item {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

const TodoList = (props) => {
  const { items, onToggle, onDelete } = props;
  return (
    <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {(items || []).map((item, i) => {
        const labelId = `checkbox-list-label-${item.id}`;
        
        return (
          <ListItem 
            sx={{ width: '100%' }}
            fullwidth={{width: '100%'}}
            key={i}
            name={item.name}
            secondaryAction={
              <IconButton edge="end" aria-label="comments"
                          onClick={() => onDelete(item.id)}>
                <HighlightOffIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={() => onToggle(item.id)}
                            dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.title}
                            sx={{ textDecoration: item.completed ? 'line-through' : 'none' }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TodoList;
export { Item };
