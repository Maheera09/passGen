import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+= '0123456789'
    if (charAllowed) str+='!@#$%^&*()_>?<.~`-'
    for (let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]) //setPassword optimization ky liye dali ha

  // const copyPassToClipboard = useCallback(()=>{
  //   window.navigator.clipboard.writeText(Password)
  // }, [Password])

  const copyPassToClipboard = useCallback(()=>{
   passwordRef.current?.select()
   passwordRef.current?.setSelectionRange(0, length)
   window.navigator.clipboard.writeText(Password)
  }, [Password])

useEffect(()=>{
passwordGen()
}, [length, numberAllowed, charAllowed, passwordGen])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500 '>
        <h1 className='text-white text-center text-3xl'> Password Generator</h1>
        <br />
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={Password} 
          className='outline-none w-full py-1 px-3' placeholder='Password' 
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPassToClipboard}
          className='outline-none hover:bg-blue-500 bg-blue-700 active:bg-red-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6} 
            max={100} 
            value={length} 
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed} id='numberInput'
          onChange={
            ()=>{
              setNumberAllowed((prev) => !prev) //ye previous value ko reverse kr deta ha means true to false and false ko true
            }
            } />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} id='charInput'
            onChange={
            ()=>{
              setCharAllowed((prev) => !prev) //ye previous value ko reverse kr deta ha means true to false and false ko true
            }
            } />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
