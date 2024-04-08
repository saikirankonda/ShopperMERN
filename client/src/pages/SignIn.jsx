import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

function SignIn() {
    const [formdata,setFormdata] = useState({})
  const [error,setError] = useState(null)
  const[loading,setLoading ] = useState(false)

  const navigate = useNavigate()

  const handleChange =(e) =>{
     setFormdata({...formdata , [e.target.id] : e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
      try{
            setLoading(true)
    const res = await fetch('http://localhost:3000/api/auth/signin', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formdata),
    });
    
    const data = await res.json();
    if(data?.success === false){
      setLoading(false)     
      setError(data?.message)
      return;
    }
    {
      setLoading(false)
       setError(null)
       navigate("/");
    }
        
      }
      catch(error)
      {
        setLoading(false)
        setError(error.message)
      }
  }


  return (
     <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         <input type='email' placeholder='Email' className='border p-3 rounded-lg outline-none' id="email"onChange={handleChange} />
          <input type='password' placeholder='Password' className='border p-3 rounded-lg outline-none' id="password" onChange={handleChange}  />
          <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 outline-none'  >{loading ? "Loading.." :"SignIn"} </button>          
      </form>
       <div className='flex gap-2 mt-5'>
        <p> Dont Have An Account </p>
        <Link to='/sign-up'> <span className='text-blue-700'>SignUp</span></Link>      
       </div>
       {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn