// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { WalletProvider } from 'src/@core/context/WalletContext'
import { ContractProvider } from 'src/@core/context/ContractContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Tracker Patrimony Business`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Uma Forma pratica intuitiva de usar ferramentas livres para o usuario a conecte e use , seus dados suas informaçoes, livre e seguro`}
        />
        <meta name='keywords' content='patrimony tag, tag nfc patrimony' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
        {({ settings }) => (
            <WalletProvider> {/* Wrap your component tree with WalletProvider */}
                <ThemeComponent settings={settings}>
                  {getLayout(<Component {...pageProps} />)}
                </ThemeComponent>
            </WalletProvider>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
