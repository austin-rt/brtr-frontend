import React from 'react'

const ProductList = ({ productsFeed }) => {
  return (
    <div className="container product-grid-container">
      {productsFeed.map((product) => (
        <div className="product__item card" key={product.id}>
          <h2 className="product__name">{product.name}</h2>
          <h3 className="product__price">${product.price}</h3>
          <div className="product__image-container">
            <img className="product__image" src={product.image} />
          </div>
          <p className="product__description">{product.description}</p>
          <p className="product__purchase-options">
            {product.for_sale && 'for sale'}
            {product.for_trade && 'for trade'}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
