export interface Request {
    id: number;
    type: 'Buy' | 'Rent';
    title: string;
    location: string;
    budgetMin: string;
    budgetMax: string;
    timeline: string;
    propertyType: string;
    user: string;
    postedDate: string;
    description: string;
    requirements: string[];
    status: 'Open' | 'Closed';
}

export const allRequests: Request[] = [
    {
        id: 1,
        type: 'Buy',
        title: 'Looking for 3BHK Apartment in Mumbai',
        location: 'Mumbai, Maharashtra',
        budgetMin: '₹2 Crore',
        budgetMax: '₹3 Crore',
        timeline: 'Within 3 months',
        propertyType: 'Apartment',
        user: 'John Doe',
        postedDate: '2 days ago',
        description: 'Looking for a spacious 3BHK apartment in a good locality with modern amenities. Preferred areas: Bandra, Andheri, Juhu. Should have parking, gym, and security.',
        requirements: ['3 Bedrooms', '2 Bathrooms', 'Parking', 'Gym', 'Security', 'Lift'],
        status: 'Open',
    },
    {
        id: 2,
        type: 'Rent',
        title: 'Need 2BHK Flat on Rent in Pune',
        location: 'Pune, Maharashtra',
        budgetMin: '₹25,000',
        budgetMax: '₹35,000',
        timeline: 'Immediate',
        propertyType: 'Flat',
        user: 'Jane Smith',
        postedDate: '1 day ago',
        description: 'Looking for a semi-furnished 2BHK flat in Hinjewadi or Baner. Must be close to IT parks and have basic amenities like power backup and water supply.',
        requirements: ['2 Bedrooms', 'Semi-furnished', 'Power Backup', 'Water Supply', 'Lift'],
        status: 'Open',
    },
    {
        id: 3,
        type: 'Buy',
        title: 'Investment Property in Bangalore',
        location: 'Bangalore, Karnataka',
        budgetMin: '₹80 Lakh',
        budgetMax: '₹1.5 Crore',
        timeline: 'Within 6 months',
        propertyType: 'Villa',
        user: 'Robert Wilson',
        postedDate: '3 days ago',
        description: 'Searching for a villa or a gated community plot for long-term investment. Preferred locations: Whitefield, Sarjapur Road, or Electronic City.',
        requirements: ['Gated Community', 'Garden', 'Swimming Pool', 'Clubhouse'],
        status: 'Open',
    },
    {
        id: 4,
        type: 'Rent',
        title: 'Office Space Required in Gurgaon',
        location: 'Gurgaon, Haryana',
        budgetMin: '₹1 Lakh',
        budgetMax: '₹2 Lakh',
        timeline: 'Next month',
        propertyType: 'Commercial',
        user: 'Tech Solutions Pvt Ltd',
        postedDate: '5 days ago',
        description: 'Need approximately 2000-3000 sq ft office space with modern infrastructure and good connectivity. Should have ample parking for employees.',
        requirements: ['2000-3000 sq ft', 'High-speed Internet', 'Parking', 'Cafeteria'],
        status: 'Open',
    }
];
