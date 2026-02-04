'use client'
import React, { useState } from 'react'

function page() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>about page</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <span>{count}</span>
    </div>
  )
}

export default page
