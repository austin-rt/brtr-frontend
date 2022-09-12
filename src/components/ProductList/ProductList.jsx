import './ProductList.css'

const ProductList = ({ productsFeed, chooseProduct }) => {
  return (
    <div className="product__list-container">
      {productsFeed.map((product) => (
        <div className="product__item-card" key={product.id}>
          <div className="product__hero-info">
            <div classname="product__info-left-column">
              <h2 className="product__name">{product.name}</h2>
              <h3 className="product__price">${product.price}</h3>
            </div>
            <div classname="product__info-right-column">
              <div className="product__purchase-options-container">
                <p className="product__purchase-option">
                  for sale {product.for_sale ? '✅' : '❌'}
                </p>
                <p className="product__purchase-option">
                  for trade {product.for_trade ? '✅' : '❌'}
                </p>
              </div>
            </div>
          </div>
          <div className="product__image-container">
            <img
              className="product__image"
              onClick={() => chooseProduct(product)}
              src={product.image}
            />
          </div>
          <p className="product__description">{product.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
