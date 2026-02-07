#!/usr/bin/env node
const { loadJson } = require("../src/loadJson");
const { verifyBundle } = require("../src/verifyBundle");
const { printTimeline } = require("../src/printTimeline");
const { replayBundle } = require("../src/replayBundle");
const { exportBundle } = require("../src/exportBundle");

const [,, cmd, file, ...rest] = process.argv;

const HELP = `
WINDI WCAF Toolkit — Auditor's Swiss Army Knife

Usage:
  wcaf verify   <bundle.json>     Verify chain integrity
  wcaf timeline <bundle.json>     Print event timeline
  wcaf replay   <bundle.json>     Reconstruct final state
  wcaf export   <bundle.json>     Re-export with validation report
  wcaf help                       Show this help

Examples:
  wcaf verify invoice-audit.json
  wcaf timeline payment-trail.json
  wcaf replay INV-2025-0001.json
`;

if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
  console.log(HELP);
  process.exit(0);
}

if (!file) {
  console.error("Error: Missing file argument");
  console.log(HELP);
  process.exit(1);
}

try {
  const bundle = loadJson(file);

  switch (cmd) {
    case "verify":
      verifyBundle(bundle);
      break;
    case "timeline":
      printTimeline(bundle);
      break;
    case "replay":
      replayBundle(bundle);
      break;
    case "export":
      exportBundle(bundle, rest[0]);
      break;
    default:
      console.error(`Unknown command: ${cmd}`);
      console.log(HELP);
      process.exit(1);
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
