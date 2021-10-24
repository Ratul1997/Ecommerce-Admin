// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import userServices from "../../../../services/userServices"

// ** Store & Actions
import { updateUsersList } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { onErrorToast, onSuccessToast } from '../../../common/Toaster'

const SidebarNewUsers = ({ open, toggleSidebar }) => {

  const initialState = {
    name: "",
    phonenumber: "",
    email: "",
    password: ""
  }

  // ** States
  const [role, setRole] = useState('subscriber')
  const [plan, setPlan] = useState('basic')
  const [newUser, setNewUsser] = useState(initialState)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(store => store.users)
  const { allUsers } = store
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  const postData = async () => {
    const newUserData = { ...newUser }
    try {
      const res = await userServices.addNewUser({
        name: newUserData.name,
        phonenumber: newUserData.phonenumber,
        email: newUserData.email,
        password: newUserData.password
      })
      dispatch(updateUsersList({
        id: res.data.id,
        first_name: res.data.name,
        last_name: null,
        user_name: null,
        email: res.data.email,
        phone_number: res.data.phone_number,
        address: null,
        created_date: null,
        profile_img: null,
        division: null,
        city: null,
        houseNo: null,
        landmark: null,
        postCode: null,
        country: null,
        user_role: "Customer"
      }))
      onSuccessToast("Successfully added.")
      toggleSidebar()
    } catch (error) {
      onErrorToast(error.data.message)
    }
    console.log()
  }

  // ** Function to handle form submit
  const onSubmit = e => {
    e.preventDefault()
    if (isObjEmpty(errors)) {
      postData()
    }
    // if (isObjEmpty(errors)) {
    //   toggleSidebar()
    //   dispatch(
    //     addUser({ 
    //       fullName: values['full-name'],
    //       company: values.company,
    //       role,
    //       username: values.username,
    //       country: values.country,
    //       contact: values.contact,
    //       email: values.email,
    //       currentPlan: plan,
    //       status: 'active',
    //       avatar: ''
    //     })
    //   )
    // }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='full-name'>
            Full Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='full-name'
            id='full-name'
            placeholder='John Doe'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['full-name'] })}
            onChange={e => setNewUsser({ ...newUser, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='checkout-number'>
            Phone number <span className='text-danger'>*</span>
          </Label>
          <Input
            type='number'
            name='checkout-number'
            id='checkout-number'
            placeholder='01XXXXXXXXX'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['checkout-number'] })}
            onChange={e => setNewUsser({ ...newUser, phonenumber: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>
            Email address <span className='text-danger'>*</span>
          </Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='john.doe@example.com'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
            onChange={e => setNewUsser({ ...newUser, email: e.target.value })}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='company'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Input
            name='company'
            id='company'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['company'] })}
            onChange={e => setNewUsser({ ...newUser, password: e.target.value })}
          />
        </FormGroup>
        <Button type='submit' className='mr-1' color='primary' onClick={onSubmit}>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
