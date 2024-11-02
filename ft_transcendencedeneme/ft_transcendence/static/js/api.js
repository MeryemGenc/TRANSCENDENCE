
function get_user()
{
    console.log("api");
    // fetch(url)
    // .then((res) => res.json())
    // .then((data) => console.log(data))
    // .catch((err) => console.log("api.js/get_user() err: " + err));
    // fetch('http://127.0.0.1:8000/userprofiles/131154')
    // .then(response => response)
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
    fetch('http://127.0.0.1:8000/userprofiles/131154')
    .then(response => {
        // Eğer cevap başarılıysa JSON'a dönüştür
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data)) // Burada JSON verisine ulaşabilirsiniz
    .catch(error => console.error('Error:', error));


}

export function post_game_score(player1, player2) // bu score'ları database'e yolluycaz
{
    alert("player1: " + player1 + "\n" + "player2: " + player2);
    console.log("player1: " + player1 + "\n");
    console.log("player2: " + player2 + "\n");
}

get_user();
// get_user("/data/tmp_data_users.json");
// get_user("/data/tmp_data_games.json"); // /data:  server.js te tanımlanmış path


