var nameInput = document.getElementById('name');

document.querySelector('form.pure-form').addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault();
    console.log(nameInput.value);
    
});

