import ProductCatalog from '../components/ProductCatalog';
import ShoppingCart from '../components/ShoppingCart';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProductCatalog />
      <ShoppingCart />
    </div>
  );
}
