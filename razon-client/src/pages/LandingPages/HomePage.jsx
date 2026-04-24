import Button from '../../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
              Feel the energy
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
              Match Your Energy. Transform Your Body.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Welcome to Vibe Fitness! Where we combine state-of-the-art equipment, best trainers, and a high-energy community to help you crush your fitness goals! 
            </p>
            <div className="mt-6 flex gap-3">
              <Button to="/about" variant="primary">
                Join the Vibe
              </Button>
              <Button to="/articles">Learn More</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1738321791387-a11c55f52d7a?q=80&w=1170" 
              alt="Home" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
            
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
            By The Numbers
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Why Choose Vibe Fitness
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5 hover:bg-violet-50 transition-colors">
            <p className="text-3xl font-black text-zinc-900">24/7</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Gym Access
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5 hover:bg-violet-50 transition-colors">
            <p className="text-3xl font-black text-zinc-900">20+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Elite Trainers
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5 hover:bg-violet-50 transition-colors">
            <p className="text-3xl font-black text-zinc-900">50+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Weekly Classes
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5 hover:bg-violet-50 transition-colors">
            <p className="text-3xl font-black text-zinc-900">95%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Member Satisfaction
            </p>
          </div>
        </div>
      </section>
            
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
            Our Programs
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Find Your Perfect Vibe
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1169" 
                alt="Power" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-zinc-900">
              Power & Strength
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Access top-tier free weights, power racks, and resistance machines designed to build pure strength.
            </p>
            <Button className="mt-4" variant="primary">
              Learn More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1170" 
                alt="Cardio" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-zinc-900">
              Cardio & HIIT
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              High-energy group classes and a massive selection of treadmills, cycles, and rowers.
            </p>
            <Button className="mt-4" variant="primary">
              Learn More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1170" 
                alt="Yoga" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-zinc-900">
              Mind & Body
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Decompress and recover with our guided yoga, mobility routines, and meditation sessions.
            </p>
            <Button className="mt-4" variant="primary">
              Learn More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;