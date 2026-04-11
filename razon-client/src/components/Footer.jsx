import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* vibefitness slogan */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-xl font-black text-zinc-900 uppercase tracking-tighter">
              Vibe<span className="text-violet-600">Fitness</span>
            </Link>
            <p className="text-sm leading-6 text-zinc-600">
              Transforming lives through energy, community, and science-backed training.
            </p>
          </div>

          {/* explore */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">Explore</h4>
            <Link to="/" className="text-sm text-zinc-600 hover:text-violet-600">Home</Link>
            <Link to="/about" className="text-sm text-zinc-600 hover:text-violet-600">About Us</Link>
            <Link to="/articles" className="text-sm text-zinc-600 hover:text-violet-600">Fitness Blog</Link>
          </div>

          {/* connect */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">Connect</h4>
            <p className="text-sm text-zinc-600">Email: test@vibefitness.com</p>
            <p className="text-sm text-zinc-600">Location: Manila, Philippines</p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-zinc-200 pt-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            © 2026 Vibe Fitness. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;