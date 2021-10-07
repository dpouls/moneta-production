import "./receipt.scss";
import React, { Component } from "react";
import font from "./RobotoMono-Regular.ttf";
import { withRouter } from "react-router-dom";
import Axios from "axios";

// import "./OneTransaction.scss";
import dateFormat from "dateformat";
import {
  Document,
  Page,
  Font,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
Font.register({
  family: "Roboto Mono",
  fonts: [
    {
      src: font,
    },
  ],
});
// Font.register({ family: 'Roboto Mono', src: `\RobotoMono-Regular.ttf`, fontStyle: 'normal',fontWeight: 'normal'})
class Receipt extends Component {
  constructor() {
    super();
    this.state = {
      transaction: [],
    };
  }
  componentDidMount = () => {
    this.getOneTransaction();
  };
  getOneTransaction = () => {
    Axios.get(`/api/transactions/${this.props.match.params.t_id}`).then(
      (res) => {
        this.setState({ transaction: res.data });
        console.log(this.state.transaction);
      }
    );
  };

  render() {
    const styles = StyleSheet.create({
      oneTransactionContainer: {
        // backgroundColor: 'green',
        boxSizing: "border-box",
        // width: "100vw",
        // display: "flex",
        // flexDirection: 'row',
        // justifyContent: "center",
        // paddingTop: "50px"
      },
      receiptContainer: {
        // backgroundColor: 'yellow',
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        // border: "1mm solid black",
        width: "100vw",
        boxSizing: "border-box",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "10px 20px",
        fontSize: "12pt",
        fontFamily: "Roboto Mono",
      },
      receiptItemAndPrice: {
        // backgroundColor: 'red',
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        boxSizing: "border-box",
      },
      allReceiptItems: {
        width: "100%",
        borderTop: "1mm solid #408cff",
        borderBottom: "1mm solid #408cff",
        padding: "5px",
        marginTop: "5px",
      },
      subtotalTotalContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        // backgroundColor: 'lightblue',
        width: "100%",
      },
    });
    console.log(this.props);
    const { transaction } = this.state;
    return (
      <PDFViewer style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
        {transaction[0] ? (
          <Document>
            <Page
              size="A6"
              // tsyle={{ backgroundColor: 'tomato' }}
            >
              <View
                style={styles.oneTransactionContainer}
                className="one-transaction-container"
              >
                {/* {transaction[0] ? ( */}
                <View style={styles.receiptContainer}>
                  <Text>Receipt #: {transaction[0].t_id}</Text>
                  <Text>
                    Customer:{" "}
                    {transaction[0].first_name.length > 0 ? (
                      <View>
                        {transaction[0].first_name +
                          " " +
                          transaction[0].last_name}
                      </View>
                    ) : (
                      "None"
                    )}
                  </Text>
                  <Text>
                    {dateFormat(transaction.t_date, "m/d/yy h:MM TT")}
                  </Text>
                  <View
                    style={styles.allReceiptItems}
                    className="all-receipt-items"
                  >
                    {transaction.map((o, i) => {
                      return (
                        <View
                          style={styles.receiptItemAndPrice}
                          className="receipt-item-and-price"
                          key={i}
                        >
                          <Text>{o.name}</Text>
                          <Text>{o.price}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={styles.subtotalTotalContainer}
                    className="subtotal-total-container"
                  >
                    <Text>
                      Subtotal: $
                      {transaction
                        .reduce((ac, cv) => {
                          return ac + parseInt(cv.price);
                        }, 0)
                        .toFixed(2)}
                    </Text>
                    <Text>
                      Tax: $
                      {(
                        +transaction[0].total -
                        transaction.reduce((ac, cv) => {
                          return ac + parseInt(cv.price);
                        }, 0)
                      ).toFixed(2)}
                    </Text>
                    <Text>Total: ${transaction[0].total}</Text>
                  </View>
                </View>
                {/* ) 
              : (
                <Text>loading...</Text>
              )} */}
              </View>
            </Page>
          </Document>
        ) : (
          <Document>
            <Page size="A4">
              <View>
                <Text>Loading...</Text>
              </View>
            </Page>
          </Document>
        )}
      </PDFViewer>
    );
  }
}

export default withRouter(Receipt);

// import React, { Component } from "react";

// import { withRouter } from "react-router-dom";
// import Axios from "axios";

// // import "./OneTransaction.scss";
// import dateFormat from "dateformat";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer
// } from "@react-pdf/renderer";

// class Receipt extends Component {
//   constructor() {
//     super();
//     this.state = {
//       transaction: []
//     };
//   }
//   componentDidMount = () => {
//     this.getOneTransaction();
//   };
//   getOneTransaction = () => {
//     Axios.get(`/api/transactions/${this.props.match.params.t_id}`).then(res => {
//       this.setState({ transaction: res.data });
//       console.log(this.state.transaction);
//     });
//   };
//   render() {
//     console.log(this.props);
//     const { transaction } = this.state;
//     return (
//       <PDFViewer>
// <Document>
//   <Page size="A4">
//     <View className="one-transaction-container">
//       {transaction[0] ? (
//         <View
//           className="receipt-container"
//           style={{ marginTop: "50px" }}
//         >
//           <View>Receipt #: {transaction[0].t_id}</View>
//           <Text>
//             Customer:{" "}
//             {transaction[0].first_name.length > 0 ? (
//               <View>
//                 {transaction[0].first_name +
//                   " " +
//                   transaction[0].last_name}
//               </View>
//             ) : (
//               "None"
//             )}
//           </Text>
//           <Text>
//             {dateFormat(transaction.t_date, "m/d/yy h:MM TT")}
//           </Text>
//           <View className="all-receipt-items">
//             {transaction.map((o, i) => {
//               return (
//                 <View className="receipt-item-and-price" key={i}>
//                   <Text>{o.name}</Text>
//                   <Text>{o.price}</Text>
//                 </View>
//               );
//             })}
//           </View>
//           <View className="subtotal-total-container">
//             <Text>
//               Subtotal: $
//               {transaction
//                 .reduce((ac, cv) => {
//                   return ac + parseInt(cv.price);
//                 }, 0)
//                 .toFixed(2)}
//             </Text>
//             <Text>
//               Tax: $
//               {(
//                 +transaction[0].total -
//                 transaction.reduce((ac, cv) => {
//                   return ac + parseInt(cv.price);
//                 }, 0)
//               ).toFixed(2)}
//             </Text>
//             <Text>
//               <strong>Total: ${transaction[0].total}</strong>
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <Text>loading...</Text>
//       )}
//     </View>
//   </Page>
// </Document>
//            </PDFViewer>
//     );
//   }
// }

// export default withRouter(Receipt);
