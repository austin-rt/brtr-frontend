import ProductList from '../../components/ProductList/ProductList'
import './Cart.css'

const Cart = ({ cartItems, removeFromCart }) => {
  const subtotal = cartItems.reduce(
    (total, product) => total + product.price,
    0
  )
  return (
    <div className="cart__container">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((product, index) => (
            <div className="cart__product-container" key={product.id}>
              <div className="cart__product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart__product-image"
                />
              </div>
              <p className="cart__product-name">{product.name}</p>
              <p className="cart__product-price">
                ${product.price.toLocaleString('en-US')}
              </p>
              <div
                className="cart__product-remove"
                onClick={() => removeFromCart(index)}
              >
                x
              </div>
            </div>
          ))}
          <p className="cart__subtotal">
            subtotal: ${subtotal.toLocaleString('en-US')}
          </p>
          <div className="cart__btn-container">
            <button className="btn cart__btn">checkout</button>
          </div>
        </>
      ) : (
        <div>your cart is empty</div>
      )}
    </div>
  )
}

export default Cart
