import {
  Apple,
  Coffee,
  Cookie,
  Hamburger,
  IceCream,
} from "lucide-react-native";

export const onboardingData = [
  {
    id: 1,
    title: "Fast Delivery",
    description:
      "Get your favorite food delivered to your doorstep in minutes.",
    image: require("../assets/food/food1.jpg"),
  },
  {
    id: 2,
    title: "Fresh & Hot",
    description: "We partner with top restaurants to deliver fresh meals.",
    image: require("../assets/food/food2.jpg"),
  },
  {
    id: 3,
    title: "Easy Payments",
    description: "Multiple secure payment options to choose from.",
    image: require("../assets/food/food3.jpg"),
  },
];

export function cn(...classes: any[]) {
  return classes
    .flatMap((c) =>
      typeof c === "string"
        ? c
        : typeof c === "object" && c !== null
        ? Object.entries(c)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key)
        : []
    )
    .join(" ");
}

export const categories = [
  { id: "1", name: "Snacks", icon: Cookie, bgColor: "#F9A826" },
  { id: "2", name: "Drinks", icon: Coffee, bgColor: "#47B5FF" },
  { id: "3", name: "Desserts", icon: IceCream, bgColor: "#FF6B6B" },
  { id: "4", name: "Fruits", icon: Apple, bgColor: "#4CD964" },
  { id: "5", name: "Meals", icon: Hamburger, bgColor: "#FF9F1C" },
];

export const bestSellers = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 5.99,
    rating: 4.8,
    image: require("@/assets/food/cheese_burger.jpg"),
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 8.99,
    rating: 4.1,
    image: require("@/assets/food/pepperoni_pizza.jpg"),
  },
  {
    id: 3,
    name: "Chocolate Cake",
    price: 4.5,
    rating: 4.9,
    image: require("@/assets/food/chocolate_cake.jpg"),
  },
  {
    id: 4,
    name: "Coke Drink",
    price: 1.99,
    rating: 4.6,
    image: require("@/assets/food/coca-cola.jpg"),
  },
  {
    id: 5,
    name: "French Fries",
    price: 2.5,
    rating: 4.4,
    image: require("@/assets/food/french_fries.jpg"),
  },
];

export const offers = [
  {
    id: "1",
    image: require("@/assets/offer/offer_burger.jpg"),
    price: 199,
    rating: 4.6,
  },
  {
    id: "2",
    image: require("@/assets/offer/offer_drinks.jpg"),
    price: 199,
    rating: 4.6,
  },
  {
    id: "3",
    image: require("@/assets/offer/offer_meals.jpg"),
    price: 199,
    rating: 4.6,
  },
];

export const recommendedItems = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 199,
    rating: 4.6,
    image: require("@/assets/food/food1.jpg"),
  },
  {
    id: 2,
    name: "Mixed Fruits",
    price: 149,
    rating: 4.2,
    image: require("@/assets/food/food2.jpg"),
  },
  {
    id: 3,
    name: "Tasty Meals",
    price: 249,
    rating: 4.8,
    image: require("@/assets/food/food3.jpg"),
  },
];

export const profileItems = [
  { label: "My Orders", path: "/(tabs)/orders" },
  { label: "My Addresses", path: "/addresse" },
  { label: "Settings", path: "/settings" },
];
