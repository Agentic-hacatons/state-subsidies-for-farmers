// Расширенные мок-данные (таблица + детали)
const mockDatabase = {
    "APP-0101": { 
        id: "APP-0101", name: "ТОО 'Агро-Алтын'", amount: "5 000 000", score: 88, recommendation: "Рекомендовано", iin: "123456789012",
        positives: [
            { text: "Рост урожайности за 3 года", val: "+18.5" },
            { text: "Отсутствие налоговых задолженностей", val: "+12.0" }
        ],
        negatives: [
            { text: "Высокая долговая нагрузка", val: "-4.2" }
        ]
    },
    "APP-0102": { 
        id: "APP-0102", name: "ИП 'Сериков и Ко'", amount: "1 200 000", score: 42, recommendation: "Группа риска", iin: "987654321098",
        positives: [
            { text: "Опыт работы в регионе", val: "+5.0" }
        ],
        negatives: [
            { text: "Просрочки по прошлым кредитам", val: "-15.0" },
            { text: "Снижение посевных площадей", val: "-10.5" }
        ]
    }
};

// Функция: Получить список всех заявок для таблицы
async function getApplicationsList() {
    // Превращаем объект в массив для таблицы
    return Object.values(mockDatabase);
}

// Функция: Получить детали конкретной заявки по ID
async function getApplicationDetails(appId) {
    return mockDatabase[appId] || null;
}
