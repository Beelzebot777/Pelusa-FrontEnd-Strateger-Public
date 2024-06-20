// Path: strateger-react/src/components/Orders/OrderList.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setSelectedOrderId, setPage } from '../../slices/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, selectedOrderId, page, hasMore, offset } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders({ limit: 500, offset: 0 }));
    }
  }, [dispatch, orders.length]);

  const handlePreviousPage = () => {
    dispatch(setPage(Math.max(page - 1, 0)));
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * 20 >= orders.length && hasMore) {
      dispatch(fetchOrders({ limit: 500, offset }));
    }
    dispatch(setPage(nextPage));
  };

  const handleSelectOrder = (orderId) => {
    dispatch(setSelectedOrderId(orderId));
  };

  if (loading && orders.length === 0) {
    return <div className="text-center py-4">Cargando órdenes...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error al cargar órdenes: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center py-4">No hay órdenes disponibles.</div>;
  }

  const startIndex = page * 20;
  const endIndex = startIndex + 20;
  const currentOrders = [...orders].sort((a, b) => b.orderId - a.orderId).slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8 text-sm">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">Order ID</th>
            <th className="py-2 px-4 border-r">Symbol</th>
            <th className="py-2 px-4 border-r">Side</th>
            <th className="py-2 px-4 border-r">Type</th>
            <th className="py-2 px-4 border-r">Position Side</th>
            <th className="py-2 px-4 border-r">Reduce Only</th>
            <th className="py-2 px-4 border-r">Quantity</th>
            <th className="py-2 px-4 border-r">Price</th>
            <th className="py-2 px-4 border-r">Average Price</th>
            <th className="py-2 px-4 border-r">Status</th>
            <th className="py-2 px-4 border-r">Profit</th>
            <th className="py-2 px-4 border-r">Commission</th>
            <th className="py-2 px-4 border-r">Stop Price</th>
            <th className="py-2 px-4 border-r">Working Type</th>
            <th className="py-2 px-4 border-r">Order Time</th>
            <th className="py-2 px-4 border-r">Update Time</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr
              key={order.orderId}
              className={`border-b hover:bg-gray-50 cursor-pointer ${selectedOrderId === order.orderId ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelectOrder(order.orderId)}
            >
              <td className="py-2 px-4 border-r">{order.orderId}</td>
              <td className="py-2 px-4 border-r">{order.symbol}</td>
              <td className="py-2 px-4 border-r">{order.side}</td>
              <td className="py-2 px-4 border-r">{order.type}</td>
              <td className="py-2 px-4 border-r">{order.positionSide}</td>
              <td className="py-2 px-4 border-r">{order.reduceOnly.toString()}</td>
              <td className="py-2 px-4 border-r">{order.origQty}</td>
              <td className="py-2 px-4 border-r">{order.price}</td>
              <td className="py-2 px-4 border-r">{order.avgPrice}</td>
              <td className="py-2 px-4 border-r">{order.status}</td>
              <td className="py-2 px-4 border-r">{order.profit}</td>
              <td className="py-2 px-4 border-r">{order.commission}</td>
              <td className="py-2 px-4 border-r">{order.stopPrice}</td>
              <td className="py-2 px-4 border-r">{order.workingType}</td>
              <td className="py-2 px-4 border-r">{new Date(order.time).toLocaleString()}</td>
              <td className="py-2 px-4 border-r">{new Date(order.updateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextPage}
          disabled={!hasMore && endIndex >= orders.length}
        >
          Siguiente
        </button>
      </div>
      {loading && <div className="text-center py-4">Cargando más órdenes...</div>}
    </div>
  );
};

export default OrderList;