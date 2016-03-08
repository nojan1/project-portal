export interface TreeItem<T> {
    title: string;
    nodes: T[];
    children: TreeItem<T>[]
}