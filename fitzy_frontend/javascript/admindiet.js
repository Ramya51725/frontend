const API_BASE_URL = "http://127.0.0.1:8000";

const form = document.getElementById("dietForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🚫 stop page refresh

  const dietType = document.getElementById("dietType").value;

  const dietData = {
    day: Number(document.getElementById("day").value),
    breakfast: document.getElementById("breakfast").value.trim(),
    lunch: document.getElementById("lunch").value.trim(),
    dinner: document.getElementById("dinner").value.trim(),
    category_id: Number(document.getElementById("category").value)
  };

  let url = "";

  if (dietType === "veg") {
    // ✅ CORRECT veg endpoint
    url = `${API_BASE_URL}/veg/diet`;
  } 
  else if (dietType === "nonveg") {
    // ✅ CORRECT non-veg endpoint
    url = `${API_BASE_URL}/nonveg/nonveg`;
  } 
  else {
    alert("Please select Diet Type");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dietData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend error:", errorText);
      alert("❌ Failed to add diet. Check console.");
      return;
    }

    const result = await response.json();
    console.log("✅ Success:", result);

    alert("✅ Diet added successfully!");
    form.reset();

  } catch (error) {
    console.error("❌ Network/JS error:", error);
    alert("❌ Error adding diet. Check console.");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    // clear login data if any
    localStorage.clear();
    sessionStorage.clear();

    // redirect to index / login page
    window.location.href = "../../index.html";
  });
});
