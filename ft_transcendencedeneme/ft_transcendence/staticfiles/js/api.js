
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
            // console.log('fetchprotecteddata - g_data:', g_data.avatar_path);
            
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

// export async function fetchUpdateUserProfile(data) {
//     const token = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('access_token='))
//         ?.split('=')[1];

//     if (!token) {
//         console.log('Kullanıcı oturum açmamış');
//         return;
//     }

//     try {
//         const response = await fetch('/api/user/update-profile/', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Token'i ekliyoruz
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data) // Gönderilecek veriyi JSON formatında ekliyoruz
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             console.log('Güncellenmiş Kullanıcı Bilgileri:', responseData);
//             // Güncellenen verileri g_data içine eklemek için
//             g_data = { ...g_data, ...responseData };
//             // console.log("g_data - avatar: " + g_data.avatar_path);
//             // console.log("data - avatar: " + data.avatar_path);
//             // g_data.avatar_path = data.avatar_path;
//         } else {
//             console.log('Güncelleme başarısız:', response.status);
//         }
//     } catch (error) {
//         console.error('Fetch hatası:', error);
//     }

    
// }

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

        // // Eğer yeni bir avatar dosyası seçildiyse, bunu da ekliyoruz
        // if (selectedFile) {
        //     formData.append("avatar_path", selectedFile);
        // }

        const response = await fetch('/api/user/update-profile/', {
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
            // console.log("g_data - avatar: " + g_data.avatar_path);
            // console.log("data - avatar: " + data.avatar_path);
            // g_data.avatar_path = responseData.avatar_path; // Yeni avatar yolu
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
      
      setTimeout(1000);

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


  
// export async function uploadProfileImage() {
//     const input = document.getElementById('profileImageUpload');
//     const file = input.files[0];

//     if (!file) {
//         alert("Lütfen bir fotoğraf seçin.");
//         return;
//     }

//     // FormData ile dosya verisini hazırlıyoruz
//     const formData = new FormData();
//     formData.append('profile_image', file);

//     try {
//         const response = await fetch('/api/upload-profile-image/', {
//             method: 'POST',
//             credentials: 'include', // Cookie'lerin gönderilmesini sağlar
//             body: formData
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert("Fotoğraf başarıyla yüklendi.");
//         } else {
//             const errorData = await response.json();
//             console.error("Hata:", errorData);
//             alert("Fotoğraf yüklenirken bir hata oluştu.");
//         }
//     } catch (error) {
//         console.error("İstek başarısız:", error);
//         alert("Bir bağlantı hatası oluştu.");
//     }
// }



export function post_game_score(player1, player2) {
    setTimeout(() => {
        alert("player1: " + player1 + "\n" + "player2: " + player2);
        console.log("player1: " + player1 + "\n");
        console.log("player2: " + player2 + "\n");
    }, 500);
}