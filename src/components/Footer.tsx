import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-transparent py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          <div className="md:w-1/2">
            <Link
              href="/"
              className="font-serif text-3xl text-white tracking-tight block mb-8 hover:italic transition-all"
            >
              Rivora Tech<span className="text-white/40">.</span>
            </Link>
            <p className="font-mono text-sm text-white/40 lowercase tracking-tight max-w-xs leading-relaxed mb-8">
              engineering with intent. crafting digital experiences that feel
              intuitive and alive.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6">
                Navigation
              </p>
              <ul className="space-y-4 font-mono text-sm text-white/50 lowercase tracking-tight">
                <li>
                  <Link
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    about
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6">
                Legal
              </p>
              <ul className="space-y-4 font-mono text-sm text-white/50 lowercase tracking-tight">
                <li><Link href="#" className="hover:text-white transition-colors">privacy policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">terms of service</Link></li>
              </ul>
            </div> */}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Rivora Tech.
          </p>
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
