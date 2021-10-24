import { Card, CardBody, Button } from 'reactstrap'

const SideBar = props => {
  // ** Props
  const { 
      store,
      stepper,
      shippingCost,
      countTotalPrice
    } = props
  return (
          <>
            <div className='price-details'>
              <h6 className='price-title'>Products</h6>
              <ul className='list-unstyled'>
                {
                  store.cart ? store.cart.map(item => <li className='price-detail'>{item.product_name}</li>) : null
                }
              </ul>
            </div>
            <div className='price-details'>
              <h6 className='price-title'>Price Details</h6>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>Total MRP</div>
                  <div className='detail-amt'>{countTotalPrice()} BDT</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Shipping Cost</div>
                  <div className='detail-amt discount-amt text-success'>{shippingCost} BDT</div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt font-weight-bolder'>{countTotalPrice() + shippingCost} BDT</div>
                </li>
              </ul>
            </div>
          </>
  )
}

export default SideBar
