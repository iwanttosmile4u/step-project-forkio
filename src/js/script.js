// $(document).ready(function () {
//     $(".menu").click(function(){
//         $($('.menu__list')[0]).toggleClass('none');
//         $($('.menu_btn')).toggleClass('close-menu')
//     });
// });

document.getElementById('dropbtn')
document.getElementsByClassName('.menu').forEach(function(item) {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.container__menu')
const gotDomObject = document.querySelector('.navbar__list')
gotDomObject.closest('.navbar__list-item')
const bool = gotDomObject.classList.contains('hidden')
bool ? gotDomObject.classList.remove('hidden') : gotDomObject.classList.add('hidden')
    })
})

