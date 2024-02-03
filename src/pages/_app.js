import 'semantic-ui-css/semantic.min.css'
import '@/scss/global.scss'
import {AuthProvider} from '@/context'
import { initAmplify } from '@/utils'

initAmplify();

export default function App(props) {
  const { Component, pageProps } = props

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider> 
  );
  
}
