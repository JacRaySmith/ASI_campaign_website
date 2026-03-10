const form = document.getElementById("feedback-form");
const confirmation = document.getElementById("confirmation");

const BACKEND_URL = ''; // Set to empty string for relative path

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const department = document.getElementById("dept").value.trim();
  const message = document.getElementById("message").value.trim();

  if (department === "" || message === "") {
    confirmation.textContent = "Please fill out both fields.";
    confirmation.style.color = "#e05c5c";
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department, message }),
    });

    const data = await response.json();

    if (response.ok) {
      confirmation.textContent = "Thank you! Your feedback was received.";
      confirmation.style.color = "#6fcf8a";
      form.reset();
    } else {
      confirmation.textContent = "Something went wrong. Please try again.";
      confirmation.style.color = "#e05c5c";
    }
  } catch (err) {
    confirmation.textContent =
      "Could not reach the server. Please try again later.";
    confirmation.style.color = "#e05c5c";
  }
});
