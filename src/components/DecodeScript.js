import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import JSONPretty from 'react-json-pretty';

class DecodeScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'null'
    };
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      hexstring: value
    });
  }

  handleSubmit(e) {
    this.props.bitbox.RawTransactions.decodeScript(this.state.hexstring).then((result) => {
      this.setState({
        data: result
      })
    }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="DecodeScript">
        <h1 className="DecodeScript-title">DecodeScript</h1>
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div className="pure-control-group">
              <label>Raw Hex</label>
              <input onChange={this.handleInputChange.bind(this)} id="hexstring" type="text" placeholder="hexstring"/>
            </div>
            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </div>
          </fieldset>
        </form>
        <h2>Command Result</h2>
        <JSONPretty id="json-pretty" json={this.state.data}></JSONPretty>
        <h2>RPC Help</h2>
        <SyntaxHighlighter language='bash' style={ocean}>{`
  decodescript "hexstring"

  Decode a hex-encoded script.

  Arguments:
  1. "hexstring"     (string) the hex encoded script

  Result:
  {
    "asm":"asm",   (string) Script public key
    "hex":"hex",   (string) hex encoded public key
    "type":"type", (string) The output type
    "reqSigs": n,    (numeric) The required signatures
    "addresses": [   (json array of string)
       "address"     (string) bitcoin address
       ,...
    ],
    "p2sh","address" (string) address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
  }

  Examples:
  > bitcoin-cli decodescript "hexstring"
  > curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodescript", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
        `}</SyntaxHighlighter>
      </div>
    );
  }
}

export default DecodeScript;
