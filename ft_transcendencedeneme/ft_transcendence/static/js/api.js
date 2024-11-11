// Çerezden access_token'i alma işlevi
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Korunan endpoint'e fetch isteği
export async function fetchProtectedData() {
    const token = getCookie('access_token'); // Çerezden access_token'i alıyoruz

    if (!token) {
        console.log('Token bulunamadı. Lütfen giriş yapın.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/protected/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Token'ı Bearer olarak başlıkta gönderiyoruz
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Korumalı veriler:', data);
        } else {
            const errorData = await response.json();
            console.log('Hata:', errorData);
        }
    } catch (error) {
        console.error('Veri çekme hatası:', error);
    }
}

// Kullanıcı giriş yaptıktan sonra korunan veriyi çekmek için işlevi çağırın
fetchProtectedData();


  
export function post_game_score(player1, player2) {
    alert("player1: " + player1 + "\n" + "player2: " + player2);
    console.log("player1: " + player1 + "\n");
    console.log("player2: " + player2 + "\n");

    // Skorları backend'e POST isteği ile gönderiyoruz
    fetch('http://127.0.0.1:8000/game-score/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            player1: player1,
            player2: player2,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Skor başarıyla gönderildi:', data);
        console.log('Player 1:', data.player1);
        console.log('Player 2:', data.player2);
    })
    .catch(error => {
        console.error('Skor gönderme hatası:', error);
    });
}
