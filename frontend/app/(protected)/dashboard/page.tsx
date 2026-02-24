export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Listings', value: '12', color: 'bg-blue-500' },
                    { label: 'Views this Month', value: '1,284', color: 'bg-indigo-500' },
                    { label: 'Active Inquiries', value: '8', color: 'bg-green-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                </div>
                <div className="p-0">
                    <div className="divide-y divide-gray-100">
                        {[
                            'New inquiry on "Sunset Villa", Mumbai',
                            'Listing "Modern Apartment" was approved',
                            'You saved 4 new properties in Bangalore',
                            'Price updated for "Eco Heights", Pune'
                        ].map((activity, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700">{activity}</span>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">2 hours ago</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
