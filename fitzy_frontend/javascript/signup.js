const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

// ================== ELEMENTS ==================
const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("pass");
const confirmInput = document.getElementById("confirm");

const nameError = document.getElementById("name_error");
const ageError = document.getElementById("age_error");
const heightError = document.getElementById("height_error");
const weightError = document.getElementById("weight_error");
const mailError = document.getElementById("mail_error");
const passError = document.getElementById("pass_error");
const confirmError = document.getElementById("confirm_error");

// ================== HELPERS ==================
function clearErrors() {
  document.querySelectorAll(".error").forEach(el => el.innerText = "");
}

function getSelectedGender() {
  return document.querySelector('input[name="gender"]:checked');
}

// ================== VALIDATION ==================
function validateForm() {
  let isValid = true;

  const name = nameInput.value.trim();
  const age = ageInput.value;
  const height = heightInput.value;
  const weight = weightInput.value;
  const email = emailInput.value.trim();
  const password = passInput.value;
  const confirm = confirmInput.value;
  const genderEl = getSelectedGender();

  if (!name) {
    nameError.innerText = "Name is required";
    isValid = false;
  }

  if (!age || age <= 0) {
    ageError.innerText = "Enter valid age";
    isValid = false;
  }

  if (!height || height <= 0) {
    heightError.innerText = "Enter valid height";
    isValid = false;
  }

  if (!weight || weight <= 0 || weight > 300) {
    weightError.innerText = "Enter valid weight";
    isValid = false;
  }

  if (!email) {
    mailError.innerText = "Email is required";
    isValid = false;
  }

  if (password.length < 8) {
    passError.innerText = "Password must be at least 8 characters";
    isValid = false;
  }

  if (password !== confirm) {
    confirmError.innerText = "Passwords do not match";
    isValid = false;
  }

  if (!genderEl) {
    alert("Please select gender");
    isValid = false;
  }

  return isValid;
}

// ================== SIGNUP API ==================
function createUser(userData) {
  return fetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  }).then(async res => {
    if (!res.ok) {
      const err = await res.json();
      throw err;
    }
    return res.json();
  });
}

// ================== SUBMIT ==================
form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  if (!validateForm()) return;

  const genderEl = getSelectedGender();

  const userData = {
    name: nameInput.value.trim(),
    age: Number(ageInput.value),
    height: Number(heightInput.value),
    weight: Number(weightInput.value),
    email: emailInput.value.trim(),
    password: passInput.value,
    gender: genderEl.id
  };

  createUser(userData)
    .then(data => {
      localStorage.setItem("category_id", data.category_id);
      redirectByCategory(data.category_id);
    })
    .catch(err => {
      console.error(err);

      // backend duplicate email handling
      if (err.detail && err.detail.includes("email")) {
        mailError.innerText = "Email already exists";
      } else {
        alert("Signup failed. Please try again.");
      }
    });
});

// ================== REDIRECT ==================
function redirectByCategory(categoryId) {
  if (categoryId === 1) {
    window.location.href = "../html/home.html";
  } else if (categoryId === 2) {
    window.location.href = "../html/normal/normal_home.html";
  } else if (categoryId === 3) {
    window.location.href = "../html/overweight/overweight.html";
  } else {
    alert("Category not found");
  }
}




// const API_BASE_URL = 'https://fullstack-backend-eq2r.onrender.com'

// const form = document.getElementById("signupForm");
// const nameInput = document.getElementById("name");
// const ageInput = document.getElementById("age");
// const heightInput = document.getElementById("height");
// const weightInput = document.getElementById("weight");
// const emailInput = document.getElementById("email");
// const passInput = document.getElementById("pass");
// const confirmInput = document.getElementById("confirm");

// const nameError = document.getElementById("name_error");
// const ageError = document.getElementById("age_error");
// const heightError = document.getElementById("height_error");
// const weightError = document.getElementById("weight_error");
// const mailError = document.getElementById("mail_error");
// const passError = document.getElementById("pass_error");
// const confirmError = document.getElementById("confirm_error");


// function clearErrors() {
//     document.querySelectorAll(".error").forEach(el => el.innerText = "");
// }

// function getSelectedGender() {
//     return document.querySelector('input[name="gender"]:checked'); 
// }

// function validateForm() {
//     let isValid = true;

//     const name = nameInput.value.trim();
//     const age =ageInput.value;
//     const height = heightInput.value;
//     const weight = weightInput.value;
//     const password = passInput.value;
//     const confirm = confirmInput.value;
//     const genderEl = getSelectedGender();

//     if (name === "") {
//         nameError.innerText = "Name is required";
//         isValid = false;
//     }

//     if (!age || age <= 0) {
//         ageError.innerText = "Enter valid age";
//         isValid = false;
//     }

//     if (!height || height <= 0) {
//         heightError.innerText = "Enter valid height";
//         isValid = false;
//     }

//     if (!weight || weight <= 0 || weight > 100) {
//         weightError.innerText = "Weight must be between less than 100 kg";
//         isValid = false;
//     }

//     if (password.length < 8) {
//         passError.innerText = "Password must be at least 8 characters";
//         isValid = false;
//     }

//     if (password !== confirm) {
//         confirmError.innerText = "Passwords do not match";
//         isValid = false;
//     }

//     if (!genderEl) {
//         alert("Please select gender");
//         isValid = false;
//     }

//     return isValid;
// }

// function checkEmailExists(email) {
//     return fetch(`${API_BASE_URL}/{email}`)
//         .then(res => res.json());
// }

// function createUser(userData) {
//     return fetch(`${API_BASE_URL}/users/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData)
//     }).then(res => res.json());
// }


// form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     clearErrors();

//     if (!validateForm()) return; 

//     const genderEl = getSelectedGender();

//     const userData = {
//         name: nameInput.value.trim(),
//         age:ageInput.value,
//         height: heightInput.value,
//         weight:weightInput.value,
//         email: emailInput.value.trim(),
//         password: passInput.value,
//         gender: genderEl.id
//     };

//     checkEmailExists(userData.email)
//         .then(result => {
//             if (result.exists) {
//                 mailError.innerText =
//                     "Email already exists.";
//                 return;
//             }
//             return createUser(userData);
//         })
//         .then(data => {
//             if (!data) return;

//             localStorage.setItem("category_id", data.category_id);

//             redirectByCategory(data.category_id);
//         })
//         .catch(err => {
//             alert("Email aldready exists");
//             console.error(err);
//         });
// });



// function redirectByCategory(categoryId) {
//     if (categoryId === 1) {
//         window.location.href = "../html/home.html";
//     } else if (categoryId === 2) {
//         window.location.href = "../html/normal/normal_home.html";
//     } else if (categoryId === 3) {
//         window.location.href = "../html/overweight/overweight.html";
//     } else {    
//         alert("Category not found");
//     }
// }

// localStorage.setItem("category_id", data.category_id);


