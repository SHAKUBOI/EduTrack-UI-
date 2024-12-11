import React, { useState } from 'react';
import { CreditCard, DollarSign, Users } from 'lucide-react';
import { User, Payment } from '../../types';
import { getPaymentStats } from '../../utils/accountantUtils';
import StatsCard from '../ui/StatsCard';
import PaymentForm from '../payments/PaymentForm';
import PaymentList from '../payments/PaymentList';
import { payments as initialPayments, users } from '../../data/mockData';

interface AccountantDashboardProps {
  user: User;
}

export default function AccountantDashboard({ user }: AccountantDashboardProps) {
  const [payments, setPayments] = useState(initialPayments);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  
  const { totalRevenue, pendingPayments, overduePayments } = getPaymentStats();
  const students = users.filter(u => u.role === 'student');

  const handleAddPayment = (payment: Partial<Payment>) => {
    const newPayment = {
      ...payment,
      id: (payments.length + 1).toString(),
    } as Payment;
    
    setPayments([...payments, newPayment]);
    setShowForm(false);
  };

  const handleUpdatePayment = (updatedPayment: Partial<Payment>) => {
    const newPayments = payments.map(p => 
      p.id === editingPayment?.id ? { ...p, ...updatedPayment } : p
    );
    setPayments(newPayments);
    setEditingPayment(null);
    setShowForm(false);
  };

  const handleDeletePayment = (paymentId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      setPayments(payments.filter(p => p.id !== paymentId));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Comptable</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Revenus Totaux"
          value={`${totalRevenue.toLocaleString()} FCFA`}
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Paiements en Attente"
          value={pendingPayments}
          icon={<CreditCard className="h-6 w-6 text-yellow-600" />}
          bgColor="bg-yellow-100"
        />
        <StatsCard
          title="Paiements en Retard"
          value={overduePayments}
          icon={<Users className="h-6 w-6 text-red-600" />}
          bgColor="bg-red-100"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Gestion des Paiements</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Nouveau Paiement
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {editingPayment ? 'Modifier le Paiement' : 'Nouveau Paiement'}
            </h3>
            <PaymentForm
              payment={editingPayment || undefined}
              onSubmit={editingPayment ? handleUpdatePayment : handleAddPayment}
              onCancel={() => {
                setShowForm(false);
                setEditingPayment(null);
              }}
            />
          </div>
        )}

        <PaymentList
          payments={payments}
          students={students}
          onEdit={(payment) => {
            setEditingPayment(payment);
            setShowForm(true);
          }}
          onDelete={handleDeletePayment}
        />
      </div>
    </div>
  );
}