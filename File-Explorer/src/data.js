const fileTree = {
    id: "root",
    name: "root",
    type: "folder",
    children: [
      {
        id: "src",
        name: "src",
        type: "folder",
        children: [
          {
            id: "index",
            name: "index.js",
            type: "file"
          },
          {
            id: "App",
            name: "App.js",
            type: "file"
          }
        ]
      },
      {
        id: "package",
        name: "package.json",
        type: "file"
      }
    ]
  };
  
  export default fileTree;