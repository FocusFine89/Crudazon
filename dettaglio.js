// dichiarazioni generali
const container = document.getElementById("container");

const generateCard = (name, description, brand, imgUrl, price, id) => {
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  // creo e metto all'interno della card l'img del prodotto
  const image = document.createElement("img");
  image.setAttribute("src", imgUrl);
  divCard.appendChild(image);
  //   creo un card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const productName = document.createElement("h5");
  productName.classList.add("card-title");
  cardBody.appendChild(productName);
  const productDescription = document.createElement("p");
  productDescription.classList.add("card-text");
  cardBody.appendChild(productDescription);

  //   aggiungo il card body alla card
  divCard.appendChild(cardBody);
  // creazione info delle card
  const brandProduct = document.createElement("p");
  const priceProduct = document.createElement("p");
  divCard.appendChild(brandProduct);
  divCard.appendChild(priceProduct);

  const productId = document.createElement("p");
  productId.innerText = "id: " + id;
  divCard.appendChild(productId);

  const btnCardBody = document.createElement("div");
  btnCardBody.classList.add("card-body");
  divCard.appendChild(btnCardBody);

  const btnModifie = document.createElement("button");
  btnModifie.classList.add("btn", "btn-info");
  btnModifie.innerText = "Modifica";
  btnCardBody.appendChild(btnModifie);

  // inserisco l'inner text in ogni campo
  productName.innerText = name;
  productDescription.innerText = description;
  brandProduct.innerText = "Brand: " + brand;
  priceProduct.innerText = "Prezzo: " + price + " $";

  //   aggiungo tutto
  container.appendChild(divCard);
  console.log(id);
  //   funzione per mandare alla pagine Modifie cliccando il bottone
  btnModifie.addEventListener("click", (e) => {
    e.target(window.location.assign("./backOffice.html?productId=" + id));
  });
};

const params = new URLSearchParams(window.location.search);
const idUrl = params.get("productId");
const URL_API = idUrl
  ? "https://striveschool-api.herokuapp.com/api/product/" + idUrl
  : "https://striveschool-api.herokuapp.com/api/product/";

window.onload = () => {
  fetch(URL_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTk0MzdmMzA0NjAwMWFlNTlmNjYiLCJpYXQiOjE3MTI5MDg2MTEsImV4cCI6MTcxNDExODIxMX0._qhUGyQCPTYJBz-vGikhqtIxwlnBNkOJNTHZ-rILP28",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((product) => {
      generateCard(
        product.name,
        product.description,
        product.brand,
        product.imageUrl,
        product.price,
        product._id
      );
    });
};
