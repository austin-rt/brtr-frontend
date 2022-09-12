import ProductList from '../../components/ProductList/ProductList'

const Home = ({ productsFeed, chooseProduct }) => {
  return (
    <div className="container">
      <ProductList productsFeed={productsFeed} chooseProduct={chooseProduct} />
    </div>
  )
}

export default Home
