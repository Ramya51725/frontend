const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const categoryId = 3;
  const API_URL = `${API_BASE_URL}/nonveg/diet/by-category-day`;

  const dayContainer = document.getElementById("dayButtons");
  let activeBtn = null;

  if (!dayContainer) return;

  for (let day = 1; day <= 30; day++) {
    const btn = document.createElement("div");
    btn.className = "diet_box1";
    btn.innerText = `Day ${day}`;

    btn.addEventListener("click", () => {
      if (activeBtn) {
        activeBtn.classList.remove("active");
      }

      btn.classList.add("active");
      activeBtn = btn;

      loadDiet(day);
    });

    if (day === 1) {
      btn.classList.add("active");
      activeBtn = btn;
    }

    dayContainer.appendChild(btn);
  }

  function loadDiet(day) {
    fetch(`${API_URL}?category_id=${categoryId}&day=${day}`)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        if (!data || data.length === 0) {
          setText("No diet available");
          return;
        }

        const diet = data[0];
        document.getElementById("breakfast").innerText = diet.breakfast;
        document.getElementById("lunch").innerText = diet.lunch;
        document.getElementById("dinner").innerText = diet.dinner;
      })
      .catch(err => {
        console.error(err);
        setText("Error loading diet");
      });
  }

  function setText(msg) {
    document.getElementById("breakfast").innerText = msg;
    document.getElementById("lunch").innerText = msg;
    document.getElementById("dinner").innerText = msg;
  }

  loadDiet(1);

});