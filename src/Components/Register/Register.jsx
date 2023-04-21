import React , {useState}from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
let navigate = useNavigate()
const [errorReg, setErrorReg] = useState(null)



async function registerForm(values){
  setErrorReg(null)
  console.log("hello", values);
let {data} =await axios.post(`https://sticky-note-fe.vercel.app/signup`, values)
if(data.message == "success"){
  navigate("/login")
}else{
  setErrorReg(data.message)
}

}

let validationYup = Yup.object({
  first_name:Yup.string().required("first name is requied").min(5, "min chars is 5").max(10,"max char is 10"),
  last_name:Yup.string().required("last name is requied").min(5, "min chars is 5").max(10,"max char is 10"),
  email:Yup.string().required("email is requied").email(),
  password:Yup.string().required("password is requied").matches(/^[A-Z][a-z0-9]{3,9}$/,"paswword must start with upper case"),
  age:Yup.number().required("age is required").positive().integer()
})
  let formik = useFormik({
    initialValues: {
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      age:""
    },
    validationSchema: validationYup,
    onSubmit: (values)=>registerForm(values),
  });


  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto my-5">
          <h2 className="text-info">Registration Form</h2>
          {errorReg ? <div className='alert alert-danger'>{errorReg}</div> : ""}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName" className="d-block">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your First Name"
              className="form-control mb-2"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />

{formik.errors.first_name && formik.touched.first_name ? <div className='alert alert-danger'>{formik.errors.first_name}</div> : "" }
            <label htmlFor="lastName" className="d-block">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your Last Name"
              className="form-control mb-2"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.last_name && formik.touched.last_name ? <div className='alert alert-danger'>{formik.errors.last_name}</div> : "" }
  
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


             <label htmlFor="age" className="d-block">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter your Age"
              className="form-control mb-2"
              name="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? <div className='alert alert-danger'>{formik.errors.age}</div> : "" }


            <button type="submit" className="btn bg-info text-white w-100 mt-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  
  )
}
