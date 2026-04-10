import { NavLink } from 'react-router-dom';
import Button from './Button';
import logoImage from '../assets/logo.png';

const links = [
  { label: 'GET STARTED', to: '/' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'FITNESS BLOG', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'relative px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300',
    isActive
      ? 'text-violet-600'
      : 'text-zinc-600 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        
        {/* enhancement 3 logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 overflow-hidden rounded-lg border border-zinc-900">
            <img 
              src={logoImage}
              alt="Vibe Fitness Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-xl font-black text-zinc-900 uppercase tracking-tighter">
              Vibe<span className="text-violet-600">Fitness</span>
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-violet-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            to="/" 
            variant="primary" 
            className="bg-zinc-900 hover:bg-violet-600 border-zinc-900 text-white"
          >
            Join Now
          </Button>
        </div>

      </div>
    </header>
  );
};

export default NavBar;