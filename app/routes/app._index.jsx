
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Card,
  EmptyState,
  Layout,
  Page,
  IndexTable,
  Button,
} from "@shopify/polaris";

import { getOrders } from "../models/order.server";
import { AlertDiamondIcon, ImageIcon } from "@shopify/polaris-icons";

export async function loader() {
  const orders = await getOrders();
  return json({orders});
}

const EmptyOrderState = ({ onAction }) => (
  <EmptyState>
    <p>No Orders.</p>
  </EmptyState>
);

const OrderTable = ({ orders }) => (
  <IndexTable
    resourceName={{
      singular: "Order",
      plural: "Orders",
    }}
    itemCount={orders.length}
    headings={[
      { title: "Order Number" },
      { title: "Customer" },
      { title: "Total" },
      { title: "Gateway" },
      { title: "Tags" },
      { title: "Created" },
    ]}
    selectable={false}
  >
    {orders.map((order) => (
      <OrderTableRow key={order.orderId} order={order} />
    ))}
  </IndexTable>
);

const OrderTableRow = ({ order }) => (
  <IndexTable.Row id={order.orderId} position={order.orderId}>
    <IndexTable.Cell>{order.orderNumber}</IndexTable.Cell>
    <IndexTable.Cell>{order.customerName}</IndexTable.Cell>
    <IndexTable.Cell>{order.totalPrice}</IndexTable.Cell>
    <IndexTable.Cell>{order.paymentGateway}</IndexTable.Cell>
    <IndexTable.Cell>{order.tags}</IndexTable.Cell>
    <IndexTable.Cell>
      {new Date(order.createdAt).toDateString()}
    </IndexTable.Cell>
  </IndexTable.Row>
);

export default function Index() {
  const { orders } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Page>
      <ui-title-bar title="Orders">
      </ui-title-bar>
      <Layout>
        <Layout.Section>
        <Button
          disabled={orders.length === 0}
          url="/orders/export"
          download
          variant="primary"
        >
        Export CSV
        </Button>
        </Layout.Section>
        <Layout.Section>
          <Card padding="0">
            {orders.length === 0 ? (
              <EmptyOrderState onAction={() => navigate("orders/new")} />
            ) : (
              <OrderTable orders={orders} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}