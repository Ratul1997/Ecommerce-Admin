/* eslint-disable  */

// ** Third Party Components
import { useState, useEffect } from "react"
import { PlusCircle } from 'react-feather'
import { Form, Label, Input, Button, Card, Col, FormGroup, CardHeader, CardTitle, CardBody, CardText, CustomInput } from 'reactstrap'
import shippingServices from '../../../../../services/shippingServices'
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster"
import SideBar from './SideBar'

const Payment = props => {
  
  //** Props */
  const {
    store,
    stepper,
    customerDetails,
    paymentSelectedMethod, 
    setPaymentSelectedMethod, 
    paymentMethodInfo, 
    setPaymentMethodInfo, 
    onlinePaymentMethod, 
    setOnlinePaymentMethod,
    countTotalPrice,
    shippingCost,
    payPhnNumber,
    setPayPhnNumber,
    payTransaction,
    setPayTransaction,
    message,
    setMessage
   } = props

  //**constant Functions */
  const getPaymentDetails = async () => {
    const res = await shippingServices.getPaymentInfo()
    setPaymentMethodInfo(res.data.results.paymentDetails)
  }

  const onPaymentMethodChange = e => {
    //Cash on delivery or online payment
    setPaymentSelectedMethod(e.target.value)
  }

  const onOnlinePaymentMethodChange = e => {
    //online payment options
    setOnlinePaymentMethod(e.target.value)
  }

  const onConfirmOrder = async e => {
    e.preventDefault()
    let fullName = customerDetails.firstName.concat(" ")
    fullName = fullName.concat(customerDetails.lastName)

    let orderItemInCart = []
    if (store.cart) {
      store.cart.map(item => {
        orderItemInCart.push({
          productId: item.product_id,
          qty: item.quantity,
          price: item.discount_price,
          variants: "",
          name: item.product_name
        })
      })
    }
    console.log(customerDetails)

    try {
      const res = await shippingServices.addCheckoutOrder({
        userId: customerDetails.userId.value,
        email: customerDetails.emailAddress,
        fullName: fullName,
        phoneNumber: customerDetails.phoneNumber,
        country: customerDetails.countryName.value,
        division: customerDetails.divisionName.label,
        city: customerDetails.townName.label,
        address: customerDetails.address,
        payOption: paymentSelectedMethod,
        payMedium: onlinePaymentMethod,
        message: message,
        payPhnNumber: payPhnNumber,
        transId: payTransaction,
        orderedItems: orderItemInCart,
        totalCost: countTotalPrice(),
        shippingCost: shippingCost,
        orderTypeId: customerDetails.orderType.value
      })
      onSuccessToast("Succesfully ordered. Thank you")
    } catch (error) {
      onErrorToast("Something went wrong")
    }
  }

  //** useEffect */
  useEffect(() => {
    getPaymentDetails()
  }, [paymentSelectedMethod])

  return (
    <Form
      className='list-view product-checkout'
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className='payment-type'>
        <Card>
          <CardHeader className='flex-column align-items-start'>
            <CardTitle tag='h4'>Payment options</CardTitle>
            <CardText className='text-muted mt-25'>Be sure to click on correct payment option</CardText>
          </CardHeader>
          <CardBody>
            <ul className='other-payment-options list-unstyled'>
              <li className='py-50'>
                <CustomInput 
                  type='radio' 
                  label='Online payment'
                  name='paymentMethod' 
                  id='payment-card'
                  value='Online payment'
                  onChange={onPaymentMethodChange}
                />
              </li>
              <li className='py-50'>
                <CustomInput 
                  type='radio' 
                  label='Cash on delivery' 
                  name='paymentMethod' 
                  id='payment-net-banking'
                  value='Cash on delivery'
                  defaultChecked={true}
                  onChange={onPaymentMethodChange}
                />
              </li>
            </ul>
            <hr />
            <div>
              {
                paymentSelectedMethod === 'Online payment' ? 
                <>
                  <CardTitle tag='h4'>Select your payment method</CardTitle>
                  <ul className="list-unstyled categories-list">
                    {paymentMethodInfo.map(item => {
                      if(item.status === 1) {
                        return (
                          <li key={item.payment_id}>
                            <CustomInput
                              type="radio"
                              id={item.payment_id}
                              label={item.payment_name}
                              name="category-radio"
                              value={item.payment_name}
                              onChange={onOnlinePaymentMethodChange}
                            />
                          </li>
                        );
                      }
                    })}
                  </ul>
                  <div className="text-center">
                    {
                      paymentMethodInfo ? paymentMethodInfo.map(item => {
                        if (item.payment_name === onlinePaymentMethod) {
                          return <div>Please Send money to this {item.payment_name} number: 0{item.payment_number}</div>
                        }
                      }) : null
                    }
                  </div>
                  <div>
                    <Col md='6' sm='12'>
                      <FormGroup className='mb-2'>
                        <Label for='checkout-number'>Your payment phone number:</Label>
                        <Input
                          type='number'
                          name='checkout-number'
                          id='checkout-number'
                          placeholder='01XXXXXXXXX'
                          onChange={e => setPayPhnNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6' sm='12'>
                      <FormGroup className='mb-2'>
                        <Label for='checkout-number'>Transaction Id:</Label>
                        <Input
                          placeholder='Transaction Id'
                          onChange={e => setPayTransaction(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </div>
                </> : 
                <Col md='6' sm='12'>
                  <FormGroup className='mb-2'>
                    <Label for='checkout-number'>Message</Label>
                    <Input
                     placeholder='Message'
                     onChange={e => setMessage(e.target.value)}
                    />
                    <Label>Make sure to type a message that contains at least 4 characters</Label>
                  </FormGroup>
                </Col>
              }
            </div>
          </CardBody>
        </Card>
      </div>
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
              onClick={onConfirmOrder}
            >
              Confirm Order
            </Button.Ripple>
          </CardBody>
        </Card>
      </div>
    </Form>
  )
}

export default Payment
