'use client';

import Link from 'next/link';

const categories = [
    {
        id: 1,
        name: 'Villa',
        count: '122 Properties',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
        link: '/properties?type=villa'
    },
    {
        id: 2,
        name: 'Apartment',
        count: '155 Properties',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
        link: '/properties?type=apartment'
    },
    {
        id: 3,
        name: 'Studio',
        count: '300 Properties',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
        link: '/properties?type=studio'
    },
    {
        id: 4,
        name: 'Office',
        count: '80 Properties',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        link: '/properties?type=office'
    },
    {
        id: 5,
        name: 'Townhouse',
        count: '90 Properties',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
        link: '/properties?type=townhouse'
    },
    {
        id: 6,
        name: 'Cottage',
        count: '45 Properties',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop',
        link: '/properties?type=cottage'
    }
];

const Categories = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Top categories
                    </h2>
                    <p className="text-gray-600">
                        Explore our wide variety of property types
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.link}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-200">{category.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
