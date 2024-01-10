export const validateLoginForm = (inputs) => {
    let errors = {};
    const user_name = /^[0-9]+$/;

    // Validation for user_name
    if (!inputs.user_name) {
      errors.user_name = 'Please input number';
    } else if (inputs.user_name.length !== 10) {
      errors.user_name = 'Mobile number must be 10 digits long';
    } else if (!user_name.test(inputs.user_name)) {
      errors.user_name = 'Mobile number should contain only digits';
    } else {
      errors.user_name = null; // Reset the error if no error
    }

    // Validation for password
    if (!inputs.password) {
      errors.password = 'Please input password';
    } else if (inputs.password.length < 3) {
      errors.password = 'Min password length of 3';
    } else {
      errors.password = null; // Reset the error if no error
    }

    return errors;
  };



export const validateSignUpForm = (inputs) => {
	let errors = {};
  
	// SignUp Validation
	if (!inputs.name) {
	  errors.name = 'Please input name';
	}
  
	const mobileNumberPattern = /^[0-9]+$/; // Regular expression to match digits only
	if (!inputs.mobile_number) {
	  errors.mobile_number = 'Please input number';
	} else if (inputs.mobile_number.length !== 10) {
	  errors.mobile_number = 'Mobile number must be 10 digits long';
	} else if (!mobileNumberPattern.test(inputs.mobile_number)) {
	  errors.mobile_number = 'Mobile number should contain only digits';
	}
  
	if (!inputs.aadhaar_number) {
	  errors.aadhaar_number = 'Please input Aadhar Number';
	} else if (!/^\d{12}$/.test(inputs.aadhaar_number)) {
	  errors.aadhaar_number = 'Aadhar Number should contain 12 digits';
	}
  
	if (!inputs.saas_id) {
	  errors.saas_id = 'Please input Saas Id';
	} else if (!/^\d+$/.test(inputs.saas_id)) {
	  errors.saas_id = 'Store ID should contain only digits';
	}
  
	if (!inputs.store_id) {
	  errors.store_id = 'Please input Store Id';
	} else if (inputs.store_id.length !== 5) {
	  errors.store_id = 'Store ID must be 5 digits long';
	} else if (!/^\d+$/.test(inputs.store_id)) {
	  errors.store_id = 'Store ID should contain only digits';
	}
  
	if (!inputs.address) {
	  errors.address = 'Please input an address';
	}
  
	if (!inputs.city) {
	  errors.city = 'Please input City';
	} else if (!/^[A-Za-z\s]+$/.test(inputs.city)) {
	  errors.city = 'City should contain only letters and spaces';
	}
  
	if (!inputs.pincode) {
	  errors.pincode = 'Please input PIN code';
	} else if (!/^\d{6}$/.test(inputs.pincode)) {
	  errors.pincode = 'PIN code should be a 6-digit number';
	}
  
	if (!inputs.password) {
	  errors.password = 'Please input password';
	} else if (inputs.password.length < 8) {
	  errors.password = 'Min password length of 8';
	}
  
	return errors;
  };