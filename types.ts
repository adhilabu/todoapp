export interface Task {
    id: number;
    title: string;
    description: string;
}

export function createDefaultTask(): Task {
    return {
        id: 0,
        title: '',
        description: '',
    };
}