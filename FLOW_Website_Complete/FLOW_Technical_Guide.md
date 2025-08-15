# 📋 ПОЛНОЕ ТЕХНИЧЕСКОЕ РУКОВОДСТВО САЙТА FLOW

## 🌐 **1. ПОРТИРОВАНИЕ САЙТА НА СВОЙ ДОМЕН**

### **ВАРИАНТ A: БЫСТРОЕ РАЗВЕРТЫВАНИЕ (Рекомендуется)**

#### **Vercel (Лучший выбор для React)**
1. **Подготовка файлов:**
   ```bash
   # Скачайте папку flow-agency-platform с GitHub или получите архив
   cd flow-agency-platform
   ```

2. **Развертывание на Vercel:**
   - Зайдите на https://vercel.com
   - Зарегистрируйтесь/войдите в аккаунт
   - Нажмите "New Project"
   - Загрузите папку `flow-agency-platform` или подключите GitHub
   - Vercel автоматически определит React-проект
   - Нажмите "Deploy"

3. **Подключение домена:**
   - В панели Vercel откройте проект
   - Перейдите в "Settings" → "Domains"
   - Нажмите "Add Domain"
   - Введите ваш домен (например: flowconsulting.com)
   - Следуйте инструкциям по настройке DNS записей

#### **Netlify (Альтернатива)**
1. **Развертывание:**
   - Зайдите на https://netlify.com
   - Перетащите папку `dist` (готовую сборку) в область деплоя
   - Или подключите GitHub репозиторий

2. **Настройка домена:**
   - В панели проекта: "Domain management" → "Add custom domain"
   - Настройте DNS записи у вашего регистратора

### **ВАРИАНТ B: VPS/СЕРВЕР**

#### **Nginx + сервер (Полный контроль)**
1. **Подготовка сервера:**
   ```bash
   # Установка Nginx
   sudo apt update
   sudo apt install nginx
   
   # Копирование файлов сайта
   sudo cp -r dist/* /var/www/your-domain.com/
   ```

2. **Настройка Nginx:**
   ```nginx
   # /etc/nginx/sites-available/your-domain.com
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       root /var/www/your-domain.com;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **SSL сертификат:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## ⚙️ **2. АДМИНИСТРАТИВНАЯ ПАНЕЛЬ УПРАВЛЕНИЯ**

### **ТЕКУЩЕЕ СОСТОЯНИЕ:**
Сейчас сайт статический (без административной панели). Данные хранятся в файлах.

### **ВАРИАНТЫ РЕШЕНИЯ:**

#### **ВАРИАНТ A: CMS ИНТЕГРАЦИЯ (Рекомендуется)**

##### **Strapi CMS (Лучший выбор)**
1. **Установка:**
   ```bash
   npx create-strapi-app@latest flow-cms
   cd flow-cms
   npm run develop
   ```

2. **Настройка моделей данных:**
   - Reports (Отчеты): title, description, price, category, region
   - Company Info: contact, achievements, expertise
   - Services: title, description, features

3. **Интеграция с сайтом:**
   ```javascript
   // Замена статических данных на API вызовы
   const reports = await fetch('http://your-cms.com/api/reports').then(r => r.json());
   ```

##### **Sanity CMS (Альтернатива)**
- Более простая интеграция
- Визуальный редактор контента
- Реального времени обновления

#### **ВАРИАНТ B: ПРОСТОЕ УПРАВЛЕНИЕ ФАЙЛАМИ**

##### **GitHub + Actions (Бесплатно)**
1. **Создание GitHub репозитория:**
   - Загрузите код сайта в GitHub
   - Настройте GitHub Actions для автодеплоя

2. **Редактирование через GitHub:**
   - Изменения в `public/data/reports.json` → автоматическое обновление сайта
   - Простой интерфейс редактирования

##### **Forestry/TinaCMS (Простая CMS)**
- Подключается к GitHub
- Предоставляет веб-интерфейс для редактирования
- Автоматически сохраняет изменения в репозиторий

#### **ВАРИАНТ C: ПОЛНАЯ CMS СИСТЕМА**

##### **WordPress Headless**
1. **Настройка WordPress:**
   - Установите WordPress как API backend
   - Используйте REST API для получения данных

2. **Интеграция:**
   ```javascript
   // Получение отчетов из WordPress
   const reports = await fetch('https://your-wp.com/wp-json/wp/v2/reports');
   ```

---

## 🔧 **3. ВНЕСЕНИЕ ИЗМЕНЕНИЙ В САЙТ**

### **СТРУКТУРА ПРОЕКТА:**
```
flow-agency-platform/
├── public/
│   └── data/
│       └── reports.json          # 📊 Данные отчетов
├── src/
│   ├── data/
│   │   └── company.ts           # 🏢 Информация о компании
│   ├── components/              # 🧩 Компоненты сайта
│   └── pages/                   # 📄 Страницы сайта
```

### **A. ДОБАВЛЕНИЕ НОВЫХ ОТЧЕТОВ**

#### **Способ 1: Редактирование файла (Простой)**
```json
// public/data/reports.json
{
  "id": "new-report-001",
  "title": "Новый отчет о рынке ИИ 2024",
  "shortDescription": "Краткое описание отчета...",
  "description": "Полное описание отчета...",
  "price": 4200,
  "category": "Technology",
  "region": "Global",
  "type": "Market Analysis",
  "pages": 85,
  "date": "2024-12-15",
  "image": "/images/ai-report-2024.jpg",
  "keyInsights": [
    "Рост рынка ИИ на 45% в 2024 году",
    "Новые тренды в машинном обучении"
  ],
  "featured": true
}
```

#### **Способ 2: Через CMS (После настройки)**
1. Зайдите в админ-панель CMS
2. Перейдите в раздел "Reports"
3. Нажмите "Create New"
4. Заполните поля и сохраните
5. Сайт обновится автоматически

### **B. ИЗМЕНЕНИЕ ИНФОРМАЦИИ О КОМПАНИИ**

#### **Редактирование данных:**
```typescript
// src/data/company.ts
export const companyInfo = {
  name: 'FLOW',
  description: 'Новое описание компании...',
  expertise: [
    'Новая область экспертизы...',
    // Добавляйте новые области
  ],
  achievements: [
    {
      metric: '600+',  // Обновляйте цифры
      description: 'Completed Studies'
    }
  ]
};
```

### **C. ОБНОВЛЕНИЕ ДИЗАЙНА И КОМПОНЕНТОВ**

#### **Изменение стилей:**
```css
/* src/index.css - глобальные стили */
/* Tailwind CSS классы в компонентах */
```

#### **Модификация компонентов:**
```tsx
// src/components/ReportCard.tsx
// Изменение отображения карточек отчетов

