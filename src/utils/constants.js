import {
  glThemes as glThemesVariable,
  glIconSizes as glIconSizesVariable,
} from '../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved

import { POSITION } from '../components/utilities/truncate/constants';

function appendDefaultOption(options) {
  return { ...options, default: '' };
}

export const COMMA = ',';

export const glThemes = glThemesVariable.split(COMMA).map((glTheme) => glTheme.trim());

export const variantOptions = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  light: 'light',
  dark: 'dark',
};

export const badgeSizeOptions = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const badgeVariantOptions = {
  muted: 'muted',
  neutral: 'neutral',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export const variantCssColorMap = {
  muted: 'gl-text-gray-500',
  neutral: 'gl-text-blue-100',
  info: 'gl-text-blue-500',
  success: 'gl-text-green-500',
  warning: 'gl-text-orange-500',
  danger: 'gl-text-red-500',
};

export const targetOptions = ['_self', '_blank', '_parent', '_top', null];

export const sizeOptions = {
  default: null,
  sm: 'sm',
  lg: 'lg',
};

export const labelSizeOptions = {
  default: null,
  sm: 'sm',
};

export const labelColorOptions = {
  dark: 'dark',
  light: 'light',
};

export const avatarSizeOptions = [96, 64, 48, 32, 24, 16];

export const avatarsInlineSizeOptions = [32, 24];

export const avatarShapeOptions = {
  circle: 'circle',
  rect: 'rect',
};

export const formStateOptions = {
  default: null,
  valid: true,
  invalid: false,
};

export const newButtonCategoryOptions = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
};

export const newButtonVariantOptions = {
  default: 'default',
  confirm: 'confirm',
  info: 'info (deprecated)',
  success: 'success (deprecated)',
  warning: 'warning (deprecated)',
  danger: 'danger',
  dashed: 'dashed',
  link: 'link',
  /**
   * The "reset" variant can be used when customization of GlButton styles is required
   * (e.g. for the "close" button in GlLabel).
   * It should be used sparingly and only when other approaches fail.
   * Prefer supported variants where ever possible.
   */
  reset: 'gl-reset',
};

export const newDropdownVariantOptions = {
  default: 'default',
  confirm: 'confirm',
  info: 'info (deprecated)',
  success: 'success (deprecated)',
  warning: 'warning (deprecated)',
  danger: 'danger',
  link: 'link',
};

export const newButtonSizeOptions = {
  small: 'small',
  medium: 'medium',
};

export const newButtonSizeOptionsMap = {
  small: 'sm',
  medium: 'md',
};

// size options all have corresponding styles (e.g. .s12 defined in icon.scss)
export const iconSizeOptions = glIconSizesVariable.split(' ').map(Number);

export const triggerVariantOptions = {
  click: 'click',
  hover: 'hover',
  focus: 'focus',
};

export const tooltipPlacements = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
};

// in milliseconds
export const tooltipDelay = {
  show: 500,
  hide: 0,
};

export const popoverPlacements = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
};

export const columnOptions = {
  stacked: 'stacked',
  tiled: 'tiled',
};

export const alignOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
  fill: 'fill',
};

export const alertVariantOptions = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  tip: 'tip',
};

export const alertVariantIconMap = {
  success: 'check-circle',
  warning: 'warning',
  danger: 'error',
  info: 'information-o',
  tip: 'bulb',
};

export const colorThemes = {
  indigo: 'theme-indigo-900',
  'light-indigo': 'theme-indigo-700',
  blue: 'theme-blue-900',
  'light-blue': 'theme-blue-700',
  green: 'theme-green-900',
  'light-green': 'theme-green-700',
  red: 'theme-red-900',
  'light-red': 'theme-red-700',
  dark: 'gray-900',
  light: 'gray-700',
};

export const modalButtonDefaults = {
  actionPrimary: {
    variant: 'confirm',
    category: 'primary',
  },
  actionSecondary: {
    variant: 'confirm',
    category: 'secondary',
  },
  actionCancel: {
    variant: 'default',
  },
};

export const tabsButtonDefaults = {
  actionPrimary: {
    variant: 'success',
    category: 'primary',
  },
  actionSecondary: {
    variant: 'default',
    category: 'secondary',
  },
  actionTertiary: {
    variant: 'default',
  },
};

export const tokenVariants = ['default', 'search-type', 'search-value'];

export const resizeDebounceTime = 200;

export const variantOptionsWithNoDefault = appendDefaultOption(variantOptions);
export const sizeOptionsWithNoDefault = appendDefaultOption(sizeOptions);

// Datetime constants
export const defaultDateFormat = 'YYYY-MM-DD';

export const bannerVariants = ['promotion', 'introduction'];

export const maxZIndex = 10;
// Button constants

export const deprecatedButtonCategoryOptions = {
  tertiary: 'tertiary',
  primary: 'primary',
  secondary: 'secondary',
};

export const deprecatedButtonVariantCategoryMap = {
  default: 'tertiary',
  primary: 'primary',
  secondary: 'primary',
  dark: 'primary',
  light: 'primary',
  info: 'primary',
  success: 'primary',
  warning: 'primary',
  danger: 'primary',
  'outline-info': 'secondary',
  'outline-success': 'secondary',
  'outline-warning': 'secondary',
  'outline-danger': 'secondary',
};

export const deprecatedButtonVariantOptions = {
  primary: 'primary',
  secondary: 'secondary',
  dark: 'dark',
  light: 'light',
};

export const deprecatedButtonOutlineVariantOptions = {
  'outline-info': 'outline-info',
  'outline-success': 'outline-success',
  'outline-warning': 'outline-warning',
  'outline-danger': 'outline-danger',
};

export const buttonVariantOptions = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  link: 'link',
  loading: 'loading',
};

export const availableButtonVariantOptions = {
  ...buttonVariantOptions,
  ...deprecatedButtonVariantOptions,
  ...deprecatedButtonOutlineVariantOptions,
};

export const deprecatedButtonSizeOptions = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const modalSizeOptions = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const focusableTags = ['INPUT', 'TEXTAREA', 'A', 'BUTTON', 'SELECT'];

export const keyboard = {
  escape: 'Escape',
  backspace: 'Backspace',
  delete: 'Delete',
  left: 'Left',
  arrowLeft: 'ArrowLeft',
  right: 'Right',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End',
};

export const truncateOptions = POSITION;

export const formInputSizes = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '(unset or null)': null,
};

export const toggleLabelPosition = {
  hidden: 'hidden',
  left: 'left',
  top: 'top',
};

export const tooltipActionEvents = ['open', 'close', 'enable', 'disable'];

export const drawerVariants = {
  default: 'default',
  sidebar: 'sidebar',
};
