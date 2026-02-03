const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

const form = document.getElementById("exerciseForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🚫 stop page refresh

  const formData = new FormData();

  formData.append("level", document.getElementById("level").value);
  formData.append("category_id", document.getElementById("category").value);
  formData.append("title", document.getElementById("title").value);
  formData.append("instruction", document.getElementById("instruction").value);
  formData.append("breathing_tip", document.getElementById("breathing").value);
  formData.append("focus_area", document.getElementById("focus").value);

  formData.append("exercise_image", document.getElementById("image").files[0]);
  formData.append("exercise_video", document.getElementById("video").files[0]);

  try {
    const res = await fetch(`${API_BASE_URL}/exercise/create`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Failed to create exercise");
    }

    alert("✅ Exercise added successfully!");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("❌ Error uploading exercise");
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
