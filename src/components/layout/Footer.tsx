import profile from '../../data/profile';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { name, title, contact } = profile;

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      {/* Main footer body */}
      <div className="container-custom py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <a
            href="#hero"
            className="text-2xl font-bold text-neutral-900 tracking-tight"
          >
            KT
          </a>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
            {title} based in Sri Lanka. Building reliable, well-tested backend
            systems.
          </p>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors border border-neutral-300 hover:border-neutral-500 px-3 py-1.5 rounded-lg"
          >
            LinkedIn →
          </a>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase">
            Navigation
          </p>
          <nav className="flex flex-col gap-2.5">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase">
            Contact
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors w-fit"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.mobile.replace(/\s/g, '')}`}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors w-fit"
            >
              {contact.mobile}
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {contact.location}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © {year} {name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Designed &amp; built with React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
