import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Showcase from './Showcase'
import Footer from './Footer'
import styles from '@/styles/Layout.module.css'

const Layout = ({ title, description, keywords, children }) => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name={description} content={description} keywords={keywords} />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, djs, parties, events',
}

export default Layout
