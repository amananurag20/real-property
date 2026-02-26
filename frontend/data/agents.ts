export interface Agent {
    id: number;
    name: string;
    agency: string;
    experience: string;
    specialization: string;
    serviceAreas: string;
    verified: boolean;
    image: string;
    email?: string;
    phone?: string;
    bio?: string;
    languages?: string[];
    activeListings?: number;
    successfulDeals?: number;
    rating?: number;
    reviews?: number;
}

export const allAgents: Agent[] = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        agency: 'Premium Properties',
        experience: '8 years',
        specialization: 'Luxury Homes',
        serviceAreas: 'South Mumbai',
        verified: true,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        email: 'rajesh.kumar@premiumproperties.com',
        phone: '+91 98765 43210',
        bio: 'Specialized in luxury residential properties with 8+ years of experience in South Mumbai. Expert in high-value transactions and premium client servicing.',
        languages: ['English', 'Hindi', 'Marathi'],
        activeListings: 24,
        successfulDeals: 156,
        rating: 4.9,
        reviews: 89
    },
    {
        id: 2,
        name: 'Priya Sharma',
        agency: 'Urban Realty',
        experience: '5 years',
        specialization: 'Commercial Properties',
        serviceAreas: 'Bangalore Central',
        verified: true,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        email: 'priya.sharma@urbanrealty.com',
        phone: '+91 98765 43211',
        bio: 'Commercial real estate specialist with expertise in office spaces, retail outlets, and investment properties in Bangalore.',
        languages: ['English', 'Hindi', 'Kannada'],
        activeListings: 18,
        successfulDeals: 92,
        rating: 4.8,
        reviews: 67
    },
    {
        id: 3,
        name: 'Amit Patel',
        agency: 'Metro Homes',
        experience: '12 years',
        specialization: 'Investment Properties',
        serviceAreas: 'Gurgaon & Noida',
        verified: true,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'amit.patel@metrohomes.com',
        phone: '+91 98765 43212',
        bio: 'Senior real estate consultant specializing in investment properties and portfolio management across NCR region.',
        languages: ['English', 'Hindi', 'Gujarati'],
        activeListings: 31,
        successfulDeals: 243,
        rating: 4.9,
        reviews: 124
    },
    {
        id: 4,
        name: 'Sneha Gupta',
        agency: 'Dream Realty',
        experience: '10 years',
        specialization: 'Residential',
        serviceAreas: 'Pune',
        verified: true,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        email: 'sneha.gupta@dreamrealty.com',
        phone: '+91 98765 43213',
        bio: 'Residential property expert with deep knowledge of Pune market. Specializes in family homes and apartments.',
        languages: ['English', 'Hindi', 'Marathi'],
        activeListings: 19,
        successfulDeals: 178,
        rating: 4.7,
        reviews: 95
    },
    {
        id: 5,
        name: 'Vikram Singh',
        agency: 'Elite Properties',
        experience: '7 years',
        specialization: 'Luxury Villas',
        serviceAreas: 'Delhi',
        verified: true,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        email: 'vikram.singh@eliteproperties.com',
        phone: '+91 98765 43214',
        bio: 'Luxury villa specialist with exclusive portfolio of premium properties in Delhi and surrounding areas.',
        languages: ['English', 'Hindi', 'Punjabi'],
        activeListings: 15,
        successfulDeals: 87,
        rating: 4.8,
        reviews: 56
    },
    {
        id: 6,
        name: 'Neha Verma',
        agency: 'City Homes',
        experience: '6 years',
        specialization: 'Apartments',
        serviceAreas: 'Mumbai',
        verified: false,
        image: 'https://images.unsplash.com/photo-1517841905240-74f5b1b4e5f5?w=150&h=150&fit=crop&crop=face',
        email: 'neha.verma@cityhomes.com',
        phone: '+91 98765 43215',
        bio: 'Apartment specialist focusing on affordable housing and first-time buyers in Mumbai metropolitan region.',
        languages: ['English', 'Hindi'],
        activeListings: 22,
        successfulDeals: 134,
        rating: 4.6,
        reviews: 78
    }
];
