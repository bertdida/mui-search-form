import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginRight: theme.spacing(0.5),
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(0.5),
  },
  listItem: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(0.5),
    },
  },
}));
