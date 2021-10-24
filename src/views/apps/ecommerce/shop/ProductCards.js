// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'
import { addToCart, getAllCart } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { onErrorToast, onSuccessToast } from '../../../common/Toaster'
import { findValueInArray } from "@utils"

const ProductCards = props => {
  // ** Props
  const {
    store,
    products,
    activeView,
    getProducts,
    getCartItems,
    selected
  } = props

  const dispatch = useDispatch()
  const item_quantity = 1
  
  // ** Handle Move/Add to cart
  const handleCartBtn = (item) => {
    try {
      const index = findValueInArray(store.cart, item.product_id, "product_id")
      if (index === -1) {
        store.cart.push({...item, quantity: item_quantity})
        dispatch(addToCart(store.cart))
        onSuccessToast("Succesfully added")
      } else {
        onErrorToast("Already added to cart")
      }
    } catch (error) {
      console.log(error)
      onErrorToast("")
    }
  }
  
  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.name}>
            <div className='item-img text-center mx-auto'>
              <img className='img-fluid card-img-top' src={item.featured_img} alt={item.product_name} />
            </div>
            <CardBody>
                <div className='item-cost'>
                  <h6 className='item-price'>{item.discount_price} BDT</h6>
                </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/apps/ecommerce/product-detail/${item.slug}`}>
                  {item.product_name}
                </Link>
              </h6>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.discount_price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleCartBtn(item)} >
                <ShoppingCart className='mr-50' size={14} />
                <span>Add To Cart</span>
              </Button>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
