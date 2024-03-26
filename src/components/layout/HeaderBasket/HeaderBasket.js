import { useRouter } from 'next/router';
import { Logo } from '../Logo';
import styles from './HeaderBasket.module.scss';
import { map } from 'lodash';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

export function HeaderBasket() {
  
  const { query: { step = 1 }, } = useRouter();
  const currentStep = Number(step);
  
  const steps = [ 
    { number: 1, title: "Basket"},
    { number: 2, title: "Shipment Address"},
    { number: 3, title: "Payment Method"},
    { number: 4, title: "Confirmation"},
  ];

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <Logo />
        </div>
        <div className={styles.center}>
            {map(steps, (item) => (
                <div 
                  key={item.number} 
                  className={classNames({
                    [styles.active]: item.number === currentStep,
                    [styles.success]: item.number < currentStep,
                   })}
                >
                    <span className={styles.number}>
                        <Icon name="check"/>
                        {item.number}
                    </span>
                    <span>
                        {item.title}
                    </span>
                    <span className={styles.space} />
                </div>
            ))}
        </div>
        <div className={styles.rigth}>
            
        </div>
    </div>
  )
}
