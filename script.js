document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".datepicker-input input");
  const calendar = document.querySelector(".calendar");
  const iconButton = document.querySelector(".datepicker-icon");
  const monthYear = document.querySelector(".month-year");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const daysContainer = document.querySelector(".days");

  const today = new Date();
  let currentDate = new Date(today); // Tracks the currently viewed month

  // Configuration
  const minDate = new Date(2020, 0, 1); // Jan 1, 2020
  const maxDate = new Date(2030, 11, 31); // Dec 31, 2030

  // Format date as dd / mm / yyyy
  function formatDate(date) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d} / ${m} / ${y}`;
  }

  // Toggle calendar
  iconButton.addEventListener("click", () => {
    calendar.style.display = calendar.style.display === "block" ? "none" : "block";
  });

  // Close calendar if clicking outside
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".datepicker").contains(e.target)) {
      calendar.style.display = "none";
    }
  });

  // Render calendar grid
  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Header update
    monthYear.textContent = `${date.toLocaleString("default", {
      month: "long"
    })} ${year}`;

    // Clear existing days
    daysContainer.innerHTML = "";

    // Padding for the start of the month
    for (let i = 0; i < firstDay; i++) {
      daysContainer.innerHTML += `<span></span>`;
    }

    // Fill days
    for (let i = 1; i <= lastDate; i++) {
      const loopDate = new Date(year, month, i);

      // Check if it's within allowed range
      if (loopDate < minDate || loopDate > maxDate) {
        const span = document.createElement("span");
        span.textContent = i;
        span.style.color = "#ccc";
        span.style.cursor = "default";
        daysContainer.appendChild(span);
        continue;
      }

      const span = document.createElement("span");
      span.textContent = i;

      // Highlight today
      if (
        loopDate.getFullYear() === today.getFullYear() &&
        loopDate.getMonth() === today.getMonth() &&
        loopDate.getDate() === today.getDate()
      ) {
        span.style.backgroundColor = "#007BFF";
        span.style.color = "white";
        span.style.borderRadius = "50%";
      }

      // Selectable day
      span.tabIndex = 0;
      span.addEventListener("click", () => {
        input.value = formatDate(loopDate);
        calendar.style.display = "none";
      });

      span.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          input.value = formatDate(loopDate);
          calendar.style.display = "none";
        }
      });

      daysContainer.appendChild(span);
    }
  }

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Initial render
  renderCalendar(currentDate);
});
