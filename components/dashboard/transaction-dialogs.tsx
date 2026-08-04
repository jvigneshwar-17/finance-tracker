"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/dashboard/transaction-form";
import type { TransactionFormValues } from "@/components/dashboard/transaction-form";
import {
  apiCreateTransaction,
  apiUpdateTransaction,
  apiDeleteTransaction,
  useTransactions,
} from "@/hooks/use-transactions";
import type { Transaction } from "@/hooks/use-transactions";

// ─── Add Transaction Dialog ───────────────────────────────────────────

interface AddTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultType?: "income" | "expense";
}

export function AddTransactionDialog({
  open,
  onClose,
  onSuccess,
  defaultType = "expense",
}: AddTransactionDialogProps) {
  const { refreshAll } = useTransactions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: TransactionFormValues) {
    setIsSubmitting(true);
    try {
      const result = await apiCreateTransaction({
        title: values.title,
        amount: parseFloat(values.amount),
        type: values.type,
        category: values.category,
        note: values.note || undefined,
        date: new Date(values.date).toISOString(),
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Transaction added!", {
        description: `₹${parseFloat(values.amount).toLocaleString("en-IN")} ${values.type === "income" ? "income" : "expense"} recorded.`,
      });
      onClose();
      refreshAll();
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Transaction"
      description="Record a new income or expense"
      maxWidth="max-w-xl"
    >
      <TransactionForm
        key={open ? `create-${defaultType}` : "closed"}
        mode="create"
        initialValues={{ type: defaultType }}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Dialog>
  );
}

// ─── Edit Transaction Dialog ──────────────────────────────────────────

interface EditTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  transaction: Transaction | null;
}

export function EditTransactionDialog({
  open,
  onClose,
  onSuccess,
  transaction,
}: EditTransactionDialogProps) {
  const { refreshAll } = useTransactions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: TransactionFormValues) {
    if (!transaction) return;
    setIsSubmitting(true);
    try {
      const result = await apiUpdateTransaction(transaction.id, {
        title: values.title,
        amount: parseFloat(values.amount),
        type: values.type,
        category: values.category,
        note: values.note || undefined,
        date: new Date(values.date).toISOString(),
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Transaction updated!");
      onClose();
      refreshAll();
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Edit Transaction"
      description="Update the transaction details"
      maxWidth="max-w-xl"
    >
      {transaction && (
        <TransactionForm
          mode="edit"
          initialValues={transaction}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      )}
    </Dialog>
  );
}

// ─── Delete Confirmation Dialog ───────────────────────────────────────

interface DeleteTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  transaction: Transaction | null;
}

export function DeleteTransactionDialog({
  open,
  onClose,
  onSuccess,
  transaction,
}: DeleteTransactionDialogProps) {
  const { refreshAll } = useTransactions();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirm() {
    if (!transaction) return;
    setIsDeleting(true);
    try {
      const result = await apiDeleteTransaction(transaction.id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Transaction deleted");
      onClose();
      refreshAll();
      onSuccess?.();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      isLoading={isDeleting}
      title="Delete Transaction"
      description={
        transaction
          ? `Are you sure you want to delete "${transaction.title}"? This action cannot be undone.`
          : "Are you sure you want to delete this transaction?"
      }
      confirmLabel="Delete"
    />
  );
}
