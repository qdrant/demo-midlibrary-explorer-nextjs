import { createTheme as createMuiTheme } from '@mui/material/styles';
import { darkThemeOptions } from './dark-theme';
import { neutral } from '@/theme/palette';

const themeOptions = {
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        sx: {
          color: 'primary.contrastText',
          textDecorationColor: 'primary.contrastText',
        },
      },
    },
  },
  palette: {
    neutral,
  },
};

export const createTheme = (config) => {
  return createMuiTheme(config, themeOptions, darkThemeOptions);
};
