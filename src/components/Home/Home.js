import React from 'react'
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

const Home = ({ push }) => {
  return (
    <div marging="auto 0" width="300px">
      Welcome!
      <p />
      During this experiment you'll be shown a series of charts where two pieces will be marked
      with a dot. Inside the text input field below each chart enter your answer to the question,
      <b>"What percentage is the smaller of the larger?"</b>
      <p/>
      e.g. If you believe the smaller one is exactly half the size of the larger then you would enter "50".
      <p />
      <button onClick={() => push("/experiment/1")}>START</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {};
};

//Connect makes dispatch() avalable though props
export default connect(mapStateToProps, { push })(Home);