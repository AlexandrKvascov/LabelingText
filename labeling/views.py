# labeling/views.py
from django.shortcuts import render
from .models import LabeledData
from django.http import HttpResponse
from django.http import JsonResponse
import pytesseract
import cv2,json,re,  difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from tqdm import tqdm
from labeling_tool.settings import r
import os
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return redirect('/login')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                request.session['username'] = username 
                print(username)
                return redirect('/labeling')  # Перенаправьте на вашу домашнюю страницу
    else:
        form = AuthenticationForm()
    return render(request, 'labeling/login.html', {'form': form})





def your_register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            # После успешной регистрации перенаправьте пользователя
            return redirect('/login')
    else:
        form = UserCreationForm()
    return render(request, 'labeling/register.html', {'form': form})

@login_required
def label_text(request):
    if request.method == 'POST':
        text = request.POST.get('text')
        label = request.POST.get('label')
        LabeledData.objects.create(text=text, label=label)

    unlabeled_data = LabeledData.objects.filter(label='').first()
    labeled_data = LabeledData.objects.exclude(label='').order_by('-created_at')

    return render(request, 'labeling/label_text.html', {'unlabeled_data': unlabeled_data, 'labeled_data': labeled_data})
@login_required
def new_label(request):
    if request.method == 'POST':
        text = request.POST.get('text')
        label = request.POST.get('label')
        LabeledData.objects.create(text=text, label=label)

    unlabeled_data = LabeledData.objects.filter(label='').first()
    labeled_data = LabeledData.objects.exclude(label='').order_by('-created_at')

    return render(request, 'labeling/new_label.html', {'unlabeled_data': unlabeled_data, 'labeled_data': labeled_data})
def run_python_script(request):
    # Ваш код для вызова Python-скрипта здесь
    if request.method == 'POST':
        img = request.FILES.get('image')
        print(img)
        img = f'{r}/image/{img}'
        print(img)
        # img = "C:\\Users\\AlexandrKosov\\Desktop\\Test_Appium\\neyron\\naida.jpeg"
        image = cv2.imread(img)
        pytesseract.pytesseract.tesseract_cmd = f'{r}/tesseract/tesseract_py/tesseract.exe'
        text = pytesseract.image_to_string(img, lang='rus' )
        print(text)
        result = "Результат выполнения Python-скрипта"
        with open ("results.txt", "w", encoding="utf-8") as f:
            f.write(text)

        return JsonResponse({"result": text})
    return JsonResponse({"error": "Запрос не был POST"})
def save_text(request):
    if request.method == 'POST':
        # Получите текст из запроса (в данном случае, предполагается, что текст передается в поле с именем "text")
        text = request.POST.get('text', '')  # Используйте тот же ключ, который вы ожидаете в вашем HTML-шаблоне

        if text:
            # Создайте и сохраните объект LabeledData
            labeled_data = LabeledData(text=text)
            labeled_data.save()

            return JsonResponse({'success': True, 'message': 'Данные успешно сохранены.'})
        else:
            return JsonResponse({'success': False, 'message': 'Не удалось сохранить данные. Поле "text" пусто.'})

    return JsonResponse({'success': False, 'message': 'Метод запроса не поддерживается.'})
def Tag_name(request):
    if request.method == 'GET':
        print("1212313123")





