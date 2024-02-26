




const burgerIcon = document.querySelector(".close-button")
console.log(burgerIcon)
const menuBurger = document.querySelector(".menu-content")
menuBurger.style.display = "none"
burgerIcon.addEventListener("click", function(e){
    e.preventDefault()
    if (menuBurger.style.display === "none"){
        menuBurger.style.display = "block";
        burgerIcon.style.left = "5%";

    }
    else {
        menuBurger.style.display = "none";
        burgerIcon.style.left = "5%";
    }
})
const showTagDeterm = document.getElementById("TagDetermination");
const buttonClose = document.querySelector(".closer")
const tagDeterm = document.getElementById("tag_name");
tagDeterm.style.display = "none";
showTagDeterm.addEventListener("click", function(event) {
    event.preventDefault();
    if (tagDeterm.style.display === "none") {
        tagDeterm.style.display = "block";
        showTagDeterm.style.display = "none";
        buttonClose.style.display = "block";
    }
    
});
buttonClose.addEventListener("click", function(event) {
    event.preventDefault();
    if (tagDeterm.style.display === "block") {
        tagDeterm.style.display = "none";
        showTagDeterm.style.display = "";
        buttonClose.style.display = "none";
    }
});




const textLabel = document.getElementById("text-to-label");
const editButton = document.getElementById("edit-button");
const saveButton = document.getElementById("save-button");

editButton.addEventListener("click", function() {
  // Включаем редактирование текста
  textLabel.contentEditable = true;
  editButton.disabled = true;
  saveButton.disabled = false;


});

saveButton.addEventListener("click", function() {
  // Выключаем редактирование текста
    textLabel.contentEditable = false;
    editButton.disabled = false;
    saveButton.disabled = true;
    
    const editText = textLabel.innerText

    const blob = new Blob([editText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "edited_text.txt";
    downloadLink.style.display = "block";
    downloadLink.style.width = "125px"
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "edited_text.txt");
    }
});

const script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.head.appendChild(script);

function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modalImage.src = imageSrc;
    modal.style.display = "block";

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
}






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
const showModelTableButton = document.getElementById("showModelTableButton");
const modelTable = document.getElementById("Model_Table");
const butClose = document.querySelector(".closer")
showModelTableButton.addEventListener("click", function() {
//   (modelTable.style.display === "none") 
    modelTable.style.display = "block";
    showModelTableButton.style.display = "none";
    butClose.style.display = "block";
    showModelTableButton.classList.add("close");

});
butClose.addEventListener("click", function(){
    modelTable.style.display = "none";
    showModelTableButton.style.display = "block";
    butClose.style.display = "none";
    showModelTableButton.classList.remove("close");
})








let labelColors = {};
let labelData = { text: "", labels: [] };
const fileInput = document.getElementById("file-input");
const textToLabel = document.getElementById("text-to-label");
const uploadButton = document.getElementById("upload-button");

uploadButton.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
 
  reader.onload = function (event) {
    const fileContent = event.target.result;
    console.log(fileContent)
    textToLabel.innerText = fileContent; // Используем innerText для установки текста
  };

  if (file) {
    reader.readAsText(file);
  }
});
const ImageInput = document.getElementById("image-input");
const customUploadButton = document.getElementById("custom-upload-button");

customUploadButton.addEventListener("click", function () {
  ImageInput.click();
  
});
const textInput = document.getElementById("passport_inp");
const customUploadtext = document.getElementById("cutom-upload-text");

customUploadtext.addEventListener("click", function () {
  textInput.click();
  
});
const jsnInput = document.getElementById("json_inp");
const customUploadjson = document.getElementById("cutom-upload-json");

