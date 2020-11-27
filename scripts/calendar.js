const today = moment();

const weekDayEl = document.querySelector('.calendar__week-day');
const weekNumberEl = document.querySelector('.calendar__week-number');
const yearDayEl = document.querySelector('.calendar__year-day');
const endDaysEl = document.querySelector('.calendar__year-end');

function setDays() {
  if (today) {
    const weekDay = today.isoWeekday();
    const yearDay = today.dayOfYear();
    const weekNumber = today.format('w');
    const endOfYear = moment().endOf('year');

    weekDayEl.textContent = `${weekDay}`;
    yearDayEl.textContent = `${yearDay}`;
    weekNumberEl.textContent = `${weekNumber}`;
    endDaysEl.textContent = `${endOfYear.diff(today, 'days')}`;
  }
}

export function initCalendar() {
  setDays();
}
