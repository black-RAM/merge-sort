class Clerk{
  private records: object[] = []

  constructor() {}

  assignId() {
    return "#" + Math.floor(Math.random() * 10000).toString()
  }

  record(id: string, parentId: string, data: number[]) {
    this.records.push({id, parentId, data})
  }

  getRecords(){
    return this.records
  }
}

const clerk = new Clerk()

export default clerk