const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

const categoryId = 1; // Non-Veg category

// ✅ GET USER ID
const rawUserId = localStorage.getItem("user_id");
const userId = rawUserId ? Number(rawUserId) : null;

if (!userId) {
  console.error("User not logged in");
}

const API_URL = `${API_BASE_URL}/nonveg/diet/by-category-day`;
const PROGRESS_API = `${API_BASE_URL}/progress`;

const dayContainer = document.getElementById("dayButtons");
const completedBtn = document.querySelector(".Completed-btn");

let activeBtn = null;
let selectedDay = 1;
const dayButtons = [];

// ---------- CREATE DAY BUTTONS (ALL DISABLED) ----------
for (let day = 1; day <= 30; day++) {
  const btn = document.createElement("div");
  btn.className = "diet_box1 disabled";
  btn.innerText = `Day ${day}`;

  btn.onclick = () => {
    if (btn.classList.contains("disabled")) return;

    if (activeBtn) activeBtn.classList.remove("active");
    btn.classList.add("active");
    activeBtn = btn;
    selectedDay = day;
    loadDiet(day);
  };

  dayButtons.push(btn);
  dayContainer.appendChild(btn);
}

// ✅ ENABLE DAY 1
dayButtons[0].classList.remove("disabled");
dayButtons[0].classList.add("active");
activeBtn = dayButtons[0];
selectedDay = 1;

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
    .catch(() => setText("Error loading diet"));
}

function setText(msg) {
  document.getElementById("breakfast").innerText = msg;
  document.getElementById("lunch").innerText = msg;
  document.getElementById("dinner").innerText = msg;
}

// ---------- MARK COMPLETED ----------
completedBtn.addEventListener("click", async () => {
  if (!userId) {
    alert("Please login again");
    return;
  }

  try {
    const res = await fetch(`${PROGRESS_API}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        day: selectedDay
      })
    });

    if (!res.ok) throw new Error("Failed");

    markGreen(selectedDay);
  } catch (err) {
    console.error(err);
    alert("Failed to save progress");
  }
});

// ---------- LOAD USER PROGRESS ----------
async function loadProgress() {
  if (!userId) return;

  try {
    const res = await fetch(`${PROGRESS_API}/${userId}`);
    if (!res.ok) return;

    const data = await res.json();

    let maxCompletedDay = 0;

    data.forEach(p => {
      if (p.status === "completed") {
        markGreen(p.day);
        maxCompletedDay = Math.max(maxCompletedDay, p.day);
      }
    });

    // 🔓 ENABLE NEXT DAY
    const nextBtn = dayButtons[maxCompletedDay];
    if (nextBtn) nextBtn.classList.remove("disabled");

  } catch (err) {
    console.error(err);
  }
}

// ---------- MARK GREEN & UNLOCK NEXT ----------
function markGreen(day) {
  const btn = dayButtons[day - 1];
  if (!btn) return;

  btn.classList.add("completed");
  btn.classList.remove("disabled");

  // 🔓 Unlock next day
  const nextBtn = dayButtons[day];
  if (nextBtn) nextBtn.classList.remove("disabled");
}

// ---------- INITIAL LOAD ----------
loadDiet(1);
loadProgress();


//check pannanum?