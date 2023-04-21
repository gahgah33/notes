import React , {useState}from 'react'
import styles from "./Login.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {


  let navigate = useNavigate()
const [errorLog, setErrorLog] = useState(null)



async function loginForm(values){
  setErrorLog(null)
  // console.log("hello", values);
let {data} =await axios.post(`https://sticky-note-fe.vercel.app/signin`, values)
if(data.message == "success"){
  // console.log(data);
  localStorage.setItem("userToken", data.token)
  navigate("/home")
}else{
  setErrorLog(data.message)
}

}

  let validationYup = Yup.object({
    email:Yup.string().required("email is requied").email(),
    password:Yup.string().required("password is requied").matches(/^[A-Z][a-z0-9]{3,9}$/,"paswword must start with upper case"),
  })
    let formik = useFormik({
      initialValues: {
      
        email:"",
        password:"",
      
      },
      validationSchema: validationYup,
      onSubmit: (values)=>loginForm(values),
    });
  
  return (
    <>
    <div className="container">
      <div className="w-50 mx-auto my-5">
        <h2 className="text-info">Login Form</h2>
        {errorLog ? <div className='alert alert-danger'>{errorLog}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
      
          <label htmlFor="email" className="d-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            className="form-control mb-2"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

           />
{formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : "" }

      
          <label htmlFor="password" className="d-block">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className="form-control mb-2"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : "" }


         

          <button type="submit" className="btn bg-info text-white w-100 mt-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </>
  )
}
