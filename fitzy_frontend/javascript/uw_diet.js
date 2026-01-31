const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

const categoryId = 2;
const rawUserId = localStorage.getItem("user_id");
const userId = rawUserId ? Number(rawUserId) : null;

const API_URL = `${API_BASE_URL}/veg/diet/by-category-day`;
const PROGRESS_API = `${API_BASE_URL}/progress`;

const dayContainer = document.getElementById("dayButtons");
const completedBtn = document.querySelector(".Completed-btn");

let activeBtn = null;
let selectedDay = 1;
const dayButtons = [];

// ---------- CREATE DAY BUTTONS ----------
for (let day = 1; day <= 30; day++) {
  const btn = document.createElement("div");
  btn.className = "diet_box1";
  btn.innerText = `Day ${day}`;

  btn.onclick = () => {
    if (activeBtn) activeBtn.classList.remove("active");
    btn.classList.add("active");
    activeBtn = btn;
    selectedDay = day;
    loadDiet(day);
  };

  if (day === 1) {
    btn.classList.add("active");
    activeBtn = btn;
  }

  dayButtons.push(btn);
  dayContainer.appendChild(btn);
}

// ---------- LOAD DIET ----------
function loadDiet(day) {
  fetch(`${API_URL}?category_id=${categoryId}&day=${day}`)
    .then(res => res.json())
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
    .catch(() => alert("Error loading diet"));
}

function setText(msg) {
  document.getElementById("breakfast").innerText = msg;
  document.getElementById("lunch").innerText = msg;
  document.getElementById("dinner").innerText = msg;
}

// ---------- MARK COMPLETED ----------
completedBtn.addEventListener("click", async () => {
  if (!userId) {
    alert("Please login first");
    return;
  }

  const res = await fetch(`${PROGRESS_API}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      day: selectedDay
    })
  });

  if (!res.ok) {
    alert("Failed to mark completed");
    return;
  }

  markGreen(selectedDay);
});

// ---------- LOAD USER PROGRESS ----------
async function loadProgress() {
  if (!userId) return;

  const res = await fetch(`${PROGRESS_API}/${userId}`);
  if (!res.ok) return;

  const data = await res.json();
  data.forEach(p => {
    if (p.status === "completed") {
      markGreen(p.day);
    }
  });
}

// ---------- GREEN UI ----------
function markGreen(day) {
  const btn = dayButtons[day - 1];
  if (btn) btn.classList.add("completed");
}

// ---------- INITIAL LOAD ----------
loadDiet(1);
loadProgress();


// const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

// document.addEventListener("DOMContentLoaded", () => {

//   const categoryId = 1;
//   const API_URL = `${API_BASE_URL}/veg/diet/by-category-day`;

//   const dayContainer = document.getElementById("dayButtons");
//   let activeBtn = null;

//   if (!dayContainer) return;

//   for (let day = 1; day <= 30; day++) {
//     const btn = document.createElement("div");
//     btn.className = "diet_box1";
//     btn.innerText = `Day ${day}`;

//     btn.addEventListener("click", () => {
//       if (activeBtn) {
//         activeBtn.classList.remove("active");
//       }

//       btn.classList.add("active");
//       activeBtn = btn;

//       loadDiet(day);
//     });

//     if (day === 1) {
//       btn.classList.add("active");
//       activeBtn = btn;
//     }

//     dayContainer.appendChild(btn);
//   }

//   function loadDiet(day) {
//     fetch(`${API_URL}?category_id=${categoryId}&day=${day}`)
//       .then(res => {
//         if (!res.ok) throw new Error("API error");
//         return res.json();
//       })
//       .then(data => {
//         if (!data || data.length === 0) {
//           setText("No diet available");
//           return;
//         }

//         const diet = data[0];
//         document.getElementById("breakfast").innerText = diet.breakfast;
//         document.getElementById("lunch").innerText = diet.lunch;
//         document.getElementById("dinner").innerText = diet.dinner;
//       })
//       .catch(err => {
//         console.error(err);
//         setText("Error loading diet");
//       });
//   }

//   function setText(msg) {
//     document.getElementById("breakfast").innerText = msg;
//     document.getElementById("lunch").innerText = msg;
//     document.getElementById("dinner").innerText = msg;
//   }

//   loadDiet(1);

// });

