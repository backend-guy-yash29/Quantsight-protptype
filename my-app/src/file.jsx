import { useState, useEffect, useRef } from "react";

/* ════════════════ STYLES ════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
--bg:#07091C;--p1:#0B0E24;--p2:#101430;--p3:#151A3C;
--b1:#1B2148;--b2:#28305F;
--vi:#6366F1;--viS:rgba(99,102,241,0.13);--viF:rgba(99,102,241,0.05);
--go:#F59E0B;--goS:rgba(245,158,11,0.13);--goF:rgba(245,158,11,0.05);
--em:#10B981;--emS:rgba(16,185,129,0.13);--emF:rgba(16,185,129,0.05);
--ro:#F43F5E;--roS:rgba(244,63,94,0.13);--roF:rgba(244,63,94,0.05);
--am:#FBBF24;--amS:rgba(251,191,36,0.13);--amF:rgba(251,191,36,0.05);
--cy:#22D3EE;--cyS:rgba(34,211,238,0.13);
--t1:#EEF2FF;--t2:#8B94C4;--t3:#4A5386;
--fd:'Syne',sans-serif;--fb:'Inter',sans-serif;--fm:'JetBrains Mono',monospace;
}
body{background:var(--bg);color:var(--t1);font-family:var(--fb);}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px;}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fin{from{opacity:0}to{opacity:1}}
@keyframes pl{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes bl{0%,100%{opacity:1}50%{opacity:0}}
@keyframes mesh{0%,100%{opacity:.45}50%{opacity:.85}}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
`;

/* ════════════════ COMPANIES ════════════════ */
const COS=[
{id:'INFY',n:'Infosys Limited',t:'INFY',ex:'NSE',reg:'SEBI',sec:'IT Services',idx:'NIFTY 50',w:'6.1%',yr:1993,deep:1,lg:'IN',peers:['TCS','WIPRO','HCLTECH','LTIM']},
{id:'HDFCBANK',n:'HDFC Bank',t:'HDFCBANK',ex:'NSE',reg:'SEBI',sec:'Private Banking',idx:'NIFTY 50',w:'13.2%',yr:1995,deep:1,lg:'HD',peers:['ICICIBANK','AXISBANK','KOTAKBANK','SBIN']},
{id:'RELIANCE',n:'Reliance Industries',t:'RELIANCE',ex:'NSE',reg:'SEBI',sec:'Energy & Conglomerate',idx:'NIFTY 50',w:'9.4%',yr:1977,deep:1,lg:'RI',peers:['ONGC','BPCL','IOC','GAIL']},
{id:'TSLA',n:'Tesla, Inc.',t:'TSLA',ex:'NASDAQ',reg:'SEC',sec:'EV & Clean Energy',idx:'NASDAQ 100',w:'2.8%',yr:2010,deep:1,lg:'TS',peers:['RIVN','F','GM','LCID']},
{id:'NVDA',n:'NVIDIA Corporation',t:'NVDA',ex:'NASDAQ',reg:'SEC',sec:'Semiconductors & AI',idx:'NASDAQ 100',w:'8.9%',yr:1999,deep:1,lg:'NV',peers:['AMD','INTC','QCOM','AVGO']},
{id:'TCS',n:'Tata Consultancy Services',t:'TCS',ex:'NSE',reg:'SEBI',sec:'IT Services',idx:'NIFTY 50',w:'4.2%',yr:2004,deep:0,lg:'TC',peers:['INFY','WIPRO','HCLTECH']},
{id:'WIPRO',n:'Wipro Limited',t:'WIPRO',ex:'NSE',reg:'SEBI',sec:'IT Services',idx:'NIFTY 50',w:'0.7%',yr:1946,deep:0,lg:'WI',peers:['INFY','TCS','HCLTECH']},
{id:'HCLTECH',n:'HCL Technologies',t:'HCLTECH',ex:'NSE',reg:'SEBI',sec:'IT Services',idx:'NIFTY 50',w:'1.6%',yr:1999,deep:0,lg:'HC',peers:['INFY','TCS','WIPRO']},
{id:'ZOMATO',n:'Zomato Limited',t:'ZOMATO',ex:'NSE',reg:'SEBI',sec:'Food Tech & Quick Commerce',idx:'NIFTY 50',w:'1.1%',yr:2021,deep:0,lg:'ZO',peers:['SWIGGY','NYKAA','PAYTM']},
{id:'TATAMOTORS',n:'Tata Motors',t:'TATAMOTORS',ex:'NSE',reg:'SEBI',sec:'Automobiles',idx:'NIFTY 50',w:'1.4%',yr:1945,deep:0,lg:'TM',peers:['M&M','MARUTI','ASHOKLEY']},
{id:'BAJFINANCE',n:'Bajaj Finance',t:'BAJFINANCE',ex:'NSE',reg:'SEBI',sec:'NBFC & Consumer Finance',idx:'NIFTY 50',w:'2.2%',yr:1987,deep:0,lg:'BF',peers:['BAJAJFINSV','CHOLAFIN','SHRIRAMFIN']},
{id:'LT',n:'Larsen & Toubro',t:'LT',ex:'NSE',reg:'SEBI',sec:'Infrastructure & Engineering',idx:'NIFTY 50',w:'3.9%',yr:1946,deep:0,lg:'LT',peers:['POWERGRID','NTPC','ADANIPORTS']},
{id:'ASIANPAINT',n:'Asian Paints',t:'ASIANPAINT',ex:'NSE',reg:'SEBI',sec:'Paints & Coatings',idx:'NIFTY 50',w:'1.2%',yr:1982,deep:0,lg:'AP',peers:['BERGEPAINT','KANSAINER','AKZOINDIA']},
{id:'TITAN',n:'Titan Company',t:'TITAN',ex:'NSE',reg:'SEBI',sec:'Consumer Lifestyle',idx:'NIFTY 50',w:'1.5%',yr:1987,deep:0,lg:'TI',peers:['KALYANKJIL','SENCO','PCJEWELLER']},
{id:'AAPL',n:'Apple Inc.',t:'AAPL',ex:'NASDAQ',reg:'SEC',sec:'Consumer Technology',idx:'S&P 500',w:'7.1%',yr:1980,deep:0,lg:'AA',peers:['MSFT','GOOGL','META']},
{id:'MSFT',n:'Microsoft Corporation',t:'MSFT',ex:'NASDAQ',reg:'SEC',sec:'Cloud & Enterprise Software',idx:'S&P 500',w:'6.8%',yr:1986,deep:0,lg:'MS',peers:['AAPL','GOOGL','AMZN']},
{id:'AMZN',n:'Amazon.com, Inc.',t:'AMZN',ex:'NASDAQ',reg:'SEC',sec:'E-commerce & Cloud',idx:'S&P 500',w:'3.9%',yr:1997,deep:0,lg:'AM',peers:['MSFT','GOOGL','WMT']},
{id:'GOOGL',n:'Alphabet Inc.',t:'GOOGL',ex:'NASDAQ',reg:'SEC',sec:'Digital Advertising & AI',idx:'S&P 500',w:'4.2%',yr:2004,deep:0,lg:'GO',peers:['META','MSFT','AMZN']},
{id:'JPM',n:'JPMorgan Chase & Co.',t:'JPM',ex:'NYSE',reg:'SEC',sec:'Investment Banking',idx:'S&P 500',w:'1.4%',yr:1969,deep:0,lg:'JP',peers:['BAC','GS','MS','C']},
{id:'META',n:'Meta Platforms, Inc.',t:'META',ex:'NASDAQ',reg:'SEC',sec:'Social Media & AI',idx:'S&P 500',w:'2.6%',yr:2012,deep:0,lg:'ME',peers:['GOOGL','SNAP','PINS']},
];

/* ════════════════ DEEP DATA ════════════════ */
const DEEP={
INFY:{
 cap:'₹7.68T',ff:'84.9%',price:1847.30,chg:0.80,chgAbs:14.70,cur:'₹',
 hi:1965.00,lo:1358.35,conf:91,promoter:'14.7%',fii:'33.2%',dii:'38.4%',pledge:'0.0%',lastFile:'12 Jul 2026',
 verdict:{stance:'HOLD',conv:'MEDIUM',
  head:'Margin expansion is real, but guidance credibility is the binding constraint.',
  body:'Infosys delivered 21.7% operating margin in Q4 FY25, up 160bps YoY, driven by pyramid optimisation and lower subcontractor costs. However, management has missed its own revenue guidance in 3 of the last 5 quarters, and the current 8–10% FY26 guidance embeds a deal-conversion assumption the agent could not verify against disclosed TCV timelines. Valuation at 28.4× trailing is neither cheap nor stretched. The stock is a hold pending one quarter of guidance delivery.'},
 bull:[
  {p:'Operating margin expanded 160bps YoY to 21.7%, the highest in 11 quarters, with structural levers (pyramid, utilisation) rather than one-offs.',s:'Q4 FY25 Results, pg 8'},
  {p:'Large-deal TCV of $4.6B in Q4 is a three-year high, with 62% net-new — indicating share gain rather than renewal churn.',s:'Q4 FY25 Investor Presentation'},
  {p:'BFSI vertical returned to growth (+5.2% QoQ) after five quarters of decline, historically the leading indicator for the broader book.',s:'Q4 FY25 Earnings Call'},
 ],
 bear:[
  {p:'Net headcount fell 3,200 in FY2025 — the first annual decline in eight years. Historically a 2–3 quarter leading indicator of revenue deceleration.',s:'Annual Report FY2025, pg 63'},
  {p:'Guidance missed in 3 of last 5 quarters. Management credibility discount is warranted until a delivery streak is re-established.',s:'Agent analysis, 5-quarter guidance track'},
  {p:'Margin trails TCS by 280bps despite comparable scale, suggesting a structural cost-base disadvantage rather than a cyclical gap.',s:'Peer comparison, Q4 FY25'},
 ],
 change:[
  'Two consecutive quarters of meeting or beating stated revenue guidance would remove the credibility discount and support a re-rating toward TCS multiples.',
  'Headcount returning to net addition for two quarters would invalidate the demand-deceleration thesis.',
  'Margin sustaining above 22% for three quarters would confirm the expansion is structural, not cyclical.',
 ],
 fy:{
  'FY2025':{rev:163023,ebitda:36842,pat:26713,mgn:21.7,eps:64.2,roe:31.2,de:0.08,ocf:31204,
   notes:[{i:'Other Income',v:'₹3,142 Cr',d:'+34% YoY',fl:1,note:'Driven by treasury gains on a larger cash pile, not operations. Strip this out and PAT growth is 6.1%, not 9.4%.'},
          {i:'Employee Cost',v:'₹92,411 Cr',d:'+2.1% YoY',fl:0,note:'Grew well below revenue (+9.1%) — the primary margin lever this year.'},
          {i:'Subcontractor Cost',v:'₹11,208 Cr',d:'−12.4% YoY',fl:0,note:'Sharp reduction. Sustainable only if utilisation holds; a demand upturn would reverse this.'}]},
  'FY2024':{rev:153670,ebitda:32891,pat:26233,mgn:20.1,eps:63.4,roe:29.8,de:0.09,ocf:25210,notes:[]},
  'FY2023':{rev:146767,ebitda:31240,pat:24095,mgn:19.4,eps:57.6,roe:31.8,de:0.10,ocf:22467,notes:[]},
 },
 quarters:[{q:'Q1 FY25',rev:38994,mgn:20.1,yoy:3.6},{q:'Q2 FY25',rev:40986,mgn:21.1,yoy:4.7},{q:'Q3 FY25',rev:41764,mgn:21.3,yoy:5.4},{q:'Q4 FY25',rev:42279,mgn:21.7,yoy:9.1}],
 peers:[{n:'INFY',rev:'₹1.63L Cr',mgn:'21.7%',gr:'9.1%',pe:'28.4×',roe:'31.2%',me:1},
        {n:'TCS',rev:'₹2.41L Cr',mgn:'24.5%',gr:'5.4%',pe:'32.1×',roe:'46.2%'},
        {n:'HCLTECH',rev:'₹1.10L Cr',mgn:'19.2%',gr:'11.4%',pe:'26.7×',roe:'23.1%'},
        {n:'WIPRO',rev:'₹89.5K Cr',mgn:'16.8%',gr:'1.1%',pe:'22.3×',roe:'15.4%'}],
 peerV:'Infosys trades at a 12% P/E discount to TCS despite delivering higher revenue growth (9.1% vs 5.4%). The discount is attributable to the 280bps margin gap and weaker guidance track record, not growth. HCL Tech is the growth leader in the set and warrants monitoring as a relative outperformer.',
 risks:[
  {l:'HIGH',t:'USD Revenue Concentration',d:'61% of revenue is USD-denominated with limited natural hedging. A 3% INR appreciation compresses operating margin by 80–120bps. Current hedge book covers approximately 6 months of exposure.',s:'Annual Report FY2025, pg 47 (Forex Risk)',c:94},
  {l:'HIGH',t:'Headcount Decline Signal',d:'Net headcount fell 3,200 in FY2025, the first decline in eight years. In the 2016 and 2020 cycles, headcount decline preceded revenue deceleration by 2–3 quarters.',s:'Annual Report FY2025, pg 63',c:88},
  {l:'MEDIUM',t:'Client Concentration',d:'Top 10 clients contribute 34.2% of revenue. Two of these are in the US retail vertical, currently facing budget compression.',s:'Annual Report FY2025, Segment Note 8',c:82},
  {l:'MEDIUM',t:'Gen-AI Disruption to ADM',d:'Application Development & Maintenance represents 38% of revenue and is the segment most exposed to Gen-AI-driven productivity deflation over a 3–5 year horizon.',s:'Risk Factors, Annual Report FY2025',c:71},
  {l:'LOW',t:'US Visa Regulatory Exposure',d:'H-1B dependency has fallen materially; 63% of US workforce is now locally hired versus 42% in FY2019. Residual risk is manageable.',s:'Economic Times, Apr 2026',c:76},
 ],
 anomalies:[
  {sv:'HIGH',c:84,t:'Other Income Composition Shift',d:'Other income rose 34% YoY to ₹3,142 Cr while the underlying cash balance grew only 11%. This implies a yield improvement of ~200bps that is not explained by disclosed treasury policy or the prevailing rate environment.',act:'Verify against Note 21 (Other Income) in the Annual Report and cross-check against the treasury investment mix disclosure.'},
  {sv:'MEDIUM',c:78,t:'Revenue–Headcount Divergence',d:'Revenue grew 9.1% YoY while headcount declined 1.4%. Revenue per employee rose 10.6%, well above the 3–4% historical trend. This is either a genuine automation step-change or a mix shift toward higher-priced work that may not be repeatable.',act:'Compare revenue per employee against TCS and HCL for the same period to isolate company-specific from sector-wide effects.'},
  {sv:'MEDIUM',c:73,t:'TCV to Revenue Conversion Lag',d:'Q4 TCV of $4.6B is a three-year high, yet the historical average conversion lag is 14 months. Near-term guidance appears to assume a materially faster conversion than precedent supports.',act:'Request conversion timeline disclosure by deal size band on the next earnings call.'},
 ],
 macro:[
  {f:'USD/INR',ic:'💱',lvl:'HIGH',dir:'neg',corr:0.71,
   chain:['USD/INR appreciates 3%','61% of revenue is USD-denominated','Reported INR revenue falls ~1.8%','Operating margin compresses 80–120bps','Hedge book absorbs ~40% for 2 quarters'],
   est:'−80 to −120bps operating margin',cf:'HIGH',asm:'Assumes current hedge ratio and no repricing of contracts.'},
  {f:'US Fed Rate Policy',ic:'🏦',lvl:'HIGH',dir:'neg',corr:-0.52,
   chain:['Fed holds rates higher for longer','US corporate IT budgets tighten','Discretionary spend deferred first','Infosys discretionary mix is ~30% of revenue','Deal cycle lengthens by 1–2 quarters'],
   est:'−200 to −400bps revenue growth (FY27)',cf:'MEDIUM',asm:'Assumes discretionary mix stable; managed services would cushion.'},
  {f:'India Budget — IT/GCC Policy',ic:'🏛️',lvl:'MEDIUM',dir:'pos',corr:0.28,
   chain:['Budget 2026 expands GCC incentive framework','Global captives expand in India','Talent competition intensifies','Wage inflation pressure rises','Offset by increased partnership/managed-service demand'],
   est:'Net neutral to +1% revenue, −30bps margin',cf:'MEDIUM',asm:'Assumes GCC expansion is additive, not substitutive.'},
  {f:'Crude Oil',ic:'🛢️',lvl:'LOW',dir:'neg',corr:-0.14,
   chain:['Crude rises above $95/bbl','Client industries (travel, manufacturing) cut budgets','Indirect second-order demand impact only'],
   est:'Negligible direct impact',cf:'LOW',asm:'Second-order effect only; no direct input cost exposure.'},
 ],
 gov:{score:82,items:[
  {ok:1,t:'Auditor Continuity',d:'Deloitte Haskins & Sells since FY2019. No change, no qualification.'},
  {ok:1,t:'Board Independence',d:'7 of 10 directors independent. Audit committee fully independent.'},
  {ok:1,t:'Promoter Pledge',d:'Zero pledged shares. Promoter holding stable at 14.7%.'},
  {ok:0,t:'Related Party Transactions',d:'₹412 Cr in RPTs in FY2025, up 22% YoY. All disclosed and approved, but the growth rate outpaces revenue.'},
  {ok:1,t:'Filing Timeliness',d:'All SEBI filings within statutory deadlines for the last 12 quarters.'},
 ]},
 mgmt:{
  tone:'Cautiously Bullish',score:72,
  quote:'We are seeing broad-based demand recovery across verticals, particularly in financial services and manufacturing.',
  who:'Salil Parekh, CEO — Q4 FY2025 Earnings Call',
  track:[{q:'Q4 FY25',g:'8–10%',a:'9.1%',hit:1},{q:'Q3 FY25',g:'6–8%',a:'5.4%',hit:0},{q:'Q2 FY25',g:'5–7%',a:'4.7%',hit:0},{q:'Q1 FY25',g:'3–5%',a:'3.6%',hit:1},{q:'Q4 FY24',g:'7–9%',a:'6.1%',hit:0}],
  trackV:'Guidance met in 2 of last 5 quarters. Misses cluster in the mid-year quarters, suggesting systematic optimism in H1 forecasting. Apply a discount to the current 8–10% FY26 guidance.',
  qa:[{q:'Margin trajectory beyond FY26',dodge:1,n:'Asked three times by analysts from Morgan Stanley, Kotak and Jefferies. Management declined to quantify beyond "levers remain available" each time.'},
      {q:'Deal conversion timeline for the $4.6B TCV',dodge:1,n:'Deflected to "in line with historical patterns" without disclosing the pattern.'},
      {q:'Headcount trajectory for FY26',dodge:0,n:'Answered directly — guided to net addition resuming in H2 FY26.'}],
  contra:'CEO cited $4.6B in Q4 deal TCV as evidence of "strong momentum," but the disclosed 14-month average conversion lag means this TCV substantially supports FY27 revenue, not the FY26 guidance it was invoked to justify.'},
 news:[
  {d:'18 Aug 2026',tag:'POLICY',t:'Union Budget expands GCC incentive framework',
   chain:'Budget 2026 → GCC tax incentives extended → global captives expand India footprint → talent competition intensifies → wage inflation pressure for IT services',
   imp:'−30bps margin, partially offset by managed-service demand',cf:'MEDIUM'},
  {d:'11 Aug 2026',tag:'SECTOR',t:'US banking sector IT budgets guided flat for CY2027',
   chain:'US bank budget freeze → BFSI discretionary spend deferred → Infosys BFSI is 31% of revenue → near-term deal closure risk',
   imp:'−150 to −250bps BFSI growth',cf:'HIGH'},
  {d:'04 Aug 2026',tag:'COMPANY',t:'Infosys announces $2B AI infrastructure partnership',
   chain:'AI partnership announced → positions for enterprise AI demand → revenue contribution not yet disclosed → optionality without near-term visibility',
   imp:'Not quantifiable — agent flagged as disclosure gap',cf:'LOW'},
 ],
 events:[
  {d:12,type:'contra',lbl:'Contradiction Detected',dsc:'Management guided 15% BFSI growth on the Q2 call; reported trailing BFSI growth was 9.1%. Agent flagged the mismatch 2 days before the decline.',imp:-6.2,src:'Q2 FY26 Transcript, pg 14'},
  {d:19,type:'file',lbl:'SEBI Filing — Q1 FY26 Results',dsc:'Quarterly results filed with BSE/NSE. Revenue in line, margin 40bps ahead of consensus.',imp:2.1,src:'BSE Filing 19 Aug 2026'},
  {d:23,type:'macro',lbl:'RBI Holds Repo Rate',dsc:'Rate hold triggered INR strength, adverse for USD-revenue exporters. Sector-wide move.',imp:-0.9,src:'RBI Policy Statement'},
  {d:26,type:'anom',lbl:'Anomaly: Other Income Spike',dsc:'Other income rose 34% YoY against 11% cash growth. Agent flagged unexplained yield improvement.',imp:1.1,src:'Q1 FY26 Financials, Note 21'},
  {d:29,type:'call',lbl:'Q1 FY26 Earnings Call',dsc:'Management deflected margin guidance questions three times. Agent logged as credibility signal.',imp:-1.4,src:'Q1 FY26 Call Transcript'},
 ],
 sens:[{e:'Guidance revision',v:6.8},{e:'Earnings release',v:4.2},{e:'Regulatory / policy news',v:3.4},{e:'Macro shock (forex/rates)',v:2.1}],
 sensV:'This stock is most sensitive to guidance revisions rather than headline earnings — consistent with the credibility discount identified in the management section.',
 read:'Price has consolidated in a ₹1,780–1,850 band over the last month on declining volume, typically indicating indecision ahead of a catalyst. Two of four peers have already reported and beaten estimates, making the sector read-through mildly positive. Two agent flags from this window remain unresolved.',
 src:[
  {n:'Infosys Annual Report FY2025',ty:'SEBI Filing',u:12},
  {n:'Q4 FY2025 Results — BSE/NSE Disclosure',ty:'SEBI Filing',u:6},
  {n:'Q1 FY2026 Earnings Call Transcript',ty:'Transcript',u:8},
  {n:'Q4 FY2025 Investor Presentation',ty:'Company',u:4},
  {n:'Union Budget 2026 — Finance Bill',ty:'Government',u:2},
  {n:'Peer filings — TCS, HCL, Wipro Q4 FY25',ty:'SEBI Filing',u:5},
  {n:'News corpus — ET, Mint, Business Standard, Reuters',ty:'News',u:9},
 ],
},
};

