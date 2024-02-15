import { useEffect, useState } from "react";
import { map } from 'lodash';
import Link from "next/link";
import { categContrl } from "@/api/categories";

import styles from './CategoriesMenu.module.scss';

export function CategoriesMenu() {
  
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    async function fetchCategories() {
        try {
            const fetchCatg = await categContrl.getAllCategories();
            setCategories(fetchCatg);
        } catch (error) {
            console.log(error);
        }
    }
    fetchCategories();
  }, [])
  
  return (
    <div className={styles.categories}>
        {   
            map(categories, (category) => (
                <Link key={category.categId} href={`/categories/${category.categPath}`}>
                    {category.categName}
                </Link>   
            )) 
        }
    </div>
  )
}
