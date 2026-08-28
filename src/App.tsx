"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Bot, CalendarDays, Check, ChevronDown, CircleHelp, Eye, EyeOff, LayoutDashboard, LockKeyhole, Mail, Menu, MessageSquareText, Play, Sparkles, UsersRound, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Step = { id: string; title: string; description: string; minutes: number };
type Section = { id: string; title: string; eyebrow: string; description: string; icon: typeof UsersRound; tone: string; guide: { title: string; description: string; duration: string }; steps: Step[] };

const sections: Section[] = [
  { id: "leads", title: "Manage your leads", eyebrow: "Lead management", description: "Create your lead foundation and start conversations.", icon: UsersRound, tone: "purple", guide: { title: "Build your lead pipeline", description: "See how leads, sources, and assignments work together.", duration: "3:12" }, steps: [
    { id: "create-lead", title: "Create your first lead", description: "Add a contact and start tracking activity.", minutes: 2 },
    { id: "import-leads", title: "Import your leads", description: "Upload your existing contacts from a CSV file.", minutes: 3 },
    { id: "lead-source", title: "Set a lead source", description: "Track where each new opportunity started.", minutes: 1 },
    { id: "assign-lead", title: "Assign a lead", description: "Give ownership to the right team member.", minutes: 1 },
  ] },
  { id: "work", title: "Organize your work", eyebrow: "Tasks & team", description: "Set up follow-ups, team access, and reporting.", icon: Workflow, tone: "blue", guide: { title: "Stay on top of every follow-up", description: "Learn a simple workflow for tasks, owners, and dashboards.", duration: "2:38" }, steps: [
    { id: "task", title: "Create your first task", description: "Add a follow-up so important work stays visible.", minutes: 2 },
    { id: "invite", title: "Invite your team", description: "Bring teammates into your shared workspace.", minutes: 2 },
    { id: "dashboard", title: "Create a dashboard", description: "Track the metrics that matter to your team.", minutes: 3 },
  ] },
  { id: "appointments", title: "Enable appointment booking", eyebrow: "Appointments", description: "Connect your calendar and accept your first booking.", icon: CalendarDays, tone: "green", guide: { title: "Open your calendar for bookings", description: "Connect availability and publish an appointment type.", duration: "3:05" }, steps: [
    { id: "calendar", title: "Connect your calendar", description: "Sync availability and avoid scheduling conflicts.", minutes: 2 },
    { id: "appointment-type", title: "Create an appointment type", description: "Set duration, availability, and booking details.", minutes: 3 },
    { id: "first-booking", title: "Book your first meeting", description: "Test the booking experience from start to finish.", minutes: 2 },
  ] },
  { id: "automation", title: "Automate follow-ups", eyebrow: "Automation", description: "Create a reliable response flow for new leads.", icon: Zap, tone: "orange", guide: { title: "Create a useful first automation", description: "Trigger a timely follow-up when a new lead arrives.", duration: "2:42" }, steps: [
    { id: "automation", title: "Create your first automation", description: "Automate a task, message, or lead action.", minutes: 3 },
    { id: "test-automation", title: "Run a quick test", description: "Confirm that your trigger and action work correctly.", minutes: 1 },
  ] },
  { id: "ai", title: "Set up AI assistants", eyebrow: "Voice & chatbot", description: "Configure one assistant and test a conversation.", icon: Bot, tone: "violet", guide: { title: "Meet your AI assistants", description: "Choose the best starting point for voice or chat.", duration: "3:30" }, steps: [
    { id: "voice", title: "Create a voice agent", description: "Configure an assistant for inbound or outbound calls.", minutes: 3 },
    { id: "chatbot", title: "Create a chatbot", description: "Answer questions and capture leads automatically.", minutes: 3 },
  ] },
];

function BlazeoMark({ compact = false }: { compact?: boolean }) {
  return <div className="brand-mark" aria-label="Blazeo"><span className="brand-flame">◆</span><span className={compact ? "brand-name compact" : "brand-name"}>blazeo</span></div>;
}

