export type ServiceType = 'Lawyer' | 'CA' | 'Notary' | 'Loan Advisor' | 'Company Secretary';

export interface Service {
    id: number;
    name: string;
    type: ServiceType;
    location: string;
    experience: number;
    verified: boolean;
    phone: string;
    email?: string;
    image?: string;
    description?: string;
    services?: string[];
    education?: string[];
    languages?: string[];
    rating?: number;
    reviews?: number;
    clientsServed?: number;
    availability?: string;
}

export const getServiceImage = (type: ServiceType): string => {
    const images: { [key in ServiceType]: string } = {
        'Lawyer': 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=600&h=400&fit=crop',
        'CA': 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&h=400&fit=crop',
        'Notary': 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&h=400&fit=crop',
        'Loan Advisor': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
        'Company Secretary': 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop',
    };
    return images[type];
};

export const allServices: Service[] = [
    {
        id: 1,
        name: 'Legal Solutions',
        type: 'Lawyer',
        location: 'Mumbai',
        experience: 15,
        verified: true,
        phone: '+91 98765 43210',
        email: 'contact@legalsolutions.com',
        description: 'Expert legal services for property transactions, documentation, and dispute resolution. Specialized in real estate law with over 15 years of experience handling complex property cases.',
        services: ['Property Documentation', 'Legal Verification', 'Title Search', 'Agreement Drafting', 'Dispute Resolution'],
        education: ['LLB - Mumbai University', 'LLM - Real Estate Law'],
        languages: ['English', 'Hindi', 'Marathi'],
        rating: 4.9,
        reviews: 127,
        clientsServed: 450,
        availability: 'Mon-Sat, 9AM-7PM'
    },
    {
        id: 2,
        name: 'Tax Experts CA',
        type: 'CA',
        location: 'Delhi',
        experience: 12,
        verified: true,
        phone: '+91 98765 43211',
        email: 'info@taxexperts.com',
        description: 'Chartered Accountancy firm specializing in property taxation, GST, and investment advisory. Comprehensive financial planning for real estate investments.',
        services: ['Property Tax Advisory', 'GST Registration', 'Investment Planning', 'Tax Filing', 'Audit Services'],
        education: ['CA - ICAI', 'CPA - Certified Public Accountant'],
        languages: ['English', 'Hindi', 'Punjabi'],
        rating: 4.8,
        reviews: 98,
        clientsServed: 320,
        availability: 'Mon-Fri, 10AM-6PM'
    },
    {
        id: 3,
        name: 'Notary Plus',
        type: 'Notary',
        location: 'Bangalore',
        experience: 8,
        verified: false,
        phone: '+91 98765 43212',
        email: 'services@notaryplus.com',
        description: 'Professional notary services for property documents, affidavits, and legal attestations. Fast and reliable document authentication services.',
        services: ['Document Attestation', 'Affidavit Services', 'Power of Attorney', 'Will Registration', 'Property Affidavits'],
        education: ['LLB - Bangalore University', 'Notary Public License'],
        languages: ['English', 'Kannada', 'Hindi'],
        rating: 4.7,
        reviews: 76,
        clientsServed: 280,
        availability: 'Mon-Sat, 9AM-8PM'
    },
    {
        id: 4,
        name: 'Loan Assist',
        type: 'Loan Advisor',
        location: 'Pune',
        experience: 10,
        verified: true,
        phone: '+91 98765 43213',
        email: 'support@loanassist.com',
        description: 'Home loan and mortgage advisory services. Expert guidance on loan products from all major banks and NBFCs. Best interest rates guaranteed.',
        services: ['Home Loan Advisory', 'Mortgage Services', 'Loan Comparison', 'Documentation Support', 'Bank Liaison'],
        education: ['MBA - Finance', 'Certified Financial Planner'],
        languages: ['English', 'Hindi', 'Marathi'],
        rating: 4.8,
        reviews: 156,
        clientsServed: 520,
        availability: 'Mon-Sun, 9AM-8PM'
    },
    {
        id: 5,
        name: 'Corporate CS',
        type: 'Company Secretary',
        location: 'Chennai',
        experience: 6,
        verified: true,
        phone: '+91 98765 43214',
        email: 'contact@corporatecs.com',
        description: 'Company secretarial services for real estate companies and property developers. Compliance, governance, and regulatory advisory.',
        services: ['Company Registration', 'Compliance Advisory', 'ROC Filing', 'Board Meetings', 'Secretarial Audit'],
        education: ['ACS - ICSI', 'LLB - Madras University'],
        languages: ['English', 'Tamil', 'Hindi'],
        rating: 4.6,
        reviews: 45,
        clientsServed: 180,
        availability: 'Mon-Fri, 9AM-6PM'
    },
    {
        id: 6,
        name: 'Property Legal Advisors',
        type: 'Lawyer',
        location: 'Hyderabad',
        experience: 11,
        verified: true,
        phone: '+91 98765 43215',
        email: 'legal@propertyadvisors.com',
        description: 'Specialized property legal services for residential and commercial real estate. Expert in RERA compliance and property dispute resolution.',
        services: ['RERA Compliance', 'Property Due Diligence', 'NRI Property Services', 'Land Title Verification', 'Property Litigation'],
        education: ['LLB - Osmania University', 'Diploma in Real Estate Law'],
        languages: ['English', 'Telugu', 'Hindi'],
        rating: 4.9,
        reviews: 112,
        clientsServed: 380,
        availability: 'Mon-Sat, 9AM-7PM'
    }
];
