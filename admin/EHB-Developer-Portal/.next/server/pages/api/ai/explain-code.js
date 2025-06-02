"use strict";(()=>{var e={};e.id=1114,e.ids=[1114],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},1242:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},9643:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.r(t),n.d(t,{config:()=>u,default:()=>c,routeModule:()=>d});var o=n(1966),r=n(5093),i=n(1242),s=n(3624),l=e([s]);s=(l.then?(await l)():l)[0];let c=(0,i.l)(s,"default"),u=(0,i.l)(s,"config"),d=new o.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/ai/explain-code",pathname:"/api/ai/explain-code",bundlePath:"",filename:""},userland:s});a()}catch(e){a(e)}})},3624:(e,t,n)=>{n.a(e,async(e,a)=>{try{n.r(t),n.d(t,{default:()=>i});var o=n(2079),r=e([o]);o=(r.then?(await r)():r)[0];let s=process.env.OPENAI_API_KEY?new o.default({apiKey:process.env.OPENAI_API_KEY}):null;async function i(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{code:n,language:a,context:o}=e.body;if(!n)return t.status(400).json({error:"Code is required"});if(!s)return t.status(200).json({explanation:"AI explanation is not available. Please configure OpenAI API key.",fallback:!0});let r=`
      You are an expert programmer and coding instructor tasked with explaining code to someone learning to program.
      
      Please explain the following ${a||"JavaScript"} code in a clear, concise manner:
      
      \`\`\`${a||"javascript"}
      ${n}
      \`\`\`
      
      ${o?`Additional context: ${o}`:""}
      
      In your explanation:
      1. Start with a high-level overview of what the code does
      2. Break down the key parts or functions
      3. Explain any important concepts or patterns used
      4. Highlight any best practices or potential issues
      
      Keep your explanation friendly and educational, aimed at someone who is learning to code.
    `,i=(await s.chat.completions.create({model:"gpt-4o",messages:[{role:"system",content:"You are a helpful coding assistant that explains code clearly and educationally."},{role:"user",content:r}],max_tokens:1500,temperature:.7})).choices[0].message.content;return t.status(200).json({explanation:i})}catch(e){return console.error("Error generating code explanation:",e),t.status(500).json({error:"Failed to generate explanation",message:e.message})}}a()}catch(e){a(e)}})},5093:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1966:(e,t,n)=>{e.exports=n(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=9643);module.exports=n})();