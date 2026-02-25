'use client';

const stats = [
    {
        id: 1,
        value: '98%',
        label: 'Customer Satisfaction',
        description: 'Happy clients who found their dream home'
    },
    {
        id: 2,
        value: '$50,000+',
        label: 'Properties Value',
        description: 'Total value of properties sold'
    },
    {
        id: 3,
        value: '745',
        label: 'Property Ready',
        description: 'Properties available for sale'
    }
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Flexible facilities for stable investments
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide the best facilities to help you invest in properties with confidence
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                {stat.value}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>
                            <p className="text-gray-600">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
