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
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About EstateIndia</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connecting buyers, sellers, and agents through our innovative triangle connection platform.
                </p>
            </div>

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
        </div>
    );
}
