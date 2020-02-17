class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { myProducts: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(product) {
    product.id = new Date().getTime();
    const listProduct = this.state.myProducts.slice();
    listProduct.push(product);
    this.setState({ myProducts: listProduct });
  }

  render() {
    return React.createElement(
      "div",
      { title: "Inner Div" },
      React.createElement(
        "h1",
        { className: "headerClass" },
        " My Company Inventory "
      ),
      React.createElement(
        "h2",
        { className: "headerClass" },
        " Showing all available products "
      ),
      React.createElement("hr", null),
      React.createElement(ProductTable, { products: this.state.myProducts }),
      React.createElement(
        "h2",
        null,
        "Add a new product to the inventory"
      ),
      React.createElement("hr", null),
      React.createElement(ProductAdd, { createProduct: this.createProduct })
    );
  }
}

function ProductTable(props) {
  const productRows = props.products.map(product => React.createElement(ProductRow, { key: product.id, product: product }));

  return React.createElement(
    "div",
    null,
    React.createElement(
      "table",
      { className: "bordered-table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "th",
          null,
          "Product Name"
        ),
        React.createElement(
          "th",
          null,
          "Price"
        ),
        React.createElement(
          "th",
          null,
          "Category"
        ),
        React.createElement(
          "th",
          null,
          "Image"
        )
      ),
      React.createElement(
        "tbody",
        null,
        productRows
      )
    )
  );
}

function ProductRow(props) {
  const product = props.product;

  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      product.prod_name
    ),
    React.createElement(
      "td",
      null,
      "$",
      product.prod_price
    ),
    React.createElement(
      "td",
      null,
      product.prod_category
    ),
    React.createElement(
      "td",
      null,
      React.createElement(
        "a",
        { href: product.prod_image, target: "_blank" },
        "View"
      )
    )
  );
};

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.prodAddForm;
    const price = form.prodPrice.value;
    console.log(price.substring(1, price.length));
    const product = { prod_name: form.prodName.value, prod_price: price.substring(1, price.length), prod_category: form.prodCategory.value, prod_image: form.prodImage.value };
    this.props.createProduct(product);
    form.prodName.value = "";
    form.prodPrice.value = "$";
    form.prodImage.value = "";
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { name: "prodAddForm", onSubmit: this.handleSubmit },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "column" },
            React.createElement(
              "h4",
              { className: "addFormTitle" },
              "Product Category"
            ),
            React.createElement(
              "select",
              { name: "prodCategory" },
              React.createElement(
                "option",
                null,
                "Jeans"
              ),
              React.createElement(
                "option",
                null,
                "Shirts"
              ),
              React.createElement(
                "option",
                null,
                "Sweaters"
              ),
              React.createElement(
                "option",
                null,
                "Accessories"
              ),
              React.createElement(
                "option",
                null,
                "Jackets"
              )
            ),
            React.createElement(
              "h4",
              { className: "addFormTitle" },
              "Product Name"
            ),
            React.createElement("input", { type: "text", name: "prodName", placeholder: "Product Name" })
          ),
          React.createElement(
            "div",
            { className: "column" },
            React.createElement(
              "h4",
              { className: "addFormTitle" },
              "Product Price"
            ),
            React.createElement("input", { defaultValue: "$", type: "text", name: "prodPrice" }),
            React.createElement(
              "h4",
              { className: "addFormTitle" },
              "Image URL"
            ),
            React.createElement("input", { type: "text", name: "prodImage", placeholder: "Product Image" })
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "button",
          null,
          "Add Product"
        )
      )
    );
  }
}

const element = React.createElement(ProductList, null);

ReactDOM.render(element, document.getElementById('content'));