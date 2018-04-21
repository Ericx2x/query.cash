import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '138.68.54.100',
  port: 8332,
  username: 'bitcoin',
  password: 'xhFjluMJMyOXcYvF',
  corsproxy: true
});

class GetBlockTemplate extends Component {
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
    // BITBOX.RawTransactions.GetBlockTemplate(this.state.txid).then((result) => {
    //   this.setState({
    //     data: result
    //   })
    // }, (err) => { console.log(err); });
    e.preventDefault();
  }

  render() {
    return (
      <div className="GetBlockTemplate">
        <h1 className="GetBlockTemplate-title">GetBlockTemplate</h1>
        <p>Coming Soon</p>
        <h2>Command Result</h2>
        <SyntaxHighlighter language='javascript' style={ocean}>{this.state.data}</SyntaxHighlighter>
        <h2>RPC Help</h2>
        <SyntaxHighlighter language='bash' style={ocean}>{`
  If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'.
  It returns data needed to construct a block to work on.
  For full specification, see BIPs 22, 23, 9, and 145:
      https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
      https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
      https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
      https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki

  Arguments:
  1. template_request         (json object, optional) A json object in the following spec
       {
         "mode":"template"    (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
         "capabilities":[     (array, optional) A list of strings
             "support"          (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
             ,...
         ],
         "rules":[            (array, optional) A list of strings
             "support"          (string) client side supported softfork deployment
             ,...
         ]
       }


  Result:
  {
    "version" : n,                    (numeric) The preferred block version
    "rules" : [ "rulename", ... ],    (array of strings) specific block rules that are to be enforced
    "vbavailable" : {                 (json object) set of pending, supported versionbit (BIP 9) softfork deployments
        "rulename" : bitnumber          (numeric) identifies the bit number as indicating acceptance and readiness for the named softfork rule
        ,...
    },
    "vbrequired" : n,                 (numeric) bit mask of versionbits the server requires set in submissions
    "previousblockhash" : "xxxx",     (string) The hash of current highest block
    "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
        {
           "data" : "xxxx",             (string) transaction data encoded in hexadecimal (byte-for-byte)
           "txid" : "xxxx",             (string) transaction id encoded in little-endian hexadecimal
           "hash" : "xxxx",             (string) hash encoded in little-endian hexadecimal (including witness data)
           "depends" : [                (array) array of numbers
               n                          (numeric) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
               ,...
           ],
           "fee": n,                    (numeric) difference in value between transaction inputs and outputs (in Satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
           "sigops" : n,                (numeric) total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
           "required" : true|false      (boolean) if provided and true, this transaction must be in the final block
        }
        ,...
    ],
    "coinbaseaux" : {                 (json object) data that should be included in the coinbase's scriptSig content
        "flags" : "xx"                  (string) key name is to be ignored, and value included in scriptSig
    },
    "coinbasevalue" : n,              (numeric) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in Satoshis)
    "coinbasetxn" : { ... },          (json object) information for coinbase transaction
    "target" : "xxxx",                (string) The hash target
    "mintime" : xxx,                  (numeric) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
    "mutable" : [                     (array of string) list of ways the block template may be changed
       "value"                          (string) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
       ,...
    ],
    "noncerange" : "00000000ffffffff",(string) A range of valid nonces
    "sigoplimit" : n,                 (numeric) limit of sigops in blocks
    "sizelimit" : n,                  (numeric) limit of block size
    "curtime" : ttt,                  (numeric) current timestamp in seconds since epoch (Jan 1 1970 GMT)
    "bits" : "xxxxxxxx",              (string) compressed target of next block
    "height" : n                      (numeric) The height of the next block
  }

  Examples:
  > bitcoin-cli getblocktemplate
  > curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
        `}</SyntaxHighlighter>
      </div>
    );
  }
}

export default GetBlockTemplate;
