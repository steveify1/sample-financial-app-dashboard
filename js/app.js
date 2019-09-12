var user = {
    username: "test",
    password: "12345",
    balance: 12755.39
}


// Set the Username field on focus whenever the login page is loaded.
var username = document.querySelector("#username");
if (username) {
    username.focus();
    username.previousElementSibling.classList.add("slide-up");
}

// Add some google-style input focus event listener
var loginForm = document.querySelector("#login form");
if (loginForm) {
    document.querySelectorAll(".form-control").forEach(i => {
        i.addEventListener("focus", () => {
            i.previousElementSibling.classList.add("slide-up");
        });
        i.addEventListener("blur", () => {
            if (i.value === "") i.previousElementSibling.classList.remove("slide-up");
        });

    });
}


// Our form Validator ES5 Class
function formValidator() {}

// Checks if the parent of a particular element contains the feedback
formValidator.prototype.isFeedbackInParent = function (element) {
    var nextElement = element.nextElementSibling;
    return nextElement;
}

// Removes Form feedback
formValidator.prototype.removeFormFeedback = function (field) {
    // remove the current message
    var nextElement = this.isFeedbackInParent(field);
    if (nextElement) {
        if (nextElement.classList.contains("form-feedback")) {
            field.parentElement.removeChild(nextElement);
        }
    }
}

// Returns a feedback to the user. Returns a paragraph element wrapping the feedback message.
formValidator.prototype.formFeedback = function (field, message) {
    var p = document.createElement("p");
    p.className = "error form-feedback";
    this.feedBackWrapper = p;

    this.feedBackWrapper.innerText = message;
    // Checking and removing nay former feedback just incase.
    this.removeFormFeedback(field);
    // Append the error message to DOM, right below the associated field
    field.insertAdjacentElement("afterend", this.feedBackWrapper);
    var that = this;
    setTimeout(() => {
        that.removeFormFeedback(field)
    }, 4000);
    return this.feedBackWrapper;
}

// checks if an input field is empty
formValidator.prototype.areEmpty = function (fields) {
    var empties = [];

    for (var field = 0; field < fields.length; field++) {
        if (fields[field].value === "") {
            empties.push(fields[field]);
            var msg = fields[field].name + " can not be empty";
            this.feedBackWrapper = this.formFeedback(fields[field], msg);
        }
    }
    console.log(empties.length === 0);
    return empties.length !== 0;
}

// Login Form Validation
formValidator.prototype.loginValidation = function (e) {
    e.preventDefault();
    var username = document.querySelector("#username");
    var password = document.querySelector("#password");
    var formTitle = document.querySelector(".form-container .form-title");
    var btn = document.querySelector(".form input[type=submit]");
    var usernameVal = username.value;


    var empty = this.areEmpty([username, password]);
    // Checking first that none of the fields are empty
    if (!empty) {
        console.log("Password is not empty");
        if (usernameVal !== user.username) {
            console.log("Username is not valid");
            var msg = "We couldn't find a match for '" + usernameVal + "'";
            this.feedBackWrapper = this.formFeedback(username, msg);
        } else {
            console.log("username is valid");
            if (this.isFeedbackInParent(username)) {
                console.log("There is already feedback in the DOM")
                this.removeFormFeedback(username);
            }

            // Check the password
            if (password.value !== user.password) {
                console.log("Password is invalid");
                this.feedBackWrapper = this.formFeedback(formTitle, "Username and password don't match!");
            } else {
                console.log("Password is valid");
                this.removeFormFeedback(formTitle);
                // Disable the submit button
                btn.disbled = true;
                // Send the form to the backend
                e.target.submit();
            }
        }
    }
}

// Validates the Login Form
var loginForm = document.querySelector("#login form");
var v = new formValidator();
// Validating the form
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        v.loginValidation(e);
    });
}



// ******* SEARCH FORM FUNCTIONALITIES *********
var searchForm = document.querySelector(".search-form");
if (searchForm) {
    var searchIcon = document.querySelector("#Search");
    var searchBox = document.querySelector(".search-form .form-control");
    searchBox.addEventListener("input", function () {
        if (searchBox.value === "") {
            searchIcon.classList.remove("active");
            return;
        }
        searchIcon.classList.add("active");
    });
}

// Formatting the balance to our local currency
var bal = document.querySelector(".balance");
if (bal) {
    bal.textContent = user.balance.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",

    });


}


// Dashboard Menu Control
var ham = document.querySelector("#hamburger");
var dashboardMenu = document.querySelector(".dashboard-menu");
if (ham) {
    ham.addEventListener("click", function () {
        dashboardMenu.classList.toggle("active");
    });
}


function makeActive(elements) {
    elements.forEach(function(e) {
        e.classList.add("active");
    });
}

function removeActive(elements) {
    elements.forEach(function(e) {
        e.classList.remove("active");
    });
}

// The Modal Poppers
var poppers = document.querySelectorAll(".popper");
var appLightbox = document.querySelector(".app-lightbox");
var appModal = document.querySelector(".app-modal");
var closeModalBtn = document.querySelector(".close-modal");
if(poppers.length !== 0) {
    poppers.forEach(function(p) {
        p.addEventListener("click", function() {
            makeActive([appLightbox, appModal]);
        });
    });
    
    // Close Modal Event
    closeModalBtn.addEventListener("click", function(e) {
        e.preventDefault();
        removeActive([appLightbox, appModal]);
    });
    
    appLightbox.addEventListener("click", function(e) {
        e.stopImmediatePropagation();
        removeActive([appLightbox, appModal]);
    });
}
