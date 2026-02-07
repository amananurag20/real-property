import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PropertySection from '@/components/PropertySection';
import Footer from '@/components/Footer';
import { mumbaiProperties, bangaloreProperties, puneProperties, delhiProperties } from '@/data/properties';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <Hero />

      {/* Mumbai Properties */}
      <PropertySection
        title="Properties in Mumbai"
        subtitle="Explore premium properties in the city of dreams"
        properties={mumbaiProperties}
        bgColor="bg-white"
      />

      {/* Bangalore Properties */}
      <PropertySection
        title="Properties in Bangalore"
        subtitle="Discover homes in India's Silicon Valley"
        properties={bangaloreProperties}
        bgColor="bg-gradient-to-br from-blue-50 to-purple-50"
      />

      {/* Pune Properties */}
      <PropertySection
        title="Properties in Pune"
        subtitle="Find your perfect home in the Oxford of the East"
        properties={puneProperties}
        bgColor="bg-white"
      />

      {/* Delhi Properties */}
      <PropertySection
        title="Properties in Delhi"
        subtitle="Explore luxurious properties in the capital city"
        properties={delhiProperties}
        bgColor="bg-gradient-to-br from-purple-50 to-pink-50"
      />

      <Footer />
    </div>
  );
};

export default HomePage;