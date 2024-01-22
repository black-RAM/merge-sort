import * as d3 from "d3"

const height = window.innerHeight
const width = window.innerWidth - 20

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(10,0)") // left margin

const tooltip = d3
  .select("body")
  .append("p")
  .attr("id", "tooltip")

function renderSortTree(table: object[]) {
  const cluster = d3.cluster().size([height, width - 20])
  const root = d3.stratify()(table)
  cluster(root)

  const linkGenerator = d3.linkHorizontal<any, any>()
    .x(d => d.y)
    .y(d => d.x)

  // links between nodes
  svg.selectAll('path')
    .data(root.links())
    .join('path')
    .attr("d", linkGenerator)
    .style("fill", 'none')
    .attr("stroke", '#ccc')

  // point for each node
  interface NodeDatum extends d3.HierarchyNode<unknown> {
    x: number;
    y: number;
    data: {data: number[]}
  }

  svg.selectAll("g")
    .data(root.descendants() as NodeDatum[])
    .join("g")
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .append("circle")
      .attr("r", 7)
      .style("fill", "#69b3a2")
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", function(_, d){
        tooltip.text(JSON.stringify(d.data.data))
      })
      .on("mousemove", function(event) {
        tooltip.style("visibility", "visible")
          .style("top", event.pageY + "px")
          .style("left", event.pageX + "px")
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden")
      })

}

export default renderSortTree
