import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    RefreshControl,
    Animated,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { App_Primary_color, dark33, darkMode25, white } from '../../common/Colors/colors';
import { FONTS_FAMILY } from '../../assets/Fonts';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/Apis';
import { BackIcon } from '../../assets/SVGs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import DeleteExpenseModal from './DeleteExpense';
import UpdateExpenseModal from './UpdateExpense';
import AddExpenseModal from './AddExpenses';
import { ToastMsg } from '../../utils/helperFunctions';
// import AddExpenseModal from './AddExpenseModal';
// import UpdateExpenseModal from './UpdateExpenseModal';
// import DeleteExpenseModal from './DeleteExpenseModal';

export default function AllExpense({ navigation }) {
    const { isDarkMode } = useSelector(state => state.theme);
    const [isLoading, setIsLoading] = useState(true);
    const [allExpense, setAllExpense] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showExpenseUpdateModal, setShowExpenseUpdateModal] = useState(false);
    const [showExpenseDeleteModal, setShowExpenseDeleteModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [expense, setExpense] = useState({
        Title: '',
        Amount: '',
        Note: ''
    });

    const headerAnim = useRef(new Animated.Value(-100)).current;

    const getAllExpense = async () => {
        try {
            setIsLoading(true);
            const response = await apiGet('/api/user/GetMyExpenses');
            setAllExpense(response?.data?.expenses || []);
            setTotalSpent(response?.data?.totalSpent || 0);
        } catch (error) {
            console.error('Error fetching Expense:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllExpense();
        animateHeader();
    }, []);

    const animateHeader = () => {
        Animated.spring(headerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getAllExpense();
        setRefreshing(false);
    };

    const openAddExpense = () => {
        setShowAddModal(true);
    };

    const closeAddExpense = () => {
        setShowAddModal(false);
        setExpense({ Title: '', Amount: '', Note: '' });
    };

    const handleAddExpense = async () => {
        try {
            if (!expense.Title) {
                ToastMsg('Title is required');
                return;
            }
            if (!expense.Amount) {
                ToastMsg('Amount is required');
                return;
            }

            setIsLoading(true);
            const response = await apiPost(`/api/user/AddExpense`, expense);
            ToastMsg(response?.message || 'Expense added successfully');
            setIsLoading(false);
            closeAddExpense();
            getAllExpense();
        } catch (error) {
            setIsLoading(false);
            ToastMsg(error?.response?.data?.message || 'Something went wrong');
            console.error(error);
        }
    };

    const handleEdit = (expenseItem) => {
        setCurrentExpense(expenseItem);
        setExpense({
            Title: expenseItem.Title,
            Amount: expenseItem.Amount,
            Note: expenseItem.Note
        });
        setShowExpenseUpdateModal(true);
    };

    const closeExpenseUpdateModal = () => {
        setCurrentExpense(null);
        setExpense({ Title: '', Amount: '', Note: '' });
        setShowExpenseUpdateModal(false);
    };

    const handleUpdateExpense = async () => {
        try {
            if (!expense.Title) {
                ToastMsg('Title is required');
                return;
            }
            if (!expense.Amount) {
                ToastMsg('Amount is required');
                return;
            }

            setIsLoading(true);
            const response = await apiPut(`/api/user/UpdateExpense/${currentExpense?._id}`, expense);
            ToastMsg( response?.message || 'Expense updated successfully');
            setIsLoading(false);
            closeExpenseUpdateModal();
            getAllExpense();
        } catch (error) {
            setIsLoading(false);
            ToastMsg(error?.response?.data?.message || 'Something went wrong');
            console.error('Error updating expense:', error);
        }
    };

    const handleDelete = (expenseItem) => {
        setCurrentExpense(expenseItem);
        setShowExpenseDeleteModal(true);
    };

    const closeDeleteModel = () => {
        setCurrentExpense(null);
        setShowExpenseDeleteModal(false);
    };

    const handleDeleteExpense = async () => {
        try {
            setIsLoading(true);
            const response = await apiDelete(`/api/user/DeleteExpense/${currentExpense?._id}`);
            ToastMsg( response?.message || 'Expense deleted successfully');
            setIsLoading(false);
            closeDeleteModel();
            getAllExpense();
        } catch (error) {
            setIsLoading(false);
            ToastMsg(error?.response?.data?.message || 'Error deleting expense');
            console.error('Error deleting expense:', error);
        }
    };

    const formatCurrency = (amount) => {
        return `₹${amount?.toLocaleString('en-IN') || 0}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? darkMode25 : '#f5f5f5',
        },
        headerContainer: {
            backgroundColor: white,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        headerTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 18,
            color: App_Primary_color,
            flex: 1,
        },
        contentContainer: {
            padding: 16,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        totalCard: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderLeftWidth: 4,
            borderLeftColor: App_Primary_color,
        },
        totalCardContent: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        totalIconContainer: {
            marginRight: 12,
        },
        totalTextContainer: {
            flex: 1,
        },
        totalLabel: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 12,
            color: '#666',
            marginBottom: 4,
        },
        totalAmount: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 24,
            color: '#333',
        },
        sectionHeader: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        sectionHeaderContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        sectionTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 18,
            color: '#333',
        },
        addButton: {
            backgroundColor: App_Primary_color,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        addButtonText: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 13,
            color: white,
        },
        emptyContainer: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 48,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        emptyTitle: {
            fontFamily: FONTS_FAMILY.Poppins_Medium,
            fontSize: 16,
            color: '#999',
            marginBottom: 8,
        },
        emptySubtext: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 13,
            color: '#BBB',
        },
        expenseCard: {
            backgroundColor: white,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        expenseHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        expenseTitle: {
            fontFamily: FONTS_FAMILY.Poppins_SemiBold,
            fontSize: 15,
            color: '#333',
            flex: 1,
            marginRight: 12,
        },
        expenseAmount: {
            fontFamily: FONTS_FAMILY.Poppins_Bold,
            fontSize: 16,
            color: '#28A745',
        },
        expenseNote: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
            marginBottom: 12,
        },
        expenseFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
        },
        expenseDate: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        expenseDateText: {
            fontFamily: FONTS_FAMILY.Poppins_Regular,
            fontSize: 12,
            color: '#666',
        },
        actionButtons: {
            flexDirection: 'row',
            gap: 8,
        },
        actionButton: {
            borderRadius: 8,
            padding: 8,
        },
        editButton: {
            backgroundColor: '#E3F2FD',
        },
        deleteButton: {
            backgroundColor: '#FFEBEE',
        },
    });

    const renderHeader = () => (
        <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerAnim }] }]}>
            <StatusBar barStyle="dark-content" backgroundColor={white} />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Expense Manager</Text>
            </View>
        </Animated.View>
    );

    const renderExpenseItem = (expenseItem) => {
        return (
            <View key={expenseItem._id} style={styles.expenseCard}>
                <View style={styles.expenseHeader}>
                    <Text style={styles.expenseTitle}>{expenseItem.Title}</Text>
                    <Text style={styles.expenseAmount}>{formatCurrency(expenseItem.Amount)}</Text>
                </View>

                {expenseItem.Note && (
                    <Text style={styles.expenseNote} numberOfLines={2}>
                        {expenseItem.Note}
                    </Text>
                )}

                <View style={styles.expenseFooter}>
                    <View style={styles.expenseDate}>
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text style={styles.expenseDateText}>{formatDate(expenseItem.createdAt)}</Text>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.editButton]}
                            onPress={() => handleEdit(expenseItem)}
                        >
                            <Ionicons name="pencil" size={16} color="#2196F3" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={() => handleDelete(expenseItem)}
                        >
                            <Ionicons name="trash-outline" size={16} color="#F44336" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={App_Primary_color} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[App_Primary_color]}
                        tintColor={App_Primary_color}
                    />
                }
            >
                <View style={styles.contentContainer}>
                    {/* Total Spent Card */}
                    <View style={styles.totalCard}>
                        <View style={styles.totalCardContent}>
                            <View style={styles.totalIconContainer}>
                                <MaterialCommunityIcons name="currency-inr" size={32} color={App_Primary_color} />
                            </View>
                            <View style={styles.totalTextContainer}>
                                <Text style={styles.totalLabel}>Total Spent</Text>
                                <Text style={styles.totalAmount}>{formatCurrency(totalSpent)}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Section Header with Add Button */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionHeaderContent}>
                            <Text style={styles.sectionTitle}>All Expenses</Text>
                            <TouchableOpacity style={styles.addButton} onPress={openAddExpense}>
                                <Ionicons name="add" size={18} color={white} />
                                <Text style={styles.addButtonText}>Add Expense</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Expense List or Empty State */}
                    {allExpense.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons 
                                name="file-document-outline" 
                                size={48} 
                                color="#CCC" 
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyTitle}>No expenses found</Text>
                            <Text style={styles.emptySubtext}>Start by adding your first expense</Text>
                        </View>
                    ) : (
                        allExpense.map((expenseItem) => renderExpenseItem(expenseItem))
                    )}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Modals */}
            <AddExpenseModal
                visible={showAddModal}
                onClose={closeAddExpense}
                expense={expense}
                setExpense={setExpense}
                onConfirm={handleAddExpense}
                isDarkMode={isDarkMode}
            />

            <UpdateExpenseModal
                visible={showExpenseUpdateModal}
                onClose={closeExpenseUpdateModal}
                expense={expense}
                setExpense={setExpense}
                onConfirm={handleUpdateExpense}
                isDarkMode={isDarkMode}
            />

            <DeleteExpenseModal
                visible={showExpenseDeleteModal}
                onClose={closeDeleteModel}
                currentExpense={currentExpense}
                onConfirm={handleDeleteExpense}
                isDarkMode={isDarkMode}
            />
        </SafeAreaView>
    );
}