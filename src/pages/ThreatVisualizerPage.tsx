import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldAlert, Terminal, Eye, Database, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
const MOCK_STATS = [
  { name: 'Monday', intercepts: 42 },
  { name: 'Tuesday', intercepts: 89 },
  { name: 'Wednesday', intercepts: 64 },
  { name: 'Thursday', intercepts: 112 },
  { name: 'Friday', intercepts: 145 },
  { name: 'Saturday', intercepts: 31 },
  { name: 'Sunday', intercepts: 22 },
];
const MOCK_DATA = [
  { id: '1', user: 'j.doe@example.com', origin: 'MockSocial_Vector_A', timestamp: '2 mins ago', status: 'SUCCESS' },
  { id: '2', user: 'admin_test@corp.net', origin: 'HR_Portal_Spoof', timestamp: '12 mins ago', status: 'SUCCESS' },
  { id: '3', user: 'finance@startup.io', origin: 'Invoicing_Lure', timestamp: '1 hr ago', status: 'RETRY' },
  { id: '4', user: 'sarah.m@webmail.com', origin: 'MockSocial_Vector_A', timestamp: '2 hrs ago', status: 'SUCCESS' },
];
export function ThreatVisualizerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Terminal className="h-8 w-8 text-red-500" />
              Threat Visualizer
            </h1>
            <p className="text-muted-foreground mt-1">A conceptual demonstration of how attackers monitor credential harvests.</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Simulated Data Only
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Live Intercepts', value: '412', icon: Activity, color: 'text-red-500' },
            { label: 'Active Lures', value: '18', icon: Eye, color: 'text-blue-500' },
            { label: 'DB Health', value: '99.2%', icon: Database, color: 'text-green-500' },
            { label: 'Victim Rate', value: '12.4%', icon: ShieldAlert, color: 'text-orange-500' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-muted bg-card/40">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-muted bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg">Intercept Frequency</CardTitle>
              <CardDescription>Simulated weekly trend of harvesting success.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_STATS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Bar dataKey="intercepts" radius={[4, 4, 0, 0]}>
                      {MOCK_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.intercepts > 100 ? '#ef4444' : '#3b82f6'} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="border-muted bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg">Recent Intercepts</CardTitle>
              <CardDescription>DUMMY DATA: Placeholders for educational visualization.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-muted hover:bg-transparent">
                    <TableHead className="text-xs uppercase font-bold">User Identity</TableHead>
                    <TableHead className="text-xs uppercase font-bold text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_DATA.map((row) => (
                    <TableRow key={row.id} className="border-muted">
                      <TableCell>
                        <p className="font-medium text-sm">{row.user}</p>
                        <p className="text-[10px] text-muted-foreground">{row.timestamp} via {row.origin}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'SUCCESS' ? 'bg-red-500/10 text-red-500' : 'bg-muted text-muted-foreground'
                        }`}>
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 text-xs text-blue-400 space-y-2">
                <p className="font-bold uppercase tracking-widest flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  Educator's Insight
                </p>
                <p className="leading-relaxed">
                  In a real attack, these credentials would be used for credential stuffing or sold on dark web marketplaces within minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}