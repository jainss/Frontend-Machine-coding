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

export default function TreeNode({ node, level, onAdd, onDelete }) {
    const isFolder = node.type === "folder";
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        if (!isFolder) {
            return;
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

    function handleDelete(e){
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
                onClick={handleClick}>
                {isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}
                
                {node.id !== "root" && (
                    <button style={{ fontSize: "10px", marginLeft: "10px", borderRadius: "5px" }} onClick={handleDelete}>🗑️</button>
                )}

                {isFolder && (
                    <>
                        <button style={{ fontSize: "10px", marginLeft: "10px", borderRadius: "5px" }} onClick={() => handleAdd("file")}>➕📄</button>
                        <button style={{ fontSize: "10px", marginLeft: "10px", borderRadius: "5px" }} onClick={() => handleAdd("folder")}>➕📁</button>
                    </>
                )}
            </div>

            {isFolder &&
                isOpen &&
                node.children?.map((child) => {
                    return <TreeNode key={child.id} node={child} level={level + 1} onAdd={onAdd} onDelete={onDelete}/>
                })}
        </div>
    );
}
