import profile from '../../data/profile';

const ExperienceSection = () => {
  const { employmentHistory } = profile;

  return (
    <section
      id="experience"
      className="section-padding border-t border-neutral-100"
    >
      <div className="container-custom">
        <div className="mb-12">
          <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-2">
            Career
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Experience
          </h2>
        </div>

        <div className="relative max-w-2xl">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200" />

          <div className="flex flex-col gap-8">
            {employmentHistory.map((job, i) => (
              <div key={i} className="flex gap-6 items-start">
                {/* dot */}
                <div
                  className={`mt-1.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 z-10 ${
                    i === 0
                      ? 'border-neutral-900 bg-neutral-900'
                      : 'border-neutral-300 bg-white'
                  }`}
                />

                <div className="pb-2">
                  <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-1">
                    {job.period}
                  </p>
                  <p className="text-base font-semibold text-neutral-900">
                    {job.role}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {job.company}
                    {job.note && (
                      <span className="ml-1.5 text-xs text-neutral-400">
                        ({job.note})
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {job.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
