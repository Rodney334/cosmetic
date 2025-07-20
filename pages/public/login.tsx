// /pages/public/login.tsx
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button 
        onClick={() => signIn('credentials', { email: 'test@test.com', password: 'test' })}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Se connecter (test@test.com)
      </button>
    </div>
  );
}