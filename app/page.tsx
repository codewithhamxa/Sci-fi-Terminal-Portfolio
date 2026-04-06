"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalWindow } from '@/components/ui/terminal';

// ... (in the imports section)
import { Terminal, Code2, Cpu, Globe, Mail, Github, Linkedin, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Radar } from '@/components/ui/radar';
import { StatCard } from '@/components/ui/stat-card';
import { NodeGraph } from '@/components/ui/node-graph';
import { StatusGrid } from '@/components/ui/status-grid';
import { Kbd } from '@/components/ui/kbd';

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Typing speed
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, started, onComplete]);

  return (
    <span>
      {displayedText}
      {started && currentIndex < text.length && <span className="animate-pulse">_</span>}
    </span>
  );
};

export default function Portfolio() {
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [theme, setTheme] = useState<'green' | 'amber'>('green');

  useEffect(() => {
    if (theme === 'amber') {
      document.body.classList.add('theme-amber');
    } else {
      document.body.classList.remove('theme-amber');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'green' ? 'amber' : 'green');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header / System Status */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-primary/30 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary glow-text" />
          <div>
            <h1 className="text-xl font-bold tracking-widest uppercase glow-text glitch-effect" data-text="SYS.TERMINAL // M.HAMZA.JAVED">SYS.TERMINAL // M.HAMZA.JAVED</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">STATUS: ONLINE | UPLINK: STABLE</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-right hidden md:block">
            <p className="text-primary">MEM: 640K OK</p>
            <p className="text-muted-foreground">CPU: 4.77 MHz</p>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme} className="text-xs">
            SWITCH_PHOSPHOR
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="flex flex-col gap-6">
          <div className="bg-primary/5 border border-primary/30 p-6 notch-br relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <NodeGraph />
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter glow-text relative z-10">
              <TypewriterText text="> HELLO_WORLD" onComplete={() => setBootSequenceComplete(true)} />
            </h2>
            {bootSequenceComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10"
              >
                <div className="flex-1 space-y-4">
                  <p className="text-lg md:text-xl text-primary/80 max-w-2xl leading-relaxed">
                    I am <span className="text-primary font-bold">M. Hamza Javed</span>, a React Frontend Developer specializing in building immersive, high-performance web applications with stunning animations and modern architectures.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button className="gap-2">
                      <Mail className="w-4 h-4" /> CONTACT_ME
                    </Button>
                    <Button variant="outline" className="gap-2" asChild>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" /> GITHUB
                      </a>
                    </Button>
                    <Button variant="outline" className="gap-2" asChild>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" /> LINKEDIN
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Radar />
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {bootSequenceComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Left Column: Skills & Info */}
            <div className="flex flex-col gap-8 md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5" /> CORE_SKILLS
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {[
                    { name: 'React.js / Next.js', value: 95 },
                    { name: 'TypeScript', value: 90 },
                    { name: 'Tailwind CSS', value: 95 },
                    { name: 'Framer Motion', value: 85 },
                    { name: 'Node.js', value: 75 },
                  ].map(skill => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="uppercase tracking-widest">{skill.name}</span>
                        <span className="text-primary/80">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <TerminalWindow className="h-[250px]">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">[10:42:01]</span>
                    <span className="text-primary">Initializing React environment... OK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">[10:42:05]</span>
                    <span className="text-primary">Loading Tailwind modules... OK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">[10:42:12]</span>
                    <span className="text-primary">Compiling animations... OK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">[10:42:15]</span>
                    <span className="text-primary">Fetching user data... OK</span>
                  </div>
                  <div className="mt-4 mb-2">
                    <span className="text-muted-foreground text-xs block mb-1">SYSTEM_MEMORY_BANKS</span>
                    <StatusGrid rows={2} cols={16} />
                  </div>
                  <div className="flex gap-2 mt-4 items-center">
                    <span className="text-primary">root@hamza:~$</span>
                    <span className="text-primary animate-pulse">_</span>
                    <span className="ml-auto text-muted-foreground text-xs">Press <Kbd>ENTER</Kbd> to execute</span>
                  </div>
                </div>
              </TerminalWindow>
            </div>

            {/* Right Column: Experience & Projects */}
            <div className="flex flex-col gap-8 md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="COMMITS" value="1,402" trend="+12% THIS MONTH" />
                <StatCard title="PROJECTS" value="24" trend="ACTIVE" />
                <StatCard title="COFFEE" value="892" trend="CUPS CONSUMED" />
                <StatCard title="UPTIME" value="99.9%" trend="SYSTEM STABLE" />
              </div>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-primary border-b border-primary/30 pb-2">
                  <ChevronRight className="w-5 h-5" /> RECENT_PROJECTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'E-Commerce Platform', desc: 'A full-stack e-commerce solution with Next.js, Stripe, and Tailwind.', tech: ['Next.js', 'Stripe', 'Tailwind'] },
                    { title: 'AI Dashboard', desc: 'Real-time analytics dashboard with interactive charts and AI insights.', tech: ['React', 'Recharts', 'OpenAI'] },
                    { title: 'Portfolio V1', desc: 'Previous iteration of personal portfolio with smooth scrolling.', tech: ['React', 'Framer Motion'] },
                    { title: 'Task Manager', desc: 'Kanban style task management app with drag and drop.', tech: ['React', 'Redux', 'DnD'] }
                  ].map((project, i) => (
                    <Card key={i} className="group hover:bg-primary/5 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                          VIEW_SOURCE <ExternalLink className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-primary border-b border-primary/30 pb-2">
                  <ChevronRight className="w-5 h-5" /> WORK_EXPERIENCE
                </h3>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l border-primary/30 before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:bg-primary before:notch-br">
                    <h4 className="text-lg font-bold text-primary">Senior Frontend Developer</h4>
                    <p className="text-sm text-muted-foreground mb-2">Tech Corp // 2023 - PRESENT</p>
                    <p className="text-sm text-primary/80">Led the frontend team in migrating legacy applications to modern React architecture. Improved performance metrics by 40%.</p>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30 before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:bg-primary before:notch-br">
                    <h4 className="text-lg font-bold text-primary">React Developer</h4>
                    <p className="text-sm text-muted-foreground mb-2">Web Solutions Inc // 2021 - 2023</p>
                    <p className="text-sm text-primary/80">Developed responsive and accessible user interfaces for various client projects using React and Tailwind CSS.</p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/30 pt-4 mt-8 text-center text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} M. HAMZA JAVED. ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-1">
          <Globe className="w-3 h-3" /> CONNECTION_SECURE
        </p>
      </footer>
    </div>
  );
}
