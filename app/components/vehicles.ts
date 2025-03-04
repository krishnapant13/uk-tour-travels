export interface Feature {
  icon: string;
  tooltip: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: string;
  seats: any;
  price: number;
  features: Feature[];
  image: string[];
  description: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "2",
    name: "Swift Dezire",
    brand: "Maruti",
    type: "Sedan",
    seats: 5,
    price: 3200,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Electric Vehicle" },
      { icon: "MdOutlineDirectionsCar", tooltip: "All Wheel Drive" },
    ],
    image: [
      "https://i.pinimg.com/736x/8f/0a/5f/8f0a5fd1dd4a250a8d1095a75233ff4a.jpg",
      "https://i.pinimg.com/736x/11/64/ae/1164ae274d0f294d47fd0b1f7a8c3f9d.jpg",
    ],

    description:
      "A comfortable sedan with advanced features, perfect for city travel.",
  },
  {
    id: "3",
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    type: "MPV",
    seats: 7,
    price: 5000,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "All Wheel Drive" },
      { icon: "MdSecurity", tooltip: "Advanced Safety Features" },
    ],
    image: [
      "https://i.pinimg.com/474x/02/5f/99/025f9967fc1857f0e19d65d566f2e7d1.jpg",
      "https://i.pinimg.com/736x/a7/fb/0c/a7fb0cc9e8f092f5a0a9118322a20627.jpg",
    ],
    description:
      "A premium MPV offering spacious interiors, excellent comfort, and superior ride quality, making it ideal for long-distance travel and family trips.",
  },
  {
    id: "4",
    name: "Toyota Innova",
    brand: "Toyota",
    type: "MPV",
    seats: 7,
    price: 4000,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Rear Wheel Drive" },
      { icon: "MdSecurity", tooltip: "Standard Safety Features" },
      { icon: "MdLocalGasStation", tooltip: "Fuel Efficient" },
    ],
    image: [
      "https://i.pinimg.com/474x/b9/71/17/b97117d87277f71d47c1a1fc82b99fa6.jpg",
      "https://i.pinimg.com/474x/e1/bd/15/e1bd1520d015182cb8828cdd8a807896.jpg",
    ],
    description:
      "A reliable and spacious MPV, ideal for family trips and taxi services with its comfortable seating and fuel-efficient engine.",
  },
  {
    id: "5",
    name: "Force Traveller",
    brand: "Force Motors",
    type: "Minibus",
    seats: 13,
    price: 5000,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsBus", tooltip: "Spacious Interior" },
      { icon: "MdSecurity", tooltip: "Standard Safety Features" },
      { icon: "MdLocalGasStation", tooltip: "Fuel Efficient Diesel Engine" },
    ],
    image: [
      "https://i.pinimg.com/736x/88/32/14/8832143014173a22ab29bf9b6c1ffcac.jpg",
      "https://i.pinimg.com/736x/ad/b5/d6/adb5d680e832750fb696743c264b2be8.jpg",
      "https://i.pinimg.com/736x/0d/00/90/0d00900689388107b47aa69678c49ae5.jpg",
      "https://i.pinimg.com/736x/f8/9e/bd/f89ebd32ae48e90b10a06e658c83ce0b.jpg",
    ],
    description:
      "A spacious and powerful minibus, ideal for group tours, long-distance travel, and tourist transportation with its fuel-efficient diesel engine.",
  },
  {
    id: "6",
    name: "SC 27-Seater Mini Bus",
    brand: "SML Isuzu",
    type: "Mini Bus",
    seats: 28,
    price: 8000,
    features: [
      {
        icon: "MdAirlineSeatReclineExtra",
        tooltip: "Comfortable Reclining Seats",
      },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsBus", tooltip: "Spacious Interior" },
      { icon: "MdSecurity", tooltip: "Advanced Safety Features" },
      { icon: "MdLocalGasStation", tooltip: "Fuel Efficient Diesel Engine" },
    ],
    image: [
      "https://i.pinimg.com/736x/eb/3b/4e/eb3b4e985cd80e863919df501bda2f61.jpg",
      "https://i.pinimg.com/474x/06/9f/06/069f069b5864bfb4c371657f94d2bfd4.jpg",
    ],
    description:
      "A spacious and reliable 27-seater mini bus, perfect for group travel and tourist transportation with advanced safety features and fuel efficiency.",
  },
  {
    id: "7",
    name: "Toyota Etios",
    brand: "Toyota",
    type: "Sedan",
    seats: 5,
    price: 4000,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seating" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Smooth & Stable Ride" },
      { icon: "MdLocalGasStation", tooltip: "Fuel Efficient Petrol Engine" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Mobile Charging" },
    ],
    image: [
      "https://i.pinimg.com/736x/82/f4/50/82f450a60b9003e97f707f6917a72e10.jpg",
      "https://i.pinimg.com/736x/82/f4/50/82f450a60b9003e97f707f6917a72e10.jpg",
      "https://i.pinimg.com/736x/82/f4/50/82f450a60b9003e97f707f6917a72e10.jpg",
    ],
    description:
      "A sleek and fuel-efficient sedan offering a smooth ride, spacious interior, and modern features. Ideal for city and highway travel.",
  },

  {
    id: "10",
    name: "Maruti Suzuki Ertiga",
    brand: "Maruti Suzuki",
    type: "MPV",
    seats: 7,
    price: 3800,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Smooth Ride" },
      { icon: "MdWifi", tooltip: "WiFi Available" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Mobile Charging" },
    ],
    image: [
      "https://i.pinimg.com/474x/6d/c2/e6/6dc2e659e27ec4da69fd9e9ca2e2917f.jpg",
      "https://i.pinimg.com/474x/34/e4/7c/34e47c3e97634abf6c8d89e8ee42898f.jpg",
      "https://i.pinimg.com/736x/c1/45/e1/c145e12d7411f20ba8732bd413adffd8.jpg",
      "https://i.pinimg.com/736x/4c/67/7c/4c677c3ce5a19af109a1191b1ce5ec63.jpg",
    ],
    description:
      "A stylish and fuel-efficient MPV, perfect for family trips and city travel, offering a smooth and comfortable ride with modern features.",
  },
  {
    id: "8",
    name: "Mahindra Bolero",
    brand: "Mahindra",
    type: "SUV",
    seats: 8,
    price: 3500,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Rear Wheel Drive" },
      { icon: "MdSecurity", tooltip: "Standard Safety Features" },
      { icon: "MdTerrain", tooltip: "Off-Road Capabilities" },
    ],
    image: [
      "https://i.pinimg.com/736x/2c/71/ab/2c71ab222fbc5f60621c3581776a2400.jpg",
      "https://i.pinimg.com/736x/2c/71/ab/2c71ab222fbc5f60621c3581776a2400.jpg",
      "https://i.pinimg.com/736x/2c/71/ab/2c71ab222fbc5f60621c3581776a2400.jpg",
    ],
    description:
      "A rugged and durable SUV, perfect for hilly terrains and off-road driving, making it ideal for both personal and commercial use in Uttarakhand.",
  },
  {
    id: "9",
    name: "Tata Sumo",
    brand: "Tata Motors",
    type: "MUV",
    seats: 10,
    price: 3500,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Spacious Seating" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Rear Wheel Drive" },
      { icon: "MdTerrain", tooltip: "Off-Road Capabilities" },
      { icon: "MdLocalGasStation", tooltip: "Fuel Efficient Diesel Engine" },
    ],
    image: [
      "https://i.pinimg.com/736x/73/2d/3f/732d3f0ecd9dd8bd05bb5405f1987ed4.jpg",
      "https://i.pinimg.com/736x/24/85/75/248575948040af092eb223fb6b08a2ae.jpg",
    ],
    description:
      "A sturdy and spacious MUV, perfect for rugged terrains and long-distance travel, making it a preferred choice for commercial and personal use in hilly regions.",
  },
  {
    id: "11",
    name: "Chevrolet Tavera",
    brand: "Chevrolet",
    type: "MUV",
    seats: 10,
    price: 3800,
    features: [
      {
        icon: "MdAirlineSeatReclineExtra",
        tooltip: "Spacious & Comfortable Seating",
      },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Smooth & Stable Ride" },
      { icon: "MdTerrain", tooltip: "Great for Hilly Terrain" },
      { icon: "MdLocalGasStation", tooltip: "Fuel Efficient Diesel Engine" },
    ],
    image: [
      "https://i.pinimg.com/736x/1c/88/2b/1c882be1b58adca746682e449b55d4bc.jpg",
      "https://i.pinimg.com/736x/1c/88/2b/1c882be1b58adca746682e449b55d4bc.jpg",
      "https://i.pinimg.com/736x/1c/88/2b/1c882be1b58adca746682e449b55d4bc.jpg",
    ],
    description:
      "A powerful and reliable MUV, ideal for long-distance travel and group trips. Known for its durability and spacious interiors, making it a favorite for commercial and personal use.",
  },
];
