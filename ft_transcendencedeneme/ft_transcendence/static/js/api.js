
import { initializeLanguage, translate } from './LanguageManager.js';
import { login_init } from './login/login.js';

export let g_data = null;

export function set_g_data(data)
{
    g_data = data;
}

export async function fetchProtectedData() {  
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    if (!token) {
        console.log('Kullanıcı oturum açmamış');
        return;
    }

    try {
        const response = await fetch('/django/api/protected/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Kullanıcı verisi:', data);  
            localStorage.setItem('g_data', JSON.stringify(data));
            
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


export async function fetchUpdateUserProfile(data, selectedFile) {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    if (!token) {
        console.log('Kullanıcı oturum açmamış');
        return;
    }

    try {
        // FormData ile verileri ve dosyayı gönderiyoruz
        const formData = new FormData();
        formData.append("nickname", data.nickname);
        formData.append("language_settings", data.language_settings);

        const response = await fetch('/django/api/user/update-profile/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Token'i ekliyoruz
            },
            body: formData // FormData'yı gönderiyoruz
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Güncellenmiş Kullanıcı Bilgileri:', responseData);
            // Güncellenen verileri g_data içine eklemek için
            g_data = { ...g_data, ...responseData }; 
        } else {
            console.log('Güncelleme başarısız:', response.status);
        }
    } catch (error) {
        console.error('Fetch hatası:', error);
    }
}


export function post_data(nick, lang) 
{
    const updateData = {
        nickname: nick || g_data.nickname,
        // avatar_path: avatar || g_data.avatar_path,
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
      alert(translate("a_TOKEN"));
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/django/api/user/deletegdpr/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Token'ı header olarak gönderiyoruz
        },
      });
      
      setTimeout(1000);

      if (response.ok) {
        alert(translate("a_DELETE_SUCCESS"));
        // Kullanıcıyı çıkış yapmaya yönlendirebilirsiniz
      } else {
        const data = await response.json();
        alert(translate("a_DELETE_FAIL"));
      }
    } catch (error) {
      alert(translate("a_ERROR"));
    }

    
  };



export function post_game_score(player1, player2) {
    setTimeout(() => {
        alert("player1: " + player1 + "\n" + "player2: " + player2);
        console.log("player1: " + player1 + "\n");
        console.log("player2: " + player2 + "\n");
    }, 500);
}