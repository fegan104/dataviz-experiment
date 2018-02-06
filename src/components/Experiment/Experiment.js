import React from 'react'
import { connect } from 'react-redux';
import { changeData } from '../../actions/DataActions'
import { addResponse } from '../../actions/ResponseActions'
import { addToCounter } from '../../actions/CounterActions'
import BarChart from '../Charts/BarChart'
import PieChart from '../Charts/PieChart'
import BubbleChart from '../Charts/BubbleChart'
import { push } from 'connected-react-router'

class Experiment extends React.Component {
  constructor(props) {
    super(props)
    this.props.changeData()
    this.state = { text: '' };
  }

  /**
   * A simple function that returns the next id cycely.
   */
  nextId = currentId => currentId === 3 ? 1 : currentId + 1

  /**
   * Gets the chart type for recording responses based on route id.
   */
  idToVis = currentId => {
    switch (currentId) {
      case 1: {
        return "Bar"
      }
      case 2: {
        return "Bubble"
      }
      case 3: {
        return "Pie"
      }
      default:
        return "N/A"
    }
  }

  nextRoute = (counter, currentId) => {
    if (counter >= 60) {
      return '/thank-you'
    } else {
      return `/experiment/${this.nextId(currentId)}`
    }
  }

  /**
   * This helper return the true percentage between the marked values.
   */
  calcTrue = data => data
    .filter(d => d.marked)
    .map(d => d.val)
    .reduce((a, b) => 100 * (Math.min(a, b) / Math.max(a, b)))

  render() {
    const {
      data,
      push,
      id,
      changeData,
      addResponse,
      sessionId,
      counter,
      addToCounter } = this.props

    let chart = null;
    if (id === 1) {
      chart = <BarChart data={data} size={[500, 500]} />
    } else if (id === 2) {
      chart = <BubbleChart data={data} size={[500, 500]} />
    } else {
      chart = <PieChart data={data} size={[500, 500]} />
    }
    return (
      <div margin="auto 0" style={{ marginTop: "8px" }}>
        <div style={{ float: "right" }}>{counter}/60</div>
        {chart}
        <div>
          <input
            style={{ height: 40 }}
            value={this.state.text}
            placeholder="Enter your answer"
            onChange={e => this.setState({ text: e.target.value })} />
          <button onClick={_ =>
            addResponse(sessionId, this.idToVis(id), this.calcTrue(data), Number.parseInt(this.state.text, 10))
              .then(() => changeData())
              .then(() => push(this.nextRoute(counter, id)))
              .then(() => addToCounter(counter))
              .then(this.setState({ text: "" }))
          }>Next</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data || [],
    id: Number.parseInt(ownProps.match.params.id, 10),
    sessionId: state.sessionId,
    counter: state.counter
  }
}

export default connect(mapStateToProps, { push, changeData, addResponse, addToCounter })(Experiment);