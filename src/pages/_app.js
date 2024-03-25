import 'semantic-ui-css/semantic.min.css'
import '@/scss/global.scss'
import {AuthProvider, BasketProvider, SearchProvider} from '@/context'
import { initAmplify } from '@/utils'

initAmplify();

export default function App(props) {
  const { Component, pageProps } = props

  return (
    <AuthProvider>
      <BasketProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </BasketProvider>
    </AuthProvider> 
  );
  
}
