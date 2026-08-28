import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, BarChart3, Bot, CalendarDays, Check, ChevronDown, CircleHelp, Eye, EyeOff, LayoutDashboard, ListChecks, Mail, MessageSquareText, Play, Settings, Sparkles, UsersRound, Workflow, Zap } from "lucide-react";

type Step = { id:string; title:string; minutes:number };
type Section = { id:string; title:string; description:string; icon:typeof UsersRound; tone:string; guideTitle:string; guideText:string; duration:string; steps:Step[] };

const sections:Section[] = [
  { id:"leads", title:"Set up lead management", description:"Add leads and organize your pipeline.", icon:UsersRound, tone:"purple", guideTitle:"Build your lead pipeline", guideText:"Create a simple process for every new lead.", duration:"3:12", steps:[
    {id:"create-lead",title:"Create your first lead",minutes:2}, {id:"import-leads",title:"Import your leads",minutes:3}, {id:"lead-source",title:"Set lead sources",minutes:1}, {id:"assign-lead",title:"Assign a lead",minutes:1}
  ]},
  { id:"automation", title:"Set up automations", description:"Automate one useful follow-up.", icon:Workflow, tone:"blue", guideTitle:"Automate your follow-ups", guideText:"Save time with a simple lead response flow.", duration:"2:38", steps:[
    {id:"automation",title:"Create your first automation",minutes:3}, {id:"test-automation",title:"Test your automation",minutes:1}
  ]},
  { id:"appointments", title:"Enable appointment booking", description:"Connect your calendar and accept bookings.", icon:CalendarDays, tone:"green", guideTitle:"Open your calendar", guideText:"Set availability and publish a booking option.", duration:"3:05", steps:[
    {id:"calendar",title:"Connect your calendar",minutes:2}, {id:"appointment-type",title:"Create an appointment type",minutes:3}, {id:"first-booking",title:"Book a test meeting",minutes:2}
  ]},
  { id:"ai", title:"Configure AI assistants", description:"Start with voice or chat.", icon:Bot, tone:"orange", guideTitle:"Choose your AI assistant", guideText:"Pick one channel and test a conversation.", duration:"2:45", steps:[
    {id:"voice",title:"Create a voice agent",minutes:3}, {id:"chatbot",title:"Create a chatbot",minutes:3}
  ]}
];

function Brand({compact=false}:{compact?:boolean}){return <div className={`brand ${compact?"brand--compact":""}`}><span className="brand-spark">◆</span><span>blazeo</span></div>}

function SignIn({onSuccess}:{onSuccess:()=>void}){
  const [email,setEmail]=useState("james.coolman111@gmail.com"); const [password,setPassword]=useState("password"); const [show,setShow]=useState(false); const [error,setError]=useState("");
  function submit(e:FormEvent){e.preventDefault();if(!email.includes("@")||password.length<6){setError("Enter a valid email and password.");return}onSuccess()}
  return <main className="auth"><section className="auth-card"><div className="auth-story"><Brand/><div><span className="eyebrow light">SmartHub workspace</span><h1>Start with a clear path.</h1><p>Complete the essential setup steps at your own pace.</p></div><span className="auth-note"><Sparkles size={16}/> Progress saves automatically</span></div><form className="auth-form" onSubmit={submit}><div><span className="eyebrow">Welcome back</span><h2>Sign in to SmartHub</h2><p>Continue setting up your workspace.</p></div><label>Email address<input value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label><label>Password<div className="password"><input value={password} onChange={e=>setPassword(e.target.value)} type={show?"text":"password"}/><button type="button" onClick={()=>setShow(!show)} aria-label={show?"Hide password":"Show password"}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>{error&&<span className="error">{error}</span>}<button className="btn primary" type="submit">Sign in <ArrowRight size={17}/></button><div className="or"><span>or</span></div><button className="btn google" type="button"><b>G</b> Continue with Google</button><small>New to SmartHub? <button type="button" className="link">Create an account</button></small></form></section></main>
}

function Loading(){return <main className="loading"><Brand/><div className="spinner"/><h2>Preparing your workspace</h2><p>Setting up your launch plan.</p></main>}

function Welcome({onContinue}:{onContinue:()=>void}){return <div className="modal-backdrop"><section className="welcome-modal"><div className="welcome-art"><span className="welcome-icon"><Sparkles size={30}/></span><span className="floating f1"><UsersRound size={14}/> Leads</span><span className="floating f2"><CalendarDays size={14}/> Meetings</span><span className="floating f3"><Workflow size={14}/> Automations</span></div><div className="welcome-body"><span className="eyebrow">Workspace ready</span><h2>Welcome to SmartHub, James</h2><p>Your launch plan is ready. Complete a few short steps now, or return anytime.</p><button className="btn primary" onClick={onContinue}>View launch plan <ArrowRight size={17}/></button></div></section></div>}

