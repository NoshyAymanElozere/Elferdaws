
 
let fixednav =document.querySelector(".header");
window.addEventListener("scroll",()=>{
   window.scrollY >100 ?fixednav.classList.add('active-nav'):fixednav.classList.remove('active-nav');
})


// navbar togller 

const menu_btn = document.querySelector('.btn1');
const show = document.querySelector('.header ul');
const head = document.querySelector(".header");
const navItems = document.querySelectorAll('.header ul li');

menu_btn.addEventListener('click', function () {
   head.classList.toggle("header-active");
   menu_btn.classList.toggle('is-active');
   show.classList.toggle('show');
});

function updateActiveNavLink() {
   const currentPage = window.location.href;

   navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link.href === currentPage) {
         item.classList.add('active');
      } else {
         item.classList.remove('active');
      }
   });
}

document.addEventListener('DOMContentLoaded', function () {
      updateActiveNavLink();
});


navItems.forEach(item => {
   item.addEventListener('click', function (event) {
      updateActiveNavLink();
   });
});



// change hadithes inner 
let hadithContainer =document.querySelector(".hadithcontainer"),
next =document.querySelector('.buttons .next'),
prev =document.querySelector('.buttons .prev'),
number =document.querySelector('.buttons .number');

let hadithIndex =0 ;

hadithchanger();
function hadithchanger(){

fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
.then(response =>response.json())
.then(data =>{

   let hadiths =data.data.hadiths;
   changeHadith()
   next.addEventListener('click',()=>{
      hadithIndex ==299?hadithIndex =0:hadithIndex++;
      changeHadith()
   })
    
   prev.addEventListener('click',()=>{
      hadithIndex ==0?hadithIndex =299:hadithIndex--;
      changeHadith()
   })
     
  function changeHadith(){
   hadithContainer.innerText=hadiths[hadithIndex].arab;
   number.innerHTML=`300 -${hadithIndex  +1}`;
  }
   
})

}


// start-quran-section 
let surhasContainer =document.querySelector(".surhasContainer");
getSurahs();
function getSurahs(){
   // fetch surah meta data (name of surah )
 fetch("https://api.alquran.cloud/v1/meta")
   .then(response =>response.json())
   .then(data=>{
         let surahs =data.data.surahs.references
         let numberOffSurhas =114;
         for(let i=0; i<numberOffSurhas;i++){
            surhasContainer.innerHTML+=`
            <div class="surah">
            <p> ${surahs[i].name}</p>
            <p> ${surahs[i].englishName}</p>
        </div>
            `
         }
         // start-popup -section
         let surahTitle =document.querySelectorAll('.surah');
      
         let popup =document.querySelector(".surah-pop-up");

         let ayatContainer =document.querySelector('.ayat');

         let closeMenue=document.querySelector('.close li');
         surahTitle.forEach((title,index) =>{
           title.addEventListener('click',()=>{
          fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
          .then(response=>response.json())
          .then(data=>{
            ayatContainer.innerHTML="";
            let Ayat =data.data.ayahs
             Ayat.forEach(aya=>{
               popup.classList.add('active');
               closeMenue.addEventListener('click',()=>{
                  popup.classList.remove('active')
               }) 
               ayatContainer.innerHTML+=`
               <p>(${aya.numberInSurah})-${aya.text} </p>
               `
             })
          })
           });
         })
   })
} 
;
// start pray time 
let cards =document.querySelector('.cards');
getPrayTimes();
function getPrayTimes(){
   fetch("https://api.aladhan.com/v1/timingsByCity/29-07-2023?city=Cairo&country=Egypt&method=8")
   .then(response=>response.json())
   .then(data=>{
      let times =data.data.timings;
      cards.innerHTML="";   
      let i =0;
      let arabname=["الفجر","الشروق","الظهر","العصر","المغرب","الغروب","العشاء"," الأمساك"," منتصف الليل","الثلث الأول من الليل","الثلث الأخير من الليل"];
      for(let time in times){
         cards.innerHTML+=`
         <div class="card">
         <div class="circle">
             <svg >
               <Circle cx="100" cy="100" r="100"></Circle>
            </svg>
             <div class="praytime">${times[time]}</div>
         </div>
         <p>${arabname[i++]}</p>
     </div>
         
         `
      }
    
   })
     
}

// exploreBtn btn 
let explorebtn =document.querySelector('.btn'),
praySection =document.querySelector('.pray');
explorebtn.addEventListener('click',()=>{
   praySection.scrollIntoView({
      behavior :'smooth'
   })
})


