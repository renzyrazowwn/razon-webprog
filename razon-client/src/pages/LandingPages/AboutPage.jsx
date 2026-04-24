import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-zinc-900 overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000" 
              alt="About Vibe Fitness" 
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
              Our Vibe
            </p>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
              More Than Just A Gym. It's A Movement.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Vibe Fitness was founded on the idea that fitness shouldn't feel like a chore. We built a premium space where the music is right, the energy is contagious, and everyone is focused on unlocking their potential.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
            
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
            Premium Amenities
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Everything You Need Under One Roof
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
            <p className="text-2xl font-black text-violet-600">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Sauna & Steam
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
            <p className="text-2xl font-black text-violet-600">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Smoothie Bar
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
            <p className="text-2xl font-black text-violet-600">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Luxury Showers
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
            <p className="text-2xl font-black text-violet-600">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Cryotherapy
            </p>
          </div>
        </div>
      </section>
            
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
              Our Promise
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              The Vibe Fitness Standard
            </h2> 

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
                <h3 className="text-lg font-bold text-zinc-900">
                  Judgement-Free Zone
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Whether you are lifting 5 lbs or 500 lbs, you belong here. We prioritize respect and encouragement.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
                <h3 className="text-lg font-bold text-zinc-900">
                  Always Clean & Operational
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  No broken machines or messy locker rooms. We hold our staff to elite sanitation standards.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-white p-5">
                <h3 className="text-lg font-bold text-zinc-900">
                  Results Driven
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  We don't just sell memberships. We provide workout tracking apps and regular trainer check-ins.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-white p-5 h-fit">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
              Our Vibe
            </p>
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Inside the Gym</h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square overflow-hidden rounded-[1.25rem] border-2 border-zinc-900">
                <img src="https://images.unsplash.com/photo-1689877020200-403d8542d95d?q=80&w=1170" alt="Gym" className="w-full h-full object-cover" />
              </div>
              <div className="flex aspect-square overflow-hidden rounded-[1.25rem] border-2 border-zinc-900">
                <img src="https://images.unsplash.com/photo-1723117418183-2422c62a5a75?q=80&w=1170" alt="Weights" className="w-full h-full object-cover" />
              </div>
              <div className="flex aspect-square overflow-hidden rounded-[1.25rem] border-2 border-zinc-900">
                <img src="https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=1152" alt="Cardio" className="w-full h-full object-cover" />
              </div>
              <div className="flex aspect-square overflow-hidden rounded-[1.25rem] border-2 border-zinc-900">
                <img src="https://images.unsplash.com/photo-1606858274001-dd10efc5ce7d?q=80&w=1170" alt="Meal" className="w-full h-full object-cover" />
              </div>
            </div>

            <Button className="mt-5 w-full" variant="primary">Take A Virtual Tour</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;