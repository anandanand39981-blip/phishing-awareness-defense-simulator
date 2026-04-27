import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Key, Server, Code2, CheckCircle2, Terminal } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from "../../convex/_generated/api";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
export default function DefenseGuidePage() {
  const markCompleted = useMutation(api.progress.markCompleted);
  const [isDone, setIsDone] = useState(false);
  const handleComplete = async () => {
    try {
      await markCompleted({ moduleId: 'defense' });
      setIsDone(true);
      toast.success("Module Completed! You've mastered modern defense patterns.");
    } catch (err) {
      toast.error("Failed to save progress.");
    }
  };
  const codeWebAuthn = `// Minimal WebAuthn Registration
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: Uint8Array.from(challenge, c => c.charCodeAt(0)),
    rp: { name: "Secure App" },
    user: { id: userId, name: userEmail, displayName: userEmail },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256
    authenticatorSelection: { userVerification: "required" }
  }
});`;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <ShieldCheck className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Defense Architecture Guide</h1>
          </motion.div>
          <p className="text-muted-foreground text-lg max-w-3xl">
            As a developer, your mission is to implement phishing-resistant authentication. 
            Move beyond simple passwords and legacy MFA towards FIDO2/WebAuthn standards.
          </p>
        </div>
        <Tabs defaultValue="mfa" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger value="mfa" className="rounded-lg gap-2">
              <Key className="h-4 w-4" /> MFA Strategies
            </TabsTrigger>
            <TabsTrigger value="webauthn" className="rounded-lg gap-2">
              <Lock className="h-4 w-4" /> WebAuthn/FIDO2
            </TabsTrigger>
            <TabsTrigger value="oauth" className="rounded-lg gap-2">
              <Server className="h-4 w-4" /> Secure OAuth
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mfa" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/40 border-muted">
                <CardHeader>
                  <CardTitle>Eliminate SMS/Email MFA</CardTitle>
                  <CardDescription>Why traditional MFA is vulnerable to SIM swapping and interception.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>SMS and Email are unencrypted and easily intercepted or diverted via port-out fraud. Instead, prioritize:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="text-foreground font-semibold">TOTP (Authenticator Apps):</span> Time-based codes like Google Authenticator.</li>
                    <li><span className="text-foreground font-semibold">Push-Based Auth:</span> Secure app notifications (e.g., Duo, Okta).</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/40 border-muted">
                <CardHeader>
                  <CardTitle>MFA Shadowing</CardTitle>
                  <CardDescription>Prevention of "MFA Fatigue" attacks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>Attackers spam users with MFA prompts until they accidentally approve one. Implement:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="text-foreground font-semibold">Number Matching:</span> Requiring the user to type a number shown on the login screen into the auth app.</li>
                    <li><span className="text-foreground font-semibold">Rate Limiting:</span> Automatic lockout after multiple failed or ignored prompts.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="webauthn" className="space-y-6">
            <Card className="bg-card/40 border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-emerald-500" />
                  Implementing Phishing Resistance
                </CardTitle>
                <CardDescription>WebAuthn uses asymmetric cryptography to ensure the server and browser both verify origin.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-lg font-mono text-sm text-slate-300 relative">
                  <div className="absolute top-4 right-4 text-xs text-slate-500">TYPESCRIPT</div>
                  <pre className="overflow-x-auto">{codeWebAuthn}</pre>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <h4 className="font-bold text-xs text-emerald-500 uppercase mb-1">Origin Check</h4>
                    <p className="text-xs text-muted-foreground">Browsers will only allow a key to sign a request if the domain matches exactly.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <h4 className="font-bold text-xs text-emerald-500 uppercase mb-1">Private Keys</h4>
                    <p className="text-xs text-muted-foreground">The private key never leaves the hardware (YubiKey/TouchID). Only the signature is sent.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <h4 className="font-bold text-xs text-emerald-500 uppercase mb-1">No Shared Secret</h4>
                    <p className="text-xs text-muted-foreground">Unlike passwords, there is no secret stored on the server that can be breached.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="oauth" className="space-y-6">
            <Card className="bg-card/40 border-muted">
              <CardHeader>
                <CardTitle>PKCE & State Validation</CardTitle>
                <CardDescription>Ensuring OAuth flows aren't hijacked.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                  <Terminal className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Always use <code className="bg-yellow-500/10 px-1 rounded">state</code> and <code className="bg-yellow-500/10 px-1 rounded">PKCE</code> (Proof Key for Code Exchange) even for server-side clients to prevent authorization code injection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-16 flex flex-col items-center justify-center p-12 border-t border-muted text-center space-y-6">
          {isDone ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold">Certification Unlocked</h3>
              <p className="text-muted-foreground">You have reviewed all defense modules. Your progress is saved.</p>
              <Button asChild variant="outline">
                <a href="/">Back to Dashboard</a>
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Ready to complete the curriculum?</h3>
                <p className="text-muted-foreground">Marking this as complete verifies your understanding of modern security architecture.</p>
              </div>
              <Button size="lg" onClick={handleComplete} className="bg-emerald-600 hover:bg-emerald-700 h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-emerald-500/20">
                Complete Training Progress
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}