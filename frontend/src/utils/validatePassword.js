const validatePassword = (password) => {
  const validations = [
    password.length > 5,
    password.search(/[A-Z]/) > -1,
    password.search(/[0-9]/) > -1,
    password.search(/[$&+,:;=?@#]/) > -1,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur);

  return strength;
};

export default validatePassword;
