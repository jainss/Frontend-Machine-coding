import { useState } from "react";

function TreeNode({ node, level = 0 }) {
    const isFolder = node.type === "folder";
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        if (!isFolder) {
            return;
        }
        setIsOpen(prev => !prev);
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
            </div>

            {isFolder &&
                isOpen &&
                node.children?.map((child) => {
                    return <TreeNode key={child.id} node={child} level={level + 1} />
                })}
        </div>
    );
}

export default function FileExplorer({ data }) {
    return (
        <div style={{ fontFamily: "monospace", fontSize: 14 }}>
            <TreeNode node={data} />
        </div>
    );
}