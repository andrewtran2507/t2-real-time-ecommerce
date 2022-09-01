import { useEffect, useState } from 'react'
import Header from 'components/Header'
import { useDispatch } from 'react-redux'
import { Toast, ToastHeader, ToastBody } from 'reactstrap'
import { orderDetailsByUser } from 'slice/user/action'
import { AppDispatch, useAppSelector } from 'state/store'
// import { setNotificationAlert } from "slice/user"


import CustomTable from './components/CustomTable'

const Admin = () => {
  const [isToastSuccess, setIsToastSuccess] = useState(false)
  const [orderDetailsByUserList, setOrderDetailsByUserList] = useState(null)
  const { loading, userInfo, notificationAlert } = useAppSelector((state) => state.user)
  const dispatch = useDispatch<AppDispatch>()


  const getOrderDetailsByUserList = async () => {
    try {
      const res = await dispatch(
        orderDetailsByUser(),
      )
      setOrderDetailsByUserList(res.payload?.items)
      console.log('res.payload?.items ', res.payload?.items);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    (async () => {
      await getOrderDetailsByUserList()
    })();
  }, [])

  useEffect(() => {
    if (!isToastSuccess && notificationAlert?.message?.id) {
      setIsToastSuccess(true);

      (async () => {
        await getOrderDetailsByUserList()
      })()
    }
  }, [notificationAlert])

  console.log('notificationAlert', notificationAlert)

  return loading ? <>Loading ....</> : (
    <div className="h-100">
      <Header 
        pageName='Customer Page'
        role='Admin'
        userInfo={userInfo}
      />
      <div
        style={{ height: 1, width: '100%', backgroundColor: '#0d6efd' }}
      ></div>
      <div className="d-flex h-100 mt-5">
        <div style={{ width: '15%' }} className="border-end">
          <h2 className="text-primary">Order</h2>
        </div>
        <div style={{ width: '85%' }} className="h-100 d-flex align-items-center relative">
          <div className="w-100 h-100 ml-5">
            <div className='absolute right-0 top-0 z-50'>
              <Toast isOpen={isToastSuccess}>
                <ToastHeader
                  className="text-success"
                  icon="success"
                  toggle={function noRefCheck() {
                    setIsToastSuccess(false)
                    // dispatch(setNotificationAlert({}))
                  }}
                >
                  Customer has place new order
                </ToastHeader>
                <ToastBody>{notificationAlert?.message?.order?.user?.name} (Customer ID: {notificationAlert?.message?.order?.user?.id}) has placed a new order</ToastBody>
              </Toast>
            </div>
            <CustomTable
              orderDetailsByUserList={orderDetailsByUserList}
              setOrderDetailsByUserList={setOrderDetailsByUserList}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Admin
