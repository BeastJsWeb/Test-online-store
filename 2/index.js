window.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  const form = document.getElementById('form-search');
  const productsList = document.getElementById('products-list');
  const categotyList = document.getElementById('sidebar-list');

  form.addEventListener('submit', e => {
    e.preventDefault();
    return getProducts(search.value);
  });

  async function getProducts(query = null) {
    try {
      const res = await fetch('./products.json');
      const productsArray = await res.json();
      const queryProducts = sortProducts(productsArray, query);
      renderProducts(queryProducts);
      search.value = '';
    } catch (e) {
      console.log(e);
    }
  }

  function sortProducts(array, query) {
    return array.filter(el => {
      return el.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  function renderProducts(array) {
    productsList.innerText = '';
    categotyList.innerText = '';

    array.forEach(el => {
      const productHTML = `
        <li><a href="*">
          ${el.title}
          <img src='./img/${el.src}' width="300" height="300" alt=''/>
          ${el.price}
        </a></li>
      `;
      productsList.insertAdjacentHTML('beforeend', productHTML);

      const dublicate = categotyList.querySelector(`[data-id="${el.dataId}"]`);
      if (!dublicate) {
        const categotyHTML = `
          <li data-id='${el.dataId}'><a href="*">
            ${el.category}
            <span class='sidebar-count'>1</span>
          </a></li>
        `;
        categotyList.insertAdjacentHTML('beforeend', categotyHTML);
      } else {
        const counterElement = dublicate.querySelector('.sidebar-count');
        counterElement.innerText = parseInt(counterElement.innerText) + 1;
      }
    });
  }
});