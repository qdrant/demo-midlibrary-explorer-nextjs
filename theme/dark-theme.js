import { neutral } from '@/theme/palette';

const background = {
  default: '#0B0F19',
  paper: neutral[900],
  code: '#0B0F19',
};

const divider = neutral[200];

const primary = {
  main: '#B2BFE8',
  light: '#D9E2FF',
  dark: '#7589BE',
  contrastText: neutral[0],
};

const secondary = {
  main: '#ec2c54',
  light: '#e1b2bd',
  dark: '#ec0f3d',
  contrastText: neutral[0],
};

const success = {
  main: '#14B8A6',
  light: '#43C6B7',
  dark: '#0E8074',
  contrastText: neutral[0],
};

const info = {
  main: neutral[300],
  light: '#64B6F7',
  dark: '#0B79D0',
  contrastText: neutral[0],
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: neutral[0],
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: neutral[0],
};

// these options override the base dark theme
export const darkThemeOptions = {
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.85rem',
          background: primary.main,
          color: neutral[900],
        },
        arrow: {
          color: primary.main,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    background,
    primary,
    secondary,
    success,
    warning,
    error,
    info,
    divider,
  },
};
