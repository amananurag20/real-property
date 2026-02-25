import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, MapPin, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { icon: Building2, label: 'Properties Listed', value: '10,000+' },
        { icon: Users, label: 'Active Users', value: '50,000+' },
        { icon: MapPin, label: 'Cities Covered', value: '100+' },
        { icon: TrendingUp, label: 'Successful Deals', value: '5,000+' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About EstateIndia</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connecting buyers, sellers, and agents through our innovative triangle connection platform. 
                    We make real estate transactions seamless and transparent.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-6 text-center">
                            <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-gray-500">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Mission */}
            <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-center">
                    To revolutionize the real estate industry by creating a transparent, efficient, and 
                    user-friendly platform that connects property seekers with verified agents and property owners. 
                    We believe in making property transactions hassle-free and accessible to everyone.
                </p>
            </div>

            {/* How It Works */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-blue-600">1</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Post Your Requirement</h3>
                        <p className="text-gray-500">List your property or post your buying/renting requirements</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-blue-600">2</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Connect with Agents</h3>
                        <p className="text-gray-500">Our verified agents match properties with your requirements</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-blue-600">3</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Close the Deal</h3>
                        <p className="text-gray-500">Connect directly and complete your property transaction</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
