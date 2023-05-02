// This contains core validating behavior and **should not** contain
// domain-specific validations.
//
// Look to what's allowed in HTML attributes as a good basis for what belongs here
//
// ```
// // Good
// export const required = ...
//
// // Bad
// export const projectPathIsUnique = ...
// ```
export const factory = (failMessage, isValid) => (val) => !isValid(val) ? failMessage : '';

export const required = (failMessage) =>
  factory(failMessage, (val) => val !== '' && val !== null && val !== undefined);
