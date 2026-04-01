'use client';

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Facebook, ExternalLink } from "lucide-react";

export default function UnderConstructionContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#fdfcfb] overflow-hidden px-6">
      {/* Dynamic Background Elements */}
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-orange-50/30 rounded-full blur-[120px] pointer-events-none"
      />
      
      {/* Grainy Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }} 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="backdrop-blur-xl bg-white/60 border-2 border-stone-200/70 shadow-[0_8px_32px_0_rgba(139,92,5,0.08)] rounded-[2.5rem] p-8 md:p-12 overflow-hidden group">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          <div className="flex flex-col items-center text-center">
            {/* Logo Section */}
            <motion.div variants={itemVariants} className="relative mb-10 group/logo">
              <div className="absolute -inset-4 bg-amber-500/5 rounded-full blur-2xl group-hover/logo:bg-amber-500/10 transition-all duration-500" />
              <Image
                src="/images/logo.png"
                alt="P'lengke logo"
                width={120}
                height={120}
                className="relative rounded-full border-2 border-stone-200 p-1 group-hover/logo:rotate-3 transition-transform duration-500 shadow-lg bg-white"
                priority
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                Live Soon
              </div>
            </motion.div>

            {/* Typography Section */}
            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 inline-block">
                Savouring the <span className="text-amber-600 italic font-serif">Wait</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-md mx-auto leading-relaxed">
                We're crafting a new digital home for Montreal's favourite Filipino kitchen & grocery. 
              </p>
            </motion.div>

            {/* Separator / Progress */}
            <motion.div variants={itemVariants} className="w-full max-w-[80px] flex gap-1 justify-center mb-10">
              <div className="h-1 w-1 bg-amber-500/40 rounded-full" />
              <div className="h-1 w-8 bg-amber-500/80 rounded-full" />
              <div className="h-1 w-1 bg-amber-500/40 rounded-full" />
            </motion.div>

            {/* Details Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-sm">
              <a 
                href="https://www.google.com/maps/place/PLENGKE+(Ang+Pamilihang+Bayan+ng+Montreal)/@45.4954403,-73.6396451,16z/data=!3m1!4b1!4m6!3m5!1s0x4cc919ba2f1c48ed:0xb64ac7d357baf109!8m2!3d45.4954403!4d-73.6370702!16s%2Fg%2F11jm9nn5hw?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50/50 border border-stone-100 hover:bg-amber-50/50 transition-colors group/item"
              >
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover/item:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-stone-900 mb-1">Our Location</p>
                  <p className="text-stone-500 leading-snug">4699 Ave Van Horne<br />Montreal, Quebec H3W 1H8</p>
                </div>
                <ExternalLink size={14} className="text-stone-300 group-hover/item:text-amber-600 transition-colors" />
              </a>

              <a 
                href="https://www.facebook.com/PlengkeMTL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50/50 border border-stone-100 hover:bg-amber-50/50 transition-colors group/item"
              >
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover/item:scale-110 transition-transform">
                  <Facebook size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-stone-900 mb-1">Get in Touch</p>
                  <p className="text-stone-500 leading-snug">Follow us for updates<br />on social media</p>
                </div>
                <ExternalLink size={14} className="text-stone-300 group-hover/item:text-amber-600 transition-colors" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Footer Text */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-amber-600/40">
            P'lengke Montreal &mdash; Pamilihang Bayan
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
