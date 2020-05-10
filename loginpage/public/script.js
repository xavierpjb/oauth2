var nameInput = document.getElementById('name');

document.querySelector('form.pure-form').addEventListener('submit', function (e) {
    //prevent the normal submission of the form
    e.preventDefault();
    console.log(nameInput.value);
    const url= '/login';
    console.log("button")
    $.ajax({
        url:url,
        type:"GET",
        success: function(result){
            console.log(result)
        },
        error: function(err){
            console.log(err);
        }
    })
    
});

