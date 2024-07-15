export class Todo {
    sn: number = 0
    title: string = ""
    description: string = ""
    date: string = ""
    priority: string = ""
    status: string = "to-do"
    todoHistory: history[] =[]
}

export class history {
    timestamp: Date;
    action: string;
    oldValue?: any;
    newValue?: any;
}