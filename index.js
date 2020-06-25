import { createGitgraph, TemplateName, templateExtend } from '@gitgraph/js';

// Get the graph container HTML element.
const graphContainer = document.getElementById('graph-container');

// Extending template to adjust some options
const template = templateExtend(TemplateName.Metro, {
    commit: {
        message: {
            displayHash: false
        }
    },
    colors: ['#999999', '#ffcc00', '#3366ff']
});

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer, {
    template,
    author: 'Ryanair Automation <auto@ryanair.ie>',
    branchLabelOnEveryCommit: true,
    mode: 'extended' // or compact if you don't want the commit messages
});

// Simulate some commits in master
const master = gitgraph.branch('master');
master
    .commit('Initial commit to master')
    .commit('Second commit to master')
    .commit('Third commit to master');

// Create feature branch with some commits
const featureBranch = master.branch('feature/ATT-1234');

// Make some changes in feature branch
featureBranch
    .commit('ATT-1234 New feature added')
    .commit('ATT-1234 Second commit for feature');

// Make more changes in master
master.commit('Fourth commit to master');

// Create bugfix branch from master with some commits
const bugFixBranch = master.branch('bugfix/ATT-5678');
bugFixBranch
    .commit('ATT-5678 Fixing some bug')
    .commit('ATT-5678 Another commit fixing bug');

// Sync feature branch with master and merge
featureBranch.merge(master);
master.merge(featureBranch);

bugFixBranch
    .commit('ATT-5678 Third commit fixing bug');

// Sync bugfix branch with master and merge
bugFixBranch.merge(master);
master.merge(bugFixBranch);
