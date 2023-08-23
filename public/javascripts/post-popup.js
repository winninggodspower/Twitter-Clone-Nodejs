const popup = document.getElementById("post-popup-wrapper");
const postPopupBtn = document.querySelectorAll('.tweet-btn[data-tweet-button-popup="true"]')

const openPopup = ()=> popup.style.display = "block";

const closePopup = ()=> popup.style.display = "none";

postPopupBtn.forEach((btn=>{
    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        openPopup();
    })
}))