DEEP.HDFCBANK={
 cap:'₹12.94T',ff:'100%',price:1682.45,chg:-0.42,chgAbs:-7.10,cur:'₹',
 hi:1794.00,lo:1363.55,conf:88,promoter:'0.0%',fii:'47.8%',dii:'34.1%',pledge:'0.0%',lastFile:'19 Jul 2026',
 verdict:{stance:'ACCUMULATE',conv:'HIGH',
  head:'Merger integration drag is peaking; deposit franchise remains the sector\'s strongest asset.',
  body:'HDFC Bank is two years into absorbing HDFC Ltd, and the cost of that integration — elevated credit-deposit ratio, compressed NIM, and slower loan growth — is now visibly at its worst. Deposit growth reaccelerated to 16.2% in Q1 FY26, outpacing credit growth for the first time post-merger, which is the single most important normalisation signal. NIM at 3.46% remains 40bps below pre-merger levels but the trajectory has turned. The agent flags asset quality in the unsecured retail book as the primary residual risk. Valuation at 2.6× book is at a five-year low relative to its own history.'},
 bull:[
  {p:'Deposit growth of 16.2% YoY outpaced credit growth (13.1%) for the first time since the merger — the key normalisation indicator management has been guiding toward.',s:'Q1 FY26 Results, pg 4'},
  {p:'CASA ratio stabilised at 38.4% after seven quarters of decline, indicating the deposit mix deterioration has bottomed.',s:'Q1 FY26 Investor Presentation'},
  {p:'Trading at 2.6× book versus a 5-year median of 3.4× — a valuation discount not supported by fundamentals now that integration drag is easing.',s:'Agent valuation analysis'},
 ],
 bear:[
  {p:'Unsecured retail (personal loans, credit cards) is 18.2% of the book with slippages rising 34bps QoQ — the fastest deterioration in three years.',s:'Q1 FY26 Asset Quality Disclosure'},
  {p:'Credit-deposit ratio at 96.4% remains well above the pre-merger 87% and constrains loan growth until deposits catch up further.',s:'Q1 FY26 Results, pg 6'},
  {p:'NIM at 3.46% is 40bps below pre-merger levels. Management has not committed to a recovery timeline despite repeated analyst questioning.',s:'Q1 FY26 Earnings Call'},
 ],
 change:[
  'NIM expanding above 3.7% for two consecutive quarters would confirm merger drag has fully cleared and support a re-rating toward 3.2× book.',
  'Unsecured retail slippages exceeding 2.5% annualised would invalidate the asset-quality thesis and warrant a downgrade.',
  'Credit-deposit ratio falling below 90% would restore full loan-growth optionality.',
 ],
 fy:{'FY2026':{rev:341280,ebitda:0,pat:70112,mgn:20.5,eps:92.1,roe:14.8,de:0,ocf:0,
   notes:[{i:'Net Interest Income',v:'₹1,24,880 Cr',d:'+9.2% YoY',fl:0,note:'Growth below loan book expansion, reflecting NIM compression from the merger-inherited borrowing mix.'},
          {i:'Provisions',v:'₹18,240 Cr',d:'+41% YoY',fl:1,note:'Sharp increase driven by unsecured retail. Agent flags this as the fastest provisioning growth in three years.'},
          {i:'Cost-to-Income',v:'40.1%',d:'−180bps YoY',fl:0,note:'Improving as merger synergies materialise — the clearest evidence integration is progressing.'}]},
  'FY2025':{rev:307660,ebitda:0,pat:64062,mgn:20.8,eps:84.1,roe:14.4,de:0,ocf:0,notes:[]},
  'FY2024':{rev:283649,ebitda:0,pat:60812,mgn:21.4,eps:79.2,roe:16.9,de:0,ocf:0,notes:[]}},
 quarters:[{q:'Q2 FY26',rev:82140,mgn:20.1,yoy:11.2},{q:'Q3 FY26',rev:84620,mgn:20.4,yoy:10.8},{q:'Q4 FY26',rev:86910,mgn:20.6,yoy:11.6},{q:'Q1 FY27',rev:87610,mgn:20.5,yoy:9.4}],
 peers:[{n:'HDFCBANK',rev:'₹3.41L Cr',mgn:'20.5%',gr:'11.6%',pe:'18.3×',roe:'14.8%',me:1},
        {n:'ICICIBANK',rev:'₹2.36L Cr',mgn:'26.1%',gr:'14.2%',pe:'17.9×',roe:'18.1%'},
        {n:'KOTAKBANK',rev:'₹96.4K Cr',mgn:'24.8%',gr:'12.1%',pe:'19.4×',roe:'15.2%'},
        {n:'AXISBANK',rev:'₹1.42L Cr',mgn:'22.4%',gr:'13.8%',pe:'13.1×',roe:'16.7%'}],
 peerV:'HDFC Bank trades at a premium P/E to ICICI and Axis despite materially lower ROE (14.8% vs 18.1% and 16.7%), reflecting the market pricing in post-merger normalisation. ICICI Bank is currently the superior operator on every profitability metric. The HDFC premium is an option on merger completion, not current performance.',
 risks:[
  {l:'HIGH',t:'Unsecured Retail Asset Quality',d:'Personal loans and credit cards comprise 18.2% of the book. Slippages rose 34bps QoQ to 1.82% annualised — the fastest deterioration in three years and ahead of system trends.',s:'Q1 FY26 Asset Quality Disclosure',c:91},
  {l:'HIGH',t:'Credit-Deposit Ratio Constraint',d:'CD ratio at 96.4% versus pre-merger 87%. Loan growth is structurally capped until deposit accretion closes the gap, limiting near-term earnings expansion.',s:'Q1 FY26 Results, pg 6',c:89},
  {l:'MEDIUM',t:'NIM Recovery Uncertainty',d:'NIM at 3.46% remains 40bps below pre-merger. Management has declined to guide a recovery timeline across three consecutive calls.',s:'Q1 FY26 Earnings Call',c:84},
  {l:'MEDIUM',t:'Deposit Competition Intensity',d:'System-wide deposit competition has raised cost of funds 26bps YoY. HDFC Bank\'s scale requires disproportionate deposit mobilisation to move the ratio.',s:'RBI Sector Data, Jul 2026',c:77},
  {l:'LOW',t:'Regulatory Capital Adequacy',d:'CAR at 18.8%, comfortably above the 11.5% requirement. No near-term capital raise expected.',s:'Q1 FY26 Basel III Disclosure',c:93},
 ],
 anomalies:[
  {sv:'HIGH',c:87,t:'Provisioning Growth vs Slippage Growth Mismatch',d:'Provisions rose 41% YoY while gross slippages rose 22%. The 19-point gap suggests either accelerated provisioning against a known but undisclosed stressed pool, or a change in provisioning policy that has not been called out.',act:'Cross-check against the ECL model disclosure in Note 14 and compare provision coverage ratio movement QoQ.'},
  {sv:'MEDIUM',c:79,t:'Other Income Volatility',d:'Treasury income swung from ₹1,840 Cr to ₹3,210 Cr QoQ (+74%) on a broadly flat bond portfolio. This magnitude of swing is not explained by disclosed duration or rate movements.',act:'Request MTM breakdown by portfolio bucket on the next call.'},
  {sv:'LOW',c:68,t:'Branch Addition Deceleration',d:'Net branch additions fell to 84 in Q1 FY26 from a 4-quarter average of 218. Given deposit mobilisation is the stated priority, this is directionally inconsistent with strategy.',act:'Clarify whether the slowdown reflects a digital-first shift or capex discipline.'},
 ],
 macro:[
  {f:'RBI Repo Rate',ic:'🏦',lvl:'HIGH',dir:'pos',corr:0.68,
   chain:['RBI cuts repo rate 25bps','Cost of deposits falls with a 2-quarter lag','Loan yields reprice faster than deposits','NIM expands in the transition window','Effect reverses once deposits fully reprice'],
   est:'+12 to +18bps NIM for 2 quarters',cf:'HIGH',asm:'Assumes current asset-liability repricing mix holds.'},
  {f:'India GDP Growth',ic:'📈',lvl:'HIGH',dir:'pos',corr:0.74,
   chain:['GDP growth accelerates above 7%','Corporate and retail credit demand rises','Loan book growth accelerates','Asset quality improves with income growth','Provisioning requirement falls'],
   est:'+150 to +250bps loan growth per 1% GDP',cf:'HIGH',asm:'Historical elasticity; assumes no credit-quality deterioration.'},
  {f:'Inflation / CPI',ic:'🛒',lvl:'MEDIUM',dir:'neg',corr:-0.41,
   chain:['CPI rises above 6%','RBI holds or tightens','Deposit competition intensifies','Cost of funds rises','Unsecured retail stress increases as household budgets tighten'],
   est:'−20 to −35bps NIM; slippage risk elevated',cf:'MEDIUM',asm:'Assumes RBI responds to inflation per historical reaction function.'},
  {f:'Crude Oil',ic:'🛢️',lvl:'LOW',dir:'neg',corr:-0.22,
   chain:['Crude rises above $95/bbl','Import bill widens, INR weakens','Imported inflation rises','Indirect pressure via the rate channel'],
   est:'Second-order only, via inflation',cf:'LOW',asm:'No direct exposure; transmission is entirely macro.'},
 ],
 gov:{score:89,items:[
  {ok:1,t:'Auditor Continuity',d:'M S K A & Associates and Price Waterhouse LLP as joint auditors. No qualification, no change.'},
  {ok:1,t:'Board Independence',d:'9 of 13 directors independent. RBI-mandated governance framework fully complied with.'},
  {ok:1,t:'Promoter Holding',d:'Zero promoter holding post-merger — fully institutional and public. No pledge risk by construction.'},
  {ok:1,t:'Related Party Transactions',d:'RPTs declined 8% YoY post-merger as intra-group transactions were eliminated.'},
  {ok:0,t:'Senior Management Attrition',d:'Three senior executives departed in FY2026 including the head of retail assets. Succession disclosed but transition risk is real.'},
 ]},
 mgmt:{tone:'Measured / Defensive',score:61,
  quote:'The integration is progressing as planned and we remain confident in the deposit franchise, though we will not put a timeline on margin normalisation.',
  who:'Sashidhar Jagdishan, MD & CEO — Q1 FY2026 Earnings Call',
  track:[{q:'Q1 FY26',g:'Deposit growth 14–16%',a:'16.2%',hit:1},{q:'Q4 FY25',g:'NIM 3.5–3.6%',a:'3.44%',hit:0},{q:'Q3 FY25',g:'Loan growth 12–14%',a:'13.1%',hit:1},{q:'Q2 FY25',g:'CD ratio below 95%',a:'97.1%',hit:0},{q:'Q1 FY25',g:'Cost-income below 42%',a:'41.3%',hit:1}],
  trackV:'Guidance met in 3 of 5 quarters. Misses cluster specifically around margin and CD-ratio targets — the two metrics most affected by merger integration. Operational guidance (deposits, costs) has been reliable.',
  qa:[{q:'NIM normalisation timeline',dodge:1,n:'Asked by four separate analysts. Management declined to commit to any timeline in each instance, stating only that "the trajectory is right."'},
      {q:'Unsecured retail slippage outlook',dodge:1,n:'Deflected to "within our risk appetite" without quantifying the expected peak.'},
      {q:'Deposit growth sustainability',dodge:0,n:'Answered directly with a specific 14–16% guidance range for FY27.'}],
  contra:'Management characterised asset quality as "stable" on the Q1 call, yet provisioning rose 41% YoY and unsecured slippages rose 34bps QoQ. The agent cannot reconcile "stable" with the disclosed provisioning trajectory.'},
 news:[
  {d:'20 Aug 2026',tag:'REGULATORY',t:'RBI tightens unsecured lending risk weights',
   chain:'RBI raises risk weights on unsecured retail → capital consumption per rupee lent rises → banks with high unsecured mix slow growth → HDFC Bank unsecured is 18.2% of book',
   imp:'−60 to −90bps loan growth; −40bps CAR',cf:'HIGH'},
  {d:'14 Aug 2026',tag:'SECTOR',t:'System deposit competition intensifies as PSU banks raise rates',
   chain:'PSU banks raise term deposit rates 25bps → system-wide competition for deposits → cost of funds rises → NIM pressure across private banks',
   imp:'−15 to −25bps cost of funds',cf:'MEDIUM'},
  {d:'06 Aug 2026',tag:'POLICY',t:'Budget 2026 raises deposit insurance cover to ₹10 lakh',
   chain:'Deposit insurance raised → retail depositor confidence improves → deposit mobilisation eases for all banks → marginally favourable for CD ratio normalisation',
   imp:'Marginally positive for deposit accretion',cf:'LOW'},
 ],
 events:[
  {d:6,type:'file',lbl:'SEBI Filing — Q1 FY26 Results',dsc:'Quarterly results filed. Deposit growth beat, NIM missed guidance for the second consecutive quarter.',imp:-2.4,src:'BSE Filing 06 Aug 2026'},
  {d:11,type:'anom',lbl:'Anomaly: Provisioning Mismatch',dsc:'Provisions +41% YoY against slippages +22%. Agent flagged the 19-point gap as unexplained.',imp:-1.8,src:'Q1 FY26 Financials'},
  {d:14,type:'macro',lbl:'PSU Banks Raise Deposit Rates',dsc:'Sector-wide cost of funds pressure. HDFC Bank most exposed given deposit mobilisation priority.',imp:-1.1,src:'RBI Sector Data'},
  {d:20,type:'contra',lbl:'Contradiction Detected',dsc:'Management described asset quality as "stable" while provisioning rose 41% YoY. Agent flagged the inconsistency.',imp:-3.1,src:'Q1 FY26 Call, pg 9'},
  {d:26,type:'call',lbl:'Analyst Meet — Merger Update',dsc:'Management deflected NIM timeline questions from four analysts. Logged as credibility signal.',imp:0.7,src:'Analyst Meet Transcript'},
 ],
 sens:[{e:'Regulatory / RBI policy',v:5.4},{e:'Asset quality disclosure',v:4.8},{e:'Earnings release',v:3.6},{e:'Macro shock (rates)',v:2.4}],
 sensV:'This stock is most sensitive to regulatory announcements and asset-quality data rather than headline earnings — consistent with a bank in post-merger normalisation where the market is watching balance-sheet repair, not profit growth.',
 read:'Price has drifted lower in a ₹1,650–1,720 band over the last month on above-average volume, indicating distribution rather than accumulation. ICICI Bank has outperformed by 4.2% over the same window, so the weakness is company-specific rather than sectoral. Three agent flags from this window remain unresolved.',
 src:[{n:'HDFC Bank Q1 FY2026 Results',ty:'SEBI Filing',u:11},
  {n:'Annual Report FY2025',ty:'SEBI Filing',u:7},
  {n:'Q1 FY2026 Earnings Call Transcript',ty:'Transcript',u:9},
  {n:'Basel III Pillar 3 Disclosure',ty:'SEBI Filing',u:4},
  {n:'RBI Master Direction — Risk Weights',ty:'Regulatory',u:3},
  {n:'Peer filings — ICICI, Axis, Kotak Q1 FY26',ty:'SEBI Filing',u:5},
  {n:'News corpus — ET, Mint, Bloomberg Quint',ty:'News',u:8}],
};

