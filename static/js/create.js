$('input.available_radio').change(function () {
    console.log('trigger');
    $('#create_available_warning').hide();
});

$('input').on('focusout', function () {
    const value = $(this).val();
    const name = $(this).attr('name');

    if (name == 'title') {
        const isInvalid = !value
            || value.length < 3
            || value.length > 30

        isInvalid ? showTitleError() : titleIsValid()
    }

    if (name == 'price') {
        const isInvalid = !value || isNaN(Number(value))

        isInvalid ? showPriceError() : priceIsValid()
    }

    if (name == 'description') {
        const isInvalid = !value
            || value.length < 3
            || value.length > 50

        isInvalid ? showDescriptionError() : descriptionIsValid()
    }
});

function showError(inputQuerySelector, spanQuerySelector, message) {
    $(inputQuerySelector).css({
        'border-color': 'red',
        'border-width': '3px'
    });
    $(spanQuerySelector).text(message);

    setTimeout(function () {
        $(inputQuerySelector).css({
            'border-color': 'black',
            'border-width': '2px'
        });

        $(spanQuerySelector).text('');
    }, 7000);

}

function validInput(inputQuerySelector) {
    $(inputQuerySelector).css({
        'border-color': 'lightgreen',
        'border-width': '3px'
    });
}

function showTitleError() {
    const inputQuerySelector = '#create_title_input';
    const spanQuerySelector = '#create_invalid_title';
    const message = 'Title must be between 3 and 30 characters.';

    showError(inputQuerySelector, spanQuerySelector, message);
}

function showPriceError() {
    const inputQuerySelector = '#create_price_input';
    const spanQuerySelector = '#create_invalid_price';
    const message = 'Price must be a integer!';

    showError(inputQuerySelector, spanQuerySelector, message);
}

function showDescriptionError() {
    const inputQuerySelector = '#create_description_input';
    const spanQuerySelector = '#create_invalid_description';
    const message = 'Description must be between 3 and 50 characters.';

    showError(inputQuerySelector, spanQuerySelector, message);
}

function titleIsValid() {
    const inputQuerySelector = '#create_title_input';
    validInput(inputQuerySelector);
}

function priceIsValid() {
    const inputQuerySelector = '#create_price_input';
    validInput(inputQuerySelector);
}

function descriptionIsValid() {
    const inputQuerySelector = '#create_description_input';
    validInput(inputQuerySelector);
}