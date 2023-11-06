function SignupValidation(values) {
  let error = {};
  const namePattern = /^[a-zA-Z][a-zA-Z\s'-]*$/;
  const phonePattern = /^[0-9+()\s-]*$/;
  const emailidPatterns = /^[A-Za-z0-9._+\-@]+$/;

  const validateField = (fieldName, value, pattern, error) => {
    if (value === "") {
      error[fieldName] = `${fieldName} should not be empty`;
    } else if (!pattern.test(value)) {
      error[fieldName] = `Please enter valid input`;
    } else {
      error[fieldName] = "";
    }
  };

  validateField("name", values.name, namePattern, error);
  validateField("emailId", values.emailId, emailidPatterns, error);
  validateField("phoneNo", values.phoneNo, phonePattern, error);

  if (values.password === "") {
    error.password = "Password should not be empty.";
  } else {
    error.password = "";
  }

  if (!(values.password === values.confirmPassword)) {
    error.password = "Password & Confirm password must match";
  } else {
    error.password = "";
  }

  return error;
}

export default SignupValidation;
