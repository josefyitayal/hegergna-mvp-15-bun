"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Plus } from "lucide-react";

const categories = {
  "Clothing": [
    "T-Shirt",
    "Top",
    "Jeans",
    "Jacket",
    "Sweater",
    "Hoodie",
    "Dress",
    "Skirt",
    "Shorts",
    "Pants",
    "Blazer",
    "Tracksuit",
    "Activewear",
    "Undergarments",
    "Socks",
    "Scarf",
    "Gloves",
    "Swimwear"
  ],
  "Electronics": [
    "Smartphone",
    "Laptop",
    "Tablet",
    "Desktop Computer",
    "Smartwatch",
    "Headphones",
    "Earbuds",
    "Camera",
    "Drone",
    "TV",
    "Speaker",
    "Gaming Console",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Smart Home Device",
    "Printer",
    "Router"
  ],
  "Home Appliances": [
    "Refrigerator",
    "Washing Machine",
    "Microwave Oven",
    "Air Conditioner",
    "Vacuum Cleaner",
    "Dishwasher",
    "Water Heater",
    "Blender",
    "Toaster",
    "Coffee Maker",
    "Iron",
    "Fan",
    "Air Purifier",
    "Electric Kettle",
    "Food Processor"
  ],
  "Furniture": [
    "Sofa",
    "Dining Table",
    "Chair",
    "Bed",
    "Wardrobe",
    "Bookshelf",
    "TV Stand",
    "Coffee Table",
    "Desk",
    "Office Chair",
    "Recliner",
    "Cabinet",
    "Nightstand",
    "Shoe Rack"
  ],
  "Beauty and Health": [
    "Skincare Products",
    "Makeup",
    "Haircare Products",
    "Fragrances",
    "Personal Hygiene Products",
    "Nail Polish",
    "Shaving Kit",
    "Fitness Equipment",
    "Health Supplements",
    "Massagers"
  ],
  "Sports and Outdoors": [
    "Bicycle",
    "Tent",
    "Sleeping Bag",
    "Hiking Backpack",
    "Trekking Poles",
    "Yoga Mat",
    "Dumbbells",
    "Football",
    "Basketball",
    "Tennis Racket",
    "Fishing Rod",
    "Swimsuit",
    "Golf Clubs",
    "Skateboard",
    "Helmet"
  ],
  "Toys and Games": [
    "Action Figures",
    "Dolls",
    "Board Games",
    "Puzzles",
    "Building Blocks",
    "RC Cars",
    "Stuffed Animals",
    "Video Games",
    "Playing Cards",
    "Educational Toys",
    "Toy Vehicles",
    "Outdoor Playsets"
  ],
  "Automotive": [
    "Car Accessories",
    "Motorcycle Gear",
    "Car Tires",
    "Car Battery",
    "Car Covers",
    "Bike Accessories",
    "Dashboard Cameras",
    "Engine Oil",
    "Car Cleaning Supplies"
  ],
  "Books and Stationery": [
    "Fiction",
    "Non-Fiction",
    "Textbooks",
    "Notebooks",
    "Pens",
    "Pencils",
    "Markers",
    "Planners",
    "Diaries",
    "Art Supplies",
    "Office Supplies"
  ],
  "Groceries": [
    "Fresh Vegetables",
    "Fresh Fruits",
    "Dairy Products",
    "Beverages",
    "Snacks",
    "Cereals",
    "Spices",
    "Meat",
    "Seafood",
    "Bakery Items",
    "Condiments"
  ],
  "Jewelry and Accessories": [
    "Necklace",
    "Bracelet",
    "Earrings",
    "Rings",
    "Watches",
    "Sunglasses",
    "Belts",
    "Hats",
    "Bags",
    "Wallets"
  ]
}


const CategoryDropdown = ({selectedCategory, setSelectedCategory}) => {
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (value) => {
    setSelectedCategory(value);
  };

  const filteredCategories = Object.entries(categories).reduce((acc, [group, items]) => {
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[group] = filteredItems;
    }
    return acc;
  }, {});
  return (
    <div className="w-full flex flex-col">
      <p className="pl-[10px] text-gray-500">Category</p>
      <Popover >
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full h-10 flex items-center justify-start gap-1 pl-3">
            <Plus className="text-blue-500"/>
            {selectedCategory || "Select Category"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0">
          <Command className="w-full">
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No result found</CommandEmpty>
              {Object.entries(categories).map(([group, items]) => {
                return (
                  <CommandGroup className="w-full" key={group} heading={group}>
                    {items.map((item) => (
                      <CommandItem key={item} onSelect={() => handleSelect(item)}>
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </CommandList>

          </Command>

        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoryDropdown;
