import './ProductModalForm.css'
import axios from "axios";
import { useContext } from "react";
import UserContext from '../../context/UserContext'
import { BASE_URL } from "../../services/api";
import { useNavigate } from 'react-router-dom';

const ProductModalForm = ({setProductFormState, modalVisibility, toggleModalVisibility, productFormState, editing, putProduct}) => {
  let { user, getProducts, getUserById } = useContext(UserContext)
  const navigate = useNavigate()

  const handleModalChange = (e) => {
    const { id, value } = e.target
    setProductFormState({ ...productFormState, [id]: value })
  }
  
  const closeModal = (e) => {
    e.preventDefault()
    toggleModalVisibility(false)
  }

  const postProduct = async (e, data) => {
    e.preventDefault()
    try {
        const res = await axios.post(`${BASE_URL}/products/${user.id}`, data);
        toggleModalVisibility(false)
        getProducts()
        getUserById()
        navigate('/profile')
        return res.data;
      } catch (error) {
          throw error;
        }
      };
      
  if (!modalVisibility) return null
  
  return (
    <div className='product-modal__container'>
    <div className='product-modal__form-container'>
      <form className='product-modal__form' onSubmit={ editing ? (
        (e)=>{putProduct(e, productFormState)}  
        ):(
        (e)=>{postProduct(e,
          {
            ...productFormState,
            seller_id: user.id
          }
          )}
        )}>
            <input
              type="name"
              id="name"
              placeholder="product name"
              value={productFormState?.name}
              onChange={handleModalChange}
            />
            <input
              type="number"
              step="0.1"
              min="0"
              id="price"
              placeholder="price"
              value={productFormState?.price}
              onChange={handleModalChange}
            />
            <input
              type="text"
              id="image"
              placeholder="image url"
              value={productFormState?.image}
              onChange={handleModalChange}
            />
            <textarea
              id="description"
              placeholder="description"
              value={productFormState?.description}
              onChange={handleModalChange}
            />
            <div className='product-modal__form-buttons-container'>
              <button className='btn'>{ editing ? ( 'update' ):( 'submit' ) } </button>
              <button className='btn btn-alt product-modal__close-btn' onClick={closeModal}>close</button>
            </div>
      </form>
    </div>
    </div>
  )
}

export default ProductModalForm