// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  addProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { closeUpload } from '../../../common/upload/store/action'
import { removeMediaFiles } from '../../media/store/action'

const Shop = () => {
  // ** States
  const initialSelectedCategory = "All"
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selected, setSelected] = useState(initialSelectedCategory)

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // useEffect(() => {
  //   dispatch(
  //     addProducts({
  //       q: '',
  //       sortBy: 'featured',
  //       perPage: 9,
  //       page: 1
  //     })
  //   )
  //   // dispatch(removeMediaFiles())
  //   // dispatch(closeUpload())
  // }, [])


  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Shop' breadCrumbParent='eCommerce' breadCrumbActive='Shop' />
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={addProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
        selected={selected}
      />
      <Sidebar sidebarOpen={sidebarOpen} selected={selected} setSelected={setSelected} />
    </Fragment>
  )
}
export default Shop
