"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalWindow } from '@/components/ui/terminal';

// ... (in the imports section)
import { Terminal, Code2, Cpu, Globe, Mail, Github, Linkedin, ExternalLink, ChevronRight, GraduationCap, Award, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Radar } from '@/components/ui/radar';
import { StatCard } from '@/components/ui/stat-card';
import { NodeGraph } from '@/components/ui/node-graph';
import { StatusGrid } from '@/components/ui/status-grid';
import { Kbd } from '@/components/ui/kbd';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const isComplete = useRef(false);

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
    } else if (!isComplete.current) {
      isComplete.current = true;
      if (onComplete) {
        setTimeout(onComplete, 0);
      }
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
  const [terminalState, setTerminalState] = useState<'idle' | 'executing'>('idle');
  const [execStep, setExecStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && terminalState === 'idle') {
        setTerminalState('executing');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalState]);

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

              <TerminalWindow className="h-auto min-h-[250px]">
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
                    {terminalState === 'idle' ? (
                      <>
                        <span className="text-primary animate-pulse">_</span>
                        <span className="ml-auto text-muted-foreground text-xs">Press <Kbd>ENTER</Kbd> to execute</span>
                      </>
                    ) : (
                      <span className="text-primary">./impress_client.sh</span>
                    )}
                  </div>
                  
                  {terminalState === 'executing' && (
                    <div className="mt-4 space-y-2 border-t border-primary/30 pt-4">
                      <div className="text-primary">
                        <TypewriterText text="> Executing profile_summary.sh..." onComplete={() => setExecStep(1)} />
                      </div>
                      {execStep >= 1 && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-primary font-bold">
                          {"> ACCESS GRANTED."}
                        </motion.div>
                      )}
                      {execStep >= 1 && (
                        <div className="text-primary">
                          <TypewriterText text="> Analyzing developer capabilities..." delay={500} onComplete={() => setExecStep(2)} />
                        </div>
                      )}
                      {execStep >= 2 && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-primary">
                          {"> [====================] 100%"}
                        </motion.div>
                      )}
                      {execStep >= 2 && (
                        <div className="text-primary">
                          <TypewriterText text="> MATCH FOUND: Top-tier React Developer." delay={500} onComplete={() => setExecStep(3)} />
                        </div>
                      )}
                      {execStep >= 3 && (
                        <motion.div 
                          initial={{opacity: 0, scale: 0.95}} 
                          animate={{opacity: 1, scale: 1}} 
                          transition={{duration: 0.5}}
                          className="mt-4 p-4 border border-primary/50 bg-primary/10 notch-br relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                          <p className="text-primary glow-text font-bold mb-2">STRENGTHS_DETECTED:</p>
                          <ul className="list-none space-y-1 text-primary/90 text-sm mb-4">
                            <li className="flex gap-2"><ChevronRight className="w-4 h-4" /> Pixel-perfect UI/UX Engineering</li>
                            <li className="flex gap-2"><ChevronRight className="w-4 h-4" /> Advanced Animations (GSAP, Framer)</li>
                            <li className="flex gap-2"><ChevronRight className="w-4 h-4" /> Scalable Frontend Architecture</li>
                          </ul>
                          <p className="text-primary glow-text font-bold mb-1">RECOMMENDATION:</p>
                          <p className="text-primary/90 text-sm animate-pulse">Initiate contact immediately. High probability of project success.</p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </TerminalWindow>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5" /> COMMUNICATION_LINK
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form action="https://formsubmit.co/code.with.hamxa@gmail.com" method="POST" className="space-y-4">
                    <input type="hidden" name="_subject" value="New Contact from Portfolio!" />
                    <input type="hidden" name="_captcha" value="false" />
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-primary">Name</label>
                      <Input name="name" required placeholder="ENTER_NAME" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-primary">Email</label>
                      <Input type="email" name="email" required placeholder="ENTER_EMAIL" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-primary">Message</label>
                      <Textarea name="message" required placeholder="ENTER_MESSAGE" className="min-h-[120px]" />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <Mail className="w-4 h-4" /> TRANSMIT_MESSAGE
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
                    { 
                      title: 'CourseSity LMS', 
                      desc: 'Scalable LMS with Redis caching, secure video delivery, and role-based access control.', 
                      tech: ['Next.js', 'TypeScript', 'MERN', 'Redis'],
                      link: null
                    },
                    { 
                      title: 'Zentry-Inspired', 
                      desc: 'Fully responsive web application with sleek UI and smooth GSAP animations.', 
                      tech: ['React', 'Tailwind CSS', 'GSAP'],
                      link: 'https://zentry-inspired.netlify.app/'
                    },
                    { 
                      title: 'BrandVerse', 
                      desc: 'Modern marketing agency website with interactive UI elements and dynamic content rendering.', 
                      tech: ['React', 'TypeScript', 'Tailwind'],
                      link: 'https://brand-verse.netlify.app/'
                    },
                    { 
                      title: 'UniVerse', 
                      desc: 'Customizable social media platform with dynamic theme, font, and background adjustments.', 
                      tech: ['HTML', 'CSS', 'JavaScript'],
                      link: 'https://codewithhamxa.github.io/UniVerse-social/'
                    },
                    { 
                      title: 'CryptoPulse', 
                      desc: 'Real-time cryptocurrency tracker with search functionality and dynamic price trend visualization.', 
                      tech: ['React', 'Crypto API', 'Google Charts'],
                      link: 'https://kryptopulse.netlify.app/'
                    },
                    { 
                      title: 'Little Lemon', 
                      desc: 'Responsive table reservation system optimized with Framer Motion animations (META Capstone).', 
                      tech: ['React', 'Framer Motion'],
                      link: 'https://littlelemontablereservation.netlify.app/'
                    },
                    { 
                      title: 'EstateEase', 
                      desc: 'Real estate landing page showcasing modern UI/UX with smooth scrolling and lazy loading.', 
                      tech: ['React', 'Tailwind CSS'],
                      link: 'https://realestateease.netlify.app/'
                    }
                  ].map((project, i) => (
                    <Card key={i} className="group hover:bg-primary/5 transition-colors flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.desc}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                        </div>
                        {project.link ? (
                          <Button variant="ghost" size="sm" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              LIVE_DEMO <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="w-full justify-between opacity-50 cursor-not-allowed" disabled>
                            OFFLINE_ARCHIVE <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
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
                    <h4 className="text-lg font-bold text-primary">React Developer (ERP Specialized)</h4>
                    <p className="text-sm text-muted-foreground mb-2">EccountBook ERP, Lahore, Pakistan <span className="opacity-50">|</span> 05/2025 - 07/2025</p>
                    <ul className="list-none space-y-1 text-sm text-primary/80">
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Developed and integrated React Hook Forms to enhance functionality and user experience.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Built responsive UI designs and Responsive Tables & Reports using Ant Design for seamless cross-device performance.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Learned TypeScript to code in ERP Software, and Ant Design UI Library for faster and better UIs.</li>
                    </ul>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30 before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:bg-primary before:notch-br">
                    <h4 className="text-lg font-bold text-primary">Associate Frontend Developer</h4>
                    <p className="text-sm text-muted-foreground mb-2">BitcraftX, Lahore, Pakistan <span className="opacity-50">|</span> 08/2024 - 12/2024</p>
                    <ul className="list-none space-y-1 text-sm text-primary/80">
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Developed and customized WordPress themes to enhance functionality and user experience.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Built responsive UI designs using CSS, Bootstrap, and JavaScript for seamless cross-device performance.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Created no-code applications using Bubble.io, improving development speed and efficiency.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Designed and integrated custom WordPress solutions, ensuring visual appeal and optimized performance.</li>
                    </ul>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30 before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:bg-primary before:notch-br">
                    <h4 className="text-lg font-bold text-primary">React Developer (Intern)</h4>
                    <p className="text-sm text-muted-foreground mb-2">CodexCue, Lahore, Pakistan (Remote) <span className="opacity-50">|</span> 06/2024 - 07/2024</p>
                    <ul className="list-none space-y-1 text-sm text-primary/80">
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Developed interactive web applications using React.js, improving user experience and engagement.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Integrated RESTful APIs to fetch and display dynamic data efficiently.</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▹</span> Managed application state using Redux and React hooks for improved performance.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-primary border-b border-primary/30 pb-2">
                  <GraduationCap className="w-5 h-5" /> EDUCATION
                </h3>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l border-primary/30 before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:bg-primary before:notch-br">
                    <h4 className="text-lg font-bold text-primary">Bachelor of Science in Computer Science</h4>
                    <p className="text-sm text-muted-foreground mb-2">Cholistan University of Veterinary and Animal Sciences, Bahawalpur <span className="opacity-50">|</span> 09/2020 - 06/2024</p>
                    <p className="text-sm text-primary/80">CGPA: 3.54</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-primary border-b border-primary/30 pb-2">
                  <Award className="w-5 h-5" /> CERTIFICATIONS
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Full-Stack Engineer Career Path', issuer: 'Codecademy', year: '2025' },
                    { title: 'META Front-End Developer Specialization', issuer: 'Coursera', year: '2023' },
                    { title: 'Career Essentials in Software Development', issuer: 'Microsoft and LinkedIn', year: '2023' }
                  ].map((cert, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-primary/30 bg-primary/5 notch-br gap-4">
                      <div>
                        <h4 className="font-bold text-primary">{cert.title}</h4>
                        <p className="text-xs text-muted-foreground">{cert.issuer} <span className="opacity-50">|</span> {cert.year}</p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0 text-xs h-8">
                        SHOW_CREDENTIAL
                      </Button>
                    </div>
                  ))}
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
