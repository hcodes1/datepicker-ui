document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".datepicker-input input");
  const calendar = document.querySelector(".calendar");
  const iconButton = document.querySelector(".datepicker-icon");
  const monthYear = document.querySelector(".month-year");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const daysContainer = document.querySelector(".days");

  let currentDate = new Date();

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

  // Render calendar
  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${date.toLocaleString("default", {
      month: "long"
    })} ${year}`;

    daysContainer.innerHTML = "";

    // Padding for first row
    for (let i = 0; i < firstDay; i++) {
      daysContainer.innerHTML += `<span></span>`;
    }

    // Dates
    for (let i = 1; i <= lastDate; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      span.addEventListener("click", () => {
        const selectedDate = new Date(year, month, i);
        input.value = selectedDate.toLocaleDateString("en-GB"); // dd/mm/yyyy
        calendar.style.display = "none";
      });
      daysContainer.appendChild(span);
    }
  }

  // Event listeners for nav
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
