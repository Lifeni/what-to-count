import React from 'react'
import FileStat from './components/FileStat'
import Input from './components/Input'

const App = () => {
  return (
    <div className="h-screen w-full font-sans p-4">
      <FileStat />
      <main className="py-4">
        <Input />
      </main>
    </div>
  )
}

export default App
