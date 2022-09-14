import './Profile.css'

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ProductModalForm from '../../components/ProductModalForm/ProductModalForm'
import ProductList from '../../components/ProductList/ProductList';

const Profile = ({chooseProduct, modalVisibility, toggleModalVisibility, productFormState, addToCart, editListing, leaveReview, deleteListing, setProductFormState, editing, putProduct}) => {
  let { isAuthenticated, userDetails } = useContext(UserContext)
  
  const showModal = () => {
    toggleModalVisibility(true)
  }

  return (
    <div className="container profile__container">
      <ProductModalForm modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} productFormState={productFormState} setProductFormState={setProductFormState} editListing={editListing} editing={editing} putProduct={putProduct} />
      {isAuthenticated ? (
        <>
          <div className='profile__header-container'>
            <h1 className='profile__welcome'>welcome, {userDetails?.username}</h1>
            <button className='btn' onClick={showModal}>sell your stuff</button>
          </div>
          {userDetails?.products?.length > 0 ? (
          <section className="profile__listings-container">
            <h2 className='profile__section-header'>your listings</h2>
            <ProductList productsFeed={userDetails?.products} chooseProduct={chooseProduct} addToCart={addToCart} editListing={editListing} leaveReview={leaveReview} deleteListing={deleteListing} editing={editing}/>
          </section>
          ):(
          <>
          <h2 className='profile__no-active'>you have no active listings.</h2>
          </>
          )
        }
        {userDetails?.user_reviews_posted?.length > 0 ? (
            <section className="profile__user-reviews-container">
            <h2 className='profile__section-header'>your user reviews</h2>
            {userDetails?.user_reviews_posted?.map((review)=>(
              <>{review.title}</>
              ))}
          </section>
          ):(
            <>
            <h2 className='profile__no-active'>you have not reviewd any users.</h2>
          </>
          )
          }
        {userDetails?.reviewer?.length > 0 ? (
            <section className="profile__product-reviews-container">
            <h2 className='profile__section-header'>your user reviews</h2>
            {userDetails?.reviewer?.map((review)=>(
              <>{review.title}</>
              ))}
          </section>
          ):(
            <>
            <h2 className='profile__no-active'>you have not reviewd any products.</h2>
          </>
          )
          }
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

export default Profile
