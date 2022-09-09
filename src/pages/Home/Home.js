import Header from '../../components/Header/Header'
import ProductList from '../../components/ProductList/ProductList'

const Home = ({ productsFeed }) => {
  return (
    <div className="container">
      <Header />
      <ProductList productsFeed={productsFeed} />
    </div>
  )
}

export default Home
