import { payments } from '../data/mockData';

export const getPaymentStats = () => {
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((acc, payment) => acc + payment.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const overduePayments = payments.filter(p => p.status === 'overdue').length;

  return {
    totalRevenue,
    pendingPayments,
    overduePayments
  };
};

export const getAllPayments = () => {
  return payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};