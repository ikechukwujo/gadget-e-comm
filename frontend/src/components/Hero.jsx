import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 pt-16 pb-32">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -right-[10%] w-[70rem] h-[70rem] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[50rem] h-[50rem] rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-sm font-medium text-primary mb-6 shadow-sm">
            New Arrival: The Future is Here
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 font-display">
            Experience Technology <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Like Never Before.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            Discover the latest gadgets that enhance your lifestyle. 
            Premium quality, futuristic design, and unbeatable performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#products" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-gray-700 bg-primary hover:bg-secondary shadow-lg shadow-primary/30 transition-all"
            >
              Shop Now <ArrowRight className="ml-2 w-5 h-5" />
            </Motion.a>
            <Motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#trending" 
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-lg font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all"
            >
              Learn More
            </Motion.a>
          </div>
        </Motion.div>

        {/* Floating elements/Mockups could go here */}
      </div>
    </section>
  );
};

export default Hero;
