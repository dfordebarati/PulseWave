// src/app/components/Header.tsx

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">PulseWave</h1>
      <nav>
        <a href="/" className="mr-4 hover:underline">
          Home
        </a>
        <a href="/login" className="hover:underline">
          Login Now
        </a>
      </nav>
    </header>
  );
}