function Checklist({showWelcome,onWelcomeDone}:{showWelcome:boolean;onWelcomeDone:()=>void}){
  const [activeId,setActiveId]=useState("leads"); const [done,setDone]=useState<string[]>(["create-lead"]); const active=sections.find(s=>s.id===activeId)!; const total=sections.reduce((n,s)=>n+s.steps.length,0); const progress=Math.round(done.length/total*100);
  const counts=useMemo(()=>Object.fromEntries(sections.map(s=>[s.id,s.steps.filter(step=>done.includes(step.id)).length])),[done]);
  function toggle(id:string){setDone(items=>items.includes(id)?items.filter(x=>x!==id):[...items,id])}
  return <main className="app">{showWelcome&&<Welcome onContinue={onWelcomeDone}/>}<header className="topbar"><div className="topbrand"><Brand compact/></div><div className="announcement"><span><Zap size={16}/> Make lead follow-up effortless with SmartHub.</span><a href="#">Explore Pro</a></div><div className="top-actions"><span className="trial">14 days left</span><button aria-label="Help"><CircleHelp size={19}/></button><button className="avatar">J</button><span>James</span></div></header>
    <aside className="sidebar"><nav><button className="active" aria-label="Checklist"><ListChecks size={20}/></button><button aria-label="Leads"><UsersRound size={20}/></button><button aria-label="Messages"><MessageSquareText size={20}/></button><button aria-label="Calendar"><CalendarDays size={20}/></button><button aria-label="Reports"><BarChart3 size={20}/></button><button aria-label="Settings"><Settings size={20}/></button></nav></aside>
    <section className="page"><header className="welcome-bar"><div><h1>Welcome to SmartHub, James <span>👋</span></h1><p>Let’s get your workspace ready.</p></div><div><button className="btn subtle">Tour</button><button className="btn primary small">+ Create</button></div></header>
      <section className="launch-card"><div className="launch-head"><div><h2>Your SmartHub launch plan</h2><p>Choose an area and complete a few quick steps.</p></div><span className="progress-label">{done.length} of {total} complete</span></div><div className="progress-track"><i style={{width:`${progress}%`}}/></div>
        <div className="two-column"><section className="setup-panel"><div className="panel-heading"><div><h3>Recommended setup</h3><p>Start with the area most useful to you.</p></div><span>{active.title.replace("Set up ","")}</span></div><div className="accordion-list">{sections.map(section=>{const Icon=section.icon;const open=section.id===activeId;const count=counts[section.id];return <article key={section.id} className={`accordion ${open?"open":""}`}><button className="accordion-head" onClick={()=>setActiveId(section.id)}><span className={`section-icon ${section.tone}`}><Icon size={18}/></span><span className="accordion-title"><strong>{section.title}</strong>{open&&<small>{section.description}</small>}</span><span className="section-count">{count}/{section.steps.length}</span><ChevronDown size={17} className={open?"rotate":""}/></button>{open&&<div className="accordion-body"><div className="step-list">{section.steps.map(step=>{const completed=done.includes(step.id);return <div className={`step ${completed?"done":""}`} key={step.id}><button className="step-check" onClick={()=>toggle(step.id)} aria-label={`Toggle ${step.title}`}>{completed?<Check size={14}/>:null}</button><strong>{step.title}</strong><span>{step.minutes} min</span><button className="step-action" onClick={()=>toggle(step.id)}>{completed?"Done":"Start"}</button></div>})}</div></div>}</article>})}</div></section>
          <aside className="guide"><span className="eyebrow">Quick guidance</span><h3>Help for this area</h3><p className="guide-intro">A short guide for your current setup.</p><div className="video"><div><span>{active.title}</span><b>{active.duration}</b></div><h4>{active.guideTitle}</h4><p>{active.guideText}</p><button aria-label="Play guide"><Play size={21} fill="currentColor"/></button><div className="video-preview"><i/><i/><i/></div></div><div className="resources"><h4>Helpful resource</h4><button><span><Mail size={17}/></span><div><strong>{active.title} guide</strong><small>Simple steps and examples</small></div><ArrowRight size={16}/></button></div></aside>
        </div>
      </section>
    </section>
  </main>
}

export default function App(){const [screen,setScreen]=useState<"signin"|"loading"|"checklist">("signin");const [welcome,setWelcome]=useState(true);function enter(){setScreen("loading");window.setTimeout(()=>setScreen("checklist"),1200)}if(screen==="signin")return <SignIn onSuccess={enter}/>;if(screen==="loading")return <Loading/>;return <Checklist showWelcome={welcome} onWelcomeDone={()=>setWelcome(false)}/>}
