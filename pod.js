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
    colors: ['#999999', '#009933', '#ffcc00', '#3366ff']
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
    .commit('Initial commit on master')
    .commit('More changes on master')
    .commit('Yet more changes on master');


// Create POD branch with some commits
const podBranch = master.branch('dragonflies/new_feature');

// Make some changes in POD branch
podBranch
    .commit('Initial commit on POD branch');
    
// Create feature branch from POD branch
const featureBranch = podBranch.branch('feature/ATT-1234');

// Make some changes in feature branch
featureBranch
    .commit('ATT-1234 New feature added')
    .commit('ATT-1234 Second commit for feature');

// Make more changes in master
master.commit('And more changes on master');

// Create second feature branch from POD branch
const featureBranch2 = podBranch.branch('feature/ATT-5678');

// Make some changes in second feature branch
featureBranch2
    .commit('ATT-5678 Another feature added')
    .commit('ATT-5678 Second commit for second feature');

// Sync POD branch with master
podBranch.merge(master);

// Sync feature branch with POD and merge
featureBranch.merge(podBranch);
podBranch.merge(featureBranch);

// Sync second feature branch with POD and merge
featureBranch2.merge(podBranch);
podBranch.merge(featureBranch2);

// Sync POD branch with master and merge
podBranch.merge(master);
master.merge(podBranch);
