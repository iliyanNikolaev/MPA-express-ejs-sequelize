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
const $btnRed = $('#btn_red');
const $btnBlue = $('#btn_blue');

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
    $secondP.fadeIn(500);
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

$btnRed.on('click', () => {
    $box.removeClass('blue');
    $box.addClass('red');
});
$btnBlue.on('click', () => {
    $box.removeClass('red');
    $box.addClass('blue');
});

// input, form - events and methods
$('input').focus(function () {
    $(this).css('background', 'lightgray');
});
$('input').blur(function () {
    $(this).css('background', 'white');
});
$('input').change(function () {
    // console.log($(this).val())
});

const $loginForm = $('#login-form');
$loginForm.submit(function(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);
    console.log(username, password);
});


//load file in html element
$('#btn_load').on('click', () => {
    $('#load_file').load('data.txt');
})

// async
const $fetchBtn = $('#btn_fetch');
const $listContainer = $('#get_data');

const listTemplate = (data) => `
        <ul>
            ${data.map(x => `<li>${x.title}</li>`).join('')}
        </ul>
    `;

$fetchBtn.on('click', fetchAndRenderData);

function fetchAndRenderData() {
    $.ajax({
        url: 'http://localhost:6161/laptops',
        method: 'GET',
        success: function(data){
            $listContainer.html(listTemplate(data));
        },
        error: function(err){
            alert(err.message)
        }
    })
}

