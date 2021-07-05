import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import AccountDetails from './steps/AccountDetails.js'
import General from './steps/General.js'
import Inventory from './steps/Inventory.js'
import Shipping from './steps/Shipping.js'
import LinkedProducts from './steps/LinkedProducts.js'
import Attributes from './steps/Attributes.js'
import Advance from './steps/Advance.js'

const MoreInfo = () => {
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const steps = [
    {
      id: 'general',
      title: 'General',
      subtitle: '',
      content: <General stepper={stepper} type='wizard-vertical' />
    },
    {
      id: 'inventory',
      title: 'Inventory',
      subtitle: '',
      content: <Inventory stepper={stepper} type='wizard-vertical' />
    },
    {
      id: 'shipping',
      title: 'Shipping',
      subtitle: '',
      content: <Shipping stepper={stepper} type='wizard-vertical' />
    },
    
    {
      id: 'linked-products',
      title: 'Linked Products',
      subtitle: '',
      content: <LinkedProducts stepper={stepper} type='wizard-vertical' />
    },
    {
      id: 'attributes',
      title: 'Attributes',
      subtitle: '',
      content: <Attributes stepper={stepper} type='wizard-vertical' />
    },
    {
      id: 'advance',
      title: 'Advance',
      subtitle: '',
      content: <Advance stepper={stepper} type='wizard-vertical' />
    }
  ]

  return (
    <div className='vertical-wizard'>
      <Wizard
        type='vertical'
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={el => setStepper(el)}
      />
    </div>
  )
}

export default MoreInfo
