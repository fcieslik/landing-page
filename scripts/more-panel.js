import {currencyInit} from "./currency";

const morePanel = document.querySelector('.more-panel');
const more = document.querySelector('.more');
const moreBtn = more.querySelector('.more__btn-wrapper');
const moreBtnTxt = more.querySelector('.more__btn-text');

function handleLessBtnClick() {
  console.log('less');
  morePanel.classList.remove('open');
  more.classList.remove('more-open');
  moreBtnTxt.textContent = 'MORE';

    moreBtn.addEventListener('click', handleMoreBtnClick, { once: true });
}

function handleMoreBtnClick() {
  console.log('more');
  morePanel.classList.add('open');
  more.classList.add('more-open');
  moreBtnTxt.textContent = 'LESS';

  moreBtn.addEventListener('click', handleLessBtnClick, { once: true });
}

currencyInit();
moreBtn.addEventListener('click', handleMoreBtnClick, { once: true });