def Regular_text(request):
    if request.method == 'POST':
        text_reg= request.FILES.get('text')
      
    
        def bd_naming(list_sur,list_words):
            curname_list = []
            integers = []
            law = []
            for words_sur in tqdm(list_words):
                best_match = 0
                best_ratio = 0
                
                for word_variant in tqdm(list_sur):
                    similarity = difflib.SequenceMatcher(None, words_sur, word_variant).ratio()
                    if similarity > best_ratio:
                        best_ratio = similarity
                        best_match = word_variant
                       
                # print(best_match)
                best_ratio = best_ratio*100
                integers.append(best_ratio)
                curname_list.append(best_match)

            # print(f"Наиболее подходящее слово: {best_match}, процент совпадения: {best_ratio}%")
            # print(integers)
            max_number = max(integers)
            index_of_max = integers.index(max_number)
            for  l in range(len(curname_list)):
                if l != index_of_max:
                    law.append(curname_list[l])
            # print(curname_list[index_of_max])
            surname = curname_list[index_of_max]
            print(law)
            return surname, law
        with open(f"{r}/text_for_labels/{text_reg}", "r", encoding="utf-8") as f:
                text = f.read()
        # print(text)
        text_to_classify = text
        # Создайте списки для текстов и меток классов
        file = []
        date_pas = []
        date_bd = []
        code = []
        date = []
        open_json = {}
        text_to_classify = text_to_classify.split('\n')
        text_to_classify = " ".join(text_to_classify)
        text_to_classify = text_to_classify.split(' ')

        print(text_to_classify)
        for line in text_to_classify:
        
            print(line)
            if line != '':
                file.append(line)

        print(file)
        for item in file:
            if re.search(r'\d+-\d+', item):  # Проверка на наличие числа и "-"
                code.append(item)
            elif re.search(r'\d+\.\d+', item):  # Проверка на наличие числа и "."
                date.append(item)

        for j in range(len(code)):
            match = re.search(r'\d+-\d+', code[j])
            if match:
                result = match.group()
        try:
            print("Code:", result)
        except:
            result = "None"    
        for i in range(len(date)):
            date[i] = re.sub(r'[^\d.]', '', date[i])
        # print("Date:", date)
        try:
            for i in range(len(date)):
                one = date[i]
                two = date[i+1]
                one_1 = one.split('.')
                two_2 = two.split('.')
                if int(one_1[-1]) < int(two_2[-1]):
                    date_pas.append(two)
                    date_bd.append(one)
                else: 
                    date_pas.append(one)

                    date_bd.append(two)
                break
            print("Code:", result)
            x = "".join(date_pas)
            y = "".join(date_bd)
            print("Дата выдачи:", x)
            print("День рождения:", y)   
        except:
            x = "0"
            y = "1"

        issued_by = []
        full_name = []
        birth_place = []
        if result != 'None':
            with open ("labeling/static/whoissues.json", "r", encoding="utf-8") as issue_file:
                issue = json.load(issue_file)

            print(issue['data'][15]['code'])
            code_res = result.split("-")
            code_res = "".join(code_res)
            for jey  in range(len(issue['data'])):
                if code_res == issue['data'][jey]['code']:
                    issued = issue['data'][jey]['who_issue']
                    issued_by.append(issued)
                    break 
            for text in range(len(file)):
                if result not in file[text]:
                    count = text + 1
                else:
                    break
        else:
            try:
                if x != "0":
                    for text in range(len(file)):
                        if x != '':
                            if x not in file[text]:
                                issued_by.append(file[text])
                            else:
                                count = text+1
                                break 
                        else : 
                            if result not in file[text]:
                                issued_by.append(file[text])
                            else:
                                count = text+1
                                break 
                else: 
                    x = file / 154
            except:
                count = int(len(file)/4)
                for text in range(0,count):
                    issued_by.append(file[text])
        try:
            if y != "1":
                for text in range(count,len(file)):
                   if y not in file[text]:
                       full_name.append(file[text])
                   else:
                       count = text+1
                       break 
            else:
                y = file / 256
        except:
            count = int(len(file)/2)
            for text in range(int(len(file)/4), count):
                full_name.append(file[text])

        for text in range(count,len(file)):
            birth_place.append(file[text])
        issued_by = " ".join(issued_by)
        full_name = " ".join(full_name)
        birth_place = " ".join(birth_place)

        print(full_name)
        # print(open)
        words_to_remove = []
        with open("labeling/static/city.json", "r", encoding = "utf-8") as city_file: 
            city = json.load(city_file)

        birth_place = birth_place.split(" ")
        word_variants = []
        for up in city:
            word_variants.append(up.upper())
        town_birth = bd_naming(word_variants, birth_place)
        words_to_remove.append(town_birth[1])
        town_birth = town_birth[0]
        list_surname = []
        with open ("labeling/static/russian_surnames.json", "r", encoding="utf-8") as surnames_file:
            surname = json.load(surnames_file)
        for sur in range(len(surname)):
            list_surname.append(surname[sur]['Surname'])
        print(full_name)
        full_names = full_name.split(" ")
        list_sur = []

        for up in list_surname:
            list_sur.append(up.upper())
        surname = bd_naming(list_sur,full_names)
        surname = surname[0]
        with open("labeling/static/russian_names.json", "r", encoding = "utf-8") as name_files:
            name = json.load(name_files)
        list_name = []
        list_na = []
        for na in range(len(name)):
             list_name.append(name[na]['Name'])
        full_namen = full_name.split(" ")
        for up in list_name:
            list_na.append(up.upper())
        names = bd_naming(list_na, full_namen)    

        words_to_remove.append(names[1])
        names = names[0]
        print(words_to_remove)
        words = full_name.split(" ")
        print(words)
        filtered_words = [word for word in words if word not in words_to_remove[1]]
        second_name = filtered_words[-1]

        open_json = {
                "Кем выдан": issued_by,
                "Код": result,
                "Дата выдачи": x,
                "Фамлия": surname,
                "Имя": names,
                "Отчество": second_name,
                "Дата рождения": y,
                "Место Рождения":town_birth

        }  
        print(open_json)

        with open("labeling/static/text_regular.json", "w", encoding = "utf-8") as f:
              json.dump(open_json,f, ensure_ascii=False)
        return JsonResponse({"result": open_json})
    return JsonResponse({"error": "Запрос не был POST"})     







