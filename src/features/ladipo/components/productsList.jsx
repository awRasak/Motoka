import ProductCard from "./productCard";

function ProductsList({ parts = [] }) {
  return (
    <div className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
      {parts.map((part) => (
        <div key={part.id} className="flex flex-col h-full">
          <ProductCard part={part} />
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
