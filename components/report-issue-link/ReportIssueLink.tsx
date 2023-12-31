import clsx from "clsx";
import { Link, BrowserRouter as Router } from "react-router-dom";

function ReportIssueLink() {
    
    return (
        <div className={clsx('report-issue-link')}>
            <Router>
                <Link to='https://github.com/JStuve/github-extension/issues' target="_blank" rel="noopener norefferer">{'Have a problem? Submit an issue'}</Link>
            </Router>
        </div>
    )
}

export default ReportIssueLink;