function SignIn({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("james.coolman111@gmail.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); if (!email.includes("@") || password.length < 6) { setError("Enter a valid email and a password with at least 6 characters."); return; } onSuccess(); }
  return <main className="auth-shell"><div className="auth-orb orb-one"/><div className="auth-orb orb-two"/><section className="auth-card">
    <div className="auth-story"><BlazeoMark/><div className="story-copy"><span className="eyebrow">SmartHub workspace</span><h1>Start with a clear path.</h1><p>Sign in and complete the essential setup steps at your own pace.</p></div><div className="story-proof"><Sparkles size={17}/> Your progress is saved automatically</div></div>
    <div className="auth-form-wrap"><form className="auth-form" onSubmit={submit}><div><span className="eyebrow">Welcome back</span><h2>Sign in to SmartHub</h2><p className="form-intro">Continue setting up your workspace.</p></div>
      <label>Email address<Input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" autoComplete="email"/></label>
      <label>Password<div className="password-field"><Input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword?"text":"password"} autoComplete="current-password"/><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
      <div className="form-row"><label className="remember"><input type="checkbox" defaultChecked/> Remember me</label><button className="text-button" type="button">Forgot password?</button></div>{error&&<p className="form-error" role="alert">{error}</p>}
      <Button type="submit" className="primary-button">Sign in <ArrowRight size={17}/></Button><div className="divider"><span>or</span></div><Button type="button" variant="outline" className="google-button"><span className="google-g">G</span> Continue with Google</Button><p className="signup-copy">New to SmartHub? <button type="button" className="text-button">Create an account</button></p>
    </form></div>
  </section></main>;
}

function LoadingScreen(){return <main className="loading-screen"><div className="loading-brand"><BlazeoMark/><div className="loader"/><h1>Preparing your workspace</h1><p>We’re personalizing your setup checklist.</p><div className="loading-dots"><i/><i/><i/></div></div></main>}

function WelcomeDialog({open,onContinue}:{open:boolean;onContinue:()=>void}){return <Dialog open={open}><DialogContent showCloseButton={false} className="welcome-dialog" onEscapeKeyDown={(e)=>e.preventDefault()} onPointerDownOutside={(e)=>e.preventDefault()}><div className="welcome-visual"><div className="welcome-ring"><Sparkles size={30}/></div><span className="float-chip chip-one"><UsersRound size={14}/> Manage leads</span><span className="float-chip chip-two"><CalendarDays size={14}/> Book meetings</span><span className="float-chip chip-three"><Workflow size={14}/> Automate work</span></div><DialogHeader className="welcome-copy"><span className="eyebrow">Your workspace is ready</span><DialogTitle>Welcome to Blazeo SmartHub, James</DialogTitle><DialogDescription>We’ve organized the most useful setup steps into a short launch plan. Start anywhere and return whenever you need.</DialogDescription></DialogHeader><div className="welcome-benefits"><span><Check size={15}/> Clear, grouped steps</span><span><Check size={15}/> Short guided actions</span><span><Check size={15}/> Progress saved</span></div><Button className="primary-button welcome-cta" onClick={onContinue}>View my launch plan <ArrowRight size={17}/></Button></DialogContent></Dialog>}

function Checklist({showWelcome,onWelcomeDone}:{showWelcome:boolean;onWelcomeDone:()=>void}){
  const [activeId,setActiveId]=useState("leads"); const [done,setDone]=useState<string[]>(["create-lead"]); const active=sections.find(s=>s.id===activeId)??sections[0]; const total=sections.reduce((n,s)=>n+s.steps.length,0); const progress=Math.round(done.length/total*100); const activeDone=active.steps.filter(s=>done.includes(s.id)).length; const nextStep=active.steps.find(s=>!done.includes(s.id)); const allDone=done.length===total;
  const sectionCounts=useMemo(()=>Object.fromEntries(sections.map(s=>[s.id,s.steps.filter(step=>done.includes(step.id)).length])),[done]);
  function toggleDone(id:string){setDone(items=>items.includes(id)?items.filter(item=>item!==id):[...items,id])}
  return <main className="app-shell"><WelcomeDialog open={showWelcome} onContinue={onWelcomeDone}/><header className="app-header"><BlazeoMark compact/><div className="header-center"><span className="trial-pill">14 days left</span><span>Explore Pro features while you set up SmartHub.</span></div><div className="header-actions"><button aria-label="Help"><CircleHelp size={19}/></button><button className="avatar">J</button><span className="profile-name">James</span></div></header>
    <aside className="side-nav"><button className="mobile-menu" aria-label="Open menu"><Menu size={21}/></button><nav><button className="active" aria-label="Checklist"><Check size={20}/></button><button aria-label="Leads"><UsersRound size={20}/></button><button aria-label="Messages"><MessageSquareText size={20}/></button><button aria-label="Calendar"><CalendarDays size={20}/></button><button aria-label="Automations"><Workflow size={20}/></button><button aria-label="Dashboard"><LayoutDashboard size={20}/></button></nav><button aria-label="Account" className="nav-avatar">J</button></aside>
    <section className="workspace"><div className="workspace-heading"><div><span className="eyebrow">Getting started</span><h1>{allDone?"You’re ready to go, James":"Your SmartHub launch plan"}</h1><p>{allDone?"Your essential setup is complete. You can revisit any item whenever you need.":"Complete the essentials in the order that works for you."}</p></div><div className="overall-progress"><div><strong>{done.length} of {total}</strong><span> steps complete</span></div><span>{progress}%</span></div></div><Progress value={progress} className="main-progress"/>
      <div className="checklist-layout"><aside className="section-list"><p className="panel-label">Setup areas</p>{sections.map(section=>{const Icon=section.icon;const count=sectionCounts[section.id];return <button key={section.id} onClick={()=>setActiveId(section.id)} className={`section-button ${activeId===section.id?"selected":""}`}><span className={`section-icon ${section.tone}`}><Icon size={18}/></span><span className="section-label"><strong>{section.title}</strong><small>{count} of {section.steps.length} complete</small></span>{count===section.steps.length?<span className="complete-dot"><Check size={13}/></span>:<ChevronDown size={16} className={activeId===section.id?"chevron-open":""}/>}</button>})}</aside>
        <section className="task-panel"><div className="task-panel-head"><div><span className="eyebrow">{active.eyebrow}</span><h2>{active.title}</h2><p>{active.description}</p></div><span className="count-pill">{activeDone}/{active.steps.length}</span></div><div className="task-list">{active.steps.map((step,index)=>{const completed=done.includes(step.id);return <article key={step.id} className={`task-card ${completed?"completed":""}`}><button className="check-control" onClick={()=>toggleDone(step.id)} aria-label={completed?`Mark ${step.title} incomplete`:`Mark ${step.title} complete`}>{completed?<Check size={15}/>:<span>{index+1}</span>}</button><div className="task-copy"><h3>{step.title}</h3><p>{step.description}</p></div><span className="time-chip">{step.minutes} min</span><Button onClick={()=>toggleDone(step.id)} variant={completed?"outline":"default"} className={completed?"task-action done":"task-action"}>{completed?"Done":"Start"}</Button></article>})}</div></section>
        <aside className="guide-panel"><span className="eyebrow">Quick guidance</span><h2>{nextStep?"Help for your next step":"Section complete"}</h2><div className="video-card"><div className="video-top"><span>{active.eyebrow}</span><span className="duration">{active.guide.duration}</span></div><h3>{active.guide.title}</h3><p>{active.guide.description}</p><button className="play-button" aria-label={`Play ${active.guide.title}`}><Play fill="currentColor" size={20}/></button><div className="video-lines"><i/><i/><i/></div></div><div className="resource-list"><h3>Helpful resources</h3><button><span className="resource-icon"><Mail size={17}/></span><span><strong>{active.eyebrow} guide</strong><small>A focused walkthrough with examples.</small></span><ArrowRight size={15}/></button><button><span className="resource-icon"><LockKeyhole size={17}/></span><span><strong>Setup best practices</strong><small>Review a recommended configuration.</small></span><ArrowRight size={15}/></button></div></aside>
      </div></section>
  </main>
}

export default function Home(){const [screen,setScreen]=useState<"signin"|"loading"|"checklist">("signin");const [showWelcome,setShowWelcome]=useState(true);function signIn(){setScreen("loading");window.setTimeout(()=>setScreen("checklist"),1500)}if(screen==="signin")return <SignIn onSuccess={signIn}/>;if(screen==="loading")return <LoadingScreen/>;return <Checklist showWelcome={showWelcome} onWelcomeDone={()=>setShowWelcome(false)}/>}
