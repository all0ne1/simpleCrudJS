const express = require('express');
const cors = require('cors');
const routes = require('./index');
const {sequelize} = require('./models/movie')
const { requestLogger, errorHandler } = require('./middlewares');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use('/api/v1', routes);

app.use(errorHandler);

async function attemptConnection() {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно установлено.');

        // Запускаем сервер после успешного подключения к БД
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err);
        console.log('Повторная попытка подключения через 3 секунды...');
        setTimeout(attemptConnection, 3000);
    }
}

attemptConnection();


