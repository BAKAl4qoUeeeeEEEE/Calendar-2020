const holidays2020 = {
  "1-1": "New Year's Day",
  "2-10": "Chinese New Year",
  "2-25": "EDSA People Power Revolution Anniversary",
  "4-9": "Araw ng Kagitingan (Day of Valor)",
  "4-17": "Maundy Thursday",
  "4-18": "Good Friday",
  "4-20": "Black Saturday",
  "5-1": "Labor Day",
  "6-12": "Independence Day",
  "8-26": "National Heroes Day",
  "11-1": "All Saints' Day",
  "11-2": "All Souls' Day",
  "11-30": "Bonifacio Day",
  "12-8": "Feast of the Immaculate Conception",
  "12-24": "Christmas Eve",
  "12-25": "Christmas Day",
  "12-30": "Rizal Day"
};

let currentMonth = 0; 
let currentYear = 2020;

const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

const calendarBody = document.getElementById("calendar-body");
const monthYear = document.getElementById("monthYear");

// Get ISO week number
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

function generateCalendar(month, year) {
  calendarBody.innerHTML = "";
  monthYear.textContent = `${monthNames[month]} ${year}`;

  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    // Week number
    let weekDate = new Date(year, month, date || 1);
    let weekNumber = getWeekNumber(weekDate);
    let weekCell = document.createElement("td");
    weekCell.classList.add("week");
    weekCell.textContent = weekNumber;
    row.appendChild(weekCell);

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        cell.textContent = "";
      } else {
        cell.textContent = date;
        let key = `${month+1}-${date}`;
        if (holidays2020[key]) {
          cell.classList.add("holiday");
          cell.onclick = () => showHoliday(holidays2020[key]);
        }
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

function showHoliday(name) {
  document.getElementById("holidayTitle").textContent = name;
  document.getElementById("holidayDesc").textContent = "This is an official holiday in the Philippines.";
  document.getElementById("holidayModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("holidayModal").style.display = "none";
}

document.getElementById("prev").onclick = () => {
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  if (currentMonth === 11) currentYear--;
  generateCalendar(currentMonth, currentYear);
};

document.getElementById("next").onclick = () => {
  currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
  if (currentMonth === 0) currentYear++;
  generateCalendar(currentMonth, currentYear);
};

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target == document.getElementById("holidayModal")) {
    closeModal();
  }
};

generateCalendar(currentMonth, currentYear);
