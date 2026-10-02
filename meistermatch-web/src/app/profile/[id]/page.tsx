import { Bookmark, MapPin, CheckCircle, Mail, Phone, Globe } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-72 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Yves Vergara" className="w-full h-full object-cover" />
            </div>
            <div className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-green-200">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Available for work
            </div>
          </div>
          
          <div className="text-sm font-medium text-gray-600 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-md">
            Service prices start at €25/hr
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold">Yves Vergara</h1>
            <a href="#" className="text-xs text-gray-500 underline hover:text-black">View profile ↗</a>
          </div>
          
          <div className="text-gray-500 text-sm flex items-center gap-2 mb-1">
            <MapPin className="h-3.5 w-3.5" /> Riga, Latvia
          </div>
          <div className="text-gray-500 text-sm flex items-center gap-2 mb-6">
            <CheckCircle className="h-3.5 w-3.5" /> Can work within 50km
          </div>
          
          <div className="flex flex-col gap-2 mb-8">
            <button className="w-full bg-[#111] text-white py-3 rounded-md font-medium hover:bg-black transition-colors flex justify-center items-center gap-2">
              <Mail className="h-4 w-4" /> Hire
            </button>
            <button className="w-full bg-white border border-gray-300 text-black py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
               Chat
            </button>
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold mb-3">About me</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Skilled in painting and carpentry with 7 years of experience. I deliver quality craftsmanship in every project, from custom woodwork to flawless finishes. Your vision, brought to life with precision and care.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Services</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">Painting</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">Lighting Expert</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">Floor Coating</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">Carpenter</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">Handyman</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Contact and Socials</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +371 20 123 456</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> yves.services@gmail.com</div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> yvesvergservices</div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> @yvesvergservices</div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 md:pl-10">
          <div className="bg-gray-100 inline-block px-3 py-1 rounded text-xs font-medium text-gray-600 mb-4">
            Painting
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold tracking-tight">All-Around Painting Services</h2>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black">
              <Bookmark className="h-4 w-4" /> Bookmark
            </button>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <p>
              Transform your home with the touch of a dedicated and skilled painter. I'm Yves, a professional painter with 7 years of experience, offering personalized house painting services tailored to your unique needs. Whether you're looking to refresh a single room or update the entire exterior, I bring a meticulous approach to every project.
            </p>
            
            <h3 className="text-gray-900 font-semibold text-base pt-2">My Services Include:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="font-semibold text-gray-800">Interior Painting:</strong> I provide clean, detailed interior painting services, using high-quality paints to create the perfect atmosphere in your home.</li>
              <li><strong className="font-semibold text-gray-800">Exterior Painting:</strong> Protect and enhance your home's curb appeal with durable exterior painting that stands up to the elements.</li>
              <li><strong className="font-semibold text-gray-800">Color Consultation:</strong> Not sure what color to choose? I'll help you select the perfect shades that complement your style and space.</li>
              <li><strong className="font-semibold text-gray-800">Surface Preparation:</strong> From repairing small cracks to sanding and priming, I handle all prep work to ensure a smooth, long-lasting finish.</li>
            </ul>
            
            <h3 className="text-gray-900 font-semibold text-base pt-2">Why Choose Me?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="font-semibold text-gray-800">One-on-One Service:</strong> As a solo painter, I provide personalized attention to every project, ensuring that your vision is realized.</li>
              <li><strong className="font-semibold text-gray-800">Reliable and On-Time:</strong> I value your time and work efficiently to complete projects on schedule, without compromising quality.</li>
              <li><strong className="font-semibold text-gray-800">Customer Satisfaction:</strong> Your happiness is my priority. I work closely with you from start to finish to ensure you're delighted with the results.</li>
            </ul>
            
            <p className="pt-2">
              Bring your home to life with a fresh coat of paint. Contact me today for a free consultation, and let's make your home a place you love even more.
            </p>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Project Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 h-64 rounded-lg w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
              <div className="bg-gray-200 h-64 rounded-lg w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2031&auto=format&fit=crop" alt="Gallery 2" className="w-full h-full object-cover" />
              </div>
              <div className="bg-gray-200 h-48 rounded-lg w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" alt="Gallery 3" className="w-full h-full object-cover" />
              </div>
              <div className="bg-gray-200 h-48 rounded-lg w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" alt="Gallery 4" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
