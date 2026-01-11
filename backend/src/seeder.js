const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();
connectDB();

const products = [
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise canceling with two processors controlling 8 microphones for unprecedented noise cancellation. Auto NC Optimizer automatically optimizes noise canceling based on your wearing conditions and environment.",
    price: 350000,
    category: "Audio",
    brand: "Sony",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "Apple MacBook Pro 16 M3 Max",
    description: "The most powerful MacBook Pro ever. Blazing-fast M3 Max chip, stunning Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for pros.",
    price: 4500000,
    category: "Laptops",
    brand: "Apple",
    stock: 5,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Unleash your creativity with the Galaxy S24 Ultra. Featuring a 200MP camera, built-in S Pen, and the powerful Snapdragon 8 Gen 3 processor for Galaxy.",
    price: 1800000,
    category: "Phones",
    brand: "Samsung",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1610945265078-3858a0b5d8f4?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "PlayStation 5 Slim Console",
    description: "Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.",
    price: 650000,
    category: "Gaming",
    brand: "Sony",
    stock: 20,
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "DJI Mini 4 Pro Drone",
    description: "Weighing under 249g, DJI Mini 4 Pro is our safest Mini to date. It features omnidirectional obstacle sensing, ActiveTrack 360°, and 20km FHD video transmission.",
    price: 950000,
    category: "Drones",
    brand: "DJI",
    stock: 8,
    images: ["https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch. Designed for outdoor adventure and supercharged workouts with a lightweight titanium case and extra-long battery life.",
    price: 850000,
    category: "Wearables",
    brand: "Apple",
    stock: 12,
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "Logitech MX Master 3S",
    description: "Meet MX Master 3S – an iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and 8000 DPI track-on-glass sensor.",
    price: 120000,
    category: "Accessories",
    brand: "Logitech",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
  {
    name: "Vision Pro VR Headset",
    description: "Welcome to the era of spatial computing. Apple Vision Pro seamlessly blends digital content with your physical space. You navigate simply by using your eyes, hands, and voice.",
    price: 5500000,
    category: "VR/AR",
    brand: "Apple",
    stock: 2,
    images: ["https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?q=80&w=1000&auto=format&fit=crop"],
    isActive: true,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
