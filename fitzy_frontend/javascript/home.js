document.addEventListener("DOMContentLoaded", () => {
  const categoryId = Number(localStorage.getItem("category_id"));
  const categorySpan = document.getElementById("categoryName");

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