def ModelsNeyron(request):
    print("1212313123")
    if request.method == 'POST':
        text = request.FILES.get('text')
        print(text)
        json_j = request.FILES.get('json')
        print(json_j)
      
        # print()
        with open(f"{r}/text_for_labels/{json_j}", "r", encoding="utf-8") as file:
            labeled_data = json.load(file)
        with open(f"{r}/text_for_labels/{text}", "r", encoding="utf-8") as f:
            text = f.read()
        # print(text)
        text_to_classify = text
        # Создайте списки для текстов и меток классов
        file ={}
        Tag = []
        name = []
        text_list = []
        labels = []
        text_to_classify = text_to_classify.split(' ')
        # print(text_to_classify)
        for item in range(len(labeled_data)):
            text_list.append(labeled_data[item]['text'])
            labels.append(labeled_data[item]['label'])
        tfidf_vectorizer = TfidfVectorizer()
        X = tfidf_vectorizer.fit_transform(text_list)
        # Обучение модели
        model = LogisticRegression()
        model.fit(X, labels)
        for i in tqdm(range(len(text_list))):
        # Преобразование текстов в числовой формат с использованием TF-IDF
            # print(model)
            # Преобразование текста для классификации
            try:
                X_to_classify = tfidf_vectorizer.transform([text_to_classify[i]])
                # Классификация
                predicted_label = model.predict(X_to_classify)
                Tag.append(predicted_label[0])
                name.append(text_to_classify[i])
                # flet.app(target = main)
                # print(f"Предсказанная категория:{text_to_classify[i]} --- {predicted_label[0]}")
            except:
                print("range error")
                break
        file = {"Тэг": Tag, "Имя": name}
        with open ("labeling/static/result.json", "w", encoding = "utf-8") as f:
            json.dump(file,f, ensure_ascii=False)
        return JsonResponse({"result": file})
    return JsonResponse({"error": "Запрос не был POST"})
   
def result_page(request):
    
    return render(request,'labeling/result.html')