DEEP.RELIANCE={
 cap:'₹19.42T',ff:'49.6%',price:1434.80,chg:1.24,chgAbs:17.60,cur:'₹',
 hi:1608.80,lo:1114.85,conf:86,promoter:'50.4%',fii:'21.7%',dii:'17.2%',pledge:'0.0%',lastFile:'21 Jul 2026',
 verdict:{stance:'BUY',conv:'MEDIUM',
  head:'Consumer businesses now fund the energy transition; the O2C cycle is the swing factor.',
  body:'Reliance has crossed the point where Jio and Retail together contribute more EBITDA than Oil-to-Chemicals, structurally reducing earnings volatility. Jio ARPU expansion post-tariff-hike is tracking ahead of expectations at ₹208. The New Energy capex programme remains the largest uncertainty: ₹75,000 Cr committed with no disclosed revenue timeline, and the agent flags this as the single largest unquantified item in the investment case. O2C margins remain hostage to the refining cycle. Buy on the consumer compounding, sized for the capex uncertainty.'},
 bull:[{p:'Jio + Retail EBITDA now exceeds O2C for the first time, structurally de-risking earnings from the refining cycle.',s:'Q1 FY26 Segment Results'},
  {p:'Jio ARPU expanded to ₹208 from ₹181, tracking ahead of the post-tariff-hike trajectory analysts had modelled.',s:'Q1 FY26 Jio Disclosure'},
  {p:'Retail store additions resumed at 312 net in Q1 after two quarters of consolidation, with same-store growth back to 9.4%.',s:'Q1 FY26 Retail Segment'}],
 bear:[{p:'₹75,000 Cr committed to New Energy with no disclosed revenue timeline or return threshold — the largest unquantified item on the balance sheet.',s:'Annual Report FY2025, Capex Note'},
  {p:'O2C segment EBITDA fell 12.4% YoY on weaker refining spreads, and management has no control over this cycle.',s:'Q1 FY26 Segment Results'},
  {p:'Net debt rose to ₹1.18L Cr as capex outpaced operating cash flow for the third consecutive quarter.',s:'Q1 FY26 Balance Sheet'}],
 change:['New Energy disclosing a revenue timeline and return threshold would remove the largest uncertainty and support a re-rating.',
  'O2C EBITDA stabilising for two quarters would confirm the refining cycle has troughed.',
  'Net debt falling for two consecutive quarters would signal the capex peak has passed.'],
 fy:{'FY2026':{rev:1042100,ebitda:184200,pat:79210,mgn:17.7,eps:117.1,roe:9.1,de:0.42,ocf:162400,
   notes:[{i:'New Energy Capex',v:'₹28,400 Cr',d:'+61% YoY',fl:1,note:'Accelerating sharply with no disclosed revenue timeline. Agent flags as the single largest unquantified item in the investment case.'},
    {i:'Jio Segment EBITDA',v:'₹64,120 Cr',d:'+18.2% YoY',fl:0,note:'ARPU-led expansion, not subscriber-led. Higher quality growth than the prior cycle.'},
    {i:'O2C Segment EBITDA',v:'₹58,900 Cr',d:'−12.4% YoY',fl:1,note:'Refining spread compression. Cyclical, not structural, but timing is outside management control.'}]},
  'FY2025':{rev:964290,ebitda:171800,pat:73940,mgn:17.8,eps:109.3,roe:8.9,de:0.38,ocf:148200,notes:[]},
  'FY2024':{rev:901064,ebitda:162200,pat:69621,mgn:18.0,eps:102.9,roe:9.3,de:0.36,ocf:139800,notes:[]}},
 quarters:[{q:'Q2 FY26',rev:252400,mgn:17.4,yoy:7.1},{q:'Q3 FY26',rev:258900,mgn:17.6,yoy:8.2},{q:'Q4 FY26',rev:264100,mgn:17.9,yoy:8.9},{q:'Q1 FY27',rev:266700,mgn:17.7,yoy:6.4}],
 peers:[{n:'RELIANCE',rev:'₹10.4L Cr',mgn:'17.7%',gr:'8.9%',pe:'24.1×',roe:'9.1%',me:1},
  {n:'ONGC',rev:'₹6.62L Cr',mgn:'12.1%',gr:'2.4%',pe:'7.8×',roe:'14.2%'},
  {n:'BPCL',rev:'₹4.98L Cr',mgn:'6.2%',gr:'4.1%',pe:'9.4×',roe:'18.7%'},
  {n:'IOC',rev:'₹8.41L Cr',mgn:'5.1%',gr:'1.8%',pe:'8.2×',roe:'12.4%'}],
 peerV:'Reliance trades at a 3× P/E premium to every energy peer, which is only justified if the consumer businesses are valued separately. On a sum-of-parts basis the O2C segment alone would imply a materially lower multiple. The premium is a bet on Jio and Retail, not on energy.',
 risks:[{l:'HIGH',t:'New Energy Capex Without Disclosed Returns',d:'₹75,000 Cr committed across gigafactories and green hydrogen with no published revenue timeline, capacity utilisation target, or return threshold. This is the largest uncommunicated capital allocation in the Indian market.',s:'Annual Report FY2025, Capex Note 34',c:92},
  {l:'HIGH',t:'O2C Refining Cycle Exposure',d:'O2C remains 41% of revenue and is entirely exposed to global refining spreads, which have compressed 12.4% YoY. Management has no operational lever against this.',s:'Q1 FY26 Segment Results',c:90},
  {l:'MEDIUM',t:'Net Debt Trajectory',d:'Net debt at ₹1.18L Cr has risen for three consecutive quarters as capex outpaces operating cash flow. Interest cover remains comfortable but the direction is adverse.',s:'Q1 FY26 Balance Sheet',c:85},
  {l:'MEDIUM',t:'Retail Competitive Intensity',d:'Quick-commerce entrants are compressing margins in grocery, Retail\'s largest category by volume. Same-store growth of 9.4% is healthy but decelerating from 14% two years ago.',s:'Q1 FY26 Retail Segment',c:74},
  {l:'LOW',t:'Promoter Holding Concentration',d:'50.4% promoter holding with zero pledge. Concentration is high but governance record is clean and there is no encumbrance risk.',s:'Q1 FY26 Shareholding Pattern',c:88}],
 anomalies:[{sv:'HIGH',c:86,t:'Capex Disclosure Gap',d:'New Energy capex accelerated 61% YoY to ₹28,400 Cr, yet segment reporting does not disclose revenue, EBITDA, or capacity for this business. It is capitalised but not measured in any public disclosure.',act:'Request separate segment reporting for New Energy under Ind AS 108, or at minimum a capacity and commissioning schedule.'},
  {sv:'MEDIUM',c:77,t:'Jio ARPU vs Subscriber Divergence',d:'ARPU rose 14.9% while net subscriber additions fell to 2.1 million from a 4-quarter average of 8.4 million. Revenue growth is entirely price-led, which is not repeatable without further tariff action.',act:'Assess churn by tariff cohort to determine whether ARPU gains are causing subscriber attrition.'},
  {sv:'MEDIUM',c:71,t:'Working Capital Cycle Extension',d:'Days working capital extended from 18 to 26 days YoY across the consolidated entity, tying up approximately ₹21,000 Cr. Not explained in the MD&A.',act:'Break down by segment to isolate whether this is Retail inventory build or O2C receivables.'}],
 macro:[{f:'Crude Oil (Brent)',ic:'🛢️',lvl:'HIGH',dir:'neg',corr:-0.64,
   chain:['Brent rises above $95/bbl','Refining input cost rises faster than product realisation','O2C gross refining margin compresses','O2C is 41% of revenue','Partially offset by upstream E&P segment gains'],
   est:'−$1/bbl GRM per $10 crude rise',cf:'HIGH',asm:'Assumes product cracks lag crude by the historical 3-week average.'},
  {f:'USD/INR',ic:'💱',lvl:'HIGH',dir:'mix',corr:0.44,
   chain:['INR depreciates 3%','Crude import bill rises in INR terms','Export realisations also rise in INR','Net effect depends on the import-export balance in the quarter','Debt servicing on USD borrowings rises'],
   est:'Broadly neutral on operations; −₹1,400 Cr on USD debt',cf:'MEDIUM',asm:'Assumes current export mix and USD debt of ~$14B.'},
  {f:'India Budget — Energy Policy',ic:'🏛️',lvl:'MEDIUM',dir:'pos',corr:0.31,
   chain:['Budget 2026 extends PLI for green hydrogen and battery storage','Reliance New Energy is a designated beneficiary','Capex burden partially subsidised','Improves the return profile of an otherwise unquantified programme','Does not resolve the disclosure gap'],
   est:'+₹4,000 to ₹6,000 Cr in incentives over 5 years',cf:'MEDIUM',asm:'Assumes Reliance qualifies at the maximum tier.'},
  {f:'Global Metal Prices',ic:'🏗️',lvl:'MEDIUM',dir:'neg',corr:-0.29,
   chain:['Copper and lithium prices rise','Gigafactory and battery capex cost inflates','New Energy capex overruns','Extends an already undisclosed payback period'],
   est:'+8 to 12% on New Energy capex per 20% metal move',cf:'LOW',asm:'Assumes no long-term supply contracts; not disclosed.'}],
 gov:{score:76,items:[{ok:1,t:'Auditor Continuity',d:'S R B C & CO LLP and Chaturvedi & Shah. No change, no qualification in FY2025.'},
  {ok:1,t:'Board Independence',d:'7 of 12 directors independent, meeting SEBI LODR requirements.'},
  {ok:1,t:'Promoter Pledge',d:'Zero pledged shares against 50.4% promoter holding.'},
  {ok:0,t:'Segment Disclosure Adequacy',d:'New Energy receives ₹28,400 Cr in capex but no separate segment reporting. Agent flags this as the most material disclosure gap identified.'},
  {ok:0,t:'Related Party Transactions',d:'₹34,200 Cr in RPTs across group entities. All disclosed and approved, but the absolute scale warrants ongoing monitoring.'}]},
 mgmt:{tone:'Confident / Expansive',score:78,
  quote:'Our New Energy business will be a significant value creator, and we are building it with the same conviction we brought to Jio.',
  who:'Mukesh Ambani, Chairman — Q1 FY2026 Earnings Call',
  track:[{q:'Q1 FY26',g:'Jio ARPU ₹200+',a:'₹208',hit:1},{q:'Q4 FY25',g:'Retail SSG 8–10%',a:'9.4%',hit:1},{q:'Q3 FY25',g:'New Energy first revenue FY26',a:'Not achieved',hit:0},{q:'Q2 FY25',g:'Net debt reduction',a:'Net debt rose',hit:0},{q:'Q1 FY25',g:'O2C EBITDA stable',a:'−12.4%',hit:0}],
  trackV:'Guidance met in 2 of 5 quarters. Consumer-business guidance (Jio, Retail) has been reliable; energy and capital-allocation guidance has consistently missed. Weight management commentary accordingly by segment.',
  qa:[{q:'New Energy revenue timeline',dodge:1,n:'Asked in each of the last four earnings calls. Management has never provided a date, revenue figure, or capacity commissioning schedule.'},
   {q:'Net debt peak',dodge:1,n:'Deflected to "capex is front-loaded by design" without stating when the peak occurs.'},
   {q:'Jio tariff strategy for FY27',dodge:0,n:'Answered directly — confirmed no further hike planned in FY27.'}],
  contra:'Chairman invoked the Jio comparison to justify New Energy conviction, but Jio disclosed subscriber, ARPU and capex metrics from launch. New Energy has received ₹75,000 Cr with zero operating disclosure. The analogy does not hold on the evidence.'},
 news:[{d:'21 Aug 2026',tag:'POLICY',t:'Budget 2026 extends green hydrogen PLI by five years',
   chain:'PLI extension → New Energy capex partially subsidised → improves an undisclosed return profile → does not resolve the measurement gap',imp:'+₹4,000–6,000 Cr over 5 years',cf:'MEDIUM'},
  {d:'13 Aug 2026',tag:'SECTOR',t:'Global refining spreads narrow to 3-year low',
   chain:'Refining spreads compress → O2C GRM falls → O2C is 41% of revenue → consolidated margin pressure',imp:'−12 to −16% O2C EBITDA',cf:'HIGH'},
  {d:'05 Aug 2026',tag:'COMPANY',t:'Reliance Retail announces quick-commerce expansion to 60 cities',
   chain:'Quick-commerce expansion → capex and burn rise near term → competitive response to Blinkit/Zepto → margin dilutive for 4–6 quarters',imp:'−40 to −70bps Retail EBITDA margin',cf:'MEDIUM'}],
 events:[{d:5,type:'file',lbl:'SEBI Filing — Q1 FY26 Results',dsc:'Consolidated results filed. Jio beat, O2C missed, New Energy undisclosed.',imp:1.8,src:'BSE Filing 05 Aug 2026'},
  {d:9,type:'anom',lbl:'Anomaly: Capex Disclosure Gap',dsc:'New Energy capex +61% YoY with zero segment reporting. Agent flagged as the largest unmeasured item.',imp:-1.2,src:'Q1 FY26 Capex Note'},
  {d:13,type:'macro',lbl:'Refining Spreads Hit 3-Year Low',dsc:'Global GRM compression directly impacting O2C, 41% of revenue.',imp:-2.9,src:'Platts Refining Data'},
  {d:18,type:'contra',lbl:'Contradiction Detected',dsc:'Chairman compared New Energy to Jio, but Jio disclosed full metrics from launch while New Energy discloses none.',imp:-0.6,src:'Q1 FY26 Call, pg 6'},
  {d:21,type:'macro',lbl:'Budget Extends Green Hydrogen PLI',dsc:'Policy tailwind for New Energy, partially offsetting the capex burden.',imp:3.4,src:'Union Budget 2026'}],
 sens:[{e:'Crude / refining spreads',v:5.9},{e:'Capital allocation news',v:4.4},{e:'Earnings release',v:3.8},{e:'Policy / regulatory',v:3.1}],
 sensV:'This stock is most sensitive to crude and refining spread movements despite the consumer businesses now contributing more EBITDA — indicating the market has not yet fully re-rated Reliance away from its energy identity.',
 read:'Price has trended higher in a ₹1,400–1,450 band over the last month on rising volume, with the budget PLI announcement providing the primary catalyst. Energy peers have underperformed by 3.1% over the same window, so the strength is company-specific and consumer-driven. Two agent flags remain unresolved.',
 src:[{n:'Reliance Q1 FY2026 Results',ty:'SEBI Filing',u:12},{n:'Annual Report FY2025',ty:'SEBI Filing',u:9},
  {n:'Q1 FY2026 Earnings Call Transcript',ty:'Transcript',u:7},{n:'Jio Platforms Segment Disclosure',ty:'Company',u:5},
  {n:'Union Budget 2026 — Finance Bill',ty:'Government',u:3},{n:'Peer filings — ONGC, BPCL, IOC',ty:'SEBI Filing',u:4},
  {n:'News corpus — ET, Mint, Reuters, Platts',ty:'News',u:8}],
};

DEEP.TSLA={
 cap:'$742.1B',ff:'87.2%',price:231.44,chg:-2.18,chgAbs:-5.16,cur:'$',
 hi:299.28,lo:138.80,conf:79,promoter:'12.8%',fii:'—',dii:'—',pledge:'—',lastFile:'23 Jul 2026',
 verdict:{stance:'REDUCE',conv:'MEDIUM',
  head:'Automotive margins are structurally lower; the valuation still prices an autonomy option with no disclosed timeline.',
  body:'Tesla\'s automotive gross margin ex-credits fell to 14.9%, the lowest since 2019, as price cuts across all regions outpaced cost reduction. Energy storage is the genuine bright spot, growing 62% YoY and now 11% of revenue at higher margins. However, the market capitalisation continues to embed substantial value for full self-driving and robotaxi, for which management has provided a target date in each of the last six years without delivery. The agent flags this as the most persistent guidance credibility gap in the coverage universe. Reduce on the automotive multiple.'},
 bull:[{p:'Energy storage deployed 62% YoY to 31.4 GWh at gross margins above 25%, materially higher than automotive.',s:'Q2 2026 Shareholder Deck, pg 9'},
  {p:'Cost per vehicle fell to $34,100 from $36,200, showing manufacturing efficiency is still improving.',s:'Q2 2026 Financials'},
  {p:'Energy plus services now contribute 23% of gross profit, reducing pure automotive dependence.',s:'Q2 2026 Segment Data'}],
 bear:[{p:'Automotive gross margin ex-credits fell to 14.9%, the lowest since 2019, as price cuts outpaced cost reduction.',s:'Q2 2026 Financials'},
  {p:'Full self-driving has been guided as "next year" in each of the last six years without delivery — the longest-running unmet guidance in the coverage universe.',s:'Agent analysis, 6-year guidance track'},
  {p:'Regulatory credit revenue of $890M is 34% of net income and will decline structurally as competitors electrify.',s:'Q2 2026 10-Q, Note 4'}],
 change:['FSD achieving regulatory approval for unsupervised operation in any major market would validate the autonomy option and justify the current multiple.',
  'Automotive gross margin recovering above 18% for two quarters would indicate pricing has stabilised.',
  'Energy storage exceeding 20% of revenue would meaningfully change the business mix argument.'],
 fy:{'FY2025':{rev:112400,ebitda:14820,pat:8940,mgn:13.2,eps:2.51,roe:13.1,de:0.11,ocf:16240,
   notes:[{i:'Regulatory Credits',v:'$3,120M',d:'+8% YoY',fl:1,note:'34% of net income comes from selling credits to other automakers. This revenue stream declines structurally as competitors electrify. Strip it out and net margin is 5.1%, not 8.0%.'},
    {i:'Automotive Gross Margin',v:'14.9%',d:'−410bps YoY',fl:1,note:'Lowest since 2019. Price cuts across all regions have outpaced cost reduction for five consecutive quarters.'},
    {i:'Energy Storage Revenue',v:'$12,410M',d:'+62% YoY',fl:0,note:'The genuine growth engine, at materially higher margins than automotive.'}]},
  'FY2024':{rev:97690,ebitda:13420,pat:7930,mgn:13.7,eps:2.24,roe:14.2,de:0.12,ocf:14920,notes:[]},
  'FY2023':{rev:96773,ebitda:16630,pat:14997,mgn:17.2,eps:4.30,roe:27.9,de:0.13,ocf:13256,notes:[]}},
 quarters:[{q:'Q3 2025',rev:26840,mgn:13.4,yoy:8.1},{q:'Q4 2025',rev:29120,mgn:13.1,yoy:6.4},{q:'Q1 2026',rev:27410,mgn:12.8,yoy:4.2},{q:'Q2 2026',rev:29030,mgn:13.2,yoy:5.9}],
 peers:[{n:'TSLA',rev:'$112.4B',mgn:'13.2%',gr:'5.9%',pe:'62.4×',roe:'13.1%',me:1},
  {n:'GM',rev:'$187.4B',mgn:'6.1%',gr:'2.1%',pe:'5.8×',roe:'14.9%'},
  {n:'F',rev:'$176.2B',mgn:'3.4%',gr:'1.4%',pe:'11.2×',roe:'9.1%'},
  {n:'RIVN',rev:'$6.8B',mgn:'−41.2%',gr:'32.1%',pe:'—',roe:'−38.4%'}],
 peerV:'Tesla trades at 62× earnings against GM at 5.8× and Ford at 11.2×, a premium of more than 10× to legacy automakers. On automotive fundamentals alone this is unsupportable; the premium is entirely an option on autonomy and energy. Rivian remains loss-making and is not a valuation comparable.',
 risks:[{l:'HIGH',t:'Automotive Margin Compression',d:'Gross margin ex-credits at 14.9% is the lowest since 2019 and has declined for five consecutive quarters. Price cuts have consistently outpaced cost reduction.',s:'Q2 2026 10-Q, Financial Statements',c:93},
  {l:'HIGH',t:'FSD Guidance Credibility',d:'Full self-driving has been guided as achievable "next year" in each of the last six years. No regulatory approval for unsupervised operation exists in any major market.',s:'Agent analysis of 24 quarterly calls',c:90},
  {l:'MEDIUM',t:'Regulatory Credit Dependence',d:'$3.12B in credit revenue represents 34% of net income. This declines structurally as every major automaker electrifies its fleet.',s:'FY2025 10-K, Note 4',c:88},
  {l:'MEDIUM',t:'China Competitive Intensity',d:'BYD and domestic Chinese EV makers have taken share in Tesla\'s second-largest market. Chinese deliveries fell 8.2% YoY.',s:'Q2 2026 Delivery Report',c:81},
  {l:'LOW',t:'Key Person Concentration',d:'Significant strategic and narrative dependence on the CEO, whose attention is divided across multiple ventures. Disclosed as a risk factor.',s:'FY2025 10-K, Item 1A',c:72}],
 anomalies:[{sv:'HIGH',c:88,t:'Net Income Quality',d:'Regulatory credits of $3.12B represent 34% of net income and carry effectively 100% margin. Excluding them, net margin is 5.1% rather than the reported 8.0%. The reported figure materially overstates operating profitability.',act:'Model FY2027 with credit revenue declining 25% annually as competitor fleets electrify; assess resulting EPS.'},
  {sv:'MEDIUM',c:76,t:'Deferred Revenue vs FSD Recognition',d:'Deferred revenue related to FSD stands at $4.2B and has grown for eleven consecutive quarters. Recognition depends on feature delivery that has not occurred.',act:'Review the revenue recognition policy in Note 2 for the specific trigger conditions and assess reversal risk.'},
  {sv:'MEDIUM',c:70,t:'Inventory Days Extension',d:'Days of supply extended to 22 from 15 YoY despite production cuts, indicating demand is softening faster than production is being adjusted.',act:'Cross-check against regional delivery data to isolate which markets are accumulating inventory.'}],
 macro:[{f:'US Fed Rate Policy',ic:'🏦',lvl:'HIGH',dir:'neg',corr:-0.71,
   chain:['Fed holds rates higher for longer','Auto loan rates stay elevated','Monthly payment affordability falls','EV purchase deferral rises (discretionary big-ticket)','Tesla responds with further price cuts','Margin compresses further'],est:'−150 to −250bps gross margin per 100bps rate rise',cf:'HIGH',asm:'Assumes current financing mix; ~78% of US deliveries are financed.'},
  {f:'Lithium & Battery Metals',ic:'🔋',lvl:'HIGH',dir:'pos',corr:0.58,
   chain:['Lithium carbonate prices fall 20%','Cell cost per kWh declines with a 2-quarter lag','Cost per vehicle falls','Margin recovers without price increase'],est:'+80 to 120bps gross margin per 20% lithium decline',cf:'HIGH',asm:'Assumes pass-through per existing supply contracts.'},
  {f:'US EV Tax Credit Policy',ic:'🏛️',lvl:'HIGH',dir:'mix',corr:0.42,
   chain:['IRA EV credit eligibility narrowed','Effective consumer price rises $7,500','Demand elasticity is high in the sub-$50k segment','Tesla absorbs part via price cuts','Margin and volume both pressured'],est:'−4 to −7% US volume, −60bps margin',cf:'MEDIUM',asm:'Assumes Tesla absorbs 50% of the credit loss.'},
  {f:'USD Strength (DXY)',ic:'💱',lvl:'MEDIUM',dir:'neg',corr:-0.34,
   chain:['USD strengthens against EUR and CNY','International revenue translates to fewer USD','~48% of revenue is non-US','Reported revenue and margin both pressured'],est:'−1.2% revenue per 5% DXY move',cf:'MEDIUM',asm:'Assumes minimal hedging, consistent with disclosure.'}],
 gov:{score:64,items:[{ok:1,t:'Auditor Continuity',d:'PricewaterhouseCoopers LLP since 2019. No qualification.'},
  {ok:0,t:'Board Independence',d:'Board independence has been repeatedly challenged by institutional shareholders. Several directors have long-standing personal or commercial ties to the CEO.'},
  {ok:0,t:'Executive Compensation',d:'The CEO compensation package has been subject to Delaware litigation and shareholder re-votes. Governance disputes remain unresolved.'},
  {ok:0,t:'Related Party Transactions',d:'Transactions with SpaceX, xAI and X Corp disclosed. Common control across entities warrants close monitoring.'},
  {ok:1,t:'Filing Timeliness',d:'All SEC filings submitted within statutory deadlines.'}]},
 mgmt:{tone:'Highly Confident / Promotional',score:81,
  quote:'Full autonomy is closer than people think. We expect unsupervised FSD to be available next year.',
  who:'Elon Musk, CEO — Q2 2026 Earnings Call',
  track:[{q:'Q2 2026',g:'FSD unsupervised in 2026',a:'Not achieved',hit:0},{q:'FY2025',g:'Robotaxi fleet by 2025',a:'Not achieved',hit:0},{q:'FY2024',g:'Gross margin above 20%',a:'17.2%',hit:0},{q:'FY2024',g:'Energy storage 40 GWh',a:'31.4 GWh',hit:0},{q:'FY2023',g:'1.8M deliveries',a:'1.81M',hit:1}],
  trackV:'Guidance met in 1 of 5 tracked commitments. Delivery and production targets have historically been reliable; autonomy, margin and energy targets have consistently missed. Weight operational guidance materially higher than strategic guidance.',
  qa:[{q:'FSD regulatory approval pathway',dodge:1,n:'Asked in the last eight consecutive calls. Management has never named a regulator, jurisdiction or approval milestone.'},
   {q:'Automotive margin floor',dodge:1,n:'Deflected to "we optimise for volume and fleet, not quarterly margin."'},
   {q:'Regulatory credit revenue outlook',dodge:0,n:'Answered directly — CFO acknowledged structural decline and guided to reduced contribution.'}],
  contra:'CEO stated unsupervised FSD would be available "next year" on the Q2 2026 call. The same commitment was made on calls in 2021, 2022, 2023, 2024 and 2025. Agent classifies this as a structurally unreliable guidance item rather than a single miss.'},
 news:[{d:'19 Aug 2026',tag:'REGULATORY',t:'NHTSA opens new investigation into FSD-related incidents',
   chain:'NHTSA investigation opened → FSD deployment timeline extends further → autonomy option value in valuation weakens → regulatory overhang persists',imp:'Negative for the autonomy premium; unquantifiable',cf:'HIGH'},
  {d:'12 Aug 2026',tag:'SECTOR',t:'Chinese EV makers cut prices for the fourth time in 2026',
   chain:'BYD and peers cut prices → Tesla China share pressured → Tesla responds with cuts → global margin pressure',imp:'−80 to −120bps gross margin',cf:'HIGH'},
  {d:'03 Aug 2026',tag:'COMPANY',t:'Tesla Energy signs 4 GWh grid storage contract',
   chain:'Grid storage contract → energy segment backlog grows → higher-margin revenue mix → partially offsets automotive compression',imp:'+$1.1B revenue over 18 months',cf:'MEDIUM'}],
 events:[{d:3,type:'file',lbl:'SEC Filing — 8-K Energy Contract',dsc:'4 GWh grid storage contract disclosed. Higher-margin revenue, partially offsetting automotive pressure.',imp:2.6,src:'SEC 8-K, 03 Aug 2026'},
  {d:8,type:'anom',lbl:'Anomaly: Net Income Quality',dsc:'Regulatory credits at 34% of net income. Agent flagged reported profitability as materially overstated.',imp:-1.4,src:'Q2 2026 10-Q, Note 4'},
  {d:12,type:'macro',lbl:'Chinese EV Price War Escalates',dsc:'Fourth round of price cuts by BYD and peers. Direct margin pressure on Tesla China.',imp:-4.2,src:'China Passenger Car Association'},
  {d:19,type:'contra',lbl:'Contradiction Detected',dsc:'CEO repeated the "FSD next year" commitment made in each of the prior five years. Agent classified as structurally unreliable.',imp:-3.8,src:'Q2 2026 Call, pg 11'},
  {d:24,type:'call',lbl:'Q2 2026 Earnings Call',dsc:'Management deflected FSD regulatory pathway questions for the eighth consecutive call.',imp:-2.1,src:'Q2 2026 Transcript'}],
 sens:[{e:'Autonomy / FSD news',v:8.4},{e:'Delivery numbers',v:6.1},{e:'Earnings release',v:5.2},{e:'Regulatory investigation',v:4.7}],
 sensV:'This stock is by far most sensitive to autonomy-related news rather than earnings, confirming that a substantial share of the market capitalisation is an option on FSD rather than a claim on current automotive cash flows.',
 read:'Price has declined through a $225–245 range over the last month on elevated volume, with the NHTSA investigation acting as the primary catalyst. Legacy auto peers were flat over the same window, so the weakness is entirely company-specific. Three agent flags remain unresolved.',
 src:[{n:'Tesla Q2 2026 10-Q',ty:'SEC Filing',u:14},{n:'FY2025 10-K Annual Report',ty:'SEC Filing',u:10},
  {n:'Q2 2026 Earnings Call Transcript',ty:'Transcript',u:9},{n:'Q2 2026 Shareholder Deck',ty:'Company',u:6},
  {n:'NHTSA Investigation Filings',ty:'Regulatory',u:3},{n:'Peer filings — GM, Ford, Rivian',ty:'SEC Filing',u:4},
  {n:'News corpus — Bloomberg, Reuters, WSJ',ty:'News',u:8}],
};

