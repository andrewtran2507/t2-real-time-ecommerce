/* eslint-disable react-hooks/exhaustive-deps */
import Header from 'components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap'
import {
  filterProductList,
  getBrandList,
  getCategoryList,
  getProductColor,
  getProductList,
  placeOrder,
} from 'slice/user/action'
import { AppDispatch, useAppSelector } from 'state/store'
import ColorSelect from './components/ColorSelect'
const initialFilterState = {
  name: '',
  categoryId: '',
  branchId: '',
  productColorId: '',
}
const Customer = () => {
  const [data, setData] = useState<any>([])
  const [isToastSuccess, setIsToastSuccess] = useState(false)
  const [productColorList, setProductColorList] = useState<any>([])
  const [categoryList, setCategoryList] = useState<any>([])
  const [brandList, setBrandList] = useState<any>([])
  const [brandListCategory, setBrandListCategory] = useState<any>([])
  const [filterPayload, setFilterPayload] = useState<any>()
  const [productName, setProductName] = useState('')
  const [brandId, setBrandId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [pagesCount, setPageCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFiltered, setIsFiltered] = useState(false)
  const pageSize = 8
  const dispatch = useDispatch<AppDispatch>()
  const { loading, userInfo } = useAppSelector((state) => state.user)
  
  useEffect(() => {
    async function fetchProductList() {
      try {
        const res = await dispatch(
          getProductList({
            offset: pageSize * currentPage - pageSize,
            limit: pageSize,
          }),
        )
        setPageCount(Math.ceil(res.payload.count / pageSize))
        setData(res.payload.items)
      } catch (err) {
        console.error(err)
      }
    }
    async function fetchFilterList() {
      try {
        const res = await dispatch(
          filterProductList({
            ...initialFilterState,
            ...filterPayload,
            offset: pageSize * currentPage - pageSize,
            limit: pageSize,
          }),
        )
        setPageCount(Math.ceil(res.payload.count / pageSize))
        setData(res.payload.items)
      } catch (err) {
        console.error(err)
      }
    }

    if (!filterPayload) {
      fetchProductList()
    } else {
      fetchFilterList()
    }
  }, [currentPage, isFiltered])
  useEffect(() => {
    async function fetchProductColor() {
      try {
        const res = await dispatch(getProductColor())
        setProductColorList(res.payload.items)
      } catch (err) {
        console.error(err)
      }
    }
    async function fetchCategoryAndBrandList() {
      try {
        const res = await dispatch(getCategoryList())
        setCategoryList(res.payload.items)
      } catch (err) {
        console.error(err)
      }
      try {
        const res = await dispatch(getBrandList())
        setBrandList(res.payload.items)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategoryAndBrandList()
    fetchProductColor()
  }, [])

  // FUNCTION HANDLING
  const handleFilter = (e: any) => {
    e.preventDefault()
    if (filterPayload) {
      setIsFiltered(!isFiltered)
      setCurrentPage(1)
      setPageCount(1)
    }
  }
  const handleClickPage = (e: any, index: any) => {
    e.preventDefault()
    setCurrentPage(index)
  }
  const handlePlaceOrder = async (productId: string) => {
    try {
      await dispatch(
        placeOrder({
          user_id: userInfo.id,
          product_id: productId,
          address: '502 Phoenix Dr, Temple, TX 76504',
        }),
      )
      setIsToastSuccess(true)
    } catch (err) {
      console.error(err)
    }
  }
  const handleCategoryChange = async (e: any) => {
    setCategoryId(e.target.value)
    if (e.target.value === '') setBrandId('')
    setFilterPayload({
      ...filterPayload,
      categoryId: e.target.value,
      branchId: e.target.value === '' ? '' : brandId,
    })
    setBrandListCategory(
      brandList.filter((item: any) => item.category.id === e.target.value),
    )
  }
  
  // RENDER UI
  const renderProduct = () => {
    return (
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          <div className="flex flex-wrap">
            {data.length > 0 &&
              data.map((item: any, idx: number) => (
                <div className="w-25 p-2" key={`renderProduct${idx}`}>
                  <Card>
                    <img
                      alt="Sample"
                      style={{ objectFit: 'contain', height: '200px' }}
                      src={item.imageURL}
                      className="img img-fluid p-2"
                    />
                    <CardBody>
                      <CardSubtitle
                        style={{ height: 40 }}
                        className="mb-2 text-muted"
                        tag="h6"
                      >
                        {item.name}
                      </CardSubtitle>
                      <ColorSelect data={[item?.product_color]} />
                      <CardTitle tag="h3">${item.price} USD</CardTitle>
                      <Button
                        className="w-100"
                        color="primary"
                        onClick={() => handlePlaceOrder(item.id)}
                      >
                        Place Order
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              ))}
            {data.length === 0 && (
              <div>There is no devices have these filtered properties</div>
            )}
          </div>
        )}
        <div className="absolute right-0 bottom-0">
          <Pagination aria-label="Page navigation example" size="sm">
            <PaginationItem>
              <PaginationLink
                first
                href="#"
                onClick={(e) => handleClickPage(e, 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                previous
                onClick={(e) => handleClickPage(e, currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(pagesCount)].map((page, i) => (
              <PaginationItem active={i === currentPage - 1} key={`pagesCount${i}`}>
                <PaginationLink
                  onClick={(e) => handleClickPage(e, i + 1)}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                href="#"
                next
                onClick={(e) => handleClickPage(e, currentPage + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                last
                onClick={(e) => handleClickPage(e, pagesCount)}
              />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    )
  }
  const renderFilter = () => {
    return (
      <div className="p-3">
        <Form onSubmit={handleFilter}>
          <FormGroup>
            <Label for="productId">Product Name</Label>
            <Input
              id="productId"
              name="productName"
              value={productName}
              onChange={(e) => {
                setFilterPayload({ ...filterPayload, name: e.target.value })
                setProductName(e.target.value)
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="categoryId">Category</Label>
            <Input
              id="categoryId"
              name="category"
              type="select"
              value={categoryId}
              onChange={(e) => handleCategoryChange(e)}
            >
              <option value="" className="text-disabled">
                Choose category
              </option>
              {categoryList.map((cat: any) => (
                <option value={cat.id} key={`categoryList-${cat.id}`}>{cat.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="brandId">Brand</Label>
            <Input
              id="brandId"
              name="brand"
              value={brandId}
              type="select"
              onChange={(e) => {
                setBrandId(e.target.value)
                setFilterPayload({ ...filterPayload, branchId: e.target.value })
              }}
            >
              <option value="" className="text-disabled">
                Choose brand
              </option>
              {brandListCategory.map((brand: any) => (
                <option key={`brandListCategory-${brand.id}`} value={brand.id}>{brand.name}</option>
              ))}
            </Input>
          </FormGroup>
          <ColorSelect
            onChange={(value: string) => {
              setFilterPayload({ ...filterPayload, productColorId: value })
            }}
            data={productColorList}
            checked={filterPayload?.productColorId}
          />
          <div className="text-center mt-4">
            <Button color="primary" className="w-100">
              Search
            </Button>
          </div>
        </Form>
        <div className="absolute right-0 top-0 z-50">
          <Toast isOpen={isToastSuccess}>
            <ToastHeader
              className="text-success"
              icon="success"
              toggle={function noRefCheck() {
                setIsToastSuccess(false)
              }}
            >
              New ORDER!
            </ToastHeader>
            <ToastBody className="bg-white">
              Place order successfully!!
            </ToastBody>
          </Toast>
        </div>
      </div>
    )
  }

  return (
    <div className="h-100">
      <Header 
        pageName='Customer Page'
        role=''
        userInfo={userInfo}
      />
      <div
        style={{ height: 1, width: '100%', backgroundColor: '#0d6efd' }}
      ></div>
      <div className="d-flex h-100 mt-5">
        <div style={{ width: '20%' }} className="border-end">
          <h5 className="text-primary text-center">Search Filter</h5>
          {renderFilter()}
        </div>
        <div
          style={{ width: '80%' }}
          className="h-100 d-flex align-items-center relative"
        >
          <div className="w-100 h-100 ml-5">{renderProduct()}</div>
        </div>
      </div>
    </div>
  )
}
export default Customer
