import profile from '../../data/profile';

const AboutSection = () => {
  const { title, summary, yearsOfExperience, contact, employmentHistory } =
    profile;
  const currentRole = employmentHistory[0];

  const stats = [
    { value: yearsOfExperience, label: 'Years of experience' },
    { value: '9+', label: 'Projects delivered' },
    { value: '7', label: 'Companies worked' },
  ];

  const details = [
    { label: 'Location', value: 'Matara, Sri Lanka' },
    { label: 'Email', value: contact.email },
    { label: 'Phone', value: contact.mobile },
    { label: 'Birthday', value: contact.birthday },
  ];

  return (
    <section id="about" className="section-padding border-t border-neutral-100">
      <div className="container-custom">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-2">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Who I am
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — bio + details */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-neutral-600 text-base leading-relaxed">
                {summary}
              </p>
              <p className="text-neutral-600 text-base leading-relaxed">
                Currently working as a{' '}
                <span className="font-medium text-neutral-900">
                  {currentRole.role}
                </span>{' '}
                at{' '}
                <span className="font-medium text-neutral-900">
                  {currentRole.company}
                </span>
                , focused on building reliable, well-tested backend systems.
              </p>
            </div>

            {/* Personal details */}
            <div className="flex flex-col gap-3">
              {details.map(({ label, value }) => (
                <div key={label} className="flex gap-4 text-sm">
                  <span className="w-20 shrink-0 text-neutral-400">
                    {label}
                  </span>
                  <span className="text-neutral-700">{value}</span>
                </div>
              ))}
            </div>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-6 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium hover:border-neutral-400 transition-colors"
            >
              View LinkedIn
            </a>
          </div>

          {/* Right — stats */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium text-neutral-500">
              By the numbers
            </p>
            <div className="grid grid-cols-1 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-6 p-5 border border-neutral-200 rounded-xl"
                >
                  <span className="text-4xl font-bold text-neutral-900 w-16 shrink-0">
                    {value}
                  </span>
                  <span className="text-sm text-neutral-500">{label}</span>
                </div>
              ))}
            </div>

            <div className="p-5 border border-neutral-200 rounded-xl mt-2">
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-3">
                Current role
              </p>
              <p className="text-base font-semibold text-neutral-900">
                {title}
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                {currentRole.company}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {currentRole.period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
