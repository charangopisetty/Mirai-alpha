import Image from "next/image";
import Link from "next/link";
import HeroWaitlist from "./HeroWaitlist";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-stack">
          <Link href="/" className="brand hero-brand" aria-label="Mirai Alpha — home">
            <Image
              className="brand-logo"
              src="/mirai_alpha_logo.jpeg"
              alt=""
              width={200}
              height={200}
              priority
              sizes="(max-width: 480px) 72px, (max-width: 640px) 84px, 108px"
            />
            <span className="brand-tagline">An Investing Copilot.</span>
          </Link>
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow" />
            <h1 className="hero-title">
              Invest with Evidence
              <br />
              <em> </em> not <em className="hero-em-neg">noise.</em>
            </h1>
            <p className="hero-sub" />
            <div className="hero-actions">
              <HeroWaitlist />
            </div>
          </div>

          <div className="hero-panel">
            <Image
              src="/Mirai-Alpha.gif"
              width={1260}
              height={840}
              alt="Illustration of an analyst with a telescope viewing a steep upward market trend."
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
