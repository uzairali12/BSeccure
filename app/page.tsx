"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck, Radar, UsersRound, Database, Eye, FileCheck2,
  Network, GraduationCap, Menu, X, Linkedin, Facebook, Instagram, Mail, MapPin, Phone, Quote, Sparkles,
} from "lucide-react"
import RotatingEarth from "../components/RotatingEarth"

/* ------------------------------ content ------------------------------ */

const CONTACT = {
  phoneLabel: "+971 67 42 1014",
  phoneHref: "tel:+97167421014",
  email: "info@bseccure.com",
  mapLabel: "Dubai, UAE",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Dubai%2C%20UAE",
}

const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/bseccure/?viewAsMember=true", Icon: Linkedin },
  { name: "Facebook", href: "https://www.facebook.com/groups/2109616512563830", Icon: Facebook },
  { name: "Instagram", href: "", Icon: Instagram }, // add the Instagram URL here when available
]

const NAV = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "aboutus" },
  { label: "Solutions", id: "approach" },
  { label: "Services", id: "services" },
  { label: "Teams", id: "values" },
  { label: "Blog", id: "insights" },  
  { label: "Contact Us", id: "contact" },
]

const services = [
  { icon: ShieldCheck, title: "Cyber Security", tag: "Fortify Your Digital Defense.", desc: "Fortify your digital defenses with practical protection built around your business.", img: "/images/cyber-security-network.png" },
  { icon: LockKeyhole, title: "Data Privacy", tag: "Protect Your Digital Footprint.", desc: "Prevent data loss and build privacy practices that people can trust.", img: "/images/data-privacy-vault.png" },
  { icon: Radar, title: "Threat Management", tag: "Stay Ahead of Threats.", desc: "Empower your organization to identify, manage and reduce cyber risk.", img: "/images/threat-management-radar.png" },
  { icon: Eye, title: "Continuous Red Teaming", tag: "Stay Secure, Stay Ahead.", desc: "Uncover weaknesses before attackers do through realistic security testing.", img: "/images/continuous-red-teaming.png" },
  { icon: Database, title: "Cloud Security Architecture", tag: "Resilient Multi-Cloud Defense.", desc: "Design and implement secure cloud configurations, IAM policies, and compliance controls.", img: "/images/cloud-security-architecture.png" },
  { icon: Network, title: "Managed Security Operations", tag: "24/7 SOC Incident Monitoring.", desc: "Proactive threat hunting, real-time telemetry analysis, and rapid incident isolation.", img: "/images/managed-security-operations.png" },
]
const synergy = [
  { icon: UsersRound, title: "People", sub: "The First Line of Defense", desc: "Empowered teams turn everyday decisions into a measurable layer of protection." },
  { icon: Network, title: "Process", sub: "Structured Security Protocols", desc: "Clear, repeatable workflows make security consistent across every part of your business." },
  { icon: Database, title: "Technology", sub: "State-of-the-Art Solutions", desc: "Modern tools and intelligence give you the visibility to act before threats escalate." },
  { icon: FileCheck2, title: "Regulation", sub: "Compliance & Accountability", desc: "Practical governance keeps risk, responsibility and compliance firmly in view." },
]

const steps = [
  { icon: Eye, title: "Assess", desc: "Understand your security posture." },
  { icon: Database, title: "Build", desc: "Design and implement your security posture." },
  { icon: ShieldCheck, title: "Defend", desc: "Minimize the impact of cyber threats." },
  { icon: Radar, title: "Respond", desc: "Act and resolve incidents quickly." },
  { icon: GraduationCap, title: "Awareness & Learning", desc: "Build your team’s security culture." },
]

