import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Result } from '../types';
import useStyles from './useStyles';

interface ResultsProps {
  data: Result[];
  selected: Result[];
  onSelect: (result: Result) => any;
}

export const Results: React.FC<ResultsProps> = (props) => {
  const { data, selected, onSelect } = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data.map((currData) => (
        <ListItem
          dense
          button
          key={currData.id}
          onClick={() => onSelect(currData)}
          disabled={selected.some(
            (currSelected) => currSelected.id === currData.id
          )}
        >
          <ListItemText>{currData.value}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
