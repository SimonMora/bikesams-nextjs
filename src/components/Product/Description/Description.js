
export function Description(props) {
    const { product } = props;
  return (
    <div>
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={ { __html: product.prodDescription } } />
    </div>
  );
}
