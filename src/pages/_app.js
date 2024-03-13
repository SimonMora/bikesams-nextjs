import 'semantic-ui-css/semantic.min.css'
import '@/scss/global.scss'
import {AuthProvider, SearchProvider} from '@/context'
import { initAmplify } from '@/utils'

initAmplify();

export default function App(props) {
  const { Component, pageProps } = props

  return (
    <AuthProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </AuthProvider> 
  );
  
}
