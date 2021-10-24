// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)
  const [customerDetails, setCustomerDetails] = useState()
  const [shippingCost, setShippingCost] = useState(0)
  const [paymentSelectedMethod, setPaymentSelectedMethod] = useState()
  const [paymentMethodInfo, setPaymentMethodInfo] = useState()
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState()
  const [payPhnNumber, setPayPhnNumber] = useState()
  const [payTransaction, setPayTransaction] = useState(null)
  const [message, setMessage] = useState("")

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get Cart Items on mount
  // useEffect(() => {
  //   dispatch(getCartItems())
  // }, [])

  const countTotalPrice = () => {
    let total = 0
    if (store.cart) {
      store.cart.map(item => {
        total += (item.discount_price)
      })
    }
    return total
  }

  const steps = [
    {
      id: 'cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          store={store}
          products={store.cart}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
          shippingCost={shippingCost}
          countTotalPrice={countTotalPrice}
        />
      )
    },
    {
      id: 'Address',
      title: 'Address',
      subtitle: 'Enter Your Address',
      icon: <Home size={18} />,
      content: (
          <Address 
            stepper={stepper}
            store={store} 
            customerDetails={customerDetails}
            setCustomerDetails={setCustomerDetails}
            shippingCost={shippingCost}
            setShippingCost={setShippingCost}
            countTotalPrice={countTotalPrice}
          />
      )
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Select Payment Method',
      icon: <CreditCard size={18} />,
      content: (
          <Payment 
            store={store}
            stepper={stepper}
            customerDetails={customerDetails}
            paymentSelectedMethod={paymentSelectedMethod}
            setPaymentSelectedMethod={setPaymentSelectedMethod}
            paymentMethodInfo={paymentMethodInfo}
            setPaymentMethodInfo={setPaymentMethodInfo}
            onlinePaymentMethod={onlinePaymentMethod}
            setOnlinePaymentMethod={setOnlinePaymentMethod}
            countTotalPrice={countTotalPrice}
            shippingCost={shippingCost}
            payPhnNumber={payPhnNumber}
            setPayPhnNumber={setPayPhnNumber}
            payTransaction={payTransaction}
            setPayTransaction={setPayTransaction}
            message={message}
            setMessage={setMessage}
          />
      )
    }
  ]

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Checkout' breadCrumbParent='eCommerce' breadCrumbActive='Checkout' />
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={el => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  )
}

export default Checkout
