export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="info">
        <p className="product-name">{product.name}</p>
        <strong className="product-price">{product.price}</strong>
      </div>
      <button className="add-btn">장바구니 담기</button>
    </div>
  );
}

