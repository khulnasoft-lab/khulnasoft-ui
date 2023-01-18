/**
 * Builds the parameters object disable one or multiple controls.
 */
export const disableControls = (controls = []) =>
  Object.fromEntries(controls.map((control) => [control, { control: { disable: true } }]));
