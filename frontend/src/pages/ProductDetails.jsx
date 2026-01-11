import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-xl text-gray-500 mb-4">Product not found</p>
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 border border-gray-100 flex items-center justify-center aspect-square md:aspect-auto"
        >
          <img
            src={product.images?.[0] || "https://via.placeholder.com/600"}
            alt={product.name}
            className="max-w-full max-h-[500px] object-contain"
          />
        </motion.div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
              {product.category || 'Gadget'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-500">(No reviews yet)</span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-baseline mb-8">
            <span className="text-4xl font-bold text-gray-900">
              ₦{product.price?.toLocaleString()}
            </span>
            {/* Optional: <span className="ml-4 text-lg text-gray-400 line-through">₦150,000</span> */}
          </div>

          <div className="border-t border-gray-100 pt-8 mt-auto">
            {product.stock > 0 ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-32">
                  <label htmlFor="qty" className="sr-only">Quantity</label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    {[...Array(Math.min(product.stock, 10)).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        Qty: {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all transform active:scale-95 shadow-lg shadow-primary/30 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center font-bold">
                Out of Stock
              </div>
            )}
            
            <p className="mt-6 text-sm text-gray-500 text-center sm:text-left">
              Free shipping on orders over ₦10,000 • 30 Day Returns
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
