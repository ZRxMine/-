// ۱. وقتی صفحه باز می‌شود، بلافاصله اخبار ذخیره شده را لود کن
document.addEventListener('DOMContentLoaded', loadNews);

// ۲. تابع اصلی برای انتشار خبر
function publishNews() {
    const titleInput = document.getElementById('news-title');
    const contentInput = document.getElementById('news-content');

    // بررسی اینکه فیلدها خالی نباشند
    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        alert("لطفاً عنوان و متن خبر را وارد کنید!");
        return;
    }

    // ساخت یک شیء (Object) از خبر جدید
    const newNews = {
        title: titleInput.value,
        content: contentInput.value,
        date: new Date().toLocaleString('fa-IR') // تاریخ و زمان شمسی
    };

    // دریافت لیست اخبار از حافظه مرورگر (اگر نبود، یک لیست خالی بساز)
    let newsList = JSON.parse(localStorage.getItem('myNewsDatabase')) || [];

    // اضافه کردن خبر جدید به ابتدای لیست (تا جدیدترین‌ها بالا باشند)
    newsList.unshift(newNews);

    // ذخیره دوباره لیست آپدیت شده در حافظه مرورگر
    localStorage.setItem('myNewsDatabase', JSON.stringify(newsList));

    // پاک کردن ورودی‌ها برای خبر بعدی
    titleInput.value = '';
    contentInput.value = '';

    // نمایش فوری خبر در صفحه بدون نیاز به رفرش دستی
    loadNews();
    
    alert("خبر با موفقیت منتشر شد!");
}

// ۳. تابع برای خواندن اخبار از حافظه و نمایش آن‌ها در صفحه
function loadNews() {
    const container = document.getElementById('news-container');
    
    // گرفتن اخبار از حافظه
    const newsList = JSON.parse(localStorage.getItem('myNewsDatabase')) || [];

    // اگر خبری نبود، یک پیام نمایش بده
    if (newsList.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999;">هنوز خبری منتشر نشده است.</p>';
        return;
    }

    // خالی کردن کانتینر برای جلوگیری از تکرار
    container.innerHTML = '';

    // ساختن کارت برای هر خبر
    newsList.forEach(news => {
        const card = document.createElement('div');
        card.classList.add('news-card');

        card.innerHTML = `
            <h3>${news.title}</h3>
            <p>${news.content}</p>
            <small>زمان انتشار: ${news.date}</small>
        `;

        container.appendChild(card);
    });
}
