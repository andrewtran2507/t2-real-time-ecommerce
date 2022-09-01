import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap'
import { login } from 'slice/user/action'
import { AppDispatch } from 'state/store'

const Login = () => {
  const navigate = useNavigate()
  const [rSelected, setRSelected] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const [isGetCurrentData, setIsGetCurrentData] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await dispatch(login({ email, password }))
      if (localStorage.getItem('accessToken')) {
        if (rSelected === 1 && res.payload.role.name === "customer") {
          navigate('/customer')
        } else if(rSelected === 2 && res.payload.role.name === "admin") navigate('/admin')
        else alert('Something went wrong!')
      }
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const roleName = localStorage.getItem('roleName')
    if (accessToken) {
      navigate(roleName === 'admin' ? '/admin' : '/customer')
    } else {
      setIsGetCurrentData(false)
    }
  }, [])

  return (
    isGetCurrentData ? <>Loading ...</> : <div className="w-50 mt-20 container">
      <div className="d-flex flex-col justify-content-center align-items-center p-5 rounded shadow">
        <h1>Login</h1>
        <ButtonGroup className="my-5 w-80">
          <Button
            color="primary"
            outline
            onClick={() => setRSelected(1)}
            active={rSelected === 1}
          >
            Customer
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => setRSelected(2)}
            active={rSelected === 2}
          >
            Admin
          </Button>
        </ButtonGroup>
        <Form className="text-center w-100" onSubmit={(e) => handleSubmit(e)}>
          <FormGroup className="d-flex justify-content-center align-items-center">
            <Label for="exampleEmail" className="w-25 text-left">
              Email:
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              type="email"
              className="w-50 ml-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center align-items-center">
            <Label for="examplePassword" className="w-25 text-left">
              Password:
            </Label>
            <Input
              id="examplePassword"
              name="password"
              type="password"
              className="w-50 ml-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button className='w-50  mt-4' color="primary">Submit</Button>
        </Form>
      </div>
    </div>
  )
}
export default Login
