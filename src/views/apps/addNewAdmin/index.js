
/*eslint-disable*/
import {Fragment} from 'react'
import { Card, CardTitle,Col,Row } from 'reactstrap'
import AdminForm from './AdminForm'
const index = () => {
    return (
        <Fragment>
        <div className='app-calendar overflow-hidden border'>
          <Row noGutters>
            <Col lg={6}>
                <AdminForm />
            </Col>
            

            </Row>
            </div>
            </Fragment>

    )
}

export default index
