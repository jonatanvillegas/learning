'use client'
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = {}

const SigninButton = (props: Props) => {
  return (
    <Button variant='default' onClick={()=>{
        signIn('google')
    }}>
        Sign In
    </Button>
  )
}

export default SigninButton