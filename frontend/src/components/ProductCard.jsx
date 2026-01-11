import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product, 1);
    
    // Simulate feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Motion.div 
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to={`/product/${product._id}`}
            className="p-3 bg-white rounded-full text-gray-800 hover:bg-primary hover:text-white transition-colors transform hover:scale-110"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={handleAddToCart}
            className={`p-3 rounded-full text-white transition-colors transform hover:scale-110 ${isAdding ? 'bg-green-500' : 'bg-primary hover:bg-secondary'}`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            ₦{product.price?.toLocaleString()}
          </p>
          <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-md">
            {product.category || 'Gadget'}
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default ProductCard;
