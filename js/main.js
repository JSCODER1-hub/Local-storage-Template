// Check if there is local storage color option
let mainColors = localStorage.getItem("color-option");
const randomBackEle = document.querySelectorAll(".random-backgrounds span");

let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");

// Skills Selector
let ourSkills = document.querySelector(".skills");

// gallery
let ourGallery = document.querySelectorAll(".gallery img");

// Select bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

if (backgroundLocalItem !== null)
{
    randomBackEle.forEach(ele =>{
        ele.classList.remove("active");
    });
    
    if (backgroundLocalItem === "true")
    {
        backgroundOption =  true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        backgroundOption =  false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}

if (mainColors !== null){
    document.documentElement.style.setProperty('--main-color' , localStorage.getItem("color-option"));

        document.querySelectorAll(".colors-list li").forEach(ele => {
        ele.classList.remove("active");

        if (ele.dataset.color === mainColors)
        {
            ele.classList.add("active");
        }
        });
}


let lp = document.querySelector(".landing-page");
let settings = document.querySelector(".settings-box");
const colorsLi = document.querySelectorAll(".colors-list li");

let imgsArr = ["1.jpg" ,"2.jpg" , "3.jpg" , "4.jpg" , "5.jpg" ];


// Get Random Number


// gear.addEventListener( "click", ()=>{
    //     settings.setAttribute('class' , "settings-box  open");
    // });
    
    
document.querySelector(".toggle .fa-cog").onclick = function (){
        
    settings.classList.toggle("open");
    
};
    

    // Changing Colors
    
    colorsLi.forEach(li=>{
        
        li.addEventListener('click' , (e)=>{
            // console.log(e.target.dataset.color);
            
            // Set Color To root
            document.documentElement.style.setProperty('--main-color' , e.target.dataset.color);
            
            localStorage.setItem('color-option' ,e.target.dataset.color );
            
            
            // Remove Class Active
            handleActive(e);
        });
        
    });
    
    // Random Backgrounds

randomBackEle.forEach(span=>{
            
            span.addEventListener('click' , (e)=>{
                
                // Remove Class Active
                handleActive(e);

            if (e.target.dataset.background === 'yes')
            {
                backgroundOption = true;
                randomizeImgs();
                localStorage.setItem("background-option" , true);

            }else{
                backgroundOption = false;
                clearInterval(backgroundInterval);
                localStorage.setItem("background-option" , false);
                
            }
        });
        
});

function randomizeImgs(){
    if (backgroundOption == true){
     backgroundInterval = setInterval(()=>{
        lp.style.backgroundImage = `url("images/${imgsArr[Math.floor(Math.random() * 5)]}")`;
        console.log
    }, 1000);
}
}
randomizeImgs();


window.onscroll = function(){

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let SkillsOutHeight = ourSkills.offsetHeight;

    // Window height
    let windowHeight = window.innerHeight;
    // console.log(windowHeight);

    // Window Scroll Top
    let windowScrollTop = this.scrollY;
    
    if (windowScrollTop > (skillsOffsetTop + SkillsOutHeight - windowHeight - 120) )
    {
     let allSkills = document.querySelectorAll(".skills .skill-progress span");

     allSkills.forEach(skill =>{

        skill.style.width = skill.dataset.progress; 
     });
    }

};

// Create Pop up with Image

ourGallery.forEach(img =>{
    img.addEventListener('click' , (e)=>{
        
        // Create Overlay ELement
        let overlay = document.createElement("div");

        // Add Class Overlay
        overlay.className = "popup-overlay";
 
        document.body.appendChild(overlay); 


        let popupBox = document.createElement('div');

        popupBox.className = "popup-box";

        let popupImage = document.createElement("img");


        // Adding Title

        if (img.alt !== null){
            let imgHeading = document.createElement("h3");

            // Create text for Heading
            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }


        popupImage.src = img.src; 
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // Adding Close X
        let closeButt = document.createElement("span");
        let closeButtX = document.createTextNode("X");
        
        closeButt.appendChild(closeButtX);

        closeButt.className = 'close-button';
        popupBox.appendChild(closeButt);

        
    });
});

document.addEventListener('click' , (e)=>{
    if (e.target.className == 'close-button')
    {
        
        e.target.parentElement.remove();
        document.querySelector('.popup-overlay').remove();
    }
});


// Scrolling
function scrolltoSomewhere(elements){

    elements.forEach(ele =>{
        ele.addEventListener('click' , (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });
}

scrolltoSomewhere(allBullets);
scrolltoSomewhere(allLinks);

// Handle Active State
function handleActive(ev){

    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove('active');
    });

    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null)
{

    bulletsSpan.forEach(span=>{
        
        span.classList.remove("active");
    
    });

    if (bulletLocalItem === 'block')
    {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = "none";
                document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span=>{
    span.addEventListener("click" , (e)=>{

        if (span.dataset.display === "show")
        {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option" , 'block');
        }else{
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option" , 'none');
        }
        
        handleActive(e);
    });
});


// Reset Button
document.querySelector(".reset-options").onclick = function(){

    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");


    // Reaload Window
    window.location.reload();

};

// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");


toggleBtn.onclick = function(){

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
}


// click anywhere outside Toggle menu

document.addEventListener('click' , (e)=>{
    
    e.stopPropagation();

    if (e.target != tLinks && e.target != toggleBtn){

        // Check if menu is open
        if (tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        }
    }

});


tLinks.onclick = function (e) {
    e.stopPropagation();
}