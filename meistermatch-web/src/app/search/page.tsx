"use client";

import { Search, Star, Bookmark, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const mockServices = [
  { id: 1, title: "House Cleaning Service", provider: "Jane Doe", location: "Riga, Latvia", rating: 4.5, reviews: 34, price: "€15/hr", category: "Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Construction Work", provider: "John Doe", location: "Riga, Latvia", rating: 4.8, reviews: 112, price: "€25/hr", category: "Construction", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Gardening Service", provider: "Anna B.", location: "Jurmala, Latvia", rating: 4.7, reviews: 54, price: "€18/hr", category: "Gardening", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Lawn Mowing", provider: "Peter Z.", location: "Riga, Latvia", rating: 4.9, reviews: 12, price: "€15/hr", category: "Gardening", image: "https://images.unsplash.com/photo-1558904541-efa8c196b27d?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, title: "Solar Panel Installer", provider: "Janis K.", location: "Liepaja, Latvia", rating: 4.9, reviews: 88, price: "€30/hr", category: "Electrical", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, title: "Electrician", provider: "Miks L.", location: "Riga, Latvia", rating: 4.6, reviews: 42, price: "€22/hr", category: "Electrical", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, title: "House Painting", provider: "Yves V.", location: "Ogre, Latvia", rating: 4.5, reviews: 34, price: "€18/hr", category: "Painting", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, title: "All-Around Painting", provider: "Yves V.", location: "Riga, Latvia", rating: 4.5, reviews: 34, price: "€18/hr", category: "Painting", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1000&auto=format&fit=crop" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Sync state if URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const filteredServices = mockServices.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-16 overflow-hidden">
      {/* Dark Search Header */}
      <div className="bg-[#111] text-white py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">
            Find Skilled Tradespeople for Your Needs
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md bg-[#222] text-white focus:outline-none focus:ring-1 focus:ring-white placeholder-gray-400 sm:text-sm"
                placeholder="Search for a service (e.g., Electrician)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Services Near You</h2>
          <button className="text-sm font-medium text-gray-600 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 flex items-center gap-1">
            See all <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredServices.map((service) => (
              <Link href={`/profile/${service.id}`} key={service.id} className="group flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                <div className="h-44 bg-gray-100 w-full relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if network fails
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{service.title}</h3>
                    <Bookmark className="h-5 w-5 text-gray-400 shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Job ad by <span className="font-medium text-gray-800">{service.provider}</span></p>
                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-1">
                    <MapPin className="h-3 w-3" /> {service.location}
                  </div>
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex items-center text-xs">
                      <Star className="h-3.5 w-3.5 text-black fill-black mr-1" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-gray-400 ml-1">({service.reviews} reviews)</span>
                    </div>
                    <div className="font-semibold text-sm">{service.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500 mb-16 border-2 border-dashed border-gray-200 rounded-xl">
            No services found matching "{searchQuery}". Try adjusting your search!
          </div>
        )}
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended (Swipeable)</h2>
        
        {/* Swipeable Horizontal Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
           {mockServices.slice(4).map((service) => (
            <Link href={`/profile/${service.id}`} key={`rec-${service.id}`} className="snap-start shrink-0 w-72 group flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
              <div className="h-44 bg-gray-100 w-full relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{service.title}</h3>
                  <Bookmark className="h-5 w-5 text-gray-400 shrink-0" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Job ad by <span className="font-medium text-gray-800">{service.provider}</span></p>
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-1">
                  <MapPin className="h-3 w-3" /> {service.location}
                </div>
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs">
                    <Star className="h-3.5 w-3.5 text-black fill-black mr-1" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-gray-400 ml-1">({service.reviews} reviews)</span>
                  </div>
                  <div className="font-semibold text-sm">{service.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
