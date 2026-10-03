const cars = [
    { id: 1, name: "BMW X5 xDrive40i", brand: "BMW", category: "SUV", fuel: "Petrol", price: 98, year: 2025, km: "8,200 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80", featured: true, status: "Available" },
    { id: 2, name: "Mercedes-Benz C-Class", brand: "Mercedes-Benz", category: "Sedan", fuel: "Petrol", price: 62, year: 2025, km: "5,400 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80", featured: true, status: "Available" },
    { id: 3, name: "Audi Q5 Technology", brand: "Audi", category: "SUV", fuel: "Petrol", price: 73, year: 2024, km: "12,100 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80", featured: true, status: "Available" },
    { id: 4, name: "Volvo XC40 Recharge", brand: "Volvo", category: "Electric", fuel: "Electric", price: 56, year: 2025, km: "3,200 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=80", featured: true, status: "Available" },
    { id: 5, name: "Porsche 718 Cayman", brand: "Porsche", category: "Coupe", fuel: "Petrol", price: 148, year: 2024, km: "6,700 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80", featured: true, status: "Available" },
    { id: 6, name: "Toyota Camry Hybrid", brand: "Toyota", category: "Sedan", fuel: "Hybrid", price: 48, year: 2025, km: "2,100 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Available" },
    { id: 7, name: "Jeep Meridian", brand: "Jeep", category: "SUV", fuel: "Diesel", price: 39, year: 2024, km: "18,400 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Available" },
    { id: 8, name: "Hyundai Ioniq 5", brand: "Hyundai", category: "Electric", fuel: "Electric", price: 47, year: 2025, km: "4,900 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1680694483774-2a3f0a2c7a8b?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Available" },
    { id: 9, name: "Range Rover Evoque", brand: "Land Rover", category: "SUV", fuel: "Diesel", price: 82, year: 2024, km: "15,300 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Available" },
    { id: 10, name: "Honda City ZX", brand: "Honda", category: "Sedan", fuel: "Petrol", price: 18, year: 2025, km: "3,100 km", transmission: "CVT", image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Available" },
    { id: 11, name: "Volkswagen Taigun GT", brand: "Volkswagen", category: "SUV", fuel: "Petrol", price: 22, year: 2025, km: "7,800 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Available" },
    { id: 12, name: "Lexus ES 300h", brand: "Lexus", category: "Sedan", fuel: "Hybrid", price: 74, year: 2024, km: "9,800 km", transmission: "Automatic", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80", featured: false, status: "Sold" }
];

const brands = [
    { name: "BMW", short: "B", count: 12, desc: "Performance and luxury" },
    { name: "Mercedes-Benz", short: "MB", count: 10, desc: "Luxury and innovation" },
    { name: "Audi", short: "A", count: 9, desc: "Progressive premium" },
    { name: "Volvo", short: "V", count: 7, desc: "Scandinavian design" },
    { name: "Porsche", short: "P", count: 5, desc: "Sports car excellence" },
    { name: "Toyota", short: "T", count: 14, desc: "Reliable everyday luxury" },
    { name: "Jeep", short: "J", count: 6, desc: "Adventure and capability" },
    { name: "Hyundai", short: "H", count: 18, desc: "Smart mobility" },
    { name: "Land Rover", short: "LR", count: 6, desc: "Luxury adventure" },
    { name: "Honda", short: "H", count: 11, desc: "Engineering and efficiency" },
    { name: "Volkswagen", short: "VW", count: 10, desc: "German engineering" },
    { name: "Lexus", short: "L", count: 5, desc: "Refined luxury" }
];

const offers = [
    { tag: "EXCHANGE BONUS", title: "Upgrade with up to ₹2.5 Lakh benefits", desc: "Bring your existing car and unlock exchange support on selected premium vehicles.", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80" },
    { tag: "FINANCE", title: "Flexible finance starting from 8.49%", desc: "Explore tailored monthly plans with our finance partners on eligible models.", image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80" },
    { tag: "ELECTRIC", title: "EV upgrade benefits", desc: "Special ownership packages and charging support on selected electric vehicles.", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80" }
];

const testDriveBookings = [
    { name: "Aarav Sharma", car: "BMW X5 xDrive40i", date: "02 Oct 2026", time: "11:30 AM" },
    { name: "Priya Nair", car: "Volvo XC40 Recharge", date: "03 Oct 2026", time: "03:00 PM" },
    { name: "Rohan Mehta", car: "Mercedes-Benz C-Class", date: "04 Oct 2026", time: "12:00 PM" }
];