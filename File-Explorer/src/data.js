const fileTree = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "src",
      name: "src",
      type: "folder",
      children: null   // 👈 lazy
    },
    {
      id: "public",
      name: "public",
      type: "folder",
      children: null   // 👈 lazy
    },
    {
      id: "package",
      name: "package.json",
      type: "file"
    }
  ]
};

export default fileTree;