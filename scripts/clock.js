import sunUrl from '../assets/icons/sun.svg';
import moonUrl from '../assets/icons/moon.svg';
import { setWallpaperFor } from './wallpaper';
import cityNight from '../assets/img/city_night.jpg';
import cityMorning from '../assets/img/city_morning.jpg';
import cityAfternoon from '../assets/img/city__afternoon.jpg';

const greetings = new Map()
  .set('morning', "Good morning, it's currently")
  .set('afternoon', "Good afternoon, it's currently")
  .set('evening', "Good evening, it's currently");

const clock12 = document.querySelector('.clock__time');
const clockAbbreviation = document.querySelector('.clock__abbreviation');
const clockText = document.querySelector('.clock__text');
const dayTimeIcon = document.querySelector('.clock__greeting-icon');

function concatZero(timeFrame) {
  return timeFrame < 10 ? '0'.concat(timeFrame) : timeFrame;
}

function realTime() {
  let date = new Date();
  let mon = date.getMinutes();
  let hr = date.getHours();

  clock12.textContent = `${concatZero(hr % 12 || 12)}:${concatZero(mon)}`;
  const abbreviation = `${hr >= 12 ? 'pm' : 'am'}`;
  const greetingText = checkGreetings(hr, abbreviation);
  clockAbbreviation.textContent = abbreviation;
  clockText.textContent = greetingText;
  dayTimeIcon.src = `${getIcon(greetingText)}`;
}

function getIcon(text) {
  if (text === greetings.get('morning') || text === greetings.get('afternoon')) {
    return sunUrl;
  }

  return moonUrl;
}

function checkGreetings(hour, abbreviation) {
  if (abbreviation === 'am') {
    if (hour > 4) {
      setWallpaperFor(cityMorning);
      return greetings.get('morning');
    }

    setWallpaperFor(cityNight);
    return greetings.get('evening');
  }

  if (abbreviation === 'pm') {
    if (hour > 15) {
      setWallpaperFor(cityNight);
      return greetings.get('evening');
    }
    setWallpaperFor(cityAfternoon);
    return greetings.get('afternoon');
  }
}

export function initClock() {
  realTime();

  setInterval(realTime, 10000);
}
