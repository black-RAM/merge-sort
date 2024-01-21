class Clerk{
  public records: object[] = []

  constructor() {}

  assignId() {
    return "#" + Math.floor(Math.random() * 10000).toString()
  }

  record(id: string, parentId: string, array: number[]) {
    this.records.push({id, parentId, array})
  }
}

const clerk = new Clerk()

export default clerk