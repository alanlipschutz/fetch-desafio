function deleteResults() {
  const button = document.querySelector(".search-button");
  const contentResultsEl = document.querySelector(".results");
  button.addEventListener("click", () => (contentResultsEl.innerHTML = ""));
}

function showResults(results) {
  const contentResultsEl = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");
  // los elementos vinculados al document no los voy a iterar. solo voy a iterar los elementos que vengan de la collection

  for (const r of results) {
    // necesito de MELI: title, price, sold_quantity, condition, thumbnail,
    // recibo results que es una collection. voy a ir armando funciones para ir metiendo en el addeventlistener
    //   aca consigo el template para poder hacer function con él
    const linkEl = template.content.querySelector(".result-link");
    linkEl.href = r.permalink;
    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;
    const imgEl = template.content.querySelector(".result-item-img");
    imgEl.src = r.thumbnail;
    let conditionEl = template.content.querySelector(".result-item-condition");
    if (r.condition == "new") {
      conditionEl.textContent == "Nuevo";
    } else {
      conditionEl.textContent == "Usado";
    }
    var sellCountEl = template.content.querySelector(
      ".result-item-sell-count-num"
    );
    sellCountEl.textContent = r.sold_quantity;
    const price = template.content.querySelector(".result-item-price");
    price.textContent = r.price;

    // const imgEl = template.content.querySelector(".result-item-img");
    // imgEl.textContent.src = results[r].thumbnail;
    const clone = document.importNode(template.content, true);
    contentResultsEl.appendChild(clone);
  }
}

function main() {
  // main queda responsable de conseguir el dato (input). luego se lo deriva a showResults.
  // podría si quisiera agarrar el addEventListener y meterlo en otra función.
  const formSearchEl = document.querySelector(".search-form");
  formSearchEl.addEventListener("submit", (e) => {
    e.preventDefault();
    deleteResults();
    const palabraABuscar = e.target.search.value;
    // e.target.search.value: se refiere al evento, target es el target del evento en este caso el form
    // , search es el nombre que le di al input y luego el value es el valor de ese input
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
      .then((res) => res.json())
      .then((data) => showResults(data.results));
    //   OJO con las arrow functions. cuando devolves un sólo argumento dentro de la funcion
    // no va con los brackets {} y tampoco con el return (está implícito en la arrow function).
    // si hay mas de dos argumentos, si hay que poner brackets y el return cuando decidas devolver algo
  });
}
main();
