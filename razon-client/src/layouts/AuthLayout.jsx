import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="relative flex items-center justify-center overflow-hidden border-b-2 border-zinc-900 bg-gradient-to-br from-zinc-900 via-zinc-800 to-violet-700 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-900 lg:p-16">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-violet-500 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-zinc-500 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center rounded-[2rem] border-2 border-zinc-900 bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
              Vibe Fitness
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-zinc-900">
              Start Strong. Stay Consistent.
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Log in or create an account to join the Vibe Fitness community.
            </p>

            <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-50 p-4">
                <p className="text-xl font-black text-violet-600">24/7</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Access
                </p>
              </div>

              <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-50 p-4">
                <p className="text-xl font-black text-violet-600">20+</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Trainers
                </p>
              </div>

              <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-50 p-4">
                <p className="text-xl font-black text-violet-600">50+</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Classes
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;