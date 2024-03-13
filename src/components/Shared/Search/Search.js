import { useRouter } from "next/router";
import { Input } from "semantic-ui-react";

export function Search(props) {
    const { placeholder= "What do you need?", className, queryName = "search" } = props;
    const router = useRouter();
    const inputValue = router.query[queryName] || "";

    const onChage = (_, data) => {
      if(data.value) {
        router.replace({ query: {...router.query, [queryName]: data.value }});
      } else {
        cleanSearchParam();
      }
    };

    const cleanSearchParam = () => {
      const newQuery = router.query;
      delete newQuery[queryName];
      router.replace({ query: newQuery });
    };

  return (
    <Input 
        placeholder={placeholder} 
        className={className}
        icon={{name: inputValue ? "close" : "search", link: true, onClick: cleanSearchParam}}
        value={inputValue}
        onChange={onChage} 
    />
  )
}
