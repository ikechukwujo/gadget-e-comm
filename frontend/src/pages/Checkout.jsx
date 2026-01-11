import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Truck, Loader2, ArrowRight } from "lucide-react";

const Checkout = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [loading, setLoading] = useState(false);

  const itemsPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxPrice = 0;
  const shippingPrice = itemsPrice > 10000 ? 0 : 1500;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);

      const orderPayload = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: {
          address,
          city,
          country,
        },
        paymentMethod: "Pay on Delivery",
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      await createOrder(orderPayload);

      localStorage.removeItem("cart");
      navigate(`/orders`);
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Shipping Address
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Lagos"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    placeholder="Nigeria"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary" />
              Payment Method
            </h3>
            <div className="flex items-center p-4 border border-primary/30 bg-primary/5 rounded-xl">
              <Truck className="w-6 h-6 text-primary mr-3" />
              <span className="font-medium text-gray-900">Pay on Delivery</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
          
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center">
                   <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mr-3 text-xs text-gray-400">
                      IMG
                   </div>
                   <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                   </div>
                </div>
                <p className="font-medium text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₦{itemsPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingPrice === 0 ? "Free" : `₦${shippingPrice.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
              <span>Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={placeOrderHandler} 
            disabled={loading}
            className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/30 flex items-center justify-center group"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Processing...
              </>
            ) : (
              <>
                Confirm Order
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
