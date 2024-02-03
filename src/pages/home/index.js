import React from 'react'
import { ENV } from '@/utils'
import { useAuth } from '@/hooks'

export default function HomePage() {
  const data = useAuth()  
  console.log(data);
  
  return (
    <div>
        <h2>You are in the Home Page</h2>
        <h3>localStorage saved token: {ENV.TOKEN}</h3>
    </div>
  )
}
