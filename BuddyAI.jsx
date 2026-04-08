import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// BUDDY AI — COMPLETE DATASET (180 tools) + CORE LOGIC
// ═══════════════════════════════════════════════════════════

const TOOLS = [
// ── VIDEO ──────────────────────────────────────────────────
{ id:1,name:"Runway ML",category:"Video",industry:"Video Editing",tags:["video generation","AI video","film","animation","text to video","creative"],pricing:"freemium",skill_level:"intermediate",output_type:"Video",ease_of_use:72,description:"Runway is a next-generation creative suite for AI-powered video generation, editing, and visual effects used by Hollywood studios and indie creators alike.",pros:["Stunning output quality","Text-to-video support","In-painting & masking","Professional grade"],cons:["Credits deplete fast","Learning curve","Expensive at scale"],rating:4.7,popularity_score:92,link:"https://runwayml.com",similar_tools:["Pika Labs","Sora","Kling AI"],trending_reason:"Used in major film productions and viral social content" },
{ id:2,name:"Pika Labs",category:"Video",industry:"Video Editing",tags:["video generation","AI video","short clips","animation","beginner video"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:90,description:"Pika lets you generate and edit videos with simple text prompts, great for short creative clips and social content.",pros:["Super easy to use","Fast generation","Free tier available","Discord community"],cons:["Short clip limits","Less control over output"],rating:4.4,popularity_score:85,link:"https://pika.art",similar_tools:["Runway ML","Sora","Kling AI"],trending_reason:"Popular for viral short-form AI content" },
{ id:3,name:"Sora",category:"Video",industry:"Video Editing",tags:["video generation","text-to-video","OpenAI","cinematic","HD video"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:91,description:"OpenAI's groundbreaking text-to-video model that generates cinematic quality video up to 60 seconds from complex text descriptions.",pros:["Exceptional quality","Long clips up to 60s","Physics-aware rendering","Complex scenes"],cons:["Limited availability","Expensive plans"],rating:4.9,popularity_score:96,link:"https://sora.com",similar_tools:["Runway ML","Pika Labs","Kling AI"],trending_reason:"Considered the most capable AI video model" },
{ id:4,name:"Kling AI",category:"Video",industry:"Video Editing",tags:["video generation","AI video","text-to-video","cinematic","image to video"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:83,description:"Kuaishou's powerful video generation model with impressive motion consistency and 2-minute clip capability.",pros:["Impressive motion quality","Free credits daily","2-minute clips","Image-to-video mode"],cons:["Chinese platform","English UI less polished"],rating:4.5,popularity_score:82,link:"https://klingai.com",similar_tools:["Runway ML","Sora","Pika Labs"],trending_reason:"Strong competitor to Sora with generous free tier" },
{ id:5,name:"Synthesia",category:"Video",industry:"Video Editing",tags:["avatar","presenter","business video","education","training video"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:88,description:"Create professional AI avatar videos for training, marketing, and presentations without cameras or actors.",pros:["No filming needed","100+ avatars","Multilingual support","SCORM export"],cons:["Expensive plans","Limited avatar customization"],rating:4.5,popularity_score:88,link:"https://synthesia.io",similar_tools:["D-ID","HeyGen","Colossyan"],trending_reason:"Widely adopted for corporate training videos" },
{ id:6,name:"HeyGen",category:"Video",industry:"Marketing",tags:["avatar","video","marketing","spokesperson","presentation","AI video"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:87,description:"Create AI spokesperson videos for marketing campaigns with customizable avatars, voice cloning, and instant translation.",pros:["Realistic avatars","Voice cloning","Easy scripting","Instant translation"],cons:["Watermark on free tier","Limited free minutes"],rating:4.6,popularity_score:87,link:"https://heygen.com",similar_tools:["Synthesia","D-ID","Colossyan"],trending_reason:"Go-to for startup and product marketing videos" },
{ id:7,name:"InVideo AI",category:"Video",industry:"Marketing",tags:["video","social media","YouTube","marketing","faceless video","content creation"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:90,description:"Create faceless YouTube videos and social content from a text prompt with AI-selected stock footage and automatic voiceover.",pros:["Faceless video creation","Huge template library","Auto-voiceover","1000s of stock clips"],cons:["Watermark on free tier","AI scenes limited"],rating:4.2,popularity_score:74,link:"https://invideo.io",similar_tools:["Pictory","Lumen5","Runway ML"],trending_reason:"Top choice for YouTube automation channels" },
{ id:8,name:"CapCut AI",category:"Video",industry:"Video Editing",tags:["video editing","mobile","social media","TikTok","AI effects","auto captions"],pricing:"free",skill_level:"beginner",output_type:"Video",ease_of_use:94,description:"TikTok's AI-powered free video editor with auto-captions, viral templates, AI effects, and social-optimized exports.",pros:["Completely free","Auto-captions","TikTok optimized","AI effects & filters"],cons:["ByteDance privacy concerns","Watermark on some features"],rating:4.5,popularity_score:91,link:"https://capcut.com",similar_tools:["Adobe Premiere AI","InVideo AI","Runway ML"],trending_reason:"#1 free video editor for social media creators" },
{ id:9,name:"D-ID",category:"Video",industry:"Video Editing",tags:["avatar","talking head","video","presentation","animate photo"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:85,description:"Animate photos and create talking head videos using AI with realistic facial movements and precise lip sync.",pros:["Animate any photo","API available","Multiple languages","SDK support"],cons:["Uncanny valley effect","Limited gestures"],rating:4.2,popularity_score:78,link:"https://d-id.com",similar_tools:["Synthesia","HeyGen","Runway ML"],trending_reason:"Popular for AI avatars in online courses" },
{ id:10,name:"Opus Clip",category:"Video",industry:"Marketing",tags:["video repurposing","clips","short form","TikTok","YouTube Shorts","social media"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:92,description:"AI that automatically finds the most engaging moments in long videos and creates viral short-form clips with virality scores.",pros:["Automatic highlight detection","Virality score per clip","Auto-captions","One-click repurposing"],cons:["Credits for long videos","Quality varies by content"],rating:4.5,popularity_score:81,link:"https://opus.pro",similar_tools:["Captions AI","VEED.io","InVideo AI"],trending_reason:"Podcasters repurposing content for TikTok" },
{ id:11,name:"VEED.io",category:"Video",industry:"Video Editing",tags:["video editing","subtitles","online","social media","clips"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:91,description:"Online video editor with AI features for auto-subtitles, transcription, eye contact correction, and clip generation.",pros:["Browser-based editing","Auto-subtitles","Eye contact fix","Clip generation"],cons:["Watermark on free tier","Slow on large files"],rating:4.3,popularity_score:72,link:"https://veed.io",similar_tools:["CapCut AI","Adobe Premiere AI","Descript"],trending_reason:"Content creators turning long videos into short clips" },
{ id:12,name:"DaVinci Resolve AI",category:"Video",industry:"Video Editing",tags:["video editing","color grading","professional","AI edit","free","Hollywood quality"],pricing:"free",skill_level:"advanced",output_type:"Video",ease_of_use:55,description:"Hollywood-grade video editing with AI-powered color matching, audio cleanup, and object removal used in major productions.",pros:["Free full version","Hollywood-grade quality","AI color tools","Professional standard"],cons:["Steep learning curve","GPU intensive","Complex interface"],rating:4.7,popularity_score:82,link:"https://blackmagicdesign.com/davinci",similar_tools:["Adobe Premiere AI","CapCut AI","Runway ML"],trending_reason:"Professionals using free DaVinci for Hollywood-level work" },
{ id:13,name:"Kaiber",category:"Video",industry:"Video Editing",tags:["video generation","music video","artistic","animation","creative video"],pricing:"freemium",skill_level:"intermediate",output_type:"Video",ease_of_use:70,description:"Transform images and audio into stunning animated video sequences with artistic AI styles. Perfect for music videos.",pros:["Music-reactive visuals","Artistic outputs","Story mode","Unique aesthetic"],cons:["Credit system","Slow rendering"],rating:4.1,popularity_score:71,link:"https://kaiber.ai",similar_tools:["Runway ML","Pika Labs"],trending_reason:"Musicians use it for AI-generated music videos" },
{ id:14,name:"Pictory",category:"Video",industry:"Marketing",tags:["video","blog to video","repurpose","content marketing","social media"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:89,description:"Turn blog posts and scripts into engaging short videos with AI-selected stock footage and auto-captions.",pros:["Blog to video instantly","Stock library","Auto-captions","Brand kit"],cons:["Generic stock footage","Limited customization"],rating:4.1,popularity_score:65,link:"https://pictory.ai",similar_tools:["Lumen5","InVideo AI","Synthesia"],trending_reason:"Popular for repurposing long-form content" },

// ── IMAGE ──────────────────────────────────────────────────
{ id:20,name:"Midjourney",category:"Image",industry:"Design",tags:["image generation","art","design","illustration","logo","AI art","concept art"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:80,description:"The gold standard of AI image generation. Creates stunning, artistic visuals from text prompts via Discord or the web.",pros:["Unmatched artistic quality","Active community","Consistent style","V6 model excellent"],cons:["No free tier anymore","Discord-based interface"],rating:4.8,popularity_score:98,link:"https://midjourney.com",similar_tools:["DALL-E 3","Stable Diffusion","Adobe Firefly"],trending_reason:"Most-used AI image tool by designers worldwide" },
{ id:21,name:"DALL-E 3",category:"Image",industry:"Design",tags:["image generation","art","design","illustration","OpenAI","text to image"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:93,description:"OpenAI's DALL-E 3 integrated into ChatGPT creates accurate, detailed images from complex natural language descriptions.",pros:["Follows prompts accurately","Integrated in ChatGPT","Safe content filters","Great text rendering"],cons:["Limited free credits","Less artistic than Midjourney"],rating:4.6,popularity_score:91,link:"https://openai.com/dall-e-3",similar_tools:["Midjourney","Adobe Firefly","Stable Diffusion"],trending_reason:"Easiest way to generate images inside ChatGPT" },
{ id:22,name:"Stable Diffusion",category:"Image",industry:"Design",tags:["image generation","open-source","custom models","art","design","free image AI"],pricing:"free",skill_level:"advanced",output_type:"Image",ease_of_use:35,description:"Open-source image generation model that runs locally with thousands of community-created fine-tuned models.",pros:["Completely free","No censorship","Run locally","1000s of custom models"],cons:["Requires GPU","Complex setup","Steep learning curve"],rating:4.5,popularity_score:94,link:"https://stability.ai",similar_tools:["Midjourney","ComfyUI","Leonardo AI"],trending_reason:"Foundation of the open-source AI art movement" },
{ id:23,name:"Adobe Firefly",category:"Image",industry:"Design",tags:["image generation","design","brand-safe","commercial","photoshop","editing"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:88,description:"Adobe's generative AI integrated into Creative Cloud for commercially safe image generation and advanced photo editing.",pros:["Commercial license safe","Photoshop integration","High quality","Generative fill"],cons:["Requires Adobe subscription","Limited credits"],rating:4.4,popularity_score:83,link:"https://firefly.adobe.com",similar_tools:["DALL-E 3","Midjourney","Canva AI"],trending_reason:"Standard for commercial design work" },
{ id:24,name:"Canva AI",category:"Image",industry:"Design",tags:["design","logo","social media","presentation","image generation","beginner design"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:96,description:"Canva's suite of AI tools including Magic Media for generating images, logos, and complete graphic designs.",pros:["All-in-one design tool","Huge template library","Easy for non-designers","Team collaboration"],cons:["Less powerful AI","Pro plan needed for best features"],rating:4.3,popularity_score:89,link:"https://canva.com",similar_tools:["Adobe Firefly","Looka","Bing Image Creator"],trending_reason:"Most accessible design tool for non-designers globally" },
{ id:25,name:"Leonardo AI",category:"Image",industry:"Design",tags:["image generation","game assets","concept art","character design","art"],pricing:"freemium",skill_level:"intermediate",output_type:"Image",ease_of_use:75,description:"Powerful AI image platform focused on game assets, concept art, and consistent character generation across multiple scenes.",pros:["Game asset focused","Consistent characters","Fine-tuning tools","Real-time canvas"],cons:["Token limit per day","Interface complexity"],rating:4.5,popularity_score:82,link:"https://leonardo.ai",similar_tools:["Midjourney","Stable Diffusion","Bing Image Creator"],trending_reason:"Top choice for game developers and concept artists" },
{ id:26,name:"Ideogram",category:"Image",industry:"Design",tags:["image generation","text in images","design","typography","logo","poster design"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:88,description:"AI image generator that excels at accurately embedding readable text within images. Perfect for logos, posters, and typography.",pros:["Best text-in-image accuracy","Free tier generous","Beautiful styles","Fast generation"],cons:["Cannot edit existing images","Style variety limited"],rating:4.5,popularity_score:79,link:"https://ideogram.ai",similar_tools:["Midjourney","DALL-E 3","Adobe Firefly"],trending_reason:"#1 tool for text-in-image design" },
{ id:27,name:"Flux AI",category:"Image",industry:"Design",tags:["image generation","art","design","open-source","photorealistic","flux model"],pricing:"freemium",skill_level:"intermediate",output_type:"Image",ease_of_use:70,description:"Black Forest Labs' Flux models offer state-of-the-art image generation with exceptional photorealistic quality.",pros:["Top-tier quality","Multiple model sizes","Open weights available","Excellent prompt following"],cons:["Needs compute for local run","Interface learning curve"],rating:4.7,popularity_score:86,link:"https://blackforestlabs.ai",similar_tools:["Stable Diffusion","Midjourney","Leonardo AI"],trending_reason:"Challenging Midjourney in quality benchmarks" },
{ id:28,name:"Magnific AI",category:"Image",industry:"Design",tags:["image upscaling","enhancement","photo","upscaler","quality boost"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:85,description:"AI image upscaler that adds realistic details and textures when enhancing resolution up to 16x.",pros:["Magical upscaling results","Adds realistic detail","Stunning transformations"],cons:["Very expensive","Slow processing time"],rating:4.6,popularity_score:77,link:"https://magnific.ai",similar_tools:["Topaz Photo AI","Adobe Firefly","Clipdrop"],trending_reason:"Went viral for transforming low-res images dramatically" },
{ id:29,name:"Remove.bg",category:"Image",industry:"Design",tags:["background removal","image editing","photo","design","ecommerce"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:97,description:"The leading dedicated tool for removing backgrounds from images in seconds with near-perfect AI accuracy.",pros:["Instant 1-click results","Browser extension","API for bulk","99% accuracy"],cons:["Single-purpose only","Credits for HD downloads"],rating:4.4,popularity_score:86,link:"https://remove.bg",similar_tools:["Clipdrop","Adobe Firefly","Canva AI"],trending_reason:"Essential tool for e-commerce product photos" },
{ id:30,name:"Bing Image Creator",category:"Image",industry:"Design",tags:["image generation","free","DALL-E","Microsoft","beginner","no signup"],pricing:"free",skill_level:"beginner",output_type:"Image",ease_of_use:95,description:"Microsoft's free image creator powered by DALL-E. Generate high-quality images for free with just a Microsoft account.",pros:["Completely free","No complex signup","DALL-E quality","Daily credits"],cons:["Limited credits per day","Occasional wait times"],rating:4.0,popularity_score:76,link:"https://bing.com/create",similar_tools:["DALL-E 3","Adobe Firefly","Canva AI"],trending_reason:"Best free alternative to paid image generators" },
{ id:31,name:"Flair AI",category:"Image",industry:"Marketing",tags:["product photography","brand","e-commerce","image","commercial design"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:87,description:"AI product photography tool for creating stunning product shots without a studio or professional photographer.",pros:["Professional product photos","Brand consistency","No studio needed","Fast turnaround"],cons:["Product images only","Background variety limited"],rating:4.3,popularity_score:64,link:"https://flair.ai",similar_tools:["Canva AI","Adobe Firefly","Midjourney"],trending_reason:"E-commerce brands replacing expensive studio shoots" },
{ id:32,name:"Clipdrop",category:"Image",industry:"Design",tags:["background removal","image editing","design","photo","cleanup","upscale"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:90,description:"Stability AI's AI image editing suite for removing backgrounds, upscaling, and cleaning up images professionally.",pros:["Multiple AI editing tools","Background removal","Uncrop feature","Stable Diffusion XL"],cons:["Credits system limits","Limited generation"],rating:4.2,popularity_score:69,link:"https://clipdrop.co",similar_tools:["Adobe Firefly","Remove.bg","Canva AI"],trending_reason:"Designers using it as an all-in-one image toolkit" },

// ── TEXT / WRITING ─────────────────────────────────────────
{ id:40,name:"ChatGPT",category:"Text",industry:"Business / Productivity",tags:["writing","essay","content","chatbot","text generation","research","coding","assistant","productivity"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:97,description:"OpenAI's flagship conversational AI. Write essays, generate content, debug code, brainstorm ideas, and answer any question.",pros:["Extremely versatile","Excellent writing quality","Massive context window","Plugin ecosystem"],cons:["GPT-4 behind paywall","Knowledge cutoff date"],rating:4.8,popularity_score:99,link:"https://chat.openai.com",similar_tools:["Claude","Gemini","Copilot"],trending_reason:"Most widely used AI tool on the planet" },
{ id:41,name:"Claude",category:"Text",industry:"Business / Productivity",tags:["writing","essay","content","analysis","research","long context","reasoning","assistant"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:96,description:"Anthropic's Claude is known for thoughtful, nuanced writing, exceptional reasoning, and a 200K token context window.",pros:["Best reasoning ability","200K token context","Nuanced writing","Safe by design"],cons:["Usage limits on free tier","No image generation"],rating:4.8,popularity_score:95,link:"https://claude.ai",similar_tools:["ChatGPT","Gemini","Perplexity"],trending_reason:"Preferred by professionals for complex analysis" },
{ id:42,name:"Gemini",category:"Text",industry:"Business / Productivity",tags:["writing","essay","content","Google","multimodal","research","productivity"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:95,description:"Google's multimodal AI assistant integrated with Google Workspace for writing, research, and real-time web search.",pros:["Google Docs integration","Real-time web access","Free tier generous","Multimodal"],cons:["Less creative than Claude/GPT","Privacy concerns"],rating:4.5,popularity_score:90,link:"https://gemini.google.com",similar_tools:["ChatGPT","Claude","Perplexity"],trending_reason:"Best AI for Google Workspace users" },
{ id:43,name:"Jasper AI",category:"Text",industry:"Marketing",tags:["marketing","copywriting","content","blog","SEO","email","brand voice","ad copy"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:88,description:"Marketing-focused AI writing assistant for brands, blog content, ad copy, email sequences, and social media at scale.",pros:["Marketing templates","Brand voice training","Team collaboration","SEO integration"],cons:["Expensive plans","Less smart than GPT-4"],rating:4.2,popularity_score:72,link:"https://jasper.ai",similar_tools:["Copy.ai","Writesonic","ChatGPT"],trending_reason:"Preferred by marketing agencies for brand consistency" },
{ id:44,name:"Copy.ai",category:"Text",industry:"Marketing",tags:["copywriting","marketing","content","sales","email","ad copy","conversion"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:90,description:"AI copywriting tool for generating marketing copy, email sequences, sales scripts, and social captions at scale.",pros:["90+ specialized templates","Workflow automation","Multi-language support","Free tier"],cons:["Repetitive outputs at times","Limited context memory"],rating:4.0,popularity_score:65,link:"https://copy.ai",similar_tools:["Jasper AI","Writesonic","Claude"],trending_reason:"Popular for GTM teams and sales automation" },
{ id:45,name:"Perplexity AI",category:"Text",industry:"Research",tags:["research","search","citations","fact-checking","essay","academic research"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:93,description:"AI-powered research engine that provides cited, real-time answers sourced from the web for professional and academic research.",pros:["Real-time web search","Cites all sources","Free tier strong","Deep research mode"],cons:["Not for creative writing","Pro for advanced models"],rating:4.7,popularity_score:88,link:"https://perplexity.ai",similar_tools:["ChatGPT","Claude","Bing Copilot"],trending_reason:"Replacing Google for academic and fact-based research" },
{ id:46,name:"Grammarly",category:"Text",industry:"Education",tags:["grammar","writing","essay","proofreading","editing","clarity","plagiarism"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:97,description:"The leading AI writing assistant for grammar, spelling, tone, style, and clarity improvement across all platforms.",pros:["Best grammar checking","Works everywhere via extension","Tone detection","Plagiarism checker"],cons:["Advanced features expensive","Privacy concerns"],rating:4.6,popularity_score:93,link:"https://grammarly.com",similar_tools:["QuillBot","ProWritingAid","Hemingway"],trending_reason:"Standard tool in most professional writing workflows" },
{ id:47,name:"QuillBot",category:"Text",industry:"Education",tags:["paraphrase","essay","rewrite","summarize","grammar","academic writing","citation"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:92,description:"AI-powered paraphrasing and writing tool for rewriting, summarizing, and improving academic and professional text.",pros:["Excellent paraphrasing","Grammar checker included","Free tier strong","7 writing modes"],cons:["Not generative (needs input)","Word limits on free"],rating:4.4,popularity_score:84,link:"https://quillbot.com",similar_tools:["Grammarly","ChatGPT","Wordtune"],trending_reason:"Students' #1 tool for academic writing assistance" },
{ id:48,name:"Notion AI",category:"Text",industry:"Business / Productivity",tags:["writing","productivity","notes","summarize","planning","knowledge base","team wiki"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:91,description:"AI writing and thinking assistant built into Notion for drafting documents, summarizing content, and creating action plans.",pros:["Seamless Notion integration","Second brain capability","Team-friendly","Auto-summarize"],cons:["Requires Notion subscription","Limited standalone use"],rating:4.3,popularity_score:80,link:"https://notion.ai",similar_tools:["ChatGPT","Claude","Otter.ai"],trending_reason:"Teams replacing multiple tools with AI-powered Notion" },
{ id:49,name:"Gamma",category:"Text",industry:"Business / Productivity",tags:["presentation","slides","design","AI presentation","document","pitch deck"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:93,description:"Create stunning AI-generated presentations, documents, and webpages from a simple text prompt in seconds with auto-design.",pros:["Beautiful auto-design","One-click creation","Web-shareable link","Multiple output types"],cons:["Limited customization depth","Branding on free tier"],rating:4.4,popularity_score:78,link:"https://gamma.app",similar_tools:["Tome","Beautiful.ai","Canva AI"],trending_reason:"Fastest way to go from idea to polished presentation" },
{ id:50,name:"DeepL",category:"Text",industry:"Business / Productivity",tags:["translation","language","writing","localization","multilingual"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:96,description:"World's most accurate AI translator supporting 30+ languages with natural, contextually-aware translations.",pros:["Best-in-class accuracy","Natural language output","API for automation","Document translation"],cons:["Limited free characters per day"],rating:4.7,popularity_score:87,link:"https://deepl.com",similar_tools:["Google Translate","ChatGPT","Claude"],trending_reason:"Professional translators and global companies rely on it" },
{ id:51,name:"Writesonic",category:"Text",industry:"Marketing",tags:["blog","SEO","article","writing","content marketing","AI writer"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:87,description:"AI writer focused on SEO-optimized articles, blog posts, and web content generation at scale.",pros:["SEO optimization built-in","Factual article writing","Bulk content generation","Chatsonic"],cons:["Quality inconsistency","Higher tiers expensive"],rating:4.1,popularity_score:67,link:"https://writesonic.com",similar_tools:["Jasper AI","Copy.ai","Rytr"],trending_reason:"Content marketers scaling SEO blog production" },
{ id:52,name:"Bing Copilot",category:"Text",industry:"Business / Productivity",tags:["AI assistant","search","writing","Microsoft","free","productivity"],pricing:"free",skill_level:"beginner",output_type:"Text",ease_of_use:94,description:"Microsoft's free AI assistant powered by GPT-4. Available in Edge browser, Windows 11, and Bing search.",pros:["Completely free","GPT-4 powered","Web browsing","Image generation included"],cons:["Microsoft ecosystem focused","Less capable than ChatGPT Plus"],rating:4.3,popularity_score:82,link:"https://bing.com/copilot",similar_tools:["ChatGPT","Claude","Gemini"],trending_reason:"Most accessible free GPT-4 experience available" },
{ id:53,name:"Consensus AI",category:"Text",industry:"Research",tags:["research","academic","citations","science","papers","literature review"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:88,description:"AI-powered academic search engine that finds and summarizes peer-reviewed research papers with citations.",pros:["Real peer-reviewed papers","Evidence-based answers","Citation export","Free tier"],cons:["Science-focused only","Full access requires Pro"],rating:4.4,popularity_score:68,link:"https://consensus.app",similar_tools:["Perplexity AI","Research Rabbit","Elicit"],trending_reason:"Researchers use it for quick literature reviews" },
{ id:54,name:"Research Rabbit",category:"Text",industry:"Research",tags:["research","academic","citations","literature","papers","knowledge graph"],pricing:"free",skill_level:"beginner",output_type:"Text",ease_of_use:85,description:"Free AI tool for discovering academic papers, mapping citation networks, and organizing research visually.",pros:["Completely free","Visual citation maps","Collaborate with team","Email alerts"],cons:["Academic papers only","No writing tools included"],rating:4.4,popularity_score:67,link:"https://researchrabbit.ai",similar_tools:["Consensus AI","Elicit","Perplexity AI"],trending_reason:"PhD students love its citation network visualization" },
{ id:55,name:"Elicit",category:"Text",industry:"Research",tags:["research","academic","literature review","science","data extraction","papers"],pricing:"freemium",skill_level:"intermediate",output_type:"Text",ease_of_use:80,description:"AI research assistant for conducting systematic literature reviews and extracting structured data from papers.",pros:["Literature review automation","Structured data extraction","CSV export","Good for systematic reviews"],cons:["Science-focused only","Limited free papers"],rating:4.3,popularity_score:62,link:"https://elicit.com",similar_tools:["Consensus AI","Perplexity AI","ResearchRabbit"],trending_reason:"Medical researchers using it for evidence synthesis" },
{ id:56,name:"PDF.ai",category:"Text",industry:"Research",tags:["PDF","document analysis","research","Q&A","summarize","RAG"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:93,description:"Chat with any PDF document using AI. Upload research papers, contracts, or reports and ask questions.",pros:["Instant PDF analysis","Free tier","Citation extraction","Multi-PDF support"],cons:["Limited pages on free","Not for generation"],rating:4.3,popularity_score:74,link:"https://pdf.ai",similar_tools:["Claude","ChatGPT","Perplexity AI"],trending_reason:"Students and lawyers analyzing long documents instantly" },

// ── CODE / DEV ─────────────────────────────────────────────
{ id:60,name:"GitHub Copilot",category:"Code",industry:"Software Development",tags:["code","programming","autocomplete","developer","AI coding","IDE","pair programmer"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:85,description:"GitHub's AI pair programmer that suggests code completions, functions, and entire files inside your IDE in real-time.",pros:["Real-time completions","Supports all languages","IDE integration","Chat mode"],cons:["Subscription required","Can suggest buggy code"],rating:4.7,popularity_score:95,link:"https://github.com/features/copilot",similar_tools:["Cursor","Tabnine","Codeium"],trending_reason:"Standard AI coding tool at most tech companies" },
{ id:61,name:"Cursor",category:"Code",industry:"Software Development",tags:["code","programming","IDE","developer","AI coding","refactor","codebase AI","autonomous"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:82,description:"AI-first code editor built on VS Code that understands your entire codebase for smarter, context-aware code suggestions.",pros:["Full codebase awareness","Natural language edits","VS Code compatible","Composer agent mode"],cons:["Privacy (sends code to cloud)","Subscription for best models"],rating:4.8,popularity_score:91,link:"https://cursor.sh",similar_tools:["GitHub Copilot","Codeium","Windsurf"],trending_reason:"Fastest growing developer tool of 2024-2025" },
{ id:62,name:"Codeium",category:"Code",industry:"Software Development",tags:["code","programming","autocomplete","free coding AI","developer","IDE","multiple languages"],pricing:"free",skill_level:"intermediate",output_type:"Code",ease_of_use:86,description:"Free AI code completion tool that works with 70+ programming languages and integrates with most popular IDEs.",pros:["Completely free forever","Fast completion","Multiple IDEs","70+ languages"],cons:["Less context-aware than Cursor","Newer product ecosystem"],rating:4.3,popularity_score:74,link:"https://codeium.com",similar_tools:["GitHub Copilot","Tabnine","Cursor"],trending_reason:"Best free Copilot alternative for students" },
{ id:63,name:"v0 by Vercel",category:"Code",industry:"Software Development",tags:["UI","frontend","code","React","design","web app","components","shadcn"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:88,description:"Generate production-ready React UI components and full pages from text descriptions using Shadcn and Tailwind.",pros:["Beautiful UI output","Copy-paste ready code","Rapid prototyping","Shadcn integration"],cons:["Frontend only","Credits limit per month"],rating:4.6,popularity_score:85,link:"https://v0.dev",similar_tools:["Cursor","Lovable","Bolt.new"],trending_reason:"Go-to for rapidly building React UI mockups" },
{ id:64,name:"Lovable",category:"Code",industry:"Software Development",tags:["web app","code","fullstack","build","no-code","React","Supabase","deploy"],pricing:"freemium",skill_level:"beginner",output_type:"Code",ease_of_use:87,description:"Build complete full-stack web apps from a text description. Lovable handles frontend, backend, auth, and database.",pros:["Full-stack generation","Supabase integration","No-code friendly","Real-time preview"],cons:["Complex apps need manual editing","Credit limit system"],rating:4.5,popularity_score:83,link:"https://lovable.dev",similar_tools:["Bolt.new","Cursor","v0 by Vercel"],trending_reason:"Non-developers building real apps with no code" },
{ id:65,name:"Bolt.new",category:"Code",industry:"Software Development",tags:["web app","fullstack","code","build","deploy","in-browser IDE","instant preview"],pricing:"freemium",skill_level:"beginner",output_type:"Code",ease_of_use:88,description:"StackBlitz's AI that builds complete full-stack apps in the browser with instant live preview and one-click deployment.",pros:["In-browser IDE + preview","Multiple frameworks","Instant deployment","NPM packages"],cons:["Credits deplete fast","Very complex apps struggle"],rating:4.4,popularity_score:81,link:"https://bolt.new",similar_tools:["Lovable","Replit AI","Cursor"],trending_reason:"Viral for zero-to-deployed-app speed" },
{ id:66,name:"Replit AI",category:"Code",industry:"Software Development",tags:["code","programming","build","deploy","beginner coding","web app","cloud IDE"],pricing:"freemium",skill_level:"beginner",output_type:"Code",ease_of_use:91,description:"AI-powered coding environment in the browser. Build, run, and deploy apps without any local setup required.",pros:["Zero setup required","Instant deployment","Beginner-friendly","AI debugging"],cons:["Performance limits on free","Not for large projects"],rating:4.2,popularity_score:79,link:"https://replit.com",similar_tools:["GitHub Copilot","Cursor","Lovable"],trending_reason:"Top coding tool for students and bootcamp learners" },
{ id:67,name:"Windsurf",category:"Code",industry:"Software Development",tags:["code","IDE","AI coding","developer","agentic coding","autonomous"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:83,description:"Codeium's AI IDE with agentic coding capabilities that can autonomously plan, write, and execute multi-file code tasks.",pros:["Agentic workflows","Generous free tier","Fast completions","Multi-file edits"],cons:["Newer than competitors","Limited plugin ecosystem"],rating:4.5,popularity_score:77,link:"https://codeium.com/windsurf",similar_tools:["Cursor","GitHub Copilot","Replit AI"],trending_reason:"Growing fast as a free Cursor alternative" },
{ id:68,name:"Tabnine",category:"Code",industry:"Software Development",tags:["code","programming","autocomplete","privacy","enterprise","developer"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:82,description:"AI code assistant with private on-premise model options for enterprises with strict data privacy requirements.",pros:["Privacy-focused model","On-premise option","Enterprise-grade","Team features"],cons:["Less capable than Cursor/Copilot","Expensive enterprise tier"],rating:4.1,popularity_score:68,link:"https://tabnine.com",similar_tools:["GitHub Copilot","Codeium","Cursor"],trending_reason:"Enterprise teams with GDPR compliance needs" },
{ id:69,name:"Hugging Face",category:"Code",industry:"Software Development",tags:["AI models","open-source","machine learning","developer","NLP","model hub"],pricing:"free",skill_level:"advanced",output_type:"Code",ease_of_use:60,description:"The GitHub of AI. Hub for thousands of open-source models, datasets, ML demos, and Spaces deployments.",pros:["Massive model library","Free inference API","Active community","Spaces hosting"],cons:["Needs ML knowledge","Slow free inference tier"],rating:4.6,popularity_score:90,link:"https://huggingface.co",similar_tools:["Replicate","Cohere","OpenAI API"],trending_reason:"Central hub of the open-source AI ecosystem" },
{ id:70,name:"Replicate",category:"Code",industry:"Software Development",tags:["AI models","API","image generation","video AI","developer","run models"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:78,description:"Run open-source AI models with a simple API. Access Stable Diffusion, Llama, Whisper, and hundreds more.",pros:["Simple REST API","Access any open model","Pay-per-use pricing","Cold start solutions"],cons:["Can be expensive at scale","Cold starts on first call"],rating:4.4,popularity_score:76,link:"https://replicate.com",similar_tools:["Hugging Face","Together AI","Modal"],trending_reason:"Easiest way to integrate open-source AI into apps" },
{ id:71,name:"LangChain",category:"Code",industry:"Software Development",tags:["AI framework","LLM apps","developer","Python","chains","agents","RAG","open-source"],pricing:"free",skill_level:"advanced",output_type:"Code",ease_of_use:55,description:"The most popular open-source framework for building LLM-powered applications, agents, and RAG systems in Python/JS.",pros:["Industry standard framework","Huge ecosystem","Open source","Agent support"],cons:["Steep learning curve","Can be overly complex"],rating:4.4,popularity_score:85,link:"https://langchain.com",similar_tools:["LlamaIndex","Haystack","Semantic Kernel"],trending_reason:"Foundation for most production AI agent systems" },
{ id:72,name:"LlamaIndex",category:"Code",industry:"Software Development",tags:["RAG","LLM","data indexing","developer","Python","AI framework","knowledge base"],pricing:"free",skill_level:"advanced",output_type:"Code",ease_of_use:58,description:"Framework for building LLM-powered data agents and RAG systems with advanced indexing and retrieval strategies.",pros:["RAG-optimized","Multiple data connectors","Open source","LlamaCloud"],cons:["Complex for beginners","Frequent API changes"],rating:4.3,popularity_score:78,link:"https://llamaindex.ai",similar_tools:["LangChain","Haystack","Cohere"],trending_reason:"Preferred for complex multi-document RAG pipelines" },
{ id:73,name:"OpenAI API",category:"Code",industry:"Software Development",tags:["API","developer","GPT-4","AI integration","chatbot","image generation","text"],pricing:"freemium",skill_level:"advanced",output_type:"Code",ease_of_use:78,description:"Build applications with GPT-4, DALL-E, Whisper, and other OpenAI models via a comprehensive API platform.",pros:["Most capable models","Extensive documentation","Large developer ecosystem","Function calling"],cons:["Expensive at production scale","Rate limits"],rating:4.8,popularity_score:95,link:"https://platform.openai.com",similar_tools:["Claude API","Cohere","Gemini API"],trending_reason:"Foundation of most AI-powered startups and apps" },
{ id:74,name:"Framer AI",category:"Code",industry:"Design",tags:["web design","no-code","website","UI design","portfolio","landing page"],pricing:"freemium",skill_level:"beginner",output_type:"Code",ease_of_use:89,description:"AI-powered website builder that creates and customizes beautiful websites from text prompts with zero code.",pros:["Stunning modern designs","No-code friendly","Publishing built-in","CMS support"],cons:["Limited backend logic","Subscription for publish"],rating:4.4,popularity_score:78,link:"https://framer.com",similar_tools:["Webflow","Wix AI","v0 by Vercel"],trending_reason:"Designers' preferred no-code website builder" },
{ id:75,name:"CrewAI",category:"Code",industry:"Software Development",tags:["AI agents","multi-agent","developer","Python","autonomous","workflow"],pricing:"free",skill_level:"advanced",output_type:"Code",ease_of_use:60,description:"Framework for orchestrating role-based AI agents that collaborate to complete complex multi-step tasks.",pros:["Role-based agents","Easy orchestration","Open source","Production-ready"],cons:["Python required","Complex debugging"],rating:4.4,popularity_score:70,link:"https://crewai.com",similar_tools:["AutoGen","LangChain","LlamaIndex"],trending_reason:"Developers building autonomous business process automation" },
{ id:76,name:"Phind",category:"Code",industry:"Software Development",tags:["code","search","developer","debugging","programming","AI search"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:87,description:"AI search engine specifically built for developers. Ask coding questions and get code-first answers with context.",pros:["Developer-focused answers","Code examples inline","Free base tier","Web search integration"],cons:["Search-only (no IDE)","Pro for GPT-4 power"],rating:4.3,popularity_score:71,link:"https://phind.com",similar_tools:["Perplexity AI","GitHub Copilot","ChatGPT"],trending_reason:"Developers prefer it over Google for coding questions" },
{ id:77,name:"Webflow",category:"Code",industry:"Design",tags:["web design","no-code","website","CMS","design","professional website"],pricing:"freemium",skill_level:"intermediate",output_type:"Code",ease_of_use:72,description:"Professional no-code website builder with AI features for design, CMS, and ecommerce site creation.",pros:["Professional-grade output","CMS & ecommerce","Clean code export","SEO tools"],cons:["Significant learning curve","Hosting costs add up"],rating:4.3,popularity_score:81,link:"https://webflow.com",similar_tools:["Framer AI","v0 by Vercel","Wix AI"],trending_reason:"Agency standard for client website delivery" },
{ id:78,name:"Groq",category:"Code",industry:"Software Development",tags:["API","LLM","fast inference","developer","speed","Llama","open-source"],pricing:"freemium",skill_level:"advanced",output_type:"Code",ease_of_use:72,description:"Blazing-fast LLM inference using custom LPU hardware. Run Llama 3 at 500+ tokens/second for real-time apps.",pros:["Fastest LLM inference available","Free tier generous","Low latency","Great for chatbots"],cons:["Limited model selection","Not for image/video"],rating:4.5,popularity_score:74,link:"https://groq.com",similar_tools:["Together AI","Replicate","Hugging Face"],trending_reason:"Developers building real-time voice and chat AI apps" },

// ── AUDIO ──────────────────────────────────────────────────
{ id:80,name:"ElevenLabs",category:"Audio",industry:"Audio / Music",tags:["voice generation","text-to-speech","audio","podcast","narration","voice cloning","TTS"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:90,description:"The most realistic AI voice generator available. Clone voices and create natural text-to-speech audio in any language.",pros:["Incredibly realistic voices","Voice cloning from 1 min","API for production","50+ languages"],cons:["Expensive for high volume","Ethical cloning concerns"],rating:4.9,popularity_score:94,link:"https://elevenlabs.io",similar_tools:["PlayHT","Murf AI","Resemble AI"],trending_reason:"Industry standard for AI voiceover production" },
{ id:81,name:"Suno AI",category:"Audio",industry:"Audio / Music",tags:["music generation","song","audio","AI music","creative","full song","lyrics"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:95,description:"Generate complete songs with vocals, instruments, and lyrics from a simple text prompt. Full AI music creation.",pros:["Full songs with vocals","30+ genres","Easy to use","Custom lyrics"],cons:["Copyright ownership unclear","Limited fine-grained control"],rating:4.6,popularity_score:89,link:"https://suno.ai",similar_tools:["Udio","Musicfy","Soundraw"],trending_reason:"Went viral for generating hit-quality songs from prompts" },
{ id:82,name:"Udio",category:"Audio",industry:"Audio / Music",tags:["music generation","song","audio","AI music","diverse genres"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:91,description:"Create high-quality music tracks in any genre with AI. Strong competitor to Suno with unique style diversity.",pros:["High audio quality","Unique genre variety","Free credits daily","Remix feature"],cons:["Legal uncertainty on rights","Limited editing after generation"],rating:4.4,popularity_score:81,link:"https://udio.com",similar_tools:["Suno AI","Soundraw","Musicfy"],trending_reason:"Musicians using it for creative inspiration and demos" },
{ id:83,name:"Murf AI",category:"Audio",industry:"Audio / Music",tags:["voice generation","text-to-speech","narration","video voiceover","podcast","professional TTS"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:88,description:"Professional AI voiceover studio with 120+ realistic voices for presentations, videos, e-learning, and podcasts.",pros:["120+ voice options","Pitch & speed control","Team collaboration","SSML support"],cons:["Less natural than ElevenLabs","Watermark on free tier"],rating:4.4,popularity_score:76,link:"https://murf.ai",similar_tools:["ElevenLabs","PlayHT","Speechify"],trending_reason:"Preferred for eLearning and corporate training narration" },
{ id:84,name:"Descript",category:"Audio",industry:"Audio / Music",tags:["podcast","audio editing","transcription","video editing","voice clone","overdub"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:82,description:"Edit audio and video like a text document. Remove filler words, correct mistakes with AI voice cloning (Overdub).",pros:["Revolutionary text-based editing","Overdub voice cloning","Accurate transcription","Screen recording"],cons:["Expensive higher tiers","Complex for true beginners"],rating:4.5,popularity_score:78,link:"https://descript.com",similar_tools:["ElevenLabs","Adobe Podcast","Riverside.fm"],trending_reason:"Podcasters cutting editing time by 80%" },
{ id:85,name:"Adobe Podcast",category:"Audio",industry:"Audio / Music",tags:["podcast","audio quality","enhance","recording","voice clarity","noise removal"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:92,description:"Adobe's AI-powered podcast enhancement tool. Record, transcribe, and automatically enhance audio quality.",pros:["Amazing audio enhancement","Free to start","Web-based no install","Studio quality from laptop"],cons:["Primarily enhancement not creation","Advanced features require subscription"],rating:4.5,popularity_score:72,link:"https://podcast.adobe.com",similar_tools:["Descript","Riverside.fm","Podcastle"],trending_reason:"Makes laptop-recorded audio sound like a studio" },
{ id:86,name:"Otter.ai",category:"Audio",industry:"Business / Productivity",tags:["transcription","meeting notes","speech-to-text","Zoom","productivity","real-time"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:92,description:"Real-time meeting transcription and AI note-taking that integrates directly with Zoom, Meet, and Teams.",pros:["Real-time transcription","Speaker identification","Zoom/Meet integration","Summary generation"],cons:["Limited free minutes/month","Privacy concerns in meetings"],rating:4.3,popularity_score:79,link:"https://otter.ai",similar_tools:["Fireflies.ai","Notion AI","Fathom"],trending_reason:"Remote teams use it to auto-generate meeting notes" },
{ id:87,name:"Fathom",category:"Audio",industry:"Business / Productivity",tags:["meeting notes","recording","transcription","productivity","Zoom","free"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:93,description:"Free AI meeting recorder that auto-highlights and summarizes key moments from Zoom calls with action items.",pros:["Free tier very generous","Auto-highlights moments","Zoom integration native","CRM sync"],cons:["Primarily Zoom-focused","Limited cross-platform"],rating:4.5,popularity_score:73,link:"https://fathom.video",similar_tools:["Otter.ai","Fireflies.ai","Notion AI"],trending_reason:"Sales teams' favorite for call recording and CRM updates" },
{ id:88,name:"Krisp",category:"Audio",industry:"Business / Productivity",tags:["noise cancellation","audio","calls","meeting","background noise removal","productivity"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:94,description:"AI noise cancellation app that removes background noise, echo, and interruptions from any call in real-time.",pros:["Works with any app","Real-time processing","Free tier generous","Echo cancellation"],cons:["CPU intensive","Minutes limit on free tier"],rating:4.5,popularity_score:78,link:"https://krisp.ai",similar_tools:["Adobe Podcast","NVIDIA RTX Voice","Descript"],trending_reason:"Essential for remote workers in noisy environments" },
{ id:89,name:"Soundraw",category:"Audio",industry:"Audio / Music",tags:["music generation","royalty-free","background music","content creation","YouTube safe"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:88,description:"AI music generator for creating royalty-free background music for videos, games, podcasts, and content.",pros:["100% royalty-free license","Customizable BPM/mood/stems","Commercial license","Length control"],cons:["Less creative variety","Subscription for downloads"],rating:4.1,popularity_score:65,link:"https://soundraw.io",similar_tools:["Suno AI","Udio","Mubert"],trending_reason:"YouTubers and podcasters using it for safe background music" },
{ id:90,name:"PlayHT",category:"Audio",industry:"Audio / Music",tags:["voice generation","text-to-speech","voice cloning","podcast","narration","API"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:87,description:"AI voice generator with ultra-realistic voice cloning, 900+ voices, and WordPress/CMS integrations.",pros:["900+ AI voices","Ultra-realistic cloning","WordPress plugin","API for automation"],cons:["Pricing can be complex","Occasional audio artifacts"],rating:4.3,popularity_score:71,link:"https://play.ht",similar_tools:["ElevenLabs","Murf AI","Resemble AI"],trending_reason:"Podcasters and publishers automating voiceover production" },

// ── MARKETING ──────────────────────────────────────────────
{ id:100,name:"AdCreative.ai",category:"Other",industry:"Marketing",tags:["ad design","marketing","Facebook ads","Google ads","creative","conversion rate"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:88,description:"AI platform for generating high-converting ad creatives for Facebook, Google, Instagram, and LinkedIn campaigns.",pros:["Conversion-focused design","A/B test variants","Connected to ad platforms","Brand kit"],cons:["Pricey plans","Generic designs sometimes"],rating:4.3,popularity_score:71,link:"https://adcreative.ai",similar_tools:["Canva AI","Jasper AI","Copy.ai"],trending_reason:"Performance marketers scaling ad production" },
{ id:101,name:"Surfer SEO",category:"Other",industry:"Marketing",tags:["SEO","content optimization","keyword","blog","ranking","search engine","SERP"],pricing:"freemium",skill_level:"intermediate",output_type:"Text",ease_of_use:82,description:"AI-powered SEO tool that analyzes top-ranking pages and guides you to write content that ranks on Google.",pros:["Real SERP data analysis","Content score guide","Keyword research","NLP optimization"],cons:["Expensive plans","Requires SEO knowledge"],rating:4.5,popularity_score:78,link:"https://surferseo.com",similar_tools:["Jasper AI","Writesonic","Semrush"],trending_reason:"Content teams guaranteeing first-page Google rankings" },
{ id:102,name:"Semrush AI",category:"Other",industry:"Marketing",tags:["SEO","market research","competitor analysis","keyword","digital marketing","PPC"],pricing:"freemium",skill_level:"intermediate",output_type:"Text",ease_of_use:75,description:"Comprehensive digital marketing suite with AI tools for SEO, competitive analysis, PPC, and content marketing.",pros:["Industry-standard tool","Huge data set","AI writing assistant","Competitor intelligence"],cons:["Very expensive","Overwhelming for beginners"],rating:4.5,popularity_score:85,link:"https://semrush.com",similar_tools:["Surfer SEO","Ahrefs","Moz"],trending_reason:"Standard for digital marketing agencies worldwide" },
{ id:103,name:"Zapier AI",category:"Other",industry:"Business / Productivity",tags:["automation","workflow","integration","productivity","no-code","business tools","zaps"],pricing:"freemium",skill_level:"beginner",output_type:"Other",ease_of_use:83,description:"Automate workflows between 6000+ apps using AI. Zapier's AI can build automations from plain English descriptions.",pros:["6000+ app integrations","AI builds zaps for you","No-code","Reliability"],cons:["Expensive for many tasks","Latency in automations"],rating:4.5,popularity_score:88,link:"https://zapier.com",similar_tools:["Make.com","n8n","Activepieces"],trending_reason:"Businesses automating repetitive tasks with AI triggers" },
{ id:104,name:"Make.com",category:"Other",industry:"Business / Productivity",tags:["automation","workflow","integration","no-code","visual builder","business"],pricing:"freemium",skill_level:"intermediate",output_type:"Other",ease_of_use:75,description:"Visual workflow automation platform connecting apps with AI steps. More powerful and affordable than Zapier.",pros:["Visual drag-and-drop","More affordable than Zapier","Complex logic support","AI modules built-in"],cons:["Learning curve higher","Less apps than Zapier"],rating:4.4,popularity_score:79,link:"https://make.com",similar_tools:["Zapier AI","n8n","Activepieces"],trending_reason:"Power users building complex multi-step automations" },
{ id:105,name:"Microsoft Copilot 365",category:"Text",industry:"Business / Productivity",tags:["productivity","Word","Excel","PowerPoint","email","Microsoft","Office AI"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:92,description:"AI assistant embedded across Word, Excel, PowerPoint, Outlook, and Teams. Drafts docs, analyzes data, and runs meetings.",pros:["Integrated across all Office apps","Powerful Excel analysis","Meeting summaries in Teams","Enterprise security"],cons:["Requires M365 subscription","Privacy concerns"],rating:4.5,popularity_score:87,link:"https://microsoft.com/copilot",similar_tools:["Notion AI","ChatGPT","Gemini"],trending_reason:"Enterprise standard for AI-augmented office productivity" },
{ id:106,name:"Fireflies.ai",category:"Audio",industry:"Business / Productivity",tags:["meeting notes","transcription","productivity","collaboration","CRM","action items"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:90,description:"AI meeting assistant that records, transcribes, and summarizes all your meetings with searchable conversation intelligence.",pros:["Auto-joins meetings","Action item extraction","CRM integrations","Search conversations"],cons:["Privacy concerns in meetings","Accuracy varies"],rating:4.3,popularity_score:74,link:"https://fireflies.ai",similar_tools:["Otter.ai","Notion AI","Fathom"],trending_reason:"Sales teams using it for call coaching and deal intelligence" },
{ id:107,name:"Beautiful.ai",category:"Text",industry:"Business / Productivity",tags:["presentation","slides","design","business","smart slides","deck"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:90,description:"Smart presentation software that automatically formats and designs slides as you type content.",pros:["Auto-formatting intelligence","Professional templates","Real-time collaboration","AI suggestions"],cons:["Less generative than Gamma","Subscription required"],rating:4.1,popularity_score:65,link:"https://beautiful.ai",similar_tools:["Gamma","Tome","Canva AI"],trending_reason:"Business teams making polished decks without designers" },
{ id:108,name:"ClickUp AI",category:"Other",industry:"Business / Productivity",tags:["project management","AI productivity","task management","team","automation"],pricing:"freemium",skill_level:"beginner",output_type:"Other",ease_of_use:82,description:"Project management platform with built-in AI for writing docs, summarizing tasks, and generating action plans.",pros:["Project management + AI","Summarize long threads","Auto-generate subtasks","Free tier strong"],cons:["Complex UI","Feature overload possible"],rating:4.2,popularity_score:73,link:"https://clickup.com",similar_tools:["Notion AI","Monday.com AI","Asana AI"],trending_reason:"Teams replacing multiple tools with one AI-powered PM system" },
{ id:109,name:"Loom AI",category:"Video",industry:"Business / Productivity",tags:["screen recording","async video","AI summary","team communication","documentation"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:93,description:"AI-powered async video messaging with automatic transcription, summaries, and action item extraction.",pros:["AI meeting summaries","Quick screen recording","Team sharing","Instant transcription"],cons:["Limited free videos","Paid for long recordings"],rating:4.4,popularity_score:76,link:"https://loom.com",similar_tools:["Descript","Otter.ai","Fathom"],trending_reason:"Remote teams replacing long emails with AI video messages" },

// ── MECHANICAL / ENGINEERING ───────────────────────────────
{ id:120,name:"Autodesk AI",category:"Other",industry:"Mechanical / Engineering",tags:["CAD","engineering","design","simulation","3D modeling","generative design"],pricing:"freemium",skill_level:"advanced",output_type:"Other",ease_of_use:55,description:"Autodesk's suite of AI tools for generative design, simulation, and automated drafting in Fusion 360 and more.",pros:["Industry standard","Generative design","Simulation built-in","Cloud rendering"],cons:["Very expensive","Steep learning curve","Professional audience"],rating:4.4,popularity_score:70,link:"https://autodesk.com/ai",similar_tools:["SolidWorks AI","Ansys","Onshape"],trending_reason:"Engineers using AI generative design to reduce material waste" },
{ id:121,name:"Ansys AI",category:"Other",industry:"Mechanical / Engineering",tags:["simulation","engineering","FEA","CFD","physics simulation","stress analysis"],pricing:"freemium",skill_level:"advanced",output_type:"Other",ease_of_use:45,description:"AI-augmented engineering simulation platform for FEA, CFD, and multiphysics analysis used in aerospace and automotive.",pros:["Industry-leading simulation","AI-guided meshing","Multiphysics","Accurate results"],cons:["Extremely expensive","Requires engineering degree","Complex setup"],rating:4.5,popularity_score:62,link:"https://ansys.com",similar_tools:["Autodesk AI","COMSOL","SimScale"],trending_reason:"Aerospace and automotive adopting AI-guided simulation" },
{ id:122,name:"SimScale",category:"Other",industry:"Mechanical / Engineering",tags:["simulation","CFD","FEA","cloud engineering","thermal","structural"],pricing:"freemium",skill_level:"advanced",output_type:"Other",ease_of_use:60,description:"Cloud-based AI-powered engineering simulation platform for CFD, FEA, and thermal analysis accessible via browser.",pros:["Cloud-based (no GPU needed)","Freemium access","Collaboration features","Good tutorials"],cons:["Limited free core hours","Less accurate than Ansys"],rating:4.1,popularity_score:52,link:"https://simscale.com",similar_tools:["Ansys AI","Autodesk AI","COMSOL"],trending_reason:"Startups doing engineering simulation without expensive hardware" },
{ id:123,name:"Onshape AI",category:"Other",industry:"Mechanical / Engineering",tags:["CAD","3D modeling","engineering","cloud CAD","collaboration","product design"],pricing:"freemium",skill_level:"advanced",output_type:"Other",ease_of_use:65,description:"Cloud-native CAD platform with AI features for parametric design, version control, and team collaboration.",pros:["Cloud-native (browser-based)","Version control built-in","Team collaboration","Free for public projects"],cons:["Requires internet","Less powerful than Fusion 360"],rating:4.2,popularity_score:55,link:"https://onshape.com",similar_tools:["Autodesk AI","SolidWorks","Fusion 360"],trending_reason:"Engineering schools and startups using cloud CAD" },
{ id:124,name:"Clearly AI",category:"Other",industry:"Mechanical / Engineering",tags:["CAD automation","engineering","design","3D","AI-assisted CAD","mechanical"],pricing:"freemium",skill_level:"advanced",output_type:"Other",ease_of_use:52,description:"AI-powered CAD automation platform that converts design specifications into 3D models and engineering drawings.",pros:["Automates repetitive CAD tasks","Reduces design time","Integrates with major CAD tools","API available"],cons:["Limited to specific domains","Requires CAD knowledge"],rating:4.0,popularity_score:45,link:"https://clearly.ai",similar_tools:["Autodesk AI","Onshape AI","SimScale"],trending_reason:"Mechanical engineers automating repetitive design tasks" },

// ── DATA / AI / ML ─────────────────────────────────────────
{ id:130,name:"Cohere",category:"Code",industry:"Software Development",tags:["NLP","embeddings","API","developer","enterprise AI","text classification","RAG"],pricing:"freemium",skill_level:"advanced",output_type:"Code",ease_of_use:65,description:"Enterprise AI platform for building NLP applications, semantic search, RAG systems, and text classification.",pros:["Enterprise-grade reliability","Custom fine-tuning","Multilingual","RAG-optimized"],cons:["Not beginner-friendly","Complex pricing tiers"],rating:4.3,popularity_score:67,link:"https://cohere.com",similar_tools:["OpenAI API","Anthropic API","Hugging Face"],trending_reason:"Popular for enterprise RAG and semantic search" },
{ id:131,name:"DataRobot",category:"Other",industry:"Software Development",tags:["machine learning","AutoML","data science","prediction","enterprise AI","no-code ML"],pricing:"freemium",skill_level:"intermediate",output_type:"Other",ease_of_use:68,description:"Automated machine learning platform that builds, deploys, and monitors predictive models without deep ML expertise.",pros:["AutoML pipeline","No deep ML knowledge needed","Enterprise MLOps","Explainability"],cons:["Expensive enterprise","Limited free tier"],rating:4.3,popularity_score:65,link:"https://datarobot.com",similar_tools:["H2O.ai","Amazon SageMaker","Google AutoML"],trending_reason:"Business analysts building ML models without data science teams" },
{ id:132,name:"Tableau AI",category:"Other",industry:"Software Development",tags:["data visualization","analytics","BI","dashboard","AI insights","data analysis"],pricing:"freemium",skill_level:"intermediate",output_type:"Other",ease_of_use:72,description:"Tableau's AI-powered analytics features for automated insights, natural language queries, and intelligent dashboards.",pros:["Industry-standard BI tool","Natural language queries","AI-powered insights","Large ecosystem"],cons:["Very expensive","Complex for beginners"],rating:4.4,popularity_score:80,link:"https://tableau.com",similar_tools:["Power BI AI","Looker","Metabase"],trending_reason:"Enterprises using AI to democratize data analytics" },
{ id:133,name:"Julius AI",category:"Other",industry:"Software Development",tags:["data analysis","Python","charts","statistics","data science","visualization"],pricing:"freemium",skill_level:"beginner",output_type:"Other",ease_of_use:82,description:"AI data analyst that runs Python code to analyze your CSV/Excel data, create charts, and generate statistical insights.",pros:["Natural language data analysis","Runs real Python code","Chart generation","Statistical tests"],cons:["Limited free queries","Advanced analysis needs Pro"],rating:4.3,popularity_score:68,link:"https://julius.ai",similar_tools:["ChatGPT Code Interpreter","Tableau AI","Claude"],trending_reason:"Non-technical users analyzing data with natural language" },
{ id:134,name:"Together AI",category:"Code",industry:"Software Development",tags:["API","LLM","open-source models","developer","inference","fast AI"],pricing:"freemium",skill_level:"advanced",output_type:"Code",ease_of_use:70,description:"Fast inference platform for open-source LLMs. Run Llama, Mixtral, and other models via API at high speed.",pros:["Fast inference","Open model access","Competitive pricing","Fine-tuning support"],cons:["Technical knowledge needed","No GUI interface"],rating:4.4,popularity_score:69,link:"https://together.ai",similar_tools:["Replicate","Hugging Face","Groq"],trending_reason:"Developers needing fast, affordable open-source LLM inference" },

// ── RESEARCH TOOLS ─────────────────────────────────────────
{ id:140,name:"Scite AI",category:"Text",industry:"Research",tags:["research","citations","academic","science","paper analysis","smart citations"],pricing:"freemium",skill_level:"intermediate",output_type:"Text",ease_of_use:80,description:"AI-powered research tool that provides smart citation analysis showing whether papers support or contradict each other.",pros:["Smart citation analysis","Supporting vs contradicting","Database of 1.2B citations","Custom dashboards"],cons:["Subscription for full access","Academic niche"],rating:4.3,popularity_score:58,link:"https://scite.ai",similar_tools:["Research Rabbit","Elicit","Consensus AI"],trending_reason:"Researchers validating paper claims with citation intelligence" },
{ id:141,name:"Semantic Scholar",category:"Text",industry:"Research",tags:["research","papers","academic","AI","semantic search","citations"],pricing:"free",skill_level:"beginner",output_type:"Text",ease_of_use:85,description:"AI-powered academic research tool by Allen Institute for AI. Find and understand research papers with semantic search.",pros:["Completely free","Semantic search","AI paper summaries","1 billion papers indexed"],cons:["Read-only (no writing tools)","Some niche topics missing"],rating:4.4,popularity_score:72,link:"https://semanticscholar.org",similar_tools:["Research Rabbit","Consensus AI","Elicit"],trending_reason:"Academics finding related papers across disciplines" },
{ id:142,name:"SciSpace",category:"Text",industry:"Research",tags:["research","paper reader","AI","explain","literature","summarize papers"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:88,description:"AI research assistant that explains complex research papers in simple language and helps with literature reviews.",pros:["Explains complex papers simply","Chat with any PDF","Literature search","Co-pilot mode"],cons:["Limited free queries","Less comprehensive than Elicit"],rating:4.3,popularity_score:65,link:"https://scispace.com",similar_tools:["Elicit","PDF.ai","Consensus AI"],trending_reason:"Students understanding complex academic papers instantly" },
{ id:143,name:"Sourcely",category:"Text",industry:"Research",tags:["citations","academic","research","sources","essay","bibliography"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:89,description:"AI citation and source finder that locates relevant academic sources for your essay or research topic.",pros:["Quick source discovery","Citation formatting","Relevant to your text","Easy to use"],cons:["Not all sources verified","Limited free credits"],rating:4.0,popularity_score:55,link:"https://sourcely.net",similar_tools:["Research Rabbit","Consensus AI","QuillBot"],trending_reason:"Students finding citations for their essays quickly" },

// ── ADDITIONAL PRODUCTIVITY / OTHER ────────────────────────
{ id:150,name:"Character.AI",category:"Text",industry:"Education",tags:["chatbot","roleplay","creative writing","entertainment","AI characters"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:93,description:"Create and chat with AI characters and personas for entertainment, creative writing, and educational roleplay.",pros:["Millions of characters","Creative writing aid","Free to use","Community characters"],cons:["Not for professional use","Content restrictions"],rating:4.2,popularity_score:82,link:"https://character.ai",similar_tools:["ChatGPT","Claude","Replika"],trending_reason:"Most popular AI entertainment platform for Gen Z" },
{ id:151,name:"Mixo",category:"Code",industry:"Marketing",tags:["website","startup","landing page","MVP","no-code","waitlist"],pricing:"freemium",skill_level:"beginner",output_type:"Code",ease_of_use:95,description:"Launch an AI-generated landing page for your startup idea in 30 seconds. Perfect for validating MVPs.",pros:["Instant launch","Email waitlist collection","Startup-optimized","No coding needed"],cons:["Very simple pages only","Limited customization"],rating:4.0,popularity_score:60,link:"https://mixo.io",similar_tools:["Framer AI","Wix AI","Carrd"],trending_reason:"Entrepreneurs validating startup ideas before building" },
{ id:152,name:"Speechify",category:"Audio",industry:"Education",tags:["text-to-speech","reading","accessibility","speed reading","audiobook"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:93,description:"Text-to-speech app that reads any document, article, or ebook aloud at high speeds with natural voices.",pros:["Speed reading capability","Cross-platform sync","Celebrity voices (paid)","Dyslexia-friendly"],cons:["Best voices behind paywall","Not for content production"],rating:4.3,popularity_score:75,link:"https://speechify.com",similar_tools:["ElevenLabs","Murf AI","NaturalReader"],trending_reason:"Students with dyslexia and ADHD consuming content audibly" },
{ id:153,name:"Topaz Photo AI",category:"Image",industry:"Design",tags:["photo enhancement","noise reduction","upscaling","photography","sharpening"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:85,description:"Professional AI photo enhancement software for noise reduction, sharpening, and upscaling for photographers.",pros:["Professional-grade quality","Batch processing","Desktop app","Lightroom plugin"],cons:["Paid software (one-time)","No image generation"],rating:4.5,popularity_score:74,link:"https://topazlabs.com/topaz-photo-ai",similar_tools:["Magnific AI","Adobe Firefly","Clipdrop"],trending_reason:"Professional photographers' standard for AI post-processing" },
{ id:154,name:"Gamma 2.0",category:"Text",industry:"Business / Productivity",tags:["presentation","document","website","AI design","slides","pitch"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:93,description:"Gamma's latest version with improved AI redesign, template variety, and multi-format output including decks, docs, and web pages.",pros:["Multi-format output","AI redesign button","Easy sharing","Analytics on views"],cons:["Branding on free tier","Limited custom design"],rating:4.5,popularity_score:76,link:"https://gamma.app",similar_tools:["Tome","Canva AI","Beautiful.ai"],trending_reason:"Fastest growing AI presentation tool for startups" },
{ id:155,name:"Captions AI",category:"Video",industry:"Video Editing",tags:["subtitles","captions","video","social media","auto-captions","TikTok"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:94,description:"AI-powered automatic caption and subtitle generator for videos with animated captions for social media.",pros:["Animated captions","High accuracy","Social-optimized styles","Fast processing"],cons:["Limited free exports","Subscription for advanced styles"],rating:4.4,popularity_score:77,link:"https://captions.ai",similar_tools:["CapCut AI","Descript","Adobe Premiere AI"],trending_reason:"Content creators boosting engagement with animated captions" },
{ id:156,name:"Luma Dream Machine",category:"Video",industry:"Video Editing",tags:["video generation","AI video","realistic","cinematic","photo to video"],pricing:"freemium",skill_level:"beginner",output_type:"Video",ease_of_use:88,description:"Generate high-quality cinematic videos from images and text with Luma's Dream Machine model.",pros:["Photorealistic output","Easy to use","Fast generation","NeRF technology"],cons:["Short clips only","Watermark on free tier"],rating:4.4,popularity_score:79,link:"https://lumalabs.ai/dream-machine",similar_tools:["Runway ML","Pika Labs","Sora"],trending_reason:"Best for animating product photography" },
{ id:157,name:"Wordtune",category:"Text",industry:"Education",tags:["writing","rewrite","paraphrase","editing","tone","clarity"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:91,description:"AI writing companion that suggests intelligent rewrites and improvements for your sentences in real-time.",pros:["Instant inline suggestions","Multiple tone modes","Browser extension","Multilingual"],cons:["Limited free rewrites daily","Not as powerful as Claude/GPT"],rating:4.1,popularity_score:64,link:"https://wordtune.com",similar_tools:["QuillBot","Grammarly","Claude"],trending_reason:"Non-native English writers improving fluency" },
{ id:158,name:"Hemingway Editor",category:"Text",industry:"Education",tags:["writing","editing","clarity","readability","essay","simplify"],pricing:"free",skill_level:"beginner",output_type:"Text",ease_of_use:96,description:"Writing editor that highlights overly complex sentences and helps improve clarity and readability score.",pros:["Free web version","Simple focused interface","Readability grade score","Writer-friendly"],cons:["Not generative (needs your text)","Very basic AI features"],rating:4.2,popularity_score:68,link:"https://hemingwayapp.com",similar_tools:["Grammarly","QuillBot","Wordtune"],trending_reason:"Writers achieving clear, punchy prose style" },
{ id:159,name:"Midjourney Niji",category:"Image",industry:"Design",tags:["anime","illustration","art","manga","character design","image generation"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:83,description:"Midjourney's specialized anime and illustration model optimized for manga-style art and character design.",pros:["Best anime-style output","Consistent characters","Multiple modes","Active community"],cons:["Discord interface","Subscription required"],rating:4.7,popularity_score:81,link:"https://midjourney.com",similar_tools:["Midjourney","Leonardo AI","NovelAI"],trending_reason:"Go-to for anime content creators and artists" },
{ id:160,name:"Eleven Dubbing",category:"Audio",industry:"Audio / Music",tags:["dubbing","translation","video","localization","voice","multilingual"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:85,description:"ElevenLabs' AI dubbing service that translates and re-voices video content into 30+ languages automatically.",pros:["30+ language dubbing","Voice preservation","Lip sync alignment","Fast turnaround"],cons:["Expensive per minute","Accent accuracy varies"],rating:4.5,popularity_score:76,link:"https://elevenlabs.io/dubbing",similar_tools:["HeyGen","Murf AI","PlayHT"],trending_reason:"YouTubers dubbing content into Spanish and Portuguese" },
{ id:161,name:"Poe by Quora",category:"Text",industry:"Business / Productivity",tags:["chatbot","AI tools","Claude","GPT","multi-model","AI hub"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:93,description:"Poe aggregates multiple AI chatbots in one platform. Access Claude, GPT-4, Gemini, and others plus custom bots.",pros:["Multiple AIs in one place","Build custom bots","Free daily messages","Creator marketplace"],cons:["Not all models unlimited free","Rate limited on free tier"],rating:4.3,popularity_score:74,link:"https://poe.com",similar_tools:["ChatGPT","Claude","Gemini"],trending_reason:"Power users comparing different AI models daily" },
{ id:162,name:"Skybox AI",category:"Image",industry:"Design",tags:["360 image","panorama","game design","VR","environment","skybox"],pricing:"freemium",skill_level:"intermediate",output_type:"Image",ease_of_use:78,description:"Generate 360° panoramic skyboxes and environments for games, VR experiences, and interactive applications.",pros:["Unique 360° output","Game-ready format","Multiple art styles","Fast generation"],cons:["Niche use case","Expensive premium plan"],rating:4.1,popularity_score:56,link:"https://skybox.blockadelabs.com",similar_tools:["Midjourney","Stable Diffusion","Leonardo AI"],trending_reason:"Game developers using it for rapid world-building" },
{ id:163,name:"Civitai",category:"Image",industry:"Design",tags:["stable diffusion","models","LoRA","community","AI art","custom models"],pricing:"free",skill_level:"advanced",output_type:"Image",ease_of_use:55,description:"The largest community platform for sharing and discovering Stable Diffusion models, LoRAs, and AI art.",pros:["Thousands of free models","Active community","LoRA & checkpoint sharing","Tutorials"],cons:["Adult content present","Requires SD knowledge"],rating:4.4,popularity_score:80,link:"https://civitai.com",similar_tools:["Hugging Face","Stable Diffusion","Leonardo AI"],trending_reason:"AI artists sharing and discovering fine-tuned models" },
{ id:164,name:"Looka",category:"Image",industry:"Design",tags:["logo","brand","design","business","identity","logo maker"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:92,description:"AI-powered logo and brand identity generator. Create professional logos and brand kits in minutes.",pros:["Brand kit included","Professional quality","Many variations","Social media assets"],cons:["Expensive for full rights","Generic styles"],rating:4.1,popularity_score:68,link:"https://looka.com",similar_tools:["Canva AI","Tailwind Brands","Brandmark"],trending_reason:"Small businesses building brand identity without designers" },
{ id:165,name:"n8n",category:"Code",industry:"Software Development",tags:["automation","workflow","developer","open-source","self-hosted","integration"],pricing:"free",skill_level:"advanced",output_type:"Code",ease_of_use:60,description:"Open-source workflow automation platform with AI nodes. Self-hostable alternative to Zapier for developers.",pros:["Self-hosted option","Open source","AI nodes built-in","500+ integrations"],cons:["Complex for non-developers","Server management needed"],rating:4.4,popularity_score:72,link:"https://n8n.io",similar_tools:["Zapier AI","Make.com","Activepieces"],trending_reason:"Dev teams building internal AI automation pipelines" },
{ id:166,name:"AutoDraw",category:"Image",industry:"Education",tags:["drawing","sketch","design","free","simple","illustration","kids"],pricing:"free",skill_level:"beginner",output_type:"Image",ease_of_use:99,description:"Google's AI drawing tool that recognizes rough sketches and suggests professional vector illustrations instantly.",pros:["Completely free","No account needed","Instant recognition","Kid-friendly"],cons:["Very basic functionality","Limited illustration library"],rating:3.8,popularity_score:54,link:"https://autodraw.com",similar_tools:["Canva AI","Midjourney","Excalidraw"],trending_reason:"Teachers and students using it for quick visual communication" },
{ id:167,name:"Mem AI",category:"Text",industry:"Business / Productivity",tags:["notes","knowledge management","AI memory","productivity","second brain"],pricing:"freemium",skill_level:"beginner",output_type:"Text",ease_of_use:84,description:"AI-powered notes app that automatically organizes your knowledge and surfaces relevant information when needed.",pros:["Auto-organization","Connected notes","AI search","Always-on memory"],cons:["Subscription for best features","Limited free tier"],rating:4.1,popularity_score:58,link:"https://mem.ai",similar_tools:["Notion AI","Obsidian AI","Roam Research"],trending_reason:"Knowledge workers building AI-connected personal knowledge bases" },
{ id:168,name:"Stable Audio",category:"Audio",industry:"Audio / Music",tags:["music generation","audio","sound design","open-source","Stability AI"],pricing:"freemium",skill_level:"intermediate",output_type:"Audio",ease_of_use:75,description:"Stability AI's music and audio generation model for creating long-form audio tracks and sound effects.",pros:["High quality output","Open source model","Sound design capable","Long-form audio"],cons:["Technical setup for local","Limited free tier"],rating:4.2,popularity_score:66,link:"https://stableaudio.com",similar_tools:["Suno AI","Udio","Mubert"],trending_reason:"Sound designers using it for unique audio effects" },
{ id:169,name:"Mubert",category:"Audio",industry:"Audio / Music",tags:["music generation","ambient","background music","streaming","royalty-free","continuous"],pricing:"freemium",skill_level:"beginner",output_type:"Audio",ease_of_use:89,description:"AI-generated continuous background music streaming for work, streams, content creation, and apps.",pros:["Continuous streaming","Royalty-free for commercial","Genre variety","API for apps"],cons:["Less customizable per track","Subscription for download rights"],rating:4.0,popularity_score:62,link:"https://mubert.com",similar_tools:["Soundraw","Suno AI","Epidemicsound"],trending_reason:"Streamers and remote workers using as focus music" },
{ id:170,name:"Playground AI",category:"Image",industry:"Design",tags:["image generation","free","SDXL","design","photo editing","canvas"],pricing:"freemium",skill_level:"beginner",output_type:"Image",ease_of_use:84,description:"Free AI image generator with access to multiple models including SDXL and Playground v3 with canvas editor.",pros:["Generous free tier","Multiple models","Canvas editor","Community feed"],cons:["Limited advanced features","Daily credit cap"],rating:4.2,popularity_score:71,link:"https://playground.com",similar_tools:["Leonardo AI","Stable Diffusion","Midjourney"],trending_reason:"Budget-conscious creators getting Midjourney-quality for free" },
];

// ════════════════════════════════════════════════════════════
// WORKFLOW TEMPLATES
// ════════════════════════════════════════════════════════════
const WORKFLOW_TEMPLATES = [
  { match:["youtube","faceless video","youtube video","create video","ai video channel"], title:"Create a YouTube Video", steps:[
    { step:1,label:"Script",tool:"ChatGPT",desc:"Generate a compelling video script with hook, body, and CTA using GPT-4." },
    { step:2,label:"Voiceover",tool:"ElevenLabs",desc:"Convert your script to a natural, studio-quality AI voiceover." },
    { step:3,label:"Video",tool:"InVideo AI",desc:"Generate or compile video footage with your voiceover automatically." },
    { step:4,label:"Thumbnail",tool:"Midjourney",desc:"Design an eye-catching thumbnail to maximize click-through rate." },
    { step:5,label:"Captions",tool:"Captions AI",desc:"Auto-generate animated captions for accessibility and engagement." },
  ]},
  { match:["logo","brand identity","branding","brand design"], title:"Build a Brand Identity", steps:[
    { step:1,label:"Research",tool:"Perplexity AI",desc:"Research competitors and define your brand positioning." },
    { step:2,label:"Logo Concepts",tool:"Midjourney",desc:"Generate 20+ logo concepts from your brand brief." },
    { step:3,label:"Text Logo",tool:"Ideogram",desc:"Add text and typography to your chosen logo concept." },
    { step:4,label:"Brand Assets",tool:"Canva AI",desc:"Build out your full brand kit: colors, fonts, templates." },
    { step:5,label:"Website",tool:"Framer AI",desc:"Launch a branded website with your new identity." },
  ]},
  { match:["essay","academic paper","thesis","research paper","literature review"], title:"Write an Academic Essay", steps:[
    { step:1,label:"Literature",tool:"Research Rabbit",desc:"Map the academic literature and find key papers." },
    { step:2,label:"Synthesis",tool:"Consensus AI",desc:"Get AI-summarized evidence from peer-reviewed sources." },
    { step:3,label:"Outline",tool:"Claude",desc:"Generate a structured essay outline with arguments." },
    { step:4,label:"Draft",tool:"ChatGPT",desc:"Write full essay sections from your outline." },
    { step:5,label:"Polish",tool:"Grammarly",desc:"Fix grammar, improve clarity, and check for plagiarism." },
  ]},
  { match:["web app","build app","startup app","mvp","website build","full stack","fullstack"], title:"Build a Web App", steps:[
    { step:1,label:"Plan",tool:"ChatGPT",desc:"Define requirements, user flows, and choose your tech stack." },
    { step:2,label:"UI Design",tool:"v0 by Vercel",desc:"Generate React UI components from natural language." },
    { step:3,label:"Build",tool:"Lovable",desc:"Generate full-stack app with backend, auth, and database." },
    { step:4,label:"Debug",tool:"Cursor",desc:"Use AI IDE to fix bugs and add features intelligently." },
    { step:5,label:"Launch",tool:"Mixo",desc:"Create a landing page to collect early user signups." },
  ]},
  { match:["marketing campaign","ad campaign","social media campaign","promote","ads"], title:"Launch a Marketing Campaign", steps:[
    { step:1,label:"Strategy",tool:"Claude",desc:"Develop a full campaign brief with target audience and messaging." },
    { step:2,label:"Copywriting",tool:"Jasper AI",desc:"Generate ad copy, email sequences, and social captions." },
    { step:3,label:"Visuals",tool:"Adobe Firefly",desc:"Create on-brand campaign images for all ad formats." },
    { step:4,label:"Video Ads",tool:"HeyGen",desc:"Create spokesperson video ads with AI avatars." },
    { step:5,label:"SEO",tool:"Surfer SEO",desc:"Optimize your landing page content for search rankings." },
  ]},
  { match:["podcast","launch podcast","start podcast","audio show"], title:"Launch a Podcast", steps:[
    { step:1,label:"Script",tool:"Claude",desc:"Write engaging episode scripts with questions and segments." },
    { step:2,label:"Record",tool:"Adobe Podcast",desc:"Record your voice and auto-enhance audio quality." },
    { step:3,label:"Edit",tool:"Descript",desc:"Edit podcast by editing transcript, remove filler words." },
    { step:4,label:"Music",tool:"Soundraw",desc:"Generate royalty-free intro and background music." },
    { step:5,label:"Promote",tool:"InVideo AI",desc:"Turn podcast clips into short-form video content." },
  ]},
  { match:["pitch deck","investor presentation","startup pitch","slides","presentation"], title:"Create a Pitch Deck", steps:[
    { step:1,label:"Structure",tool:"ChatGPT",desc:"Outline your pitch deck narrative and key slides." },
    { step:2,label:"Generate",tool:"Gamma",desc:"Auto-design a beautiful pitch deck from your outline." },
    { step:3,label:"Data Insights",tool:"Claude",desc:"Interpret market data and suggest chart formats." },
    { step:4,label:"Visuals",tool:"Midjourney",desc:"Create stunning hero images and concept illustrations." },
    { step:5,label:"Present",tool:"Beautiful.ai",desc:"Add smart formatting and finalize the deck." },
  ]},
  { match:["music","song","track","beat","compose","produce music"], title:"Produce an AI Music Track", steps:[
    { step:1,label:"Concept",tool:"Claude",desc:"Define your song concept, genre, mood, and lyrics idea." },
    { step:2,label:"Lyrics",tool:"ChatGPT",desc:"Write compelling song lyrics matching your concept." },
    { step:3,label:"Generate",tool:"Suno AI",desc:"Generate the complete song with vocals and instruments." },
    { step:4,label:"Enhance",tool:"Stable Audio",desc:"Add unique audio textures and sound design elements." },
    { step:5,label:"Distribute",tool:"Soundraw",desc:"Generate royalty-free b-sides for content use." },
  ]},
  { match:["coding","programming","software","debug","code review","api"], title:"Build a Coding Project", steps:[
    { step:1,label:"Architecture",tool:"Claude",desc:"Plan your architecture, data models, and API structure." },
    { step:2,label:"Code",tool:"Cursor",desc:"Use AI IDE to write code with full codebase context." },
    { step:3,label:"Components",tool:"v0 by Vercel",desc:"Generate any UI components needed with React/Tailwind." },
    { step:4,label:"Debug",tool:"Phind",desc:"Find answers to coding issues with developer-focused AI." },
    { step:5,label:"Deploy",tool:"Bolt.new",desc:"Deploy your application with one-click infrastructure." },
  ]},
  { match:["research","literature","academic","study","thesis","scientific"], title:"Conduct Research", steps:[
    { step:1,label:"Discover",tool:"Research Rabbit",desc:"Map and visualize the citation network of your topic." },
    { step:2,label:"Search",tool:"Semantic Scholar",desc:"Find relevant papers across 1 billion academic sources." },
    { step:3,label:"Read",tool:"SciSpace",desc:"Explain complex papers in simple language with AI." },
    { step:4,label:"Synthesize",tool:"Elicit",desc:"Extract structured data from papers automatically." },
    { step:5,label:"Write",tool:"Claude",desc:"Draft your research summary with proper citations." },
  ]},
];

// ════════════════════════════════════════════════════════════
// CHATBOT FLOWS
// ════════════════════════════════════════════════════════════
const CHAT_FLOWS = [
  { pattern:/\b(hi|hello|hey|start|help)\b/i, reply:"👋 Hey! I'm Buddy — your AI tool guide.\n\nTell me what you're trying to **create or accomplish** and I'll find the perfect tools.\n\nExamples:\n• \"make a YouTube video\"\n• \"build an app\"\n• \"write an essay\"\n• \"generate music\"" },
  { pattern:/video|youtube|film|reel|tiktok|animation|shorts/i, reply:"🎬 **Video Tools:**\n\n🥇 **Sora** — Best quality, OpenAI's flagship\n🥈 **Runway ML** — Professional grade, Hollywood-used\n🥉 **Pika Labs** — Easiest for beginners\n\nFor **faceless YouTube**: InVideo AI\nFor **AI avatars**: HeyGen or Synthesia\nFor **editing**: CapCut AI (free)\n\n💡 Search 'create YouTube video' for a full AI workflow!" },
  { pattern:/logo|brand|design|illustrat|icon|graphic/i, reply:"🎨 **Design Tools:**\n\n🥇 **Midjourney** — Unmatched artistic quality\n🥈 **Ideogram** — Best for text in images\n🥉 **Canva AI** — Easiest all-in-one tool\n\nFor **logos specifically**: Looka (brand kit included)\nFor **product photos**: Flair AI\n\n💡 Search 'build brand identity' for a complete workflow!" },
  { pattern:/write|essay|article|blog|content|copy|text/i, reply:"✍️ **Writing Tools:**\n\n🥇 **Claude** — Best for long, nuanced writing\n🥈 **ChatGPT** — Most versatile, huge ecosystem\n🥉 **Jasper AI** — Marketing-focused with brand voice\n\nFor **academic research**: Perplexity AI + Consensus AI\nFor **SEO content**: Surfer SEO + Writesonic\nFor **grammar**: Grammarly or QuillBot\n\n💡 Search 'write essay' for a step-by-step workflow!" },
  { pattern:/code|app|website|build|program|develop|frontend|backend/i, reply:"💻 **Coding Tools:**\n\n🥇 **Cursor** — AI IDE, codebase-aware\n🥈 **Lovable** — Full-stack apps from text\n🥉 **GitHub Copilot** — Industry standard pair programmer\n\nFor **websites without code**: Framer AI\nFor **quick MVPs**: Bolt.new\nFor **free**: Codeium or Replit AI\n\n💡 Search 'build web app' for a full dev workflow!" },
  { pattern:/music|song|audio|sound|podcast|voice|narrat|record/i, reply:"🎵 **Audio & Music Tools:**\n\n🥇 **ElevenLabs** — Most realistic AI voices\n🥈 **Suno AI** — Full song generation with vocals\n🥉 **Descript** — Podcast editing made easy\n\nFor **background music**: Soundraw (royalty-free)\nFor **meeting notes**: Fathom (free!)\nFor **noise removal**: Krisp\n\n💡 Search 'launch podcast' for a full audio workflow!" },
  { pattern:/free|no cost|budget|cheap/i, reply:"💰 **Best Completely Free Tools:**\n\n• **ChatGPT** (free tier) — Writing & chat\n• **Bing Image Creator** — DALL-E quality images\n• **Codeium** — AI code completion\n• **Research Rabbit** — Academic research\n• **Fathom** — Meeting notes\n• **Hemingway Editor** — Writing clarity\n• **CapCut AI** — Video editing\n• **DaVinci Resolve AI** — Professional video editing\n\nMost tools also offer freemium tiers!" },
  { pattern:/beginner|easy|simple|new to|never used|start/i, reply:"🌱 **Perfect Tools for Beginners:**\n\n• **ChatGPT** — Natural conversation interface\n• **Canva AI** — Design without design skills\n• **Pika Labs** — AI video in seconds\n• **Murf AI** — Professional voiceovers easily\n• **Gamma** — Beautiful presentations instantly\n• **Mixo** — Website in 30 seconds\n\nAll have gentle learning curves. Start with **ChatGPT**!" },
  { pattern:/marketing|ads|promote|campaign|social|seo/i, reply:"📢 **Marketing Tools:**\n\n🥇 **Jasper AI** — Marketing copy specialist\n🥈 **AdCreative.ai** — High-converting ad creatives\n🥉 **HeyGen** — Video spokesperson ads\n\nFor **SEO**: Surfer SEO + Semrush AI\nFor **automation**: Zapier AI + Make.com\nFor **social media**: Copy.ai\n\n💡 Search 'marketing campaign' for the full workflow!" },
  { pattern:/research|academic|paper|study|cite|thesis/i, reply:"🔬 **Research Tools:**\n\n🥇 **Perplexity AI** — Real-time cited answers\n🥈 **Research Rabbit** — Citation network mapping\n🥉 **Consensus AI** — Peer-reviewed paper search\n\nFor **reading papers**: SciSpace or PDF.ai\nFor **data extraction**: Elicit\nFor **citations**: Sourcely\n\n💡 Search 'conduct research' for a full workflow!" },
];

function getBotReply(msg) {
  for (const f of CHAT_FLOWS) if (f.pattern.test(msg)) return f.reply;
  return `🤖 I can help you find the right AI tool!\n\nTry asking:\n• "What's the best tool for creating videos?"\n• "I need free tools for writing"\n• "How do I build an app with AI?"\n• "Best research tools for students"\n\nOr describe what you want to **create** and I'll recommend the perfect AI stack!`;
}

// ════════════════════════════════════════════════════════════
// SCORING ENGINE (Weighted: 40% relevance, 30% filters, 20% popularity, 10% ease)
// ════════════════════════════════════════════════════════════
function scoreTools(query, filters, allTools, mode = "deep") {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 1 && !["the","and","for","with","using","make","create","build","write","generate","how","can","want","need","a","an"].includes(w));

  const scored = allTools.map(tool => {
    let relevance = 0;
    let filterScore = 0;
    let filterPenalty = 0;
    const matchedKeywords = [];

    // ── Relevance (40%) ────────────────────────────────────
    words.forEach(word => {
      if (tool.name.toLowerCase().includes(word)) { relevance += 20; if (!matchedKeywords.includes(word)) matchedKeywords.push(word); }
      if (tool.category.toLowerCase().includes(word)) { relevance += 12; if (!matchedKeywords.includes(word)) matchedKeywords.push(word); }
      if (tool.industry.toLowerCase().includes(word)) { relevance += 10; if (!matchedKeywords.includes(word)) matchedKeywords.push(word); }
      tool.tags.forEach(tag => {
        if (tag.includes(word) || word.includes(tag.split(" ")[0])) {
          relevance += 10;
          if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
        }
      });
      if (tool.description.toLowerCase().includes(word)) relevance += 4;
    });

    // ── Filter Score (30%) ──────────────────────────────────
    if (filters.pricing) { if (tool.pricing !== filters.pricing) filterPenalty += 40; else { filterScore += 20; } }
    if (filters.skill_level) { if (tool.skill_level !== filters.skill_level) filterPenalty += 30; else { filterScore += 15; } }
    if (filters.output_type) { if (tool.output_type !== filters.output_type) filterPenalty += 35; else { filterScore += 15; } }
    if (filters.industry) { if (tool.industry !== filters.industry) filterPenalty += 25; else { filterScore += 20; } }

    // ── Popularity (20%) ────────────────────────────────────
    const popularityBonus = tool.popularity_score * 0.2;

    // ── Ease of Use (10%) ───────────────────────────────────
    const easeBonus = tool.ease_of_use * 0.1;

    const rawScore = relevance * 0.4 + filterScore * 0.3 + popularityBonus - filterPenalty + easeBonus;

    // Score breakdown for UI display
    const breakdown = {
      relevance: Math.min(100, Math.round(relevance * 2.2)),
      easeOfUse: tool.ease_of_use,
      costEfficiency: tool.pricing === "free" ? 100 : tool.pricing === "freemium" ? 70 : 40,
      popularity: tool.popularity_score,
    };

    // Build human-readable reason
    const reasons = [];
    if (matchedKeywords.length) reasons.push(`matches "${matchedKeywords.slice(0,2).join('", "')}"`);
    if (tool.pricing === "free") reasons.push("completely free");
    else if (tool.pricing === "freemium") reasons.push("free tier available");
    if (tool.ease_of_use >= 88) reasons.push("beginner-friendly");
    if (tool.popularity_score >= 85) reasons.push("very popular");
    if (tool.rating >= 4.6) reasons.push("top-rated");
    if (filters.industry && tool.industry === filters.industry) reasons.push(`optimized for ${filters.industry}`);

    const reason = reasons.length
      ? `Recommended because it ${reasons.slice(0, 3).join(", ")}.`
      : "Strong match for your search criteria.";

    return { ...tool, score: rawScore, breakdown, reason, matchedKeywords: [...new Set(matchedKeywords)] };
  });

  return scored
    .filter(t => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, mode === "quick" ? 8 : 24);
}

// ════════════════════════════════════════════════════════════
// WORKFLOW MATCHER
// ════════════════════════════════════════════════════════════
function getWorkflow(query) {
  const q = query.toLowerCase();
  for (const wf of WORKFLOW_TEMPLATES) {
    if (wf.match.some(kw => q.includes(kw))) return wf;
  }
  return null;
}

// ════════════════════════════════════════════════════════════
// SAMPLE OUTPUT GENERATOR
// ════════════════════════════════════════════════════════════
function getSampleOutput(tool) {
  if (tool.output_type === "Text") return {
    type:"text",
    content:`✨ Sample from ${tool.name}:\n\n"Artificial intelligence is rapidly transforming how we work and create. From automating repetitive tasks to generating creative content, tools like ${tool.name} are enabling individuals and teams to accomplish more with less effort. The key advantage is accessibility — you don't need years of expertise to leverage these powerful capabilities.\n\nWhether you're a startup founder, student, or creative professional, AI tools are leveling the playing field."\n\n→ Generated in ~3 seconds · 95% accuracy · Zero expertise required`
  };
  if (tool.output_type === "Image") return {
    type:"image",
    content:`🖼️ ${tool.name} would generate:\n\nA high-quality image based on your text description.\n\nExample prompt: "A futuristic cityscape at golden hour with flying vehicles and holographic billboards, cinematic lighting"\n\nOutput specs:\n• Resolution: 1024×1024px (up to 4096px)\n• Format: PNG / JPEG\n• Generation time: 5-15 seconds\n• Style consistency: Very High`
  };
  if (tool.output_type === "Video") return {
    type:"video",
    content:`🎬 ${tool.name} video output:\n\nA cinematic video clip showing:\n• Smooth AI-generated motion\n• Consistent characters & environments\n• High-fidelity lighting & textures\n• Physics-aware movement\n\nSpecs:\n• Resolution: 1080p (up to 4K)\n• Duration: 5-60 seconds\n• FPS: 24fps cinematic\n• Generation time: 30-120 seconds`
  };
  if (tool.output_type === "Audio") return {
    type:"audio",
    content:`🎵 ${tool.name} audio output:\n\n[♪ 15-second preview would play here]\n\nGenerated audio characteristics:\n• Bitrate: 192-320 kbps MP3\n• Sample rate: 44.1 kHz\n• Duration: Fully customizable\n• Voice quality: Indistinguishable from human (ElevenLabs)\n\nGeneration time: 5-30 seconds`
  };
  if (tool.output_type === "Code") return {
    type:"code",
    content:`// ${tool.name} — Generated code example:\n\nasync function fetchUserData(userId: string) {\n  const response = await fetch(\`/api/users/\${userId}\`, {\n    headers: {\n      Authorization: \`Bearer \${getAuthToken()}\`,\n      'Content-Type': 'application/json'\n    }\n  });\n\n  if (!response.ok) {\n    throw new Error(\`HTTP error: \${response.status}\`);\n  }\n\n  return response.json() as Promise<User>;\n}\n\n// ✓ TypeScript types auto-added\n// ✓ Error handling included\n// ✓ Best practices applied\n// Generated in: ~2 seconds`
  };
  return { type:"other", content:`📦 ${tool.name} would generate a ${tool.output_type} output based on your specifications, ready for immediate use in your workflow.` };
}

// ════════════════════════════════════════════════════════════
// COMPARE WINNER LOGIC
// ════════════════════════════════════════════════════════════
function getCompareWinner(list) {
  if (!list.length) return null;
  return list.reduce((best, t) => {
    const score = t.rating * 20 + t.popularity_score * 0.5 + t.ease_of_use * 0.3 + (t.pricing === "free" ? 15 : t.pricing === "freemium" ? 8 : 0);
    const bestScore = best.rating * 20 + best.popularity_score * 0.5 + best.ease_of_use * 0.3 + (best.pricing === "free" ? 15 : best.pricing === "freemium" ? 8 : 0);
    return score > bestScore ? t : best;
  });
}

// ════════════════════════════════════════════════════════════════════════════
// STYLES — complete design system
// ════════════════════════════════════════════════════════════════════════════
const S = {
  app:"min-h-screen bg-[#04040e] text-slate-200 font-[DM_Sans,Outfit,system-ui,sans-serif] relative overflow-x-hidden",
};

// Inline style objects to avoid Tailwind dependency
const css = {
  app:{ minHeight:"100vh", background:"#04040e", color:"#e2e8f0", fontFamily:"'DM Sans','Outfit',system-ui,sans-serif" },
  nav:{ background:"rgba(4,4,14,0.94)", backdropFilter:"blur(24px)", borderBottom:"1px solid rgba(124,58,237,0.14)", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:200 },
  logo:{ fontSize:20, fontWeight:900, background:"linear-gradient(135deg,#a78bfa,#818cf8,#c084fc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", cursor:"pointer", letterSpacing:-0.5, userSelect:"none" },
  pill:(active)=>({ padding:"5px 12px", borderRadius:8, border:active?"1px solid rgba(124,58,237,0.45)":"1px solid transparent", background:active?"rgba(124,58,237,0.18)":"transparent", color:active?"#c4b5fd":"#64748b", cursor:"pointer", fontSize:13, fontWeight:500, transition:"all 0.2s", whiteSpace:"nowrap" }),
  hero:{ textAlign:"center", padding:"70px 2rem 36px", maxWidth:860, margin:"0 auto", position:"relative", zIndex:1 },
  h1:{ fontSize:"clamp(2rem,5.5vw,3.8rem)", fontWeight:900, lineHeight:1.08, background:"linear-gradient(135deg,#f8fafc 20%,#a78bfa 60%,#c084fc 88%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:14, letterSpacing:-1 },
  sub:{ fontSize:17, color:"#475569", lineHeight:1.6, marginBottom:30 },
  searchWrap:{ position:"relative", maxWidth:660, margin:"0 auto 18px" },
  searchIn:{ width:"100%", padding:"15px 54px 15px 20px", fontSize:15, background:"rgba(14,14,32,0.97)", border:"1px solid rgba(124,58,237,0.24)", borderRadius:14, color:"#e2e8f0", outline:"none", boxSizing:"border-box", transition:"border 0.2s, box-shadow 0.2s" },
  searchBtn:{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"linear-gradient(135deg,#7c3aed,#a855f7)", border:"none", borderRadius:10, padding:"7px 14px", color:"#fff", cursor:"pointer", fontSize:17, fontWeight:700 },
  filtersRow:{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:28 },
  sel:{ background:"rgba(14,14,32,0.97)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:10, padding:"9px 14px", color:"#94a3b8", fontSize:13, cursor:"pointer", outline:"none", minWidth:130 },
  section:{ maxWidth:1280, margin:"0 auto", padding:"0 2rem 60px" },
  sTitle:{ fontSize:20, fontWeight:700, color:"#e2e8f0", marginBottom:20, display:"flex", alignItems:"center", gap:8 },
  grid:{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:18 },
  card:(hov)=>({ background:"rgba(12,10,28,0.87)", border:`1px solid ${hov?"rgba(124,58,237,0.48)":"rgba(124,58,237,0.13)"}`, borderRadius:16, padding:18, display:"flex", flexDirection:"column", gap:10, cursor:"pointer", transition:"all 0.22s", position:"relative", overflow:"hidden", transform:hov?"translateY(-2px)":"translateY(0)", boxShadow:hov?"0 8px 32px rgba(124,58,237,0.14)":"none" }),
  badge:(t)=>({ display:"inline-block", padding:"2px 9px", borderRadius:20, fontSize:11, fontWeight:600, background:t==="free"?"rgba(16,185,129,0.12)":t==="freemium"?"rgba(245,158,11,0.12)":"rgba(124,58,237,0.12)", color:t==="free"?"#6ee7b7":t==="freemium"?"#fbbf24":"#c4b5fd", border:`1px solid ${t==="free"?"rgba(16,185,129,0.28)":t==="freemium"?"rgba(245,158,11,0.28)":"rgba(124,58,237,0.28)"}` }),
  chip:(c)=>({ display:"inline-block", padding:"2px 8px", borderRadius:6, fontSize:11, background:`rgba(${c},0.1)`, color:`rgb(${c})`, border:`1px solid rgba(${c},0.22)` }),
  userChip:{ display:"inline-block", padding:"2px 8px", borderRadius:6, fontSize:11, background:"rgba(251,191,36,0.12)", color:"#fbbf24", border:"1px solid rgba(251,191,36,0.28)", fontWeight:600 },
  reasonBox:{ background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#a78bfa", lineHeight:1.55 },
  modal:{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"1rem" },
  modalBox:{ background:"#0c0a1e", border:"1px solid rgba(124,58,237,0.25)", borderRadius:20, padding:28, width:"100%", maxHeight:"90vh", overflowY:"auto" },
  pbar:(w,c)=>({ width:`${Math.min(100,w||0)}%`, height:"100%", background:c, borderRadius:3, transition:"width 0.6s ease" }),
  btn:(v)=>({ padding:v==="sm"?"5px 11px":"8px 16px", borderRadius:10, border:"none", cursor:"pointer", fontSize:v==="sm"?12:13, fontWeight:600, transition:"all 0.2s",
    ...(v==="primary"?{background:"linear-gradient(135deg,#7c3aed,#a855f7)",color:"#fff"}
      :v==="outline"?{background:"transparent",border:"1px solid rgba(124,58,237,0.35)",color:"#a78bfa"}
      :{background:"rgba(124,58,237,0.1)",color:"#a78bfa"}) }),
  chatBox:{ position:"fixed", bottom:24, right:24, zIndex:300 },
  chatPanel:{ width:340, background:"#09091e", border:"1px solid rgba(124,58,237,0.3)", borderRadius:20, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.6)", marginBottom:10 },
  chatHead:{ background:"linear-gradient(135deg,#4c1d95,#7c3aed)", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" },
  chatMsg:(f)=>({ maxWidth:"82%", padding:"9px 13px", borderRadius:f==="user"?"16px 16px 3px 16px":"16px 16px 16px 3px", background:f==="user"?"linear-gradient(135deg,#7c3aed,#a855f7)":"rgba(255,255,255,0.06)", color:"#e2e8f0", fontSize:13, lineHeight:1.55, alignSelf:f==="user"?"flex-end":"flex-start", whiteSpace:"pre-line", wordBreak:"break-word" }),
};

// ════════════════════════════════════════════════════════════════════════════
// HIGHLIGHT UTIL
// ════════════════════════════════════════════════════════════════════════════
function Highlight({ text, keywords }) {
  if (!keywords?.length || !text) return <>{text}</>;
  const regex = new RegExp(`(${keywords.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})`, "gi");
  return <>{String(text).split(regex).map((p,i)=>
    keywords.some(k=>k.toLowerCase()===p.toLowerCase())
      ? <mark key={i} style={{background:"rgba(139,92,246,0.3)",color:"#c4b5fd",borderRadius:3,padding:"0 2px"}}>{p}</mark>
      : p
  )}</>;
}

// ════════════════════════════════════════════════════════════════════════════
// SCORE BAR COMPONENT
// ════════════════════════════════════════════════════════════════════════════
function ScoreBar({ label, val, color, compact }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:compact?4:6}}>
      <span style={{fontSize:compact?10:11,color:"#475569",minWidth:compact?64:78}}>{label}</span>
      <div style={{flex:1,height:compact?3:5,background:"rgba(255,255,255,0.04)",borderRadius:3,overflow:"hidden"}}>
        <div style={css.pbar(val,color)} />
      </div>
      <span style={{fontSize:compact?10:11,color:"#64748b",minWidth:28,textAlign:"right"}}>{Math.round(val||0)}%</span>
    </div>
  );
}

const SCORE_BARS = [
  {label:"Relevance",key:"relevance",color:"linear-gradient(90deg,#7c3aed,#a855f7)"},
  {label:"Ease of Use",key:"easeOfUse",color:"linear-gradient(90deg,#0ea5e9,#38bdf8)"},
  {label:"Cost Value",key:"costEfficiency",color:"linear-gradient(90deg,#10b981,#34d399)"},
  {label:"Popularity",key:"popularity",color:"linear-gradient(90deg,#f59e0b,#fbbf24)"},
];

// ════════════════════════════════════════════════════════════════════════════
// WORKFLOW PANEL
// ════════════════════════════════════════════════════════════════════════════
function WorkflowPanel({ wf }) {
  return (
    <div style={{background:"rgba(12,10,28,0.92)",border:"1px solid rgba(124,58,237,0.22)",borderRadius:16,padding:22,marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <span style={{fontSize:22}}>🧠</span>
        <div>
          <p style={{fontSize:15,fontWeight:700,color:"#f1f5f9",margin:0}}>AI Workflow Planner</p>
          <p style={{fontSize:12,color:"#64748b",margin:0}}>Recommended step-by-step tool plan: <strong style={{color:"#a78bfa"}}>{wf.title}</strong></p>
        </div>
      </div>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
        {wf.steps.map((step,i)=>(
          <div key={step.step} style={{minWidth:155,background:"rgba(124,58,237,0.06)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:12,padding:13,flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff",flexShrink:0}}>{step.step}</div>
              <span style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:0.5,textTransform:"uppercase"}}>{step.label}</span>
            </div>
            <p style={{fontSize:13,fontWeight:700,color:"#a78bfa",margin:"0 0 5px"}}>{step.tool}</p>
            <p style={{fontSize:11,color:"#475569",margin:0,lineHeight:1.45}}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// TOOL CARD COMPONENT
// ════════════════════════════════════════════════════════════════════════════
function ToolCard({ tool, showReason, mode, favorites, onFav, onCompare, onSelect, onSample, compareList }) {
  const [hov, setHov] = useState(false);
  const isFav = favorites.includes(tool.id);
  const inCompare = compareList.some(t=>t.id===tool.id);

  return (
    <div
      style={{...css.card(hov),animationName:"fadeUp",animationDuration:"0.35s",animationFillMode:"both"}}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>onSelect(tool)}
    >
      {/* Glow accent */}
      <div style={{position:"absolute",top:-18,right:-18,width:90,height:90,background:"radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>

      {/* Header row */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:6}}>
            <span style={{fontSize:15,fontWeight:700,color:"#f1f5f9"}}>
              <Highlight text={tool.name} keywords={tool.matchedKeywords}/>
            </span>
            <span style={css.badge(tool.pricing)}>{tool.pricing}</span>
            {tool.isUserAdded && <span style={css.userChip}>👤 User Added</span>}
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            <span style={css.chip("168,85,247")}>{tool.output_type}</span>
            <span style={css.chip("99,102,241")}>{tool.skill_level}</span>
            <span style={css.chip("20,184,166")}>{tool.industry}</span>
          </div>
        </div>
        <button
          onClick={e=>{e.stopPropagation();onFav(tool.id);}}
          style={{background:"none",border:"none",cursor:"pointer",fontSize:17,color:isFav?"#f59e0b":"#1e293b",flexShrink:0,padding:2}}
          title={isFav?"Remove from saved":"Save tool"}
        >{isFav?"★":"☆"}</button>
      </div>

      <p style={{fontSize:12,color:"#475569",lineHeight:1.6,margin:0}}>{tool.description.slice(0,105)}...</p>

      {/* Rating + popularity bar */}
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:"#f59e0b",fontSize:12}}>{"★".repeat(Math.round(tool.rating)).padEnd(5,"☆")}</span>
        <span style={{color:"#64748b",fontSize:11}}>{tool.rating.toFixed(1)}</span>
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <div style={{width:44,height:3,borderRadius:2,background:"rgba(124,58,237,0.15)",overflow:"hidden"}}>
            <div style={css.pbar(tool.popularity_score,"linear-gradient(90deg,#7c3aed,#a855f7)")}/>
          </div>
          <span style={{fontSize:10,color:"#334155"}}>{tool.popularity_score}</span>
        </div>
      </div>

      {/* Trending reason */}
      {tool.trending_reason && (
        <p style={{fontSize:11,color:"#f59e0b",margin:0}}>🔥 {tool.trending_reason}</p>
      )}

      {/* Score breakdown (deep mode only) */}
      {mode==="deep" && tool.breakdown && (
        <div style={{background:"rgba(124,58,237,0.05)",border:"1px solid rgba(124,58,237,0.1)",borderRadius:10,padding:"10px 12px"}}>
          <p style={{fontSize:10,color:"#475569",fontWeight:600,marginBottom:7,letterSpacing:0.5}}>📊 SCORE BREAKDOWN</p>
          {SCORE_BARS.map(b=>(
            <ScoreBar key={b.key} label={b.label} val={tool.breakdown[b.key]} color={b.color} compact/>
          ))}
        </div>
      )}

      {/* Reason */}
      {showReason && tool.reason && (
        <div style={css.reasonBox}>🤖 {tool.reason}</div>
      )}

      {/* Action buttons */}
      <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:2}} onClick={e=>e.stopPropagation()}>
        <a href={tool.link} target="_blank" rel="noopener noreferrer"
          style={{...css.btn("primary"),textDecoration:"none",display:"inline-block",fontSize:12,padding:"7px 14px"}}>
          Visit ↗
        </a>
        <button style={{...css.btn("outline"),fontSize:12,padding:"7px 12px",background:inCompare?"rgba(124,58,237,0.22)":"transparent"}}
          onClick={()=>onCompare(tool)}>
          {inCompare?"✓ Comparing":"⚖ Compare"}
        </button>
        <button style={{...css.btn("ghost"),fontSize:12,padding:"7px 12px"}}
          onClick={()=>onSample(tool)}>
          ▷ Sample
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// COMPARE MODAL
// ════════════════════════════════════════════════════════════════════════════
function CompareModal({ list, onClose }) {
  const winner = getCompareWinner(list);
  const metrics = [
    {key:"rating",label:"Rating",fmt:v=>`${v.toFixed(1)} ★`},
    {key:"popularity_score",label:"Popularity",fmt:v=>`${v}/100`},
    {key:"ease_of_use",label:"Ease of Use",fmt:v=>`${v}%`},
    {key:"pricing",label:"Pricing",fmt:v=>v},
    {key:"skill_level",label:"Skill Level",fmt:v=>v},
    {key:"output_type",label:"Output",fmt:v=>v},
    {key:"industry",label:"Industry",fmt:v=>v},
  ];

  return (
    <div style={css.modal} onClick={onClose}>
      <div style={{...css.modalBox,maxWidth:900}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <h2 style={{color:"#f1f5f9",fontWeight:800,fontSize:22,margin:0}}>⚖ Side-by-Side Comparison</h2>
          <button style={{background:"none",border:"none",color:"#64748b",fontSize:20,cursor:"pointer"}} onClick={onClose}>✕</button>
        </div>

        {/* Tool name headers */}
        <div style={{display:"grid",gridTemplateColumns:`130px ${list.map(()=>"1fr").join(" ")}`,gap:12,marginBottom:12}}>
          <div/>
          {list.map(t=>(
            <div key={t.id} style={{textAlign:"center",background:t.id===winner?.id?"rgba(124,58,237,0.12)":"rgba(255,255,255,0.02)",border:t.id===winner?.id?"1px solid rgba(124,58,237,0.42)":"1px solid rgba(255,255,255,0.05)",borderRadius:12,padding:"12px 8px"}}>
              {t.id===winner?.id && <div style={{fontSize:11,color:"#a78bfa",fontWeight:700,marginBottom:4}}>🏆 WINNER</div>}
              <p style={{fontWeight:700,color:"#f1f5f9",margin:"0 0 6px",fontSize:14}}>{t.name}</p>
              <span style={css.badge(t.pricing)}>{t.pricing}</span>
            </div>
          ))}
        </div>

        {/* Metric rows */}
        {metrics.map(({key,label,fmt})=>(
          <div key={key} style={{display:"grid",gridTemplateColumns:`130px ${list.map(()=>"1fr").join(" ")}`,gap:12,marginBottom:7}}>
            <div style={{display:"flex",alignItems:"center",fontSize:12,color:"#475569",fontWeight:600}}>{label}</div>
            {list.map(t=>(
              <div key={t.id} style={{textAlign:"center",padding:"8px 4px",background:"rgba(255,255,255,0.02)",borderRadius:8,fontSize:13,color:t.id===winner?.id?"#a78bfa":"#94a3b8",fontWeight:t.id===winner?.id?700:400}}>
                {key==="rating"?<><span style={{color:"#f59e0b"}}>{"★".repeat(Math.round(t[key])).padEnd(5,"☆")}</span> {t[key].toFixed(1)}</>
                :key==="ease_of_use"?(
                  <div style={{display:"flex",alignItems:"center",gap:5,justifyContent:"center"}}>
                    <div style={{width:50,height:4,background:"rgba(124,58,237,0.15)",borderRadius:2,overflow:"hidden"}}>
                      <div style={css.pbar(t[key],"linear-gradient(90deg,#7c3aed,#a855f7)")}/>
                    </div>
                    {t[key]}%
                  </div>
                ):fmt(t[key])}
              </div>
            ))}
          </div>
        ))}

        {/* Pros / Cons */}
        {["pros","cons"].map(type=>(
          <div key={type} style={{display:"grid",gridTemplateColumns:`130px ${list.map(()=>"1fr").join(" ")}`,gap:12,marginTop:12}}>
            <div style={{fontSize:12,color:"#475569",fontWeight:600,paddingTop:8}}>{type==="pros"?"✓ Pros":"✗ Cons"}</div>
            {list.map(t=>(
              <div key={t.id} style={{background:type==="pros"?"rgba(16,185,129,0.05)":"rgba(239,68,68,0.05)",border:`1px solid ${type==="pros"?"rgba(16,185,129,0.18)":"rgba(239,68,68,0.18)"}`,borderRadius:10,padding:12}}>
                {t[type].map(p=>(
                  <p key={p} style={{fontSize:12,color:type==="pros"?"#6ee7b7":"#f87171",margin:"2px 0"}}>
                    {type==="pros"?"✓":"✗"} {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}

        {/* Winner verdict */}
        {winner && (
          <div style={{marginTop:24,background:"linear-gradient(135deg,rgba(124,58,237,0.13),rgba(168,85,247,0.07))",border:"1px solid rgba(124,58,237,0.32)",borderRadius:14,padding:"18px 20px"}}>
            <p style={{fontSize:13,fontWeight:700,color:"#a78bfa",marginBottom:6}}>🏆 Verdict</p>
            <p style={{fontSize:18,fontWeight:800,color:"#f1f5f9",marginBottom:8}}>Winner: {winner.name}</p>
            <p style={{fontSize:13,color:"#64748b",margin:0,lineHeight:1.65}}>
              <strong style={{color:"#94a3b8"}}>{winner.name}</strong> wins with the highest composite score — combining rating (<strong style={{color:"#f59e0b"}}>{winner.rating}★</strong>), popularity (<strong style={{color:"#a78bfa"}}>{winner.popularity_score}/100</strong>), ease of use (<strong style={{color:"#38bdf8"}}>{winner.ease_of_use}%</strong>), and cost efficiency. It's the optimal choice for <strong style={{color:"#94a3b8"}}>{winner.skill_level}</strong> users targeting <strong style={{color:"#94a3b8"}}>{winner.output_type}</strong> outputs in the <strong style={{color:"#94a3b8"}}>{winner.industry}</strong> space.
            </p>
          </div>
        )}

        <div style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"}}>
          {list.map(t=>(
            <a key={t.id} href={t.link} target="_blank" rel="noopener noreferrer"
              style={{...css.btn("primary"),textDecoration:"none",flex:1,textAlign:"center",display:"block",minWidth:120}}>
              Visit {t.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DETAILS MODAL
// ════════════════════════════════════════════════════════════════════════════
function DetailsModal({ tool, allTools, favorites, onFav, onCompare, compareList, onSample, onClose, onSelectTool }) {
  const similar = allTools.filter(t=>tool.similar_tools?.includes(t.name));
  const inCompare = compareList.some(t=>t.id===tool.id);
  const breakdown = {
    relevance: tool.breakdown?.relevance || Math.round(tool.rating*20),
    easeOfUse: tool.ease_of_use,
    costEfficiency: tool.pricing==="free"?100:tool.pricing==="freemium"?70:40,
    popularity: tool.popularity_score,
  };

  return (
    <div style={css.modal} onClick={onClose}>
      <div style={{...css.modalBox,maxWidth:720}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <h2 style={{color:"#f1f5f9",fontWeight:800,fontSize:24,margin:"0 0 8px"}}>{tool.name}</h2>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <span style={css.badge(tool.pricing)}>{tool.pricing}</span>
              <span style={css.chip("168,85,247")}>{tool.output_type}</span>
              <span style={css.chip("99,102,241")}>{tool.skill_level}</span>
              <span style={css.chip("20,184,166")}>{tool.industry}</span>
              {tool.isUserAdded && <span style={css.userChip}>👤 User Added</span>}
            </div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#475569",fontSize:20,cursor:"pointer"}}>✕</button>
        </div>

        <p style={{color:"#64748b",lineHeight:1.7,marginBottom:18}}>{tool.description}</p>

        {/* Stats */}
        <div style={{display:"flex",gap:12,marginBottom:20,background:"rgba(124,58,237,0.06)",borderRadius:12,padding:14,flexWrap:"wrap"}}>
          {[["Rating",`${tool.rating.toFixed(1)} ★`,"#f59e0b"],["Popularity",`${tool.popularity_score}/100`,"#a78bfa"],["Ease of Use",`${tool.ease_of_use}%`,"#38bdf8"]].map(([l,v,c])=>(
            <div key={l} style={{flex:1,minWidth:80,textAlign:"center"}}>
              <p style={{fontSize:11,color:"#475569",margin:"0 0 3px"}}>{l}</p>
              <p style={{fontSize:18,fontWeight:700,color:c,margin:0}}>{v}</p>
            </div>
          ))}
        </div>

        {/* Score breakdown */}
        <div style={{marginBottom:18}}>
          <p style={{fontSize:11,color:"#475569",fontWeight:600,marginBottom:10,letterSpacing:0.5}}>📊 SCORE BREAKDOWN</p>
          {SCORE_BARS.map(b=>(
            <ScoreBar key={b.key} label={b.label} val={breakdown[b.key]} color={b.color}/>
          ))}
        </div>

        {/* Pros / Cons */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
          <div style={{background:"rgba(16,185,129,0.05)",border:"1px solid rgba(16,185,129,0.18)",borderRadius:12,padding:14}}>
            <p style={{color:"#6ee7b7",fontWeight:700,margin:"0 0 8px",fontSize:12}}>✓ Pros</p>
            {tool.pros.map(p=><p key={p} style={{color:"#94a3b8",fontSize:12,margin:"3px 0"}}>• {p}</p>)}
          </div>
          <div style={{background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:12,padding:14}}>
            <p style={{color:"#f87171",fontWeight:700,margin:"0 0 8px",fontSize:12}}>✗ Cons</p>
            {tool.cons.map(c=><p key={c} style={{color:"#94a3b8",fontSize:12,margin:"3px 0"}}>• {c}</p>)}
          </div>
        </div>

        {/* Tags */}
        <div style={{marginBottom:16}}>
          <p style={{color:"#475569",fontSize:11,fontWeight:600,marginBottom:8,letterSpacing:0.5}}>TAGS</p>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {tool.tags.map(t=><span key={t} style={css.chip("124,58,237")}>{t}</span>)}
          </div>
        </div>

        {/* Similar tools */}
        {similar.length>0 && (
          <div style={{marginBottom:20}}>
            <p style={{color:"#475569",fontSize:11,fontWeight:600,marginBottom:8,letterSpacing:0.5}}>SIMILAR TOOLS</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {similar.map(t=>(
                <button key={t.id} onClick={()=>onSelectTool(t)} style={css.btn("sm")}>{t.name}</button>
              ))}
            </div>
          </div>
        )}

        {/* Trending reason */}
        {tool.trending_reason && (
          <div style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.18)",borderRadius:10,padding:"8px 12px",marginBottom:18}}>
            <p style={{fontSize:12,color:"#f59e0b",margin:0}}>🔥 {tool.trending_reason}</p>
          </div>
        )}

        {/* Actions */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <a href={tool.link} target="_blank" rel="noopener noreferrer"
            style={{...css.btn("primary"),textDecoration:"none",display:"inline-block"}}>Visit {tool.name} ↗</a>
          <button style={css.btn("outline")} onClick={()=>onFav(tool.id)}>{favorites.includes(tool.id)?"★ Saved":"☆ Save"}</button>
          <button style={{...css.btn("outline"),background:inCompare?"rgba(124,58,237,0.22)":"transparent"}}
            onClick={()=>{onCompare(tool);onClose();}}>
            {inCompare?"✓ In Compare":"⚖ Compare"}
          </button>
          <button style={css.btn("ghost")} onClick={()=>{onSample(tool);onClose();}}>▷ Sample Output</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SAMPLE MODAL
// ════════════════════════════════════════════════════════════════════════════
function SampleModal({ tool, onClose }) {
  const sample = getSampleOutput(tool);
  const icons = {text:"📝",image:"🖼️",video:"🎬",audio:"🎵",code:"💻",other:"📦"};
  return (
    <div style={css.modal} onClick={onClose}>
      <div style={{...css.modalBox,maxWidth:540}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <h3 style={{color:"#f1f5f9",fontWeight:700,margin:0}}>{icons[sample.type]||"📦"} Sample from {tool.name}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        <div style={{background:"rgba(124,58,237,0.06)",border:"1px solid rgba(124,58,237,0.18)",borderRadius:12,padding:18,marginBottom:14}}>
          {sample.type==="code"
            ? <pre style={{margin:0,fontSize:12,color:"#a78bfa",fontFamily:"monospace",whiteSpace:"pre-wrap",lineHeight:1.6}}>{sample.content}</pre>
            : <p style={{margin:0,fontSize:13,color:"#94a3b8",lineHeight:1.7,whiteSpace:"pre-line"}}>{sample.content}</p>
          }
        </div>
        <p style={{fontSize:11,color:"#334155",textAlign:"center",marginBottom:12}}>Simulated preview — visit the tool to generate real outputs.</p>
        <a href={tool.link} target="_blank" rel="noopener noreferrer"
          style={{...css.btn("primary"),textDecoration:"none",display:"block",textAlign:"center"}}>
          Try {tool.name} for Real ↗
        </a>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ADD TOOL MODAL (User-Contributed Tools)
// ════════════════════════════════════════════════════════════════════════════
function AddToolModal({ onClose, onAdd }) {
  const [form, setForm] = useState({name:"",description:"",category:"Other",industry:"Business / Productivity",link:"",pricing:"freemium",skill_level:"beginner",output_type:"Other",tags:""});
  const [errors, setErrors] = useState({});

  const industries = ["Marketing","Software Development","Design","Video Editing","Audio / Music","Business / Productivity","Mechanical / Engineering","Education","Research"];
  const categories = ["Video","Image","Text","Code","Audio","Other"];
  const pricings = ["free","freemium","paid"];
  const levels = ["beginner","intermediate","advanced"];
  const outputs = ["Video","Image","Text","Audio","Code","Other"];

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Tool name is required";
    if (!form.description.trim() || form.description.length < 20) e.description = "Description must be at least 20 characters";
    if (!form.link.trim() || !form.link.startsWith("http")) e.link = "Valid URL starting with http required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newTool = {
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      industry: form.industry,
      link: form.link.trim(),
      pricing: form.pricing,
      skill_level: form.skill_level,
      output_type: form.output_type,
      tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean),
      rating: 4.0,
      popularity_score: 50,
      ease_of_use: 70,
      pros: ["User-submitted tool"],
      cons: ["Not yet verified by Buddy AI"],
      similar_tools: [],
      trending_reason: null,
      isUserAdded: true,
    };
    onAdd(newTool);
    onClose();
  }

  const inputStyle = {width:"100%",background:"rgba(14,14,32,0.97)",border:"1px solid rgba(124,58,237,0.2)",borderRadius:10,padding:"10px 13px",color:"#e2e8f0",fontSize:13,outline:"none",boxSizing:"border-box"};
  const label = (txt,err) => (
    <label style={{display:"block",marginBottom:12}}>
      <span style={{fontSize:12,color:"#475569",fontWeight:600,display:"block",marginBottom:5,letterSpacing:0.3}}>{txt}</span>
    </label>
  );

  return (
    <div style={css.modal} onClick={onClose}>
      <div style={{...css.modalBox,maxWidth:520}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <h3 style={{color:"#f1f5f9",fontWeight:800,fontSize:20,margin:"0 0 4px"}}>➕ Add an AI Tool</h3>
            <p style={{color:"#475569",fontSize:13,margin:0}}>Contribute a tool to the Buddy AI community</p>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:18}}>✕</button>
        </div>

        {[
          {key:"name",label:"Tool Name *",placeholder:"e.g. MyAwesome AI"},
          {key:"link",label:"Website URL *",placeholder:"https://mytool.com"},
        ].map(({key,label:lb,placeholder})=>(
          <div key={key} style={{marginBottom:12}}>
            <span style={{fontSize:12,color:"#475569",fontWeight:600,display:"block",marginBottom:5}}>{lb}</span>
            <input style={{...inputStyle,borderColor:errors[key]?"rgba(239,68,68,0.4)":"rgba(124,58,237,0.2)"}}
              placeholder={placeholder} value={form[key]}
              onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/>
            {errors[key] && <p style={{color:"#f87171",fontSize:11,margin:"3px 0 0"}}>{errors[key]}</p>}
          </div>
        ))}

        <div style={{marginBottom:12}}>
          <span style={{fontSize:12,color:"#475569",fontWeight:600,display:"block",marginBottom:5}}>Description * (min 20 chars)</span>
          <textarea style={{...inputStyle,resize:"vertical",minHeight:70,borderColor:errors.description?"rgba(239,68,68,0.4)":"rgba(124,58,237,0.2)"}}
            placeholder="What does this tool do? Who is it for?"
            value={form.description}
            onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
          {errors.description && <p style={{color:"#f87171",fontSize:11,margin:"3px 0 0"}}>{errors.description}</p>}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          {[
            {key:"industry",label:"Industry",opts:industries},
            {key:"category",label:"Category",opts:categories},
            {key:"pricing",label:"Pricing",opts:pricings},
            {key:"skill_level",label:"Skill Level",opts:levels},
            {key:"output_type",label:"Output Type",opts:outputs},
          ].map(({key,label:lb,opts})=>(
            <div key={key}>
              <span style={{fontSize:12,color:"#475569",fontWeight:600,display:"block",marginBottom:5}}>{lb}</span>
              <select style={{...inputStyle,width:"100%"}} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}>
                {opts.map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={{marginBottom:18}}>
          <span style={{fontSize:12,color:"#475569",fontWeight:600,display:"block",marginBottom:5}}>Tags (comma-separated)</span>
          <input style={inputStyle} placeholder="e.g. automation, no-code, productivity"
            value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))}/>
        </div>

        <div style={{display:"flex",gap:10}}>
          <button style={{...css.btn("primary"),flex:1,padding:12,fontSize:14}} onClick={handleSubmit}>Submit Tool ✓</button>
          <button style={{...css.btn("outline"),padding:12}} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CHATBOT
// ════════════════════════════════════════════════════════════════════════════
function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([{from:"bot",text:"👋 Hey! I'm Buddy — your AI tool advisor.\n\nTell me what you want to **create** and I'll find the perfect tools for you!"}]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  function send() {
    if (!input.trim()) return;
    const reply = getBotReply(input);
    setMessages(m=>[...m,{from:"user",text:input},{from:"bot",text:reply}]);
    setInput("");
  }

  return (
    <div style={css.chatPanel}>
      <div style={css.chatHead}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
          <div>
            <p style={{color:"#fff",fontWeight:700,margin:0,fontSize:13}}>Buddy Assistant</p>
            <p style={{color:"rgba(255,255,255,0.6)",margin:0,fontSize:10}}>AI Tool Advisor · Online</p>
          </div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:15}}>✕</button>
      </div>
      <div style={{height:260,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
        {messages.map((msg,i)=>(
          <div key={i} style={{display:"flex",justifyContent:msg.from==="user"?"flex-end":"flex-start"}}>
            <div style={css.chatMsg(msg.from)}>{msg.text}</div>
          </div>
        ))}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:8,padding:"10px 12px",borderTop:"1px solid rgba(124,58,237,0.12)"}}>
        <input
          style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(124,58,237,0.18)",borderRadius:10,padding:"8px 12px",color:"#e2e8f0",fontSize:13,outline:"none"}}
          placeholder="What do you want to create?"
          value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
        />
        <button style={{...css.btn("primary"),padding:"8px 12px"}} onClick={send}>→</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════════════
export default function BuddyAI() {
  // ── State ────────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState({pricing:"",skill_level:"",output_type:"",industry:""});
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [workflow, setWorkflow] = useState(null);
  const [mode, setMode] = useState("deep");
  const [activeTab, setActiveTab] = useState("search");

  const [favorites, setFavorites] = useState(()=>{try{return JSON.parse(localStorage.getItem("buddy_favs")||"[]")}catch{return[]}});
  const [compareList, setCompareList] = useState([]);
  const [userTools, setUserTools] = useState(()=>{try{return JSON.parse(localStorage.getItem("buddy_user_tools")||"[]")}catch{return[]}});
  const [projects, setProjects] = useState(()=>{try{return JSON.parse(localStorage.getItem("buddy_projects")||"[]")}catch{return[]}});

  const [selectedTool, setSelectedTool] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [sampleTool, setSampleTool] = useState(null);
  const [showAddTool, setShowAddTool] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [user, setUser] = useState(()=>{try{return JSON.parse(localStorage.getItem("buddy_user")||"null")}catch{return null}});
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({name:"",email:"",password:""});

  // All tools combined
  const allTools = useMemo(()=>[...TOOLS,...userTools],[userTools]);

  // ── Debounce ─────────────────────────────────────────────
  useEffect(()=>{
    const t = setTimeout(()=>setDebouncedQuery(query), 420);
    return ()=>clearTimeout(t);
  },[query]);

  // ── Search ───────────────────────────────────────────────
  useEffect(()=>{
    const hasQ = debouncedQuery.trim().length>1;
    const hasF = Object.values(filters).some(Boolean);
    if (hasQ||hasF) {
      setResults(scoreTools(debouncedQuery,filters,allTools,mode));
      setWorkflow(hasQ?getWorkflow(debouncedQuery):null);
      setSearched(true);
    } else {
      setResults([]); setWorkflow(null); setSearched(false);
    }
  },[debouncedQuery,filters,mode,allTools]);

  const trending = useMemo(()=>[...TOOLS].sort((a,b)=>b.popularity_score-a.popularity_score).slice(0,12),[]);

  // ── Persistence helpers ───────────────────────────────────
  const toggleFav = useCallback((id)=>{
    setFavorites(prev=>{
      const next = prev.includes(id)?prev.filter(f=>f!==id):[...prev,id];
      localStorage.setItem("buddy_favs",JSON.stringify(next));
      return next;
    });
  },[]);

  const toggleCompare = useCallback((tool)=>{
    setCompareList(prev=>prev.find(t=>t.id===tool.id)?prev.filter(t=>t.id!==tool.id):prev.length<3?[...prev,tool]:prev);
  },[]);

  const addUserTool = useCallback((tool)=>{
    setUserTools(prev=>{
      const next = [...prev,tool];
      localStorage.setItem("buddy_user_tools",JSON.stringify(next));
      return next;
    });
  },[]);

  const removeUserTool = useCallback((id)=>{
    setUserTools(prev=>{
      const next = prev.filter(t=>t.id!==id);
      localStorage.setItem("buddy_user_tools",JSON.stringify(next));
      return next;
    });
  },[]);

  const saveProject = ()=>{
    if (!debouncedQuery&&!Object.values(filters).some(Boolean)) return;
    const p = {id:Date.now(),query:debouncedQuery,filters:{...filters},results:results.slice(0,6).map(t=>t.name),savedAt:new Date().toLocaleDateString()};
    const next = [p,...projects].slice(0,12);
    setProjects(next);
    localStorage.setItem("buddy_projects",JSON.stringify(next));
  };

  const deleteProject = (id)=>{
    const next = projects.filter(p=>p.id!==id);
    setProjects(next);
    localStorage.setItem("buddy_projects",JSON.stringify(next));
  };

  const handleLogin = ()=>{
    if (!loginForm.name.trim()||!loginForm.email.trim()) return;
    const u = {name:loginForm.name,email:loginForm.email};
    setUser(u);
    localStorage.setItem("buddy_user",JSON.stringify(u));
    setShowLogin(false);
  };
  const logout = ()=>{ setUser(null); localStorage.removeItem("buddy_user"); };

  const favTools = allTools.filter(t=>favorites.includes(t.id));

  // ── Render ────────────────────────────────────────────────
  const TABS = [
    {id:"search",label:"🔍 Discover"},
    {id:"trending",label:"🔥 Trending"},
    {id:"favorites",label:`⭐ Saved (${favorites.length})`},
    {id:"mytools",label:`👤 My Tools (${userTools.length})`},
  ];

  const FilterSelects = [
    {key:"pricing",label:"💰 Budget",opts:["","free","freemium"]},
    {key:"skill_level",label:"🎓 Skill Level",opts:["","beginner","intermediate","advanced"]},
    {key:"output_type",label:"📦 Output",opts:["","Video","Image","Text","Audio","Code","Other"]},
    {key:"industry",label:"🏭 Industry",opts:["","Marketing","Software Development","Design","Video Editing","Audio / Music","Business / Productivity","Mechanical / Engineering","Education","Research"]},
  ];

  const cardProps = { mode, favorites, onFav:toggleFav, onCompare:toggleCompare, onSelect:setSelectedTool, onSample:setSampleTool, compareList };

  return (
    <div style={css.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#04040e;}::-webkit-scrollbar-thumb{background:rgba(124,58,237,0.38);border-radius:3px;}
        select option{background:#0c0a1e;color:#e2e8f0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(124,58,237,0.2)}50%{box-shadow:0 0 40px rgba(124,58,237,0.4)}}
        .nav-btn:hover{color:#c4b5fd !important;background:rgba(124,58,237,0.14) !important;}
        .search-in:focus{border-color:rgba(124,58,237,0.5) !important;box-shadow:0 0 0 3px rgba(124,58,237,0.09) !important;}
        .filter-sel:focus{border-color:rgba(124,58,237,0.4) !important;}
        .chat-in:focus{outline:none;border-color:rgba(124,58,237,0.38) !important;}
        .btn-glow{animation:glowPulse 2.5s ease infinite;}
        .trend-row:hover{border-color:rgba(124,58,237,0.38) !important;background:rgba(20,16,44,0.95) !important;}
      `}</style>

      {/* ── BACKGROUND ORBS ─────────────────────────────────────── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"4%",left:"6%",width:500,height:500,background:"radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",top:"45%",right:"4%",width:380,height:380,background:"radial-gradient(circle,rgba(168,85,247,0.05) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",bottom:"8%",left:"28%",width:320,height:320,background:"radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)"}}/>
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <nav style={css.nav}>
        <div style={css.logo} onClick={()=>{setQuery("");setSearched(false);setActiveTab("search");}}>◈ Buddy AI</div>
        <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
          {TABS.map(tab=>(
            <button key={tab.id} className="nav-btn" style={css.pill(activeTab===tab.id)} onClick={()=>setActiveTab(tab.id)}>{tab.label}</button>
          ))}
          {compareList.length>0&&(
            <button className="nav-btn" style={{...css.pill(false),background:"rgba(124,58,237,0.17)",border:"1px solid rgba(124,58,237,0.38)",color:"#c4b5fd"}}
              onClick={()=>setShowCompare(true)}>⚖ Compare ({compareList.length})</button>
          )}
          <button className="nav-btn" style={css.pill(showProjects)} onClick={()=>setShowProjects(!showProjects)}>📁 Projects</button>
          <button className="nav-btn" style={{...css.pill(false),color:"#6ee7b7",border:"1px solid rgba(16,185,129,0.2)"}}
            onClick={()=>setShowAddTool(true)}>+ Add Tool</button>
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff"}}>
                {user.name[0].toUpperCase()}
              </div>
              <button className="nav-btn" style={css.pill(false)} onClick={logout}>Logout</button>
            </div>
          ):(
            <button style={{...css.btn("primary"),fontSize:12,padding:"5px 13px"}} onClick={()=>setShowLogin(true)}>Sign In</button>
          )}
        </div>
      </nav>

      {/* ════════════ SEARCH TAB ════════════════════════════════════ */}
      {activeTab==="search"&&(
        <>
          {/* Hero */}
          <div style={css.hero}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.22)",borderRadius:20,padding:"5px 14px",marginBottom:20,fontSize:12,color:"#a78bfa"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#6ee7b7",display:"inline-block",animation:"pulse 2s infinite"}}/>
              {allTools.length}+ AI tools indexed · Updated daily
            </div>
            <h1 style={css.h1}>Find Your Perfect<br/>AI Tool Instantly</h1>
            <p style={css.sub}>Describe your task in plain English. Our AI engine<br/>matches, ranks, and explains the best tools for you.</p>

            {/* Search bar */}
            <div style={css.searchWrap}>
              <input className="search-in" style={css.searchIn}
                placeholder="e.g. create AI YouTube video, generate logo, write essay, build app..."
                value={query} onChange={e=>setQuery(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&setDebouncedQuery(query)}
              />
              <button style={css.searchBtn} onClick={()=>setDebouncedQuery(query)}>⌕</button>
            </div>

            {/* Mode toggle */}
            <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:18}}>
              {[["quick","⚡ Quick","Fast top results"],["deep","🧠 Deep","Full analysis + workflow"]].map(([m,label,sub])=>(
                <button key={m} onClick={()=>setMode(m)}
                  style={{background:mode===m?"rgba(124,58,237,0.2)":"rgba(255,255,255,0.03)",border:mode===m?"1px solid rgba(124,58,237,0.42)":"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"7px 16px",cursor:"pointer",color:mode===m?"#c4b5fd":"#475569",fontSize:13,fontWeight:mode===m?600:400,transition:"all 0.2s"}}>
                  {label} <span style={{fontSize:11,opacity:0.65}}>— {sub}</span>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div style={css.filtersRow}>
              {FilterSelects.map(({key,label,opts})=>(
                <select key={key} className="filter-sel" style={css.sel} value={filters[key]}
                  onChange={e=>setFilters(f=>({...f,[key]:e.target.value}))}>
                  <option value="">{label}</option>
                  {opts.filter(Boolean).map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
                </select>
              ))}
              {Object.values(filters).some(Boolean)&&(
                <button style={{...css.btn("ghost"),fontSize:12,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.22)",color:"#f87171"}}
                  onClick={()=>setFilters({pricing:"",skill_level:"",output_type:"",industry:""})}>Clear ✕</button>
              )}
            </div>
          </div>

          {/* Results */}
          {searched&&(
            <div style={{...css.section,animation:"fadeUp 0.3s ease"}}>
              {/* Workflow planner */}
              {workflow&&mode==="deep"&&<WorkflowPanel wf={workflow}/>}

              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <div style={css.sTitle}>
                  <span>🎯</span>
                  <span>{results.length>0?`${results.length} Tools Matched`:"No results found"}</span>
                  {results.length>0&&<span style={{fontSize:13,color:"#334155",fontWeight:400}}>— ranked by AI score</span>}
                </div>
                {results.length>0&&(
                  <button style={{...css.btn("outline"),fontSize:12}} onClick={saveProject}>💾 Save Project</button>
                )}
              </div>

              {results.length>0?(
                <div style={css.grid}>
                  {results.map((tool,i)=>(
                    <div key={tool.id} style={{animationName:"fadeUp",animationDuration:"0.35s",animationDelay:`${i*0.03}s`,animationFillMode:"both"}}>
                      <ToolCard tool={tool} showReason {...cardProps}/>
                    </div>
                  ))}
                </div>
              ):(
                <div style={{textAlign:"center",padding:"60px 0",color:"#334155"}}>
                  <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                  <p style={{fontSize:17,fontWeight:600,marginBottom:6}}>No tools matched</p>
                  <p style={{fontSize:13}}>Try different keywords or remove filters</p>
                </div>
              )}
            </div>
          )}

          {/* Trending (idle state) */}
          {!searched&&(
            <div style={css.section}>
              <div style={css.sTitle}><span>🔥</span><span>Trending Right Now</span></div>
              <div style={css.grid}>
                {trending.map(tool=><ToolCard key={tool.id} tool={tool} {...cardProps}/>)}
              </div>
            </div>
          )}
        </>
      )}

      {/* ════════════ TRENDING TAB ══════════════════════════════════ */}
      {activeTab==="trending"&&(
        <div style={css.section}>
          <div style={{padding:"40px 0 28px",textAlign:"center"}}>
            <h2 style={{fontSize:32,fontWeight:800,background:"linear-gradient(135deg,#f59e0b,#ef4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>🔥 Trending AI Tools</h2>
            <p style={{color:"#475569"}}>Ranked by real-world popularity, adoption, and community buzz</p>
          </div>
          {[...TOOLS].sort((a,b)=>b.popularity_score-a.popularity_score).slice(0,25).map((tool,i)=>(
            <div key={tool.id} className="trend-row"
              style={{display:"flex",alignItems:"center",gap:14,background:"rgba(12,10,28,0.87)",border:"1px solid rgba(124,58,237,0.1)",borderRadius:14,padding:"14px 18px",marginBottom:9,cursor:"pointer",transition:"all 0.2s"}}
              onClick={()=>setSelectedTool(tool)}>
              <div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0,background:i<3?"linear-gradient(135deg,#f59e0b,#ef4444)":"rgba(124,58,237,0.15)",color:i<3?"#fff":"#a78bfa"}}>
                #{i+1}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontWeight:700,color:"#f1f5f9",fontSize:14,margin:0}}>{tool.name}</p>
                <p style={{color:"#475569",fontSize:11,margin:"2px 0 0"}}>{tool.industry} · {tool.output_type} · {tool.skill_level}</p>
                {tool.trending_reason&&<p style={{color:"#f59e0b",fontSize:11,margin:"3px 0 0"}}>🔥 {tool.trending_reason}</p>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:14,flexShrink:0,flexWrap:"wrap"}}>
                <span style={css.badge(tool.pricing)}>{tool.pricing}</span>
                <span style={{color:"#f59e0b",fontSize:13}}>★ {tool.rating.toFixed(1)}</span>
                <div style={{width:70,height:5,background:"rgba(124,58,237,0.12)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{width:`${tool.popularity_score}%`,height:"100%",background:i<3?"linear-gradient(90deg,#f59e0b,#ef4444)":"linear-gradient(90deg,#7c3aed,#a855f7)",borderRadius:3}}/>
                </div>
                <span style={{color:"#a78bfa",fontWeight:700,fontSize:13,minWidth:24}}>{tool.popularity_score}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ FAVORITES TAB ═════════════════════════════════ */}
      {activeTab==="favorites"&&(
        <div style={css.section}>
          <div style={{padding:"40px 0 28px",textAlign:"center"}}>
            <h2 style={{fontSize:32,fontWeight:800,background:"linear-gradient(135deg,#f59e0b,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>⭐ Saved Tools</h2>
            <p style={{color:"#475569"}}>{favTools.length} tool{favTools.length!==1?"s":""} in your collection</p>
          </div>
          {favTools.length>0?(
            <div style={css.grid}>{favTools.map(tool=><ToolCard key={tool.id} tool={tool} {...cardProps}/>)}</div>
          ):(
            <div style={{textAlign:"center",padding:"80px 0",color:"#334155"}}>
              <div style={{fontSize:52,marginBottom:14}}>⭐</div>
              <p style={{fontSize:17,fontWeight:600,marginBottom:6}}>No saved tools yet</p>
              <p style={{fontSize:13,marginBottom:20}}>Click ☆ on any tool card to save it here</p>
              <button style={css.btn("primary")} onClick={()=>setActiveTab("search")}>Explore Tools →</button>
            </div>
          )}
        </div>
      )}

      {/* ════════════ MY TOOLS TAB ══════════════════════════════════ */}
      {activeTab==="mytools"&&(
        <div style={css.section}>
          <div style={{padding:"40px 0 28px",textAlign:"center"}}>
            <h2 style={{fontSize:32,fontWeight:800,background:"linear-gradient(135deg,#6ee7b7,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>👤 My Added Tools</h2>
            <p style={{color:"#475569",marginBottom:20}}>{userTools.length} tool{userTools.length!==1?"s":""} you've contributed</p>
            <button style={css.btn("primary")} onClick={()=>setShowAddTool(true)}>+ Add New Tool</button>
          </div>
          {userTools.length>0?(
            <div style={css.grid}>
              {userTools.map(tool=>(
                <div key={tool.id} style={{position:"relative"}}>
                  <ToolCard tool={tool} {...cardProps}/>
                  <button onClick={()=>removeUserTool(tool.id)}
                    style={{position:"absolute",top:8,right:40,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:6,color:"#f87171",cursor:"pointer",fontSize:11,padding:"3px 8px"}}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ):(
            <div style={{textAlign:"center",padding:"60px 0",color:"#334155"}}>
              <div style={{fontSize:52,marginBottom:14}}>🛠️</div>
              <p style={{fontSize:17,fontWeight:600,marginBottom:6}}>No tools added yet</p>
              <p style={{fontSize:13,marginBottom:20}}>Know an AI tool that's missing? Add it and help the community!</p>
              <button style={css.btn("primary")} onClick={()=>setShowAddTool(true)}>+ Add Your First Tool</button>
            </div>
          )}
        </div>
      )}

      {/* ── COMPARE BAR ─────────────────────────────────────────── */}
      {compareList.length>0&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(6,4,20,0.97)",borderTop:"1px solid rgba(124,58,237,0.25)",padding:"11px 2rem",display:"flex",alignItems:"center",gap:12,zIndex:100,backdropFilter:"blur(20px)"}}>
          <span style={{color:"#475569",fontSize:12,whiteSpace:"nowrap"}}>⚖ Comparing:</span>
          <div style={{display:"flex",gap:8,flex:1,flexWrap:"wrap"}}>
            {compareList.map(t=>(
              <div key={t.id} style={{display:"flex",alignItems:"center",gap:5,background:"rgba(124,58,237,0.12)",border:"1px solid rgba(124,58,237,0.25)",borderRadius:8,padding:"5px 10px",fontSize:12,color:"#a78bfa"}}>
                {t.name}
                <button onClick={()=>toggleCompare(t)} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:13,lineHeight:1}}>✕</button>
              </div>
            ))}
          </div>
          {compareList.length>=2
            ? <button style={css.btn("primary")} onClick={()=>setShowCompare(true)}>Compare Now →</button>
            : <span style={{fontSize:12,color:"#475569"}}>Add {2-compareList.length} more to compare</span>
          }
          <button style={{...css.btn("ghost"),color:"#475569",fontSize:12}} onClick={()=>setCompareList([])}>Clear All</button>
        </div>
      )}

      {/* ── PROJECTS PANEL ─────────────────────────────────────── */}
      {showProjects&&(
        <div style={css.modal} onClick={()=>setShowProjects(false)}>
          <div style={{...css.modalBox,maxWidth:480}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{color:"#f1f5f9",fontWeight:700,margin:0}}>📁 Saved Projects</h3>
              <button onClick={()=>setShowProjects(false)} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:18}}>✕</button>
            </div>
            {projects.length>0?projects.map(p=>(
              <div key={p.id} style={{background:"rgba(124,58,237,0.06)",border:"1px solid rgba(124,58,237,0.16)",borderRadius:12,padding:14,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{cursor:"pointer",flex:1}} onClick={()=>{setQuery(p.query);setFilters(p.filters);setActiveTab("search");setShowProjects(false);}}>
                    <p style={{fontWeight:600,color:"#e2e8f0",margin:"0 0 4px",fontSize:14}}>"{p.query||"Filtered search"}"</p>
                    <p style={{color:"#475569",fontSize:11,margin:"0 0 6px"}}>Saved {p.savedAt} · {p.results.length} tools found</p>
                    <p style={{color:"#64748b",fontSize:11,margin:0}}>Top: {p.results.slice(0,3).join(", ")}</p>
                  </div>
                  <button onClick={()=>deleteProject(p.id)} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:14,marginLeft:8}}>🗑</button>
                </div>
              </div>
            )):(
              <div style={{textAlign:"center",padding:"40px 0",color:"#334155"}}>
                <div style={{fontSize:40,marginBottom:10}}>📁</div>
                <p>No projects saved yet.</p>
                <p style={{fontSize:12,marginTop:6}}>Do a search and click "Save Project" to save it here.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CHATBOT ─────────────────────────────────────────────── */}
      <div style={css.chatBox}>
        {showChat&&<Chatbot onClose={()=>setShowChat(false)}/>}
        <button className="btn-glow"
          onClick={()=>setShowChat(!showChat)}
          style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a855f7)",border:"none",cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"auto"}}>
          {showChat?"✕":"🤖"}
        </button>
      </div>

      {/* ── LOGIN MODAL ─────────────────────────────────────────── */}
      {showLogin&&(
        <div style={css.modal} onClick={()=>setShowLogin(false)}>
          <div style={{...css.modalBox,maxWidth:380}} onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:36,marginBottom:10}}>◈</div>
              <h2 style={{color:"#f1f5f9",fontWeight:800,fontSize:22,margin:"0 0 6px"}}>Welcome to Buddy AI</h2>
              <p style={{color:"#475569",fontSize:13}}>Save tools, create projects, and personalize your experience</p>
            </div>
            {[{k:"name",ph:"Full Name",t:"text",ic:"👤"},{k:"email",ph:"Email Address",t:"email",ic:"✉️"},{k:"password",ph:"Password",t:"password",ic:"🔒"}].map(({k,ph,t,ic})=>(
              <div key={k} style={{position:"relative",marginBottom:12}}>
                <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:14}}>{ic}</span>
                <input type={t} placeholder={ph}
                  style={{width:"100%",background:"rgba(14,14,32,0.97)",border:"1px solid rgba(124,58,237,0.2)",borderRadius:10,padding:"11px 13px 11px 36px",color:"#e2e8f0",fontSize:13,outline:"none",boxSizing:"border-box"}}
                  value={loginForm[k]} onChange={e=>setLoginForm(f=>({...f,[k]:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
              </div>
            ))}
            <button style={{...css.btn("primary"),width:"100%",padding:13,fontSize:14,marginTop:6}} onClick={handleLogin}>
              Create Account →
            </button>
          </div>
        </div>
      )}

      {/* ── MODALS ──────────────────────────────────────────────── */}
      {selectedTool&&(
        <DetailsModal
          tool={selectedTool}
          allTools={allTools}
          favorites={favorites}
          onFav={toggleFav}
          onCompare={toggleCompare}
          compareList={compareList}
          onSample={setSampleTool}
          onClose={()=>setSelectedTool(null)}
          onSelectTool={setSelectedTool}
        />
      )}
      {showCompare&&compareList.length>=2&&(
        <CompareModal list={compareList} onClose={()=>setShowCompare(false)}/>
      )}
      {sampleTool&&<SampleModal tool={sampleTool} onClose={()=>setSampleTool(null)}/>}
      {showAddTool&&<AddToolModal onClose={()=>setShowAddTool(false)} onAdd={addUserTool}/>}
    </div>
  );
}