DEEP.NVDA={
 cap:'$3.14T',ff:'96.1%',price:128.72,chg:2.94,chgAbs:3.68,cur:'$',
 hi:153.13,lo:86.62,conf:84,promoter:'3.9%',fii:'—',dii:'—',pledge:'—',lastFile:'20 Jul 2026',
 verdict:{stance:'HOLD',conv:'LOW',
  head:'Execution is flawless; the risk is entirely customer concentration and the durability of the capex cycle.',
  body:'NVIDIA continues to deliver results that exceed consensus by wide margins, with data centre revenue growing 94% YoY and gross margin holding above 74%. The investment question is not execution but durability. Four hyperscale customers now account for 46% of revenue, and their combined AI capex guidance is the single variable that determines NVIDIA\'s next four quarters. The agent flags that these same customers are all developing in-house silicon. Valuation at 41× forward leaves no margin for a capex digestion phase. Hold with low conviction — this is a position sized for volatility, not certainty.'},
 bull:[{p:'Data centre revenue grew 94% YoY with gross margin sustained above 74%, indicating pricing power remains fully intact.',s:'Q2 FY2027 10-Q'},
  {p:'CUDA software ecosystem creates genuine switching costs that in-house silicon alternatives have not yet overcome at scale.',s:'FY2026 10-K, Competition'},
  {p:'Networking revenue grew 112% YoY, showing the attach-rate strategy beyond GPUs is working and widening the moat.',s:'Q2 FY2027 Segment Data'}],
 bear:[{p:'Four customers represent 46% of revenue. All four are actively developing in-house AI accelerators.',s:'Q2 FY2027 10-Q, Concentration Note'},
  {p:'Trading at 41× forward earnings, the valuation embeds continued hyperscale capex growth with no allowance for a digestion phase.',s:'Agent valuation analysis'},
  {p:'Inventory and supply commitments rose 68% YoY to $27.4B, which becomes a material risk if demand decelerates.',s:'Q2 FY2027 Balance Sheet'}],
 change:['Any hyperscaler guiding AI capex down for two consecutive quarters would invalidate the growth thesis and warrant an immediate downgrade.',
  'Customer concentration falling below 35% would materially de-risk the revenue base.',
  'A competitor accelerator achieving meaningful production deployment at a top-four customer would signal moat erosion.'],
 fy:{'FY2026':{rev:148240,ebitda:94120,pat:76840,mgn:51.8,eps:31.12,roe:78.4,de:0.14,ocf:81240,
   notes:[{i:'Customer Concentration',v:'46% (top 4)',d:'+9pp YoY',fl:1,note:'Four customers now account for nearly half of revenue, and each is developing in-house silicon. Agent flags this as the single largest structural risk.'},
    {i:'Inventory & Supply Commitments',v:'$27,410M',d:'+68% YoY',fl:1,note:'Building ahead of demand. Appropriate in an upcycle, materially risky if the capex cycle turns.'},
    {i:'Gross Margin',v:'74.6%',d:'+120bps YoY',fl:0,note:'Expanding despite scale, confirming pricing power has not yet been competed away.'}]},
  'FY2025':{rev:96310,ebitda:61240,pat:49820,mgn:51.7,eps:20.14,roe:71.2,de:0.16,ocf:52140,notes:[]},
  'FY2024':{rev:60922,ebitda:37130,pat:29760,mgn:48.9,eps:11.93,roe:69.2,de:0.18,ocf:28090,notes:[]}},
 quarters:[{q:'Q3 FY26',rev:33410,mgn:51.2,yoy:88.4},{q:'Q4 FY26',rev:37240,mgn:51.6,yoy:82.1},{q:'Q1 FY27',rev:38120,mgn:51.9,yoy:71.2},{q:'Q2 FY27',rev:39470,mgn:51.8,yoy:64.8}],
 peers:[{n:'NVDA',rev:'$148.2B',mgn:'51.8%',gr:'64.8%',pe:'41.2×',roe:'78.4%',me:1},
  {n:'AMD',rev:'$31.4B',mgn:'8.1%',gr:'22.4%',pe:'38.7×',roe:'6.2%'},
  {n:'AVGO',rev:'$62.1B',mgn:'32.4%',gr:'41.2%',pe:'34.1×',roe:'28.9%'},
  {n:'INTC',rev:'$54.2B',mgn:'−4.1%',gr:'−2.1%',pe:'—',roe:'−3.8%'}],
 peerV:'NVIDIA trades at a modest P/E premium to AMD and Broadcom despite vastly superior growth (64.8% vs 22.4% and 41.2%) and margin (51.8% vs 8.1% and 32.4%). On a PEG basis NVIDIA is arguably the cheapest name in the set. The valuation debate is about durability of growth, not the current multiple.',
 risks:[{l:'HIGH',t:'Customer Concentration',d:'Four hyperscale customers account for 46% of revenue, up from 37% a year ago. Each is simultaneously developing in-house AI accelerators, making them both the largest customers and the most credible future competitors.',s:'Q2 FY2027 10-Q, Concentration Note',c:95},
  {l:'HIGH',t:'AI Capex Cycle Durability',d:'Revenue growth is entirely dependent on hyperscale AI capital expenditure continuing at current levels. A digestion phase of even two quarters would materially reset growth expectations at a 41× multiple.',s:'Agent analysis of hyperscaler capex guidance',c:87},
  {l:'MEDIUM',t:'Inventory & Supply Commitments',d:'Inventory plus purchase commitments rose 68% YoY to $27.4B. This is appropriate positioning in an upcycle but becomes a write-down risk if demand decelerates.',s:'Q2 FY2027 Balance Sheet',c:83},
  {l:'MEDIUM',t:'Export Control Exposure',d:'China revenue has fallen to 9% from 22% two years ago due to export restrictions. Further tightening or retaliation remains possible.',s:'FY2026 10-K, Item 1A',c:80},
  {l:'LOW',t:'Foundry Dependence',d:'Substantially dependent on TSMC for advanced-node manufacturing. Concentration is real but no viable alternative exists at the required node.',s:'FY2026 10-K, Supply Chain',c:86}],
 anomalies:[{sv:'HIGH',c:89,t:'Customer Concentration Acceleration',d:'Top-four customer concentration rose 9 percentage points in a single year to 46%. This is unusual in a business scaling this rapidly — normally growth diversifies the base. It indicates growth is being driven by a narrowing rather than a widening customer set.',act:'Model a scenario where any one of the top four reduces purchases 30%; assess revenue and multiple impact.'},
  {sv:'MEDIUM',c:78,t:'Inventory Build vs Revenue Growth',d:'Inventory and supply commitments grew 68% while revenue grew 64.8%. Inventory growing faster than revenue in an upcycle is defensible, but the gap warrants monitoring as the growth rate decelerates quarter over quarter.',act:'Track inventory turns against the revenue growth deceleration trend over the next two quarters.'},
  {sv:'LOW',c:71,t:'Revenue Growth Deceleration Pattern',d:'YoY growth has decelerated in each of the last four quarters: 88.4%, 82.1%, 71.2%, 64.8%. Still exceptional, but the deceleration is consistent and linear rather than noisy.',act:'Extrapolate the deceleration trend and assess against the growth embedded in the current multiple.'}],
 macro:[{f:'US Fed Rate Policy',ic:'🏦',lvl:'HIGH',dir:'neg',corr:-0.62,
   chain:['Fed holds rates higher for longer','Cost of capital for hyperscalers rises','AI capex projects face higher hurdle rates','Capex deferral or phasing','NVIDIA order book softens with a 2-quarter lag'],est:'−10 to −20% order growth per 100bps',cf:'MEDIUM',asm:'Assumes hyperscalers apply standard hurdle-rate discipline; historically they have not.'},
  {f:'US–China Export Controls',ic:'🏛️',lvl:'HIGH',dir:'neg',corr:-0.48,
   chain:['Export controls tighten further','China-eligible SKUs restricted','China is 9% of revenue, down from 22%','Domestic Chinese alternatives gain share permanently','Long-term addressable market shrinks'],est:'−5 to −9% revenue in a full restriction scenario',cf:'HIGH',asm:'Assumes no workaround SKU is permitted.'},
  {f:'Semiconductor Metals & Substrates',ic:'🏗️',lvl:'MEDIUM',dir:'neg',corr:-0.26,
   chain:['Advanced substrate and rare earth prices rise','Foundry and packaging costs increase','TSMC passes through cost increases','Gross margin compresses unless priced through'],est:'−40 to −80bps gross margin per 15% input rise',cf:'MEDIUM',asm:'Assumes partial pass-through given current pricing power.'},
  {f:'USD Strength (DXY)',ic:'💱',lvl:'LOW',dir:'neg',corr:-0.19,
   chain:['USD strengthens','International customer purchasing power falls','Most contracts are USD-denominated','Limited direct effect; second-order demand impact only'],est:'Minimal — under 1% revenue',cf:'LOW',asm:'Assumes USD-denominated contract structure holds.'}],
 gov:{score:86,items:[{ok:1,t:'Auditor Continuity',d:'PricewaterhouseCoopers LLP. No change, no qualification.'},
  {ok:1,t:'Board Independence',d:'11 of 13 directors independent. Audit and compensation committees fully independent.'},
  {ok:0,t:'Insider Selling Activity',d:'Executives sold $1.24B in shares over the last twelve months under 10b5-1 plans. Pre-arranged and lawful, but the scale is notable.'},
  {ok:1,t:'Related Party Transactions',d:'Immaterial. No significant RPTs disclosed in FY2026.'},
  {ok:1,t:'Filing Timeliness',d:'All SEC filings within statutory deadlines. Disclosure quality is above sector average.'}]},
 mgmt:{tone:'Confident / Data-Led',score:86,
  quote:'Demand for accelerated computing continues to exceed our supply, and we see this dynamic persisting through the coming year.',
  who:'Jensen Huang, CEO — Q2 FY2027 Earnings Call',
  track:[{q:'Q2 FY27',g:'Revenue $38.5B',a:'$39.47B',hit:1},{q:'Q1 FY27',g:'Revenue $37.2B',a:'$38.12B',hit:1},{q:'Q4 FY26',g:'Gross margin 51–52%',a:'51.6%',hit:1},{q:'Q3 FY26',g:'Revenue $32.8B',a:'$33.41B',hit:1},{q:'Q2 FY26',g:'Data centre growth above 80%',a:'88.4%',hit:1}],
  trackV:'Guidance met or exceeded in 5 of 5 tracked quarters. NVIDIA has the strongest guidance credibility record in the coverage universe. Management commentary should be weighted at full value — a rare finding.',
  qa:[{q:'Customer concentration outlook',dodge:1,n:'Asked by three analysts. Management acknowledged concentration but declined to name customers or quantify the trend forward.'},
   {q:'In-house silicon competitive threat',dodge:1,n:'Deflected to a general statement on the CUDA ecosystem without addressing the specific hyperscaler programmes.'},
   {q:'Supply and inventory positioning',dodge:0,n:'Answered directly with specific commitment figures and a stated rationale for building ahead.'}],
  contra:'Management characterises demand as exceeding supply, which is consistent with the reported figures. However, the same call declined to address whether the top four customers reducing purchases would change this. The agent notes no contradiction in the data, but a material gap in the disclosure of dependency risk.'},
 news:[{d:'22 Aug 2026',tag:'SECTOR',t:'Major hyperscaler guides AI capex flat for FY2027',
   chain:'Hyperscaler capex guided flat → NVIDIA order book growth assumption challenged → top-four concentration means single-customer impact is material → growth multiple at risk',imp:'−8 to −14% revenue growth if replicated across peers',cf:'HIGH'},
  {d:'15 Aug 2026',tag:'REGULATORY',t:'Commerce Department reviews additional AI chip export restrictions',
   chain:'Export review opened → China-eligible SKUs at risk → China already down to 9% of revenue → further restriction largely priced but caps recovery optionality',imp:'−3 to −5% revenue in a full restriction case',cf:'MEDIUM'},
  {d:'07 Aug 2026',tag:'COMPANY',t:'NVIDIA announces next-generation architecture with 2027 availability',
   chain:'Next-gen architecture announced → extends performance lead → raises switching cost for in-house alternatives → defends concentration risk over the medium term',imp:'Supportive of moat; no near-term revenue',cf:'MEDIUM'}],
 events:[{d:7,type:'file',lbl:'SEC Filing — 8-K Product Announcement',dsc:'Next-generation architecture disclosed with 2027 availability. Extends the performance lead.',imp:3.2,src:'SEC 8-K, 07 Aug 2026'},
  {d:11,type:'anom',lbl:'Anomaly: Concentration Acceleration',dsc:'Top-four customer share rose 9pp YoY to 46%. Agent flagged growth as narrowing rather than diversifying.',imp:-1.1,src:'Q2 FY27 10-Q'},
  {d:15,type:'macro',lbl:'Commerce Reviews Export Restrictions',dsc:'Additional China restrictions under review. Largely priced, but caps recovery optionality.',imp:-2.4,src:'US Commerce Department'},
  {d:20,type:'file',lbl:'SEC Filing — Q2 FY27 10-Q',dsc:'Revenue and margin both beat guidance. Fifth consecutive quarter of meeting or exceeding.',imp:4.6,src:'SEC 10-Q, 20 Aug 2026'},
  {d:22,type:'macro',lbl:'Hyperscaler Guides Capex Flat',dsc:'A top-four customer guided AI capex flat for FY2027. Agent flagged as the highest-impact open risk.',imp:-5.1,src:'Customer Earnings Call'}],
 sens:[{e:'Hyperscaler capex guidance',v:7.9},{e:'Earnings release',v:6.4},{e:'Export control news',v:4.1},{e:'Competitor product news',v:3.2}],
 sensV:'This stock is most sensitive to customer capex guidance rather than its own earnings — a direct market confirmation of the concentration risk the agent has flagged as the primary structural issue.',
 read:'Price has risen through a $118–132 range over the last month on strong volume following the Q2 beat, before giving back gains on the hyperscaler capex guidance. Semiconductor peers underperformed by 2.4%, so the strength was company-specific until the customer news. Two agent flags remain unresolved.',
 src:[{n:'NVIDIA Q2 FY2027 10-Q',ty:'SEC Filing',u:13},{n:'FY2026 10-K Annual Report',ty:'SEC Filing',u:11},
  {n:'Q2 FY2027 Earnings Call Transcript',ty:'Transcript',u:8},{n:'Q2 FY2027 CFO Commentary',ty:'Company',u:5},
  {n:'US Commerce Department Export Rules',ty:'Regulatory',u:3},{n:'Peer filings — AMD, Broadcom, Intel',ty:'SEC Filing',u:4},
  {n:'News corpus — Bloomberg, Reuters, SemiAnalysis',ty:'News',u:7}],
};

/* ════════════════ LIGHT GENERATOR ════════════════ */
function rnd(seed){let s=0;for(let i=0;i<seed.length;i++)s=(s*31+seed.charCodeAt(i))>>>0;
 return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}

