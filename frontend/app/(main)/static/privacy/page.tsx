export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                    Last updated: January 2024
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                    <p className="text-gray-600 mb-4">
                        EstateIndia (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                        when you use our website and services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                    <p className="text-gray-600 mb-4">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Personal information (name, email, phone number)</li>
                        <li>Property listing information</li>
                        <li>Payment information</li>
                        <li>Communication preferences</li>
                        <li>Device and usage information</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                    <p className="text-gray-600 mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Provide and maintain our services</li>
                        <li>Process your transactions</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Communicate with you about products, services, and events</li>
                        <li>Monitor and analyze trends and usage</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sharing of Information</h2>
                    <p className="text-gray-600 mb-4">
                        We may share your information with:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                        <li>Other users as necessary for property transactions</li>
                        <li>Service providers and business partners</li>
                        <li>Legal authorities when required by law</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Security</h2>
                    <p className="text-gray-600 mb-4">
                        We take reasonable measures to help protect your personal information from loss, theft, 
                        misuse, unauthorized access, disclosure, alteration, and destruction.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                    <p className="text-gray-600">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        Email: privacy@estateindia.com
                    </p>
                </section>
            </div>
        </div>
    );
}
