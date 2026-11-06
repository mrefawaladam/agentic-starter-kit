#!/usr/bin/env node

/**
 * Knowledge Graph Query Utility
 * Saves tokens by pinpointing exactly what documents, components, and tests
 * are connected to a specific feature or file without scanning the whole codebase.
 */

const fs = require('fs');
const path = require('path');

const GRAPH_PATH = path.join(__dirname, '..', 'data', 'knowledge-graph.json');

function loadGraph() {
  if (!fs.existsSync(GRAPH_PATH)) {
    console.error(`Knowledge graph not found at ${GRAPH_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf-8'));
}

function queryFeature(graph, featureId) {
  const node = graph.nodes.find(n => n.id.toLowerCase() === featureId.toLowerCase());
  if (!node) {
    console.log(`Feature '${featureId}' not found in knowledge graph.`);
    return;
  }

  console.log(`\n======================================================`);
  console.log(`🎯 Feature: ${node.title} (${node.id})`);
  console.log(`Status: ${node.status} | Owner: ${node.owner}`);
  console.log(`Path: ${node.path}`);
  console.log(`======================================================\n`);

  // Find direct and 2nd degree outgoing relations
  const directEdges = graph.edges.filter(e => e.from === node.id);
  const relatedNodeIds = new Set(directEdges.map(e => e.to));

  // Find 2nd-degree relations
  graph.edges.forEach(e => {
    if (relatedNodeIds.has(e.from)) {
      relatedNodeIds.add(e.to);
    }
  });

  const connectedNodes = graph.nodes.filter(n => relatedNodeIds.has(n.id));

  console.log(`Connected Knowledge Nodes (Token-Saving Context Scope):`);
  connectedNodes.forEach(cn => {
    console.log(`  - [${cn.type.toUpperCase()}] ${cn.title}`);
    console.log(`    File: ${cn.path || 'N/A'}`);
  });
  console.log(`\n💡 To complete this task, load ONLY the files listed above.\n`);
}

function queryFile(graph, filePath) {
  const node = graph.nodes.find(n => n.path && n.path.includes(filePath));
  if (!node) {
    console.log(`No node associated with path '${filePath}'.`);
    return;
  }

  console.log(`\nNode: ${node.title} [${node.type}] (${node.id})`);
  const upstream = graph.edges.filter(e => e.to === node.id);
  const downstream = graph.edges.filter(e => e.from === node.id);

  console.log(`Upstream Dependencies:`);
  upstream.forEach(e => console.log(`  <- (${e.relation}) from ${e.from}`));

  console.log(`Downstream Impacts:`);
  downstream.forEach(e => console.log(`  -> (${e.relation}) to ${e.to}`));
}

const args = process.argv.slice(2);
const graph = loadGraph();

if (args.includes('--feature')) {
  const idx = args.indexOf('--feature');
  queryFeature(graph, args[idx + 1]);
} else if (args.includes('--file')) {
  const idx = args.indexOf('--file');
  queryFile(graph, args[idx + 1]);
} else {
  console.log(`Knowledge Graph CLI`);
  console.log(`Total Nodes: ${graph.nodes.length} | Total Edges: ${graph.edges.length}`);
  console.log(`\nUsage:`);
  console.log(`  node scripts/graph-lookup.js --feature <feature-id>`);
  console.log(`  node scripts/graph-lookup.js --file <file-path>`);
}
