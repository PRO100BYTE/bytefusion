# ByteFusion
Быстрая и отзывчивая CMS для создания интернет-магазина, написанная на ReactJS с использованием Redux, Vite.js и Firebase.

## Как запустить проект локально?
### 1. Установите зависимости
```sh
$ yarn install
```

### 2. Создайте новый проект в Firebase
Войдите в свою учетную запись Google и создайте новый проект Firebase [здесь](https://console.firebase.google.com/u/0/)

Создайте файл `.env` и добавьте следующие переменные:

```
// Пример файла конфигурации .env
// Вы должны указать свои параметры, которые можно найти в настройках вашего проекта

VITE_FIREBASE_API_KEY=aizakjgkjhsdfsgkjhdkjdkjowf
VITE_FIREBASE_AUTH_DOMAIN=yourauthdomin.firebaseapp.com
VITE_FIREBASE_DB_URL=https://yourdburl.firebaseio.com
VITE_FIREBASE_PROJECT_ID=идентификатор вашего проекта 
VITE_FIREBASE_STORAGE_BUCKET=yourstoragebucket.appspot.com
VITE_FIREBASE_MSG_SENDER_ID=43597918523958
VITE_FIREBASE_APP_ID=234598789798798fg3-034

``` 

После создания файла конфигурации и указания параметров создайте **базу данных** и **файловое хранилище**, выбрав в Firebase функции **Cloud Firestore**, **Storage**. Настройте их на использование в тестовом режиме. Обязательно настройте аутентификацию с помощью почты и пароля, выбрав в Firebase функцию **Authentication**

### 3. Запустите сервер разработки
```sh
$ yarn dev
```

---

## Сборка проекта
```sh
$ yarn build
```
