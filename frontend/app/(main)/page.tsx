import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import Categories from '@/components/Categories';
import PropertySection from '@/components/PropertySection';
import FeaturesSection from '@/components/FeaturesSection';
import Testimonials from '@/components/Testimonials';
import StatsSection from '@/components/StatsSection';
import { mumbaiProperties, bangaloreProperties, puneProperties, delhiProperties } from '@/data/properties';

const HomePage = () => {
    return (
        <div className="bg-white">
            <Hero />

            <SearchBar />

            <Categories />

            {/* Featured Properties */}
            <PropertySection
                title="Featured Properties"
                subtitle="Explore our handpicked premium properties"
                properties={mumbaiProperties}
                bgColor="bg-white"
                city="Mumbai"
            />

            <FeaturesSection />

            <Testimonials />

            <StatsSection />

            {/* Property Listings by City */}
            <PropertySection
                title="Properties in Bangalore"
                subtitle="Discover homes in India's Silicon Valley"
                properties={bangaloreProperties}
                bgColor="bg-gray-50"
                city="Bangalore"
            />

            <PropertySection
                title="Properties in Pune"
                subtitle="Find your perfect home in the Oxford of the East"
                properties={puneProperties}
                bgColor="bg-white"
                city="Pune"
            />

            <PropertySection
                title="Properties in Delhi"
                subtitle="Explore luxurious properties in the capital city"
                properties={delhiProperties}
                bgColor="bg-gray-50"
                city="Delhi"
            />
        </div>
    );
};

export default HomePage;
