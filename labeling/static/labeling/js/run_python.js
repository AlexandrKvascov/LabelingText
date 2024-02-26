document.addEventListener("DOMContentLoaded", function () {
    const runModel = document.getElementById("runModel");
    const loader = document.querySelector(".loader");
    const Token = document.body.querySelector('meta[name="csrf-token"]').content;
    runModel.addEventListener("click", function(){
        const formaData = new FormData();
        const passportInput = document.getElementById("passport_inp");
        formaData.append("text", passportInput.files[0])
        const jsonInput = document.getElementById("json_inp");
        formaData.append("json", jsonInput.files[0])
        console.log('!!!!!!')
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/ModelsNeyron/", true);
        console.log("--------------------------------")
        xhr.setRequestHeader("X-CSRFToken", Token);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                // alert("Готово !" + response.result['Тэг']);
                loader.style.display = "none";
                
               
                }
                
            };
        loader.style.display = "inline-block"; 
    
            xhr.send(formaData);
        });
    });