import React, { useState } from 'react';

const FishSection = () => {
  const [activeCountry, setActiveCountry] = useState('indonesia');
  
  const countries = [
    { id: 'indonesia', name: 'Indonesia', icon: '🇮🇩' },
    { id: 'malaysia', name: 'Malaysia', icon: '🇲🇾' },
    { id: 'singapore', name: 'Singapore', icon: '🇸🇬' },
    { id: 'australia', name: 'Australia', icon: '🇦🇺' },
    { id: 'japan', name: 'Japan', icon: '🇯🇵' }
  ];
  
  // Sample fish data per country - you can replace with actual data
  const fishData = {
    indonesia: [
      { name: 'Gurame', rarity: 'common', description: 'Freshwater fish commonly found in Indonesian ponds', price: 50, weight: '0.5-2' },
      { name: 'Arwana', rarity: 'uncommon', description: 'Prestigious freshwater fish from Indonesian rivers', price: 500, weight: '2-5' }
    ],
    malaysia: [
      { name: 'Patin', rarity: 'common', description: 'Popular freshwater fish in Malaysian cuisine', price: 40, weight: '1-3' }
    ],
    singapore: [
      { name: 'Red Snapper', rarity: 'uncommon', description: 'Common in Singapore waters', price: 150, weight: '1-4' }
    ],
    australia: [
      { name: 'Barramundi', rarity: 'uncommon', description: 'Popular Australian sporting fish', price: 200, weight: '2-6' }
    ],
    japan: [
      { name: 'Koi', rarity: 'uncommon', description: 'Ornamental carp variety from Japan', price: 300, weight: '1-3' }
    ]
  };

  return (
    <div className="content-section" id="fish-section">
      <div className="section-header">
        <h2 className="flex items-center gap-3">
          <i className="fas fa-fish"></i> Fish Species
        </h2>
      </div>
      
      {/* Country Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {countries.map(country => (
          <button
            key={country.id}
            onClick={() => setActiveCountry(country.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${activeCountry === country.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-gray-600'}`}
          >
            <span>{country.icon}</span>
            <span>{country.name}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search fish..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-gray-200"
        />
      </div>

      {/* Fish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fishData[activeCountry].map((fish, index) => (
          <div key={index} className="flex gap-4 p-4 bg-white/10 rounded-lg hover:translate-y-1 transition-all">
            <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <i className="fas fa-fish text-3xl text-white"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{fish.name}</h3>
              <p className={`text-sm font-medium mb-1 ${
                fish.rarity === 'common' ? 'text-gray-600' : 'text-green-600'
              }`}>
                {fish.rarity.charAt(0).toUpperCase() + fish.rarity.slice(1)}
              </p>
              <p className="text-sm text-gray-600 mb-2">{fish.description}</p>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-coins text-blue-500"></i>
                  {fish.price}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-weight-hanging text-blue-500"></i>
                  {fish.weight} kg
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FishSection;