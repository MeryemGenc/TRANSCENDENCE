
import { initializeLanguage } from './LanguageManager.js';
import { login_init } from './login/login.js';

export let g_data = null;

export async function fetchProtectedData() { // nerde çağırılacak ???
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    if (!token) {
        console.log('Kullanıcı oturum açmamış');
        return;
    }

    try {
        const response = await fetch('/api/protected/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Token'i ekliyoruz
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Kullanıcı verisi:', data);
            console.log('nick', data.username);
            console.log('lang', data.language_settings);
            // LANGUAGE
            localStorage.setItem('language', data.language_settings);
            initializeLanguage();
            g_data = data;
            
            login_init();
        } else {
            console.log('Erişim başarısız:', response.status);
        }
    } catch (error) {
        console.error('Fetch hatası:', error);
    }
}

// Fonksiyonu çağırarak veriyi alabiliriz
fetchProtectedData();


export function post_game_score(player1, player2) {
    setTimeout(() => {
        alert("player1: " + player1 + "\n" + "player2: " + player2);
        console.log("player1: " + player1 + "\n");
        console.log("player2: " + player2 + "\n");
    }, 500);
}


