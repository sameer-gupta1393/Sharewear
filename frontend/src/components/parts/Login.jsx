import React, { useEffect ,useRef} from 'react'
import { useNavigate  } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import "./login.css"
import { addUser } from '../utils/userSlice';
const Login = ( ) => {
  const name1=useRef(null);
  const email1=useRef(null);
  const password1=useRef(null);
  const confirmPass=useRef(null);
  const email2=useRef(null);
  const password2=useRef(null);
  const dispatch=useDispatch();
  
  const navigate=useNavigate();
  
  const handleClick=async ()=>{
       
    let result =await fetch('/api/login',{
      method:'post',
      body:JSON.stringify({email:email2.current.value,password:password2.current.value}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result=await result.json();

    console.log(result)
    if(result.name){
      localStorage.setItem('user',JSON.stringify(result))
      console.log("result",result)
      dispatch(addUser({name:result.name,email:result.email,id:result._id}))
      navigate("/ ")
      
    }else{
      alert("please enter correct details")
    }
}
  const collectData=async ()=>{
      console.log( name1.current.value,email1.current.value,password1.current.value)
      let result=await fetch('/api/register',{
        method:'post',
        body:JSON.stringify({name:name1.current.value,email:email1.current.value,password:password1.current.value}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      result =await result.json()
      console.log(result)
      localStorage.setItem("user",JSON.stringify(result)) //The JSON.stringify() static method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
      if(result){
        dispatch(addUser({name:result.name,email:result.email,id:result._id}))
        navigate('/') 
      }
    }
  
    useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth){
         navigate('/')
      }
   
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");
       
        signupBtn.onclick = (()=>{
          loginForm.style.marginLeft = "-50%";
          loginText.style.marginLeft = "-50%";
        });
        loginBtn.onclick = (()=>{
          loginForm.style.marginLeft = "0%";
          loginText.style.marginLeft = "0%";
        });
        signupLink.onclick = (()=>{
          signupBtn.click();
          return false;
        });
  
    },[])
  return (
    // <div id="authentication-modal" aria-hidden="true" className="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
    <div className="wrapper">
    <div className="title-text">
      <div className="title login">Login Form</div>
      <div className="title signup">Signup Form</div>
    </div>
    <div className="form-container">
      <div className="slide-controls">
       
        <input type="radio" name="slide" id="login" defaultChecked />
        <input type="radio" name="slide" id="signup"  /> 
        <label htmlFor="login" className="slide login">Login</label>
        <label htmlFor="signup" className="slide signup">Signup</label>
        <div className="slider-tab"></div>
      </div>
      <div className="form-inner">
        <form   className="login">
          <div className="field">
            <input ref={email2} type="text" placeholder="Email Address" required/>
          </div>
          <div className="field">
            <input ref={password2} type="password" placeholder="Password" required/>
          </div>
          <div className="pass-link"><a href="#">Forgot password?</a></div>
          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" value="Login" onClick={(e)=>{e.preventDefault();
                handleClick()
                 }}/>
          </div>
          <div className="signup-link">Not a member? <a href="">Signup now</a></div>
        </form>
        <form   className="signup">
        <div className="field">
            <input ref={name1} type="text" placeholder="username" required/>
          </div>
          <div className="field">
            <input ref={email1} type="text" placeholder="Email Address" required/>
          </div>
          <div className="field">
            <input ref={password1} type="password" placeholder="Password" required/>
          </div>
          <div className="field">
            <input ref={confirmPass} type="password" placeholder="Confirm password" required/>
          </div>
          <div className='text-red-900' id="confirmpass"></div>
          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" onClick={(e)=>{e.preventDefault();
             if(password1.current.value==confirmPass.current.value){
                collectData()
                }else{
                document.getElementById('confirmpass').innerHTML="password dont matched";
                }}} value="Signup"/>
          </div>
        </form>
      </div>
    </div>
  </div>
// </div>
  )
}

export default Login