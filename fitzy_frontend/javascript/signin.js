const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signinForm");
  const messageEl = document.getElementById("message");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    messageEl.innerText = "";

    const formData = new FormData(form);

    const email = formData.get("email")?.trim().toLowerCase();
    const password = formData.get("password");

    if (!email || !password) {
      messageEl.innerText = "Email and password are required";
      return;
    }

    // ✅ ADMIN LOGIN (NO BACKEND CALL)
    if (email === "admin@gmail.com") {
      window.location.href = "../html/admin.html";
      return;
    }

    // ✅ NORMAL USER LOGIN (BACKEND)
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      if (!data.user_id || !data.category_id) {
        throw new Error("Invalid login response from server");
      }

      // Save session
      localStorage.clear();
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("category_id", data.category_id);
      localStorage.setItem("name", data.name || "");
      localStorage.setItem("level", "level1");

      // Redirect user
      window.location.href = "../html/landing/beginner.html";

    } catch (err) {
      console.error("Login error:", err);
      messageEl.innerText = err.message || "Login failed. Try again.";
    }
  });

});
