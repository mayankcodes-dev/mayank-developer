"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, LEVEL_LABELS } from "@/data/skills";
import Image from "next/image";

const LEVEL_COLORS = ["", "bg-red-500", "bg-orange-500", "bg-yellow-400", "bg-green-400", "bg-primary"];

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tech Arsenal</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          Skills &amp; Technologies
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Technologies I work with every day — from frontend interfaces to backend APIs and databases.
        </p>
      </motion.div>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {skillCategories.map((c, i) => (
          <motion.button
            key={c.category}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={[
              "btn-chai px-4 py-2 text-sm font-semibold transition-all duration-200",
              i === active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "border border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            ].join(" ")}
          >
            <span className="mr-1.5">{c.icon}</span>
            {c.category}
          </motion.button>
        ))}
      </div>

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {cat.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-[0_0_28px_rgba(249,115,22,0.10)]"
            >
              {/* Logo */}
              <div
                className="flex size-12 items-center justify-center rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${skill.color}18` }}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    const span = document.createElement("span");
                    span.className = "text-xl font-bold";
                    span.style.color = skill.color;
                    span.textContent = skill.name[0];
                    t.parentElement?.appendChild(span);
                  }}
                />
              </div>

              {/* Name + level */}
              <div>
                <p className="font-bold text-foreground text-sm">{skill.name}</p>
                <p className="text-xs text-muted-foreground">{LEVEL_LABELS[skill.level]}</p>
              </div>

              {/* Level bar */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={[
                      "h-1.5 flex-1 rounded-full transition-all duration-500",
                      dot <= skill.level ? LEVEL_COLORS[skill.level] : "bg-border/40",
                    ].join(" ")}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
