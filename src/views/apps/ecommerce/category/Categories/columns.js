/* eslint-disable semi */

import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const status = {
    1: { title: 'Current', color: 'light-primary' },
    2: { title: 'Professional', color: 'light-success' },
    3: { title: 'Rejected', color: 'light-danger' },
    4: { title: 'Resigned', color: 'light-warning' },
    5: { title: 'Applied', color: 'light-info' }
  }
export const data = [
    {
        id:1,
        category_name:'Bags',
        description:'asdkjasdjkjashdkj',
        parent:2,
        count: 2
    },
    {
        id:2,
        category_name:'Bags',
        description:'asdkjasdjkjashdkj',
        parent:2,
        count: 2
    },
    {
        id:3,
        category_name:'Bags',
        description:'asdkjasdjkjashdkj asdkjasdjkja\nshdkjasdkjasdjkjashdk\njasdkjasdjkjashdkjasdkjasdjkjashdkjasdkjasdjkjashdkjasdkjasdjkjashdkjasdkjasdjkjashdkj asdkjasdjkjashdkjasdkjasdjkjashdkj',
        parent:2,
        count: 2
    },
    {
        id:4,
        category_name:'Bags',
        description:'asdkjasdjkjashdkj',
        parent:2,
        count: 2,
        date:'asd'
    }
]
export const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    minWidth: "200px"
  },
  {
    name: "Description",
    selector: "description",
    sortable: true,
    minWidth: "250px"
  },
  {
    name: "Count",
    selector: "count",
    sortable: true,
    minWidth: "150px"
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: row => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pr-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Archive size={15} />
                <span className="align-middle ml-50">Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className="align-middle ml-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    }
  }
];
