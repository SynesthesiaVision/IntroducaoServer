// modal no html
var openModalBtnItem = document.getElementById("openModalBtnItem");
var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];

openModalBtnItem.onclick = function () {
  modal.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

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

// add itens criados ao carrinho
let itensCarrinho = [];
let quantidadeTotalItens = 0;

function limparCarrinho() {
  const containerCarrinho = document.getElementById("container-carrinho");
  containerCarrinho.innerHTML = "";
}

function adicionarItemCarrinho(itemId, nomeItem, precoItem) {
  const index = itensCarrinho.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    itensCarrinho[index].quantidade++;
  } else {
    itensCarrinho.push({
      id: itemId,
      nome: nomeItem,
      preco: precoItem,
      quantidade: 1,
    });
  }

  quantidadeTotalItens++;

  document.getElementById("quantidade-total-itens").textContent =
    quantidadeTotalItens;
}

// função que vai realmente adicionar os itens ao carrinho (depende das 2 funções anteriores)
function carrinho(itemId, nomeItem, precoItem) {
  adicionarItemCarrinho(itemId, nomeItem, precoItem);

  limparCarrinho();

  itensCarrinho.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.nome} - Quantidade: ${
      item.quantidade
    } - Preço Total: R$${item.preco * item.quantidade}`;
    document.getElementById("container-carrinho").appendChild(itemElement);
  });
}