const values = [
  { icon: UsersRound, title: "Security Excellence", desc: "Top-notch cybersecurity solutions and services." },
  { icon: CheckCircle2, title: "Customer Trust", desc: "Integrity, transparency and confidentiality." },
  { icon: Sparkles, title: "Innovation", desc: "Staying ahead of evolving cyber threats." },
  { icon: Network, title: "Collaboration", desc: "Strong partnerships with our clients." },
  { icon: Database, title: "Continuous Learning", desc: "Ongoing learning and professional development." },
  { icon: LockKeyhole, title: "Customer-Centric Approach", desc: "Your business and protection are our priority." },
]

const reasons = ["Simplified Approach", "Customer Centric Approach", "Competitive Prices", "Proven Track Record", "Experienced Consultants", "Compliance and Security", "Innovative Solutions", "Proactive Security Services"]

const insightContent = [
  { title: "Secure Managed IT Security Services", desc: "In today’s evolving threat landscape, businesses need technology that can identify and respond to risk.", img: "/images/generated/service-managed-soc-ui.png" },
  { title: "Cloud Security: Protecting Your Data in the Digital Era", desc: "A modern cloud strategy needs identity, access and security controls working together.", img: "/images/generated/service-cloud-security-ui.png" },
  { title: "Red Teaming Exercise: Simulating Real-World Cyber Attack", desc: "Red team exercises help organizations discover realistic attack paths and strengthen response.", img: "/images/generated/service-red-teaming-ui.png" },
  { title: "Zero Trust Architecture Strategy & Implementation", desc: "Why traditional perimeter defenses fail and how Zero Trust identity frameworks secure hybrid environments.", img: "/images/generated/service-cyber-security-ui.png" },
  { title: "Building a Cyber Resilient Organizational Culture", desc: "Empowering employees with continuous threat awareness training to establish a human firewall.", img: "/images/generated/governance-strategy-dashboard.png" },
  { title: "Compliance & Data Governance Best Practices", desc: "Navigating UAE regional and international data protection regulations and security standards.", img: "/images/generated/service-data-privacy-ui.png" },
]

const insightImages = [
  "/images/managed-security-operations.png",
  "/images/cloud-security-architecture.png",
  "/images/continuous-red-teaming.png",
  "/images/cyber-security-network.png",
  "/images/governance-and-trust.png",
  "/images/data-privacy-vault.png",
] as const

const insights = insightContent.map((post, index) => ({
  ...post,
  img: insightImages[index] ?? post.img,
}))

const partners = [
  { src: "/assets/BeyondTrust_logo.svg.png", name: "BeyondTrust", width: 1280, height: 367 },
  { src: "/assets/aquilai.png", name: "Aquilai", width: 225, height: 225 },
  { src: "/assets/Bluspa.png", name: "Bluspa", width: 1600, height: 355 },
  { src: "/assets/eset.png", name: "ESET", width: 3000, height: 2000 },
  { src: "/assets/Fdownload.png", name: "Fortinet", width: 439, height: 115 },
  { src: "/assets/PhishRod-logo.png", name: "PhishRod", width: 199, height: 75 },
  { src: "/assets/blob.png", name: "One Identity", width: 600, height: 600 },
]

const testimonials = [
  { id: "testimonial-1", text: "Choosing BSECCURE was one of the best decisions for our organization. Their commitment to excellence and proactive security measures have provided us with peace of mind. We're not just clients; we're partners in cybersecurity success." },
  { id: "testimonial-2", text: "The personalized attention and expertise we receive from BSECCURE set them apart. Their red teaming exercises are thorough, revealing vulnerabilities we didn't even know existed. Grateful for the ongoing partnership in securing our business" },
  { id: "testimonial-3", text: "Working with BSECCURE has been a game-changer for our business. Their expertise, dedication, and innovative solutions have significantly contributed to our success. We consider them a trusted partner in our journey." },
  { id: "testimonial-4", text: "In the dynamic world of cybersecurity, you need a partner who not only understands the landscape but thrives in it. BSECCURE does just that. Their proactive approach to red teaming has made us feel more secure than ever before." },
]

/* ------------------------------ helpers ------------------------------ */

