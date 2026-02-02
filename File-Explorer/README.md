A tree UI where:

Folders can expand / collapse

Files are leaf nodes

Nested structure

Looks like VS Code / Drive sidebar

1️⃣ Requirements (Baseline)

Let’s start with minimum viable features:

✅ Show folders & files
✅ Expand / collapse folders
✅ Recursive rendering
✅ Clean state colocation
✅ Scalable to large trees


Component Design (IMPORTANT)
<FileExplorer>
 └── <TreeNode>  (recursive)
      ├── Folder
      │    └── TreeNode (children)
      └── File


👉 TreeNode is recursive
👉 State is colocated per folder (VERY important)