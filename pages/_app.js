import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { compose } from 'redux'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-datetime/css/react-datetime.css'

import PrivateContainer from '../containers/PrivateContainer/dynamic'
import reduxWrapper from '../store'
import client from '../utils/graphql-api/client'

import '../public/style/global.scss'
import pkg from '../package.json'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Memorize version {pkg.version}</title>
      </Head>
      <ApolloProvider client={client}>
        <PrivateContainer>
          <Component {...pageProps} />
        </PrivateContainer>
      </ApolloProvider>
    </>
  )
}

export default compose(reduxWrapper.withRedux)(MyApp)
