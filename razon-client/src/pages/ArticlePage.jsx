import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
          Vibe Blog
        </p>
        <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
          Fitness Tips & Nutrition Guides
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Our team of experts regularly shares science-backed workouts and meal-prep guides to help you maximize your gym time.
        </p>
        <div className="mt-6">
          <Button to="/" variant="primary">Get Started</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
            Latest Reads
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Learn From The Pros
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4 flex flex-col justify-between">
            <div>
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img src="https://plus.unsplash.com/premium_photo-1726704114403-71fe23a0dce9?q=80&w=1008" alt="Warm up" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Training
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">
                5 Essential Warmups to Prevent Injury
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Never skip your warm-up. These dynamic stretches prepare your joints for heavy lifting.
              </p>
            </div>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4 flex flex-col justify-between">
            <div>
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img src="https://plus.unsplash.com/premium_photo-1723579296380-09d38ce3a33a?q=80&w=1170" alt="Meal Prep" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Nutrition
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">
                The Myth About "Cheat Meals"
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                How treating yourself on the weekends affects your gains and how to do it correctly.
              </p>
            </div>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4 flex flex-col justify-between">
            <div>
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1764426445457-59169e244cce?q=80&w=1203" alt="Recovery" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Recovery
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">
                Maximize Post-Workout Recovery
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Understand the science of sleep and protein synthesis to unlock maximum muscle growth.
              </p>
            </div>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-white p-4 flex flex-col justify-between">
            <div>
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1693996045838-980674653385?q=80&w=1170" alt="Supplements" className="w-full h-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Supplements
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">
                What Supplements Actually Work?
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                A non-biased look at vitamins, protein powders, and pre-workouts you actually need.
              </p>
            </div>
            <Button className="mt-4" variant="primary">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;