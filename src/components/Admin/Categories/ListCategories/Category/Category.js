import { Icon, Table } from 'semantic-ui-react';
import styles from './Category.module.scss';

export function Category(props) {
    const { category, onReload } = props;

  return (
    <>
        <Table.Cell>{category.categId}</Table.Cell>
        <Table.Cell>{category.categName}</Table.Cell>
        <Table.Cell>{category.categPath}</Table.Cell>
        <Table.Cell className={styles.actions} textAlign='right'>
            <Icon name="pencil" link />
            <Icon name="trash" link />
        </Table.Cell>
    </>
  )
}
