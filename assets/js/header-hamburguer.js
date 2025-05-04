const hamburguer = document.querySelector('.header__hamburguer');
const menu = document.querySelector('.header__conteudo-direito-menu');

hamburguer.addEventListener('click', () => {
    menu.classList.toggle('active'); 
});