function genLight(c){
 const r=rnd(c.id),isIN=c.reg==='SEBI',cur=isIN?'₹':'$';
 const base=isIN?(20000+r()*200000):(10+r()*300);
 const mgn=+(8+r()*30).toFixed(1),gr=+(1+r()*22).toFixed(1);
 const price=+(isIN?(300+r()*3500):(35+r()*600)).toFixed(2);
 const chg=+((r()-0.42)*4).toFixed(2);
 const conf=79+Math.round(r()*13),sent=48+Math.round(r()*40);
 const F=isIN?'Annual Report FY2025':'10-K Annual Report FY2025';
 const Q=isIN?'Q1 FY2026 Results':'Q2 2026 10-Q';
 const fyk=isIN?['FY2026','FY2025','FY2024']:['FY2025','FY2024','FY2023'];
 const fy={};fyk.forEach((k,i)=>{const m=1-i*0.07;
  fy[k]={rev:Math.round(base*m),ebitda:Math.round(base*m*mgn/100*1.4),pat:Math.round(base*m*mgn/100),
   mgn:+(mgn-i*0.6).toFixed(1),eps:+(base*m*mgn/100/900).toFixed(2),roe:+(11+r()*22).toFixed(1),
   de:+(r()*0.6).toFixed(2),ocf:Math.round(base*m*mgn/100*1.2),
   notes:i===0?[{i:'Other Income',v:`${cur}${Math.round(base*0.02).toLocaleString()}`,d:`+${Math.round(15+r()*30)}% YoY`,fl:1,note:'Growth materially outpaces the underlying asset base. Agent flags for verification against the treasury and investment disclosure.'},
    {i:'Employee Cost',v:`${cur}${Math.round(base*0.31).toLocaleString()}`,d:`+${(2+r()*6).toFixed(1)}% YoY`,fl:0,note:`Grew below revenue growth of ${gr}%, contributing positively to margin expansion this year.`}]:[]};});
 const qs=isIN?['Q2 FY26','Q3 FY26','Q4 FY26','Q1 FY27']:['Q3 2025','Q4 2025','Q1 2026','Q2 2026'];
 const st=['BUY','ACCUMULATE','HOLD','REDUCE'][Math.floor(r()*4)];
 return{
  cap:isIN?`₹${(base/38000).toFixed(2)}T`:`$${(base*2.4).toFixed(1)}B`,ff:`${(45+r()*50).toFixed(1)}%`,
  price,chg,chgAbs:+(price*chg/100).toFixed(2),cur,hi:+(price*1.22).toFixed(2),lo:+(price*0.72).toFixed(2),
  conf,promoter:isIN?`${(r()*58).toFixed(1)}%`:`${(r()*12).toFixed(1)}%`,
  fii:isIN?`${(14+r()*32).toFixed(1)}%`:'—',dii:isIN?`${(12+r()*28).toFixed(1)}%`:'—',pledge:isIN?'0.0%':'—',
  lastFile:isIN?'18 Jul 2026':'21 Jul 2026',
  verdict:{stance:st,conv:['HIGH','MEDIUM','LOW'][Math.floor(r()*3)],
   head:`${mgn>20?'Margin profile is the differentiator':'Growth is outpacing margin delivery'}; ${gr>12?'the growth runway remains intact':'execution consistency is the binding constraint'}.`,
   body:`${c.n} delivered ${mgn}% operating margin on ${gr}% revenue growth in the latest reported period. The agent identified ${gr>12?'a strong growth trajectory supported by segment-level expansion':'moderate growth with margin as the primary earnings driver'}, alongside ${mgn>20?'an above-sector margin profile':'a margin profile that trails the sector median'}. Guidance credibility is ${conf>86?'strong, with management meeting stated targets consistently':'mixed, with periodic misses that warrant a modest discount to forward guidance'}. Peer positioning within ${c.sec} is ${gr>12?'favourable on growth':'defensive'}, and valuation is ${st==='BUY'?'supportive at current levels':st==='REDUCE'?'stretched relative to delivery':'broadly fair'}.`},
  bull:[{p:`Operating margin of ${mgn}% ${mgn>20?'leads the peer set and reflects structural cost advantages':'is improving sequentially as scale benefits materialise'}.`,s:`${Q}, Segment Results`},
   {p:`Revenue growth of ${gr}% ${gr>12?'materially outpaces the sector':'is stable and supported by a diversified base'}, with ${c.sec.split(' ')[0]} demand holding firm.`,s:F},
   {p:`Balance sheet remains conservative, providing capacity to fund growth without dilution or leverage stress.`,s:`${F}, Balance Sheet`}],
  bear:[{p:`Competitive intensity in ${c.sec} is rising, with peers pricing aggressively for share.`,s:'Peer analysis, latest filings'},
   {p:`${gr<10?'Revenue growth has decelerated over the last three quarters and is now below the sector median.':'Margin trails the top quartile of the peer set despite comparable scale.'}`,s:Q},
   {p:`Client and segment concentration leaves earnings exposed to a downturn in any single vertical.`,s:`${F}, Segment Note`}],
  change:[`Two consecutive quarters of ${gr>12?'margin expansion above sector median':'revenue growth above 12%'} would support a re-rating.`,
   `A sustained deterioration in the competitive position within ${c.sec} would invalidate the current thesis.`,
   `Management delivering against stated guidance for two quarters would remove the credibility discount.`],
  fy,quarters:qs.map((q,i)=>({q,rev:Math.round(base/4*(1+i*0.028)),mgn:+(mgn-0.6+i*0.25).toFixed(1),yoy:+(gr-1.5+i*0.7).toFixed(1)})),
  peers:[{n:c.t,rev:`${cur}${isIN?(base/1000).toFixed(0)+'K Cr':(base).toFixed(0)+'B'}`,mgn:`${mgn}%`,gr:`${gr}%`,pe:`${(18+r()*22).toFixed(1)}×`,roe:`${(12+r()*25).toFixed(1)}%`,me:1},
   ...c.peers.slice(0,3).map(p=>({n:p,rev:`${cur}${isIN?(base*(0.5+r()*1.6)/1000).toFixed(0)+'K Cr':(base*(0.4+r()*2)).toFixed(0)+'B'}`,
    mgn:`${(mgn+r()*10-5).toFixed(1)}%`,gr:`${(gr+r()*10-5).toFixed(1)}%`,pe:`${(16+r()*24).toFixed(1)}×`,roe:`${(10+r()*28).toFixed(1)}%`}))],
  peerV:`${c.t} ${mgn>20?'holds a margin advantage over the peer set':'trails peers on margin'} while ${gr>12?'leading on revenue growth':'growing broadly in line with the sector'}. Relative valuation appears ${st==='BUY'?'undemanding':'full'} given the delivery record. Peer divergence within ${c.sec} is currently driven by ${gr>12?'growth differentials':'margin execution'} rather than end-market conditions.`,
  risks:[
   {l:'HIGH',t:isIN?'Currency & Export Exposure':'Multi-Currency Translation Risk',d:`Material revenue is exposed to currency movement with partial hedging. A 3% adverse move compresses reported margin by an estimated 60–100bps.`,s:`${F}, Financial Risk Note`,c:88+Math.round(r()*7)},
   {l:'HIGH',t:'Competitive Intensity',d:`Peers in ${c.sec} are competing on price for share, placing sustained pressure on realisation and deal economics.`,s:'Peer filings and industry data',c:80+Math.round(r()*10)},
   {l:'MEDIUM',t:'Client / Segment Concentration',d:`Top clients and the largest segment together represent a material share of revenue. A downturn in either is not readily offset.`,s:`${F}, Segment Note`,c:74+Math.round(r()*12)},
   {l:'MEDIUM',t:isIN?'Regulatory & SEBI Compliance':'Regulatory & SEC Compliance',d:`Subject to ${isIN?'SEBI LODR and sector-specific regulation':'SEC reporting and sector-specific regulation'}. Compliance cost is rising and any lapse carries reputational cost.`,s:isIN?'SEBI Compliance Filing':'SEC Filing, Item 1A',c:76+Math.round(r()*10)},
   {l:'LOW',t:'Macro Cycle Sensitivity',d:`Performance correlates with ${isIN?'India GDP and domestic demand':'US consumer and enterprise spending'} cycles, though the effect is diversified across segments.`,s:'Agent macro analysis',c:70+Math.round(r()*14)}],
  anomalies:[
   {sv:'MEDIUM',c:74+Math.round(r()*14),t:'Other Income Growth Divergence',d:`Other income grew materially faster than the underlying asset base, implying a yield or classification change not explained in the MD&A.`,act:`Verify against the other income note in the ${isIN?'Annual Report':'10-K'} and reconcile with the disclosed investment policy.`},
   {sv:'MEDIUM',c:70+Math.round(r()*12),t:'Working Capital Cycle Extension',d:`Days working capital extended year over year, tying up cash without a corresponding revenue benefit. Not addressed in management commentary.`,act:'Break down by receivables, inventory and payables to isolate the driver.'}],
  macro:[
   {f:isIN?'USD/INR':'USD Strength (DXY)',ic:'💱',lvl:'HIGH',dir:'neg',corr:+(0.4+r()*0.35).toFixed(2),
    chain:[isIN?'INR appreciates 3% against USD':'USD strengthens 5% on a trade-weighted basis','Export realisations translate to less domestic currency','Hedge book absorbs part of the impact for two quarters','Residual flows through to operating margin'],
    est:'−60 to −100bps operating margin',cf:'HIGH',asm:'Assumes current hedge ratio and no contract repricing.'},
   {f:isIN?'RBI Policy Rate':'US Fed Rate Policy',ic:'🏦',lvl:'MEDIUM',dir:'neg',corr:-(0.3+r()*0.3).toFixed(2),
    chain:[isIN?'RBI holds or tightens policy rate':'Fed holds rates higher for longer','Cost of capital rises across the customer base','Discretionary spending is deferred first',`${c.sec} demand softens with a two-quarter lag`],
    est:'−100 to −250bps revenue growth',cf:'MEDIUM',asm:'Assumes historical demand elasticity to rates.'},
   {f:'Crude Oil (Brent)',ic:'🛢️',lvl:isIN?'MEDIUM':'LOW',dir:'neg',corr:-(0.1+r()*0.3).toFixed(2),
    chain:['Brent rises above $95/bbl','Input, logistics and energy costs rise','Customer industries face budget pressure','Second-order demand impact follows'],
    est:'−20 to −50bps margin',cf:'MEDIUM',asm:'Assumes partial pass-through to customers.'},
   {f:isIN?'India Budget — Sector Policy':'US Fiscal & Trade Policy',ic:'🏛️',lvl:'MEDIUM',dir:'pos',corr:+(0.15+r()*0.25).toFixed(2),
    chain:[isIN?`Budget 2026 alters allocation for ${c.sec}`:`Federal policy shifts affect ${c.sec}`,'Sector demand outlook is revised','Company captures a share proportional to its market position','Effect materialises with a 12–18 month lag'],
    est:'+1 to 4% revenue over 18 months',cf:'MEDIUM',asm:'Assumes execution rates hold and share is maintained.'}],
  gov:{score:72+Math.round(r()*20),items:[
   {ok:1,t:'Auditor Continuity',d:'No auditor change and no qualification in the most recent audited period.'},
   {ok:1,t:'Board Independence',d:`Board composition meets ${isIN?'SEBI LODR':'exchange listing'} independence requirements.`},
   {ok:isIN?(r()>0.25?1:0):1,t:isIN?'Promoter Pledge':'Insider Activity',d:isIN?'No material pledged shareholding disclosed in the latest shareholding pattern.':'Insider transactions conducted under pre-arranged 10b5-1 plans.'},
   {ok:r()>0.45?1:0,t:'Related Party Transactions',d:'Related party transactions disclosed and approved. Scale warrants routine monitoring against revenue growth.'},
   {ok:1,t:'Filing Timeliness',d:`All ${c.reg} filings submitted within statutory deadlines over the trailing four quarters.`}]},
  mgmt:{tone:sent>68?'Cautiously Bullish':sent>55?'Measured / Neutral':'Defensive',score:sent,
   quote:sent>65?'We remain confident in the demand environment and our ability to expand margins through the coming year.':'We are navigating a complex operating environment while maintaining focus on efficiency and disciplined execution.',
   who:`Management — ${isIN?'Q1 FY2026':'Q2 2026'} Earnings Call`,
   track:qs.map((q,i)=>{const hit=r()>0.42;return{q,g:`${(gr-2+i*0.5).toFixed(0)}–${(gr+2+i*0.5).toFixed(0)}%`,a:`${(gr-1+i*0.6+(hit?1:-1.5)).toFixed(1)}%`,hit:hit?1:0};}),
   trackV:`Guidance delivery has been ${conf>86?'consistent, supporting full weight on forward commentary':'mixed, with periodic misses that justify a discount to stated guidance'}. Operational targets have been more reliable than strategic or margin targets.`,
   qa:[{q:'Margin trajectory beyond the current year',dodge:1,n:'Asked by multiple analysts. Management declined to quantify, referring only to available levers.'},
    {q:'Competitive pricing response',dodge:1,n:'Deflected to a general statement on value differentiation without addressing pricing directly.'},
    {q:'Capital allocation priorities',dodge:0,n:'Answered directly with a stated order of priority for the coming year.'}],
   contra:`Management characterised the demand environment as ${sent>65?'strengthening':'stable'}, yet the disclosed ${gr<10?'revenue deceleration over three consecutive quarters':'order book and pipeline data'} does not fully support that characterisation. The agent flags a gap between narrative and disclosed figures.`},
  news:[
   {d:'19 Aug 2026',tag:'POLICY',t:isIN?`Budget 2026 revises allocation affecting ${c.sec}`:`Federal policy review affects ${c.sec}`,
    chain:`Policy change announced → ${c.sec} demand outlook revised → ${c.t} captures share proportional to market position → effect materialises with a 12–18 month lag`,
    est:'',imp:'+1 to 4% revenue over 18 months',cf:'MEDIUM'},
   {d:'12 Aug 2026',tag:'SECTOR',t:`${c.sec} sector faces pricing pressure as peers compete for share`,
    chain:`Peers cut pricing → realisation pressure across the sector → ${c.t} must match or cede share → margin compression follows`,
    imp:'−40 to −80bps margin',cf:'HIGH'},
   {d:'04 Aug 2026',tag:'COMPANY',t:`${c.n} announces capacity and capability expansion`,
    chain:`Expansion announced → capex rises near term → revenue contribution not yet disclosed → optionality without near-term visibility`,
    imp:'Not quantifiable — agent flagged as a disclosure gap',cf:'LOW'}],
  events:[
   {d:4,type:'file',lbl:`${c.reg} Filing — ${isIN?'Q1 FY26 Results':'Q2 2026 10-Q'}`,dsc:'Quarterly results filed. Revenue broadly in line; margin ahead of consensus.',imp:+(1+r()*2.5).toFixed(1),src:`${c.reg} Filing, 04 Aug 2026`},
   {d:11,type:'anom',lbl:'Anomaly: Other Income Divergence',dsc:'Other income growth materially outpaced the underlying asset base. Agent flagged for verification.',imp:-(0.5+r()*1.5).toFixed(1),src:'Q1 Financials, Other Income Note'},
   {d:16,type:'macro',lbl:isIN?'RBI Policy Decision':'Fed Policy Decision',dsc:'Rate decision moved currency and sector sentiment. Broad sector impact rather than company-specific.',imp:-(0.3+r()*1.2).toFixed(1),src:isIN?'RBI Policy Statement':'FOMC Statement'},
   {d:22,type:'contra',lbl:'Contradiction Detected',dsc:'Management demand commentary not fully supported by disclosed order book and revenue trend.',imp:-(1+r()*2.5).toFixed(1),src:'Earnings Call Transcript'},
   {d:26,type:'call',lbl:'Earnings Call',dsc:'Management deflected margin trajectory questions from multiple analysts. Logged as credibility signal.',imp:+((r()-0.5)*2).toFixed(1),src:'Call Transcript'}],
  sens:[{e:'Earnings release',v:+(3.5+r()*2.5).toFixed(1)},{e:'Guidance revision',v:+(4.5+r()*2.5).toFixed(1)},
   {e:isIN?'Policy / regulatory news':'Regulatory news',v:+(2.5+r()*1.8).toFixed(1)},{e:'Macro shock (rates/forex)',v:+(1.8+r()*1.5).toFixed(1)}],
  sensV:`This stock responds most strongly to guidance revisions rather than headline earnings, indicating the market is pricing forward expectations rather than reported delivery.`,
  read:`Price has traded in a range over the last month on ${r()>0.5?'above-average':'declining'} volume. Peers in ${c.sec} have moved broadly in line, suggesting sector rather than company-specific drivers. Two agent flags from this window remain unresolved.`,
  src:[{n:`${c.n} ${F}`,ty:`${c.reg} Filing`,u:10+Math.round(r()*4)},
   {n:`${Q}`,ty:`${c.reg} Filing`,u:6+Math.round(r()*4)},
   {n:'Latest Earnings Call Transcript',ty:'Transcript',u:7+Math.round(r()*3)},
   {n:'Investor Presentation',ty:'Company',u:4+Math.round(r()*2)},
   {n:isIN?'Union Budget 2026 — Finance Bill':'Federal Policy Documents',ty:'Government',u:2+Math.round(r()*2)},
   {n:`Peer filings — ${c.peers.slice(0,3).join(', ')}`,ty:`${c.reg} Filing`,u:4+Math.round(r()*2)},
   {n:isIN?'News corpus — ET, Mint, Business Standard':'News corpus — Bloomberg, Reuters, WSJ',ty:'News',u:7+Math.round(r()*3)}]};
}

function getData(c){return c.deep?DEEP[c.id]:genLight(c);}

/* ════════════════ ATOMS ════════════════ */
const BM={HIGH:['var(--roS)','var(--ro)'],MEDIUM:['var(--amS)','var(--am)'],LOW:['var(--emS)','var(--em)'],
 AUTO:['var(--viS)','var(--vi)'],SEBI:['var(--viS)','var(--vi)'],SEC:['var(--goS)','var(--go)'],
 BUY:['var(--emS)','var(--em)'],ACCUMULATE:['var(--emS)','var(--em)'],HOLD:['var(--amS)','var(--am)'],
 REDUCE:['var(--roS)','var(--ro)'],POLICY:['var(--cyS)','var(--cy)'],SECTOR:['var(--viS)','var(--vi)'],
 COMPANY:['var(--goS)','var(--go)'],REGULATORY:['var(--roS)','var(--ro)'],DEFAULT:['var(--viS)','var(--vi)']};
function B({t,children,sm}){const[bg,c]=BM[t]||BM.DEFAULT;
 return <span style={{background:bg,color:c,border:`1px solid ${c}44`,borderRadius:4,
  fontSize:sm?8:9,fontWeight:700,padding:sm?'2px 6px':'3px 9px',letterSpacing:'0.1em',
  fontFamily:'var(--fm)',whiteSpace:'nowrap',display:'inline-block'}}>{children}</span>;}
function M({children,s={}}){return <span style={{fontFamily:'var(--fm)',...s}}>{children}</span>;}
function Sec({id,t,auto,sub,children}){
 return <section id={id} style={{marginBottom:34,animation:'fin .4s ease'}}>
  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
   <h2 style={{fontFamily:'var(--fd)',fontSize:15,fontWeight:700,color:'var(--t1)',letterSpacing:'-0.01em'}}>{t}</h2>
   {auto&&<B t="AUTO">AGENT</B>}
  </div>
  {sub&&<p style={{fontSize:11,color:'var(--t3)',marginBottom:16,lineHeight:1.6,maxWidth:640}}>{sub}</p>}
  {!sub&&<div style={{height:14}}/>}
  {children}
 </section>;}
function Box({children,accent,style={}}){
 return <div style={{background:'var(--p1)',border:'1px solid var(--b1)',borderRadius:12,padding:22,
  borderLeft:accent?`3px solid ${accent}`:'1px solid var(--b1)',...style}}>{children}</div>;}
function Prog({v,max,c,h}){
 return <div style={{height:h||4,background:'var(--b1)',borderRadius:3,overflow:'hidden'}}>
  <div style={{height:'100%',width:`${Math.min(100,(v/max)*100)}%`,background:c||'var(--vi)',
   borderRadius:3,transition:'width .6s ease'}}/></div>;}
function Chain({items,color}){
 return <div style={{display:'flex',flexDirection:'column',gap:0}}>
  {items.map((s,i)=><div key={i} style={{display:'flex',gap:11,alignItems:'flex-start'}}>
   <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}>
    <div style={{width:7,height:7,borderRadius:'50%',background:color||'var(--vi)',marginTop:5}}/>
    {i<items.length-1&&<div style={{width:1,flex:1,minHeight:22,background:'var(--b2)'}}/>}
   </div>
   <p style={{fontSize:11,color:i===items.length-1?'var(--t1)':'var(--t2)',lineHeight:1.55,
    paddingBottom:i<items.length-1?12:0,fontWeight:i===items.length-1?500:400}}>{s}</p>
  </div>)}
 </div>;}

/* ════════════════ LANDING ════════════════ */
function Landing({onGo}){
 const[q,setQ]=useState(''),[m,setM]=useState([]),[hi,setHi]=useState(0),[op,setOp]=useState(false),[fc,setFc]=useState(false);
 const iR=useRef(null);
 useEffect(()=>{if(!q.trim()){setM([]);setOp(false);return;}
  try{const rx=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
   const f=COS.filter(c=>rx.test(c.n)||rx.test(c.t)||rx.test(c.sec));
   f.sort((a,b)=>b.deep-a.deep);setM(f);setOp(f.length>0);setHi(0);}catch{setM([]);setOp(false);}},[q]);
 function key(e){if(!op)return;
  if(e.key==='ArrowDown'){e.preventDefault();setHi(h=>Math.min(h+1,m.length-1));}
  else if(e.key==='ArrowUp'){e.preventDefault();setHi(h=>Math.max(h-1,0));}
  else if(e.key==='Enter'){e.preventDefault();if(m[hi])onGo(m[hi]);}
  else if(e.key==='Escape')setOp(false);}
 function hl(txt){if(!q)return txt;
  try{const rx=new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi');
   return txt.split(rx).map((p,i)=>rx.test(p)?<mark key={i} style={{background:'rgba(99,102,241,.28)',color:'var(--vi)',borderRadius:2,padding:'0 1px'}}>{p}</mark>:p);}
  catch{return txt;}}
 const sb=m.filter(c=>c.reg==='SEBI'),sc=m.filter(c=>c.reg==='SEC');
 const Row=({c})=>{const i=m.indexOf(c),a=hi===i,cl=c.reg==='SEBI'?'var(--vi)':'var(--go)';
  return <div onMouseDown={()=>onGo(c)} onMouseEnter={()=>setHi(i)}
   style={{padding:'10px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:12,
    background:a?(c.reg==='SEBI'?'var(--viS)':'var(--goS)'):'transparent',
    borderLeft:`3px solid ${a?cl:'transparent'}`,transition:'all .1s'}}>
   <div style={{width:30,height:30,borderRadius:7,background:`${cl}1F`,border:`1px solid ${cl}44`,
    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
    <M s={{fontSize:10,fontWeight:600,color:cl}}>{c.lg}</M></div>
   <div style={{flex:1,minWidth:0}}>
    <p style={{fontSize:12.5,fontWeight:500,color:'var(--t1)',marginBottom:2}}>{hl(c.n)}</p>
    <M s={{fontSize:9.5,color:'var(--t3)'}}>{hl(c.sec)} · {c.idx}</M></div>
   {c.deep===1&&<B t="AUTO" sm>FULL DATA</B>}
   <B t={c.reg} sm>{hl(c.t)}</B></div>;};
 return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',
  justifyContent:'center',padding:'40px 20px',position:'relative',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
   <div style={{position:'absolute',top:'8%',left:'12%',width:460,height:460,
    background:'radial-gradient(circle,rgba(99,102,241,.13) 0%,transparent 66%)',animation:'mesh 5s ease-in-out infinite'}}/>
   <div style={{position:'absolute',bottom:'10%',right:'10%',width:400,height:400,
    background:'radial-gradient(circle,rgba(245,158,11,.09) 0%,transparent 66%)',animation:'mesh 6.5s ease-in-out infinite 1s'}}/>
   <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(99,102,241,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.035) 1px,transparent 1px)',backgroundSize:'58px 58px'}}/></div>
  <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:12,animation:'up .6s ease'}}>
   <div style={{width:46,height:46,borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',
    fontFamily:'var(--fd)',fontSize:23,fontWeight:800,color:'#fff',
    background:'linear-gradient(135deg,#6366F1,#4338CA)',boxShadow:'0 0 36px rgba(99,102,241,.42)'}}>Q</div>
   <span style={{fontFamily:'var(--fd)',fontSize:24,fontWeight:800,letterSpacing:'.1em'}}>QUANTSIGHT</span></div>
  <p style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--t3)',letterSpacing:'.22em',
   textTransform:'uppercase',marginBottom:10,animation:'up .6s .08s ease both'}}>The Research Terminal for Equity Analysts</p>
  <p style={{fontSize:13,color:'var(--t2)',marginBottom:44,maxWidth:460,textAlign:'center',
   lineHeight:1.65,animation:'up .6s .12s ease both'}}>
   An autonomous agent that reads filings, cross-checks management claims against reported numbers, maps macro transmission, and tells you what it still doesn't know.</p>
  <div style={{width:'100%',maxWidth:600,position:'relative',animation:'up .6s .2s ease both'}}>
   <div style={{border:`1px solid ${fc?'var(--vi)':'var(--b1)'}`,borderRadius:13,background:'var(--p1)',
    boxShadow:fc?'0 0 0 3px rgba(99,102,241,.12),0 12px 40px rgba(0,0,0,.35)':'none',
    transition:'all .22s',display:'flex',alignItems:'center',padding:'4px 4px 4px 18px',gap:11}}>
    <M s={{color:'var(--vi)',fontSize:13,flexShrink:0}}>⌕</M>
    <input ref={iR} value={q} onChange={e=>setQ(e.target.value)} onKeyDown={key}
     onFocus={()=>{setFc(true);if(m.length)setOp(true);}} onBlur={()=>setFc(false)}
     placeholder="Search by company, ticker or sector…"
     style={{flex:1,background:'transparent',border:'none',outline:'none',color:'var(--t1)',
      fontSize:14.5,fontFamily:'var(--fb)',padding:'14px 0'}}/>
    <button onClick={()=>m[hi]&&onGo(m[hi])} disabled={!m.length}
     style={{background:m.length?'linear-gradient(135deg,#6366F1,#4338CA)':'var(--p3)',border:'none',
      borderRadius:9,color:m.length?'#fff':'var(--t3)',fontSize:12,fontWeight:700,padding:'11px 22px',
      cursor:m.length?'pointer':'not-allowed',letterSpacing:'.06em',fontFamily:'var(--fd)',flexShrink:0}}>ANALYSE</button></div>
   {op&&<div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,background:'var(--p2)',
    border:'1px solid var(--b1)',borderRadius:13,zIndex:100,overflow:'hidden',
    boxShadow:'0 24px 48px rgba(0,0,0,.55)',maxHeight:360,overflowY:'auto'}}>
    {sb.length>0&&<><div style={{padding:'11px 16px 6px',display:'flex',alignItems:'center',gap:9}}>
     <M s={{fontSize:9,color:'var(--vi)',letterSpacing:'.18em',fontWeight:600}}>🇮🇳 SEBI LISTED</M>
     <div style={{flex:1,height:1,background:'var(--b1)'}}/>
     <M s={{fontSize:9,color:'var(--t3)'}}>{sb.length}</M></div>
     {sb.map(c=><Row key={c.id} c={c}/>)}</>}
    {sc.length>0&&<><div style={{padding:'11px 16px 6px',display:'flex',alignItems:'center',gap:9}}>
     <M s={{fontSize:9,color:'var(--go)',letterSpacing:'.18em',fontWeight:600}}>🇺🇸 SEC LISTED</M>
     <div style={{flex:1,height:1,background:'var(--b1)'}}/>
     <M s={{fontSize:9,color:'var(--t3)'}}>{sc.length}</M></div>
     {sc.map(c=><Row key={c.id} c={c}/>)}</>}</div>}</div>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginTop:18,
   maxWidth:600,animation:'up .6s .28s ease both'}}>
   <M s={{color:'var(--t3)',fontSize:11,display:'flex',alignItems:'center',marginRight:3}}>Full coverage:</M>
   {COS.filter(c=>c.deep).map(c=><button key={c.id} onClick={()=>onGo(c)}
    style={{background:'transparent',border:`1px solid ${c.reg==='SEBI'?'rgba(99,102,241,.3)':'rgba(245,158,11,.3)'}`,
     borderRadius:7,color:c.reg==='SEBI'?'var(--vi)':'var(--go)',fontSize:11,padding:'5px 12px',
     cursor:'pointer',fontFamily:'var(--fb)',transition:'all .15s'}}
    onMouseEnter={e=>e.currentTarget.style.background=c.reg==='SEBI'?'var(--viS)':'var(--goS)'}
    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>{c.t}</button>)}</div>
  <div style={{marginTop:42,display:'flex',gap:26,flexWrap:'wrap',justifyContent:'center',
   animation:'up .6s .36s ease both'}}>
   {['Contradiction detection','Macro transmission chains','Guidance track record','Q&A deflection analysis','Governance signals'].map(f=>
    <div key={f} style={{display:'flex',alignItems:'center',gap:6,color:'var(--t3)',fontSize:11,fontFamily:'var(--fm)'}}>
     <span style={{color:'var(--vi)'}}>✓</span>{f}</div>)}</div>
 </div>;}

