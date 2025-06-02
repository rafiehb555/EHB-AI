"use strict";(()=>{var e={};e.id=8659,e.ids=[8659],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},1242:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5758:(e,t,r)=>{r.a(e,async(e,o)=>{try{r.r(t),r.d(t,{config:()=>d,default:()=>c,routeModule:()=>l});var n=r(1966),s=r(5093),a=r(1242),i=r(6228),u=e([i]);i=(u.then?(await u)():u)[0];let c=(0,a.l)(i,"default"),d=(0,a.l)(i,"config"),l=new n.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/ai/suggest-code",pathname:"/api/ai/suggest-code",bundlePath:"",filename:""},userland:i});o()}catch(e){o(e)}})},6228:(e,t,r)=>{r.a(e,async(e,o)=>{try{r.r(t),r.d(t,{default:()=>a});var n=r(2079),s=e([n]);n=(s.then?(await s)():s)[0];let i=process.env.OPENAI_API_KEY?new n.default({apiKey:process.env.OPENAI_API_KEY}):null;async function a(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{code:r,prompt:o,language:n}=e.body;if(!r)return t.status(400).json({error:"Code is required"});if(!o)return t.status(400).json({error:"Prompt is required"});if(!i)return t.status(200).json({suggestions:"AI code suggestions are not available. Please configure OpenAI API key.",fallback:!0});let s=`
      You are an expert programmer and coding instructor tasked with suggesting improvements to code.
      
      Here is the ${n||"JavaScript"} code:
      
      \`\`\`${n||"javascript"}
      ${r}
      \`\`\`
      
      The user is trying to: ${o}
      
      Please provide suggested improvements or solutions to help the user achieve their goal.
      
      In your suggestions:
      1. Explain what you're changing and why
      2. Provide the improved code
      3. Add any relevant tips or best practices
      
      Format your response to be clear and educational, focusing on teaching the concepts while helping the user solve their problem.
    `,a=(await i.chat.completions.create({model:"gpt-4o",messages:[{role:"system",content:"You are a helpful coding assistant that provides accurate and educational code suggestions."},{role:"user",content:s}],max_tokens:1500,temperature:.7})).choices[0].message.content;return t.status(200).json({suggestions:a})}catch(e){return console.error("Error generating code suggestions:",e),t.status(500).json({error:"Failed to generate suggestions",message:e.message})}}o()}catch(e){o(e)}})},5093:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1966:(e,t,r)=>{e.exports=r(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=5758);module.exports=r})();