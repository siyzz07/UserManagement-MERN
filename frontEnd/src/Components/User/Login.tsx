
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../../services/userAPI';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';

interface InitialVal {
  email: string;
  password: string;
}

const Login = () => {

  const navigate = useNavigate();
  const dispach=useDispatch()

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup.string().required('Password is required'),
  });

  const initialValues: InitialVal = {
    email: '',
    password: '',
  };

  const handleSubmit = async(values: InitialVal) => {
    
  
  
    try {
      const response:any = await loginUser(values); 

     if(response?.user?.role=="Admin"){
          toast.error("You are not an   user ")
     }else{
      
      if(response?.token){
        localStorage.setItem("token",response.token)
        dispach(loginSuccess(response.token))

        navigate('/home')


      }else{
        toast.error("some error occur please try again")
      }
      
    }

    } catch (error: any) {
     if(error?.response?.data?.message){
      toast.error(error.response.data.message)
     }else{
       toast.error("an error occured please try again")
     }
      
      console.log(error.message);
    }
  
    // navigate('/dashboard'); // Uncomment after implementing
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#32c2ff] to-white">
      <div className="bg-[#fffdfd] w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 p-6 rounded-lg shadow-[#4f4e4e] shadow-md">
        <div>
          <h1 className="font-semibold text-2xl text-center">LOGIN</h1>
        </div>
        <div className="2xl:mt-16">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <Field
                    placeholder="Email"
                    className="border-b-2 h-10 w-full focus:outline-none focus:border-[#2bbedf]"
                    type="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    placeholder="Password"
                    className="border-b-2 h-10 w-full focus:outline-none focus:border-[#2bbedf]"
                    type="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#32c2ff] h-10 mt-10 text-lg text-white font-semibold rounded-lg hover:bg-[#2bbedf] transition duration-300"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="mt-8 text-end">
          Don't have an account?{' '}
          <span
            className="cursor-pointer text-blue-700"
            onClick={() => navigate('/register')}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
