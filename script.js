document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".datepicker-input input");
  const calendar = document.querySelector(".calendar");
  const iconButton = document.querySelector(".datepicker-icon");
  const monthYear = document.querySelector(".month-year");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const daysContainer = document.querySelector(".days");

  const today = new Date();
  let currentDate = new Date(today);

  // Configuration
  const minDate = new Date(2020, 0, 1);
  const maxDate = new Date(2030, 11, 31);

  function formatDate(date) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d} / ${m} / ${y}`;
  }

  iconButton.addEventListener("click", () => {
    calendar.style.display = calendar.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".datepicker").contains(e.target)) {
      calendar.style.display = "none";
    }
  });

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${date.toLocaleString("default", {
      month: "long"
    })} ${year}`;

    daysContainer.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      daysContainer.innerHTML += `<span></span>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      const loopDate = new Date(year, month, i);
      const span = document.createElement("span");
      span.textContent = i;

      if (loopDate < minDate || loopDate > maxDate) {
        span.classList.add("disabled");
        daysContainer.appendChild(span);
        continue;
      }

      // Highlight today
      if (
        loopDate.getFullYear() === today.getFullYear() &&
        loopDate.getMonth() === today.getMonth() &&
        loopDate.getDate() === today.getDate()
      ) {
        span.classList.add("today");
      }

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
