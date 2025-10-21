import ProductCatalog from '../components/ProductCatalog';
import ShoppingCart from '../components/ShoppingCart';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ProductCatalog />
      <ShoppingCart />
    </div>
  );
}
