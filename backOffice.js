const btnAdd = document.getElementById("btn-add");
const params = new URLSearchParams(window.location.search);
const idUrl = params.get("productId");
const URL_API = idUrl
  ? "https://striveschool-api.herokuapp.com/api/product/" + idUrl
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = idUrl ? "PUT" : "POST";
window.onload = () => {
  const backOfficeForm = document.getElementById("Form-backoffice");
  const backOfficeName = document.getElementById("Name-product");
  const backOfficeDesc = document.getElementById("Description-product");
  const backOfficeBrand = document.getElementById("Brand-product");
  const backOfficeImage = document.getElementById("Image-product");
  const backOfficePrice = document.getElementById("Price-product");

  // const product = {
  //   name: backOfficeName.value,
  //   description: backOfficeDesc.value,
  //   brand: backOfficeBrand.value,
  //   imageUrl: backOfficeImage.value,
  //   price: backOfficePrice.value,
  // };

  if (idUrl) {
    btnAdd.innerText = "Modifica";
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger");
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("id", "btn-delete");
    btnDelete.innerText = "Elimina";
    backOfficeForm.appendChild(btnDelete);

    // funzione delete del bottone
    btnDelete.onclick = () => {
      fetch(URL_API, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTk0MzdmMzA0NjAwMWFlNTlmNjYiLCJpYXQiOjE3MTI5MDg2MTEsImV4cCI6MTcxNDExODIxMX0._qhUGyQCPTYJBz-vGikhqtIxwlnBNkOJNTHZ-rILP28",
        },
      });
    };
    // fine funzione delete del bottone

    // codice di visualizazzione campi
    fetch(URL_API, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTk0MzdmMzA0NjAwMWFlNTlmNjYiLCJpYXQiOjE3MTI5MDg2MTEsImV4cCI6MTcxNDExODIxMX0._qhUGyQCPTYJBz-vGikhqtIxwlnBNkOJNTHZ-rILP28",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        backOfficeName.value = data.name;
        backOfficeDesc.value = data.description;
        backOfficeBrand.value = data.brand;
        backOfficeImage.value = data.imageUrl;
        backOfficePrice.value = data.price;
      });
    // fine codice visualizzazione campi
    backOfficeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const product = {
        name: backOfficeName.value,
        description: backOfficeDesc.value,
        brand: backOfficeBrand.value,
        imageUrl: backOfficeImage.value,
        price: backOfficePrice.value,
      };
      fetch(URL_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTk0MzdmMzA0NjAwMWFlNTlmNjYiLCJpYXQiOjE3MTI5MDg2MTEsImV4cCI6MTcxNDExODIxMX0._qhUGyQCPTYJBz-vGikhqtIxwlnBNkOJNTHZ-rILP28",
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nella fetch");
          }
        })
        .then((prodModified) => {})

        .catch((err) => console.log(err));
    });
  } else {
    backOfficeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      //   code here
      const product = {
        name: backOfficeName.value,
        description: backOfficeDesc.value,
        brand: backOfficeBrand.value,
        imageUrl: backOfficeImage.value,
        price: backOfficePrice.value,
      };

      fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTk0MzdmMzA0NjAwMWFlNTlmNjYiLCJpYXQiOjE3MTI5MDg2MTEsImV4cCI6MTcxNDExODIxMX0._qhUGyQCPTYJBz-vGikhqtIxwlnBNkOJNTHZ-rILP28",
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (response.ok) {
            console.log("tutto ok");
            console.log(response);
          } else {
            throw new Error("Errore nella fetch");
          }
        })

        .catch((err) => console.log(err));
    });
  }
};
