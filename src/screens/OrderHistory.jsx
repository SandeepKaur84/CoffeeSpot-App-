import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../slices/orderSlice';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);

  // fetch once
  const fetched = useRef(false);
  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchOrders());
      fetched.current = true;
    }
  }, [dispatch]);

  // helpers
  const moneyToNumber = val => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const n = parseFloat(String(val).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderBlock}>
      {/* Header (date + total) */}
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.muted}>Order Date</Text>
          <Text style={styles.dateValue}>
            {new Date(item.orderDate).toLocaleDateString()}{' '}
            {new Date(item.orderDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.muted}>Total Amount</Text>
          <Text style={styles.totalValue}>{item.totalAmount}</Text>
        </View>
      </View>

      {/* Product Cards */}
      {item.products.map((product, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={styles.leftInfo}>
              <Image
                source={{
                  uri:
                    product.imageUrl ||
                    'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
                }}
                style={styles.productImage}
              />
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSub}>
                  {product.description || '—'}
                </Text>
              </View>
            </View>
            <Text style={styles.cardRightTotal}>
              {product.totalProductPrice}
            </Text>
          </View>

          {/* Size rows */}
          {product.prices.map((p, idx) => {
            const each = moneyToNumber(p.price);
            const subtotal = each * (p.quantity || 1);
            return (
              <View key={idx} style={styles.sizeRow}>
                <View style={styles.sizePill}>
                  <Text style={styles.sizePillText}>{p.size}</Text>
                </View>

                <View style={styles.pricePill}>
                  <Text style={styles.pricePillText}>{p.price}</Text>
                </View>

                <Text style={styles.qtyText}>X {p.quantity || 1}</Text>

                <Text style={styles.rowTotalText}>${subtotal.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Order History</Text>

      {loading ? (
        <Text style={styles.loading}>Loading…</Text>
      ) : error ? (
        <Text style={styles.loading}>{error}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={it => it._id}
          renderItem={renderOrderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }} // ✅ ensures space for button
        />
      )}

      {/* Fixed bottom button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderHistory;

/* ====== styles ====== */
const BG = COLORS?.background ?? COLORS?.primaryBlackHex ?? '#0E0F12';
const CARD = COLORS?.cardBackground ?? COLORS?.primaryGreyHex ?? '#1B1E25';
const WHITE = COLORS?.white ?? COLORS?.primaryWhiteHex ?? '#FFFFFF';
const MUTED = COLORS?.gray ?? COLORS?.primaryLightGreyHex ?? '#9CA3AF';
const ACCENT = COLORS?.primary ?? COLORS?.primaryOrangeHex ?? '#F4A261';
const DARKER = COLORS?.primaryDarkGreyHex ?? '#121418';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  screenTitle: {
    color: WHITE,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: FONTSIZE?.size_20 ?? 20,
    fontFamily: FONTFAMILY?.poppins_semibold,
  },
  loading: {
    color: WHITE,
    textAlign: 'center',
    marginTop: 20,
  },
  /* section */
  orderBlock: { marginBottom: 24 },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  muted: {
    color: MUTED,
    fontSize: FONTSIZE?.size_12 ?? 12,
    fontFamily: FONTFAMILY?.poppins_light,
  },
  dateValue: {
    color: WHITE,
    fontSize: FONTSIZE?.size_14 ?? 14,
    fontFamily: FONTFAMILY?.poppins_regular,
    marginTop: 2,
  },
  totalValue: {
    color: ACCENT,
    fontSize: FONTSIZE?.size_14 ?? 14,
    fontFamily: FONTFAMILY?.poppins_medium,
    marginTop: 2,
  },

  /* card */
  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 12,
    marginTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  productImage: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: DARKER,
  },
  productName: {
    color: WHITE,
    fontSize: FONTSIZE?.size_14 ?? 14,
    fontFamily: FONTFAMILY?.poppins_medium,
  },
  productSub: {
    color: MUTED,
    fontSize: FONTSIZE?.size_12 ?? 12,
    marginTop: 2,
    fontFamily: FONTFAMILY?.poppins_light,
  },
  cardRightTotal: {
    color: WHITE,
    fontSize: FONTSIZE?.size_18 ?? 18,
    fontFamily: FONTFAMILY?.poppins_semibold,
  },

  /* rows inside card */
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sizePill: {
    backgroundColor: DARKER,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    minWidth: 44,
    alignItems: 'center',
  },
  sizePillText: {
    color: WHITE,
    fontSize: FONTSIZE?.size_12 ?? 12,
    fontFamily: FONTFAMILY?.poppins_medium,
  },
  pricePill: {
    backgroundColor: DARKER,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  pricePillText: {
    color: WHITE,
    fontSize: FONTSIZE?.size_12 ?? 12,
    fontFamily: FONTFAMILY?.poppins_medium,
  },
  qtyText: {
    color: WHITE,
    fontSize: FONTSIZE?.size_12 ?? 12,
    fontFamily: FONTFAMILY?.poppins_regular,
    marginRight: 12,
  },
  rowTotalText: {
    color: ACCENT,
    fontSize: FONTSIZE?.size_12 ?? 12,
    fontFamily: FONTFAMILY?.poppins_medium,
    marginLeft: 'auto',
  },

  /* bottom button */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: BG,
  },
  downloadBtn: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  downloadText: {
    color: WHITE,
    fontSize: FONTSIZE?.size_16 ?? 16,
    fontFamily: FONTFAMILY?.poppins_semibold,
  },
});
