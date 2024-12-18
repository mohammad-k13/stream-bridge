"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import loginFormSchema from '@/utilities/form-schema/login-form-schema'


const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema)
  });

  return (
    <div>Login</div>
  )
}

export default Login