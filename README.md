# FILM! — сервис онлайн-бронирования билетов в кинотеатр

Пользователь выбирает фильм, сеанс и места в зале, добавляет билеты в корзину и оформляет заказ, указав email и телефон.

Проект состоит из трёх частей:

- **Frontend** — SPA на React 18 + TypeScript. Готовый фронтенд интегрирован в проект, на нём настроены Storybook и SCSS-модули.
- **Backend** — REST API на NestJS 10 с TypeORM и PostgreSQL. Данные о фильмах и сеансах берутся из БД, заказы сохраняются в таблицу сеансов.
- **Server** — nginx: раздаёт собранный фронтенд и проксирует запросы `/api` и `/content` на backend.

## Стек

| Часть    | Технологии                                                           |
| -------- | -------------------------------------------------------------------- |
| Frontend | React 18, TypeScript, Vite, SCSS-модули, dayjs, Storybook 8, pnpm    |
| Backend  | NestJS 10, TypeORM 0.3, PostgreSQL 16, Jest, faker-js                |
| Инфра    | Docker, Docker Compose, nginx, GitHub Actions, ghcr.io, Yandex Cloud |

## Развёртывание

### Вариант 1. Локально через Docker Compose

Нужны Docker и Docker Compose.

1. Скопируйте файл с переменными окружения и заполните значения:

   ```bash
   cp .env.example .env
   ```

2. Соберите образы и запустите все сервисы (база, pgAdmin, сборка фронтенда, backend, nginx):

   ```bash
   docker compose up -d --build
   ```

3. Откройте приложение: [http://localhost](http://localhost). Backend доступен через nginx по адресу `http://localhost/api/afisha`.
4. pgAdmin доступен по адресу [http://localhost:8080](http://localhost:8080). Логин и пароль задаются в `.env` (`PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD`).

Остановить сервисы:

```bash
docker compose down
```

### Вариант 2. Запуск готовых образов

В репозитории настроена сборка образов `films_backend`, `films_frontend` и `films_server` в GitHub Actions: при push и pull request в `main` образы публикуются в `ghcr.io`. Для запуска используется `docker-compose.pub.yml`, который тянет образы `latest` из реестра:

```bash
docker compose -f docker-compose.pub.yml up -d
```

Приложение будет доступно на порту **81**.

### Запуск без Docker (разработка)

Backend (нужен запущенный PostgreSQL и `DATABASE_URL` в `.env`):

```bash
cd backend
npm install
npm run dev
```

Frontend (используется pnpm):

```bash
cd frontend
pnpm install
pnpm dev
```

Storybook для компонентов фронтенда:

```bash
cd frontend
pnpm storybook
```

## Структура проекта

```
film-react-nest/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── films/           # модуль фильмов: контроллер, сервис, репозиторий, сущности Film и Schedule, тесты
│   │   ├── order/           # модуль заказов: контроллер, сервис, репозиторий, DTO, тесты
│   │   ├── logger/          # логгеры (tskv, json, dev) и их тесты
│   │   ├── ErrorFilter.ts   # глобальный фильтр ошибок
│   │   ├── app.module.ts    # подключение TypeORM (PostgreSQL) и модулей
│   │   └── main.ts          # точка входа, префикс /api/afisha, порт 3000
│   ├── Dockerfile
│   └── package.json
├── frontend/                # React-приложение
│   ├── src/
│   │   ├── components/      # UI-компоненты с историями Storybook
│   │   ├── hooks/           # useAppState — состояние и обработчики
│   │   ├── utils/           # api.ts (клиент API), state.ts (reducer), constants.ts
│   │   └── scss/            # общие стили
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   └── nginx.conf           # раздача фронтенда и проксирование /api и /content
├── .github/workflows/
│   └── docker-image.yml     # сборка и публикация образов
├── docker-compose.yml       # локальный запуск со сборкой образов
├── docker-compose.pub.yml   # запуск готовых образов из ghcr.io
├── film.yml                 # спецификация API (OpenAPI)
└── .env.example             # шаблон переменных окружения
```

## API

Базовый путь: `/api/afisha`.

| Метод | Путь                  | Описание                                   |
| ----- | --------------------- | ------------------------------------------ |
| GET   | `/films`              | Список фильмов                             |
| GET   | `/films/:id/schedule` | Сеансы фильма, отсортированные по времени  |
| POST  | `/order`              | Оформление заказа (билеты, email, телефон) |

Полная спецификация находится в файле [film.yml](film.yml).

## Моя зона ответственности

Проект выполнен мной единолично.

- **Backend.** Разработал модульный API на NestJS: модули `films` и `order`, сервисы, репозитории, сущности TypeORM и DTO для заказа.
- **Перевод с MongoDB на PostgreSQL.** Изначально API был написан под MongoDB. Я перевёл проект на реляционную БД PostgreSQL и адаптировал работу с данными под TypeORM.
- **Тесты.** Написал тесты для контроллеров модулей `films` и `order`, а также для логгеров.
- **Интеграция фронтенда.** Подключил готовое клиентское приложение к API.
- **Docker.** Настроил контейнеризацию: Dockerfile для backend и frontend, nginx-сервер, `docker-compose.yml` для локального запуска и `docker-compose.pub.yml` для запуска готовых образов.
- **CI/CD и деплой.** Настроил сборку образов в GitHub Actions с публикацией в ghcr.io и развёртывание приложения в Yandex Cloud.




