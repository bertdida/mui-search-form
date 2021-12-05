import Chip from '@mui/material/Chip';

import { Result } from '../types';
import useStyles from './useStyles';
import useMaxItems from './useMaxItems';

interface SelectedProps {
  data: Result[];
  onRemove: (result: Result) => any;
}

export const Selected: React.FC<SelectedProps> = (props) => {
  const { data, onRemove } = props;
  const maxItems = useMaxItems();
  const classes = useStyles();

  if (!data.length) {
    return null;
  }

  const visibleItems = data.slice(0, maxItems);

  return (
    <div className={classes.root}>
      {visibleItems.length >= 1 && (
        <SelectedList items={visibleItems} onRemove={onRemove} />
      )}
      {data.length > maxItems && (
        <Chip label={`+${data.length - maxItems} more`} />
      )}
    </div>
  );
};

interface SelectedListProps extends Pick<SelectedProps, 'onRemove'> {
  items: Result[];
}

const SelectedList: React.FC<SelectedListProps> = (props) => {
  const { items, onRemove } = props;
  const classes = useStyles();

  function onDelete(_: React.MouseEvent<HTMLButtonElement>, item: Result) {
    onRemove(item);
  }

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <li key={item.id} className={classes.listItem}>
          <Chip
            label={item.value}
            onDelete={(event) => onDelete(event, item)}
          />
        </li>
      ))}
    </ul>
  );
};
