import { createGitgraph, TemplateName, templateExtend } from '@gitgraph/js';

// Get the graph container HTML element.
const graphContainer = document.getElementById('graph-container');

// Extending template to adjust some options
const template = templateExtend(TemplateName.Metro, {
    commit: {
        message: {
            displayHash: false
        }
    }
});

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer, {
    template,
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


// Create POD branch with some commits
const podBranch = master.branch('dragonflies/awesome_feature');

// Make some changes in feature branch
podBranch
    .commit('Initial commit for awesome changes')
    .commit('Second commit for awesome changes');
    
// Create feature branch with some commits
const featureBranch = podBranch.branch('feature/ATT-1234');

// Make some changes in feature branch
featureBranch
    .commit('New feature added')
    .commit('Second commit for feature');

// Make more changes in master
// master.commit('Fourth commit to master');

// Create second feature branch with some commits
const featureBranch2 = podBranch.branch('feature/ATT-5678');

// Make some changes in feature branch
featureBranch2
    .commit('Another feature added')
    .commit('Second commit for second feature');

// Sync pod branch with master
podBranch.merge(master);

// Make more changes in pod branch
podBranch.commit('Third commit for feature');

// Sync feature branch with pod and merge
featureBranch.merge(podBranch);
podBranch.merge(featureBranch);

// Sync second feature branch with pod and merge
featureBranch2.merge(podBranch);
podBranch.merge(featureBranch2);

// Sync pod branch with master and merge
podBranch.merge(master);
master.merge(podBranch);
