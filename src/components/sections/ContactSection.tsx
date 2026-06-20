import profile from '../../data/profile';

const ContactSection = () => {
  const { contact } = profile;

  const channels = [
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      action: 'Send an email',
    },
    {
      label: 'Phone',
      value: contact.mobile,
      href: `tel:${contact.mobile.replace(/\s/g, '')}`,
      action: 'Call',
    },
    {
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`,
      action: 'Message on WhatsApp',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/kasunth',
      href: contact.linkedin,
      action: 'View profile',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — heading + blurb */}
          <div>
            <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-2">
              Get in touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Contact
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed max-w-md">
              Open to new opportunities, collaborations, or just a conversation
              about software. Reach out through any of the channels below.
            </p>

            <div className="mt-8 p-5 border border-neutral-200 rounded-xl bg-white inline-flex flex-col gap-1">
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase">
                Location
              </p>
              <p className="text-sm font-medium text-neutral-900 mt-1">
                {contact.address}
              </p>
            </div>
          </div>

          {/* Right — contact channels */}
          <div className="flex flex-col gap-3">
            {channels.map(({ label, value, href, action }) => (
              <a
                key={label}
                href={href}
                target={
                  label === 'LinkedIn' || label === 'WhatsApp'
                    ? '_blank'
                    : undefined
                }
                rel={
                  label === 'LinkedIn' || label === 'WhatsApp'
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="group flex items-center justify-between gap-4 p-5 bg-white border border-neutral-200 rounded-xl hover:border-neutral-400 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-neutral-900">
                    {value}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0">
                  {action} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