customUploadjson.addEventListener("click", function () {
  jsnInput.click();
  
});
const TextInput = document.getElementById("passport_inp");
const psprtText = document.getElementById("psprt-text");
TextInput.addEventListener("change", function () {
    const selFile = TextInput.files[0];
    if (selFile) {
        psprtText.innerText = selFile.name;
    }
    else {
        psprtText.innerText = "Выберите файл";
    }
});
// Найдите элементы на странице
const imageInput = document.getElementById("image-input");
const imageText = document.getElementById("image-text");
const marquee = document.getElementById("marquee");
imageInput.addEventListener("change", function() {
    console.log("Image input changed");
    const selectedFile = imageInput.files[0];
    if (selectedFile) {
        imageText.innerText = selectedFile.name;
        if (selectedFile.type.startsWith("image/")) {
            const newImage = document.createElement("img");
            newImage.src = URL.createObjectURL(selectedFile);
            newImage.alt = "новое изображение";

            const imageCaption = document.createElement("div");
            imageCaption.className = "image-caption";
            imageCaption.innerText = selectedFile.name;

            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            imageContainer.appendChild(newImage);
            imageContainer.appendChild(imageCaption);

            document.getElementById("marquee").appendChild(imageContainer);
            newImage.addEventListener("click", function () {
                // Открываете изображение в модальном окне или выполняете другие действия по клику
                // Например, показ модального окна с увеличенным изображением
                openModal(newImage.src);
            });
        }
    }
    else {
        imageText.innerText = "Выберите файл";
    }
});

const jsonInput = document.getElementById("json_inp");
const jsonText = document.getElementById("json-text");
jsonInput.addEventListener("change", function() {
    console.log("Image input changed")
    const selecFile = jsonInput.files[0];
    if (selecFile) {
        jsonText.innerText = selecFile.name;
    }
    else {
        jsonText.innerText = "Выберите файл";
    }

});
const runPythonScriptButton = document.getElementById("runPythonScript");
const csrfToken = document.body.querySelector('meta[name="csrf-token"]').content;

// Добавьте обработчик события для кнопки "Запустить Python-скрипт"
runPythonScriptButton.addEventListener("click", function() {
    const formData = new FormData();
    formData.append("image", imageInput.files[0]); // Получите выбранное изображение
    // console.log(formData); //
    const Image_text = document.createElement("div")
    Image_text.id = "image-text";
    console.log(imageInput.value);
    Image_text.innerText = imageInput.value

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/run_python_script/", true);
    xhr.setRequestHeader("X-CSRFToken", csrfToken);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            alert("Готово !");
            textToLabel.innerText = response.result; // Устанавливаем результат в поле textToLabel
        }
    };
    xhr.send(formData);
});



function add_tag (){
    const labelInput = document.getElementById("label");
    const innerTags = document.getElementsByClassName("inner");
    // console.log(innerTags);
    for (let i = 0; i < innerTags.length; i++){
    innerTags[i].addEventListener("click", function (event) {
            event.preventDefault();
            console.log(innerTags[i].textContent);
            labelInput.value = innerTags[i].textContent;
        });
        }}
    // document.getElementById("add-label").addEventListener("click", addLabel);
add_tag()
function keyword_input(){
    const labelInput = document.getElementById("label");
    const innerTags = document.getElementsByClassName("inner");
 
        // console.log(innerTags);
        
   
            document.addEventListener("keydown",function(event){
                if (innerLabel.classList.contains("disabled")){
                    console.log("Please")
               
                }
                else{
                    console.log("No thanks")
                    event.preventDefault();
     
                
                
                    if (event.key === "1"){

                        labelInput.value = innerTags[0].textContent;
                    }
                    else if (event.key === "2"){
                        labelInput.value = innerTags[1].textContent;
                    }
                    else if (event.key === "3"){
                        labelInput.value = innerTags[2].textContent;
                    }
                    else if (event.key === "4"){
                        labelInput.value = innerTags[3].textContent;
                    }
                    else if (event.key === "5"){
                        labelInput.value = innerTags[4].textContent;
                    }
                    else if (event.key === "6"){
                        labelInput.value = innerTags[5].textContent;
                    }
                    else if (event.key === "7"){
                        labelInput.value = innerTags[6].textContent;
                    }
                    else if (event.key === "8"){
                        labelInput.value = innerTags[7].textContent;
                    }
                    else if (event.key === "9"){
                        labelInput.value = innerTags[8].textContent;
                    }
                    else {
                        console.log("Invalid")
                    }
            // innerTags[i].removeEventListener("keydown", yourEventListenerFunction);
         } 
        })
        
}
const innerLabel = document.getElementById('label');
innerLabel.addEventListener("click", function(){
    innerLabel.classList.toggle("disabled");
  
})
document.addEventListener("click", function(e){
    const targetClick = e.target
    console.log(targetClick)
    if (targetClick !== innerLabel){
        innerLabel.classList.remove("disabled");
    console.log("Сюда")

    }
});

