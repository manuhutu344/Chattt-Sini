'use client'

import React from 'react'
import {useState, useCallback} from 'react'

type Variant = 'LOGIN' | 'REGISTER'

function Authform() {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsloading] = useState(false)
    const toggleVariant = useCallback(()=>{
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }
    }, [])
  return (
    <div>Authform</div>
  )
}

export default Authform