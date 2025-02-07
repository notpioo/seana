// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.content-section');
    
    // Set default active country
    let activeCountry = 'indonesia';
    
    // Fish data organized by country
    const fishData = {
        indonesia: [
            {
                name: 'Lele',
                rarity: 'common',
                description: '',
                price: 200
            },
            {
                name: 'Mujair',
                rarity: 'common',
                description: '',
                price: 210,
            },
            {
                name: 'Nila',
                rarity: 'common',
                description: '',
                price: 230,
            },
            {
                name: 'Teri',
                rarity: 'common',
                description: '',
                price: 240,
            },
            {
                name: 'Mas',
                rarity: 'common',
                description: '',
                price: 250,
            },

            {
                name: 'Kakap',
                rarity: 'uncommon',
                description: '',
                price: 300,
            },
            {
                name: 'Tenggiri',
                rarity: 'uncommon',
                description: '',
                price: 310,
            },
            {
                name: 'Kerapu',
                rarity: 'uncommon',
                description: '',
                price: 320,
            },
            {
                name: 'Gurame',
                rarity: 'uncommon',
                description: '',
                price: 330,
            },
            {
                name: 'Koi',
                rarity: 'uncommon',
                description: '',
                price: 340,
            },

            {
                name: 'Tongkol',
                rarity: 'rare',
                description: '',
                price: 350,
            },
            {
                name: 'Belut',
                rarity: 'rare',
                description: '',
                price: 360,
            },
            {
                name: 'Gabus',
                rarity: 'rare',
                description: '',
                price: 380,
            },
            {
                name: 'Cakalang',
                rarity: 'rare',
                description: '',
                price: 390,
            },
            {
                name: 'Patin',
                rarity: 'rare',
                description: '',
                price: 400,
            },

            {
                name: 'Bandeng',
                rarity: 'epic',
                description: '',
                price: 410,
            },
            {
                name: 'Bawal',
                rarity: 'epic',
                description: '',
                price: 420,
            },
            {
                name: 'Sarden',
                rarity: 'epic',
                description: '',
                price: 430,
            },
            {
                name: 'Sidat',
                rarity: 'epic',
                description: '',
                price: 440,
            },
            {
                name: 'Belanak',
                rarity: 'epic',
                description: '',
                price: 450,
            },

            {
                name: 'Koi',
                rarity: 'legendary',
                description: '',
                price: 550,
            },
            {
                name: 'Hiu',
                rarity: 'legendary',
                description: '',
                price: 560,
            },
            {
                name: 'Buntal',
                rarity: 'legendary',
                description: '',
                price: 570,
            },
            {
                name: 'Louhan',
                rarity: 'legendary',
                description: '',
                price: 580,
            },
            {
                name: 'Arwana',
                rarity: 'legendary',
                description: '',
                price: 600,
            },

            {
                name: 'Belida',
                rarity: 'mythic',
                description: '',
                price: 800,
            },
            {
                name: 'Batak',
                rarity: 'mythic',
                description: '',
                price: 840,
            },
            {
                name: 'Semah',
                rarity: 'mythic',
                description: '',
                price: 880,
            },
            {
                name: 'Hiu Gergaji',
                rarity: 'mythic',
                description: '',
                price: 920,
            },
            {
                name: 'Kancra',
                rarity: 'mythic',
                description: '',
                price: 950,
            },

            {
                name: 'Balashark',
                rarity: 'secret',
                description: '',
                price: 1100,
            },
            {
                name: 'Megalodon',
                rarity: 'secret',
                description: '',
                price: 1200,
            }
        ],
        malaysia: [
            {
                name: 'Patin',
                rarity: 'common',
                description: 'Popular freshwater fish in Malaysian cuisine',
                price: 40,
                weight: '1-3'
            }
        ],
        singapore: [
            {
                name: 'Red Snapper',
                rarity: 'uncommon',
                description: 'Common in Singapore waters',
                price: 150,
                weight: '1-4'
            }
        ],
        australia: [
            {
                name: 'Barramundi',
                rarity: 'uncommon',
                description: 'Popular Australian sporting fish',
                price: 200,
                weight: '2-6'
            }
        ],
        japan: [
            {
                name: 'Koi',
                rarity: 'uncommon',
                description: 'Ornamental carp variety from Japan',
                price: 300,
                weight: '1-3'
            }
        ]
    };

    // Function to generate fish card HTML
    function generateFishCard(fish) {
        return `
            <div class="fish-card" data-name="${fish.name.toLowerCase()}" data-rarity="${fish.rarity}">
                <div class="fish-image rarity-${fish.rarity}">
                    <i class="fas fa-fish"></i>
                </div>
                <div class="fish-info">
                    <h3>${fish.name}</h3>
                    <p class="rarity ${fish.rarity}">${fish.rarity.charAt(0).toUpperCase() + fish.rarity.slice(1)}</p>
                    <p class="description">${fish.description}</p>
                    <div class="stats">
                        <span><i class="fas fa-coins"></i> ${fish.price}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to generate country navigation
    function generateCountryNav() {
        const countries = [
            { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩' },
            { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
            { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
            { id: 'australia', name: 'Australia', flag: '🇦🇺' },
            { id: 'japan', name: 'Japan', flag: '🇯🇵' }
        ];

        const navHtml = countries.map(country => `
            <button class="country-tab ${country.id === activeCountry ? 'active' : ''}" 
                    data-country="${country.id}">
                <span>${country.flag}</span>
                <span>${country.name}</span>
            </button>
        `).join('');

        return `
            <div class="country-nav">
                ${navHtml}
            </div>
        `;
    }

    // Function to update fish grid
    function updateFishGrid(country) {
        const fishGrid = document.querySelector('.fish-grid');
        if (fishGrid && fishData[country]) {
            fishGrid.innerHTML = fishData[country].map(fish => generateFishCard(fish)).join('');
        }
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(`${tab.dataset.tab}-section`);
            targetSection.classList.add('active');

            // If switching to fish section, initialize country nav if not already done
            if (tab.dataset.tab === 'fish' && !document.querySelector('.country-nav')) {
                const fishSection = document.getElementById('fish-section');
                const searchBar = fishSection.querySelector('.search-bar');
                
                // Insert country navigation before search bar
                const countryNavContainer = document.createElement('div');
                countryNavContainer.innerHTML = generateCountryNav();
                searchBar.parentNode.insertBefore(countryNavContainer, searchBar);

                // Add click events to country tabs
                document.querySelectorAll('.country-tab').forEach(countryTab => {
                    countryTab.addEventListener('click', () => {
                        // Update active state
                        document.querySelectorAll('.country-tab').forEach(t => t.classList.remove('active'));
                        countryTab.classList.add('active');
                        
                        // Update fish grid
                        activeCountry = countryTab.dataset.country;
                        updateFishGrid(activeCountry);
                    });
                });

                // Initialize first country's fish
                updateFishGrid(activeCountry);
            }
        });
    });

    // Fish search functionality
    const fishSearch = document.getElementById('fishSearch');
    if (fishSearch) {
        fishSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const fishCards = document.querySelectorAll('.fish-card');

            fishCards.forEach(card => {
                const fishName = card.dataset.name.toLowerCase();
                const visible = fishName.includes(searchTerm);
                card.style.display = visible ? 'flex' : 'none';
            });
        });
    }

    // Add smooth scrolling for mobile tab navigation
    const tabContainer = document.querySelector('.wiki-nav');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    tabContainer.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - tabContainer.offsetLeft;
        scrollLeft = tabContainer.scrollLeft;
    });

    tabContainer.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    tabContainer.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    tabContainer.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - tabContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tabContainer.scrollLeft = scrollLeft - walk;
    });

    // Add touch support for mobile
    tabContainer.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX - tabContainer.offsetLeft;
        scrollLeft = tabContainer.scrollLeft;
    });

    tabContainer.addEventListener('touchend', () => {
        isScrolling = false;
    });

    tabContainer.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - tabContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tabContainer.scrollLeft = scrollLeft - walk;
    });
});

// Add loading state function
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
    } else {
        element.classList.remove('loading');
    }
}

// Add card hover effects
document.querySelectorAll('.fish-card, .rod-card, .bait-card, .area-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Save last active tab to localStorage
function saveActiveTab(tabId) {
    localStorage.setItem('activeTab', tabId);
}

// Restore last active tab on page load
function restoreActiveTab() {
    const lastActiveTab = localStorage.getItem('activeTab');
    if (lastActiveTab) {
        const tab = document.querySelector(`[data-tab="${lastActiveTab}"]`);
        if (tab) {
            tab.click();
        }
    }
}

// Initialize when page loads
window.addEventListener('load', restoreActiveTab);