import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Utensils, ShoppingBag, MapPin } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]"
    >
      {/* Animated Background Decor */}
      <motion.div
        className="absolute top-1/4 -right-20 w-[40vw] h-[40vw] rounded-full bg-[#fd5e02]/20 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating Sparkle Elements */}
      <motion.div
        className="absolute top-20 left-1/4"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 1, 0.3],
          rotate: [0, 360],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles className="text-[#fd5e02]" size={24} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-1/3"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 1, 0.3],
          rotate: [360, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <Star className="text-[#fd5e02]" size={20} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <div className="w-2 h-2 bg-[#fd5e02] rounded-full" />
      </motion.div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mt-6 lg:mt-0">
        <div className="space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fd5e02]/10 text-[#fd5e02] font-bold text-sm tracking-wider uppercase mb-6"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(253, 94, 2, 0)",
                  "0 0 0 10px rgba(253, 94, 2, 0.1)",
                  "0 0 0 0 rgba(253, 94, 2, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Pamilihang Bayan ng Montreal
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl font-black leading-tight text-[#023341] mb-6"
              animate={{
                textShadow: [
                  "0 0 0 rgba(253, 94, 2, 0)",
                  "0 0 20px rgba(253, 94, 2, 0.1)",
                  "0 0 0 rgba(253, 94, 2, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome to <span className="text-[#fd5e02]">P&apos;LENGKE!</span>
            </motion.h1>

            <div className="space-y-4 sm:space-y-5 max-w-lg mx-auto md:mx-0">
              <p className="text-base sm:text-lg md:text-xl text-[#023341]/80 leading-relaxed px-2 sm:px-0">
                Experience authentic Filipino cuisine and find all your favorite
                ingredients from the Philippines, right here in the heart of
                Montreal. 🇨🇦 🇵🇭
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a
              href="#menu"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(253 94 2 / 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-[#fd5e02] to-[#e65500] text-white rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-2xl shadow-[#fd5e02]/30 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Menu
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-[#023341]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.a>

            <motion.a
              href="https://www.facebook.com/PlengkeMTL"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f5f0e0",
                borderColor: "#fd5e02",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-[#023341]/20 text-[#023341] rounded-2xl flex items-center justify-center font-extrabold text-lg transition-all duration-300"
            >
              Visit our FB Page
            </motion.a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center md:justify-start gap-4 pt-8 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-sm font-medium text-[#023341]/70"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#023341] font-bold text-lg flex items-center gap-2">
                📍 4693-4699 Ave Van Horne
              </span>
              <span className="inline-flex items-center gap-2 mt-1">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                Open Daily • Montreal, QC H3W 1H8
              </span>
            </motion.p>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="relative z-10"
          >
            <motion.div
              className="rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border-[12px] border-white"
              animate={{
                boxShadow: [
                  "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                  "0 25px 50px -12px rgba(253, 94, 2, 0.2)",
                  "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.img
                src="/images/hero-image.jpg"
                alt="P'lengke Signature Lechon"
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Floating Food Elements - Enhanced */}
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-2xl z-20 flex items-center justify-center border-2 border-[#fd5e02]/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-3xl mb-1"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍢
              </motion.div>
              <p className="text-xs font-black text-[#023341]">New Daily</p>
              <p className="text-lg font-bold text-[#fd5e02]">Pork BBQ</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-4 right-4 md:right-auto md:-bottom-10 md:-left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#fcf5e3]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl z-20 flex items-center justify-center border-2 border-[#fd5e02]/30 md:border-[#023341]/20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 5 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-2xl sm:text-3xl mb-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                🥧
              </motion.div>
              <p className="text-[10px] sm:text-xs font-black text-[#023341]">
                Must Try
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#fd5e02]">
                Kakanin
              </p>
            </div>
          </motion.div>

          {/* Additional Energy Bursts */}
          <motion.div
            className="absolute top-1/2 right-0 w-16 h-16 bg-[#fd5e02]/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-20 h-20 bg-[#023341]/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
