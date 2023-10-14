export {};

function hideIssues(): void {
	var issue = document.getElementById('issue_560');
	if(issue) {
		issue.style.display = 'none';
	}
}

hideIssues();
