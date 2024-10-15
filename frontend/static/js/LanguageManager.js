let currentLanguage = 'tr'; // Varsayılan dil !!! bu da db'den alınacak.
let translations = {};

// Dil dosyasını yükleme
export async function loadLanguage(lang) {
    try {
        const response = await fetch(`static/js/multiple_language/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load language file: ${lang}`);
        }
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        applyTranslations();
        // !!! burada değiştirilen dil seçimi db atılır. 
    } catch (error) {
        console.error(error);
    }
}

// Çeviri fonksiyonu
export function translate(key) {
    return translations[key] || key;
}

// Tüm sayfada çevirileri uygula
export function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerText = translate(key);
    });
}

// Başlangıçta kaydedilmiş dili yükleme
export function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        loadLanguage(savedLanguage);
    } else {
        loadLanguage(currentLanguage);
    }
}
