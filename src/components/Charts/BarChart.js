import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class BarChart extends Component {

  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart = () => {
    const [width, height] = this.props.size
    const { data } = this.props
    if (!data) return (<div>No data</div>)
    const values = data.map(d => d.val)
    const node = this.node
    const dataMax = max(values)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, height])

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(values)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(values)
      .style('fill', 'white')
      .style('stroke', "black")
      .style('stroke-width', "3")
      .attr('x', (d, i) => i * (width / values.length))
      .attr('y', d => height - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', (width / values.length) / 1.5)

    select(node)
      .selectAll('circle')
      .data(data)
      .enter()
      .append("circle")
      .style('fill', 'black')
      .attr("class", "dot")
      .attr("r", d => d.marked ? 8 : 0)
      .attr("cx", (d, i) => (i * (width / data.length)) + 15)
      .attr("cy", d => (height - yScale(d.val)/2))

  }
  render() {
    return <svg ref={node => this.node = node} width={500} height={500}></svg>
  }
}
export default BarChart