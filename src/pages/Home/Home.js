import ProductList from '../../components/ProductList/ProductList'
import ProductModalForm from '../../components/ProductModalForm/ProductModalForm';

const Home = ({ productsFeed, chooseProduct, addToCart, editListing, deleteListing,leaveReview, modalVisibility, toggleModalVisibility, productFormState, setProductFormState, editing, putProduct }) => {
  return (
    <div className="container home__container">
      <ProductModalForm modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} productFormState={productFormState} setProductFormState={setProductFormState} editing={editing} putProduct={putProduct}/>
      <ProductList productsFeed={productsFeed} chooseProduct={chooseProduct} addToCart={addToCart} editListing={editListing} leaveReview={leaveReview} deleteListing={deleteListing} editing={editing} />
    </div>
  )
}

export default Home
