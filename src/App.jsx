class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { myProducts: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(product) {
    product.id = new Date().getTime();
    const listProduct = this.state.myProducts.slice();
    listProduct.push(product)
    this.setState({ myProducts: listProduct });
  }

  render() {
    return (
      <div title="Inner Div">
        <h1 className="headerClass"> My Company Inventory </h1>
        <h2 className="headerClass"> Showing all available products </h2>
        <hr />
        <ProductTable products={this.state.myProducts} />
        <h2>Add a new product to the inventory</h2>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    );
  }
}

function ProductTable(props) {
  const productRows = props.products.map((product) => <ProductRow key={product.id} product={product} />);

  return (
    <div >
      <table className="bordered-table" >
        <thead>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    </div>
  );
}

function ProductRow(props) {
  const product = props.product;

  return (
    <tr>
      <td>{product.prod_name}</td>
      <td>${product.prod_price}</td>
      <td>{product.prod_category}</td>
      <td><a href={product.prod_image} target="_blank">View</a></td>
    </tr>
  );
};

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.prodAddForm
    const price = form.prodPrice.value
    console.log(price.substring(1, price.length));
    const product = { prod_name: form.prodName.value, prod_price: price.substring(1, price.length), prod_category: form.prodCategory.value, prod_image: form.prodImage.value }
    this.props.createProduct(product)
    form.prodName.value = "";
    form.prodPrice.value = "$";
    form.prodImage.value = "";
  }

  render() {
    return (
      <div>
        <form name="prodAddForm" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column">
              <h4 className="addFormTitle">Product Category</h4>
              <select name="prodCategory">
                <option >Jeans</option>
                <option >Shirts</option>
                <option >Sweaters</option>
                <option >Accessories</option>
                <option >Jackets</option>
              </select>

              <h4 className="addFormTitle">Product Name</h4>
              <input type="text" name="prodName" placeholder="Product Name" />
            </div>
            <div className="column">
              <h4 className="addFormTitle">Product Price</h4>
              <input defaultValue="$" type="text" name="prodPrice" />

              <h4 className="addFormTitle">Image URL</h4>
              <input type="text" name="prodImage" placeholder="Product Image" />
            </div>
          </div>

          <br />
          <button>Add Product</button>
        </form>
      </div>
    );
  };
}




const element = <ProductList />

ReactDOM.render(element, document.getElementById('content'));