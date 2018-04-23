import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import JSONPretty from 'react-json-pretty';

class EstimatePriority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'null'
    };
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      txid: value
    });
  }

  handleSubmit(e) {
    // BITBOX.RawTransactions.EstimatePriority(this.state.txid).then((result) => {
    //   this.setState({
    //     data: result
    //   })
    // }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="EstimatePriority">
        <h1 className="EstimatePriority-title">EstimatePriority</h1>
        <p>Coming Soon</p>
        <h2>Command Result</h2>
        <JSONPretty id="json-pretty" json={this.state.data}></JSONPretty>
        <h2>RPC Help</h2>
        <SyntaxHighlighter language='bash' style={ocean}>{`
  estimatepriority nblocks

  DEPRECATED. Estimates the approximate priority a zero-fee transaction needs to begin
  confirmation within nblocks blocks.

  Arguments:
  1. nblocks     (numeric, required)

  Result:
  n              (numeric) estimated priority

  A negative value is returned if not enough transactions and blocks
  have been observed to make an estimate.

  Example:
  > bitcoin-cli estimatepriority 6
        `}</SyntaxHighlighter>
      </div>
    );
  }
}

export default EstimatePriority;
