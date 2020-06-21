import { createGitgraph } from "@gitgraph/js";

// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer);

// Simulate git commands with Gitgraph API.
const master = gitgraph.branch('master');
master
    .commit('Initial commit')
    .commit('One');

const featureBranch = gitgraph.branch('feature/ATT-1234');
featureBranch
    .commit('New feature added')
    .commit('Second commit for feature');

master.checkout();
const bugFixBranch = gitgraph.branch('bugfix/ATT-2051');
bugFixBranch
    .commit('Fixing some bug')
    .commit('Another commit fixing bug');

featureBranch.merge(master);
master.merge(featureBranch);

bugFixBranch.merge(master);
master.merge(bugFixBranch);