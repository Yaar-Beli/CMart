
document.addEventListener('DOMContentLoaded', function () {
    setupEditButton();
});

function setupEditButton() {
    const editButton = document.getElementById('editButton');
    const nameElement = document.querySelector('.personal-info .name');
    const dobElement = document.querySelector('.personal-info .dob');
    const countryElement = document.querySelector('.personal-info .country');
    const languageElement = document.querySelector('.personal-info .language');
    const contactElement = document.querySelector('.personal-info .contact');

    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Edit') {
            editButton.textContent = 'Save';
            enableEditing(nameElement);
            enableEditing(dobElement);
            enableEditing(countryElement);
            enableEditing(languageElement);
            enableEditing(contactElement);
        } else {
            editButton.textContent = 'Edit';
            disableEditing(nameElement);
            disableEditing(dobElement);
            disableEditing(countryElement);
            disableEditing(languageElement);
            disableEditing(contactElement);
        }
    });
}

function enableEditing(element) {
    const text = element.querySelector('p').textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.className = 'text-gray-700';
    element.replaceChild(input, element.querySelector('p'));
}

function disableEditing(element) {
    const input = element.querySelector('input');
    const text = input.value;
    const p = document.createElement('p');
    p.className = 'text-gray-700';
    p.textContent = text;
    element.replaceChild(p, input);
}