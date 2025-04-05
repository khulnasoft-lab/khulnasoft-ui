/**
 * Builds the parameters object disable one or multiple controls.
 */
export const disableControls = (controls = []) =>
  Object.fromEntries(controls.map((control) => [control, { control: { disable: true } }]));

export const getA11yParameters = ({ skipRules = [], temporarySkipRules = [] } = {}) => {
  const skippedRules = skipRules.concat(temporarySkipRules).map((id) => ({ id, enabled: false }));
  return {
    config: {
      rules: skippedRules,
    },
  };
};
