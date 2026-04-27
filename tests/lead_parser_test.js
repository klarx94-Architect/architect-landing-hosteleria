// Simple test runner for lead context parser heuristics.
// This duplicates the parsing logic used in the API route and validates several cases.
const assert = (cond, msg) => { if (!cond) { console.error('FAIL:', msg); process.exitCode = 2; } };

function parseModelOutput(text) {
  let parsedLeadContext = undefined;
  try {
    // 1) fenced code block
    const fenceRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
    const fenceMatch = text.match(fenceRegex);
    if (fenceMatch && fenceMatch[1]) {
      const candidate = fenceMatch[1].trim();
      try {
        const maybe = JSON.parse(candidate);
        if (maybe && typeof maybe === 'object') {
          parsedLeadContext = maybe.leadContext ? maybe.leadContext : maybe;
          text = text.replace(fenceMatch[0], '').trim();
        }
      } catch (e) {
        // ignore
      }
    }
    // 2) fallback brace matching
    if (!parsedLeadContext) {
      const jsonStart = text.indexOf('{');
      if (jsonStart !== -1) {
        const possible = text.slice(jsonStart);
        let depth = 0;
        let endIdx = -1;
        for (let i = 0; i < possible.length; i++) {
          if (possible[i] === '{') depth++;
          else if (possible[i] === '}') {
            depth--;
            if (depth === 0) { endIdx = i; break; }
          }
        }
        if (endIdx !== -1) {
          const jsonStr = possible.slice(0, endIdx + 1);
          try {
            const maybe = JSON.parse(jsonStr);
            if (maybe && typeof maybe === 'object') {
              parsedLeadContext = maybe.leadContext ? maybe.leadContext : maybe;
              let before = text.slice(0, jsonStart);
              before = before.replace(/```(?:json)?\s*$/i, '');
              text = before.trim();
            }
          } catch (e) {}
        }
      }
    }
    // 3) clean leftover fences
    text = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  } catch (err) {
    parsedLeadContext = undefined;
  }
  return { text, leadContext: parsedLeadContext };
}

const tests = [
  {
    name: 'fenced json with leadContext',
    input: 'Aquí texto visible. ```json {"leadContext": {"leadName":"Ana","businessName":"Bar Uno"}} ```',
    expectTextContains: 'Aquí texto visible',
    expectLead: (lc) => lc && lc.leadName === 'Ana' && lc.businessName === 'Bar Uno'
  },
  {
    name: 'inline json after text',
    input: 'Gracias. {"leadName":"Carlos","businessType":"bar"}',
    expectTextContains: 'Gracias',
    expectLead: (lc) => lc && lc.leadName === 'Carlos' && lc.businessType === 'bar'
  },
  {
    name: 'backticks remain cleaned',
    input: 'Respuesta con backticks ``` some text ``` y luego más.',
    expectTextContains: 'Respuesta con backticks',
    expectLead: (lc) => lc === undefined
  },
  {
    name: 'malformed json ignored',
    input: 'Texto previo ```json {not: valid} ``` fin.',
    expectTextContains: 'Texto previo',
    expectLead: (lc) => lc === undefined
  }
];

let failed = false;
for (const t of tests) {
  const out = parseModelOutput(t.input);
  const okText = out.text.indexOf(t.expectTextContains) !== -1;
  const okLead = t.expectLead(out.leadContext);
  if (!okText || !okLead) {
    console.error('Test failed:', t.name);
    console.error('  input:', t.input);
    console.error('  parsed text:', out.text);
    console.error('  parsed leadContext:', out.leadContext);
    failed = true;
  } else {
    console.log('OK:', t.name);
  }
}

if (failed) process.exit(2);
else process.exit(0);
