import { useContext } from 'react'
import ProductModalForm from '../../components/ProductModalForm/ProductModalForm'
import UserContext from '../../context/UserContext'
import './ProductDetails.css'

const ProductDetails = ({
  selectedProduct,
  addToCart,
  editListing,
  leaveReview,
  deleteListing,
  modalVisibility,
  toggleModalVisibility,
  productFormState,
  setProductFormState,
  editing,
  putProduct
}) => {
  let { user } = useContext(UserContext)

  return (
    <div className="container product-details__container">
      <ProductModalForm
        modalVisibility={modalVisibility}
        toggleModalVisibility={toggleModalVisibility}
        productFormState={productFormState}
        setProductFormState={setProductFormState}
        editListing={editListing}
        editing={editing}
        putProduct={putProduct}
      />
      {!selectedProduct ? (
        <div>
          <h1>Product Not Found</h1>
        </div>
      ) : (
        <div className="product-details">
          <div className="product-details__hero-info-grid-container">
            <div className="product-details__hero-info-left-column">
              <h2 className="product-details__name">{selectedProduct?.name}</h2>
              <h2 className="product-details__price">
                ${selectedProduct?.price?.toLocaleString('en-US')}
              </h2>
            </div>
            <div className="product__purchase-options-container product-details__hero-info-right-column">
              <p className="product__purchase-option">for sale ✅</p>
              <p className="product__purchase-option">
                for trade {selectedProduct?.price < 4000 ? '✅' : '❌'}
              </p>
            </div>
          </div>
          <div className="product-details__image-container">
            <img
              className="product-details__image"
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
            />
          </div>
          <div className="product-details__description-container">
            <h2>seller description:</h2>
            <p className="product-details__description">
              {selectedProduct?.description}
            </p>
          </div>
          <div className="button-container">
            <button
              className="btn"
              onClick={
                selectedProduct?.seller_id !== user?.id
                  ? () => addToCart(selectedProduct?.id)
                  : () => editListing(selectedProduct?.id)
              }
            >
              {selectedProduct?.seller_id !== user?.id
                ? 'add to cart'
                : 'edit listing'}
            </button>
            <button
              className="btn btn-alt"
              onClick={
                selectedProduct?.seller_id !== user?.id
                  ? () => leaveReview(selectedProduct?.id)
                  : () => deleteListing(selectedProduct?.id)
              }
            >
              {selectedProduct?.seller_id !== user?.id
                ? 'leave review'
                : 'delete listing'}
            </button>
          </div>
          <h2 className="product__reviews-header">Reviews</h2>
          <div className="product__reviews-container">
            {selectedProduct?.product_reviews?.map((review) => (
              <div className="product__review" key={review.id}>
                <div className="product__review-hero-content">
                  <h3 className="product__review-title">{review.title}</h3>
                  <h3 className="product__review-rating">
                    rating: {review.rating}/5
                  </h3>
                </div>
                <p className="product__review-body">{review.body}</p>
                <p className="product__review-reviewer">
                  -{review.reviewer?.username}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
