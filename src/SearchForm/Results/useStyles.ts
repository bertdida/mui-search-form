import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'absolute !important' as 'absolute',
    left: 0,
    top: '100%',
    width: '100%',
    maxHeight: 500,
    overflow: 'auto',
    border: '1px solid transparent',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    boxSizing: 'border-box',
    borderTopColor: theme.palette.grey[700],
    backgroundColor: theme.palette.background.paper,

    '&::-webkit-scrollbar': {
      width: 16,
      backgroundColor: 'transparent',
    },

    '&::-webkit-scrollbar-button': {
      backgroundColor: 'transparent',
    },

    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
      border: '4px solid transparent',
      borderRadius: 8,
      backgroundColor: 'rgba(128, 134, 139, 0.2)',
      backgroundClip: 'padding-box',
      boxShadow: 'none',
    },
  },
}));
