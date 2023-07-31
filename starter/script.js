
'use strict';

///////////////////////////////////////
// Modal window  

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal))

  

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////
/////
//selecting elements
const header = document.querySelector('.header');
const allSelectons = document.querySelectorAll('.section');
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
document.getElementsByClassName('btn');

//creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'we use cookied for improved functionality and analytics.';
message.innerHTML = 'we  use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">got it! </button>'
header.append(message);
//delete element
const close = document.querySelector('.btn--close-cookie');

close.addEventListener('click',function(){
  
  message.parentElement.removeChild(message);
})

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height,10)+ 40 +'px';


//attributes


const logo = document.querySelector('.nav__logo');
logo.alt = ' Beautiful minimalist logo';

logo.setAttribute('company','Bankist');

const link = document.querySelector('.nav__link--btn');

// Data Attriutes

//console.log(logo.CDATA_SECTION_NODE.versionNumber)


//smooth scrolling

const btnScrollTO = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTO.addEventListener('click',function(e){
 const s1coords = section1.getBoundingClientRect();
//scrolling
window.scrollTo( {
  left: s1coords.left + window.pageXOffset,
  top : s1coords.top + window.pageYOffset,
  behavior : 'smooth',
});
});




//adding event

const h1 = document.querySelector('h1');
const alertH1 = function(e){
  alert("added event listner");
};
 h1.addEventListener('mouseenter',alertH1);
h1.onmouseenter = function(e){
 alert('onmouseenter: you are on mouse enter')
}
// or other way of adding events
const setTime=setTimeout(() => h1.removeEventListener('mouseenter',alertH1),2000);
console.log(setTime)


//navigation features manuplation
//rgb(255,255,255)
const randomInt = (min,max)=> Math.floor(Math.random()*(max-min+1) + min);
const randomColor = ()=>
`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

//adding eventlistners to navs

document.querySelector('.nav__link').addEventListener('mouseenter',function(e){
this.style.backgroundColor = randomColor();
  });
document.querySelector('.nav__links').addEventListener('mouseenter',function(e){
  this.style.backgroundColor = randomColor();
}) ;
document.querySelector('.nav').addEventListener('mouseenter',function(e){
   this.style.backgroundColor = randomColor();
})  ; 

//tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
 
 
  // guard clauses
  if(!clicked)return;
  //active tab
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  //remove active tabs
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));
  //activate tab
  clicked.classList.add('operations__tab--active');

  //active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab} `).classList.add('operations__content--active');


});

//menu fade animation
const nav = document.querySelector('.nav');



nav.addEventListener('mouseover',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el!== link) el.style.opacity = 0.5; 
    });
    logo.style.opacity = 0.5; 
  }
  
});
nav.addEventListener('mouseout',function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el!== link) el.style.opacity = 1; 
    });
    logo.style.opacity = 1; 
  }
  
});
  /*     
//refactored code of fadeout animation code 


const handlerHover = function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el=>{
      if(el!== link) el.style.opacity =opacity; 
    });
    logo.style.opacity = opacity; 
  }
};
nav.addEventListener('mouseover',function(e){
  handlerHover(e, 0.5);
});
  nav.addEventListener('mouseout',function(e){
    handlerHover(e, 1);

});
*/

/*

//sticky navigation
const stickyNav = function(entries){
  const[entry] = entries;
};
const navHeight = nav.getBoundingClientRect().height; 
const initialCoords =  section1.getBoundingClientRect();
console.log(initialCoords);
  
window.addEventListener('scroll', function(){
  
  
  if(Window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});*/


// sticky navigation: Intersaction observer
const obsCallback = function(entries,observer){
  entries.forEach(entry=>{
    console.log(entry);
  });
};
const stickyNav = function(entries){
  const[entry] = entries;

if(!entry.isIntersecting)nav.classList.add('sticky');
else nav.classList.remove('sticky');
};
  
const headerObserver = new IntersectionObserver(stickyNav,{
  root : null,
  threshold: 0,
});

headerObserver.observe(header); 
 
//reveal section

const allSection = document.querySelectorAll('section'); 
const revealSection =  function(entries, observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection,{
root:null,
threshold:0.15,
});
allSection.forEach( function(section){
  sectionObserver.observe  (section);
  section.classList.add('section--hidden');
});  
   
//////////////////

//lazy loading images

const imgTargets= document.querySelectorAll('img[data-src]');
const loadImg= function(entries,observer){
  const[entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting)return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0
  
});
imgTargets.forEach(img=>imgObserver.observe(img)); 

//////////////////////////////////////
/////////////////////////////////////
//slides
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function(slide){
  slides.forEach((s,i) => (s.style.transform = `translateX(${100*(i-slide)}%)`));
  
};
goToSlide(0);

//next slide

const nextSlide = function(){
  if(curSlide===maxSlide-1){
    curSlide=0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(slide);
};
const prevSlide = function(){
 
  if(curSlide===0){
    curSlide=maxSlide-1;

  }else{
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(slide);
};

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

///////////////////////


//adding event listner to key

document.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft')prevSlide();
  e.key === 'ArrowRight' && nextSlide(); //the above line is short circute while the second one is conditional statment. we can use both 
});
const dotContainer = document.querySelector('.dots');
const creatDot = function(){
  slides.forEach(function(s,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
///active dot
creatDot();
const activateDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot---active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  activateDot(0);

};
dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide); 
  };  
});
