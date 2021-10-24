import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import { MessageSquare, Plus, Edit2, Trash } from 'react-feather'
import Breadcrumbs from '@components/breadcrumbs'
import { useDispatch, useSelector } from "react-redux"
import blogServices from "../../../../services/blogServices"
import { addNewBlog, removeABlog} from '../store/actions'
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast
} from "../../../common/Toaster"
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

const BlogList = () => {
  const [data, setData] = useState(blogData)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const store = useSelector(store => store.blog)
  const { categories } = store
  const { blogs } = store
  
  console.log(blogs)

  const load = async () => {
    setIsLoading(true)
    try {
      const res = await blogServices.getAllBlogs()
      dispatch(addNewBlog(res.data.results))
    } catch (err) {
      console.log(err)
      //onErrorToast(err.data.massage);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [dispatch])

  const onDelete = item => async e => {
    e.preventDefault()
    
    try {
      const res = await blogServices.removeBlog(item.blog_id)
      dispatch(removeABlog(item))
      console.log(item.blog_id)
      onSuccessToast("Successfully removed.")
    } catch (error) {
      console.log(error)
      onErrorToast(error.massage)
      // alert("Something Went Wrong")
    }
  }

  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }
  const renderRenderList = () => {
    return blogs.map(item => {
      const renderTags = () => {
        return item.catagory.map((index, tag) => {
          return (
            <a key={index} href='/' onClick={e => e.preventDefault()}>
              <Badge
                className={classnames({
                  'mr-50': index !== item.catagory.length - 1
                })}
                //color={badgeColorsArr[tag]}
                pill
              >
                {index.category_name}
              </Badge>
            </a>
          )
        })
      }

      return (
        <Col key={item.title} md='6'>
          <Card>
            <Link to={`/pages/blog/detail/${item.blog_id}`}>
              <CardImg className='img-fluid' src={require('@src/assets/images/slider/02.jpg').default} alt={item.title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/pages/blog/detail/${item.blog_id}`}>
                  {item.title}
                </Link>
              </CardTitle>
              <Media>
               {/* <Avatar className='mr-50' img={item.avatar} imgHeight='24' imgWidth='24' /> */}
                <Media body>
                  <small className='text-muted mr-25'>by</small>
                  <small>
                    <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                      {item.username}
                    </a>
                  </small>
                  <span className='text-muted ml-50 mr-25'>|</span>
                  <small className='text-muted'>{item.updated_at}</small>
                </Media>
              </Media>
              <div className='my-1 py-25'>{renderTags()}</div>
              <CardText className='blog-content-truncate'>{item.content}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <Button.Ripple
                    className="btn-icon rounded-circle mr-50"
                    color="primary">
                    <Edit2 size={13} />
                  </Button.Ripple>
                  <Button.Ripple
                    className="btn-icon rounded-circle"
                    color="warning"
                    onClick={onDelete(item)}>
                    <Trash size={13} />
                  </Button.Ripple>
                </div>
                <Link className='font-weight-bold' to={`/pages/blog/detail/${item.blog_id}`}>
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
                <Row>{ blogs.length ? renderRenderList() : "No blogs to show"}</Row>
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

export default BlogList