// src/pages/HomePage.tsx  
// Изменение главной страницы
```

### **D. ПРОЦЕСС ОБНОВЛЕНИЯ САЙТА**

#### **Локальная разработка:**
```bash
# 1. Внесите изменения в код
# 2. Проверьте локально
npm run dev

# 3. Соберите проект
npm run build

# 4. Разверните обновления
# Vercel: git push (автоматический деплой)
# Netlify: перетащите папку dist
# VPS: скопируйте dist на сервер
```

#### **Автоматизация через GitHub:**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./dist
```

---

## 🚀 **РЕКОМЕНДУЕМЫЙ ПЛАН ВНЕДРЕНИЯ**

### **ЭТАП 1: Быстрый старт (1-2 дня)**
1. Разверните сайт на Vercel/Netlify
2. Подключите свой домен
3. Настройте SSL сертификат

### **ЭТАП 2: Система управления (1-2 недели)**
1. Настройте GitHub репозиторий
2. Внедрите простую CMS (Strapi/Sanity)
3. Создайте админ-панель для управления отчетами

### **ЭТАП 3: Автоматизация (1 неделя)**
1. Настройте автоматический деплой
2. Создайте бэкапы данных
3. Добавьте мониторинг сайта

### **ЭТАП 4: Развитие (постоянно)**
1. Добавляйте новые отчеты через CMS
2. Обновляйте дизайн по необходимости
3. Анализируйте статистику посещений

---

## 📞 **ТЕХНИЧЕСКАЯ ПОДДЕРЖКА**

### **Что вам понадобится:**
- **Домен:** Купите у любого регистратора (GoDaddy, Namecheap)
- **Хостинг:** Vercel (бесплатно) или VPS (~$5-20/месяц)
- **CMS:** Strapi (бесплатно) или Sanity (~$20/месяц)
- **Разработчик:** Для сложных изменений (~$50-100/час)

### **Файлы для разработчика:**
- Весь исходный код в папке `flow-agency-platform/`
- Техническая документация в этом файле
- Примеры данных в `public/data/reports.json`

**Сайт готов к профессиональному использованию и легко масштабируется!**
