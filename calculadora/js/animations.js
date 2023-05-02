let theme1 = document.getElementById('theme_1');
let theme2 = document.getElementById('theme_2');
let theme3 = document.getElementById('theme_3');
let changeTheme = document.querySelector('body');
let circlePosition = document.getElementById('circle-theme');

theme1.addEventListener('click', () => {
    changeTheme.setAttribute('id', 'theme1');
    circlePosition.style.justifyContent = "flex-start";
});

theme2.addEventListener('click', () => {
    changeTheme.setAttribute('id', 'theme2');
    circlePosition.style.justifyContent = "center";
});

theme3.addEventListener('click', () => {
    changeTheme.setAttribute('id', 'theme3');
    circlePosition.style.justifyContent = "flex-end";
});