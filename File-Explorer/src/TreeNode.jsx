import { useState } from "react";

function addNode(tree, parentId, newNode) {
    if (tree.id === parentId && tree.type === "folder") {
        return {
            ...tree, children: tree.children ? [...tree.children, newNode] : [newNode]
        }
    }

    if (!tree.children) {
        return tree;
    }

    return {
        ...tree,
        children: tree.children.map(child => {
            return addNode(child, parentId, newNode)
        })
    }
}

function fetchFolderContents(folderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: folderId + "-file1",
                    name: "index.js",
                    type: "file",
                },
                {
                    id: folderId + "-file2",
                    name: "App.js",
                    type: "file",
                },
            ]);
        }, 800);
    });
}

export default function TreeNode({ node, level, onAdd, onDelete }) {
    const isFolder = node.type === "folder";
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [children, setChildren] = useState(node.children);

    async function handleToggle() {
        if (!isFolder) return;
      
        if (!isOpen && children === null) {
          setIsLoading(true);
          try {
            const data = await fetchFolderContents(node.id);
            setChildren(data);
          } catch (e) {
            console.error("Error loading folder", e);
            setChildren([]);
          } finally {
            setIsLoading(false);
          }
        }
      
        setIsOpen(prev => !prev);
      }
      

    function handleAdd(type) {
        const name = prompt(`Enter ${type} name:`);

        if (!name) return;

        const newNode = {
            id: Date.now().toString(),
            name,
            type,
            ...(type === "folder" ? { children: [] } : {})
        }

        onAdd(prevTree => addNode(prevTree, node.id, newNode));
        setIsOpen(true);
    }

    function handleDelete(e) {
        e.stopPropagation();
        onDelete(node.id);
    }

    return (
        <div>
            <div
                style={{
                    paddingLeft: level * 16,
                    cursor: isFolder ? "pointer" : "default",
                    userSelect: "none",
                }}
                onClick={handleToggle}>
                {isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}

                {node.id !== "root" && (
                    <button style={{ fontSize: "10px", marginLeft: "10px", borderRadius: "5px" }} onClick={handleDelete}>🗑️</button>
                )}

                {isFolder && (
                    <>
                        <button style={{ fontSize: "10px", marginLeft: "10px", borderRadius: "5px" }} onClick={() => { e.stopPropagation(); handleAdd("file")}}>➕📄</button>
                        <button style={{ fontSize: "10px", marginLeft: "10px", borderRadius: "5px" }} onClick={() => handleAdd("folder")}>➕📁</button>
                    </>
                )}

                {isLoading && <span>⏳</span>}

            </div>

            {isFolder &&
                isOpen &&
                children?.map((child) => {
                    return <TreeNode key={child.id} node={child} level={level + 1} onAdd={onAdd} onDelete={onDelete} />
                })}
        </div>
    );
}
