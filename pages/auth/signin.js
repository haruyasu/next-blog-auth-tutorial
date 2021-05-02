import { getProviders, signIn } from 'next-auth/client'

export default function SignIn({ providers }) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-center text-3xl font-bold">Login</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}