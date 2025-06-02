"use strict";(()=>{var e={};e.id=4587,e.ids=[4587],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},1242:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},4591:(e,t,s)=>{s.a(e,async(e,n)=>{try{s.r(t),s.d(t,{config:()=>c,default:()=>d,routeModule:()=>l});var o=s(1966),r=s(5093),a=s(1242),i=s(2710),u=e([i]);i=(u.then?(await u)():u)[0];let d=(0,a.l)(i,"default"),c=(0,a.l)(i,"config"),l=new o.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/ai/debug-code",pathname:"/api/ai/debug-code",bundlePath:"",filename:""},userland:i});n()}catch(e){n(e)}})},2710:(e,t,s)=>{s.a(e,async(e,n)=>{try{s.r(t),s.d(t,{default:()=>a});var o=s(2079),r=e([o]);o=(r.then?(await r)():r)[0];let i=process.env.OPENAI_API_KEY?new o.default({apiKey:process.env.OPENAI_API_KEY}):null;async function a(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let s;let{code:n,error:o,language:r}=e.body;if(!n)return t.status(400).json({error:"Code is required"});if(!i)return t.status(200).json({debugResults:{issues:["AI debugging is not available. Please configure OpenAI API key."],suggestions:["Check the developer documentation for common debugging tips."]},fallback:!0});let a=`
      You are an expert programming debugger tasked with finding and fixing issues in code.
      
      Here is the ${r||"JavaScript"} code that has issues:
      
      \`\`\`${r||"javascript"}
      ${n}
      \`\`\`
      
      ${o?`The user encountered the following error:
${o}`:""}
      
      Please analyze this code and identify any bugs, issues, or improvements. Respond with:
      
      1. A detailed list of issues found in the code
      2. Specific solutions and code fixes for each issue
      3. Explanation of why these issues occurred and how to avoid them in the future
      
      Format your response as structured JSON with the following format:
      {
        "issues": [
          "Issue 1 description",
          "Issue 2 description",
          ...
        ],
        "fixes": [
          "Fix 1 with code example",
          "Fix 2 with code example",
          ...
        ],
        "explanations": [
          "Explanation 1",
          "Explanation 2",
          ...
        ]
      }
      
      Ensure your response is valid JSON that can be parsed.
    `,u=(await i.chat.completions.create({model:"gpt-4o",messages:[{role:"system",content:"You are a helpful coding assistant specializing in debugging code. Always return valid JSON that can be parsed."},{role:"user",content:a}],max_tokens:1500,temperature:.3,response_format:{type:"json_object"}})).choices[0].message.content;try{s=JSON.parse(u)}catch(e){console.error("Failed to parse JSON response from OpenAI:",e),s={issues:["Could not parse the AI response properly. Here's the raw output:"],fixes:[u],explanations:["Please try again with a clearer code sample."]}}return t.status(200).json({debugResults:s})}catch(e){return console.error("Error debugging code:",e),t.status(500).json({error:"Failed to debug code",message:e.message})}}n()}catch(e){n(e)}})},5093:(e,t)=>{var s;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return s}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(s||(s={}))},1966:(e,t,s)=>{e.exports=s(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var s=t(t.s=4591);module.exports=s})();