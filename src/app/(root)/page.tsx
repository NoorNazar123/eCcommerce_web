import AddToCart from '@/components/AddToCart';

export default function Home() {
  return (
    <div className="grid h-screen place-items-center p-8">
      <main className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-7xl font-semibold text-gray-900 dark:text-white">
          eCommerce Builder
        </h1>
        <AddToCart />
      </main>
    </div>
  );
}
