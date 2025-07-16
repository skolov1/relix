"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  return (
    <nav className="h-16 border-b border-b-zinc-800 flex items-center">
      <div className="grid grid-cols-3 px-4 xl:container xl:mx-auto w-full">
        <div className="w-28">
          <Link href={"/"}>
            <img className="h-16" src="/images/RELI2.svg" alt="coisa" />
          </Link>
        </div>
        <div className="flex justify-evenly items-center">
          <a className="hover:text-primary transition-colors" href="/">
            Filmes
          </a>
          <a className="hover:text-primary transition-colors" href="/series">
            Series
          </a>
          <a className="hover:text-primary transition-colors" href="/iptv">
            TV
          </a>
        </div>
        <div className="ml-auto flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            {searchExpanded ? (
              <motion.div
                key="search-input"
                className="space-x-2 flex items-center"
                initial={{ width: 2, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-48 bg-background/50 border-border"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="search-button"
                className="rounded-full"
                onClick={() => setSearchExpanded(true)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
