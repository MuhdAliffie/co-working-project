export default function AuthPage() {
  return (
    <div className="min-h-screen bg-cloud-surface flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-stone-200">
        <h1 className="text-2xl font-bold text-cloud-forest mb-2">Welcome back</h1>
        <p className="text-stone-500 mb-8">Sign in to your Cloudsy account.</p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cloud-brand"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cloud-brand"
          />
          <button
            type="submit"
            className="w-full bg-cloud-brand text-white py-3 rounded-xl font-bold hover:bg-cloud-forest transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-stone-500 mt-6">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-cloud-brand font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
