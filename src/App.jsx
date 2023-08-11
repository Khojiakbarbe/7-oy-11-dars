import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from 'react-icons/ai'
import { IoMdCopy } from 'react-icons/io'

function App() {




  const [password, setPassword] = useState(0)
  const [passLeng, setPassLeng] = useState(8)

  const [lower, setLower] = useState(false)
  const [upper, setUpper] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)



  function generate() {
    if (lower || upper || number || symbol) {
      const text = `${upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''}${lower ? 'abcdefghijklmnopqrstuvwxyz' : ''}${number ? '0123456789' : ''}${symbol && '_*/$&%'}`
      let password = ''
      for (let i = 0; i < +passLeng; i++) {
        const random = Math.ceil(Math.random() * text.length - 1)
        password = password + text.charAt(random)
      }
      setPassword(password)
    }else{
      alert('Please select number , text or symble')
    }
  }

  let count = 0;
  if (lower) {
    count++
  }
  if (upper) {
    count++
  }
  if (number) {
    count++
  }
  if (symbol) {
    count++
  }
  
  const [strength, setStrength] = useState('NONE')

  useEffect(() => {
    if (count == 1) {
      setStrength('TOO WEAK!')
    } else if (count == 2) {
      setStrength('WEAK')
    } else if (count == 3) {
      setStrength('MEDIUM')
    } else if (count == 4) {
      setStrength('STRONG')
    }
  }, [count])


  const [copied, setCopied] = useState('')
  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setCopied('COPIED')
    setTimeout(() => {
      setCopied('')
    }, 4000);
  }

  return (
    <div className='grid justify-center text-white items-center'>
      <p className="text-[gray] text-[16px] md:text-[24px] text-center">Password Generator</p>
      <div className="p-5">

        <div className="flex justify-between bg-[#24232C] w-[343px] md:w-[540px] h-[80px] items-center px-[28px]">
          <h1 className={` flex items-center px-4 text-[24px] md:text-[32px] ${password ? 'text-white' : 'text-[#817D92]'}`} >{password ? password : 'P4$5W0rD!'}</h1>
          <p className={`text-2xl text-[#A4FFAF] flex gap-4 items-center  ${password && 'cursor-pointer hover:text-white'}`}>{copied} <IoMdCopy onClick={() => { password && copyPassword() }} /></p>
        </div>

        <div className="p-[19px] mt-[24px] bg-[#24232C]">

          <p className="text-[16px] md:text-[18px] flex justify-between items-center px-5"><span>Character Length</span><span className="text-[24px] md:text-[32px] text-[#A4FFAF]">{passLeng}</span></p>
          <input type="range" className="w-full my-5" min={6} max={16} value={passLeng} onChange={(e) => setPassLeng(e.target.value)} />

          <label className="mt-[19px] block">
            <input type="checkbox" className="accent-[#A4FFAF]" onClick={() => setUpper(!upper)} /> Include Uppercase Letters
          </label>
          <label className="mt-[19px] block">
            <input type="checkbox" className="accent-[#A4FFAF]" onClick={() => setLower(!lower)} /> Include Lowercase Letters
          </label>
          <label className="mt-[19px] block">
            <input type="checkbox" className="accent-[#A4FFAF]" onClick={() => setNumber(!number)} /> Include Numbers
          </label>
          <label className="mt-[19px] block">
            <input type="checkbox" className="accent-[#A4FFAF]" onClick={() => setSymbol(!symbol)} /> Include Symbols
          </label>

          <div className="flex justify-between p-[21px] mt-[31px] bg-[#18171F]">
            <span className="text-[#817D92]">STRENGTH</span>
            <span className="font-bold">{strength}</span>
          </div>

          <button onClick={generate} className='bg-[#A4FFAF] hover:bg-[unset] border  hover:border-[#A4FFAF] hover:text-[#A4FFAF] transition duration-300 flex justify-center items-center gap-[24px] text-black text-center w-full text-[18px] font-bold mt-[32px] h-[65px]'>Generate <AiOutlineArrowRight /></button>
        </div>
      </div>
    </div>
  )
}

export default App