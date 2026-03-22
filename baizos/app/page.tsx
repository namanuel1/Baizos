import ImageUpload from "./components/ImageUpload";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <nav className="flex items-center justify-between px-8 py-6">
        <span className="text-sm font-medium tracking-widest uppercase text-black">Baizos</span>
        <div className="flex gap-8 text-xs tracking-wide text-neutral-600">
          <a href="#" className="hover:text-black transition-colors">Store</a>
          <a href="#" className="hover:text-black transition-colors">Products</a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <p className="text-xs tracking-widest uppercase text-neutral-600 mb-6">
          Product Identification
        </p>
        <h1 className="text-4xl font-light tracking-tight text-center mb-3 text-black">
          Upload a photo
        </h1>
        <p className="text-neutral-600 text-center mb-16 max-w-xs">
          Our AI will identify your product instantly.
        </p>
        <ImageUpload />
      </main>

      <footer className="px-8 py-6 text-[10px] tracking-widest uppercase text-neutral-500 text-center">
        Baizos
      </footer>
    </div>
  );
}
