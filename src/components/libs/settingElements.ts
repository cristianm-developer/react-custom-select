import { JSXElementConstructor, ReactNode, JSX, createElement, isValidElement, ReactElement, Ref, cloneElement, RefCallback, RefObject } from "react";

export function detectNode<T extends JSXElementConstructor<any>>(
    node: ReactNode,
    targetNode: T,
    childrenArray: ReactElement[],
    ref?: Ref<any> |null
) {
    let el;
    if (node) {
        el = handleNodeValue(node, targetNode, ref)
    }
    const nodesChildren = childrenArray.filter(e => e.type === targetNode);
    if ((el && nodesChildren.length) || nodesChildren.length > 1) {
        const name = (targetNode as any).name ?? 'Unknow';
        throw new Error(`Too many elements of ${name} detected`);
    } else if (nodesChildren.length == 1) {
        el = handleNodeValue(nodesChildren[0], targetNode, {ref})
    }

    return el;
}

export function handleNodeValue<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>(
    node: ReactNode,
    targetNode: T,
    propsOref: any
) {
    if (typeof node === 'string' || typeof node === "number") {
        return createElement(targetNode, propsOref ? { ref: propsOref } : {}, node);
    }
    if (isValidElement(node) && node.type === targetNode) {
        const element = node as ReactElement<any> & { ref?: Ref<any> };
        const combinedRef = composeRefs(element.ref, propsOref.ref);
        return cloneElement(node, { ref: combinedRef } as any);
    }

    throw new Error(`Invalid node type. Expected ${targetNode} but received ${typeof node}`);
}

export function composeRefs<T>(
    ...refs: (Ref<T> | undefined | null)[]    
): RefCallback<T> {
    return (el: T | null) => {
        for(const ref of refs){
            if(!ref) continue;

            if (typeof ref === 'function') {
                ref(el);
            } else if (typeof ref === 'object' && 'current' in ref) {
                (ref as RefObject<T | null>).current = el
            }            
        }
    }
};
