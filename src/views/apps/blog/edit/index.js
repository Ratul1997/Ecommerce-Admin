import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Avatar from '@components/avatar'
import htmlToDraft from 'html-to-draftjs'
import { selectThemeColors } from '@utils'
import { Editor } from 'react-draft-wysiwyg'
import blogServices from "../../../../services/blogServices"
import Breadcrumbs from '@components/breadcrumbs'
import { getOptionsForStatus } from "../Constants"
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html"
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Media,
  Form,
  Label,
  Input,
  FormGroup,
  CustomInput,
  Button
} from 'reactstrap'

import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { addNewBlog } from '../store/actions'
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast
} from "../../../common/Toaster"
import { Redirect } from 'react-router'

const BlogEdit = () => {

  const initialState = {
    title: '',
    slug: '',
    images: '',
    blogContent: '',
    blogImaage: '',
    blogCategoryList: [],
    status: null, 
    id: null
  }

  const [newBlogDetails, setNewBlogDetails] = useState(initialState)
  const [isEdit, setIsEdit] = useState(false)


  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `

  const contentBlock = htmlToDraft(initialContent)
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  const editorState = EditorState.createWithContent(contentState)

  const [data, setData] = useState(),
    [title, setTitle] = useState(''),
    [slug, setSlug] = useState(''),
    [status, setStatus] = useState(''),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('banner.jpg')

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/blog/list/data/edit').then(res => {
      //setData(res.data)
      //setTitle(res.data.blogTitle)
      //setSlug(res.data.slug)
      //setBlogCategories(res.data.blogCategories)
      //setFeaturedImg(res.data.featuredImage)
      //setStatus(res.data.status)
    })
  }, [])

  const store = useSelector(store => store.blog)
  const { categories } = store
  const { blogs } = store
  const { adminId } = useSelector(store => store.auth.userData)

  const getOptions = () => {
    const options = []
    categories.filter(item => {
          options.push({ value: item.category_id, label: item.name })
      })
    return options
  }

  const slugFormat = slug => {
    return slug.replace(/\s/g, "-")
  }

  const onChangeImage = e => {
    const reader = new FileReader(),
      files = e.target.files
    setNewBlogDetails({...newBlogDetails, images : files[0].name })
    reader.onload = function () {
      setFeaturedImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onchangeCatagory = (e) => {
    setNewBlogDetails({...newBlogDetails, blogCategoryList : e })
  }

  const saveBlog = async () => {
    const blogDetails = {
      title: newBlogDetails.title,
      slug: newBlogDetails.slug,
      images: newBlogDetails.images,
      blogImaage: '', 
      blogCategoryList: newBlogDetails.blogCategoryList.map(item => item.value),
      blogContent: convertToRaw(newBlogDetails.blogContent.getCurrentContent()).blocks[0].text,
      status: newBlogDetails.status.value,
      id: adminId
    }
    console.log(blogDetails)

    try {
       const res = await blogServices.addNewBlog({
         blogDetails
       })
      dispatch(addNewBlog(blogDetails))
      onSuccessToast("Successfully added.")
      return <Redirect to = "/apps/blog/list" />
    } catch (error) {
      //onErrorToast(error.data.massage)
    }
  }

  return (
    <div className='blog-edit-wrapper'>
      <Breadcrumbs
        breadCrumbTitle='Add Blog'
        breadCrumbParent='Pages'
        breadCrumbParent2='Blog'
        breadCrumbActive='Add Blog'
      />      
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <Media>
                 {/* <Avatar className='mr-75' img={data.avatar} width='38' height='38' /> */}
                  <Media body>
                    {/*<h6 className='mb-25'>{data.userName}</h6>
                    <CardText>{data.createdTime}</CardText>*/}
                  </Media>
                </Media>
                <Form className='mt-2' onSubmit={e => e.preventDefault()}>
                  <Row>
                    <Col md='6'>
                      <FormGroup className='mb-2'>
                        <Label for='blog-edit-title'>Title</Label>
                        <Input id='blog-edit-title' 
                              value={newBlogDetails.title} 
                              onChange={e => setNewBlogDetails({
                                    ...newBlogDetails, 
                                    title : e.target.value,
                                    slug: slugFormat(e.target.value.toLowerCase())
                                  })}
                          />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup className="mb-2">
                        <Label>Category</Label>
                        <Select
                          isClearable={false}
                          theme={selectThemeColors}
                          value={newBlogDetails.blogCategoryList}
                          isMulti
                          options={getOptions()}
                          className="react-select"
                          classNamePrefix="select"
                          onChange={onchangeCatagory}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup className='mb-2'>
                        <Label for='blog-edit-slug'>Slug</Label>
                        <Input 
                          id='blog-edit-slug' 
                          value={newBlogDetails.slug} 
                          onChange={e => setNewBlogDetails({...newBlogDetails, slug : e.target.value.toLowerCase() })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup className="mb-2">
                        <Label for="blog-edit-status">Status</Label>
                        <Select
                          id="blog-edit-status"
                          isClearable={false}
                          theme={selectThemeColors}
                          value={newBlogDetails.status}
                          options={getOptionsForStatus}
                          className="react-select"
                          classNamePrefix="select"
                          onChange={data => setNewBlogDetails({
                              ...newBlogDetails,
                              status: data
                            })
                          }
                        />
                    </FormGroup>
                    </Col>
                    <Col sm='12'>
                    <FormGroup className="mb-2">
                    <Label>Short Description</Label>
                    <Editor
                      editorState={newBlogDetails.blogContent}
                      onEditorStateChange={data => setNewBlogDetails({
                          ...newBlogDetails,
                          blogContent: data
                        })
                      }
                    />
                  </FormGroup>
                    </Col>
                    <Col className='mb-2' sm='12'>
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>Featured Image</h4>
                        <Media className='flex-column flex-md-row'>
                          <img
                            className='rounded mr-2 mb-1 mb-md-0'
                            src={featuredImg}
                            alt='featured img'
                            width='170'
                            height='110'
                          />
                          <Media body>
                            <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>

                            <p className='my-50'>
                              <a href='/' onClick={e => e.preventDefault()}>
                                {`C:/fakepath/${imgPath}`}
                              </a>
                            </p>
                            <div className='d-inline-block'>
                              <FormGroup className='mb-0'>
                                <CustomInput
                                  type='file'
                                  id='exampleCustomFileBrowser'
                                  name='customFile'
                                  onChange={onChangeImage}
                                  accept='.jpg, .png, .gif'
                                />
                              </FormGroup>
                            </div>
                          </Media>
                        </Media>
                      </div>
                    </Col>
                    <Col className='mt-50'>
                      <Button.Ripple color='primary' className='mr-1' onClick={saveBlog}>
                        Save
                      </Button.Ripple>
                      <Button.Ripple color='secondary' outline>
                        Cancel
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default BlogEdit
