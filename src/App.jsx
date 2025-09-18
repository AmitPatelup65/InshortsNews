import React, { useEffect, useState } from 'react'
import InshortCard from './Components/InshortCard'

function App() {
  const [data, setdata] = useState([])
  const [search, setsearch] = useState("")
 async function  getdata  ()  {
    const api_Key='84462344b9af4e2da0aeed0d7d6a91db'
    const response= await fetch(`https://newsapi.org/v2/everything?q=${search || "sports"}&apiKey=${api_Key}&pageSize=12`)
     const result=await response.json();
     setdata(result.articles || [])
  }
 const searchItem=data.filter((item)=>{
   const fetchitem=search.toLowerCase();
  if(fetchitem===""){
    return true
  }
  return item.title.toLowerCase().includes(fetchitem)
 })

  useEffect(()=>{
  getdata();
  },[search])

  return (
    <div >
      <nav className='bg-red-400 shadow-lg flex justify-start gap-100 w-full h-15 items-center shadow-zinc-500 fixed z-10'>
          <h1 className='ml-3 text-2xl'>☰ Top Stories</h1>
          <input
      className='border-3 p-1 rounded-md'
      value={search}
      onChange={(e)=>setsearch(e.target.value)}
      type="text" placeholder='Search Todays News' />
      <h1 className='text-2xl '>📰Inshort</h1>
      </nav>
      <div className='p-20 space-y-6 '>
        {searchItem.length ? (
        searchItem.map((item,idx)=>{
          return <div key={idx} className=' bg-white shadow-lg shadow-gray-500  gap-3 rounded-2xl  overflow-hidden hover:scale-95'>
            <img className='h-120 w-full' src={item.urlToImage} alt="" />
            <h1 className='p-3'>{item.title}</h1>
            <h1 className='p-3'>{item.description}</h1>
            <h1 className='p-3'>{item.publishedAt}</h1>
            <h1 className='bg-zinc-900 text-white h-15 p-3'>{item.content}</h1>
          </div>
        })
        ):(
          <p></p>
        )}
      </div>
    </div>
  )
}


export default App