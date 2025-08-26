import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const INR_TO_USD = 0.012;

const formatUSD = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
};

// --- New: Place order thunk ---
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Orders ---
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.map((order) => ({
          _id: order._id,
          orderDate: order.createdAt,
          totalAmount: formatUSD((parseFloat(order.totalPrice) || 0) * INR_TO_USD),
          products: (order.products || []).map((p) => ({
            name: p.name || "Unknown",
            description: p.description || "",
            totalProductPrice: formatUSD((parseFloat(p.price) || 0) * INR_TO_USD),
            imagelink_square: p.image || "",
            prices: [
              {
                size: "default",
                price: formatUSD((parseFloat(p.price) || 0) * INR_TO_USD),
                quantity: p.quantity || 1,
              },
            ],
          })),
        }));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Place Order ---
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); 
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
