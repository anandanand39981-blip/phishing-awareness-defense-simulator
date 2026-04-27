import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Info, AlertCircle, CheckCircle2, Globe, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from "../../convex/_generated/api";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
type Indicator = {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
};
export function SimulatorPage() {
  const [activeIndicator, setActiveIndicator] = useState<Indicator | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const indicators: Record<string, Indicator> = {
    url: {
      id: 'url',
      title: 'Suspicious Domain',
      description: 'The URL "mocksocial.co.security-update.com" mimics a legitimate brand but is hosted on a sub-domain intended to deceive. Always check the root domain before entering credentials.',
      severity: 'high'
    },
    ssl: {
      id: 'ssl',
      title: 'Missing/Invalid HTTPS',
      description: 'The browser shows a broken lock or "Not Secure" warning. Legitimate login pages will always use valid SSL certificates to encrypt your data.',
      severity: 'medium'
    },
    urgency: {
      id: 'urgency',
      title: 'Fear-Based Urgency',
      description: '"Security Alert: Your account will be disabled in 24 hours." Attackers use psychological pressure to bypass your critical thinking.',
      severity: 'high'
    },
    submit: {
      id: 'submit',
      title: 'Credential Harvesting',
      description: 'Clicking submit here would send your plain-text password directly to an attacker\'s server. In this simulation, we intercept and discard it safely.',
      severity: 'high'
    }
  };
  const markCompleted = useMutation(api.progress.markCompleted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
    try {
      markCompleted({ moduleId: 'simulator' });
    } catch (err) {
      console.error("Failed to mark simulator as completed", err);
    }
    toast.success("Simulation Complete: Attack Intercepted!");
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Awareness Simulator</h1>
            <p className="text-muted-foreground">Interact with the mock page on the left to learn about common phishing tactics.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold animate-pulse">
            <ShieldAlert className="h-4 h-4" />
            EDUCATIONAL SIMULATION
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: MOCK LOGIN FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div 
              className="bg-secondary rounded-t-xl border-x border-t border-muted p-2 flex items-center gap-2 cursor-pointer group"
              onClick={() => setActiveIndicator(indicators.url)}
            >
              <div className="flex gap-1.5 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 bg-background rounded-md border border-muted py-1 px-3 flex items-center gap-2 text-xs text-muted-foreground group-hover:border-red-500/50 transition-colors">
                <Globe className="h-3 w-3 text-red-400" />
                <span className="text-red-400 font-mono">http://</span>
                mocksocial.co.security-update.com/login
              </div>
            </div>
            <div className="bg-card rounded-b-xl border border-muted shadow-2xl overflow-hidden relative">
              <div className="bg-blue-600 p-6 text-white text-center space-y-2">
                <h2 className="text-2xl font-bold italic">MockSocial</h2>
                <p className="text-blue-100 text-sm">Security Verification Required</p>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div 
                  className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg flex items-start gap-3 cursor-pointer"
                  onClick={() => setActiveIndicator(indicators.urgency)}
                >
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 dark:text-red-400 font-medium">
                    Your account has been flagged for suspicious activity. Sign in within 10 minutes to avoid permanent suspension.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email or Username</Label>
                    <Input id="email" type="email" placeholder="Enter your email" disabled={isCompleted} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" disabled={isCompleted} />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isCompleted}
                  onMouseEnter={() => !isCompleted && setActiveIndicator(indicators.submit)}
                >
                  {isCompleted ? "Simulated Entry Intercepted" : "Secure Login"}
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  <a href="#" className="hover:underline">Forgot password?</a> • <a href="#" className="hover:underline">Join MockSocial</a>
                </div>
              </form>
              {isCompleted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-blue-900/90 backdrop-blur-sm flex items-center justify-center p-8 text-center"
                >
                  <div className="space-y-4 text-white">
                    <CheckCircle2 className="h-16 w-16 mx-auto text-blue-400" />
                    <h3 className="text-2xl font-bold">Threat Identified!</h3>
                    <p className="text-blue-100">
                      You've completed the simulation. You recognized the indicators of a credential harvesting attack.
                    </p>
                    <Button variant="secondary" className="bg-white text-blue-900" onClick={() => window.location.href = '/visualizer'}>
                      View Impact Dashboard
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          {/* RIGHT: INSIGHTS PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-muted bg-card/50 backdrop-blur-md sticky top-12">
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-500 font-semibold mb-1">
                  <Info className="h-4 w-4" />
                  Educational Feed
                </div>
                <CardTitle>Educational Insights</CardTitle>
                <CardDescription>Click interactive elements on the mock form to analyze the attack vector.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {activeIndicator ? (
                    <motion.div
                      key={activeIndicator.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <AlertCircle className={`h-5 w-5 ${activeIndicator.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                          {activeIndicator.title}
                        </h4>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          activeIndicator.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {activeIndicator.severity} Severity
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activeIndicator.description}
                      </p>
                      <div className="pt-4 border-t border-blue-500/10">
                        <p className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-widest">Defensive Action:</p>
                        <ul className="text-xs space-y-2 text-muted-foreground">
                          <li className="flex gap-2">
                            <ChevronRight className="h-3 w-3 text-blue-500 shrink-0" />
                            Never trust display names or urgency in emails.
                          </li>
                          <li className="flex gap-2">
                            <ChevronRight className="h-3 w-3 text-blue-500 shrink-0" />
                            Manually type the URL of sensitive accounts.
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="py-12 text-center space-y-3 opacity-60">
                      <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                        <Info className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                        Hover or click highlights on the left to begin the lesson.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}