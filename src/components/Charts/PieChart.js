import React, { Component } from 'react'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'

class PieChart extends Component {
  
  componentDidMount() {
    this.createPieChart()
  }
  componentDidUpdate() {
    this.createPieChart()
  }

  createPieChart = () => {
    const node = this.node
    const [height, width] = this.props.size
    const radius = Math.min(width, height) / 2;
    const { data } = this.props
    if (!data) return (<div>No data</div>)
    const marked = data.map((d, i) => d.marked ? i : -1).filter(d => d > -1)
    const values = data.map(d => d.val)

    const pieArc = arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const markerArc = arc()
      .outerRadius(radius - 100)
      .innerRadius(radius - 100);

    const pieShape = pie()
      .sort(null)
      .value(d => d);

    const g = select(node)
      .selectAll(".arc")
      .data(pieShape(values))
      .enter().append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");;

    g.append("path")
      .attr("d", pieArc)
      .style("fill", d => "white")
      .style("stroke", d => "black")
      .style("stroke-width", d => "3");

      g.append("circle")
      .attr("cx", d => markerArc.centroid(d)[0])
      .attr("cy", d => markerArc.centroid(d)[1])
      .attr("r", (d, i) => marked.includes(i) ? 8 : 0);

  }
  render() {
    return (
      <svg ref={node => this.node = node} width={500} height={500} />
    )
  }
}

export default PieChart