const productData = {
  product: Array.from({ length: 50 }, (_, i) => {
    const id = String(i + 1).padStart(3, "0");

    const categories = [
      "Electronics",
      "Wearables",
      "Accessories",
      "Home",
      "Gaming",
      "Office",
    ];

    const names = [
      "Wireless Headphones",
      "Smart Watch",
      "Gaming Mouse",
      "Mechanical Keyboard",
      "Bluetooth Speaker",
      "USB-C Hub",
      "Laptop Stand",
      "Noise Cancelling Earbuds",
      "Webcam HD",
      "Portable SSD",
    ];

    const category = categories[i % categories.length];
    const name = names[i % names.length];

    return {
      id: `PRD-${id}`,
      name: `${name} ${id}`,
      category,
      price: Number((Math.random() * 300 + 20).toFixed(2)),
      stock: Math.floor(Math.random() * 200),
      sales: Math.floor(Math.random() * 1000),
      image: `https://picsum.photos/seed/product-${id}/100`,
    };
  }),
};

export default productData;
