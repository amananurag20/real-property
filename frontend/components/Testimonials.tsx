'use client';

const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        role: 'Property Consultant',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
        properties: '32 Properties'
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'Senior Agent',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
        properties: '28 Properties'
    },
    {
        id: 3,
        name: 'Amit Patel',
        role: 'Real Estate Expert',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
        properties: '45 Properties'
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        role: 'Property Advisor',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
        properties: '38 Properties'
    }
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Our agents
                    </h2>
                    <p className="text-gray-600">
                        Meet our professional real estate agents
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((agent) => (
                        <div
                            key={agent.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{agent.role}</p>
                                <p className="text-sm text-blue-600 font-medium">{agent.properties}</p>
                                <button className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
