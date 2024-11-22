const productContainer = document.querySelector(".products-container");
const companyBtns = document.querySelectorAll(".company-btn");

let filteredProduct = [...products];

const displayProducts = () => {
  if (filteredProduct.length < 1) {
    productContainer.innerHTML = `<h5>we cant find your products</h5>`;
    return;
  }

  productContainer.innerHTML = filteredProduct
    .map((product) => {
      const { title, image, price } = product;
      return `<article class="product">
        <img src=${image} class="img product-img" alt=${title}>
        <footer>
        <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
            </footer>
            </article>`;
    })
    .join("");
};
displayProducts();

// text filter

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filteredProduct = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

// button filter

const companiesContainer = document.querySelector(".companies");

const displayButtons = () => {
  const companies = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  return (companiesContainer.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn" data-id=${company}>${company}</button>`;
    })
    .join(""));
};
displayButtons();
companiesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("company-btn")) {
    if (e.target.dataset.id === "all") {
      filteredProduct = [...products];
    } else {
      filteredProduct = products.filter((product) => {
        return product.company === e.target.dataset.id;
      });
    }
  }
  searchInput.value = "";
  displayProducts();
});
