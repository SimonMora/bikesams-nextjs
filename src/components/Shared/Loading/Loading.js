import { Loader } from 'semantic-ui-react';

import { Separator } from '../Separator';
import styles from './Loading.module.scss';

export function Loading(props) {
    const { text = "Loading", top = 0} = props;
  return (
    <>
        <Separator heigth={top} /> 
        <Loader active inline="centered" className={styles.loading}> 
            {text}
        </Loader>
    </>
  )
}
