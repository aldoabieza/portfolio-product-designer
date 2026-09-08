interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1A1A18]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#FAFAF8] text-[#1A1A18] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-2xl border border-[#E8E6DF]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Curriculum Vitae</h2>
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mt-1">
              Aldo Abieza — Product Designer
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5B5B54] hover:text-[#1A1A18] transition-colors rounded-full hover:bg-[#F2F1EB]"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-sm text-[#5B5B54]">
          <section>
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[var(--accent)] mb-2">
              Summary
            </h3>
            <p className="leading-relaxed">
              Product Designer with 4+ years of hands-on experience in digital product design, fintech checkout funnels, design systems architecture, and SaaS workflows. Proven record improving checkout conversion rates by 34% at DOKU and powering $120M+ GMV at OrderOnline.id.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[var(--accent)] mb-3">
              Work Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-[var(--accent)] pl-3">
                <p className="font-semibold text-[#1A1A18]">UI/UX Designer — DOKU</p>
                <p className="text-xs text-[#5B5B54] mb-1">Sep 2024 - Present | Jakarta, Indonesia</p>
                <p className="text-xs leading-relaxed">
                  Redesigning multi-channel payment gateway checkout, optimizing merchant white-label customization token architecture, reducing drop-off rates across QRIS & VA.
                </p>
              </div>

              <div className="border-l-2 border-[#E8E6DF] pl-3">
                <p className="font-semibold text-[#1A1A18]">Product Designer — OrderOnline.id</p>
                <p className="text-xs text-[#5B5B54] mb-1">Jul 2022 - May 2024 | Bandung, Indonesia</p>
                <p className="text-xs leading-relaxed">
                  Architected drag-and-drop checkout form builder for 30,000+ social commerce merchants. Created "Kinetik" design system with 120+ modular Figma/React components.
                </p>
              </div>

              <div className="border-l-2 border-[#E8E6DF] pl-3">
                <p className="font-semibold text-[#1A1A18]">UI/UX Designer — TrawlBens</p>
                <p className="text-xs text-[#5B5B54] mb-1">Nov 2021 - Jun 2022 | Jakarta, Indonesia</p>
                <p className="text-xs leading-relaxed">
                  Designed heavy cargo shipping mobile applications (iOS/Android) and operational dispatch console across 350+ cities.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[var(--accent)] mb-2">
              Key Competencies
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Design Systems', 'Checkout UX', 'Information Architecture', 'Figma Tokens', 'Usability Testing', 'Framer / ProtoPie', 'Front-End Knowledge (HTML/CSS/JS)'].map((s) => (
                <span key={s} className="px-2.5 py-1 bg-[#F2F1EB] text-[#1A1A18] rounded-md">
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-[#E8E6DF] flex items-center justify-between gap-4">
          <span className="text-xs text-[#5B5B54]">hello@aldoabieza.com</span>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-medium text-[#1A1A18] bg-[#F2F1EB] rounded-full hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-colors"
            >
              Print CV
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-medium text-[#FAFAF8] bg-[#1A1A18] rounded-full hover:bg-[var(--accent)] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
