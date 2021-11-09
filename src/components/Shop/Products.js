import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY = [
  {
    id: "m1",
    price: 15,
    title: "m1title",
    description: "m1description",
  },
  {
    id: "m2",
    price: 16,
    title: "m2title",
    description: "m2description",
  },
  {
    id: "m3",
    price: 17,
    title: "m3title",
    description: "m3description",
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY.map(item => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          );
        })}

      </ul>
    </section>
  );
};

export default Products;