/* ════════════════ RESEARCHING ════════════════ */
function Research({c,onDone}){
 const isIN=c.reg==='SEBI',rc=isIN?'var(--vi)':'var(--go)';
 const STEPS=[
  {i:'⟳',l:'Initialising research query',d:`${c.t} · ${c.ex} · ${c.sec}`,ms:600},
  {i:'↓',l:`Fetching ${c.reg} filings`,d:isIN?'Annual Report · Quarterly Results · BSE/NSE Disclosures':'10-K · 10-Q · 8-K · DEF 14A via EDGAR',ms:1300},
  {i:'◈',l:'Extracting financial statements',d:'Segment data · Notes to accounts · Cash flow',ms:1100},
  {i:'♪',l:'Processing earnings call transcript',d:'Prepared remarks + analyst Q&A section',ms:1400},
  {i:'⚡',l:'Cross-checking guidance vs actuals',d:'5-quarter guidance track record analysis',ms:1600},
  {i:'⊞',l:'Building peer comparison set',d:c.peers.slice(0,4).join(' · '),ms:900},
  {i:'▲',l:'Mapping macro transmission chains',d:isIN?'USD/INR · Crude · RBI policy · Budget 2026':'DXY · Fed policy · Export controls · Commodities',ms:1300},
  {i:'⬡',l:'Scanning governance signals',d:'Auditor · Board · RPT · Pledge · Filing timeliness',ms:900},
  {i:'✦',l:'Synthesising research brief',d:'Verdict · Bull/Bear · Falsifiability conditions',ms:1000}];
 const LN=[[0,`> INIT  target='${c.n}' ticker=${c.t} exchange=${c.ex} regulator=${c.reg}`],
  [400,`> AUTH  ${isIN?'BSE/NSE corporate filings API':'SEC EDGAR full-text search'}`],
  [850,`> FETCH ${isIN?'annual_report_fy2025.pdf':'10k_fy2025.htm'}  [${(18+Math.random()*50).toFixed(1)} MB]`],
  [1350,`> PARSE balance_sheet · income_statement · cash_flow · notes`],
  [1850,`> CHUNK ${(1200+Math.floor(Math.random()*1400))} segments → embedding pipeline`],
  [2350,`> FETCH earnings_call_transcript_latest.txt`],
  [2800,`> SPLIT prepared_remarks | analyst_qa  [Q&A: ${8+Math.floor(Math.random()*12)} exchanges]`],
  [3300,`> EXTRACT guidance_statements  [${3+Math.floor(Math.random()*5)} quantified commitments]`],
  [3800,`> COMPARE guidance_t-5..t-1 vs reported_actuals`],
  [4300,`> FLAG  guidance credibility signal computed`],
  [4800,`> PEER  auto-resolve → ${c.peers.slice(0,4).join(', ')}`],
  [5300,`> FETCH peer_financials  [${c.peers.length} entities, ${c.reg}]`],
  [5800,`> MACRO ${isIN?'usd_inr · brent · repo_rate · budget_2026':'dxy · fed_funds · export_controls · commodities'}`],
  [6300,`> CORR  rolling 90-day correlation matrix computed`],
  [6800,`> CHAIN transmission path modelling  [4 factors]`],
  [7300,`> SCAN  auditor_history · board_composition · rpt_disclosure · pledge`],
  [7800,`> DETECT anomaly scan across 3 fiscal years`],
  [8300,`> CONTRA cross-referencing narrative vs disclosed figures`],
  [8800,`> SYNTH verdict · bull_case · bear_case · falsifiability`],
  [9300,`> SCORE confidence · gap detection · citation mapping`],
  [9800,`> DONE  research brief compiled ✓`]];
 const[act,setAct]=useState(0),[dn,setDn]=useState([]),[ln,setLn]=useState([]);
 const sR=useRef(null);
 useEffect(()=>{const ts=[];let cum=0;
  STEPS.forEach((s,i)=>{ts.push(setTimeout(()=>setAct(i),cum));cum+=s.ms;const dd=cum;
   ts.push(setTimeout(()=>{setDn(p=>[...p,i]);if(i===STEPS.length-1)ts.push(setTimeout(onDone,650));},dd));});
  LN.forEach(([d,t])=>ts.push(setTimeout(()=>setLn(p=>[...p,t]),d)));
  return()=>ts.forEach(clearTimeout);},[]);
 useEffect(()=>{if(sR.current)sR.current.scrollTop=sR.current.scrollHeight;},[ln]);
 const pct=Math.round(dn.length/STEPS.length*100);
 return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'30px 34px',
  maxWidth:1120,margin:'0 auto',width:'100%'}}>
  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:30}}>
   <div style={{width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,#6366F1,#4338CA)',
    display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fd)',
    fontSize:14,fontWeight:800,color:'#fff'}}>Q</div>
   <span style={{fontFamily:'var(--fd)',fontSize:14,fontWeight:700,letterSpacing:'.1em',color:'var(--t2)'}}>QUANTSIGHT</span>
   <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
    <div style={{width:7,height:7,borderRadius:'50%',background:rc,animation:'pl 1.2s infinite'}}/>
    <M s={{fontSize:11,color:rc,letterSpacing:'.08em'}}>AGENT ACTIVE · {c.reg}</M></div></div>
  <div style={{marginBottom:24}}>
   <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:7}}>
    <M s={{fontSize:9.5,color:'var(--t3)',letterSpacing:'.18em'}}>RESEARCH TARGET</M>
    <B t={c.reg}>{c.reg} · {c.ex}</B><B t="AUTO">{c.idx}</B></div>
   <h1 style={{fontFamily:'var(--fd)',fontSize:27,fontWeight:800,color:'var(--t1)'}}>{c.n}</h1></div>
  <div style={{marginBottom:26}}>
   <Prog v={pct} max={100} c={`linear-gradient(90deg,${rc},${rc}66)`} h={2}/>
   <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
    <M s={{fontSize:10,color:'var(--t3)'}}>{dn.length}/{STEPS.length} tasks complete</M>
    <M s={{fontSize:10,color:rc}}>{pct}%</M></div></div>
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,flex:1,minHeight:0}}>
   <div style={{background:'var(--p1)',border:'1px solid var(--b1)',borderLeft:`3px solid ${rc}`,
    borderRadius:12,padding:22,overflowY:'auto'}}>
    <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.2em',display:'block',marginBottom:20}}>AGENT PIPELINE</M>
    {STEPS.map((s,i)=>{const D=dn.includes(i),A=act===i&&!D,P=i>act;
     return <div key={i} style={{display:'flex',gap:13,position:'relative'}}>
      {i<STEPS.length-1&&<div style={{position:'absolute',left:12.5,top:28,width:2,height:'calc(100% - 4px)',
       background:D?rc:'var(--b1)',transition:'background .4s'}}/>}
      <div style={{width:27,height:27,borderRadius:'50%',flexShrink:0,zIndex:1,display:'flex',
       alignItems:'center',justifyContent:'center',fontSize:10.5,
       border:`2px solid ${D||A?rc:'var(--b1)'}`,background:D?`${rc}26`:A?`${rc}12`:'transparent',
       color:D||A?rc:'var(--b2)',animation:A?'pl 1.2s infinite':'none',transition:'all .3s'}}>{D?'✓':s.i}</div>
      <div style={{paddingBottom:16,flex:1,opacity:P?.22:1,transition:'opacity .4s',minWidth:0}}>
       <p style={{fontSize:11.5,fontWeight:500,marginBottom:2,color:A?'var(--t1)':D?'var(--t2)':'var(--t3)'}}>{s.l}</p>
       {(A||D)&&<M s={{fontSize:9.5,color:'var(--t3)',display:'block',lineHeight:1.5}}>{s.d}</M>}</div></div>;})}</div>
   <div style={{background:'#04050F',border:'1px solid var(--b1)',borderRadius:12,padding:22,
    display:'flex',flexDirection:'column',minHeight:0}}>
    <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.2em',display:'block',marginBottom:16}}>LIVE DATA STREAM</M>
    <div ref={sR} style={{flex:1,overflowY:'auto',fontFamily:'var(--fm)',fontSize:9.5,lineHeight:2}}>
     {ln.map((l,i)=><div key={i} style={{animation:'fin .2s ease',
      color:l.includes('DONE')?'var(--em)':
       l.includes('FLAG')||l.includes('CONTRA')||l.includes('DETECT')?'var(--am)':
       l.includes('MACRO')||l.includes('PEER')||l.includes('CHAIN')||l.includes('CORR')?'var(--cy)':
       l.includes('SCAN')||l.includes('SCORE')?'var(--vi)':'var(--t3)'}}>{l}</div>)}
     {dn.length<STEPS.length&&<span style={{display:'inline-block',width:7,height:12,background:rc,
      animation:'bl .85s step-end infinite',verticalAlign:'middle',marginLeft:2}}/>}</div></div></div>
  <button onClick={onDone} style={{marginTop:18,background:'transparent',border:'1px solid var(--b1)',
   borderRadius:8,color:'var(--t3)',fontSize:11,padding:'9px 20px',cursor:'pointer',
   fontFamily:'var(--fm)',alignSelf:'center'}}>Skip to brief →</button></div>;}

/* ════════════════ HEADER ════════════════ */
function Header({c,d,tab,setTab,onBack}){
 const rc=c.reg==='SEBI'?'var(--vi)':'var(--go)',up=d.chg>=0;
 return <div style={{position:'sticky',top:0,zIndex:300,background:'rgba(7,9,28,.96)',
  backdropFilter:'blur(16px)',borderBottom:'1px solid var(--b1)'}}>
  <div style={{padding:'13px 26px 0',display:'flex',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
   <button onClick={onBack} style={{background:'transparent',border:'none',color:'var(--t3)',
    cursor:'pointer',fontSize:17,padding:'6px 4px 0 0'}}>←</button>
   <div style={{width:44,height:44,borderRadius:11,background:`${rc}1C`,border:`1px solid ${rc}55`,
    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
    <M s={{fontSize:15,fontWeight:600,color:rc}}>{c.lg}</M></div>
   <div style={{minWidth:180}}>
    <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:3}}>
     <h1 style={{fontFamily:'var(--fd)',fontSize:17,fontWeight:800,color:'var(--t1)'}}>{c.n}</h1>
     <B t={c.reg} sm>{c.reg}</B></div>
    <M s={{fontSize:10,color:'var(--t3)'}}>{c.t} · {c.ex} · {c.sec}</M></div>
   <div style={{display:'flex',gap:22,marginLeft:8,flexWrap:'wrap'}}>
    {[{l:'PRICE',v:`${d.cur}${d.price.toLocaleString()}`,c:'var(--t1)',sz:18},
      {l:'CHANGE',v:`${up?'+':''}${d.chg}%`,c:up?'var(--em)':'var(--ro)',sz:14},
      {l:'MKT CAP',v:d.cap,c:'var(--t1)',sz:14},
      {l:`${c.idx} WT`,v:c.w,c:'var(--t2)',sz:14},
      {l:'FREE FLOAT',v:d.ff,c:'var(--t2)',sz:14}].map(x=>
     <div key={x.l}><M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:3}}>{x.l}</M>
      <M s={{fontSize:x.sz,fontWeight:600,color:x.c}}>{x.v}</M></div>)}</div>
   <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
    <div style={{background:'var(--viS)',border:'1px solid var(--vi)',borderRadius:9,padding:'7px 15px',textAlign:'center'}}>
     <M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:2}}>AGENT CONFIDENCE</M>
     <M s={{fontSize:19,fontWeight:700,color:'var(--vi)'}}>{d.conf}%</M></div></div></div>
  <div style={{padding:'7px 26px 0',display:'flex',gap:20,flexWrap:'wrap',borderTop:'1px solid transparent'}}>
   {[{l:'Listed',v:c.yr},{l:'Promoter',v:d.promoter},{l:'FII',v:d.fii},{l:'DII',v:d.dii},
     {l:'Pledged',v:d.pledge},{l:'52W',v:`${d.cur}${d.lo} – ${d.cur}${d.hi}`},{l:'Last filing',v:d.lastFile}].map(x=>
    <M key={x.l} s={{fontSize:9.5,color:'var(--t3)'}}>{x.l} <span style={{color:'var(--t2)',fontWeight:500}}>{x.v}</span></M>)}</div>
  <div style={{padding:'10px 26px 0',display:'flex',gap:2}}>
   {[{id:'research',l:'Research Brief'},{id:'market',l:'Live Market'},{id:'agent',l:'Agent Workspace'}].map(t=>
    <button key={t.id} onClick={()=>setTab(t.id)} style={{background:'transparent',border:'none',
     borderBottom:`2px solid ${tab===t.id?'var(--vi)':'transparent'}`,
     color:tab===t.id?'var(--t1)':'var(--t3)',fontSize:12.5,fontWeight:tab===t.id?600:400,
     padding:'9px 16px',cursor:'pointer',fontFamily:'var(--fd)',transition:'all .18s',
     letterSpacing:'.01em'}}>{t.l}</button>)}</div></div>;}

