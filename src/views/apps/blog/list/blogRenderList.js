import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import { MessageSquare, Plus } from 'react-feather'
import Breadcrumbs from '@components/breadcrumbs'
import { useDispatch, useSelector } from "react-redux"
import blogServices from "../../../../services/blogServices"
import { addNewBlog } from '../store/actions'

import {
  CardHeader,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Button,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

import '@styles/base/pages/page-blog.scss'
import {blogData} from './blogData'

const blogRenderList = () => {
  const [data, setData] = useState(blogData)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const store = useSelector(store => store.blog)
  const { categories } = store
  const { blogs } = store

  console.log(blogs)

  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }
  const renderRenderList = () => {
    return data.map(item => {
      const renderTags = () => {
        return item.catagory.map((tag, index) => {
          return (
            <a key={index} href='/' onClick={e => e.preventDefault()}>
              <Badge
                className={classnames({
                  'mr-50': index !== item.catagory.length - 1
                })}
                color={badgeColorsArr[tag]}
                pill
              >
                {tag}
              </Badge>
            </a>
          )
        })
      }

      return (
        <Col key={item.title} md='6'>
          <Card>
            <Link to={`/pages/blog/detail/${item.id}`}>
              <CardImg className='img-fluid' src={item.img} alt={item.title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/pages/blog/detail/${item.id}`}>
                  {item.title}
                </Link>
              </CardTitle>
              <Media>
                <Avatar className='mr-50' img={item.avatar} imgHeight='24' imgWidth='24' />
                <Media body>
                  <small className='text-muted mr-25'>by</small>
                  <small>
                    <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                      {item.userFullName}
                    </a>
                  </small>
                  <span className='text-muted ml-50 mr-25'>|</span>
                  <small className='text-muted'>{item.blogPosted}</small>
                </Media>
              </Media>
              <div className='my-1 py-25'>{renderTags()}</div>
              <CardText className='blog-content-truncate'>{item.excerpt}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className='text-body mr-50' />
                  <span className='text-body font-weight-bold'>{item.comment} Comments</span>
                </Link>
                <Link className='font-weight-bold' to={`/pages/blog/detail/${item.id}`}>
                  Read More
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Blog List'
        breadCrumbParent='Pages'
        breadCrumbParent2='Blog'
        breadCrumbActive='List'
      />

      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
        <Link to="/apps/blog/edit" target="_blank">
            <Button className="mb-2" color="primary">
              <Plus size={15} />
              <span className="align-right ml-50">Add Product</span>
            </Button>
          </Link>
          <div className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
                <Row>
                  <Col sm='12'>
                    <Pagination className='d-flex justify-content-center mt-2'>
                      <PaginationItem className='prev-item'>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}></PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          4
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          5
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          6
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          7
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className='next-item'>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </div>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  )
}

export default blogRenderList
