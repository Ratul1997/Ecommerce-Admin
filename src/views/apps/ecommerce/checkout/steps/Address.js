/* eslint-disable  */
// ** Utils
import { isObjEmpty } from '@utils'
import { useState, useEffect } from "react"
// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form';
import {
  Form,
  Input,
  Card,
  Label,
  FormGroup,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col
} from 'reactstrap'
import Select, { components } from "react-select"
import { onErrorToast } from '../../../../common/Toaster'
import shippingServices from '../../../../../services/shippingServices'
import userServices from '../../../../../services/userServices'
import { districtOptions, divisionOptions, countryOptions} from './constanst'
import SideBar from './SideBar'
import { useDispatch, useSelector } from "react-redux";


const Address = props => {
  // ** Props
  const { stepper, store, customerDetails, setCustomerDetails, shippingCost, setShippingCost, countTotalPrice } = props

  // ** Vars
  const { register, errors, handleSubmit, trigger } = useForm()

  const initialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    countryName: '',
    divisionName: '',
    townName: '',
    address: '',
    orderType: '',
    userId: '',
  }
  const [orderTypeOptions, setOrderTypeOptions] = useState()
  const [userOptions, setUserOptions] = useState()
  const [isLoading, setIsLoading] = useState(true)

  // ** Store Var
  const userStore = useSelector(userStore => userStore.users);
  const { allUsers } = userStore;

  //** On form submit if there are no errors then go to next step

  useEffect(() => {
    setCustomerDetails(initialState)
    getOrderTypeOption()
    getUserOptions()
  }, [])

  const getUserOptions = () => {
    let tempUserList = []
    allUsers.map(item => {
      tempUserList.push({ value: item.id, label: item.first_name});
    })
    console.log(tempUserList)
    return setUserOptions(tempUserList)
  }

  const getOrderTypeOption = async () => {
    try {
      const res = await shippingServices.getOrderTypes()
      return setOrderTypeOptions(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getShippingPrice = (shipping, city) => {
    let shipping_price = 0
    let findArea = false
    let overAllShippingPriceIfAreaNotFound = 0

    shipping.map(item => {
      if (item.shipping_type === "Flat Rate") {
        const zone = JSON.parse(item.shipping_zone)
        zone.map(z => {
          if (z === city) {
            findArea = true
            shipping_price = Math.max(shipping_price, item.shipping_rate)
          }
        })
      } else {
        shipping_price = Math.max(shipping_price, item.shipping_rate)
      }
      overAllShippingPriceIfAreaNotFound = Math.max(
        overAllShippingPriceIfAreaNotFound,
        item.shipping_rate
      )
    })
    return findArea === true ? shipping_price : overAllShippingPriceIfAreaNotFound
  }

  const onSubmit = async e => {
    e.preventDefault()
    let cartProductIds = ""

    if (store.cart) {
      store.cart.map(item => {
        if (cartProductIds === "") {
          cartProductIds = item.product_id.toString()
        } else {
          cartProductIds += ","
          cartProductIds = cartProductIds + item.product_id.toString() 
        }
      })
    }

    if (customerDetails.countryName && customerDetails.divisionName && customerDetails.townName) {
      try {
        const res = await shippingServices.getShippingCost(cartProductIds)
        setShippingCost(getShippingPrice(res.data.data, customerDetails.townName.label))
      } catch (error) {
        console.log(error)
      }
    }
    console.log(customerDetails)
  }
  
  return (
    <Form className='list-view product-checkout'  onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Add New Address</CardTitle>
          <CardText className='text-muted mt-25'>
            Be sure to check "Save" when you have finished
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label>Select or search your id:</Label>
                <Select
                  options={userOptions}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Select or Search..."
                  onChange={e => setCustomerDetails({ ...customerDetails, userId: e })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label>Order type:</Label>
                <Select
                  options={orderTypeOptions}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={e => setCustomerDetails({ ...customerDetails, orderType: e })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-Fname'>First Name:</Label>
                <Input
                  name='checkout-Fname'
                  id='checkout-Fname'
                  placeholder='John'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-Fname'] })}
                  onChange={e => setCustomerDetails({ ...customerDetails, firstName: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-Lname'>Last Name:</Label>
                <Input
                  name='checkout-Lname'
                  id='checkout-Lname'
                  placeholder='Doe'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-Lname'] })}
                  onChange={e => setCustomerDetails({ ...customerDetails, lastName: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-number'>Phone:</Label>
                <Input
                  type='number'
                  name='checkout-number'
                  id='checkout-number'
                  placeholder='01XXXXXXXXX'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-number'] })}
                  onChange={e => setCustomerDetails({ ...customerDetails, phoneNumber: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-email'>Email Address:</Label>
                <Input
                  name='checkout-email'
                  id='checkout-email'
                  placeholder='johnDoe@example.com'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-email'] })}
                  onChange={e => setCustomerDetails({ ...customerDetails, emailAddress: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-name'>Country:</Label>
                <Select
                  options={countryOptions}
                  className="react-select"
                  classNamePrefix="select"
                  //value={categoryData.parent_id}
                  onChange={e => setCustomerDetails({ ...customerDetails, countryName: e })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label>Division:</Label>
                <Select
                  options={divisionOptions}
                  className="react-select"
                  classNamePrefix="select"
                  //value={categoryData.parent_id}
                  onChange={e => setCustomerDetails({ ...customerDetails, divisionName: e })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label>Town/City:</Label>
                <Select
                  options={districtOptions}
                  className="react-select"
                  classNamePrefix="select"
                  //value={categoryData.parent_id}
                  onChange={e => setCustomerDetails({ ...customerDetails, townName: e })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
              <Label for='checkout-address'>Address:</Label>
                <Input
                  name='checkout-address'
                  id='checkout-address'
                  placeholder='Input address'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-address'] })}
                  onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <Button.Ripple 
                type='submit' 
                className='btn-next delivery-address' 
                color='primary' 
                onClick={onSubmit}
              >
                Save
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>
      </Card>
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
    </Form>
  )
}

export default Address