/* ════════════════ RESEARCH TAB ════════════════ */
function ResearchTab({c,d}){
 const rc=c.reg==='SEBI'?'var(--vi)':'var(--go)';
 const fyKeys=Object.keys(d.fy);
 const[fy,setFy]=useState(fyKeys[0]);
 const[cmp,setCmp]=useState(false);
 const F=d.fy[fy],F2=d.fy[fyKeys[1]];
 const maxR=Math.max(...d.quarters.map(q=>q.rev));
 const sv={BUY:'var(--em)',ACCUMULATE:'var(--em)',HOLD:'var(--am)',REDUCE:'var(--ro)'}[d.verdict.stance];
 const N=n=>typeof n==='number'?n.toLocaleString():n;
 const delta=(a,b)=>{if(!b||!a)return null;const p=((a-b)/Math.abs(b)*100);return p;};
 return <div style={{maxWidth:900,padding:'26px 26px 80px'}}>

 {/* 1 VERDICT */}
 <div style={{background:`linear-gradient(135deg,${sv}12,transparent 65%)`,border:`1px solid ${sv}44`,
  borderLeft:`4px solid ${sv}`,borderRadius:14,padding:26,marginBottom:32,animation:'up .5s ease'}}>
  <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:14,flexWrap:'wrap'}}>
   <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.2em'}}>AGENT VERDICT</M>
   <span style={{background:`${sv}22`,color:sv,border:`1px solid ${sv}66`,borderRadius:6,
    fontFamily:'var(--fd)',fontSize:15,fontWeight:800,padding:'4px 14px',letterSpacing:'.06em'}}>{d.verdict.stance}</span>
   <M s={{fontSize:9.5,color:'var(--t3)'}}>CONVICTION</M>
   <B t={d.verdict.conv==='HIGH'?'LOW':d.verdict.conv==='LOW'?'HIGH':'MEDIUM'}>{d.verdict.conv}</B>
   <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:7}}>
    <M s={{fontSize:9.5,color:'var(--t3)'}}>CONFIDENCE</M>
    <div style={{width:70}}><Prog v={d.conf} max={100} c={sv} h={5}/></div>
    <M s={{fontSize:11,fontWeight:600,color:sv}}>{d.conf}%</M></div></div>
  <h2 style={{fontFamily:'var(--fd)',fontSize:20,fontWeight:700,color:'var(--t1)',
   lineHeight:1.38,marginBottom:13,letterSpacing:'-0.01em'}}>{d.verdict.head}</h2>
  <p style={{fontSize:13,color:'var(--t2)',lineHeight:1.78}}>{d.verdict.body}</p>
  <div style={{display:'flex',gap:16,marginTop:18,paddingTop:15,borderTop:'1px solid var(--b1)',flexWrap:'wrap'}}>
   {[{l:'Sources analysed',v:d.src.length},{l:'Citations',v:d.src.reduce((a,s)=>a+s.u,0)},
     {l:'Risk signals',v:d.risks.length},{l:'Anomalies flagged',v:d.anomalies.length},
     {l:'Open questions',v:d.mgmt.qa.filter(q=>q.dodge).length}].map(x=>
    <div key={x.l}><M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.11em',display:'block'}}>{x.l.toUpperCase()}</M>
     <M s={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>{x.v}</M></div>)}</div></div>

 {/* 2 BULL / BEAR */}
 <Sec id="s-thesis" t="Bull Case · Bear Case · Falsifiability" auto
  sub="Every point is cited to a primary source. The third column states what evidence would invalidate the agent's current view — the falsifiability condition.">
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
   {[{t:'BULL CASE',items:d.bull,c:'var(--em)',ic:'▲'},{t:'BEAR CASE',items:d.bear,c:'var(--ro)',ic:'▼'}].map(col=>
    <div key={col.t} style={{background:'var(--p1)',border:`1px solid ${col.c}33`,borderRadius:12,padding:19}}>
     <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:15}}>
      <span style={{color:col.c,fontSize:12}}>{col.ic}</span>
      <M s={{fontSize:10,fontWeight:700,color:col.c,letterSpacing:'.14em'}}>{col.t}</M></div>
     {col.items.map((x,i)=><div key={i} style={{marginBottom:i<col.items.length-1?15:0,
      paddingBottom:i<col.items.length-1?15:0,borderBottom:i<col.items.length-1?'1px solid var(--b1)':'none'}}>
      <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.65,marginBottom:6}}>{x.p}</p>
      <M s={{fontSize:8.5,color:'var(--t3)'}}>↳ {x.s}</M></div>)}</div>)}</div>
  <Box accent="var(--cy)">
   <M s={{fontSize:9.5,color:'var(--cy)',letterSpacing:'.14em',display:'block',marginBottom:12,fontWeight:600}}>
    WHAT WOULD CHANGE THIS VIEW</M>
   {d.change.map((x,i)=><div key={i} style={{display:'flex',gap:11,alignItems:'flex-start',
    padding:'9px 0',borderBottom:i<d.change.length-1?'1px solid var(--b1)':'none'}}>
    <M s={{fontSize:10,color:'var(--cy)',flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,'0')}</M>
    <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.65}}>{x}</p></div>)}</Box></Sec>

 {/* 3 FINANCIALS */}
 <Sec id="s-fin" t="Financial Summary"
  sub="Agent annotations flag line items where the reported figure requires interpretation before use.">
  <div style={{display:'flex',gap:9,marginBottom:16,alignItems:'center',flexWrap:'wrap'}}>
   <M s={{fontSize:9.5,color:'var(--t3)',letterSpacing:'.12em'}}>FISCAL YEAR</M>
   {fyKeys.map(k=><button key={k} onClick={()=>setFy(k)} style={{background:fy===k?'var(--viS)':'transparent',
    border:`1px solid ${fy===k?'var(--vi)':'var(--b1)'}`,borderRadius:7,color:fy===k?'var(--vi)':'var(--t3)',
    fontSize:11,fontWeight:fy===k?600:400,padding:'5px 13px',cursor:'pointer',fontFamily:'var(--fm)'}}>{k}</button>)}
   <button onClick={()=>setCmp(!cmp)} style={{marginLeft:6,background:cmp?'var(--cyS)':'transparent',
    border:`1px solid ${cmp?'var(--cy)':'var(--b1)'}`,borderRadius:7,color:cmp?'var(--cy)':'var(--t3)',
    fontSize:11,padding:'5px 13px',cursor:'pointer',fontFamily:'var(--fb)'}}>
    {cmp?'✓ ':''}Compare vs {fyKeys[1]}</button></div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
   {[{l:'Revenue',k:'rev',p:d.cur},{l:'EBITDA',k:'ebitda',p:d.cur},{l:'Net Profit',k:'pat',p:d.cur},
     {l:'Net Margin',k:'mgn',s:'%'},{l:'EPS',k:'eps',p:d.cur},{l:'ROE',k:'roe',s:'%'},
     {l:'Debt / Equity',k:'de'},{l:'Op Cash Flow',k:'ocf',p:d.cur}].filter(x=>F[x.k]!==0).map(x=>{
    const dl=cmp&&F2?delta(F[x.k],F2[x.k]):null;
    return <div key={x.l} style={{background:'var(--p1)',border:'1px solid var(--b1)',borderRadius:9,padding:'13px 14px'}}>
     <M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.1em',display:'block',marginBottom:6}}>{x.l.toUpperCase()}</M>
     <M s={{fontSize:14,fontWeight:600,color:'var(--t1)'}}>{x.p||''}{N(F[x.k])}{x.s||''}</M>
     {dl!==null&&<M s={{fontSize:9.5,color:dl>=0?'var(--em)':'var(--ro)',display:'block',marginTop:4}}>
      {dl>=0?'▲':'▼'} {Math.abs(dl).toFixed(1)}% vs {fyKeys[1]}</M>}</div>;})}</div>
  {F.notes&&F.notes.length>0&&<div style={{marginBottom:16}}>
   <M s={{fontSize:9.5,color:'var(--am)',letterSpacing:'.13em',display:'block',marginBottom:11,fontWeight:600}}>
    ⚡ AGENT ANNOTATIONS — {F.notes.filter(n=>n.fl).length} FLAGGED</M>
   {F.notes.map((n,i)=><div key={i} style={{background:n.fl?'var(--amF)':'var(--p1)',
    border:`1px solid ${n.fl?'rgba(251,191,36,.22)':'var(--b1)'}`,borderRadius:9,padding:15,marginBottom:9}}>
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:7,flexWrap:'wrap'}}>
     {n.fl&&<span style={{color:'var(--am)',fontSize:12}}>⚡</span>}
     <p style={{fontSize:12,fontWeight:600,color:'var(--t1)'}}>{n.i}</p>
     <M s={{fontSize:11,color:'var(--t2)'}}>{n.v}</M>
     <M s={{fontSize:10,color:n.d.includes('−')||n.d.includes('-')?'var(--ro)':'var(--em)'}}>{n.d}</M></div>
    <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.65}}>{n.note}</p></div>)}</div>}
  <Box>
   <M s={{fontSize:9.5,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:16}}>QUARTERLY TREND</M>
   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
    <div><M s={{fontSize:9,color:'var(--t3)',display:'block',marginBottom:13}}>REVENUE ({d.cur})</M>
     {d.quarters.map(q=><div key={q.q} style={{marginBottom:13}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
       <M s={{fontSize:10.5,color:'var(--t2)'}}>{q.q}</M>
       <div style={{display:'flex',gap:10,alignItems:'baseline'}}>
        <M s={{fontSize:11.5,fontWeight:600,color:'var(--t1)'}}>{d.cur}{N(q.rev)}</M>
        <M s={{fontSize:9.5,color:q.yoy>8?'var(--em)':q.yoy>3?'var(--am)':'var(--ro)'}}>{q.yoy>0?'+':''}{q.yoy}%</M></div></div>
      <Prog v={q.rev} max={maxR} c="var(--vi)" h={3}/></div>)}</div>
    <div><M s={{fontSize:9,color:'var(--t3)',display:'block',marginBottom:13}}>MARGIN (%)</M>
     {d.quarters.map(q=><div key={q.q} style={{marginBottom:13}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
       <M s={{fontSize:10.5,color:'var(--t2)'}}>{q.q}</M>
       <M s={{fontSize:11.5,fontWeight:600,color:'var(--go)'}}>{q.mgn}%</M></div>
      <Prog v={q.mgn} max={60} c="var(--go)" h={3}/></div>)}</div></div></Box></Sec>

 {/* 4 PEERS */}
 <Sec id="s-peers" t="Peer Snapshot" auto
  sub="Peer set resolved autonomously from sector classification and revenue-scale proximity.">
  <Box style={{padding:0,overflow:'hidden'}}>
   <div style={{overflowX:'auto'}}>
    <table style={{width:'100%',borderCollapse:'collapse',fontSize:11.5}}>
     <thead><tr style={{borderBottom:'1px solid var(--b1)',background:'var(--p2)'}}>
      {['Company','Revenue','Net Margin','Growth','P/E','ROE'].map(h=>
       <th key={h} style={{textAlign:'left',padding:'11px 15px',color:'var(--t3)',fontFamily:'var(--fm)',
        fontSize:8.5,letterSpacing:'.13em',fontWeight:500}}>{h.toUpperCase()}</th>)}</tr></thead>
     <tbody>{d.peers.map((p,i)=><tr key={p.n} style={{borderBottom:'1px solid var(--b1)',
      background:p.me?'var(--viF)':'transparent'}}>
      <td style={{padding:'12px 15px',fontFamily:'var(--fm)',fontSize:11.5,
       color:p.me?'var(--vi)':'var(--t1)',fontWeight:p.me?600:400}}>{p.n}{p.me?' ◀':''}</td>
      <td style={{padding:'12px 15px',fontFamily:'var(--fm)',color:'var(--t2)'}}>{p.rev}</td>
      <td style={{padding:'12px 15px',fontFamily:'var(--fm)',color:'var(--go)'}}>{p.mgn}</td>
      <td style={{padding:'12px 15px',fontFamily:'var(--fm)',
       color:parseFloat(p.gr)>10?'var(--em)':parseFloat(p.gr)<3?'var(--ro)':'var(--t2)'}}>{p.gr}</td>
      <td style={{padding:'12px 15px',fontFamily:'var(--fm)',color:'var(--t2)'}}>{p.pe}</td>
      <td style={{padding:'12px 15px',fontFamily:'var(--fm)',color:'var(--t2)'}}>{p.roe}</td></tr>)}</tbody></table></div>
   <div style={{padding:'15px 18px',borderTop:'1px solid var(--b1)',background:'var(--viF)'}}>
    <M s={{fontSize:9,color:'var(--vi)',letterSpacing:'.14em',display:'block',marginBottom:7,fontWeight:600}}>AGENT VERDICT</M>
    <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.68}}>{d.peerV}</p></div></Box>
  <p style={{fontSize:10,color:'var(--t3)',marginTop:10,fontStyle:'italic'}}>
   Full market-share breakdown, five-year metric trends and segment-level comparison available in Agent Workspace →</p></Sec>

 {/* 5 RISKS */}
 <Sec id="s-risk" t="Risk Signals" auto
  sub="Each signal carries an agent confidence score reflecting evidence strength in the underlying source documents.">
  {d.risks.map((r,i)=>{const rcl=r.l==='HIGH'?'var(--ro)':r.l==='MEDIUM'?'var(--am)':'var(--em)';
   return <div key={i} style={{border:`1px solid ${rcl}33`,borderLeft:`3px solid ${rcl}`,borderRadius:10,
    padding:17,marginBottom:10,background:r.l==='HIGH'?'var(--roF)':r.l==='MEDIUM'?'var(--amF)':'var(--emF)'}}>
    <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
     <B t={r.l}>{r.l}</B>
     <p style={{fontSize:12.5,fontWeight:600,color:'var(--t1)'}}>{r.t}</p>
     <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:7}}>
      <M s={{fontSize:8.5,color:'var(--t3)'}}>CONF</M>
      <div style={{width:44}}><Prog v={r.c} max={100} c={rcl} h={3}/></div>
      <M s={{fontSize:10,color:rcl,fontWeight:600}}>{r.c}%</M></div></div>
    <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.68,marginBottom:8}}>{r.d}</p>
    <M s={{fontSize:8.5,color:'var(--t3)'}}>↳ {r.s}</M></div>;})}</Sec>

 {/* 6 ANOMALIES */}
 <Sec id="s-anom" t="Anomaly Detection" auto
  sub="Statistical and logical inconsistencies the agent surfaced without being asked, each with a suggested verification step.">
  {d.anomalies.map((a,i)=><div key={i} style={{background:'var(--amF)',border:'1px solid rgba(251,191,36,.22)',
   borderLeft:'3px solid var(--am)',borderRadius:10,padding:18,marginBottom:11}}>
   <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:9,flexWrap:'wrap'}}>
    <span style={{color:'var(--am)',fontSize:13}}>◈</span><B t={a.sv}>{a.sv}</B>
    <p style={{fontSize:12.5,fontWeight:600,color:'var(--t1)'}}>{a.t}</p>
    <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:7}}>
     <M s={{fontSize:8.5,color:'var(--t3)'}}>CONF</M>
     <M s={{fontSize:10,color:'var(--am)',fontWeight:600}}>{a.c}%</M></div></div>
   <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.68,marginBottom:12}}>{a.d}</p>
   <div style={{background:'var(--p2)',borderRadius:7,padding:'10px 13px',display:'flex',gap:9,alignItems:'flex-start'}}>
    <M s={{fontSize:9,color:'var(--cy)',letterSpacing:'.1em',flexShrink:0,marginTop:1,fontWeight:600}}>VERIFY</M>
    <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.6}}>{a.act}</p></div></div>)}</Sec>

 {/* 7 MACRO */}
 <Sec id="s-macro" t="Macro Transmission" auto
  sub="How each macro factor reaches this company's P&L, step by step. Rolling 90-day correlation shown where a price relationship exists.">
  {d.macro.map((m,i)=>{const mc=m.lvl==='HIGH'?'var(--ro)':m.lvl==='MEDIUM'?'var(--am)':'var(--em)';
   return <div key={i} style={{background:'var(--p1)',border:'1px solid var(--b1)',borderRadius:11,
    padding:19,marginBottom:11}}>
    <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:15,flexWrap:'wrap'}}>
     <span style={{fontSize:17}}>{m.ic}</span>
     <p style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>{m.f}</p>
     <B t={m.lvl}>{m.lvl} IMPACT</B>
     <M s={{fontSize:9.5,color:'var(--t3)'}}>90d corr <span style={{color:m.corr>0?'var(--em)':'var(--ro)',fontWeight:600}}>{m.corr>0?'+':''}{m.corr}</span></M></div>
    <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:22}}>
     <Chain items={m.chain} color={mc}/>
     <div style={{display:'flex',flexDirection:'column',gap:11}}>
      <div style={{background:'var(--p2)',borderRadius:8,padding:'12px 14px'}}>
       <M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.11em',display:'block',marginBottom:5}}>ESTIMATED IMPACT</M>
       <p style={{fontSize:12,fontWeight:600,color:mc,lineHeight:1.45}}>{m.est}</p></div>
      <div style={{background:'var(--p2)',borderRadius:8,padding:'12px 14px'}}>
       <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
        <M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.11em'}}>CONFIDENCE</M><B t={m.cf} sm>{m.cf}</B></div>
       <p style={{fontSize:10,color:'var(--t3)',lineHeight:1.55,fontStyle:'italic'}}>{m.asm}</p></div></div></div></div>;})}</Sec>

 {/* 8 NEWS */}
 <Sec id="s-news" t="News & Policy Transmission" auto
  sub="Recent developments traced through to a quantified company-level impact, not just headlines.">
  {d.news.map((n,i)=><div key={i} style={{background:'var(--p1)',border:'1px solid var(--b1)',
   borderRadius:11,padding:18,marginBottom:11}}>
   <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10,flexWrap:'wrap'}}>
    <B t={n.tag}>{n.tag}</B><M s={{fontSize:9.5,color:'var(--t3)'}}>{n.d}</M>
    <p style={{fontSize:12.5,fontWeight:600,color:'var(--t1)'}}>{n.t}</p></div>
   <div style={{background:'var(--p2)',borderRadius:8,padding:'12px 14px',marginBottom:11}}>
    <M s={{fontSize:8.5,color:'var(--cy)',letterSpacing:'.11em',display:'block',marginBottom:7,fontWeight:600}}>TRANSMISSION CHAIN</M>
    <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.75}}>{n.chain}</p></div>
   <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
    <div><M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.11em',display:'block',marginBottom:3}}>ESTIMATED IMPACT</M>
     <p style={{fontSize:11.5,fontWeight:600,color:'var(--t1)'}}>{n.imp}</p></div>
    <div><M s={{fontSize:8.5,color:'var(--t3)',letterSpacing:'.11em',display:'block',marginBottom:3}}>CONFIDENCE</M>
     <B t={n.cf} sm>{n.cf}</B></div></div></div>)}</Sec>

 {/* 9 OWNERSHIP & GOVERNANCE */}
 <Sec id="s-gov" t="Ownership & Governance" auto
  sub="Leading indicators of governance stress that rarely appear in standard screens.">
  <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:16}}>
   <Box style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
    <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.14em',display:'block',marginBottom:10}}>GOVERNANCE SCORE</M>
    <p style={{fontFamily:'var(--fd)',fontSize:46,fontWeight:800,lineHeight:1,marginBottom:12,
     color:d.gov.score>80?'var(--em)':d.gov.score>65?'var(--am)':'var(--ro)'}}>{d.gov.score}</p>
    <div style={{width:'100%',marginBottom:12}}>
     <Prog v={d.gov.score} max={100} c={d.gov.score>80?'var(--em)':d.gov.score>65?'var(--am)':'var(--ro)'} h={5}/></div>
    <M s={{fontSize:9.5,color:'var(--t3)'}}>{d.gov.items.filter(x=>x.ok).length} of {d.gov.items.length} checks clear</M>
    <div style={{width:'100%',marginTop:16,paddingTop:14,borderTop:'1px solid var(--b1)'}}>
     {[{l:'Promoter',v:d.promoter},{l:'Pledged',v:d.pledge},{l:'FII',v:d.fii},{l:'DII',v:d.dii}].map(x=>
      <div key={x.l} style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
       <M s={{fontSize:10,color:'var(--t3)'}}>{x.l}</M><M s={{fontSize:10,color:'var(--t2)',fontWeight:500}}>{x.v}</M></div>)}</div></Box>
   <div>{d.gov.items.map((g,i)=><div key={i} style={{background:g.ok?'var(--p1)':'var(--amF)',
    border:`1px solid ${g.ok?'var(--b1)':'rgba(251,191,36,.22)'}`,borderRadius:9,padding:14,marginBottom:9,
    display:'flex',gap:12,alignItems:'flex-start'}}>
    <span style={{fontSize:13,flexShrink:0,color:g.ok?'var(--em)':'var(--am)'}}>{g.ok?'✓':'⚠'}</span>
    <div><p style={{fontSize:12,fontWeight:600,color:'var(--t1)',marginBottom:4}}>{g.t}</p>
     <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.6}}>{g.d}</p></div></div>)}</div></div></Sec>

 {/* 10 MANAGEMENT CREDIBILITY */}
 <Sec id="s-mgmt" t="Management Credibility" auto
  sub="Sentiment is only useful if the speaker has a track record. This section scores both.">
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
   <Box><M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:9}}>TONE ASSESSMENT</M>
    <p style={{fontFamily:'var(--fd)',fontSize:19,fontWeight:700,marginBottom:10,
     color:d.mgmt.score>70?'var(--em)':d.mgmt.score>55?'var(--am)':'var(--ro)'}}>{d.mgmt.tone}</p>
    <Prog v={d.mgmt.score} max={100} c={d.mgmt.score>70?'var(--em)':'var(--am)'} h={4}/>
    <M s={{fontSize:10,color:'var(--t3)',display:'block',marginTop:7}}>Sentiment score {d.mgmt.score}/100</M></Box>
   <Box><M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:9}}>GUIDANCE DELIVERY</M>
    <div style={{display:'flex',alignItems:'baseline',gap:7,marginBottom:11}}>
     <p style={{fontFamily:'var(--fd)',fontSize:30,fontWeight:800,
      color:d.mgmt.track.filter(t=>t.hit).length>=4?'var(--em)':d.mgmt.track.filter(t=>t.hit).length>=3?'var(--am)':'var(--ro)'}}>
      {d.mgmt.track.filter(t=>t.hit).length}<span style={{fontSize:17,color:'var(--t3)'}}>/{d.mgmt.track.length}</span></p>
     <M s={{fontSize:10,color:'var(--t3)'}}>quarters met</M></div>
    <div style={{display:'flex',gap:5}}>{d.mgmt.track.map((t,i)=>
     <div key={i} title={`${t.q}: guided ${t.g}, actual ${t.a}`} style={{flex:1,height:26,borderRadius:5,
      background:t.hit?'var(--emS)':'var(--roS)',border:`1px solid ${t.hit?'var(--em)':'var(--ro)'}66`,
      display:'flex',alignItems:'center',justifyContent:'center'}}>
      <M s={{fontSize:11,color:t.hit?'var(--em)':'var(--ro)'}}>{t.hit?'✓':'✕'}</M></div>)}</div></Box></div>
  <Box style={{marginBottom:12}}>
   <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:12}}>GUIDANCE TRACK RECORD</M>
   <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
    <thead><tr style={{borderBottom:'1px solid var(--b1)'}}>
     {['Period','Guided','Actual','Result'].map(h=><th key={h} style={{textAlign:'left',padding:'7px 10px',
      color:'var(--t3)',fontFamily:'var(--fm)',fontSize:8.5,letterSpacing:'.12em',fontWeight:500}}>{h.toUpperCase()}</th>)}</tr></thead>
    <tbody>{d.mgmt.track.map((t,i)=><tr key={i} style={{borderBottom:'1px solid var(--b1)'}}>
     <td style={{padding:'9px 10px',fontFamily:'var(--fm)',color:'var(--t2)'}}>{t.q}</td>
     <td style={{padding:'9px 10px',fontFamily:'var(--fm)',color:'var(--t3)'}}>{t.g}</td>
     <td style={{padding:'9px 10px',fontFamily:'var(--fm)',color:'var(--t1)',fontWeight:500}}>{t.a}</td>
     <td style={{padding:'9px 10px'}}><B t={t.hit?'LOW':'HIGH'} sm>{t.hit?'MET':'MISSED'}</B></td></tr>)}</tbody></table>
   <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.68,marginTop:13,paddingTop:12,borderTop:'1px solid var(--b1)'}}>
    {d.mgmt.trackV}</p></Box>
  <Box style={{marginBottom:12}}>
   <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.13em',display:'block',marginBottom:12}}>EARNINGS CALL Q&A INTELLIGENCE</M>
   {d.mgmt.qa.map((q,i)=><div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'11px 0',
    borderBottom:i<d.mgmt.qa.length-1?'1px solid var(--b1)':'none'}}>
    <span style={{fontSize:13,flexShrink:0,color:q.dodge?'var(--am)':'var(--em)'}}>{q.dodge?'⊘':'✓'}</span>
    <div style={{flex:1}}>
     <div style={{display:'flex',gap:9,alignItems:'center',marginBottom:5,flexWrap:'wrap'}}>
      <p style={{fontSize:12,fontWeight:600,color:'var(--t1)'}}>{q.q}</p>
      <B t={q.dodge?'MEDIUM':'LOW'} sm>{q.dodge?'DEFLECTED':'ANSWERED'}</B></div>
     <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.62}}>{q.n}</p></div></div>)}</Box>
  <Box accent="var(--am)" style={{background:'var(--amF)',border:'1px solid rgba(251,191,36,.22)'}}>
   <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
    <span style={{color:'var(--am)',fontSize:15,flexShrink:0}}>⚡</span>
    <div><div style={{display:'flex',gap:9,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
     <M s={{fontSize:10,fontWeight:700,color:'var(--am)',letterSpacing:'.11em'}}>CONTRADICTION DETECTED</M>
     <B t="AUTO" sm>AGENT</B></div>
     <p style={{fontSize:12,color:'var(--t2)',lineHeight:1.72,marginBottom:11}}>{d.mgmt.contra}</p>
     <div style={{background:'var(--p2)',borderRadius:7,padding:'11px 13px'}}>
      <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.6,fontStyle:'italic',marginBottom:6}}>"{d.mgmt.quote}"</p>
      <M s={{fontSize:9.5,color:'var(--t3)'}}>— {d.mgmt.who}</M></div></div></div></Box></Sec>

 {/* 11 CITATIONS */}
 <Sec id="s-cite" t="Source Citations"
  sub={`All findings trace to primary source documents. ${c.reg} filings are the authoritative reference for this issuer.`}>
  <Box style={{padding:0,overflow:'hidden'}}>
   {d.src.map((s,i)=><div key={i} style={{display:'flex',gap:13,alignItems:'center',padding:'12px 17px',
    borderBottom:i<d.src.length-1?'1px solid var(--b1)':'none'}}>
    <M s={{fontSize:9,color:rc,flexShrink:0}}>[{String(i+1).padStart(2,'0')}]</M>
    <p style={{fontSize:11.5,color:'var(--t2)',flex:1}}>{s.n}</p>
    <B t={s.ty.includes('Filing')?c.reg:'AUTO'} sm>{s.ty}</B>
    <M s={{fontSize:9.5,color:'var(--t3)',minWidth:64,textAlign:'right'}}>{s.u} citations</M></div>)}
   <div style={{padding:'13px 17px',background:'var(--p2)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
    <M s={{fontSize:10,color:'var(--t3)'}}>{d.src.length} sources · {d.src.reduce((a,s)=>a+s.u,0)} inline citations · {c.reg} compliant</M>
    <M s={{fontSize:10,color:rc}}>Agent confidence {d.conf}% · {d.mgmt.qa.filter(q=>q.dodge).length} disclosure gaps flagged</M></div></Box></Sec>
 </div>;}

/* ════════════════ CANDLE GENERATOR ════════════════ */
function candles(seed,n,base,vol){
 const r=rnd(seed+'c');const out=[];let p=base*0.965;
 for(let i=0;i<n;i++){const o=p,mv=(r()-0.47)*base*vol;
  const cl=o+mv,h=Math.max(o,cl)+r()*base*vol*0.5,l=Math.min(o,cl)-r()*base*vol*0.5;
  out.push({o,c:cl,h,l,v:0.35+r()*0.65,d:i+1});p=cl;}
 return out;}

/* ════════════════ LIVE MARKET TAB ════════════════ */
function MarketTab({c,d}){
 const rc=c.reg==='SEBI'?'var(--vi)':'var(--go)';
 const TFs=['1D','1W','1M','3M','1Y','5Y'];
 const[tf,setTf]=useState('1M');
 const[sel,setSel]=useState(null);
 const[ovl,setOvl]=useState(false);
 const[mac,setMac]=useState(d.macro[0].f);
 const N={'1D':26,'1W':35,'1M':30,'3M':45,'1Y':52,'5Y':60}[tf];
 const V={'1D':0.006,'1W':0.012,'1M':0.022,'3M':0.032,'1Y':0.05,'5Y':0.075}[tf];
 const cd=candles(c.id+tf,N,d.price,V);
 const hi=Math.max(...cd.map(x=>x.h)),lo=Math.min(...cd.map(x=>x.l)),rg=hi-lo||1;
 const Y=v=>((hi-v)/rg)*178+10;
 const evs=tf==='1M'?d.events:d.events.slice(0,3);
 const peer=candles(c.id+'p'+tf,N,d.price,V*0.85);
 const mm=d.macro.find(m=>m.f===mac)||d.macro[0];
 const mcd=candles(c.id+mac,N,100,0.03);
 const EC={contra:['var(--am)','⚡'],file:[rc,'📄'],macro:['var(--cy)','🌐'],
  anom:['var(--am)','◈'],call:['var(--vi)','🎙️'],news:['var(--t2)','📰']};
 return <div style={{padding:'22px 26px 80px',maxWidth:1180}}>
  <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
   <div style={{display:'flex',alignItems:'baseline',gap:11}}>
    <M s={{fontSize:26,fontWeight:600,color:'var(--t1)'}}>{d.cur}{d.price.toLocaleString()}</M>
    <M s={{fontSize:14,color:d.chg>=0?'var(--em)':'var(--ro)'}}>
     {d.chg>=0?'▲':'▼'} {Math.abs(d.chgAbs)} ({d.chg>=0?'+':''}{d.chg}%)</M></div>
   <div style={{display:'flex',gap:3,background:'var(--p2)',border:'1px solid var(--b1)',borderRadius:9,padding:3}}>
    {TFs.map(t=><button key={t} onClick={()=>setTf(t)} style={{background:tf===t?rc:'transparent',
     border:'none',borderRadius:6,color:tf===t?'#fff':'var(--t3)',fontSize:11,fontWeight:tf===t?600:400,
     padding:'6px 13px',cursor:'pointer',fontFamily:'var(--fm)',transition:'all .15s'}}>{t}</button>)}</div>
   <button onClick={()=>setOvl(!ovl)} style={{background:ovl?'var(--cyS)':'transparent',
    border:`1px solid ${ovl?'var(--cy)':'var(--b1)'}`,borderRadius:8,color:ovl?'var(--cy)':'var(--t3)',
    fontSize:11,padding:'7px 14px',cursor:'pointer',fontFamily:'var(--fb)'}}>{ovl?'✓ ':''}Peer overlay</button>
   {tf==='1M'&&<div style={{background:'var(--viF)',border:'1px solid rgba(99,102,241,.25)',borderRadius:8,
    padding:'6px 13px',display:'flex',alignItems:'center',gap:8}}>
    <M s={{fontSize:10,color:'var(--vi)'}}>{d.events.length} agent flags in view</M>
    <button onClick={()=>setTf('1Y')} style={{background:'transparent',border:'none',color:'var(--cy)',
     fontSize:10,cursor:'pointer',fontFamily:'var(--fm)',padding:0}}>· see 1Y →</button></div>}
   <M s={{fontSize:9.5,color:'var(--t3)',marginLeft:'auto'}}>52W {d.cur}{d.lo} – {d.cur}{d.hi}</M></div>

  <div style={{display:'grid',gridTemplateColumns:'1fr 290px',gap:16,marginBottom:16}}>
   <div style={{background:'var(--p1)',border:'1px solid var(--b1)',borderRadius:12,padding:'20px 18px'}}>
    <svg viewBox="0 0 760 250" style={{width:'100%',height:250,display:'block'}}>
     {[0,1,2,3,4].map(i=><line key={i} x1={0} x2={760} y1={10+i*44.5} y2={10+i*44.5}
      stroke="var(--b1)" strokeWidth="1" strokeDasharray="2 5"/>)}
     {[0,1,2,3,4].map(i=><text key={'t'+i} x={4} y={10+i*44.5-4} fill="var(--t3)"
      fontSize="8" fontFamily="var(--fm)">{d.cur}{(hi-(rg/4)*i).toFixed(1)}</text>)}
     {ovl&&<polyline fill="none" stroke="var(--cy)" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.65"
      points={peer.map((x,i)=>`${40+i*(700/N)+((700/N)/2)},${Y(x.c)}`).join(' ')}/>}
     {cd.map((x,i)=>{const cx=40+i*(700/N)+((700/N)/2),w=Math.max(2.5,(700/N)*0.55);
      const up=x.c>=x.o,col=up?'#10B981':'#F43F5E';
      return <g key={i}>
       <line x1={cx} x2={cx} y1={Y(x.h)} y2={Y(x.l)} stroke={col} strokeWidth="1"/>
       <rect x={cx-w/2} y={Y(Math.max(x.o,x.c))} width={w}
        height={Math.max(1.5,Math.abs(Y(x.o)-Y(x.c)))} fill={col} opacity="0.9"/></g>;})}
     {evs.map((e,i)=>{const idx=Math.min(N-1,Math.max(0,Math.floor((e.d/31)*N)));
      const cx=40+idx*(700/N)+((700/N)/2);const[col,ic]=EC[e.type]||EC.news;
      return <g key={i} onClick={()=>setSel(e)} style={{cursor:'pointer'}}>
       <line x1={cx} x2={cx} y1={10} y2={200} stroke={col} strokeWidth="1" strokeDasharray="3 3" opacity="0.35"/>
       <circle cx={cx} cy={206} r={9} fill={sel===e?col:'var(--p2)'} stroke={col} strokeWidth="1.5"/>
       <text x={cx} y={210} textAnchor="middle" fontSize="9">{ic}</text></g>;})}
     {cd.map((x,i)=>{const cx=40+i*(700/N)+((700/N)/2),w=Math.max(2.5,(700/N)*0.55);
      return <rect key={'v'+i} x={cx-w/2} y={250-x.v*24} width={w} height={x.v*24}
       fill={x.c>=x.o?'#10B981':'#F43F5E'} opacity="0.28"/>;})}</svg>
    <div style={{display:'flex',gap:16,marginTop:12,paddingTop:11,borderTop:'1px solid var(--b1)',flexWrap:'wrap'}}>
     {Object.entries({'⚡':'Contradiction','📄':'Filing','🌐':'Macro event','◈':'Anomaly','🎙️':'Earnings call'}).map(([k,v])=>
      <M key={k} s={{fontSize:9.5,color:'var(--t3)'}}>{k} {v}</M>)}</div></div>

   <div style={{display:'flex',flexDirection:'column',gap:14}}>
    <Box accent="var(--vi)" style={{padding:18}}>
     <M s={{fontSize:9,color:'var(--vi)',letterSpacing:'.14em',display:'block',marginBottom:11,fontWeight:600}}>AGENT MARKET READ</M>
     <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.72}}>{d.read}</p></Box>
    <Box style={{padding:18}}>
     <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.14em',display:'block',marginBottom:13}}>EVENT SENSITIVITY</M>
     <M s={{fontSize:9,color:'var(--t3)',display:'block',marginBottom:11}}>AVG 3-DAY PRICE IMPACT</M>
     {d.sens.map((s,i)=><div key={i} style={{marginBottom:11}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
       <M s={{fontSize:10,color:i===0?'var(--t1)':'var(--t2)',fontWeight:i===0?500:400}}>{s.e}</M>
       <M s={{fontSize:10.5,fontWeight:600,color:i===0?'var(--ro)':'var(--t2)'}}>±{s.v}%</M></div>
      <Prog v={s.v} max={Math.max(...d.sens.map(x=>x.v))} c={i===0?'var(--ro)':'var(--b2)'} h={3}/></div>)}
     <p style={{fontSize:10.5,color:'var(--t3)',lineHeight:1.6,marginTop:12,paddingTop:11,
      borderTop:'1px solid var(--b1)',fontStyle:'italic'}}>{d.sensV}</p></Box></div></div>

  {sel&&<div style={{background:'var(--p1)',border:`1px solid ${(EC[sel.type]||EC.news)[0]}55`,
   borderLeft:`3px solid ${(EC[sel.type]||EC.news)[0]}`,borderRadius:12,padding:19,marginBottom:16,animation:'up .3s ease'}}>
   <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:10,flexWrap:'wrap'}}>
    <span style={{fontSize:15}}>{(EC[sel.type]||EC.news)[1]}</span>
    <M s={{fontSize:10,color:'var(--t3)'}}>AUG {sel.d}, 2026</M>
    <p style={{fontSize:13,fontWeight:600,color:'var(--t1)'}}>{sel.lbl}</p>
    <M s={{fontSize:12,fontWeight:600,color:sel.imp>=0?'var(--em)':'var(--ro)'}}>
     {sel.imp>=0?'+':''}{sel.imp}% over 3 days</M>
    <button onClick={()=>setSel(null)} style={{marginLeft:'auto',background:'transparent',border:'none',
     color:'var(--t3)',cursor:'pointer',fontSize:15}}>×</button></div>
   <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.7,marginBottom:9}}>{sel.dsc}</p>
   <M s={{fontSize:9,color:'var(--t3)'}}>↳ {sel.src}</M></div>}

  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
   <Box style={{padding:18}}>
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14,flexWrap:'wrap'}}>
     <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.14em'}}>MACRO CORRELATION</M>
     <select value={mac} onChange={e=>setMac(e.target.value)} style={{background:'var(--p2)',
      border:'1px solid var(--b1)',borderRadius:6,color:'var(--t1)',fontSize:10.5,padding:'4px 9px',
      fontFamily:'var(--fm)',cursor:'pointer',outline:'none'}}>
      {d.macro.map(m=><option key={m.f} value={m.f}>{m.f}</option>)}</select>
     <M s={{fontSize:10,color:'var(--t3)',marginLeft:'auto'}}>90d corr
      <span style={{color:mm.corr>0?'var(--em)':'var(--ro)',fontWeight:600}}> {mm.corr>0?'+':''}{mm.corr}</span></M></div>
    <svg viewBox="0 0 340 80" style={{width:'100%',height:80,display:'block'}}>
     <polyline fill="none" stroke={rc} strokeWidth="1.8"
      points={cd.map((x,i)=>`${i*(340/N)},${70-((x.c-lo)/rg)*58}`).join(' ')}/>
     <polyline fill="none" stroke="var(--cy)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8"
      points={mcd.map((x,i)=>`${i*(340/N)},${70-((x.c-90)/24)*58}`).join(' ')}/></svg>
    <div style={{display:'flex',gap:16,marginTop:9}}>
     <M s={{fontSize:9.5,color:rc}}>━ {c.t}</M><M s={{fontSize:9.5,color:'var(--cy)'}}>┅ {mm.f}</M></div>
    <p style={{fontSize:10.5,color:'var(--t2)',lineHeight:1.62,marginTop:11,paddingTop:10,borderTop:'1px solid var(--b1)'}}>
     {Math.abs(mm.corr)>0.5?'Strong':Math.abs(mm.corr)>0.3?'Moderate':'Weak'} correlation over the trailing 90 days
     — {mm.dir==='neg'?'inverse relationship, consistent with the adverse transmission path identified':'positive relationship, consistent with the transmission path identified'} in the research brief.</p></Box>
   <Box style={{padding:18}}>
    <M s={{fontSize:9,color:'var(--t3)',letterSpacing:'.14em',display:'block',marginBottom:14}}>
     EVENT TIMELINE — TRAILING 12 MONTHS</M>
    {d.events.map((e,i)=>{const[col,ic]=EC[e.type]||EC.news;
     return <div key={i} onClick={()=>setSel(e)} style={{display:'flex',gap:11,alignItems:'center',
      padding:'9px 0',borderBottom:i<d.events.length-1?'1px solid var(--b1)':'none',cursor:'pointer'}}>
      <span style={{fontSize:12,flexShrink:0}}>{ic}</span>
      <M s={{fontSize:9.5,color:'var(--t3)',minWidth:44}}>Aug {e.d}</M>
      <p style={{fontSize:11,color:'var(--t2)',flex:1}}>{e.lbl}</p>
      <M s={{fontSize:10.5,fontWeight:600,color:e.imp>=0?'var(--em)':'var(--ro)'}}>
       {e.imp>=0?'+':''}{e.imp}%</M></div>;})}
    <M s={{fontSize:9.5,color:'var(--t3)',display:'block',marginTop:11,fontStyle:'italic'}}>
     Click any event to inspect the agent's finding and source.</M></Box></div>

  <p style={{fontSize:10,color:'var(--t3)',marginTop:18,fontStyle:'italic'}}>
   Market context is provided for research reference only. QuantSight is a research terminal, not a trading platform. No order routing or execution capability is offered.</p></div>;}

