import { Navbar } from '@/components/Navbar';

export default function HelpPage() {
  return (
    <main className="flex flex-col bg-[#F5F5F5] min-h-screen">
      <Navbar />
      <section className="flex-1 px-6 pt-32 pb-6 flex items-center justify-center max-w-[88rem] mx-auto w-full">
        <div className="text-center">
          <h1 className="text-black text-6xl md:text-7xl font-medium leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
            Help
          </h1>
          <p className="text-black/60 text-lg max-w-lg mx-auto leading-relaxed">
            Discover the future of agentic fiat-crypto settlements. More updates coming soon to this section.
          </p>
        </div>
      </section>
    </main>
  );
}
