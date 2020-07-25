import validator from './common';

const { checkNumberChars, isNumeric, checkErrors, isEmailAddress, checkErrorsBtn, isNotEmpty } = validator;

export default {
  usernameValidator: (value, min = 3) => checkErrors([checkNumberChars(value, min)]),
  ribValidator: (value, min = 3) => checkErrors([checkNumberChars(value, min), isNumeric(value)]),
  passwordValidator: (value, min = 8) => checkErrors([checkNumberChars(value, min)]),
  emailValidator: (value) => checkErrors([isEmailAddress(value)]),
  signinValidator: (errors, fields) => checkErrorsBtn(errors, fields),
  signupValidator: (errors, fields) => checkErrorsBtn(errors, fields),
  isNotEmpty: (str) => isNotEmpty(str),
};
