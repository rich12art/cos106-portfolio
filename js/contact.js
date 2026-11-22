/* contact.js
   Contact form validation for the COS 106 term project.

   The form is checked with JavaScript before anything is "submitted".
   There is no back-end on this project, so a valid form shows a
   success message instead of sending a real email.
*/

function isEmpty(value) {
  return value.trim() === "";
}

// A simple email check: text, an @ sign, more text, a dot, then a domain.
function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim());
}

// The brief asks for a phone number that contains only digits.
function isDigitsOnly(value) {
  return /^\d+$/.test(value.trim());
}

function showError(fieldId, message) {
  var field = document.getElementById(fieldId).closest(".field");
  var error = document.getElementById(fieldId + "-error");
  field.classList.add("is-invalid");
  error.textContent = message;
}

function clearError(fieldId) {
  var field = document.getElementById(fieldId).closest(".field");
  var error = document.getElementById(fieldId + "-error");
  field.classList.remove("is-invalid");
  error.textContent = "";
}

function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;

  var isValid = true;

  // Clear old messages first so a second attempt starts clean.
  ["name", "email", "phone", "message"].forEach(clearError);

  if (isEmpty(name)) {
    showError("name", "Please enter your name.");
    isValid = false;
  }

  if (isEmpty(email)) {
    showError("email", "Please enter your email address.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address, for example name@example.com.");
    isValid = false;
  }

  if (isEmpty(phone)) {
    showError("phone", "Please enter your phone number.");
    isValid = false;
  } else if (!isDigitsOnly(phone)) {
    showError("phone", "The phone number should contain digits only, with no spaces or symbols.");
    isValid = false;
  }

  if (isEmpty(message)) {
    showError("message", "Please enter a message.");
    isValid = false;
  }

  return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");

  // Validate as the user leaves each field, so errors appear inline quickly.
  ["name", "email", "phone", "message"].forEach(function (id) {
    var input = document.getElementById(id);
    input.addEventListener("input", function () {
      clearError(id);
      if (success) {
        success.hidden = true;
      }
    });
  });

  form.addEventListener("submit", function (event) {
    // Stop the browser from sending the form in the usual way.
    event.preventDefault();
    success.hidden = true;

    if (validateForm()) {
      success.hidden = false;
      form.reset();
      success.focus();
    }
  });
});
