import { Input } from "semantic-ui-react";

export function Search(props) {
    const { placeholder= "What do you need?", className } = props;

  return (
    <Input 
        placeholder={placeholder} 
        className={className}
        icon={{name:"search", link: true}} 
    />
  )
}
