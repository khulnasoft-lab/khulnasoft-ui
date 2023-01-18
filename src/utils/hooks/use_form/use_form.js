import Vue from 'vue';
import { VALIDATOR_ACCESSIBILITY_INPUT_ATTRIBUTES } from './constants';

export const useForm = () => {
  const formState = Vue.observable({ fields: {}, isValid: true });

  const formStateComputedProperty = () => formState;

  const componentBindings =
    ({ name, rules, shouldBindInputAttributes }) =>
    () => {
      const { errors } = formState.fields[name];
      const state = Object.keys(errors).length ? false : null;
      const accessibilityInputAttributes = rules.reduce((accumulator, rule) => {
        const validationRuleAttributes = VALIDATOR_ACCESSIBILITY_INPUT_ATTRIBUTES.find(
          (validationRuleAttribute) => validationRuleAttribute.validator === rule.validator
        );

        if (!validationRuleAttributes) {
          return accumulator;
        }

        return {
          ...accumulator,
          ...validationRuleAttributes.generateAttributes(rule.options),
        };
      }, {});

      return {
        group: {
          state,
          invalidFeedback: errors[0],
          ...(shouldBindInputAttributes ? { labelFor: name } : {}),
        },
        input: {
          state,
          ...accessibilityInputAttributes,
          ...(shouldBindInputAttributes ? { name, id: name } : {}),
        },
      };
    };

  const registerFormField = (
    name,
    { value = '', rules = [], shouldBindInputAttributes = true } = {}
  ) => {
    Vue.set(formState.fields, name, { value, initialValue: value, rules, errors: [] });

    return [componentBindings({ name, rules, shouldBindInputAttributes })];
  };

  const clearFormFields = () => {
    Object.keys(formState.fields).forEach((fieldName) => {
      const field = formState.fields[fieldName];

      Vue.set(field, 'value', field.initialValue);
    });
  };

  const clearFormField = (name) => {
    const field = formState.fields[name];

    Vue.set(field, 'value', field.initialValue);
  };

  function handleSubmit({ onSuccess = () => {}, onError = () => {} } = {}) {
    return function processForm(event) {
      const formErrors = Object.keys(formState.fields).reduce((accumulator, fieldName) => {
        const { rules } = formState.fields[fieldName] || [];

        const fieldErrors = rules.flatMap((rule) => {
          if (!rule.validator(formState.fields[fieldName].value, rule.options)) {
            return [rule.message];
          }

          return [];
        });

        if (fieldErrors.length) {
          return {
            ...accumulator,
            [fieldName]: fieldErrors,
          };
        }

        return accumulator;
      }, {});

      const fieldsWithoutErrors = Object.keys(formState.fields).filter(
        (fieldName) => !Object.keys(formErrors).includes(fieldName)
      );

      fieldsWithoutErrors.forEach((fieldName) => {
        Vue.set(formState.fields[fieldName], 'errors', []);
      });

      if (Object.keys(formErrors).length) {
        event.preventDefault();
        Vue.set(formState, 'isValid', false);

        Object.keys(formErrors).forEach((fieldName) => {
          const fieldErrors = formErrors[fieldName];

          Vue.set(formState.fields[fieldName], 'errors', fieldErrors);
        });

        onError.call(this, event);

        return;
      }

      Vue.set(formState, 'isValid', true);

      const formValues = Object.keys(formState.fields).reduce((accumulator, fieldName) => {
        return {
          ...accumulator,
          [fieldName]: formState.fields[fieldName].value,
        };
      }, {});
      onSuccess.call(this, event, formValues);
    };
  }

  return {
    formState,
    formStateComputedProperty,
    registerFormField,
    clearFormFields,
    clearFormField,
    handleSubmit,
  };
};
