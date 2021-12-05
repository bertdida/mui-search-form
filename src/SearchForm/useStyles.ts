import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minHeight: 40,
    borderRadius: 8,
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: 0,
    boxSizing: 'content-box',
    borderWidth: 1,
    borderColor: theme.palette.grey[700],
    backgroundColor: theme.palette.background.paper,
  },
  hasResults: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  form: {
    display: 'flex',
    flexGrow: 1,
  },
  formInput: {
    width: '100%',
  },
}));
