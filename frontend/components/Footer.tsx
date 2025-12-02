"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 lg:px-8 border-t border-white/10 dark:border-white/10 light:border-black/10 bg-[#09090b]/50 dark:bg-[#09090b]/50 light:bg-white/50 backdrop-blur-xl text-slate-400 dark:text-slate-400 light:text-slate-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C4B5FD] to-[#93C5FD] flex items-center justify-center">
                <span className="font-bold">FM</span>
              </div>
              <span className="font-semibold tracking-tight">Atlus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered productivity for the modern web.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Docs</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Atlus. All rights reserved.
          </p>
          {/* Social Links - Moved here to be part of the new structure, if desired, or removed if not needed */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href="#twitter"
              className="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/20 dark:hover:border-white/20 light:hover:border-black/20 flex items-center justify-center transition-all duration-200 group"
            >
              <Twitter
                size={18}
                className="text-slate-400 dark:text-slate-400 light:text-slate-600 group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors"
              />
            </a>
            <a
              href="#github"
              className="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/20 dark:hover:border-white/20 light:hover:border-black/20 flex items-center justify-center transition-all duration-200 group"
            >
              <Github
                size={18}
                className="text-slate-400 dark:text-slate-400 light:text-slate-600 group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors"
              />
            </a>
            <a
              href="#linkedin"
              className="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/20 dark:hover:border-white/20 light:hover:border-black/20 flex items-center justify-center transition-all duration-200 group"
            >
              <Linkedin
                size={18}
                className="text-slate-400 dark:text-slate-400 light:text-slate-600 group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
