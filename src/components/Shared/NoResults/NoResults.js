import styles from './NoResults.module.scss';

export function NoResults(props) {
    const { text = "No results.." } = props;

  return (
    <div className={styles.container}>
        <p>{text}</p>
    </div>
  )
}
