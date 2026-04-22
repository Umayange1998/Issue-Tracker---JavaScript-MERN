import IssueCatalog from "../../components/IssueCatalog";

const resentIssues = [
  {
    id: "1",
    title: "Fix mobile responsiveness on dashboard",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing. ",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    title: "Implement JWT authentication",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing. ",
    status: "Open",
    priority: "Urgent",
  },
  {
    id: "3",
    title: "Documentation for API v2",
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing. ",
    status: "Resolved",
    priority: "Medium",
  },
];
function MyTasks() {
  return <IssueCatalog resentIssues={resentIssues} />;
}

export default MyTasks;
