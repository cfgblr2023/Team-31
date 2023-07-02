let menubtn=document.querySelector('#menu-btn');
let navbar=document.querySelector('.header .flex .navbar');
menubtn.addEventListener('click',function(){
    menubtn.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    
});

var swiper = new Swiper(".course-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop:true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    breakpoints: {
        540: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
});