// get all the fields, this is the full object for each
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
// control to add an appropriate message on error and change class to give correct styling
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
}

// check email valid
// .test() method returns true if it finds a match
function checkEmail(input) {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// check required fields
function checkRequired(inputArr) {
  // forEach is a high order array method, looping through the array
  // returns error message if any field is blank by sending to showError function
  inputArr.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// get fieldname
// function which makes the first character of ID uppercase and keeps rest as is
// returns it to showError where it was called from
// takes first character, charAt(0) and turns to uppercase, and takes remaining characters using slice at second spot on
//    and prints those as is
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
// run all of these functions on hitting the submit button
form.addEventListener("submit", function(e) {
  e.preventDefault(); // keep the form from submitting
  checkRequired([username, email, password, password2]); // sending all the fields that need to be checked as 1 array
  checkLength(username, 3, 15); // check lenghth of the user name
  checkLength(password, 6, 25); // check length of the password
  checkEmail(email); // make sure a valid email address
  checkPasswordsMatch(password, password2); // check for matching passwords

  // old way of doing:
  // if(username.value === '') {
  //   showError(username, 'Username is required')
  // } else {
  //   showSuccess(username);
  // }

  // if(email.value === '') {
  //   showError(email, 'Email is required')
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, 'Email is not valid')
  // } else {
  //   showSuccess(email);
  // }

  // if(password.value === '') {
  //   showError(password, 'Password is required')
  // } else {
  //   showSuccess(password);
  // }

  // if(password2.value === '') {
  //   showError(password2, 'Password 2 is required')
  // } else {
  //   showSuccess(password2);
  // }
});
