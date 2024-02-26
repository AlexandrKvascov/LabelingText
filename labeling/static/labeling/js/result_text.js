const openJsonButton = document.getElementById("Open_json");
openJsonButton.addEventListener("click", function () {
    // Находим колонки с id "number", "Tag_th" и "Name_th" и убираем у них класс "hidden"
    document.getElementById("number").classList.remove("hidden_res");
    document.getElementById("Tag_th").classList.remove("hidden_res");
    document.getElementById("Name_th").classList.remove("hidden_res");

    // Здесь можно добавить код для открытия JSON и заполнения таблицы данными
});

const butClose = document.querySelector(".closer")
const OpenJson = document.getElementById("Open_json");
OpenJson.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/static/result.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response); // Ваши данные JSON
        }
        var table = document.getElementById("resultTable");
        table.style.display = 'block';
        var tbody = table.getElementsByTagName('tbody')[0];
        console.log(response["Имя"][4])
        var count = 0
        for (var i = 0; i < response["Тэг"].length; i++) {
            var row = tbody.insertRow(i);
            if (response["Имя"][i] === ""){
                console.log(response["Имя"][i])
            }
            else{
            var cell = row.insertCell(0)
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            cell.innerHTML = count+1
            cell1.innerHTML = response["Тэг"][i];
            cell2.innerHTML = response["Имя"][i];
            count++;
            }
        }
    };
    xhr.send();
    butClose.style.display = "block";
})

const table = document.getElementById("resultTable")
butClose.addEventListener("click", function(){
    table.style.display = "none";
    butClose.style.display = "none";

})
document.addEventListener("DOMContentLoaded", function () {

    var linkElement = document.getElementById("myStyleSheet")
    // Создаем новое значение для параметра "v".
    var newQueryParamValue = getRandQueryParams(100); // Новое значение параметра "v".

    // Получаем текущий URL из атрибута "href" элемента <link>.
    var currentHref = linkElement.getAttribute("href");

    // Разбиваем URL на базовую часть и параметры запроса.
    var urlParts = currentHref.split("?");
    var baseUrl = urlParts[0]; // Базовая часть URL (без параметров запроса).

    // Формируем новый URL с обновленным параметром "v".
    var newHref = baseUrl + "?v=" + newQueryParamValue;

    // Устанавливаем новый URL как атрибут "href" элемента <link>.
    linkElement.setAttribute("href", newHref);
});

function getRandQueryParams(max) {
    return Math.floor(Math.random() * max);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const runModel = document.getElementById("run_regular_text");
    const loader = document.querySelector(".loader"); // Получаем элемент лоадера
    const visTable = document.getElementById("json-table")
    const Token = document.body.querySelector('meta[name="csrf-token"]').content;

    runModel.addEventListener("click", function() {
        const formData = new FormData();
        visTable.style.display = "none";
        const passportInput = document.getElementById("text_inp");
        formData.append("text", passportInput.files[0]);
        console.log('!!!!!!');

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Regular_text/", true);
        console.log("--------------------------------");

        xhr.setRequestHeader("X-CSRFToken", Token);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                // alert("Готово !");
                loader.style.display = "none"; // Скрыть лоадер после завершения
                TableVision();
            }
        };

        loader.style.display = "inline-block"; // Показать лоадер перед отправкой

        xhr.send(formData);

    });
});

    const textInput = document.getElementById("text_inp");
    const customUploadtext = document.getElementById("custom-text");
    
    customUploadtext.addEventListener("click", function () {
      textInput.click();
      
    });

    const TextInput = document.getElementById("text_inp");
const psprtText = document.getElementById("text-text");
TextInput.addEventListener("change", function () {
    const selFile = TextInput.files[0];
    if (selFile) {
        psprtText.innerText = selFile.name;
    }
    else {
        psprtText.innerText = "Выберите файл";
    }
});









function TableVision(){
    
    const visionJson = document.getElementById("json-table")
    const jsonTable = document.getElementById("json-table").querySelector("tbody");
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/static/text_regular.json", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
            
                jsonTable.innerHTML = ""; // Очищаем содержимое таблицы
                console.log(response);
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        const row = document.createElement("tr");
                        const keyCell = document.createElement("td");
                        // console.log(keyCell)
                        const valueCell = document.createElement("td");
                    
                    
                        keyCell.textContent = key;
                        valueCell.textContent = response[key];
                    
                        row.appendChild(keyCell);
                        row.appendChild(valueCell);
                        jsonTable.appendChild(row);
                    }
                }
            }
        };

    xhr.send();
    visionJson.style.display = "block";
    }