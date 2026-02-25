export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last updated: January 2024</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">EstateIndia is committed to protecting your privacy.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Personal information (name, email, phone)</li>
                    <li>Property listing information</li>
                    <li>Usage data</li>
                </ul>
            </section>
        </div>
    );
}
