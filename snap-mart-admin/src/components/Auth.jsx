import React, { useState } from 'react';
import { useAuth } from '../Hooks/useAuth';

const Auth = () => {
  const { signup, signin, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try{
       const res  = await signin(email,password);
        if(res == null) throw new Error ("Wrong Credentials");
        console.log("Login successful");
    }catch(error){
        console.log(error.message);
        setError(error.message);
    }
  };



  const handleCloseError = ()=>{
    setError(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black relative overflow-hidden p-4">
      <div className="absolute w-1 h-1 bg-white rounded-full" style={{ top: '15%', left: '25%' }}></div>
      <div className="absolute w-1 h-1 bg-white rounded-full" style={{ top: '35%', left: '70%' }}></div>
      <div className="absolute w-2 h-2 bg-white rounded-full" style={{ top: '55%', left: '45%' }}></div>
      <div className="absolute w-1 h-1 bg-white rounded-full" style={{ top: '75%', left: '85%' }}></div>

      <div className="glass relative z-10 rounded-2xl shadow-xl p-8 w-full max-w-md text-center bg-opacity-80">
        <div className="mb-8">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">★</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Snap Mart Admin</h2>
        </div>

          <div className="space-y-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {error && <div className='flex flex-row justify-center items-center  '>
                <h2 className='text-red-700 mr-3'>{error}</h2>
                <button type='button' onClick={handleCloseError} className='bg-red-700 px-1.5 rounded-4xl'>X</button>
              </div>}
              <button
                type="submit"
                className="w-full p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 font-semibold"
              >
                Sign In
              </button>
            </form>
          </div>
      </div>
      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Auth;