import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, LayoutDashboard, FileWarning, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SignOutButton } from '@/components/SignOutButton';
import { SignInForm } from '@/components/SignInForm';
export function HomePage() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const modules = [
    {
      title: "Awareness Simulator",
      description: "Experience a live phishing simulation and learn to spot malicious red flags in a safe environment.",
      icon: ShieldAlert,
      href: "/simulator",
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      title: "Threat Visualizer",
      description: "See what attackers see. Review mock telemetry of intercepted credentials to understand the impact.",
      icon: LayoutDashboard,
      href: "/visualizer",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Defense Guide",
      description: "Interactive guides for developers on implementing phishing-resistant MFA and FIDO2 standards.",
      icon: Lock,
      href: "/about",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    }
  ];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-bold tracking-tight">PhishDefense</h2>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle className="static" />
            <SignOutButton />
          </div>
        </header>
        <section className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium mb-4"
          >
            <ShieldAlert className="w-4 h-4" />
            Educational Cybersecurity Platform
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          >
            Master the Art of <span className="text-gradient">Cyber Defense</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            An interactive simulator designed to train users on identifying phishing attempts and guide developers towards modern, secure authentication.
          </motion.p>
          <Authenticated>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-blue-500/80 font-medium"
            >
              Logged in as {loggedInUser?.email}
            </motion.p>
          </Authenticated>
        </section>
        <Unauthenticated>
          <div className="max-w-md mx-auto mb-20 p-8 glass-dark rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-center">Get Started</h3>
            <SignInForm />
          </div>
        </Unauthenticated>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {modules.map((module) => (
            <motion.div key={module.title} variants={item}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-muted hover:border-blue-500/50 transition-all duration-300 group cursor-default">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${module.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <module.icon className={`w-6 h-6 ${module.color}`} />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="p-0 hover:bg-transparent group-hover:text-blue-500 transition-colors">
                    <Link to={module.href} className="flex items-center gap-2 font-semibold">
                      Launch Module <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <footer className="mt-24 pt-8 border-t border-muted text-center text-muted-foreground">
          <p>© 2024 PhishDefense Educator. Built for security awareness training.</p>
        </footer>
      </div>
    </div>
  );
}