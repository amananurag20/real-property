export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
            
            <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                    Last updated: January 2024
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 mb-4">
                        By accessing or using EstateIndia&apos;s website and services, you agree to be bound by these 
                        Terms and Conditions. If you disagree with any part of the terms, you may not access our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Services</h2>
                    <p className="text-gray-600 mb-4">
                        Our services allow you to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>List properties for sale or rent</li>
                        <li>Search for properties</li>
                        <li>Connect with real estate agents</li>
                        <li>Access professional services directory</li>
                    </ul>
                    <p className="text-gray-600 mb-4">
                        You agree to use our services only for lawful purposes and in accordance with these Terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                    <p className="text-gray-600 mb-4">
                        When you create an account with us, you must provide accurate and complete information. 
                        You are responsible for safeguarding the password and for all activities that occur under your account.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Property Listings</h2>
                    <p className="text-gray-600 mb-4">
                        By posting a property listing, you represent and warrant that:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>You have the right to list the property</li>
                        <li>All information provided is accurate and truthful</li>
                        <li>You will update the listing status promptly</li>
                        <li>You comply with all applicable laws and regulations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Activities</h2>
                    <p className="text-gray-600 mb-4">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Use the service for any illegal purposes</li>
                        <li>Post false, misleading, or fraudulent content</li>
                        <li>Harass, abuse, or harm others</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Use automated systems to access the service</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                    <p className="text-gray-600 mb-4">
                        EstateIndia shall not be liable for any indirect, incidental, special, consequential, 
                        or punitive damages resulting from your use of our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                    <p className="text-gray-600 mb-4">
                        We reserve the right to modify or replace these Terms at any time. We will provide 
                        notice of any significant changes.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                    <p className="text-gray-600">
                        If you have any questions about these Terms, please contact us at:
                        <br />
                        Email: legal@estateindia.com
                    </p>
                </section>
            </div>
        </div>
    );
}
