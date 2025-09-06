export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 sm:px-10 lg:px-40">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
          Terms & Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By registering as a buyer or seller on our platform, you agree to be
            bound by the following terms and conditions. Please read them
            carefully.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            2. User Roles
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Sellers must verify their identity by uploading appropriate
            documents and agreeing to these terms. Buyers may browse and
            purchase products without additional verification.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            3. Conduct
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Users are expected to maintain respectful communication and comply
            with all local, state, and federal regulations while using the
            platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            4. Verification Documents
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Uploaded verification documents will be reviewed for authenticity.
            Fraudulent activity will result in permanent suspension from the
            platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            5. Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for any financial loss, delays, or damages
            arising from transactions between buyers and sellers.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            6. Updates
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These terms may be updated from time to time. Continued use of the
            platform implies acceptance of the updated terms.
          </p>
        </section>

        <p className="text-sm text-gray-500 text-center mt-8">
          Last updated: September 2025
        </p>
      </div>
    </div>
  );
}
