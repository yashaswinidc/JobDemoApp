function ResetPasswordValidation(values) {
  let error = {};
  const emailidPatterns = /^[A-Za-z0-9._+\-@]+$/;

  const validateField = (fieldName, value, pattern, error) => {
    if (value === "") {
      error[fieldName] = `${fieldName} should not be empty`;
    } else if (!pattern.test(value)) {
      error[fieldName] = `Enter a valid ${fieldName}`;
    } else {
      error[fieldName] = "";
    }
  };

  validateField("emailId", values.emailId, emailidPatterns, error);

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

export default ResetPasswordValidation;
