export interface Feature {
  icon: string;
  tooltip: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: string;
  seats: number;
  price: number;
  features: Feature[];
  image: string[];
  description: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Sedan",
    seats: 4,
    price: 50,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seats" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Electric Vehicle" },
      { icon: "MdOutlineDirectionsCar", tooltip: "All Wheel Drive" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description:
      "A comfortable sedan with advanced features, perfect for city travel.",
  },
  {
    id: "2",
    name: "Ford Explorer",
    brand: "Ford",
    type: "SUV",
    seats: 7,
    price: 100,
    features: [
      { icon: "MdOutlineDirectionsCar", tooltip: "All Terrain" },
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Spacious Interior" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Long Battery Life" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "A powerful SUV suitable for long trips and rough terrain.",
  },
  {
    id: "3",
    name: "BMW 7 Series",
    brand: "BMW",
    type: "Luxury Sedan",
    seats: 5,
    price: 200,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Luxury Leather Seats" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Electric Hybrid" },
      { icon: "MdWifi", tooltip: "High-Speed Wi-Fi" },
      { icon: "MdAcUnit", tooltip: "Climate Control" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Self-Driving" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description:
      "A luxury sedan with premium features and cutting-edge technology.",
  },
  {
    id: "4",
    name: "Honda Fit",
    brand: "Honda",
    type: "Hatchback",
    seats: 4,
    price: 40,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Compact and Comfortable" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Efficient Mileage" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Easy Parking" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "A small and efficient car, ideal for urban travel.",
  },
  {
    id: "5",
    name: "Mazda MX-5",
    brand: "Mazda",
    type: "Convertible",
    seats: 2,
    price: 150,
    features: [
      { icon: "MdOutlineDirectionsCar", tooltip: "Stylish Design" },
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Luxury Seating" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Climate Control" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Efficient Engine" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description:
      "A convertible perfect for scenic drives and luxury experiences.",
  },
  {
    id: "6",
    name: "Chrysler Pacifica",
    brand: "Chrysler",
    type: "Minivan",
    seats: 8,
    price: 120,
    features: [
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Spacious Interior" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Fuel Efficient" },
      { icon: "MdAcUnit", tooltip: "Dual-Zone Climate Control" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Family Friendly" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "A spacious minivan, perfect for family trips.",
  },
  {
    id: "7",
    name: "Tesla Model S",
    brand: "Tesla",
    type: "Electric Sedan",
    seats: 5,
    price: 180,
    features: [
      { icon: "MdOutlineBatteryChargingFull", tooltip: "100% Electric" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Luxury Leather Seats" },
      { icon: "MdOutlineDirectionsCar", tooltip: "Autopilot Enabled" },
      { icon: "MdAcUnit", tooltip: "Smart Climate Control" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "An eco-friendly electric sedan with cutting-edge features.",
  },
  {
    id: "8",
    name: "Bolero",
    brand: "Mahindra",
    type: "Pickup Truck",
    seats: 4,
    price: 90,
    features: [
      { icon: "MdOutlineDirectionsCar", tooltip: "Heavy Duty" },
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Comfortable Seating" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Air Conditioning" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Large Fuel Tank" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "A powerful truck with a robust build and ample space.",
  },
  {
    id: "9",
    name: "Cuope",
    brand: "Porche",
    type: "Luxury SUV",
    seats: 7,
    price: 250,
    features: [
      { icon: "MdOutlineDirectionsCar", tooltip: "Premium Build" },
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Leather Seating" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Automatic Climate Control" },
      { icon: "MdOutlineBatteryChargingFull", tooltip: "Hybrid Engine" },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "A luxurious SUV with unmatched comfort and performance.",
  },
  {
    id: "10",
    name: "Spider",
    brand: "Ferrari",
    type: "Sports Car",
    seats: 2,
    price: 300,
    features: [
      { icon: "MdOutlineDirectionsCar", tooltip: "High Speed" },
      { icon: "MdAirlineSeatReclineExtra", tooltip: "Racing Seats" },
      { icon: "MdWifi", tooltip: "Wi-Fi Enabled" },
      { icon: "MdAcUnit", tooltip: "Dual-Zone Climate Control" },
      {
        icon: "MdOutlineBatteryChargingFull",
        tooltip: "Optimized Performance",
      },
    ],
    image: [
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
      "https://i.pinimg.com/736x/9c/06/ec/9c06ec0e4e14c28ca656004798d9b838.jpg",
    ],

    description: "A high-performance sports car for thrill seekers.",
  },
];
