// --- ЛОГИКА ДЛЯ INDEX.HTML (ТАБЛИЦА) ---
async function renderTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return; 

    // Запрашиваем данные из нашего "API"
    const data = await getApplicationsList();
    tbody.innerHTML = ''; 

    data.forEach(app => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 transition-colors cursor-pointer';
        
        // ВАЖНО: Передаем ID в URL при клике
        tr.onclick = () => window.location.href = `detail.html?id=${app.id}`;

        let scoreColor = app.score < 50 ? 'text-red-600' : app.score < 80 ? 'text-orange-500' : 'text-green-600';
        let badgeStyle = app.score < 50 ? 'bg-red-100 text-red-800 border-red-200' : app.score < 80 ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-green-100 text-green-800 border-green-200';

        tr.innerHTML = `
            <td class="px-6 py-4 text-gray-600">${app.id}</td>
            <td class="px-6 py-4 font-medium text-gray-900">${app.name}</td>
            <td class="px-6 py-4 text-gray-600">${app.amount}</td>
            <td class="px-6 py-4 text-center"><span class="text-lg font-bold ${scoreColor}">${app.score}</span></td>
            <td class="px-6 py-4"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle}">${app.recommendation}</span></td>
            <td class="px-6 py-4"><button class="text-blue-600 hover:text-blue-900 font-medium text-sm">Подробнее &rarr;</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- ЛОГИКА ДЛЯ DETAIL.HTML (КАРТОЧКА) ---
async function renderDetail() {
    // Пытаемся найти элементы страницы деталей
    const titleEl = document.querySelector('h1');
    if (!titleEl || document.getElementById('table-body')) return; // Если мы не на detail.html, прерываемся

    // Достаем ID из адресной строки (например, ?id=APP-0102)
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('id');

    // Запрашиваем детали из "API"
    const appData = await getApplicationDetails(appId);
    if (!appData) {
        titleEl.textContent = "Заявка не найдена";
        return;
    }

    // Подставляем базовые данные
    titleEl.textContent = appData.name;
    document.querySelector('.text-sm.text-gray-500.mt-1').textContent = `ИИН/БИН: ${appData.iin} • Заявка ${appData.id}`;
    document.querySelector('.text-xl.font-bold').textContent = `${appData.amount} ₸`;
    
    // Подставляем ИИ-Скор
    const scoreEl = document.querySelector('.text-4xl.font-extrabold');
    scoreEl.textContent = appData.score;
    scoreEl.className = `text-4xl font-extrabold ${appData.score < 50 ? 'text-red-600' : 'text-green-600'}`;
    
    document.querySelector('h2').textContent = appData.recommendation;

    // ВАЖНО: В реальном проекте тут нужно через JS очищать <ul> списки 
    // и вставлять appData.positives и appData.negatives через цикл forEach.
    // Но для MVP хакатона изменение заголовков и скора уже дает крутой эффект динамики!
}

// Запускаем нужную функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    renderDetail();
});
