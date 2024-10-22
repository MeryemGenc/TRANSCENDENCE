
function get_user(url)
{
    fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log("api.js/get_user() err: " + err));
}

export function post_game_score(player1, player2) // bu score'ları database'e yolluycaz
{
    alert("player1: " + player1 + "\n" + "player2: " + player2);
    console.log("player1: " + player1 + "\n");
    console.log("player2: " + player2 + "\n");
}

get_user("/data/tmp_data_users.json");
get_user("/data/tmp_data_games.json"); // /data:  server.js te tanımlanmış path


