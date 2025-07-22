import { json } from '@remix-run/node';
import { getOrders } from "../models/order.server";
import { json2csv } from 'json-2-csv';

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
  const csv = await json2csv(orders, {fields});
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=orders.csv',
    },
  });
};