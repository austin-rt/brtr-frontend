import Header from '../../components/Header/Header'
import ProductList from '../../components/ProductList/ProductList'

const Home = ({ productsFeed, chooseProduct }) => {
  return (
    <div className="container">
      <Header />
      <ProductList productsFeed={productsFeed} chooseProduct={chooseProduct} />
    </div>
  )
}

export default Home
