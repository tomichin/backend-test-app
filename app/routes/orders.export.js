import { json } from '@remix-run/node';
import { getOrders } from "../models/order.server";
//import pkg from 'json2csv';
//import pkg from 'json-2-csv';
import { json2csv } from 'json-2-csv';
//const { Parser } = pkg;
export const loader = async () => {
  const orders = await getOrders();
  const fields = [
    'orderId',
    'orderNumber',
    'totalPrice',
    'paymentGateway',
    'customerEmail',
    'customerName',
    'customerAddress',
    'tags',
    'createdAt'
  ];
  //const parser = new Parser({ fields });
  //const csv = await Parser(orders, fields);
  const csv = await json2csv(orders, {fields});
  //const csv = parser.parse(orders);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=orders.csv',
    },
  });
};