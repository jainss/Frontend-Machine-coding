export default function getIcon(node, isOpen) {
  if (node.type === "folder") {
    return isOpen ? "📂" : "📁";
  }

  const ext = node.name.split(".").pop();

  switch (ext) {
    case "js":
      return "🟨";
    case "jsx":
      return "⚛️";
    case "ts":
      return "🔷";
    case "json":
      return "🧾";
    case "html":
      return "🌐";
    case "css":
      return "🎨";
    default:
      return "📄";
  }
}
