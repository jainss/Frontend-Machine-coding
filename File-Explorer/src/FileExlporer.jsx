import { useState } from "react";
import TreeNode from "./TreeNode";

function deleteNode(tree, targetId) {
    if (!tree.children) {
        return tree;
    }

    return {
        ...tree,
        children: tree.children
            .filter(child => child.id !== targetId)
            .map(child => deleteNode(child, targetId))
    };
} 

export default function FileExplorer({ data }) {
    const [tree, setTree] = useState(data)
    const [selectedIds, setSelectedIds] = useState(new Set());

    const handleDelete = (id) => {
        setTree(prevTree => deleteNode(prevTree, id));
    };

    const handleSelect= (id, isMulti)=>{
        setSelectedIds(prev => {
            const next = new Set(prev);
            if(isMulti){
                next.has(id)? next.delete(id):next.add(id);
            }else{
                next.clear();
                next.add(id);
            }
            return next;
        });
    }

    return (
        <div style={{ fontFamily: "monospace", fontSize: 14 }}>
            <TreeNode node={tree} level={0} onAdd={setTree} onDelete={handleDelete} onSelect={handleSelect} selectedIds={selectedIds}/>
        </div>
    );
}