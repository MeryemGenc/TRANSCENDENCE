
import { initializeLanguage } from './LanguageManager.js';
import { login_init } from './login/login.js';

export let g_data = null;

export function set_g_data(data)
{
    g_data = data;
}

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
            // console.log('nick', data.username);
            // console.log('lang', data.language_settings);

            // Veriyi localStorage'a kaydediyoruz
            localStorage.setItem('g_data', JSON.stringify(data));
            
            // LANGUAGE
            localStorage.setItem('language', data.language_settings);
            initializeLanguage();
            g_data = data;
            console.log('fetchprotecteddata - g_data:', g_data.avatar_path);
            
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

export async function fetchUpdateUserProfile(data) {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    if (!token) {
        console.log('Kullanıcı oturum açmamış');
        return;
    }

    try {
        const response = await fetch('/api/user/update-profile/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Token'i ekliyoruz
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // Gönderilecek veriyi JSON formatında ekliyoruz
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Güncellenmiş Kullanıcı Bilgileri:', responseData);
            // Güncellenen verileri g_data içine eklemek için
            g_data = { ...g_data, ...responseData };
            // console.log("g_data - avatar: " + g_data.avatar_path);
            // console.log("data - avatar: " + data.avatar_path);
            // g_data.avatar_path = data.avatar_path;
        } else {
            console.log('Güncelleme başarısız:', response.status);
        }
    } catch (error) {
        console.error('Fetch hatası:', error);
    }
}


export function post_data(nick, avatar, lang) 
{
    const updateData = {
        nickname: nick || g_data.nickname,
        avatar_path: avatar || g_data.avatar_path,
        language_settings: lang || g_data.language_settings
    };
    
    fetchUpdateUserProfile(updateData);
}

// Çerezden belirli bir ismi olan değeri almak için yardımcı fonksiyon
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  
export const deleteUserAccount = async () => {
    const token = getCookie('access_token');  // JWT token'ı çerezden alıyoruz
  
    if (!token) {
      alert("Token bulunamadı! Lütfen tekrar giriş yapın.");
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/deletegdpr/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Token'ı header olarak gönderiyoruz
        },
      });
  
      if (response.ok) {
        alert("Hesap başarıyla silindi.");
        // Kullanıcıyı çıkış yapmaya yönlendirebilirsiniz
      } else {
        const data = await response.json();
        alert(`Hesap silinemedi: ${data.error || 'Bilinmeyen bir hata oluştu'}`);
      }
    } catch (error) {
      alert(`Bir hata oluştu: ${error.message}`);
    }
  };
  



export function post_game_score(player1, player2) {
    setTimeout(() => {
        alert("player1: " + player1 + "\n" + "player2: " + player2);
        console.log("player1: " + player1 + "\n");
        console.log("player2: " + player2 + "\n");
    }, 500);
}