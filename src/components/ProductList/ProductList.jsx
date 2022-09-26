import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import './ProductList.css'

const ProductList = ({
  productsFeed,
  chooseProduct,
  addToCartHandler,
  editListing,
  leaveReview,
  deleteListing
}) => {
  let { user } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <div className="product__list-container">
      {productsFeed.map((product) => (
        <div className="product__item-card" key={product.id}>
          <div
            className="product__image-container"
            onClick={() => chooseProduct(product)}
          >
            <img
              className="product__image"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div
            className="product__hero-info"
            onClick={() => chooseProduct(product)}
          >
            <h2 className="product__name">{product.name}</h2>
            <div className="product__hero-info-grid">
              <div className="product__info-left-column">
                <h3 className="product__price">
                  ${product.price.toLocaleString('en-US')}
                </h3>
              </div>
              <div className="product__info-right-column">
                <div className="product__purchase-options-container">
                  <p className="product__purchase-option">for sale ✅</p>
                  <p className="product__purchase-option">
                    for trade {product.price < 4000 ? '✅' : '❌'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button
              className="btn"
              onClick={
                user
                  ? product.seller_id !== user?.id
                    ? () => addToCartHandler(product)
                    : () => editListing(product.id)
                  : () => navigate('/login')
              }
            >
              {user
                ? product.seller_id !== user.id
                  ? 'add to cart'
                  : 'edit listing'
                : 'add to cart'}
            </button>
            <button
              className="btn btn-alt"
              onClick={
                user
                  ? product.seller_id !== user.id
                    ? () => leaveReview(product.id)
                    : () => deleteListing(product.id)
                  : () => navigate('/login')
              }
            >
              {user
                ? product.seller_id !== user.id
                  ? 'leave review'
                  : 'delete listing'
                : 'leave review'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
