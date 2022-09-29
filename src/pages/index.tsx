import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Editor = dynamic(import('~/components/Editor/index'), { ssr: false })

const Index: NextPage = (): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Draft.js with Next</title>
        <meta name="description" content="Draft.js with Next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Draft.js with Next
        </h1>
        <Editor />
      </main>
    </div>
  )
}

export default Index
