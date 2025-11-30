'use client'

import { ApolloProvider } from "@apollo/client/react"
import client from "../src/apollo/apolloConfig"
import ReactQueryProvider from "@/src/reactQuery/ReactQueryProvider"


const Providers = ({ children }: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ApolloProvider client={client}>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </ApolloProvider>
  )
}

export default Providers