keyword_input()
enter_label()
function enter_label(){
    const addlabelButton = document.getElementById('add-label');
    document.addEventListener("keydown",function(event){
        // event.preventDefault();
        if (event.key === "Enter"){
            addlabelButton.click();
        } 
    })

}
function addLabel() {
    const textToLabel = document.getElementById("text-to-label");
    const labelInput = document.getElementById("label");
  
      
      // Инициализация, чтобы поле ввода имело минимальную высоту при загрузке страницы
    if (textToLabel.innerHTML) {
        // Выделение текста и добавление метки
        const selectedText = getSelectedText();
        if (selectedText) {
            let labelName = labelInput.value;
            let labelColor = labelColors[labelName];

            if (!labelColor) {
                // Если цвет для метки еще не определен, генерируем его
                labelColor = getRandomColor();
                labelColors[labelName] = labelColor;
            }

            const markedText = `<mark style="background-color: ${labelColor}">${selectedText}</mark>`;
            const newText = textToLabel.innerHTML.replace(new RegExp(selectedText, 'g'), markedText);
            textToLabel.innerHTML = newText;

            // Добавляем метку в labelData
            labelData.labels.push({ text: selectedText, label: labelName });

            // Создайте элемент для отображения метки внизу
            const scrollLock = document.getElementById("scrollLock");

            const labelDisplay = document.createElement("div");
            labelDisplay.id = "some-id";
            console.log(labelDisplay.textContent);
            // const screenWidth = window.innerWidth;
            // console.log(screenWidth);
            // const textWidth =  getWidthOfText(selectedText);
            // const LabelWidth = getWidthOfText(labelName)
            // labelDisplay.style.marginRight = (screenWidth - (textWidth+LabelWidth)*1.5) + "px";
            labelDisplay.style.backgroundColor = labelColor;
            labelDisplay.innerHTML = `${labelName} - ${selectedText}`;
            scrollLock.appendChild(labelDisplay);
            const deleteButton = document.createElement("a");
            
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click",function(){
                const labelText = labelDisplay.textContent.split(" - ")[1];
                const delLabelText = labelText.replace("Удалить", "");
                console.log(delLabelText);
                removeLabel(delLabelText);
                labelDisplay.remove();
            });
            labelDisplay.appendChild(deleteButton);
            deleteButton.id = "deleteLabel"
            const labelContainer = document.getElementById("some-id");
            const labelTagName = document.getElementById("tag_name");
            console.log(labelInput);
            determinateFunc(labelInput)
            
            if (labelContainer){
                SaveText(labelName, labelInput);
                
            }
            // Сбросьте поле ввода метки
            labelInput.value = "";
        }
    }
}
delCash = []
function removeLabel(textToRemove) {
    // Удалите метку с текстом textToRemove из labelData
    const markedText = new RegExp(`<mark style="background-color: [^"]+">${textToRemove}</mark>`, 'g');
    textToLabel.innerHTML = textToLabel.innerHTML.replace(markedText, textToRemove);
    console.log(textToRemove)
    delCash.push(textToRemove);
    labelData.labels = labelData.labels.filter(label => label.text !== textToRemove);
    // textToLabel.innerHTML = textToLabel.innerHTML.replace(new RegExp(`<mark style="background-color: [^"]+">${textToRemove}</mark>`, 'g'), textToRemove);
    console.log(labelData)
    // ... (возможно, выполните другие действия по удалению)
}
function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        return document.selection.createRange().text;
    }
    return null;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.getElementById("add-label").addEventListener("click", addLabel);

