// dichiarazioni generali
const URL_API = "https://striveschool-api.herokuapp.com/api/product/";
const row = document.getElementById("row");
const generateCard = (name, description, brand, imgUrl, price, id) => {
  const divCard = document.createElement("div");
  divCard.classList.add("card", "col-12", "col-sm-6", "col-md-3", "col-lg-2");
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
  const btnCardBody = document.createElement("div");
  btnCardBody.classList.add("card-body");
  divCard.appendChild(btnCardBody);

  const btnDetails = document.createElement("button");
  btnDetails.classList.add("btn", "btn-info");
  btnDetails.innerText = "Scopri di più";
  btnCardBody.appendChild(btnDetails);

  // inserisco l'inner text in ogni campo
  productName.innerText = name;
  productDescription.innerText = description;
  brandProduct.innerText = "Brand: " + brand;
  priceProduct.innerText = "Prezzo: " + price + " $";

  //   aggiungo tutto
  row.appendChild(divCard);

  const productId = id;
  console.log(productId);

  //   funzione per mandare alla pagine details cliccando il bottone
  btnDetails.addEventListener("click", (e) => {
    e.target(window.location.assign("./dettaglio.html?productId=" + id));
  });
};
// inizio Homepage
window.onload = () => {
  fetch(URL_API, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTk0MzdmMzA0NjAwMWFlNTlmNjYiLCJpYXQiOjE3MTI5MDg2MTEsImV4cCI6MTcxNDExODIxMX0._qhUGyQCPTYJBz-vGikhqtIxwlnBNkOJNTHZ-rILP28",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((products) => {
      products.forEach((product) => {
        generateCard(
          product.name,
          product.description,
          product.brand,
          product.imageUrl,
          product.price,
          product._id
        );
      });
    });
};

// fine Homepage
