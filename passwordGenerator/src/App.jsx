import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowesd] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copy, setCopy] = useState("Copy")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str = str + "0123456789"
    if (charAllowed) {
      str+="!@#$%^&*()_+-={}[]|:,."
    }


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
    setCopy("Copy")
  }, 
  [length, numberAllowed, charAllowed, setPassword])

  const passwordReference  = useCallback(() =>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
    setCopy("copied")
  }, [password])
  useEffect(() => {
    passwordGenerator()
    setCopy("Copy")
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-800 bg-gray-600">
      <h1 className="justify-center text-white mx-auto my-3 text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password will be Generated Here !!!"
          readOnly
          ref={passwordRef}
          
          >
          
          </input>
          <button 
          // onClick={() => setCopy("copied")}
          onClick={passwordReference}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">{copy}</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            >
            </input>
            <label>Length: {length}</label>

          </div>

          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowesd((prev) => !prev)
            }}
            
            
           
            
            >
            </input>
            <label>Numbers</label>
            
          </div>


          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            >
            </input>
            <label>Character</label>
            
          </div>
        </div>
     </div>
    </>
  )
}

export default App
