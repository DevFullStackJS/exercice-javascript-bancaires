export default {
  checkErrors: (errors) => errors.filter((curr) => (curr.check)),
  checkNumberChars: (value, nb) => ({
    msg: `Must be at least ${nb} chars long`,
    check: value.length < nb,
  }),
  isEmailAddress: (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return {
      msg: 'Email is invalid',
      check: !pattern.test(str),
    };
  },
  isNotEmpty: (str) => {
    const pattern = /\S+/;
    return !pattern.test(str);
  },
  isNumeric: (str) => {
    const pattern = /^\d+$/;
    return {
      msg: 'is not Number',
      check: !pattern.test(str),
    };
  },
  isSame: (str1, str2) => ({
      msg: 'is not same',
      check: str1 !== str2,
    }),
  checkErrorsBtn: (errors, fields) => fields.reduce((acc, curr) => (errors[curr] ? errors[curr].length > 0 || acc : acc), false),
};