function downloadJSON() {
    // const textToLabel = document.getElementById("text-to-label");
    // labelData.text = textToLabel.textContent; // Сохраняем весь текст
    console.log(labelData);
    delete labelData.text;
    delCash.forEach(labelText => removeLabel(labelText));
    const jsonString = JSON.stringify(labelData.labels);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "labeled_data.json";
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById("download-json").addEventListener("click", downloadJSON);


function getWidthOfText(selectedText) {
    const tempSpan = document.createElement('span'); // Создаем временный элемент span
    tempSpan.style.visibility = 'hidden'; // Скрываем элемент
    tempSpan.style.position = 'absolute'; // Позиционируем абсолютно

    // Устанавливаем текст во временном элементе
    tempSpan.innerText = selectedText;

    // Добавляем временный элемент в DOM, но нигде не видим его
    document.body.appendChild(tempSpan);

    const width = tempSpan.getBoundingClientRect().width; // Получаем ширину

    // Удаляем временный элемент из DOM
    document.body.removeChild(tempSpan);

    return width;
}


fileMass = ["Страна","Кем выдан","Дата выдачи","Код","Фамилия","Имя", "Отчество","Дата рождения","Место рождения"];
function SaveText(text, labelInput){
   
    const labelTagName = document.getElementById("tag_name")
    const nestedElements = labelTagName.querySelectorAll("*"); // Получение всех вложенных элементов
    console.log(nestedElements);
    const labelName = text.split(" - ")[0];
    if (fileMass.includes(labelName)){
        console.log(labelName)
        
    }
    else{
        fileMass.push(labelName)
        const labelButton = document.createElement("button");
        labelButton.id = `label_id${getRandomInt(10, 1000)}`;
        labelButton.innerHTML = labelName;
        console.log(labelButton.textContent);
        const ButLabel = labelButton.textContent
        console.log(ButLabel);
        labelTagName.appendChild(labelButton);
        console.log('################################')
        labelButton.addEventListener("click", function(event) {
            event.preventDefault();
            
            InputLabelTag(ButLabel, labelInput);
        });
        
    }
}


function InputLabelTag(labelName, labelInput) {
    console.log(labelName);
    labelInput.value = labelName;
}
function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRandQueryParams(max) {
    return Math.floor(Math.random() * max);
  }
function determinateFunc(labelInput)
{
    const determ = document.getElementById("determ_label_id1")
    console.log(determ.textContent)
    determ.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ.textContent, labelInput);
});
    const determ2 = document.getElementById("determ_label_id2")
    console.log(determ.textContent)
    determ2.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ2.textContent, labelInput);
});
    const determ3 = document.getElementById("determ_label_id3")
    console.log(determ.textContent)
    determ3.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ3.textContent, labelInput);
});
    const determ4 = document.getElementById("determ_label_id4")
    console.log(determ.textContent)
    determ4.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ4.textContent, labelInput);
});
    const determ5 = document.getElementById("determ_label_id5")
    console.log(determ.textContent)
    determ5.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ5.textContent, labelInput);
});
    const determ6 = document.getElementById("determ_label_id6")
    console.log(determ.textContent)
    determ6.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ6.textContent, labelInput);
});
    const determ7 = document.getElementById("determ_label_id7")
    console.log(determ.textContent)
    determ7.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ7.textContent, labelInput);
});
    const determ8 = document.getElementById("determ_label_id8")
    console.log(determ.textContent)
    determ8.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ8.textContent, labelInput);
});
    const determ9 = document.getElementById("determ_label_id9")
    console.log(determ.textContent)
    determ9.addEventListener("click", function(event) {
    event.preventDefault();
    
    InputLabelTag(determ9.textContent, labelInput);
});
}