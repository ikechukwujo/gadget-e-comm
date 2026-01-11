import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <ShoppingBag className="w-8 h-8 mr-3 text-primary" />
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-8 max-w-sm">
            Looks like you haven't added anything to your cart yet.
            Start shopping to fill it up!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-secondary shadow-lg shadow-primary/30 transition-all"
          >
            Start Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map(item => (
              <div 
                key={item._id} 
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                   <img 
                      src={item.images?.[0] || "https://via.placeholder.com/100"} 
                      alt={item.name}
                      className="w-full h-full object-contain rounded-xl"
                   />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h4>
                  <p className="text-primary font-bold text-lg">₦{item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQty(item._id, Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {[...Array(Math.min(item.stock || 10, 10)).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96 h-fit bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/30"
            >
              Proceed to Checkout
            </Link>
            
            <Link to="/" className="block text-center mt-4 text-gray-500 hover:text-primary transition-colors text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
