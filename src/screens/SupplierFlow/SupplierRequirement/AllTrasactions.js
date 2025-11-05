import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BackIcon } from '../../../assets/SVGs';
import { FONTS_FAMILY } from '../../../assets/Fonts';
import { App_Primary_color } from '../../../common/Colors/colors';
import { apiGet } from '../../../utils/Apis';
import { ToastMsg } from '../../../utils/helperFunctions';
import moment from 'moment';

const AllTransaction = ({ navigation }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await apiGet('/api/supplier/GetAllTransaction');
      setAllTransactions(response?.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      ToastMsg('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return moment(date).format('DD/MM/YYYY');
  };

  const paginatedTransactions = allTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Transactions</Text>
        </View>
      </View>

      {/* Table */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={App_Primary_color} />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.idColumn]}>ID</Text>
              <Text style={[styles.tableHeaderCell, styles.itemsColumn]}>Items</Text>
              <Text style={[styles.tableHeaderCell, styles.amountColumn]}>Amount</Text>
              <Text style={[styles.tableHeaderCell, styles.noteColumn]}>Note</Text>
              <Text style={[styles.tableHeaderCell, styles.dateColumn]}>Created At</Text>
            </View>

            {/* Table Body */}
            <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={true}>
              {paginatedTransactions.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No transactions found</Text>
                </View>
              ) : (
                paginatedTransactions.map((transaction, index) => (
                  <View key={transaction._id || index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.idColumn]}>
                      {page * rowsPerPage + index + 1}
                    </Text>
                    
                    <View style={[styles.tableCell, styles.itemsColumn]}>
                      {transaction?.Items?.map((item, idx) => (
                        <Text key={idx} style={styles.itemText}>
                          <Text style={styles.itemName}>{item.itemName}</Text>: ₹{item.itemPrice}
                        </Text>
                      ))}
                    </View>

                    <Text style={[styles.tableCell, styles.amountColumn]}>
                      ₹{transaction?.amount || 0}
                    </Text>

                    <Text style={[styles.tableCell, styles.noteColumn]}>
                      {transaction?.note || '-'}
                    </Text>

                    <Text style={[styles.tableCell, styles.dateColumn]}>
                      {formatDate(transaction?.createdAt)}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Pagination */}
            <View style={styles.pagination}>
              <Text style={styles.paginationText}>
                Showing {page * rowsPerPage + 1} to{' '}
                {Math.min((page + 1) * rowsPerPage, allTransactions.length)} of{' '}
                {allTransactions.length} transactions
              </Text>
              <View style={styles.paginationButtons}>
                <TouchableOpacity
                  style={[styles.pageButton, page === 0 && styles.pageButtonDisabled]}
                  onPress={() => setPage(page - 1)}
                  disabled={page === 0}
                >
                  <Text style={styles.pageButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.pageButton,
                    (page + 1) * rowsPerPage >= allTransactions.length &&
                      styles.pageButtonDisabled,
                  ]}
                  onPress={() => setPage(page + 1)}
                  disabled={(page + 1) * rowsPerPage >= allTransactions.length}
                >
                  <Text style={styles.pageButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  tableContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: App_Primary_color,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  tableBody: {
    maxHeight: 500,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    fontSize: 12,
    color: '#333',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  idColumn: {
    width: 60,
  },
  itemsColumn: {
    width: 200,
  },
  amountColumn: {
    width: 100,
  },
  noteColumn: {
    width: 150,
  },
  dateColumn: {
    width: 100,
  },
  itemText: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  itemName: {
    fontWeight: '600',
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  paginationText: {
    fontSize: 11,
    color: '#666',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
  },
  paginationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  pageButton: {
    backgroundColor: App_Primary_color,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  pageButtonDisabled: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY.Poppins_Medium,
  },
});

export default AllTransaction;