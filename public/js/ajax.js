// Create Session

const createSession = (event) => {
    fetch("/sessions", {
      method: "POST",
      body: JSON.stringify({ session: event })
    })
      .then(response => response.json())
      .then((data) => {
        session.innerText = data.id
    });
};

  
  

//   const createGame = (event, id, p1, p2) => {
//     fetch(`/sessions/${id}/games`, {
//         method: "POST",
//         body: JSON.stringify({ session: event })
//       })
//         .then(response => response.json())
//         .then((data) => {
//             const playerTag1 = document.getElementById("player1-tag")
//             const playerTag2 = document.getElementById("player2-tag")
//             data.game.players[0] = p1
//             data.game.players[1] = p2
//             game.innerText = data.game.id
//             playerTag1.innerText = p1
//             playerTag2.innerText = p2
//             console.log(data.game.players);
//           });
//     };

  export { createSession }