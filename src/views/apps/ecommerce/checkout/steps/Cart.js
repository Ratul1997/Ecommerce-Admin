// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { X, Heart, Star } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'

// ** Custom Components
import NumberInput from '@components/number-input'
import { addToCart } from '../../store/actions'
import SideBar from './SideBar'


const Cart = props => {
  // ** Props
  const { 
    products, 
    stepper, 
    deleteCartItem, 
    store, 
    dispatch, 
    addToWishlist, 
    deleteWishlistItem, 
    getCartItems, 
    countTotalPrice, 
    shippingCost } = props

  // ** constants
  let total = 0

  // ** Function to convert Date
  const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  }

  // ** Funciton Function to toggle wishlist item
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getCartItems())
  }

  // ** Render cart items
  const renderCart = () => {
    return products.map(item => {
      const qty = 1
      total += (item.discount_price)
      return (
        <Card key={item.product_name} className='ecommerce-card'>
          <div className='item-img'>
            <Link to={`/apps/ecommerce/product/${item.slug}`}>
              <img className='img-fluid' src={item.featured_img} alt={item.product_name} />
            </Link>
          </div>
          <CardBody>
            <div className='item-name'>
              <h6 className='mb-0'>
                <Link to={`/apps/ecommerce/product/${item.slug}`}>{item.product_id}    {item.product_name}</Link>
              </h6>
            </div>
            <span className='text-success mb-1'>{item.inventory_status}</span>
            <div className='item-quantity'>
              <span className='quantity-title mr-50'>Qty</span>
              <NumberInput 
                value={item.quantity}
                min={1}
                max={10} 
                size='sm' 
                style={{ width: '7rem', height: '2.15rem' }} 
                store={store}
                currentItem={item}
                addToCart={addToCart}
                dispatch={dispatch}
                />
            </div>
          </CardBody>
          <div className='item-options text-center'>
            <div className='item-wrapper'>
              <div className='item-cost'>
                <h4 className='item-price'>{item.discount_price} BDT</h4>
              </div>
            </div>
            <Button className='mt-1 remove-wishlist' color='light' onClick={() => dispatch(deleteCartItem(item.product_id))}>
              <X size={14} className='mr-25' />
              <span>Remove</span>
            </Button>
          </div>
        </Card>
      )
    })
  }

  return (
    <div className='list-view product-checkout'>
      <div className='checkout-items'>{products.length ? renderCart() : <h4>Your cart is empty</h4>}</div>
      <div className='checkout-options'>
        <Card>
          <CardBody>
            <SideBar 
              stepper={stepper}
              store={store}
              shippingCost={shippingCost}
              countTotalPrice={countTotalPrice}
            />
            <Button.Ripple
              color='primary'
              classnames='btn-next place-order'
              block
              disabled={!store.products.length}
              onClick={() => stepper.next()}
            >
              Place Order
            </Button.Ripple>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
