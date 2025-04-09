import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Orders = async ({}): Promise<ReactElement> => {
  const { userId } = await auth();

  console.log(userId);

  if (!userId) return redirect("/");
  const orders = await getMyOrders(userId);
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-4 ">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
          Meus pedidos
        </h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600"> Não tem produtos </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {orders.map((order, index) => (
              <div
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden "
                key={`${order.orderNumber}-${index}`}
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">
                        Número do Pedido:
                      </p>
                      <p className="font-mono text-sm text-green-600 break-all">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Data do pedido:
                      </p>
                      <p className="font-medium text-base text-gray-700">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Status  */}
                <div className="flex  p-2.5 sm:p-3.5 flex-col gap-4 sm:flex-row sm:justify-between sm:items-center ">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Situação</span>
                    <div
                      className={cn(
                        "bg-red-100 px-3.5 font-medium py-1 rounded-full text-sm",
                        order.status === "paid"
                          ? "text-white bg-emerald-400/90 "
                          : "text-red-600"
                      )}
                    >
                      {order.status === "paid" ? "Pagado" : "Pendiente"}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Total
                    </p>
                    <p className="font-medium text-base text-gray-700">
                      {order.totalPrice
                        ? formatCurrency(order.totalPrice)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {order.amountDiscount ? (
                  <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-sans font-semibold mb-1 tracking-wide text-sm ">
                      Desconto de: {formatCurrency(order.amountDiscount)}
                    </p>
                    <p className="tracking-wide text-sm">
                      {" "}
                      Valor Original :{" "}
                      {order.totalPrice
                        ? formatCurrency(
                            order.totalPrice + order.amountDiscount,
                            order.currency
                          )
                        : "N/A"}
                    </p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
