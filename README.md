# Book Library App

Приложение для управления библиотекой книг.  
Реализовано на **React + Redux Toolkit** (Frontend) и **Node.js + Express** (Backend).  

---

## Скриншоты


<img width="1148" height="596" alt="2025-10-03_18-42-39" src="https://github.com/user-attachments/assets/ee7d6577-fd10-4389-bf7d-11f05207505a" />


## Функционал

- Добавление книги через форму (вручную).
- Добавление случайной книги:
  - через клиент (рандом из локального списка);
  - через API (рандом из сервера).
- Удаление книги.
- Добавление книги в избранное.
- Фильтр по названию и автору.
- Подсветка совпавшего текста в фильтре.
- Отображение ошибок через уведомления (**react-toastify**).

---

## Технологии

### Frontend
- React
- Redux Toolkit
- React Redux
- Axios
- React Toastify
- [React Icons](https://react-icons.github.io/react-icons/)
- UUID для генерации уникальных ID
- Create React App (react-scripts)

### Backend
- Node.js
- Express
- CORS
- Nodemon (для разработки)

---

## Структура проекта

repository-root
┣ api # Backend на Node.js + Express
┃ ┣ index.js
┃ ┣ package.json
┣ frontend # React-приложение
┃ ┣ src
┃ ┣ package.json

## Запуск проекта

Frontend
- npm start

Backend
- npm run dev
