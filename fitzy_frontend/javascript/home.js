document.addEventListener("DOMContentLoaded", () => {

  const categoryId = Number(localStorage.getItem("category_id"));
  const categorySpan = document.getElementById("categoryName");

  if (!categoryId) {
    alert("Please login again.");
    window.location.href = "../sign_in.html";
    return;
  }

  if (!categorySpan) return;

  if (categoryId === 1) {
    categorySpan.innerText = "Underweight";
  } else if (categoryId === 2) {
    categorySpan.innerText = "Normal weight";
  } else if (categoryId === 3) {
    categorySpan.innerText = "Overweight";
  } else {
    categorySpan.innerText = "Unknown";
  }

});




// document.addEventListener("DOMContentLoaded", () => {

//   const token = localStorage.getItem("token");
//   const categoryId = Number(localStorage.getItem("category_id"));
//   const categorySpan = document.getElementById("categoryName");

//   if (!token || !categoryId) {
//     alert("Session expired. Please login again.");
//     window.location.href = "../sign_in.html";
//     return;
//   }

//   if (!categorySpan) return;

//   if (categoryId === 1) {
//     categorySpan.innerText = "Underweight";
//   } else if (categoryId === 2) {
//     categorySpan.innerText = "Normal weight";
//   } else if (categoryId === 3) {
//     categorySpan.innerText = "Overweight";
//   } else {
//     categorySpan.innerText = "Unknown";
//   }

// });







