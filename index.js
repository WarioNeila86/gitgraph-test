import { createGitgraph, TemplateName } from '@gitgraph/js';

// Get the graph container HTML element.
const graphContainer = document.getElementById('graph-container');

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer, {
    template: TemplateName.Metro,
    author: 'Ryanair Automation <auto@ryanair.ie>',
    elementId: 'graph-container',
    branchLabelOnEveryCommit: true,
    mode: 'extended' // or compact if you don't want the commit messages
});

// Simulate some commits in master
const master = gitgraph.branch('master');
master
    .commit('Initial commit')
    .commit('Second commit to master')
    .commit('Third commit to master');

// Create feature branch with some commits
const featureBranch = master.branch('feature/ATT-1234');

// Make some changes in feature branch
featureBranch
    .commit('New feature added')
    .commit('Second commit for feature');

// Make more changes in master
master.commit('Fourth commit to master');

// Create bugfix branch from master with some commits
const bugFixBranch = master.branch('bugfix/ATT-5678');
bugFixBranch
    .commit('Fixing some bug')
    .commit('Another commit fixing bug');

// Sync feature branch with master and merge
featureBranch.merge(master);
master.merge(featureBranch);

bugFixBranch
    .commit('Third commit fixing bug');

// Sync bugfix branch with master and merge
bugFixBranch.merge(master);
master.merge(bugFixBranch);
