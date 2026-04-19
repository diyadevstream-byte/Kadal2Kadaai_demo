import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import OceanButton from '../components/OceanButton';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 50; // Mock fee

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-on-surface-variant opacity-40" />
        </div>
        <h1 className="font-headline text-3xl font-black text-on-surface uppercase tracking-tight">Your cargo is empty</h1>
        <p className="text-on-surface-variant font-bold text-center max-w-xs">
          Looks like you haven't added any premium catch to your order yet.
        </p>
        <OceanButton 
          onClick={() => navigate('/marketplace')}
          className="px-10 h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest text-xs mt-4"
        >
          Explore Marketplace
        </OceanButton>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col lg:row gap-12">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="font-headline text-4xl font-black text-on-surface tracking-tight uppercase">Your Cargo</h1>
        <p className="text-on-surface-variant font-bold">Review your selections before heading to the checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        {/* LEFT: Cart Item List */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div 
                key={`${item.id}-${item.cutType}-${item.weight}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-container-low rounded-[2.5rem] p-6 lg:p-8 border border-white/5 flex gap-6 lg:gap-8 items-center relative group"
              >
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl overflow-hidden bg-surface shrink-0 border border-white/10 shadow-xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col gap-1 lg:gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline text-lg lg:text-xl font-black text-on-surface uppercase tracking-tight">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.cutType, item.weight)}
                      className="p-2 text-on-surface-variant hover:text-error transition-colors bg-surface-container rounded-full lg:opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {item.cutType}
                    </span>
                    <span className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/10">
                      {item.weight} unit
                    </span>
                  </div>

                   <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 bg-surface-container rounded-2xl px-4 py-2 border border-outline-variant/10 shadow-inner">
                      <button 
                        onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-headline font-black text-lg text-on-surface w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-headline text-xl font-black text-on-surface">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

         {/* RIGHT: Order Summary */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-32">
          <div className="bg-surface rounded-[3rem] p-10 lg:p-12 border border-outline-variant/10 shadow-2xl flex flex-col gap-8">
            <h2 className="font-headline text-2xl font-black text-on-surface px-2 uppercase tracking-tight">Order Summary</h2>
            
            <div className="flex flex-col gap-5 px-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-on-surface font-black">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface-variant">Delivery Fee</span>
                <span className="text-primary font-black">₹{deliveryFee}</span>
              </div>
              <div className="h-px bg-outline-variant/10 my-2"></div>
              <div className="flex justify-between items-end">
                <span className="font-headline text-lg font-black text-on-surface uppercase tracking-widest">Total</span>
                <div className="flex flex-col items-end">
                  <span className="font-headline text-4xl font-black text-primary leading-none">₹{cartTotal + deliveryFee}</span>
                  <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mt-2">VAT Included</span>
                </div>
              </div>
            </div>

            <OceanButton 
              onClick={() => navigate('/checkout')}
              className="w-full h-18 rounded-[2rem] bg-primary text-black font-headline font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(0,218,243,0.3)] group"
            >
              <div className="flex items-center justify-center gap-3">
                Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </OceanButton>
          </div>

          <div className="px-8 flex flex-col gap-4 text-center opacity-40">
            <p className="text-xs font-semibold leading-relaxed">
              Shipping fresh daily from local docks using continuous cold-chain logistics.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