/* ════════════════ AGENT WORKSPACE TAB ════════════════ */
function AgentTab({c,d}){
 const rc=c.reg==='SEBI'?'var(--vi)':'var(--go)';
 const[open,setOpen]=useState(null);
 const[msgs,setMsgs]=useState([]);
 const[inp,setInp]=useState('');
 const done=[
  {t:'Competitor benchmarking',n:`${d.peers.length} peers resolved and compared`,k:'comp'},
  {t:'Anomaly detection',n:`${d.anomalies.length} flagged across 3 fiscal years`,k:'anom'},
  {t:'Macro transmission mapping',n:`${d.macro.length} factors traced to P&L`,k:'macro'},
  {t:'Guidance track record',n:`${d.mgmt.track.filter(t=>t.hit).length}/${d.mgmt.track.length} quarters met`,k:'guid'},
  {t:'Q&A deflection analysis',n:`${d.mgmt.qa.filter(q=>q.dodge).length} of ${d.mgmt.qa.length} questions deflected`,k:'qa'},
  {t:'Governance signal scan',n:`Score ${d.gov.score}/100 · ${d.gov.items.filter(g=>!g.ok).length} flags`,k:'gov'},
  {t:'Contradiction check',n:'1 contradiction identified',k:'con'},
  {t:'Citation mapping',n:`${d.src.reduce((a,s)=>a+s.u,0)} citations across ${d.src.length} sources`,k:'cite'}];
 const prog=[{t:`Monitoring peer earnings in ${c.sec}`,n:'2 peers report within 14 days'},
  {t:'Scanning policy developments',n:c.reg==='SEBI'?'Budget 2026 implementation tracking':'Federal policy and export control monitoring'},
  {t:'Watching for filing updates',n:`Next expected ${c.reg} filing in 22 days`}];
 const openQ=d.mgmt.qa.filter(q=>q.dodge).map(q=>q.q)
  .concat(d.anomalies.slice(0,2).map(a=>`Resolve: ${a.t}`));
 const deep={
  comp:{t:'Competitor Deep Dive',body:d.peerV,
   extra:d.peers.map(p=>({l:p.n,v:`${p.mgn} margin · ${p.gr} growth · ${p.pe} P/E · ${p.roe} ROE`}))},
  anom:{t:'Anomaly Detail',body:'All anomalies detected without prompting, each with a suggested verification step.',
   extra:d.anomalies.map(a=>({l:`${a.sv} · ${a.c}% conf — ${a.t}`,v:a.act}))},
  macro:{t:'Macro Transmission Detail',body:'Each factor traced through to an estimated P&L impact with stated assumptions.',
   extra:d.macro.map(m=>({l:`${m.f} · ${m.lvl} · corr ${m.corr>0?'+':''}${m.corr}`,v:`${m.est} — ${m.asm}`}))},
  guid:{t:'Guidance Track Record',body:d.mgmt.trackV,
   extra:d.mgmt.track.map(t=>({l:`${t.q} — ${t.hit?'MET':'MISSED'}`,v:`Guided ${t.g}, reported ${t.a}`}))},
  qa:{t:'Q&A Deflection Analysis',body:'Analyst questions management declined to answer directly, and the specific evasion pattern.',
   extra:d.mgmt.qa.map(q=>({l:`${q.dodge?'DEFLECTED':'ANSWERED'} — ${q.q}`,v:q.n}))},
  gov:{t:'Governance Signals',body:`Governance score ${d.gov.score}/100 based on ${d.gov.items.length} structural checks.`,
   extra:d.gov.items.map(g=>({l:`${g.ok?'✓ CLEAR':'⚠ FLAG'} — ${g.t}`,v:g.d}))},
  con:{t:'Contradiction Analysis',body:d.mgmt.contra,
   extra:[{l:'Source quote',v:`"${d.mgmt.quote}" — ${d.mgmt.who}`}]},
  cite:{t:'Citation Map',body:`${d.src.reduce((a,s)=>a+s.u,0)} inline citations mapped across ${d.src.length} primary sources.`,
   extra:d.src.map(s=>({l:`${s.ty} — ${s.n}`,v:`${s.u} citations drawn from this source`}))}};
 function send(q){if(!q.trim())return;
  setMsgs(m=>[...m,{r:'u',t:q},{r:'a',t:`The agent has already completed analysis relevant to this. See the ${
   /peer|competitor|compar/i.test(q)?'competitor benchmarking':/risk/i.test(q)?'risk signal':
   /macro|crude|forex|rate/i.test(q)?'macro transmission':/guidance|management|credib/i.test(q)?'guidance track record':
   /anomal/i.test(q)?'anomaly detection':'research brief'} section — findings are cited to ${c.reg} primary sources. In the full build this would run a live retrieval pass against the indexed filing corpus and return a cited answer with a confidence score.`}]);
  setInp('');}
 return <div style={{padding:'22px 26px 80px',maxWidth:1120}}>
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:18}}>
   <Box accent="var(--em)">
    <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:15}}>
     <M s={{fontSize:9.5,color:'var(--em)',letterSpacing:'.14em',fontWeight:600}}>✓ COMPLETED AUTONOMOUSLY</M>
     <M s={{fontSize:9.5,color:'var(--t3)',marginLeft:'auto'}}>{done.length} tasks</M></div>
    {done.map((x,i)=><div key={i} onClick={()=>setOpen(open===x.k?null:x.k)}
     style={{display:'flex',gap:11,alignItems:'center',padding:'9px 0',cursor:'pointer',
      borderBottom:i<done.length-1?'1px solid var(--b1)':'none'}}>
     <span style={{color:'var(--em)',fontSize:11,flexShrink:0}}>✓</span>
     <div style={{flex:1,minWidth:0}}>
      <p style={{fontSize:11.5,color:'var(--t1)',marginBottom:2}}>{x.t}</p>
      <M s={{fontSize:9.5,color:'var(--t3)'}}>{x.n}</M></div>
     <M s={{fontSize:10,color:open===x.k?'var(--vi)':'var(--t3)'}}>{open===x.k?'−':'+'}</M></div>)}</Box>
   <div style={{display:'flex',flexDirection:'column',gap:16}}>
    <Box accent="var(--cy)">
     <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:14}}>
      <div style={{width:6,height:6,borderRadius:'50%',background:'var(--cy)',animation:'pl 1.4s infinite'}}/>
      <M s={{fontSize:9.5,color:'var(--cy)',letterSpacing:'.14em',fontWeight:600}}>IN PROGRESS</M></div>
     {prog.map((x,i)=><div key={i} style={{padding:'8px 0',
      borderBottom:i<prog.length-1?'1px solid var(--b1)':'none'}}>
      <p style={{fontSize:11.5,color:'var(--t2)',marginBottom:2}}>{x.t}</p>
      <M s={{fontSize:9.5,color:'var(--t3)'}}>{x.n}</M></div>)}</Box>
    <Box accent="var(--am)">
     <M s={{fontSize:9.5,color:'var(--am)',letterSpacing:'.14em',display:'block',marginBottom:13,fontWeight:600}}>
      ⊘ AGENT'S OPEN QUESTIONS</M>
     {openQ.map((q,i)=><div key={i} style={{display:'flex',gap:11,alignItems:'flex-start',padding:'9px 0',
      borderBottom:i<openQ.length-1?'1px solid var(--b1)':'none'}}>
      <M s={{fontSize:9.5,color:'var(--am)',flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,'0')}</M>
      <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.6,flex:1}}>{q}</p>
      <button onClick={()=>send(q)} style={{background:'transparent',border:'1px solid var(--b1)',
       borderRadius:6,color:'var(--t3)',fontSize:9.5,padding:'3px 10px',cursor:'pointer',
       fontFamily:'var(--fm)',flexShrink:0}}>investigate</button></div>)}</Box></div></div>

  {open&&deep[open]&&<Box accent="var(--vi)" style={{marginBottom:18,animation:'up .3s ease'}}>
   <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:11}}>
    <h3 style={{fontFamily:'var(--fd)',fontSize:14,fontWeight:700,color:'var(--t1)'}}>{deep[open].t}</h3>
    <B t="AUTO" sm>DEEP DIVE</B>
    <button onClick={()=>setOpen(null)} style={{marginLeft:'auto',background:'transparent',border:'none',
     color:'var(--t3)',cursor:'pointer',fontSize:15}}>×</button></div>
   <p style={{fontSize:11.5,color:'var(--t2)',lineHeight:1.7,marginBottom:15}}>{deep[open].body}</p>
   {deep[open].extra.map((e,i)=><div key={i} style={{background:'var(--p2)',borderRadius:8,
    padding:'11px 14px',marginBottom:8}}>
    <M s={{fontSize:10.5,color:'var(--t1)',display:'block',marginBottom:5,fontWeight:500}}>{e.l}</M>
    <p style={{fontSize:11,color:'var(--t2)',lineHeight:1.6}}>{e.v}</p></div>)}</Box>}

  <Box style={{padding:0,overflow:'hidden'}}>
   <div style={{padding:'14px 18px',borderBottom:'1px solid var(--b1)',display:'flex',alignItems:'center',gap:10}}>
    <M s={{fontSize:9.5,color:'var(--t3)',letterSpacing:'.14em'}}>ASK THE AGENT</M>
    <M s={{fontSize:9.5,color:'var(--t3)',marginLeft:'auto'}}>Overflow layer — the work above is already done</M></div>
   {msgs.length>0&&<div style={{padding:'16px 18px',maxHeight:280,overflowY:'auto'}}>
    {msgs.map((m,i)=><div key={i} style={{marginBottom:13,display:'flex',gap:11,alignItems:'flex-start'}}>
     <div style={{width:22,height:22,borderRadius:6,flexShrink:0,display:'flex',alignItems:'center',
      justifyContent:'center',background:m.r==='u'?'var(--p3)':'var(--viS)',
      border:`1px solid ${m.r==='u'?'var(--b1)':'var(--vi)'}`}}>
      <M s={{fontSize:9,color:m.r==='u'?'var(--t2)':'var(--vi)'}}>{m.r==='u'?'You':'Q'}</M></div>
     <p style={{fontSize:11.5,color:m.r==='u'?'var(--t1)':'var(--t2)',lineHeight:1.7,flex:1,
      paddingTop:2}}>{m.t}</p></div>)}</div>}
   <div style={{padding:'13px 18px',display:'flex',gap:9,alignItems:'center'}}>
    <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(inp)}
     placeholder={`Ask anything about ${c.t} — the agent has the full ${c.reg} filing corpus indexed…`}
     style={{flex:1,background:'var(--p2)',border:'1px solid var(--b1)',borderRadius:9,color:'var(--t1)',
      fontSize:12,fontFamily:'var(--fb)',padding:'11px 14px',outline:'none'}}/>
    <button onClick={()=>send(inp)} style={{background:rc,border:'none',borderRadius:9,color:'#fff',
     fontSize:11.5,fontWeight:600,padding:'11px 20px',cursor:'pointer',fontFamily:'var(--fd)'}}>Send</button></div></Box></div>;}

/* ════════════════ RESULTS ════════════════ */
function Results({c,onBack}){
 const d=getData(c);
 const[tab,setTab]=useState('research');
 useEffect(()=>{window.scrollTo(0,0);},[tab]);
 return <div style={{minHeight:'100vh'}}>
  <Header c={c} d={d} tab={tab} setTab={setTab} onBack={onBack}/>
  {tab==='research'&&<ResearchTab c={c} d={d}/>}
  {tab==='market'&&<MarketTab c={c} d={d}/>}
  {tab==='agent'&&<AgentTab c={c} d={d}/>}
 </div>;}

/* ════════════════ ROOT ════════════════ */
export default function QuantSight(){
 const[sc,setSc]=useState('landing');
 const[co,setCo]=useState(null);
 return <>
  <style>{CSS}</style>
  {sc==='landing'&&<Landing onGo={c=>{setCo(c);setSc('research');}}/>}
  {sc==='research'&&co&&<Research c={co} onDone={()=>setSc('results')}/>}
  {sc==='results'&&co&&<Results c={co} onBack={()=>setSc('landing')}/>}
 </>;}
