import React, { Component } from 'react'
import { select } from 'd3-selection'
import { hierarchy, pack } from 'd3-hierarchy'

class BubbleChart extends Component {

  componentDidMount() {
    this.createBubbleChart()
  }

  componentDidUpdate() {
    this.createBubbleChart()
  }

  createBubbleChart = () => {
    const node = this.node
    const [height, width] = this.props.size
    const { data } = this.props
    const prefix = `O-${Math.random() * 0xffff | 0}-`;
    if (!data) return (<div>No data</div>)
    const marked = data.map((d, i) => d.marked ? i : -1).filter(d => d > -1)

    const packLayout = pack()
      .size([width - 2, height - 2])
      .padding(3);

    const root = packLayout(hierarchy({ children: data })
      .sum(d => d.val));

    const leaf = select(node)
      .selectAll("g")
      .data(root.leaves())
      .enter().append("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

    leaf.append("circle")
      .attr("r", d => d.r)
      .attr("fill", "#fff")
      .attr("stroke", "black")
      .attr("stroke-width", "5px")
      .attr("id", (d, i) => `${prefix}leaf-${i}`);

    leaf.append("circle")
    .attr("fill", "#black")
    .attr("r", (d, i) => marked.includes(i) ? 8 : 0)
  }

  render() {
    return (
      <svg ref={node => this.node = node} width={500} height={500} />
    )
  }
}

export default BubbleChart;