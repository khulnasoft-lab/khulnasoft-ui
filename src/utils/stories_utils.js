/**
 * These are used to test varying lengths of series names
 */
export const SERIES_NAME_SHORT = 'SERIES_NAME_SHORT';
export const SERIES_NAME_LONG = 'SERIES_NAME_LONG';
export const SERIES_NAME_LONG_WITHOUT_SPACES = 'SERIES_NAME_LONG_WITHOUT_SPACES';

export const SERIES_NAME = {
  [SERIES_NAME_SHORT]: 'Series ',
  [SERIES_NAME_LONG]:
    'Series name long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt interdum sapien ut blandit. Nulla fermentum nisi id euismod vulputate. END',
  [SERIES_NAME_LONG_WITHOUT_SPACES]:
    'Series_name_long._Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit._Sed_tincidunt_interdum_sapien_ut_blandit._Nulla_fermentum_nisi_id_euismod_vulputate._END',
};

/**
 * Builds the parameters object disable one or multiple controls.
 */
export const disableControls = (controls = []) =>
  Object.fromEntries(controls.map((control) => [control, { control: { disable: true } }]));
