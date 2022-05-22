export function copyNode(node) {
    return JSON.parse(JSON.stringify(node));
}