import './ProductDetails.css'

const ProductDetails = ({ selectedProduct }) => {
  console.log(selectedProduct)
  const addToCart = () => {
    console.log(`clicked product no ${selectedProduct.id}`)
  }

  return (
    <div className="container">
      {!selectedProduct ? (
        <div>
          <h1>Product Not Found</h1>
        </div>
      ) : (
        <div className="product-details container">
          <h2 className="product-details__name">{selectedProduct.name}</h2>
          <h3 className="product-details__price">${selectedProduct.price}</h3>
          <div className="product-details__image-container">
            <img
              className="product-details__image"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>
          <p className="product-description">{selectedProduct.description}</p>
          <div className="product__purchase-options-container">
            <p className="product__purchase-option">
              for sale {selectedProduct.for_sale ? '✅' : '❌'}
            </p>
            <p className="product__purchase-option">
              for trade {selectedProduct.for_trade ? '✅' : '❌'}
            </p>
          </div>
          <div className="button-container">
            <button className="btn" onClick={addToCart}>
              add to cart
            </button>
          </div>
          <div className="product__reviews-container">
            <h2>Reviews</h2>
            {selectedProduct.reviews.map((review) => (
              <div className="product__review" key={review.id}>
                <h3>{review.title}</h3>
                <h4>{review.rating}</h4>
                <p>{review.body}</p>
                <p>{review.reviewer.username}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
