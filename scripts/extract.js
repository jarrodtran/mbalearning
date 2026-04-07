const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../../mba-curriculum.md');
const outDir = path.join(__dirname, '../content/modules');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const tableData = [
  { slug: 'case-study-method', title: 'The Executive Case Study Method', school: 'Harvard Business School', desc: 'Master the HBS Socratic approach to business problem-solving, stakeholder analysis, and executive communication.' },
  { slug: 'competitive-strategy', title: 'Competitive Strategy & Moats', school: 'Harvard Business School', desc: 'Porter\'s Five Forces, generic strategies, value chain analysis, and building durable competitive advantage.' },
  { slug: 'innovation-disruption', title: 'Innovation & Market Disruption', school: 'Harvard Business School', desc: 'Clayton Christensen\'s framework for identifying disruptive threats and building offensive disruption strategies.' },
  { slug: 'leadership-dynamics', title: 'Interpersonal Dynamics & Leadership', school: 'Stanford GSB', desc: 'Leadership styles, emotional intelligence, delegation frameworks, and navigating organizational conflict.' },
  { slug: 'strategic-marketing', title: 'Strategic Marketing & Positioning', school: 'Kellogg School of Management', desc: 'STP framework, value proposition design, the 4Ps marketing mix, and brand positioning strategy.' },
  { slug: 'negotiation', title: 'Advanced Negotiation Tactics', school: 'Harvard Negotiation Project', desc: 'BATNA, ZOPA, anchoring strategy, interest-based negotiation, and value-creating trades.' },
  { slug: 'corporate-finance', title: 'Corporate Finance & Valuation', school: 'University of Chicago Booth', desc: 'Time value of money, DCF valuation, WACC, capital structure, and M&A merger math.' },
  { slug: 'operations-systems', title: 'Operations & Systems Thinking', school: 'MIT Sloan School of Management', desc: 'Theory of Constraints, Lean waste elimination, process mapping, and capacity planning.' },
  { slug: 'global-strategy', title: 'Global Strategy & Expansion', school: 'INSEAD', desc: 'Ansoff Matrix, CAGE Distance framework, entry mode selection, and cross-cultural management.' },
  { slug: 'entrepreneurial-finance', title: 'Entrepreneurial Finance', school: 'Columbia Business School', desc: 'Startup funding lifecycle, VC fund economics, cap table management, and early-stage valuation.' },
  { slug: 'decision-making', title: 'Strategic Decision-Making', school: 'Harvard Kennedy School', desc: 'Decision framing, option generation, cognitive bias audit, pre-mortem analysis, and second-order thinking.' }
];

const raw = fs.readFileSync(curriculumPath, 'utf8');
const parts = raw.split(/^# MODULE [0-9]+:/m);

// parts[0] is intro. The rest are 1-11
for (let i = 1; i <= 11; i++) {
  const meta = tableData[i - 1];
  const content = parts[i].trim();
  
  // parts[i] still starts with the rest of the line (e.g. " THE EXECUTIVE CASE STUDY METHOD")
  // We can just keep the whole content but prepend frontmatter.
  // Actually, wait, when we split on " /^# MODULE [0-9]+:/m", the heading is removed.
  // The first line of `content` is the rest of the title. Let's restore the H1.
  
  const contentWithHeader = `# MODULE ${i}:${content}`;
  
  const frontmatter = `---
title: "${meta.title}"
module: ${i}
school: "${meta.school}"
description: "${meta.desc}"
slug: "${meta.slug}"
---

`;

  const md = frontmatter + contentWithHeader;
  const fp = path.join(outDir, `${meta.slug}.mdx`);
  fs.writeFileSync(fp, md);
  console.log(`Written ${fp}`);
}
