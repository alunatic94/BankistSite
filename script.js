'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const message=document.createElement('div');
const header=document.querySelector('.header');
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.getElementById('section--1');
const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');
const nav=document.querySelector('.nav');
const initialCoords=section1.getBoundingClientRect();
window.addEventListener('scroll',function(){
  if(window.scrollY > initialCoords.top)
  {
    nav.classList.add('sticky');
  }
  else{
    nav.classList.remove('sticky');
  }
});
const handleHover=function(e){
  if(e.target.classList.contains('nav__link'))
  {
    const link=e.target;
    const siblings=link.closest('.nav').
    querySelectorAll('.nav__link');
    const logo=link.closest('img');
    siblings.forEach(el =>{
      if(el!==link)
      {
        el.style.opacity=this;
      }
    });
  }
};
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));
message.classList.add('cookie-message');
message.innerHTML=
'We use cookies to improve performance <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
document.querySelector('.btn--close-cookie').
addEventListener('click',function(){
  message.remove();
});
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth scroll into section 1
btnScrollTo.addEventListener('click',function(e){
  section1.scrollIntoView({behavior:"smooth"});
})

//Page Navigation   
document.querySelector('.nav__links').addEventListener
('click',function(e){
  //Matching strategy
  if(e.target.classList.contains('nav__link'))
  {
    e.preventDefault();
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior:"smooth"});

  }
});

//Tabbed Component
tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  //Guard Clause
  if(!clicked)return;
  //Active Tab
  
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //Activate content area
  
  //Remove active content
  tabsContent.forEach(t => t.classList.
  remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).
  classList.add("operations__content--active"); 
})
// const obsCallback=function(entries,observer){
//   entries.forEach(entry =>{
//     console.log(entry);
//   }); 
// }
// const obsOptions={
//   root:null,
//   threshold:[0,0.2],
// };
// const observer=new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

  //Adding sticky attribute to the navbar when scrolling

const navHeight=nav.getBoundingClientRect().height;
const stickyNav=function(entries){
  const[entry]=entries;
  if(!entry.isIntersecting)nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  
}
const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);


//Reveal Sections
const allSections=document.querySelectorAll('.section');
const revealSection=function(entries, observer){
  const[entry]=entries;
  
  if(!entry.isIntersecting)return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver=new IntersectionObserver
(revealSection,{
  root:null,
  threshold:0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

//Lazy loading images
const imgTargets=document.querySelectorAll('img[data-src]');
const loadImg=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting)return
  //Replace src with data-src
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px',
})

imgTargets.forEach(img => imgObserver.observe(img));

//const slider=document.querySelector('.slider');
const slides=document.querySelectorAll('.slide');
const maxSlide=slides.length;
const btnRight=document.querySelector('.slider__btn--right');
const btnLeft=document.querySelector('.slider__btn--left');
const dotContainer=document.querySelector('.dots');
let curSlide=0;
const slider=function(){

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot=function(slide){
    document.querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }


  const goToSlide=function(slide){
    slides.forEach((s,i) => (s.style.transform=`translateX(${100 *(i-slide)}%)`));
  }

  const nextSlide=function(){
    curSlide===maxSlide-1 ? curSlide=0 : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide=function(){
    curSlide===0 ? curSlide=maxSlide-1 : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  }
  const init=function(){
    createDots();
    goToSlide(0);
    
    activateDot(0);
  }
  init();
  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide);

  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft')prevSlide();
    e.key==='ArrowRight' && nextSlide();
  })

  dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide}=e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })
};
slider();