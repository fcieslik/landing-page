const documentBody = document.querySelector('body');

export function setWallpaperFor(dayTime) {
    documentBody.style.background = `url(${dayTime}) no-repeat center center fixed`
}