/**
 * Infinite, button-free auto-scrolling strip. The children are rendered twice and the track
 * slides by exactly one copy, so the loop is seamless. Pauses on hover; the second copy is
 * hidden from assistive tech.
 */
function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
  repeat = 3,
}: {
  children: React.ReactNode
  duration?: number
  reverse?: boolean
  className?: string
  repeat?: number
}) {
  const repeatedContent = Array.from({ length: repeat }).map((_, i) => (
    <span key={i} className="contents">
      {children}
    </span>
  ))

  const scaledDuration = duration * repeat

  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${reverse ? "is-reverse" : ""}`}
        style={{ ["--dur" as string]: `${scaledDuration}s` }}
      >
        <div className="marquee-group">{repeatedContent}</div>
        <div className="marquee-group" aria-hidden="true">
          {repeatedContent}
        </div>
      </div>
    </div>
  )
}

function SectionHead({ eyebrow, title, copy, action, light = false }: { eyebrow: string; title: string; copy?: string; action?: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-2xl">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className={`h2 mt-3 ${light ? "text-white" : ""}`}>{title}</h2>
        {copy && <p className={`mt-4 text-sm leading-7 ${light ? "text-white/70" : "bodycopy"}`}>{copy}</p>}
      </div>
      {action}
    </div>
  )
}

/* ------------------------------- page -------------------------------- */

export default function Home() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy for the navbar highlight
  useEffect(() => {
    const ids = Array.from(new Set(NAV.map((n) => n.id)))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <main>
      {/* ------------------------------ header ------------------------------ */}
      <header className={`site-header fixed top-0 z-50 w-full text-white ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#home" className="brand-logo" aria-label="Bseccure home">
            <Image src="/assets/logo.png" alt="Bseccure" width={600} height={218} priority />
          </a>
          <nav className="nav-pill" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.label} href={`#${n.id}`} className={`nav-item ${active === n.id && n.label !== "Trainings" ? "is-active" : ""}`}>{n.label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="nav-cta" href="#contact">Get A Quote <span className="nav-cta-icon"><ArrowRight size={14} /></span></a>
            <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-menu">
            <div className="container py-4">
              <div className="mobile-panel">
                {NAV.map((n) => (
                  <a key={n.label} onClick={() => setOpen(false)} href={`#${n.id}`} className={`mobile-link ${active === n.id && n.label !== "Trainings" ? "is-active" : ""}`}>{n.label}</a>
                ))}
              </div>
              <a onClick={() => setOpen(false)} href="#contact" className="nav-cta mobile-cta">Get A Quote <span className="nav-cta-icon"><ArrowRight size={14} /></span></a>
            </div>
          </div>
        )}
      </header>

      {/* ------------------------------- hero ------------------------------- */}
      <section id="home" className="hero-grid min-h-[700px] pt-[96px] text-white">
        <div className="container grid min-h-[620px] items-center gap-6 py-12 lg:grid-cols-[1.02fr_.98fr]">
          <div className="reveal max-w-[650px]">
            <div className="eyebrow mb-5">Your trusted cybersecurity partner</div>
            <h1 className="display max-w-[650px]">Securing<br />What Matters<br /><span className="pink">In A Digital World.</span></h1>
            <p className="mt-6 max-w-[570px] text-sm leading-7 text-white/70">At Bseccure, we help organizations stay ahead of evolving cyber threats with expert consulting, advanced security solutions, and world-class training. Your business, our priority.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-pink">Get A Quote <ArrowRight size={14} /></a>
              <a href="#aboutus" className="btn btn-ghost">Discover Bseccure <ArrowRight size={14} /></a>
            </div>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center">
            <RotatingEarth width={720} height={560} className="w-full max-w-[720px]" />
            <div className="hero-pill hidden md:block">
              <div className="pink mb-2 text-[10px] font-black uppercase tracking-wider">● Prevent</div>
              <div className="text-xs leading-5 text-white/75">Detect<br />Respond<br />Secure</div>
            </div>
          </div>
        </div>
        <div className="container grid grid-cols-2 gap-3 pb-8 md:grid-cols-4">
          {services.map((s) => (
            <a key={s.title} href="#services" className="hero-tile">
              <s.icon className="pink" size={24} />
              <div className="mt-3 text-xs font-bold">{s.title}</div>
              <div className="mt-1 hidden text-[10px] text-white/55 sm:block">{s.tag}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------------------- partners strip ---------------------------- */}
      <section className="partner-strip py-9">
        <div className="container"><div className="eyebrow justify-center text-center">Trusted by leading technology partners</div></div>
        <Marquee duration={32} className="mt-6">
          {partners.map((p) => (
            <div className="partner-chip" key={p.name} title={p.name}>
              <Image src={p.src} alt={`${p.name} logo`} width={p.width} height={p.height} sizes="160px" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ------------------------------- about ------------------------------- */}
      <section id="aboutus" className="foundation-section section">
        <div className="container foundation-layout">
          <div className="foundation-intro">
            <div className="eyebrow">Our foundation</div>
            <h2 className="h2 mt-3">Our Synergy of Security</h2>
            <p className="bodycopy mt-5 max-w-xl">Our success is driven by one integrated approach that combines the strength of people, efficient processes, cutting-edge technology, and strong governance. This synergy allows us to provide top-tier services and solutions.</p>
            <div className="foundation-stat">
              <span className="foundation-stat-number">04</span>
              <p><strong>One connected security posture.</strong> Every pillar strengthens the others, helping you protect what matters from every angle.</p>
            </div>
            <a href="#services" className="btn btn-outline mt-7">Explore our services <ArrowRight size={14} /></a>
          </div>
          <div className="foundation-grid">
            {synergy.map((s, index) => (
              <article className="foundation-card" key={s.title}>
                <span className="foundation-card-number">0{index + 1}</span>
                <div className="foundation-icon"><s.icon size={23} strokeWidth={1.8} /></div>
                <p className="foundation-card-label">Security pillar</p>
                <h3>{s.title}</h3>
                <p className="foundation-card-sub">{s.sub}</p>
                <p className="foundation-card-copy">{s.desc}</p>
                <a href="#services" className="more-link foundation-card-link">Read More <ArrowRight size={12} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- methodology ----------------------------- */}
      <section id="approach" className="dark-section mesh py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div className="relative aspect-[1.5625] overflow-hidden rounded-2xl border border-white/10 bg-[#edf6ff] shadow-2xl">
            <Image src="/images/security-approach-lifecycle.png" alt="Security lifecycle illustration" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-contain" />
          </div>
          <div>
            <div className="eyebrow">Our methodology</div>
            <h2 className="h2 mt-3 text-white">Our Approach To Security</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">We take a comprehensive and proactive approach to identify vulnerabilities, mitigate risks and protect your digital assets from ever-evolving threats.</p>
            <a href="#services" className="btn btn-pink mt-6">Learn More <ArrowRight size={14} /></a>
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-5">
              {steps.map((s, i) => (
                <div key={s.title} className="step">
                  <div className="flex items-center justify-between"><s.icon className="pink" size={22} /><span className="step-num">0{i + 1}</span></div>
                  <div className="mt-3 text-[13px] font-bold text-white">{s.title}</div>
                  <div className="mt-1 text-[12px] leading-5 text-white/60">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ services ------------------------------ */}
      <section id="services" className="section bg-[#f8fafc]">
        <div className="container">
          <SectionHead eyebrow="Our services" title="Cutting Edge Services" copy="We’re committed to delivering innovative and technology-driven services that help businesses stay secure, resilient and ready for change." action={<a href="#contact" className="btn btn-outline">View All Services <ArrowRight size={14} /></a>} />
        </div>
        <Marquee duration={52} className="mt-10">
          {services.map((s) => (
            <article className="card group service-card slide-card" key={s.title}>
              <div className="service-visual relative aspect-[1.5625] overflow-hidden bg-[#edf6ff]">
              <span className="icon-badge"><s.icon size={18} /></span>
                <Image src={s.img} alt={s.title} fill sizes="(min-width: 1024px) 340px, 82vw" className="service-visual-image object-contain" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-black">{s.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#657080]">{s.desc}</p>
                <a href="#contact" className="more-link mt-4">Explore service <ArrowRight size={11} /></a>
              </div>
            </article>
          ))}
        </Marquee>
        <div className="container">
        </div>
      </section>

      {/* --------------------------- mission & vision --------------------------- */}
      <section className="dark-section py-16">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="eyebrow">Mission · Vision · Values</div>
            <h2 className="h2 mt-3 text-white">Our Mission, Vision & Values</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">Securing your digital frontier, Bseccure is on a mission to drive innovative cybersecurity, data protection, services and solutions.</p>
            <a href="#values" className="btn btn-pink mt-6">Learn More <ArrowRight size={14} /></a>
          </div>
          <div className="relative aspect-[1.5625] overflow-hidden rounded-2xl border border-white/10 bg-[#edf6ff] shadow-2xl">
            <Image src="/images/governance-and-trust.png" alt="Governance and trust illustration" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* ------------------------------- values ------------------------------- */}
      <section id="values" className="section">
        <div className="container">
          <div className="eyebrow">Our core values</div>
          <h2 className="h2 mt-3">What We Stand For</h2>
          <p className="bodycopy mt-4">Our core values shape how we protect your business and digital assets.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card flex gap-4 p-6">
                <v.icon className="pink shrink-0" size={26} />
                <div>
                  <h3 className="text-sm font-extrabold">{v.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#7a8492]">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <div className="eyebrow">Why choose Bseccure</div>
              <h2 className="h2 mt-3">A Partner You Can Rely On</h2>
              <p className="bodycopy mt-4">We combine expertise, innovation and a client-first approach to deliver real security outcomes.</p>
              <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {reasons.map((x) => (
                  <div key={x} className="flex items-center gap-2.5 text-[13px] font-semibold"><CheckCircle2 className="pink shrink-0" size={16} />{x}</div>
                ))}
              </div>
            </div>
            <div className="cta-panel">
              <div className="relative">
                <div className="eyebrow">Security starts here</div>
                <div className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">STRONGER <span className="pink">BUSINESSES</span><br />SAFER TOMORROWS</div>
                <p className="mt-4 text-xs leading-5 text-white/60">Build a security program that grows with your organization.</p>
                <a href="#contact" className="btn btn-pink mt-6">Talk to an expert <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- testimonials ----------------------------- */}
      <section id="testimonials" className="section bg-[#f8fafc]">
        <div className="container">
          <SectionHead eyebrow="Testimonials" title="What Our Clients Say" />
        </div>
        <Marquee duration={54} reverse className="mt-10">
          {testimonials.map((t) => (
            <article key={t.id} className="card testimonial slide-card flex flex-col p-8 text-center sm:p-10">
              <Quote className="pink mx-auto" size={30} fill="currentColor" aria-hidden="true" />
              <p className="mx-auto mt-6 max-w-lg text-[15px] leading-7 text-[#303b4b]">{t.text}</p>
              <div className="mt-5 text-[#ff9a00]" aria-label="5 out of 5 stars">★★★★★</div>
            </article>
          ))}
        </Marquee>
        <div className="container">
        </div>
      </section>

      {/* ------------------------------ insights ------------------------------ */}
      <section id="insights" className="section">
        <div className="container"><SectionHead eyebrow="Cyber insights" title="Latest Insights & Updates" copy="Stay informed with practical insights, security guidance and emerging cyber trends." action={<a href="#contact" className="btn btn-outline">View All Posts <ArrowRight size={14} /></a>} /></div>
        <Marquee duration={50} className="mt-10">
          {insights.map((p) => (
            <article key={p.title} className="card group slide-card">
              <div className="relative aspect-[1.5625] overflow-hidden bg-[#edf6ff]"><Image src={p.img} alt={p.title} fill sizes="(min-width: 1024px) 340px, 82vw" className="object-contain" /></div>
              <div className="p-5">
                <h3 className="text-sm font-extrabold leading-5">{p.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#7a8492]">{p.desc}</p>
                <a href="#contact" className="more-link mt-4">Read More <ArrowRight size={11} /></a>
              </div>
            </article>
          ))}
        </Marquee>
      </section>

      {/* ------------------------------ contact ------------------------------ */}
      <section id="contact" className="dark-section relative overflow-hidden py-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_.95fr]">
          <div>
            <div className="eyebrow">Get in touch</div>
            <h2 className="h2 mt-3 text-white">Let’s Build a Safer Digital Future</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">Have questions or want to learn more about our services? Get in touch with our team.</p>
            <div className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
              <a className="contact-chip" href={CONTACT.phoneHref}><Phone className="pink shrink-0" size={16} /> {CONTACT.phoneLabel}</a>
              <a className="contact-chip" href={`mailto:${CONTACT.email}`}><Mail className="pink shrink-0" size={16} /> {CONTACT.email}</a>
              <a className="contact-chip" href={CONTACT.mapHref} target="_blank" rel="noopener noreferrer"><MapPin className="pink shrink-0" size={16} /> {CONTACT.mapLabel}</a>
            </div>
          </div>
          <form className="contact-form p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
            <input required name="name" placeholder="Name" autoComplete="name" className="field mb-3" />
            <input required type="email" name="email" placeholder="Email" autoComplete="email" className="field mb-3" />
            <textarea required name="message" placeholder="Message" rows={5} className="field mb-4 resize-none" />
            <button className="btn btn-pink w-full">Send Message <ArrowRight size={14} /></button>
          </form>
        </div>
      </section>

      {/* ------------------------------- footer ------------------------------- */}
      <footer className="site-footer py-16 text-white">
        <div className="container grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="brand-logo footer-logo" aria-label="Bseccure home"><Image src="/assets/logo.png" alt="Bseccure" width={600} height={218} /></a>
            <p className="mt-4 max-w-xs text-xs leading-5 text-white/50">Securing your digital frontier with innovative cybersecurity, data protection services and solutions.</p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href || "#"}
                  className="social"
                  aria-label={name}
                  {...(href ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: (e: React.MouseEvent) => e.preventDefault() })}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="foot-title">Services Links</div>
            <div className="foot-list">{services.map((s) => <a key={s.title} href="#services" className="foot-link">{s.title}</a>)}</div>
          </div>
          <div>
            <div className="foot-title">Quick Support</div>
            <div className="foot-list">
              <a href="#contact" className="foot-link">Contact Us</a>
              <a href="#contact" className="foot-link">FAQ</a>
              <a href="#contact" className="foot-link">Privacy Policy</a>
              <a href="#contact" className="foot-link">Terms & Conditions</a>
              <a href="#values" className="foot-link">Team</a>
            </div>
          </div>
          <div>
            <div className="foot-title">Quick Links</div>
            <div className="foot-list">
              <a href="#aboutus" className="foot-link">About</a>
              <a href="#services" className="foot-link">Services</a>
              <a href="#insights" className="foot-link">Testimonials</a>
              <a href="#contact" className="foot-link">Contact Us</a>
              <a href="#contact" className="foot-link">Pricing</a>
            </div>
          </div>
        </div>
        <div className="container mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/40">
          <span>Copyright © 2026 Bseccure. All Rights Reserved.</span>
          <span>Terms & Conditions &nbsp; | &nbsp; Privacy Policy</span>
        </div>
      </footer>
    </main>
  )
}
