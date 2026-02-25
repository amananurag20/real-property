export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
            <p className="text-gray-600 mb-6">Last updated: January 2024</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">By using EstateIndia, you agree to these terms.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Services</h2>
                <p className="text-gray-600">Our services allow you to list and search properties.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Contact</h2>
                <p className="text-gray-600">Email: legal@estateindia.com</p>
            </section>
        </div>
    );
}
