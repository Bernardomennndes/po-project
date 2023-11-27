"use client"

import ProblemTable from '@/components/ProblemTable'
import { Button } from '@/components/ui/button'
import { Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Problem({ teste } : {teste : string}){
  const searchParams = useSearchParams()

  let numRestrictions : number, numVariables : number

  try{
    numRestrictions = Number.parseInt(searchParams.get("res").toString())
    numVariables = Number.parseInt(searchParams.get("var").toString())
  }
  catch{
    return notFound()
  }

  if(numRestrictions < 2 || numRestrictions> 10 || numVariables > 10 || numVariables < 2) return notFound()

  return (
    <Flex align="center" justify="center" direction="column" gap="5">
      <ProblemTable numRestrictions={numRestrictions} numVariables={numVariables}/>
      <Button>Resolver</Button>
      <Button variant="link"><Link href="/">Voltar</Link></Button>
    </Flex>
  )
}