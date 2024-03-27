// form pra fazer post dos itens
var formCadastro = document.getElementById("criarItem");

formCadastro.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;

  fetch("http://localhost:8080/item/create", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      price: price,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert("Item criado com sucesso!! ;D");
      window.location.reload();
    })
    .catch((error) => console.error("Error:", error));
});

// form pra fazer get dos itens
function getItemsFromServer() {
  fetch("http://localhost:8080/item/all")
    .then((response) => response.json())
    .then((data) => {
      var container = document.getElementById("container-itens");

      data.forEach((item) => {
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        itemDiv.innerHTML = `
        <p>Item ID: ${item.id}</p>
        <p>Nome: ${item.name}</p>
        <p>Preço: ${item.price}</p>
        <hr>
      `;

        container.appendChild(itemDiv);
      });
    })
    .catch((error) => {
      console.error("Erro ao obter o nome do usuário:", error);
    });
}

document.addEventListener("DOMContentLoaded", getItemsFromServer);
