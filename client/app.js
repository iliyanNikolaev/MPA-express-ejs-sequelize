const $firstP = $('#first_p');
const $secondP = $('#second_p');
const $btnFadeTo = $('#btn_fadeTo');
const $btnFadeTo1 = $('#btn_fadeTo1');
const $btnHide = $('#btn_hide');
const $btnShow = $('#btn_show');
const $btnSlideToggle = $('#btn_slideToggle');
const $box = $('#box');
const $btnAnimateBig = $('#btn_animate_big');
const $btnAnimateSmall = $('#btn_animate_small');

$btnFadeTo.on('click', () => {
    $firstP.fadeTo('slow', 0.5)
});

$btnFadeTo1.on('click', () => {
    $firstP.fadeTo('slow', 1)
});

$btnHide.on('click', () => {
    // $secondP.hide(500);
    $secondP.fadeOut(500);
    // $secondP.slideToggle();
});

$btnShow.on('click', () => {
    // $secondP.show(500);
    $secondP.fadeIn(500)
});

$btnSlideToggle.on('click', () => {
    $secondP.slideToggle();
});

$btnAnimateBig.on('click', () => {
    $box.animate({
        width: "250px",
        height: "120px",
    })
});

$btnAnimateSmall.on('click', () => {
    $box.animate({
        width: "180px",
        height: "70px",
    })
});





//keyboard event
// $('body').on('keydown', (e) => {
//     if (e.which == 72) { //h in ascii
//         $secondP.hide()
//     }
//     if (e.which == 83) { //s in ascii
//         $secondP.show()
//     }
// })