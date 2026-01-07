const API_BASE_URL = "https://fullstack-backend-eq2r.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signinForm");
  const messageEl = document.getElementById("message");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    messageEl.innerText = "";

    const email = document.getElementById("mail").value.trim();
    const password = document.getElementById("pass").value;

    if (!email || !password) {
      messageEl.innerText = "Email and password are required";
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        let errorMsg = "Invalid email or password";
        try {
          const errData = await res.json();
          if (errData.detail) errorMsg = errData.detail;
        } catch {}
        throw new Error(errorMsg);
      }

      const data = await res.json();

      // safety check
      if (!data || !data.user_id || !data.category_id) {
        throw new Error("Invalid login response from server");
      }

      // 🔥 IMPORTANT FIX
      localStorage.clear(); // prevents wrong user issue

      // store data (same logic)
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("category_id", data.category_id);
      localStorage.setItem("name", data.name || "");
      localStorage.setItem("level", "level1");

      redirectByCategory(Number(data.category_id));

    } catch (err) {
      console.error("Login error:", err);
      messageEl.innerText = err.message || "Login failed. Try again.";
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

// document.getElementById("signinForm").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const email = document.getElementById("mail").value.trim();
//     const password = document.getElementById("pass").value;

//     fetch(`${API_BASE_URL}/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//     })                   
//     .then(res => {
//         if (!res.ok) throw new Error("Invalid email or password");
//         return res.json();
//     })
//     .then(data => {
//         localStorage.setItem("user_id", data.user_id);
//         localStorage.setItem("category_id", data.category_id);
//         localStorage.setItem("name", data.name);
//         localStorage.setItem("level", "level1");

//         redirectByCategory(Number(data.category_id));
//     })
//     .catch(err => {
//         document.getElementById("message").innerText = err.message;
//     });
// });

// function redirectByCategory(categoryId) {
//     if (categoryId === 1) {
//         window.location.href = "../html/home.html";
//     } 
//     else if (categoryId === 2) {
//         window.location.href = "../html/normal/normal_home.html";
//     } 
//     else if (categoryId === 3) {
//         window.location.href = "../html/overweight/overweight.html";
//     } 
//     else {
//         alert("Category not found");
//     }
// }
